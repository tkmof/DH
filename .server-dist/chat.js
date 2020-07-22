"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;/**
 * Chat
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This handles chat and chat commands sent from users to chatrooms
 * and PMs. The main function you're looking for is Chat.parse
 * (scroll down to its definition for details)
 *
 * Individual commands are put in:
 *   chat-commands/ - "core" commands that shouldn't be modified
 *   chat-plugins/ - other commands that can be safely modified
 *
 * The command API is (mostly) documented in chat-plugins/COMMANDS.md
 *
 * @license MIT
 */

/*

To reload chat commands:

/hotpatch chat

*/























































const LINK_WHITELIST = [
	'*.pokemonshowdown.com', 'psim.us', 'smogtours.psim.us',
	'*.smogon.com', '*.pastebin.com', '*.hastebin.com',
];

const MAX_MESSAGE_LENGTH = 300;

const BROADCAST_COOLDOWN = 20 * 1000;
const MESSAGE_COOLDOWN = 5 * 60 * 1000;

const MAX_PARSE_RECURSION = 10;

const VALID_COMMAND_TOKENS = '/!';
const BROADCAST_TOKEN = '!';

const TRANSLATION_DIRECTORY = 'translations/';

var _fs = require('../.lib-dist/fs');
var _utils = require('../.lib-dist/utils');
var _chatformatter = require('./chat-formatter');

// @ts-ignore no typedef available
const ProbeModule = require('probe-image-size');
const probe = ProbeModule;

const EMOJI_REGEX = /[\p{Emoji_Modifier_Base}\p{Emoji_Presentation}\uFE0F]/u;

class PatternTester {
	// This class sounds like a RegExp
	// In fact, one could in theory implement it as a RegExp subclass
	// However, ES2016 RegExp subclassing is a can of worms, and it wouldn't allow us
	// to tailor the test method for fast command parsing.
	
	
	
	constructor() {
		this.elements = [];
		this.fastElements = new Set();
		this.regexp = null;
	}
	fastNormalize(elem) {
		return elem.slice(0, -1);
	}
	update() {
		const slowElements = this.elements.filter(elem => !this.fastElements.has(this.fastNormalize(elem)));
		if (slowElements.length) {
			this.regexp = new RegExp('^(' + slowElements.map(elem => '(?:' + elem + ')').join('|') + ')', 'i');
		}
	}
	register(...elems) {
		for (const elem of elems) {
			this.elements.push(elem);
			if (/^[^ ^$?|()[\]]+ $/.test(elem)) {
				this.fastElements.add(this.fastNormalize(elem));
			}
		}
		this.update();
	}
	testCommand(text) {
		const spaceIndex = text.indexOf(' ');
		if (this.fastElements.has(spaceIndex >= 0 ? text.slice(0, spaceIndex) : text)) {
			return true;
		}
		if (!this.regexp) return false;
		return this.regexp.test(text);
	}
	test(text) {
		if (!text.includes('\n')) return null;
		if (this.testCommand(text)) return text;
		// The PM matching is a huge mess, and really needs to be replaced with
		// the new multiline command system soon.
		const pmMatches = /^(\/(?:pm|w|whisper|msg) [^,]*, ?)(.*)/i.exec(text);
		if (pmMatches && this.testCommand(pmMatches[2])) {
			if (text.split('\n').every(line => line.startsWith(pmMatches[1]))) {
				return text.replace(/\n\/(?:pm|w|whisper|msg) [^,]*, ?/g, '\n');
			}
			return text;
		}
		return null;
	}
}

/*********************************************************
 * Parser
 *********************************************************/

/**
 * An ErrorMessage will, if used in a command/page context, simply show the user
 * the error, rather than logging a crash. It's used to simplify showing errors.
 *
 * Outside of a command/page context, it would still cause a crash.
 */
 class ErrorMessage extends Error {
	constructor(message) {
		super(message);
		this.name = 'ErrorMessage';
		Error.captureStackTrace(this, ErrorMessage);
	}
} exports.ErrorMessage = ErrorMessage;

// These classes need to be declared here because they aren't hoisted
 class MessageContext {
	
	
	
	constructor(user, language = null) {
		this.user = user;
		this.language = language;
		this.recursionDepth = 0;
	}

	splitOne(target) {
		const commaIndex = target.indexOf(',');
		if (commaIndex < 0) {
			return [target.trim(), ''];
		}
		return [target.slice(0, commaIndex).trim(), target.slice(commaIndex + 1).trim()];
	}
	meansYes(text) {
		switch (text.toLowerCase().trim()) {
		case 'on': case 'enable': case 'yes': case 'true':
			return true;
		}
		return false;
	}
	meansNo(text) {
		switch (text.toLowerCase().trim()) {
		case 'off': case 'disable': case 'no': case 'false':
			return true;
		}
		return false;
	}

	tr(strings, ...keys) {
		return exports.Chat.tr(this.language, strings, ...keys);
	}
} exports.MessageContext = MessageContext;

 class PageContext extends MessageContext {
	
	
	
	
	
	constructor(options) {
		super(options.user, options.language);

		this.connection = options.connection;
		this.room = null;
		this.pageid = options.pageid;

		this.initialized = false;
		this.title = 'Page';
	}

	

	can(permission, target = null, room = null) {
		if (!this.user.can(permission , target, room )) {
			this.send(`<h2>Permission denied.</h2>`);
			return false;
		}
		return true;
	}

	extractRoom(pageid) {
		if (!pageid) pageid = this.pageid;
		const parts = pageid.split('-');

		// Since we assume pageids are all in the form of view-pagename-roomid
		// if someone is calling this function, so this is the only case we cover (for now)
		const room = Rooms.get(parts[2]);
		if (!room) {
			this.send(`<h2>Invalid room.</h2>`);
			return null;
		}

		this.room = room;
		return room;
	}

	send(content) {
		if (!content.startsWith('|deinit')) {
			const roomid = this.room ? `[${this.room.roomid}] ` : '';
			if (!this.initialized) {
				content = `|init|html\n|title|${roomid}${this.title}\n|pagehtml|${content}`;
				this.initialized = true;
			} else {
				content = `|title|${roomid}${this.title}\n|pagehtml|${content}`;
			}
		}
		this.connection.send(`>${this.pageid}\n${content}`);
	}

	close() {
		this.send('|deinit');
	}

	async resolve(pageid) {
		if (pageid) this.pageid = pageid;

		const parts = this.pageid.split('-');
		let handler = exports.Chat.pages;
		parts.shift();
		while (handler) {
			if (typeof handler === 'function') {
				let res;
				try {
					res = await handler.call(this, parts, this.user, this.connection);
				} catch (err) {
					if (_optionalChain([err, 'access', _ => _.name, 'optionalAccess', _2 => _2.endsWith, 'call', _3 => _3('ErrorMessage')])) {
						this.send(
							_utils.Utils.html`<div class="pad"><p class="message-error">${err.message}</p></div>`
						);
						return;
					}
					Monitor.crashlog(err, 'A chat page', {
						user: this.user.name,
						room: this.room && this.room.roomid,
						pageid: this.pageid,
					});
					this.send(
						`<div class="pad"><div class="broadcast-red">` +
						`<strong>Pokemon Showdown crashed!</strong><br />Don't worry, we're working on fixing it.` +
						`</div></div>`
				  );
				}
				if (typeof res === 'string') {
					this.send(res);
					res = undefined;
				}
				return res;
			}
			handler = handler[parts.shift() || 'default'];
		}
	}
} exports.PageContext = PageContext;

/**
 * This is a message sent in a PM or to a chat/battle room.
 *
 * There are three cases to be aware of:
 * - PM to user: `context.pmTarget` will exist and `context.room` will be `null`
 * - message to room: `context.room` will exist and `context.pmTarget` will be `null`
 * - console command (PM to `~`): `context.pmTarget` and `context.room` will both be `null`
 */
 class CommandContext extends MessageContext {
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	constructor(
		options


	) {
		super(
			options.user, options.room && options.room.settings.language ?
				options.room.settings.language : options.user.language
		);

		this.message = options.message || ``;

		// message context
		this.pmTarget = options.pmTarget || null;
		this.room = options.room || null;
		this.connection = options.connection;

		// command context
		this.cmd = options.cmd || '';
		this.cmdToken = options.cmdToken || '';
		this.target = options.target || ``;
		this.fullCmd = options.fullCmd || '';

		// broadcast context
		this.broadcasting = false;
		this.broadcastToRoom = true;
		this.broadcastMessage = '';

		// target user
		this.targetUser = null;
		this.targetUsername = "";
		this.inputUsername = "";
	}

	parse(msg) {
		if (typeof msg === 'string') {
			// spawn subcontext
			const subcontext = new CommandContext(this);
			subcontext.recursionDepth++;
			if (subcontext.recursionDepth > MAX_PARSE_RECURSION) {
				throw new Error("Too much command recursion");
			}
			subcontext.message = msg;
			return subcontext.parse();
		}
		let message = this.message;

		const commandHandler = this.splitCommand(message);

		if (this.room && !(this.user.id in this.room.users)) {
			if (this.room.roomid === 'lobby') {
				this.room = null;
			} else {
				return this.popupReply(`You tried to send "${message}" to the room "${this.room.roomid}" but it failed because you were not in that room.`);
			}
		}

		if (this.user.statusType === 'idle') this.user.setStatusType('online');

		if (typeof commandHandler === 'function') {
			message = this.run(commandHandler);
		} else {
			if (this.cmdToken) {
				// To guard against command typos, show an error message
				if (this.shouldBroadcast()) {
					if (/[a-z0-9]/.test(this.cmd.charAt(0))) {
						return this.errorReply(`The command "${this.cmdToken}${this.fullCmd}" does not exist.`);
					}
				} else {
					return this.errorReply(`The command "${this.cmdToken}${this.fullCmd}" does not exist. To send a message starting with "${this.cmdToken}${this.fullCmd}", type "${this.cmdToken}${this.cmdToken}${this.fullCmd}".`);
				}
			} else if (!VALID_COMMAND_TOKENS.includes(message.charAt(0)) &&
					VALID_COMMAND_TOKENS.includes(message.trim().charAt(0))) {
				message = message.trim();
				if (message.charAt(0) !== BROADCAST_TOKEN) {
					message = message.charAt(0) + message;
				}
			}

			message = this.canTalk(message);
		}

		// Output the message
		if (message && typeof message.then === 'function') {
			void (message ).then(resolvedMessage => {
				if (resolvedMessage && resolvedMessage !== true) {
					this.sendChatMessage(resolvedMessage);
				}
				this.update();
			});
		} else if (message && message !== true) {
			this.sendChatMessage(message);
		}

		this.update();

		return message;
	}

	sendChatMessage(message) {
		if (this.pmTarget) {
			exports.Chat.sendPM(message, this.user, this.pmTarget);
		} else if (this.room) {
			this.room.add(`|c|${this.user.getIdentity(this.room.roomid)}|${message}`);
			if (this.room.game && this.room.game.onLogMessage) {
				this.room.game.onLogMessage(message, this.user);
			}
		} else {
			this.connection.popup(`Your message could not be sent:\n\n${message}\n\nIt needs to be sent to a user or room.`);
		}
	}

	splitCommand(message = this.message, recursing = false) {
		this.cmd = '';
		this.cmdToken = '';
		this.target = '';
		if (!message || !message.trim().length) return;

		// hardcoded commands
		if (message.startsWith(`>> `)) {
			message = `/eval ${message.slice(3)}`;
		} else if (message.startsWith(`>>> `)) {
			message = `/evalbattle ${message.slice(4)}`;
		} else if (message.startsWith(`/me`) && /[^A-Za-z0-9 ]/.test(message.charAt(3))) {
			message = `/mee ${message.slice(3)}`;
		} else if (message.startsWith(`/ME`) && /[^A-Za-z0-9 ]/.test(message.charAt(3))) {
			message = `/MEE ${message.slice(3)}`;
		}

		const cmdToken = message.charAt(0);
		if (!VALID_COMMAND_TOKENS.includes(cmdToken)) return;
		if (cmdToken === message.charAt(1)) return;
		if (cmdToken === BROADCAST_TOKEN && /[^A-Za-z0-9]/.test(message.charAt(1))) return;

		let cmd = '';
		let target = '';

		const messageSpaceIndex = message.indexOf(' ');
		if (messageSpaceIndex > 0) {
			cmd = message.slice(1, messageSpaceIndex).toLowerCase();
			target = message.slice(messageSpaceIndex + 1).trim();
		} else {
			cmd = message.slice(1).toLowerCase();
			target = '';
		}

		if (cmd.endsWith(',')) cmd = cmd.slice(0, -1);

		let curCommands = exports.Chat.commands;
		let commandHandler;
		let fullCmd = cmd;

		do {
			if (cmd in curCommands) {
				commandHandler = curCommands[cmd];
			} else {
				commandHandler = undefined;
			}
			if (typeof commandHandler === 'string') {
				// in case someone messed up, don't loop
				commandHandler = curCommands[commandHandler];
			} else if (Array.isArray(commandHandler) && !recursing) {
				return this.splitCommand(cmdToken + 'help ' + fullCmd.slice(0, -4), true);
			}
			if (commandHandler && typeof commandHandler === 'object') {
				const spaceIndex = target.indexOf(' ');
				if (spaceIndex > 0) {
					cmd = target.substr(0, spaceIndex).toLowerCase();
					target = target.substr(spaceIndex + 1);
				} else {
					cmd = target.toLowerCase();
					target = '';
				}

				fullCmd += ' ' + cmd;
				curCommands = commandHandler ;
			}
		} while (commandHandler && typeof commandHandler === 'object');

		if (!commandHandler && curCommands.default) {
			commandHandler = curCommands.default;
			if (typeof commandHandler === 'string') {
				commandHandler = curCommands[commandHandler];
			}
		}

		if (!commandHandler && !recursing) {
			for (const g in Config.groups) {
				const groupid = Config.groups[g].id;
				if (fullCmd === groupid) {
					return this.splitCommand(`/promote ${target}, ${g}`, true);
				} else if (fullCmd === 'global' + groupid) {
					return this.splitCommand(`/globalpromote ${target}, ${g}`, true);
				} else if (fullCmd === 'de' + groupid || fullCmd === 'un' + groupid ||
						fullCmd === 'globalde' + groupid || fullCmd === 'deglobal' + groupid) {
					return this.splitCommand(`/demote ${target}`, true);
				} else if (fullCmd === 'room' + groupid) {
					return this.splitCommand(`/roompromote ${target}, ${g}`, true);
				} else if (fullCmd === 'forceroom' + groupid) {
					return this.splitCommand(`/forceroompromote ${target}, ${g}`, true);
				} else if (fullCmd === 'roomde' + groupid || fullCmd === 'deroom' + groupid || fullCmd === 'roomun' + groupid) {
					return this.splitCommand(`/roomdemote ${target}`, true);
				}
			}
		}

		this.cmd = cmd;
		this.cmdToken = cmdToken;
		this.target = target;
		this.fullCmd = fullCmd;

		// @ts-ignore type narrowing handled above
		return commandHandler;
	}
	run(commandHandler) {
		// type checked above
		if (typeof commandHandler === 'string') commandHandler = exports.Chat.commands[commandHandler] ;
		let result;
		try {
			result = commandHandler.call(this, this.target, this.room, this.user, this.connection, this.cmd, this.message);
		} catch (err) {
			if (_optionalChain([err, 'access', _4 => _4.name, 'optionalAccess', _5 => _5.endsWith, 'call', _6 => _6('ErrorMessage')])) {
				this.errorReply(err.message);
				return false;
			}
			Monitor.crashlog(err, 'A chat command', {
				user: this.user.name,
				room: this.room && this.room.roomid,
				pmTarget: this.pmTarget && this.pmTarget.name,
				message: this.message,
			});
			this.sendReply(`|html|<div class="broadcast-red"><b>Pokemon Showdown crashed!</b><br />Don't worry, we're working on fixing it.</div>`);
		}
		if (result === undefined) result = false;

		return result;
	}

	checkFormat(room, user, message) {
		if (!room) return true;
		if (!room.settings.filterStretching && !room.settings.filterCaps && !room.settings.filterEmojis) return true;
		if (user.can('bypassall')) return true;

		if (room.settings.filterStretching && /(.+?)\1{5,}/i.test(user.name)) {
			return this.errorReply(`Your username contains too much stretching, which this room doesn't allow.`);
		}
		if (room.settings.filterCaps && /[A-Z\s]{6,}/.test(user.name)) {
			return this.errorReply(`Your username contains too many capital letters, which this room doesn't allow.`);
		}
		if (room.settings.filterEmojis && EMOJI_REGEX.test(user.name)) {
			return this.errorReply(`Your username contains emojis, which this room doesn't allow.`);
		}
		// Removes extra spaces and null characters
		message = message.trim().replace(/[ \u0000\u200B-\u200F]+/g, ' ');

		if (room.settings.filterStretching && /(.+?)\1{7,}/i.test(message)) {
			return this.errorReply(`Your message contains too much stretching, which this room doesn't allow.`);
		}
		if (room.settings.filterCaps && /[A-Z\s]{18,}/.test(message)) {
			return this.errorReply(`Your message contains too many capital letters, which this room doesn't allow.`);
		}
		if (room.settings.filterEmojis && EMOJI_REGEX.test(message)) {
			return this.errorReply(`Your message contains emojis, which this room doesn't allow.`);
		}

		return true;
	}

	checkSlowchat(room, user) {
		if (!room || !room.settings.slowchat) return true;
		if (user.can('show', null, room)) return true;
		const lastActiveSeconds = (Date.now() - user.lastMessageTime) / 1000;
		if (lastActiveSeconds < room.settings.slowchat) return false;
		return true;
	}

	checkBanwords(room, message) {
		if (!room) return true;
		if (!room.banwordRegex) {
			if (room.settings.banwords && room.settings.banwords.length) {
				room.banwordRegex = new RegExp('(?:\\b|(?!\\w))(?:' + room.settings.banwords.join('|') + ')(?:\\b|\\B(?!\\w))', 'i');
			} else {
				room.banwordRegex = true;
			}
		}
		if (!message) return true;
		if (room.banwordRegex !== true && room.banwordRegex.test(message)) {
			return false;
		}
		return this.checkBanwords(room.parent , message);
	}
	checkGameFilter() {
		if (!this.room || !this.room.game || !this.room.game.onChatMessage) return false;
		return this.room.game.onChatMessage(this.message, this.user);
	}
	pmTransform(originalMessage) {
		if (this.room) throw new Error(`Not a PM`);
		const targetIdentity = this.pmTarget ? this.pmTarget.getIdentity() : '~';
		const prefix = `|pm|${this.user.getIdentity()}|${targetIdentity}|`;
		return originalMessage.split('\n').map(message => {
			if (message.startsWith('||')) {
				return prefix + `/text ` + message.slice(2);
			} else if (message.startsWith(`|html|`)) {
				return prefix + `/raw ` + message.slice(6);
			} else if (message.startsWith(`|modaction|`)) {
				return prefix + `/log ` + message.slice(11);
			} else if (message.startsWith(`|raw|`)) {
				return prefix + `/raw ` + message.slice(5);
			} else if (message.startsWith(`|error|`)) {
				return prefix + `/error ` + message.slice(7);
			} else if (message.startsWith(`|c~|`)) {
				return prefix + message.slice(4);
			} else if (message.startsWith(`|c|~|/`)) {
				return prefix + message.slice(5);
			}
			return prefix + `/text ` + message;
		}).join(`\n`);
	}
	sendReply(data) {
		if (this.broadcasting && this.broadcastToRoom) {
			// broadcasting
			this.add(data);
		} else {
			// not broadcasting
			if (!this.room) {
				data = this.pmTransform(data);
				this.connection.send(data);
			} else {
				this.connection.sendTo(this.room, data);
			}
		}
	}
	errorReply(message) {
		this.sendReply(`|error|` + message.replace(/\n/g, `\n|error|`));
	}
	addBox(htmlContent) {
		this.add(`|html|<div class="infobox">${htmlContent}</div>`);
	}
	sendReplyBox(htmlContent) {
		this.sendReply(`|html|<div class="infobox">${htmlContent}</div>`);
	}
	popupReply(message) {
		this.connection.popup(message);
	}
	add(data) {
		if (this.room) {
			this.room.add(data);
		} else {
			this.send(data);
		}
	}
	send(data) {
		if (this.room) {
			this.room.send(data);
		} else {
			data = this.pmTransform(data);
			this.user.send(data);
			if (this.pmTarget && this.pmTarget !== this.user) {
				this.pmTarget.send(data);
			}
		}
	}

	/** like privateModAction, but also notify Staff room */
	privateGlobalModAction(msg) {
		this.privateModAction(`(${msg})`);
		if (_optionalChain([this, 'access', _7 => _7.room, 'optionalAccess', _8 => _8.roomid]) !== 'staff') {
			_optionalChain([Rooms, 'access', _9 => _9.get, 'call', _10 => _10('staff'), 'optionalAccess', _11 => _11.addByUser, 'call', _12 => _12(this.user, `${this.room ? `<<${this.room.roomid}>>` : `<PM:${this.pmTarget}>`} ${msg}`), 'access', _13 => _13.update, 'call', _14 => _14()]);
		}
	}
	addGlobalModAction(msg) {
		this.addModAction(msg);
		if (_optionalChain([this, 'access', _15 => _15.room, 'optionalAccess', _16 => _16.roomid]) !== 'staff') {
			_optionalChain([Rooms, 'access', _17 => _17.get, 'call', _18 => _18('staff'), 'optionalAccess', _19 => _19.addByUser, 'call', _20 => _20(this.user, `${this.room ? `<<${this.room.roomid}>>` : `<PM:${this.pmTarget}>`} ${msg}`), 'access', _21 => _21.update, 'call', _22 => _22()]);
		}
	}

	privateModAction(msg) {
		if (this.room) {
			if (this.room.roomid === 'staff') {
				this.room.addByUser(this.user, msg);
			} else {
				this.room.sendModsByUser(this.user, msg);
			}
		} else {
			const data = this.pmTransform(`|modaction|${msg}`);
			this.user.send(data);
			if (this.pmTarget && this.pmTarget !== this.user && this.pmTarget.isStaff) {
				this.pmTarget.send(data);
			}
		}
		this.roomlog(msg);
	}
	globalModlog(action, user, note) {
		let buf = `(${this.room ? this.room.roomid : 'global'}) ${action}: `;
		if (user) {
			if (typeof user === 'string') {
				buf += `[${user}]`;
			} else {
				const userid = user.getLastId();
				buf += `[${userid}]`;
				if (user.autoconfirmed && user.autoconfirmed !== userid) buf += ` ac:[${user.autoconfirmed}]`;
				const alts = user.getAltUsers(false, true).slice(1).map(alt => alt.getLastId()).join('], [');
				if (alts.length) buf += ` alts:[${alts}]`;
				buf += ` [${user.latestIp}]`;
			}
		}
		if (!note) note = ` by ${this.user.id}`;
		buf += note.replace(/\n/gm, ' ');

		Rooms.global.modlog(buf);
		if (this.room) this.room.modlog(buf);
	}
	modlog(
		action,
		user = null,
		note = null,
		options = {}
	) {
		let buf = `(${_optionalChain([this, 'access', _23 => _23.room, 'optionalAccess', _24 => _24.roomid]) || 'global'}) ${action}: `;
		if (user) {
			if (typeof user === 'string') {
				buf += `[${toID(user)}]`;
			} else {
				const userid = user.getLastId();
				buf += `[${userid}]`;
				if (!options.noalts) {
					if (user.autoconfirmed && user.autoconfirmed !== userid) buf += ` ac:[${user.autoconfirmed}]`;
					const alts = user.getAltUsers(false, true).slice(1).map(alt => alt.getLastId()).join('], [');
					if (alts.length) buf += ` alts:[${alts}]`;
				}
				if (!options.noip) buf += ` [${user.latestIp}]`;
			}
		}
		buf += ` by ${this.user.id}`;
		if (note) buf += `: ${note.replace(/\n/gm, ' ')}`;

		(this.room || Rooms.global).modlog(buf);
	}
	roomlog(data) {
		if (this.room) this.room.roomlog(data);
	}
	stafflog(data) {
		_optionalChain([(Rooms.get('staff') || Rooms.lobby || this.room), 'optionalAccess', _25 => _25.roomlog, 'call', _26 => _26(data)]);
	}
	addModAction(msg) {
		if (this.room) {
			this.room.addByUser(this.user, msg);
		} else {
			this.send(`|modaction|${msg}`);
		}
	}
	update() {
		if (this.room) this.room.update();
	}
	filter(message, targetUser = null) {
		if (!this.room) return null;
		return exports.Chat.filter(this, message, this.user, this.room, this.connection, targetUser);
	}
	statusfilter(status) {
		return exports.Chat.statusfilter(status, this.user);
	}
	

	can(permission, target = null, room = null) {
		if (!this.user.can(permission , target, room )) {
			this.errorReply(this.cmdToken + this.fullCmd + " - Access denied.");
			return false;
		}
		return true;
	}
	canUseConsole() {
		if (!this.user.hasConsoleAccess(this.connection)) {
			this.errorReply(this.cmdToken + this.fullCmd + " - Requires console access, please set up `Config.consoleips`.");
			return false;
		}
		return true;
	}
	shouldBroadcast() {
		return this.cmdToken === BROADCAST_TOKEN;
	}
	canBroadcast(ignoreCooldown, suppressMessage) {
		if (this.broadcasting || !this.shouldBroadcast()) {
			return true;
		}

		if (this.room && !this.user.can('show', null, this.room)) {
			this.errorReply(`You need to be voiced to broadcast this command's information.`);
			this.errorReply(`To see it for yourself, use: /${this.message.slice(1)}`);
			return false;
		}

		if (!this.room && !this.pmTarget) {
			this.errorReply(`Broadcasting a command with "!" in a PM or chatroom will show it that user or room.`);
			this.errorReply(`To see it for yourself, use: /${this.message.slice(1)}`);
			return false;
		}

		// broadcast cooldown
		const broadcastMessage = (suppressMessage || this.message).toLowerCase().replace(/[^a-z0-9\s!,]/g, '');

		if (!ignoreCooldown && this.room && this.room.lastBroadcast === broadcastMessage &&
			this.room.lastBroadcastTime >= Date.now() - BROADCAST_COOLDOWN &&
			!this.user.can('bypassall')) {
			this.errorReply("You can't broadcast this because it was just broadcasted.");
			return false;
		}

		const message = this.canTalk(suppressMessage || this.message);
		if (!message) {
			this.errorReply(`To see it for yourself, use: /${this.message.slice(1)}`);
			return false;
		}

		// canTalk will only return true with no message
		this.message = message;
		this.broadcastMessage = broadcastMessage;
		return true;
	}
	runBroadcast(ignoreCooldown = false, suppressMessage = null) {
		if (this.broadcasting || !this.shouldBroadcast()) {
			// Already being broadcast, or the user doesn't intend to broadcast.
			return true;
		}

		if (!this.broadcastMessage) {
			// Permission hasn't been checked yet. Do it now.
			if (!this.canBroadcast(ignoreCooldown, suppressMessage)) return false;
		}

		this.broadcasting = true;

		if (this.pmTarget) {
			this.sendReply('|c~|' + (suppressMessage || this.message));
		} else {
			this.sendReply('|c|' + this.user.getIdentity(this.room ? this.room.roomid : '') + '|' + (suppressMessage || this.message));
		}
		if (!ignoreCooldown && this.room) {
			this.room.lastBroadcast = this.broadcastMessage;
			this.room.lastBroadcastTime = Date.now();
		}

		return true;
	}
	/* The sucrase transformation of optional chaining is too expensive to be used in a hot function like this. */
	/* eslint-disable @typescript-eslint/prefer-optional-chain */
	

	canTalk(message = null, room = null, targetUser = null) {
		if (!targetUser && this.pmTarget) {
			targetUser = this.pmTarget;
		}
		if (targetUser) {
			room = null;
		} else if (!room) {
			// @ts-ignore excludes GlobalRoom above
			room = this.room;
		}
		const user = this.user;
		const connection = this.connection;

		if (!user.named) {
			connection.popup(this.tr(`You must choose a name before you can talk.`));
			return null;
		}
		if (!user.can('bypassall')) {
			const lockType = (user.namelocked ? this.tr(`namelocked`) : user.locked ? this.tr(`locked`) : ``);
			const lockExpiration = Punishments.checkLockExpiration(user.namelocked || user.locked);
			if (room) {
				if (lockType && !room.settings.isHelp) {
					this.errorReply(this.tr `You are ${lockType} and can't talk in chat. ${lockExpiration}`);
					this.sendReply(`|html|<a href="view-help-request--appeal" class="button">${this.tr("Get help with this")}</a>`);
					return null;
				}
				if (room.isMuted(user)) {
					this.errorReply(this.tr(`You are muted and cannot talk in this room.`));
					return null;
				}
				if (room.settings.modchat && !user.authAtLeast(room.settings.modchat, room)) {
					if (room.settings.modchat === 'autoconfirmed') {
						this.errorReply(
							this.tr(
								`Because moderated chat is set, your account must be at least one week old and you must have won at least one ladder game to speak in this room.`
							)
						);
						return null;
					}
					if (room.settings.modchat === 'trusted') {
						this.errorReply(
							this.tr(
								`Because moderated chat is set, your account must be staff in a public room or have a global rank to speak in this room.`
							)
						);
						return null;
					}
					const groupName = Config.groups[room.settings.modchat] && Config.groups[room.settings.modchat].name ||
						room.settings.modchat;
					this.errorReply(
						this.tr `Because moderated chat is set, you must be of rank ${groupName} or higher to speak in this room.`
					);
					return null;
				}
				if (!(user.id in room.users)) {
					connection.popup(`You can't send a message to this room without being in it.`);
					return null;
				}
			}
			// TODO: translate these messages. Currently there isn't much of a point since languages are room-dependent,
			// and these PM-related messages aren't attached to any rooms. If we ever get to letting users set their
			// own language these messages should also be translated. - Asheviere
			if (targetUser) {
				if (lockType && !targetUser.can('lock')) {
					this.errorReply(`You are ${lockType} and can only private message members of the global moderation team. ${lockExpiration}`);
					this.sendReply(`|html|<a href="view-help-request--appeal" class="button">Get help with this</a>`);
					return null;
				}
				if (targetUser.locked && !user.can('lock')) {
					this.errorReply(`The user "${targetUser.name}" is locked and cannot be PMed.`);
					return null;
				}
				if (Config.pmmodchat && !user.authAtLeast(Config.pmmodchat) &&
					!Users.Auth.hasPermission(targetUser.group, 'promote', Config.pmmodchat )) {
					const groupName = Config.groups[Config.pmmodchat] && Config.groups[Config.pmmodchat].name || Config.pmmodchat;
					this.errorReply(`On this server, you must be of rank ${groupName} or higher to PM users.`);
					return null;
				}
				if (targetUser.settings.blockPMs &&
					(targetUser.settings.blockPMs === true || !user.authAtLeast(targetUser.settings.blockPMs)) &&
					!user.can('lock')) {
					exports.Chat.maybeNotifyBlocked('pm', targetUser, user);
					if (!targetUser.can('lock')) {
						this.errorReply(`This user is blocking private messages right now.`);
						return null;
					} else {
						this.errorReply(`This ${Config.groups[targetUser.group].name} is too busy to answer private messages right now. Please contact a different staff member.`);
						this.sendReply(`|html|If you need help, try opening a <a href="view-help-request" class="button">help ticket</a>`);
						return null;
					}
				}
				if (user.settings.blockPMs && (user.settings.blockPMs === true ||
					!targetUser.authAtLeast(user.settings.blockPMs)) && !targetUser.can('lock')) {
					this.errorReply(`You are blocking private messages right now.`);
					return null;
				}
			}
		}

		if (typeof message !== 'string') return true;

		if (!message) {
			connection.popup(this.tr("Your message can't be blank."));
			return null;
		}
		let length = message.length;
		length += 10 * message.replace(/[^\ufdfd]*/g, '').length;
		if (length > MAX_MESSAGE_LENGTH && !user.can('ignorelimits')) {
			this.errorReply(this.tr("Your message is too long: ") + message);
			return null;
		}

		// remove zalgo
		// eslint-disable-next-line max-len
		message = message.replace(/[\u0300-\u036f\u0483-\u0489\u0610-\u0615\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06ED\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]{3,}/g, '');
		if (/[\u115f\u1160\u239b-\u23b9]/.test(message)) {
			this.errorReply(this.tr("Your message contains banned characters."));
			return null;
		}

		// If the corresponding config option is set, non-AC users cannot send links, except to staff.
		if (Config.restrictLinks && !user.autoconfirmed) {
			// eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
			const links = message.match(exports.Chat.linkRegex);
			const allLinksWhitelisted = !links || links.every(link => {
				link = link.toLowerCase();
				const domainMatches = /^(?:http:\/\/|https:\/\/)?(?:[^/]*\.)?([^/.]*\.[^/.]*)\.?($|\/|:)/.exec(link);
				const domain = _optionalChain([domainMatches, 'optionalAccess', _27 => _27[1]]);
				const hostMatches = /^(?:http:\/\/|https:\/\/)?([^/]*[^/.])\.?($|\/|:)/.exec(link);
				let host = _optionalChain([hostMatches, 'optionalAccess', _28 => _28[1]]);
				if (_optionalChain([host, 'optionalAccess', _29 => _29.startsWith, 'call', _30 => _30('www.')])) host = host.slice(4);
				if (!domain || !host) return null;
				return LINK_WHITELIST.includes(host) || LINK_WHITELIST.includes(`*.${domain}`);
			});
			if (!allLinksWhitelisted && !(_optionalChain([targetUser, 'optionalAccess', _31 => _31.can, 'call', _32 => _32('lock')]) || _optionalChain([room, 'optionalAccess', _33 => _33.settings, 'access', _34 => _34.isHelp]))) {
				this.errorReply("Your account must be autoconfirmed to send links to other users, except for global staff.");
				return null;
			}
		}

		if (!this.checkFormat(room, user, message)) {
			return null;
		}

		if (!this.checkSlowchat(room, user)) {
			this.errorReply(
				this.tr`This room has slow-chat enabled. You can only talk once every ${room.settings.slowchat} seconds.`
			);
			return null;
		}

		if (!this.checkBanwords(room, user.name) && !user.can('bypassall')) {
			this.errorReply(this.tr(`Your username contains a phrase banned by this room.`));
			return null;
		}
		if (user.userMessage && (!this.checkBanwords(room, user.userMessage) && !user.can('bypassall'))) {
			this.errorReply(this.tr(`Your status message contains a phrase banned by this room.`));
			return null;
		}
		if (!this.checkBanwords(room, message) && !user.can('mute', null, room)) {
			this.errorReply(this.tr("Your message contained banned words in this room."));
			return null;
		}

		const gameFilter = this.checkGameFilter();
		if (gameFilter && !user.can('bypassall')) {
			this.errorReply(gameFilter);
			return null;
		}

		if (room) {
			const normalized = message.trim();
			if (
				!user.can('bypassall') && (['help', 'lobby'].includes(room.roomid)) && (normalized === user.lastMessage) &&
				((Date.now() - user.lastMessageTime) < MESSAGE_COOLDOWN)
			) {
				this.errorReply(this.tr("You can't send the same message again so soon."));
				return null;
			}
			user.lastMessage = message;
			user.lastMessageTime = Date.now();
		}

		if (_optionalChain([room, 'optionalAccess', _35 => _35.settings, 'access', _36 => _36.highTraffic]) &&
			toID(message).replace(/[^a-z]+/, '').length < 2 &&
			!user.can('show', null, room)) {
			this.errorReply(
				this.tr('Due to this room being a high traffic room, your message must contain at least two letters.')
			);
			return null;
		}

		if (exports.Chat.filters.length) {
			return exports.Chat.filter(this, message, user, room, connection, targetUser);
		}

		return message;
	}
	/* eslint-enable @typescript-eslint/prefer-optional-chain */
	canEmbedURI(uri, autofix) {
		if (uri.startsWith('https://')) return uri;
		if (uri.startsWith('//')) return uri;
		if (uri.startsWith('data:')) return uri;
		if (!uri.startsWith('http://')) {
			if (/^[a-z]+:\/\//.test(uri)) {
				this.errorReply("Image URLs must begin with 'https://' or 'http://' or 'data:'");
				return null;
			}
		} else {
			uri = uri.slice(7);
		}
		const slashIndex = uri.indexOf('/');
		let domain = (slashIndex >= 0 ? uri.slice(0, slashIndex) : uri);

		// heuristic that works for all the domains we care about
		const secondLastDotIndex = domain.lastIndexOf('.', domain.length - 5);
		if (secondLastDotIndex >= 0) domain = domain.slice(secondLastDotIndex + 1);

		const approvedDomains = [
			'imgur.com',
			'gyazo.com',
			'puu.sh',
			'rotmgtool.com',
			'pokemonshowdown.com',
			'nocookie.net',
			'blogspot.com',
			'imageshack.us',
			'deviantart.net',
			'd.pr',
			'pokefans.net',
		];
		if (approvedDomains.includes(domain)) {
			if (autofix) return `//${uri}`;
			this.errorReply(`Please use HTTPS for image "${uri}"`);
			return null;
		}
		if (domain === 'bit.ly') {
			this.errorReply("Please don't use URL shorteners.");
			return null;
		}
		// unknown URI, allow HTTP to be safe
		return uri;
	}
	/**
	 * This is a quick and dirty first-pass "is this good HTML" check. The full
	 * sanitization is done on the client by Caja in `src/battle-log.ts`
	 * `BattleLog.sanitizeHTML`.
	 */
	canHTML(htmlContent) {
		htmlContent = ('' + (htmlContent || '')).trim();
		if (!htmlContent) return '';
		if (/>here.?</i.test(htmlContent) || /click here/i.test(htmlContent)) {
			this.errorReply('Do not use "click here"');
			return null;
		}

		// check for mismatched tags
		const tags = htmlContent.match(/<!--.*?-->|<\/?[^<>]*/g);
		if (tags) {
			const ILLEGAL_TAGS = [
				'script', 'head', 'body', 'html', 'canvas', 'base', 'meta', 'link',
			];
			const LEGAL_AUTOCLOSE_TAGS = [
				// void elements (no-close tags)
				'br', 'area', 'embed', 'hr', 'img', 'source', 'track', 'input', 'wbr', 'col',
				// autoclose tags
				'p', 'li', 'dt', 'dd', 'option', 'tr', 'th', 'td', 'thead', 'tbody', 'tfoot', 'colgroup',
				// PS custom element
				'psicon',
			];
			const stack = [];
			for (const tag of tags) {
				const isClosingTag = tag.charAt(1) === '/';
				const tagContent = tag.slice(isClosingTag ? 2 : 1).replace(/\s+/, ' ').trim();
				const tagNameEndIndex = tagContent.indexOf(' ');
				const tagName = tagContent.slice(0, tagNameEndIndex >= 0 ? tagNameEndIndex : undefined).toLowerCase();
				if (tagName === '!--') continue;
				if (isClosingTag) {
					if (LEGAL_AUTOCLOSE_TAGS.includes(tagName)) continue;
					if (!stack.length) {
						this.errorReply(`Extraneous </${tagName}> without an opening tag.`);
						return null;
					}
					const expectedTagName = stack.pop();
					if (tagName !== expectedTagName) {
						this.errorReply(`Extraneous </${tagName}> where </${expectedTagName}> was expected.`);
						return null;
					}
					continue;
				}

				if (ILLEGAL_TAGS.includes(tagName) || !/^[a-z]+[0-9]?$/.test(tagName)) {
					this.errorReply(`Illegal tag <${tagName}> can't be used here.`);
					return null;
				}
				if (!LEGAL_AUTOCLOSE_TAGS.includes(tagName)) {
					stack.push(tagName);
				}

				if (tagName === 'img') {
					if (!this.room || (this.room.settings.isPersonal && !this.user.can('lock'))) {
						this.errorReply(`This tag is not allowed: <${tagContent}>`);
						this.errorReply(`Images are not allowed outside of chatrooms.`);
						return null;
					}
					if (!/width ?= ?(?:[0-9]+|"[0-9]+")/i.test(tagContent) || !/height ?= ?(?:[0-9]+|"[0-9]+")/i.test(tagContent)) {
						// Width and height are required because most browsers insert the
						// <img> element before width and height are known, and when the
						// image is loaded, this changes the height of the chat area, which
						// messes up autoscrolling.
						this.errorReply(`This image is missing a width/height attribute: <${tagContent}>`);
						this.errorReply(`Images without predefined width/height cause problems with scrolling because loading them changes their height.`);
						return null;
					}
					const srcMatch = / src ?= ?"?([^ "]+)(?: ?")?/i.exec(tagContent);
					if (srcMatch) {
						if (!this.canEmbedURI(srcMatch[1])) return null;
					} else {
						this.errorReply(`This image has a broken src attribute: <${tagContent}>`);
						this.errorReply(`The src attribute must exist and have no spaces in the URL`);
						return null;
					}
				}
				if (tagName === 'button') {
					if ((!this.room || this.room.settings.isPersonal || this.room.settings.isPrivate === true) && !this.user.can('lock')) {
						const buttonName = _optionalChain([/ name ?= ?"([^"]*)"/i, 'access', _37 => _37.exec, 'call', _38 => _38(tagContent), 'optionalAccess', _39 => _39[1]]);
						const buttonValue = _optionalChain([/ value ?= ?"([^"]*)"/i, 'access', _40 => _40.exec, 'call', _41 => _41(tagContent), 'optionalAccess', _42 => _42[1]]);
						if (buttonName === 'send' && _optionalChain([buttonValue, 'optionalAccess', _43 => _43.startsWith, 'call', _44 => _44('/msg ')])) {
							const [pmTarget] = buttonValue.slice(5).split(',');
							const auth = this.room ? this.room.auth : Users.globalAuth;
							if (auth.get(toID(pmTarget)) !== '*') {
								this.errorReply(`This button is not allowed: <${tagContent}>`);
								this.errorReply(`Your scripted button can't send PMs to ${pmTarget}, because that user is not a Room Bot.`);
								return null;
							}
						} else if (buttonName) {
							this.errorReply(`This button is not allowed: <${tagContent}>`);
							this.errorReply(`You do not have permission to use most buttons. Here are the two types you're allowed can use:`);
							this.errorReply(`1. Linking to a room: <a href="/roomid"><button>go to a place</button></a>`);
							this.errorReply(`2. Sending a message to a Bot: <button name="send" value="/msg BOT_USERNAME, MESSAGE">send the thing</button>`);
							return null;
						}
					}
				}
			}
			if (stack.length) {
				this.errorReply(`Missing </${stack.pop()}>.`);
				return null;
			}
		}

		return htmlContent;
	}
	targetUserOrSelf(target, exactName) {
		if (!target) {
			this.targetUsername = this.user.name;
			this.inputUsername = this.user.name;
			return this.user;
		}
		this.splitTarget(target, exactName);
		return this.targetUser;
	}

	/**
	 * Given a message in the form "USERNAME" or "USERNAME, MORE", splits
	 * it apart:
	 *
	 * - `this.targetUser` will be the User corresponding to USERNAME
	 *   (or null, if not found)
	 *
	 * - `this.inputUsername` will be the text of USERNAME, unmodified
	 *
	 * - `this.targetUsername` will be the username, if found, or
	 *   this.inputUsername otherwise
	 *
	 * - and the text of MORE will be returned (empty string, if the
	 *   message has no comma)
	 *
	 */
	splitTarget(target, exactName = false) {
		const [name, rest] = this.splitOne(target);

		this.targetUser = Users.get(name, exactName);
		this.inputUsername = name.trim();
		this.targetUsername = this.targetUser ? this.targetUser.name : this.inputUsername;
		return rest;
	}

	requiresRoom() {
		this.errorReply(`/${this.cmd} - must be used in a chat room, not a ${this.pmTarget ? "PM" : "console"}`);
	}
} exports.CommandContext = CommandContext;

 const Chat = new (_class = class {
	constructor() {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);_class.prototype.__init8.call(this);_class.prototype.__init9.call(this);_class.prototype.__init10.call(this);_class.prototype.__init11.call(this);_class.prototype.__init12.call(this);_class.prototype.__init13.call(this);_class.prototype.__init14.call(this);_class.prototype.__init15.call(this);_class.prototype.__init16.call(this);_class.prototype.__init17.call(this);_class.prototype.__init18.call(this);_class.prototype.__init19.call(this);_class.prototype.__init20.call(this);_class.prototype.__init21.call(this);_class.prototype.__init22.call(this);_class.prototype.__init23.call(this);_class.prototype.__init24.call(this);_class.prototype.__init25.call(this);_class.prototype.__init26.call(this);_class.prototype.__init27.call(this);
		void this.loadTranslations();
	}
	 __init() {this.multiLinePattern = new PatternTester()}

	/*********************************************************
	 * Load command files
	 *********************************************************/
	__init2() {this.baseCommands = undefined}
	__init3() {this.commands = undefined}
	__init4() {this.basePages = undefined}
	__init5() {this.pages = undefined}
	 __init6() {this.destroyHandlers = []}
	__init7() {this.roomSettings = []}

	/*********************************************************
	 * Load chat filters
	 *********************************************************/
	 __init8() {this.filters = []}
	filter(
		context,
		message,
		user,
		room,
		connection,
		targetUser = null
	) {
		// Chat filters can choose to:
		// 1. return false OR null - to not send a user's message
		// 2. return an altered string - to alter a user's message
		// 3. return undefined to send the original message through
		const originalMessage = message;
		for (const curFilter of exports.Chat.filters) {
			const output = curFilter.call(context, message, user, room, connection, targetUser, originalMessage);
			if (output === false) return null;
			if (!output && output !== undefined) return output;
			if (output !== undefined) message = output;
		}

		return message;
	}

	 __init9() {this.namefilters = []}
	namefilter(name, user) {
		if (!Config.disablebasicnamefilter) {
			// whitelist
			// \u00A1-\u00BF\u00D7\u00F7  Latin punctuation/symbols
			// \u02B9-\u0362              basic combining accents
			// \u2012-\u2027\u2030-\u205E Latin punctuation/symbols extended
			// \u2050-\u205F              fractions extended
			// \u2190-\u23FA\u2500-\u2BD1 misc symbols
			// \u2E80-\u32FF              CJK symbols
			// \u3400-\u9FFF              CJK
			// \uF900-\uFAFF\uFE00-\uFE6F CJK extended
			// eslint-disable-next-line no-misleading-character-class, max-len
			name = name.replace(/[^a-zA-Z0-9 /\\.~()<>^*%&=+$#_'?!"\u00A1-\u00BF\u00D7\u00F7\u02B9-\u0362\u2012-\u2027\u2030-\u205E\u2050-\u205F\u2190-\u23FA\u2500-\u2BD1\u2E80-\u32FF\u3400-\u9FFF\uF900-\uFAFF\uFE00-\uFE6F-]+/g, '');

			// blacklist
			// \u00a1 upside-down exclamation mark (i)
			// \u2580-\u2590 black bars
			// \u25A0\u25Ac\u25AE\u25B0 black bars
			// \u534d\u5350 swastika
			// \u2a0d crossed integral (f)
			name = name.replace(/[\u00a1\u2580-\u2590\u25A0\u25Ac\u25AE\u25B0\u2a0d\u534d\u5350]/g, '');

			// e-mail address
			if (name.includes('@') && name.includes('.')) return '';

			// url
			if (/[a-z0-9]\.(com|net|org|us|uk|co|gg|tk|ml|gq|ga|xxx|download|stream)\b/i.test(name)) name = name.replace(/\./g, '');

			// Limit the amount of symbols allowed in usernames to 4 maximum, and
			// disallow (R) and (C) from being used in the middle of names.
			// eslint-disable-next-line max-len
			const nameSymbols = name.replace(/[^\u00A1-\u00BF\u00D7\u00F7\u02B9-\u0362\u2012-\u2027\u2030-\u205E\u2050-\u205F\u2090-\u23FA\u2500-\u2BD1]+/g, '');
			// \u00ae\u00a9 (R) (C)
			// eslint-disable-next-line no-misleading-character-class, max-len
			if (nameSymbols.length > 4 || /[^a-z0-9][a-z0-9][^a-z0-9]/.test(name.toLowerCase() + ' ') || /[\u00ae\u00a9].*[a-zA-Z0-9]/.test(name)) name = name.replace(/[\u00A1-\u00BF\u00D7\u00F7\u02B9-\u0362\u2012-\u2027\u2030-\u205E\u2050-\u205F\u2190-\u23FA\u2500-\u2BD1\u2E80-\u32FF\u3400-\u9FFF\uF900-\uFAFF\uFE00-\uFE6F]+/g, '').replace(/[^A-Za-z0-9]{2,}/g, ' ').trim();
		}
		name = name.replace(/^[^A-Za-z0-9]+/, ""); // remove symbols from start
		name = name.replace(/@/g, ""); // Remove @ as this is used to indicate status messages

		// cut name length down to 18 chars
		if (/[A-Za-z0-9]/.test(name.slice(18))) {
			name = name.replace(/[^A-Za-z0-9]+/g, "");
		} else {
			name = name.slice(0, 18);
		}

		name = Dex.getName(name);
		for (const curFilter of exports.Chat.namefilters) {
			name = curFilter(name, user);
			if (!name) return '';
		}
		return name;
	}

	 __init10() {this.hostfilters = []}
	hostfilter(host, user, connection, hostType) {
		for (const curFilter of exports.Chat.hostfilters) {
			curFilter(host, user, connection, hostType);
		}
	}

	 __init11() {this.loginfilters = []}
	loginfilter(user, oldUser, usertype) {
		for (const curFilter of exports.Chat.loginfilters) {
			curFilter(user, oldUser, usertype);
		}
	}

	 __init12() {this.nicknamefilters = []}
	nicknamefilter(nickname, user) {
		for (const curFilter of exports.Chat.nicknamefilters) {
			nickname = curFilter(nickname, user);
			if (!nickname) return '';
		}
		return nickname;
	}

	 __init13() {this.statusfilters = []}
	statusfilter(status, user) {
		status = status.replace(/\|/g, '');
		for (const curFilter of exports.Chat.statusfilters) {
			status = curFilter(status, user);
			if (!status) return '';
		}
		return status;
	}
	/*********************************************************
	 * Translations
	 *********************************************************/
	/** language id -> language name */
	 __init14() {this.languages = new Map()}
	/** language id -> (english string -> translated string) */
	 __init15() {this.translations = new Map()}

	loadTranslations() {
		return _fs.FS.call(void 0, TRANSLATION_DIRECTORY).readdir().then(files => {
			// ensure that english is the first entry when we iterate over Chat.languages
			exports.Chat.languages.set('english', 'English');
			for (const fname of files) {
				if (!fname.endsWith('.json')) continue;

				


				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const content = require(`../${TRANSLATION_DIRECTORY}${fname}`);
				const id = fname.slice(0, -5);

				exports.Chat.languages.set(id, content.name || "Unknown Language");
				exports.Chat.translations.set(id, new Map());

				if (content.strings) {
					for (const key in content.strings) {
						const keyLabels = [];
						const valLabels = [];
						const newKey = key.replace(/\${.+?}/g, str => {
							keyLabels.push(str);
							return '${}';
						}).replace(/\[TN: ?.+?\]/g, '');
						const val = content.strings[key].replace(/\${.+?}/g, (str) => {
							valLabels.push(str);
							return '${}';
						}).replace(/\[TN: ?.+?\]/g, '');
						exports.Chat.translations.get(id).set(newKey, [val, keyLabels, valLabels]);
					}
				}
			}
		});
	}
	

	tr(language, strings = '', ...keys) {
		if (!language) language = 'english';
		language = toID(language);
		if (!exports.Chat.translations.has(language)) throw new Error(`Trying to translate to a nonexistent language: ${language}`);
		if (!strings.length) {
			return ((fStrings, ...fKeys) => {
				return exports.Chat.tr(language, fStrings, ...fKeys);
			});
		}

		// If strings is an array (normally the case), combine before translating.
		const trString = Array.isArray(strings) ? strings.join('${}') : strings ;

		const entry = exports.Chat.translations.get(language).get(trString);
		let [translated, keyLabels, valLabels] = entry || ["", [], []];
		if (!translated) translated = trString;

		// Replace the gaps in the species string
		if (keys.length) {
			let reconstructed = '';

			const left = keyLabels.slice();
			for (const [i, str] of translated.split('${}').entries()) {
				reconstructed += str;
				if (keys[i]) {
					let index = left.indexOf(valLabels[i]);
					if (index < 0) {
						index = left.findIndex(val => !!val);
					}
					if (index < 0) index = i;
					reconstructed += keys[index];
					left[index] = null;
				}
			}

			translated = reconstructed;
		}
		return translated;
	}

	 __init16() {this.MessageContext = MessageContext};
	 __init17() {this.CommandContext = exports.CommandContext = CommandContext};
	 __init18() {this.PageContext = exports.PageContext = PageContext};
	 __init19() {this.ErrorMessage = exports.ErrorMessage = ErrorMessage};
	/**
	 * Command parser
	 *
	 * Usage:
	 *   Chat.parse(message, room, user, connection)
	 *
	 * Parses the message. If it's a command, the command is executed, if
	 * not, it's displayed directly in the room.
	 *
	 * Examples:
	 *   Chat.parse("/join lobby", room, user, connection)
	 *     will make the user join the lobby.
	 *
	 *   Chat.parse("Hi, guys!", room, user, connection)
	 *     will return "Hi, guys!" if the user isn't muted, or
	 *     if he's muted, will warn him that he's muted.
	 *
	 * The return value is the return value of the command handler, if any,
	 * or the message, if there wasn't a command. This value could be a success
	 * or failure (few commands report these) or a Promise for when the command
	 * is done executing, if it's not currently done.
	 *
	 * @param message - the message the user is trying to say
	 * @param room - the room the user is trying to say it in
	 * @param user - the user that sent the message
	 * @param connection - the connection the user sent the message from
	 */
	parse(message, room, user, connection) {
		exports.Chat.loadPlugins();
		const context = new CommandContext({message, room, user, connection});

		return context.parse();
	}
	sendPM(message, user, pmTarget, onlyRecipient = null) {
		const buf = `|pm|${user.getIdentity()}|${pmTarget.getIdentity()}|${message}`;
		if (onlyRecipient) return onlyRecipient.send(buf);
		user.send(buf);
		if (pmTarget !== user) pmTarget.send(buf);
		pmTarget.lastPM = user.id;
		user.lastPM = pmTarget.id;
	}

	__init20() {this.packageData = {}};

	loadPlugin(file) {
		let plugin;
		if (file.endsWith('.ts')) {
			plugin = require(`./${file.slice(0, -3)}`);
		} else if (file.endsWith('.js')) {
			// Switch to server/ because we'll be in .server-dist/ after this file is compiled
			plugin = require(`../server/${file}`);
		} else {
			return;
		}
		this.loadPluginData(plugin);
	}
	loadPluginData(plugin) {
		if (plugin.commands) Object.assign(exports.Chat.commands, plugin.commands);
		if (plugin.pages) Object.assign(exports.Chat.pages, plugin.pages);

		if (plugin.destroy) exports.Chat.destroyHandlers.push(plugin.destroy);
		if (plugin.roomSettings) {
			if (!Array.isArray(plugin.roomSettings)) plugin.roomSettings = [plugin.roomSettings];
			exports.Chat.roomSettings = exports.Chat.roomSettings.concat(plugin.roomSettings);
		}
		if (plugin.chatfilter) exports.Chat.filters.push(plugin.chatfilter);
		if (plugin.namefilter) exports.Chat.namefilters.push(plugin.namefilter);
		if (plugin.hostfilter) exports.Chat.hostfilters.push(plugin.hostfilter);
		if (plugin.loginfilter) exports.Chat.loginfilters.push(plugin.loginfilter);
		if (plugin.nicknamefilter) exports.Chat.nicknamefilters.push(plugin.nicknamefilter);
		if (plugin.statusfilter) exports.Chat.statusfilters.push(plugin.statusfilter);
	}
	loadPlugins() {
		if (exports.Chat.commands) return;

		void _fs.FS.call(void 0, 'package.json').readIfExists().then(data => {
			if (data) exports.Chat.packageData = JSON.parse(data);
		});

		// Install plug-in commands and chat filters

		// All resulting filenames will be relative to basePath
		const getFiles = (basePath, path) => {
			const filesInThisDir = _fs.FS.call(void 0, `${basePath}/${path}`).readdirSync();
			let allFiles = [];
			for (const file of filesInThisDir) {
				const fileWithPath = path + (path ? '/' : '') + file;
				if (_fs.FS.call(void 0, `${basePath}/${fileWithPath}`).isDirectorySync()) {
					if (file.startsWith('.')) continue;
					allFiles = allFiles.concat(getFiles(basePath, fileWithPath));
				} else {
					allFiles.push(fileWithPath);
				}
			}
			return allFiles;
		};

		exports.Chat.commands = Object.create(null);
		exports.Chat.pages = Object.create(null);
		const coreFiles = _fs.FS.call(void 0, 'server/chat-commands').readdirSync();
		for (const file of coreFiles) {
			this.loadPlugin(`chat-commands/${file}`);
		}
		exports.Chat.baseCommands = exports.Chat.commands;
		exports.Chat.basePages = exports.Chat.pages;
		exports.Chat.commands = Object.assign(Object.create(null), exports.Chat.baseCommands);
		exports.Chat.pages = Object.assign(Object.create(null), exports.Chat.basePages);

		// Load filters from Config
		this.loadPluginData(Config);
		this.loadPluginData(Tournaments);

		let files = _fs.FS.call(void 0, 'server/chat-plugins').readdirSync();
		try {
			if (_fs.FS.call(void 0, 'server/chat-plugins/private').isDirectorySync()) {
				files = files.concat(getFiles('server/chat-plugins', 'private'));
			}
		} catch (err) {
			if (err.code !== 'ENOENT') throw err;
		}

		for (const file of files) {
			this.loadPlugin(`chat-plugins/${file}`);
		}
	}
	destroy() {
		for (const handler of exports.Chat.destroyHandlers) {
			handler();
		}
	}

	/**
	 * Strips HTML from a string.
	 */
	stripHTML(htmlContent) {
		if (!htmlContent) return '';
		return htmlContent.replace(/<[^>]*>/g, '');
	}

	/**
	 * Returns singular (defaulting to '') if num is 1, or plural
	 * (defaulting to 's') otherwise. Helper function for pluralizing
	 * words.
	 */
	plural(num, pluralSuffix = 's', singular = '') {
		if (num && typeof num.length === 'number') {
			num = num.length;
		} else if (num && typeof num.size === 'number') {
			num = num.size;
		} else {
			num = Number(num);
		}
		return (num !== 1 ? pluralSuffix : singular);
	}

	/**
	 * Counts the thing passed.
	 *
	 *     Chat.count(2, "days") === "2 days"
	 *     Chat.count(1, "days") === "1 day"
	 *     Chat.count(["foo"], "things are") === "1 thing is"
	 *
	 */
	count(num, pluralSuffix, singular = "") {
		if (num && typeof num.length === 'number') {
			num = num.length;
		} else if (num && typeof num.size === 'number') {
			num = num.size;
		} else {
			num = Number(num);
		}
		if (!singular) {
			if (pluralSuffix.endsWith("s")) {
				singular = pluralSuffix.slice(0, -1);
			} else if (pluralSuffix.endsWith("s have")) {
				singular = pluralSuffix.slice(0, -6) + " has";
			} else if (pluralSuffix.endsWith("s were")) {
				singular = pluralSuffix.slice(0, -6) + " was";
			}
		}
		const space = singular.startsWith('<') ? '' : ' ';
		return `${num}${space}${num > 1 ? pluralSuffix : singular}`;
	}

	/**
	 * Returns a timestamp in the form {yyyy}-{MM}-{dd} {hh}:{mm}:{ss}.
	 *
	 * options.human = true will reports hours human-readable
	 */
	toTimestamp(date, options = {}) {
		const human = options.human;
		let parts = [
			date.getFullYear(),	date.getMonth() + 1, date.getDate(),
			date.getHours(), date.getMinutes(),	date.getSeconds(),
		];
		if (human) {
			parts.push(parts[3] >= 12 ? 'pm' : 'am');
			parts[3] = parts[3] % 12 || 12;
		}
		parts = parts.map(val => val < 10 ? '0' + val : '' + val);
		return parts.slice(0, 3).join("-") + " " + parts.slice(3, human ? 5 : 6).join(":") + (human ? "" + parts[6] : "");
	}

	/**
	 * Takes a number of milliseconds, and reports the duration in English: hours, minutes, etc.
	 *
	 * options.hhmmss = true will instead report the duration in 00:00:00 format
	 *
	 */
	toDurationString(val, options = {}) {
		// TODO: replace by Intl.DurationFormat or equivalent when it becomes available (ECMA-402)
		// https://github.com/tc39/ecma402/issues/47
		const date = new Date(+val);
		const parts = [
			date.getUTCFullYear() - 1970, date.getUTCMonth(), date.getUTCDate() - 1,
			date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(),
		];
		const roundingBoundaries = [6, 15, 12, 30, 30];
		const unitNames = ["second", "minute", "hour", "day", "month", "year"];
		const positiveIndex = parts.findIndex(elem => elem > 0);
		const precision = (_optionalChain([options, 'optionalAccess', _45 => _45.precision]) ? options.precision : parts.length);
		if (_optionalChain([options, 'optionalAccess', _46 => _46.hhmmss])) {
			const str = parts.slice(positiveIndex).map(value => value < 10 ? "0" + value : "" + value).join(":");
			return str.length === 2 ? "00:" + str : str;
		}
		// round least significant displayed unit
		if (positiveIndex + precision < parts.length && precision > 0 && positiveIndex >= 0) {
			if (parts[positiveIndex + precision] >= roundingBoundaries[positiveIndex + precision - 1]) {
				parts[positiveIndex + precision - 1]++;
			}
		}
		return parts
			.slice(positiveIndex)
			.reverse()
			.map((value, index) => value ? value + " " + unitNames[index] + (value > 1 ? "s" : "") : "")
			.reverse()
			.slice(0, precision)
			.join(" ")
			.trim();
	}

	/**
	 * Takes an array and turns it into a sentence string by adding commas and the word "and"
	 */
	toListString(arr) {
		if (!arr.length) return '';
		if (arr.length === 1) return arr[0];
		if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
		return `${arr.slice(0, -1).join(", ")}, and ${arr.slice(-1)[0]}`;
	}

	/**
	 * Takes an array and turns it into a sentence string by adding commas and the word "or"
	 */
	toOrList(arr) {
		if (!arr.length) return '';
		if (arr.length === 1) return arr[0];
		if (arr.length === 2) return `${arr[0]} or ${arr[1]}`;
		return `${arr.slice(0, -1).join(", ")}, or ${arr.slice(-1)[0]}`;
	}

	collapseLineBreaksHTML(htmlContent) {
		htmlContent = htmlContent.replace(/<[^>]*>/g, tag => tag.replace(/\n/g, ' '));
		htmlContent = htmlContent.replace(/\n/g, '&#10;');
		return htmlContent;
	}
	/**
	 * Takes a string of code and transforms it into a block of html using the details tag.
	 * If it has a newline, will make the 3 lines the preview, and fill the rest in.
	 * @param str string to block
	 */
	getReadmoreCodeBlock(str, cutoff = 3) {
		const params = str.slice(+str.startsWith('\n')).split('\n');
		const output = [];
		for (const param of params) {
			if (output.length < cutoff && param.length > 80 && cutoff > 2) cutoff--;
			output.push(_utils.Utils.escapeHTML(param));
		}

		if (output.length > cutoff) {
			return `<details class="readmore code" style="white-space: pre-wrap; display: table; tab-size: 3"><summary>${
				output.slice(0, cutoff).join('<br />')
			}</summary>${
				output.slice(cutoff).join('<br />')
			}</details>`;
		} else {
			return `<code style="white-space: pre-wrap; display: table; tab-size: 3">${
				output.join('<br />')
			}</code>`;
		}
	}

	getDataPokemonHTML(species, gen = 7, tier = '') {
		if (typeof species === 'string') species = Dex.deepClone(Dex.getSpecies(species));
		let buf = '<li class="result">';
		buf += '<span class="col numcol">' + (tier || species.tier) + '</span> ';
		buf += `<span class="col iconcol"><psicon pokemon="${species.id}"/></span> `;
		buf += `<span class="col pokemonnamecol" style="white-space:nowrap"><a href="https://${Config.routes.dex}/pokemon/${species.id}" target="_blank">${species.name}</a></span> `;
		buf += '<span class="col typecol">';
		if (species.types) {
			for (const type of species.types) {
				buf += `<img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32">`;
			}
		}
		buf += '</span> ';
		if (gen >= 3) {
			buf += '<span style="float:left;min-height:26px">';
			if (species.abilities['1'] && (gen >= 4 || Dex.getAbility(species.abilities['1']).gen === 3)) {
				buf += '<span class="col twoabilitycol">' + species.abilities['0'] + '<br />' + species.abilities['1'] + '</span>';
			} else {
				buf += '<span class="col abilitycol">' + species.abilities['0'] + '</span>';
			}
			if (species.abilities['H'] && species.abilities['S']) {
				buf += '<span class="col twoabilitycol' + (species.unreleasedHidden ? ' unreleasedhacol' : '') + '"><em>' + species.abilities['H'] + '<br />(' + species.abilities['S'] + ')</em></span>';
			} else if (species.abilities['H']) {
				buf += '<span class="col abilitycol' + (species.unreleasedHidden ? ' unreleasedhacol' : '') + '"><em>' + species.abilities['H'] + '</em></span>';
			} else if (species.abilities['S']) {
				// special case for Zygarde
				buf += '<span class="col abilitycol"><em>(' + species.abilities['S'] + ')</em></span>';
			} else {
				buf += '<span class="col abilitycol"></span>';
			}
			buf += '</span>';
		}
		let bst = 0;
		for (const baseStat of Object.values(species.baseStats)) {
			bst += baseStat;
		}
		buf += '<span style="float:left;min-height:26px">';
		buf += '<span class="col statcol"><em>HP</em><br />' + species.baseStats.hp + '</span> ';
		buf += '<span class="col statcol"><em>Atk</em><br />' + species.baseStats.atk + '</span> ';
		buf += '<span class="col statcol"><em>Def</em><br />' + species.baseStats.def + '</span> ';
		if (gen <= 1) {
			bst -= species.baseStats.spd;
			buf += '<span class="col statcol"><em>Spc</em><br />' + species.baseStats.spa + '</span> ';
		} else {
			buf += '<span class="col statcol"><em>SpA</em><br />' + species.baseStats.spa + '</span> ';
			buf += '<span class="col statcol"><em>SpD</em><br />' + species.baseStats.spd + '</span> ';
		}
		buf += '<span class="col statcol"><em>Spe</em><br />' + species.baseStats.spe + '</span> ';
		buf += '<span class="col bstcol"><em>BST<br />' + bst + '</em></span> ';
		buf += '</span>';
		buf += '</li>';
		return `<div class="message"><ul class="utilichart">${buf}<li style="clear:both"></li></ul></div>`;
	}
	getDataMoveHTML(move) {
		if (typeof move === 'string') move = Object.assign({}, Dex.getMove(move));
		let buf = `<ul class="utilichart"><li class="result">`;
		buf += `<span class="col movenamecol"><a href="https://${Config.routes.dex}/moves/${move.id}">${move.name}</a></span> `;
		// encoding is important for the ??? type icon
		const encodedMoveType = encodeURIComponent(move.type);
		buf += `<span class="col typecol"><img src="//${Config.routes.client}/sprites/types/${encodedMoveType}.png" alt="${move.type}" width="32" height="14">`;
		buf += `<img src="//${Config.routes.client}/sprites/categories/${move.category}.png" alt="${move.category}" width="32" height="14"></span> `;
		if (move.basePower) {
			buf += `<span class="col labelcol"><em>Power</em><br>${typeof move.basePower === 'number' ? move.basePower : '—'}</span> `;
		}
		buf += `<span class="col widelabelcol"><em>Accuracy</em><br>${typeof move.accuracy === 'number' ? (move.accuracy + '%') : '—'}</span> `;
		const basePP = move.pp || 1;
		const pp = Math.floor(move.noPPBoosts ? basePP : basePP * 8 / 5);
		buf += `<span class="col pplabelcol"><em>PP</em><br>${pp}</span> `;
		buf += `<span class="col movedesccol">${move.shortDesc || move.desc}</span> `;
		buf += `</li><li style="clear:both"></li></ul>`;
		return buf;
	}
	getDataAbilityHTML(ability) {
		if (typeof ability === 'string') ability = Object.assign({}, Dex.getAbility(ability));
		let buf = `<ul class="utilichart"><li class="result">`;
		buf += `<span class="col namecol"><a href="https://${Config.routes.dex}/abilities/${ability.id}">${ability.name}</a></span> `;
		buf += `<span class="col abilitydesccol">${ability.shortDesc || ability.desc}</span> `;
		buf += `</li><li style="clear:both"></li></ul>`;
		return buf;
	}
	getDataItemHTML(item) {
		if (typeof item === 'string') item = Object.assign({}, Dex.getItem(item));
		let buf = `<ul class="utilichart"><li class="result">`;
		buf += `<span class="col itemiconcol"><psicon item="${item.id}"></span> <span class="col namecol"><a href="https://${Config.routes.dex}/items/${item.id}">${item.name}</a></span> `;
		buf += `<span class="col itemdesccol">${item.shortDesc || item.desc}</span> `;
		buf += `</li><li style="clear:both"></li></ul>`;
		return buf;
	}

	/**
	 * Gets the dimension of the image at url. Returns 0x0 if the image isn't found, as well as the relevant error.
	 */
	getImageDimensions(url) {
		return probe(url);
	}

	/**
	 * Normalize a message for the purposes of applying chat filters.
	 *
	 * Not used by PS itself, but feel free to use it in your own chat filters.
	 */
	normalize(message) {
		message = message.replace(/'/g, '').replace(/[^A-Za-z0-9]+/g, ' ').trim();
		if (!/[A-Za-z][A-Za-z]/.test(message)) {
			message = message.replace(/ */g, '');
		} else if (!message.includes(' ')) {
			message = message.replace(/([A-Z])/g, ' $1').trim();
		}
		return ' ' + message.toLowerCase() + ' ';
	}

	/**
	 * Generates dimensions to fit an image at url into a maximum size of maxWidth x maxHeight,
	 * preserving aspect ratio.
	 *
	 * @return [width, height, resized]
	 */
	async fitImage(url, maxHeight = 300, maxWidth = 300) {
		const {height, width} = await exports.Chat.getImageDimensions(url);

		if (width <= maxWidth && height <= maxHeight) return [width, height, false];

		const ratio = Math.min(maxHeight / height, maxWidth / width);

		return [Math.round(width * ratio), Math.round(height * ratio), true];
	}

	/**
	 * Notifies a targetUser that a user was blocked from reaching them due to a setting they have enabled.
	 */
	maybeNotifyBlocked(blocked, targetUser, user) {
		const prefix = `|pm|&|${targetUser.getIdentity()}|/nonotify `;
		const options = 'or change it in the <button name="openOptions" class="subtle">Options</button> menu in the upper right.';
		if (blocked === 'pm') {
			if (!targetUser.notified.blockPMs) {
				targetUser.send(`${prefix}The user '${_utils.Utils.escapeHTML(user.name)}' attempted to PM you but was blocked. To enable PMs, use /unblockpms ${options}`);
				targetUser.notified.blockPMs = true;
			}
		} else if (blocked === 'challenge') {
			if (!targetUser.notified.blockChallenges) {
				targetUser.send(`${prefix}The user '${_utils.Utils.escapeHTML(user.name)}' attempted to challenge you to a battle but was blocked. To enable challenges, use /unblockchallenges ${options}`);
				targetUser.notified.blockChallenges = true;
			}
		}
	}
	 __init21() {this.formatText = _chatformatter.formatText};
	 __init22() {this.linkRegex = _chatformatter.linkRegex};
	 __init23() {this.stripFormatting = _chatformatter.stripFormatting};

	 __init24() {this.filterWords = {}};
	 __init25() {this.monitors = {}};
	 __init26() {this.namefilterwhitelist = new Map()};
	/**
	 * Inappropriate userid : number of times the name has been forcerenamed
	 */
	 __init27() {this.forceRenames = new Map()};

	registerMonitor(id, entry) {
		if (!exports.Chat.filterWords[id]) exports.Chat.filterWords[id] = [];
		exports.Chat.monitors[id] = entry;
	}

	resolvePage(pageid, user, connection) {
		return (new PageContext({pageid, user, connection})).resolve();
	}
}, _class); exports.Chat = Chat;

// backwards compatibility; don't actually use these
// they're just there so forks have time to slowly transition
(exports.Chat ).escapeHTML = _utils.Utils.escapeHTML;
(exports.Chat ).html = _utils.Utils.html;
(exports.Chat ).splitFirst = _utils.Utils.splitFirst;

/**
 * Used by ChatMonitor.
 */


















