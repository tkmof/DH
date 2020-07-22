"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Pokemon Showdown log viewer
 *
 * by Zarel
 * @license MIT
 */

var _fs = require('../../.lib-dist/fs');
var _utils = require('../../.lib-dist/utils');
var _child_process = require('child_process'); var child_process = _child_process;
var _util = require('util'); var util = _util;
var _path = require('path'); var path = _path;
var _dashycode = require('../../.lib-dist/dashycode'); var Dashycode = _dashycode;

const execFile = util.promisify(child_process.execFile);
const DAY = 24 * 60 * 60 * 1000;
const MAX_RESULTS = 3000;

class LogReaderRoom {
	
	constructor(roomid) {
		this.roomid = roomid;
	}

	async listMonths() {
		try {
			const listing = await _fs.FS.call(void 0, `logs/chat/${this.roomid}`).readdir();
			return listing.filter(file => /^[0-9][0-9][0-9][0-9]-[0-9][0-9]$/.test(file));
		} catch (err) {
			return [];
		}
	}

	async listDays(month) {
		try {
			const listing = await _fs.FS.call(void 0, `logs/chat/${this.roomid}/${month}`).readdir();
			return listing.filter(file => /\.txt$/.test(file)).map(file => file.slice(0, -4));
		} catch (err) {
			return [];
		}
	}

	async getLog(day) {
		const month = LogReader.getMonth(day);
		const log = _fs.FS.call(void 0, `logs/chat/${this.roomid}/${month}/${day}.txt`);
		if (!await log.exists()) return null;
		return log.createReadStream();
	}
}

const LogReader = new class {
	async get(roomid) {
		if (!await _fs.FS.call(void 0, `logs/chat/${roomid}`).exists()) return null;
		return new LogReaderRoom(roomid);
	}

	async list() {
		const listing = await _fs.FS.call(void 0, `logs/chat`).readdir();
		return listing.filter(file => /^[a-z0-9-]+$/.test(file)) ;
	}

	async listCategorized(user, opts) {
		const list = await this.list();
		const isUpperStaff = user.can('rangeban');
		const isStaff = user.can('lock');

		const official = [];
		const normal = [];
		const hidden = [];
		const secret = [];
		const deleted = [];
		const personal = [];
		const deletedPersonal = [];
		let atLeastOne = false;

		for (const roomid of list) {
			const room = Rooms.get(roomid);
			const forceShow = room && (
				// you are authed in the room
				(room.auth.has(user.id) && user.can('mute', null, room)) ||
				// you are staff and currently in the room
				(isStaff && user.inRooms.has(room.roomid))
			);
			if (!isUpperStaff && !forceShow) {
				if (!isStaff) continue;
				if (!room) continue;
				if (!room.checkModjoin(user)) continue;
				if (room.settings.isPrivate === true) continue;
			}

			atLeastOne = true;
			if (roomid.includes('-')) {
				const matchesOpts = opts && roomid.startsWith(`${opts}-`);
				if (matchesOpts || opts === 'all' || forceShow) {
					(room ? personal : deletedPersonal).push(roomid);
				}
			} else if (!room) {
				if (opts === 'all' || opts === 'deleted') deleted.push(roomid);
			} else if (room.settings.isOfficial) {
				official.push(roomid);
			} else if (!room.settings.isPrivate) {
				normal.push(roomid);
			} else if (room.settings.isPrivate === 'hidden') {
				hidden.push(roomid);
			} else {
				secret.push(roomid);
			}
		}

		if (!atLeastOne) return null;
		return {official, normal, hidden, secret, deleted, personal, deletedPersonal};
	}

	async read(roomid, day, limit) {
		const roomLog = await LogReader.get(roomid);
		const stream = await roomLog.getLog(day);
		let buf = '';
		let i = exports.LogViewer.results || 0;
		if (!stream) {
			buf += `<p class="message-error">Room "${roomid}" doesn't have logs for ${day}</p>`;
		} else {
			let line;
			while ((line = await stream.readLine()) !== null && i < limit) {
				const rendered = exports.LogViewer.renderLine(line);
				if (rendered) {
					buf += `${line}\n`;
					i++;
				}
			}
		}
		return buf;
	}

	getMonth(day) {
		return day.slice(0, 7);
	}
	nextDay(day) {
		const nextDay = new Date(new Date(day).getTime() + DAY);
		return nextDay.toISOString().slice(0, 10);
	}
	prevDay(day) {
		const prevDay = new Date(new Date(day).getTime() - DAY);
		return prevDay.toISOString().slice(0, 10);
	}
	nextMonth(month) {
		const nextMonth = new Date(new Date(`${month}-15`).getTime() + 30 * DAY);
		return nextMonth.toISOString().slice(0, 7);
	}
	prevMonth(month) {
		const prevMonth = new Date(new Date(`${month}-15`).getTime() - 30 * DAY);
		return prevMonth.toISOString().slice(0, 7);
	}

	today() {
		return Chat.toTimestamp(new Date()).slice(0, 10);
	}
};

 const LogViewer = new class {
	
	constructor() {
		this.results = 0;
	}
	async day(roomid, day, opts) {
		const month = LogReader.getMonth(day);
		let buf = `<div class="pad"><p>` +
			`<a roomid="view-chatlog">◂ All logs</a> / ` +
			`<a roomid="view-chatlog-${roomid}">${roomid}</a> /  ` +
			`<a roomid="view-chatlog-${roomid}--${month}">${month}</a> / ` +
			`<strong>${day}</strong></p><hr />`;

		const roomLog = await LogReader.get(roomid);
		if (!roomLog) {
			buf += `<p class="message-error">Room "${roomid}" doesn't exist</p></div>`;
			return this.linkify(buf);
		}

		const prevDay = LogReader.prevDay(day);
		buf += `<p><a roomid="view-chatlog-${roomid}--${prevDay}" class="blocklink" style="text-align:center">▲<br />${prevDay}</a></p>` +
			`<div class="message-log" style="overflow-wrap: break-word">`;

		const stream = await roomLog.getLog(day);
		if (!stream) {
			buf += `<p class="message-error">Room "${roomid}" doesn't have logs for ${day}</p>`;
		} else {
			let line;
			while ((line = await stream.readLine()) !== null) {
				buf += this.renderLine(line, opts);
			}
		}
		buf += `</div>`;
		if (day !== LogReader.today()) {
			const nextDay = LogReader.nextDay(day);
			buf += `<p><a roomid="view-chatlog-${roomid}--${nextDay}" class="blocklink" style="text-align:center">${nextDay}<br />▼</a></p>`;
		}

		buf += `</div>`;
		return this.linkify(buf);
	}

	renderDayResults(results, roomid) {
		const renderResult = (match) => {
			this.results++;
			return (
				this.renderLine(match[0]) +
				this.renderLine(match[1]) +
				`<div class="chat chatmessage highlighted">${this.renderLine(match[2])}</div>` +
				this.renderLine(match[3]) +
				this.renderLine(match[4])
			);
		};

		let buf = ``;
		for (const day in results) {
			const dayResults = results[day];
			const plural = dayResults.length !== 1 ? "es" : "";
			buf += `<details><summary>${dayResults.length} match${plural} on `;
			buf += `<a href="view-chatlog-${roomid}--${day}">${day}</a></summary><br /><hr />`;
			buf += `<p>${dayResults.filter(Boolean).map(result => renderResult(result)).join(`<hr />`)}</p>`;
			buf += `</details><hr />`;
		}
		return buf;
	}

	async searchMonth(roomid, month, search, limit, year = false) {
		const {results, total} = await LogSearcher.fsSearchMonth(roomid, month, search, limit);
		if (!total) {
			return exports.LogViewer.error(`No matches found for ${search} on ${roomid}.`);
		}

		let buf = (
			`<br><div class="pad"><strong>Searching for "${search}" in ${roomid} (${month}):</strong><hr>`
		);
		buf += this.renderDayResults(results, roomid);
		if (total > limit) {
			// cap is met & is not being used in a year read
			buf += `<br><strong>Max results reached, capped at ${total > limit ? limit : MAX_RESULTS}</strong>`;
			buf += `<br><div style="text-align:center">`;
			if (total < MAX_RESULTS) {
				buf += `<button class="button" name="send" value="/sl ${search}|${roomid}|${month}|${limit + 100}">View 100 more<br />&#x25bc;</button>`;
				buf += `<button class="button" name="send" value="/sl ${search}|${roomid}|${month}|all">View all<br />&#x25bc;</button></div>`;
			}
		}
		buf += `</div>`;
		this.results = 0;
		return buf;
	}

	async searchYear(roomid, year, search, limit) {
		const {results, total} = await LogSearcher.fsSearchYear(roomid, year, search, limit);
		if (!total) {
			return exports.LogViewer.error(`No matches found for ${search} on ${roomid}.`);
		}
		let buf = '';
		if (year) {
			buf += `<div class="pad"><strong><br>Searching year: ${year}: </strong><hr>`;
		}	else {
			buf += `<div class="pad"><strong><br>Searching all logs: </strong><hr>`;
		}
		buf += this.renderDayResults(results, roomid);
		if (total > limit) {
			// cap is met
			buf += `<br><strong>Max results reached, capped at ${total > limit ? limit : MAX_RESULTS}</strong>`;
			buf += `<br><div style="text-align:center">`;
			if (total < MAX_RESULTS) {
				buf += `<button class="button" name="send" value="/sl ${search}|${roomid}|${year}|${limit + 100}">View 100 more<br />&#x25bc;</button>`;
				buf += `<button class="button" name="send" value="/sl ${search}|${roomid}|${year}|all">View all<br />&#x25bc;</button></div>`;
			}
		}
		this.results = 0;
		return buf;
	}

	renderLine(fullLine, opts) {
		if (!fullLine) return ``;
		let timestamp = fullLine.slice(0, opts ? 8 : 5);
		let line;
		if (/^[0-9:]+$/.test(timestamp)) {
			line = fullLine.charAt(9) === '|' ? fullLine.slice(10) : '|' + fullLine.slice(9);
		} else {
			timestamp = '';
			line = '!NT|';
		}
		if (opts !== 'all' && (
			line.startsWith(`userstats|`) ||
			line.startsWith('J|') || line.startsWith('L|') || line.startsWith('N|')
		)) return ``;

		const cmd = line.slice(0, line.indexOf('|'));
		switch (cmd) {
		case 'c': {
			const [, name, message] = _utils.Utils.splitFirst(line, '|', 2);
			if (name.length <= 1) {
				return `<div class="chat"><small>[${timestamp}] </small><q>${Chat.formatText(message)}</q></div>`;
			}
			if (message.startsWith(`/log `)) {
				return `<div class="chat"><small>[${timestamp}] </small><q>${Chat.formatText(message.slice(5))}</q></div>`;
			}
			if (message.startsWith(`/raw `)) {
				return `<div class="notice">${message.slice(5)}</div>`;
			}
			if (message.startsWith(`/uhtml `) || message.startsWith(`/uhtmlchange `)) {
				if (message.startsWith(`/uhtmlchange `)) return ``;
				if (opts !== 'all') return `<div class="notice">[uhtml box hidden]</div>`;
				return `<div class="notice">${message.slice(message.indexOf(',') + 1)}</div>`;
			}
			const group = name.charAt(0) !== ' ' ? `<small>${name.charAt(0)}</small>` : ``;
			return `<div class="chat"><small>[${timestamp}] </small><strong>${group}${name.slice(1)}:</strong> <q>${Chat.formatText(message)}</q></div>`;
		}
		case 'html': case 'raw': {
			const [, html] = _utils.Utils.splitFirst(line, '|', 1);
			return `<div class="notice">${html}</div>`;
		}
		case 'uhtml': case 'uhtmlchange': {
			if (cmd !== 'uhtml') return ``;
			const [, , html] = _utils.Utils.splitFirst(line, '|', 2);
			return `<div class="notice">${html}</div>`;
		}
		case '!NT':
			return `<div class="chat">${_utils.Utils.escapeHTML(fullLine)}</div>`;
		case '':
			return `<div class="chat"><small>[${timestamp}] </small>${_utils.Utils.escapeHTML(line.slice(1))}</div>`;
		default:
			return `<div class="chat"><small>[${timestamp}] </small><code>${'|' + _utils.Utils.escapeHTML(line)}</code></div>`;
		}
	}

	async month(roomid, month) {
		let buf = `<div class="pad"><p>` +
			`<a roomid="view-chatlog">◂ All logs</a> / ` +
			`<a roomid="view-chatlog-${roomid}">${roomid}</a> / ` +
			`<strong>${month}</strong></p><hr />`;

		const roomLog = await LogReader.get(roomid);
		if (!roomLog) {
			buf += `<p class="message-error">Room "${roomid}" doesn't exist</p></div>`;
			return this.linkify(buf);
		}

		const prevMonth = LogReader.prevMonth(month);
		buf += `<p><a roomid="view-chatlog-${roomid}--${prevMonth}" class="blocklink" style="text-align:center">▲<br />${prevMonth}</a></p><div>`;

		const days = await roomLog.listDays(month);
		if (!days.length) {
			buf += `<p class="message-error">Room "${roomid}" doesn't have logs in ${month}</p></div>`;
			return this.linkify(buf);
		} else {
			for (const day of days) {
				buf += `<p>- <a roomid="view-chatlog-${roomid}--${day}">${day}</a></p>`;
			}
		}

		if (!LogReader.today().startsWith(month)) {
			const nextMonth = LogReader.nextMonth(month);
			buf += `<p><a roomid="view-chatlog-${roomid}--${nextMonth}" class="blocklink" style="text-align:center">${nextMonth}<br />▼</a></p>`;
		}

		buf += `</div>`;
		return this.linkify(buf);
	}
	async room(roomid) {
		let buf = `<div class="pad"><p>` +
			`<a roomid="view-chatlog">◂ All logs</a> / ` +
			`<strong>${roomid}</strong></p><hr />`;

		const roomLog = await LogReader.get(roomid);
		if (!roomLog) {
			buf += `<p class="message-error">Room "${roomid}" doesn't exist</p></div>`;
			return this.linkify(buf);
		}

		const months = await roomLog.listMonths();
		if (!months.length) {
			buf += `<p class="message-error">Room "${roomid}" doesn't have logs</p></div>`;
			return this.linkify(buf);
		}

		for (const month of months) {
			buf += `<p>- <a roomid="view-chatlog-${roomid}--${month}">${month}</a></p>`;
		}
		buf += `</div>`;
		return this.linkify(buf);
	}
	async list(user, opts) {
		let buf = `<div class="pad"><p>` +
			`<strong>All logs</strong></p><hr />`;

		const categories = {
			'official': "Official",
			'normal': "Public",
			'hidden': "Hidden",
			'secret': "Secret",
			'deleted': "Deleted",
			'personal': "Personal",
			'deletedPersonal': "Deleted Personal",
		};
		const list = await LogReader.listCategorized(user, opts) ;

		if (!list) {
			buf += `<p class="message-error">You must be a staff member of a room to view its logs</p></div>`;
			return buf;
		}

		const showPersonalLink = opts !== 'all' && user.can('rangeban');
		for (const k in categories) {
			if (!list[k].length && !(['personal', 'deleted'].includes(k) && showPersonalLink)) {
				continue;
			}
			buf += `<p>${categories[k]}</p>`;
			if (k === 'personal' && showPersonalLink) {
				if (opts !== 'help') buf += `<p>- <a roomid="view-chatlog--help">(show all help)</a></p>`;
				if (opts !== 'groupchat') buf += `<p>- <a roomid="view-chatlog--groupchat">(show all groupchat)</a></p>`;
			}
			if (k === 'deleted' && showPersonalLink) {
				if (opts !== 'deleted') buf += `<p>- <a roomid="view-chatlog--deleted">(show deleted)</a></p>`;
			}
			for (const roomid of list[k]) {
				buf += `<p>- <a roomid="view-chatlog-${roomid}">${roomid}</a></p>`;
			}
		}
		buf += `</div>`;
		return this.linkify(buf);
	}
	error(message) {
		return `<div class="pad"><p class="message-error">${message}</p></div>`;
	}
	linkify(buf) {
		return buf.replace(/<a roomid="/g, `<a target="replace" href="/`);
	}
}; exports.LogViewer = LogViewer;

/** match with two lines of context in either direction */


const LogSearcher = new class {
	fsSearch(roomid, search, date, limit) {
		const isAll = (date === 'all');
		const isYear = (date.length === 4);
		const isMonth = (date.length === 7);
		if (!limit || limit > MAX_RESULTS) limit = MAX_RESULTS;
		if (isAll) {
			return exports.LogViewer.searchYear(roomid, null, search, limit);
		} else if (isYear) {
			date = date.substr(0, 4);
			return exports.LogViewer.searchYear(roomid, date, search, limit);
		} else if (isMonth) {
			date = date.substr(0, 7);
			return exports.LogViewer.searchMonth(roomid, date, search, limit);
		} else {
			return exports.LogViewer.error("Invalid date.");
		}
	}

	async fsSearchDay(roomid, day, search, limit) {
		if (!limit || limit > MAX_RESULTS) limit = MAX_RESULTS;
		const text = await LogReader.read(roomid, day, limit);
		if (!text) return [];
		const lines = text.split('\n');
		const matches = [];

		const searchTerms = search.split('-');
		const searchTermRegexes = searchTerms.map(term => new RegExp(term, 'i'));
		function matchLine(line) {
			return searchTermRegexes.every(term => term.test(line));
		}

		for (const [i, line] of lines.entries()) {
			if (matchLine(line)) {
				matches.push([
					lines[i - 2],
					lines[i - 1],
					line,
					lines[i + 1],
					lines[i + 2],
				]);
				if (matches.length > limit) break;
			}
		}
		return matches;
	}

	async fsSearchMonth(roomid, month, search, limit) {
		if (!limit || limit > MAX_RESULTS) limit = MAX_RESULTS;
		const log = await LogReader.get(roomid);
		if (!log) return {results: {}, total: 0};
		const days = await log.listDays(month);
		const results = {};
		let total = 0;

		for (const day of days) {
			const dayResults = await this.fsSearchDay(roomid, day, search, limit ? limit - total : null);
			if (!dayResults.length) continue;
			total += dayResults.length;
			results[day] = dayResults;
			if (total > limit) break;
		}
		return {results, total};
	}

	/** pass a null `year` to search all-time */
	async fsSearchYear(roomid, year, search, limit) {
		if (!limit || limit > MAX_RESULTS) limit = MAX_RESULTS;
		const log = await LogReader.get(roomid);
		if (!log) return {results: {}, total: 0};
		let months = await log.listMonths();
		months = months.reverse();
		const results = {};
		let total = 0;

		for (const month of months) {
			if (year && !month.includes(year)) continue;
			const monthSearch = await this.fsSearchMonth(roomid, month, search, limit);
			const {results: monthResults, total: monthTotal} = monthSearch;
			if (!monthTotal) continue;
			total += monthTotal;
			Object.assign(results, monthResults);
			if (total > limit) break;
		}
		return {results, total};
	}

	async ripgrepSearch(roomid, search, limit) {
		let output;
		if (!limit || limit > MAX_RESULTS) limit = MAX_RESULTS;
		try {
			const options = [
				'-e', `[^a-zA-Z0-9]${search.split('').join('[^a-zA-Z0-9]*')}([^a-zA-Z0-9]|\\z)`,
				`${__dirname}/../../logs/chat/${roomid}`,
				'-C', '3',
				'-m', `${limit}`,
			];
			output = await execFile('rg', options, {maxBuffer: Infinity, cwd: path.normalize(`${__dirname}/../`)});
		} catch (error) {
			if (error.message.includes('Command failed')) return exports.LogViewer.error(`No results found.`);
			return exports.LogViewer.error(`${error.message}`);
		}
		return this.render(
			output.stdout.split('--').reverse(),
			roomid,
			search,
			limit
		);
	}

	render(results, roomid, search, limit) {
		const exactMatches = [];
		let curDate = '';
		if (limit > MAX_RESULTS) limit = MAX_RESULTS;
		const searchRegex = new RegExp(search, "i");
		const sorted = results.sort().map(chunk => {
			const section = chunk.split('\n').map(line => {
				const sep = line.includes('.txt-') ? '.txt-' : '.txt:';
				const [name, text] = line.split(sep);
				const rendered = exports.LogViewer.renderLine(text, 'all');
				if (!rendered || name.includes('today') || !toID(line)) return '';
				 // gets rid of some edge cases / duplicates
				let date = name.replace(`${__dirname}/../../logs/chat/${roomid}`, '').slice(9);
				let matched = (
					searchRegex.test(rendered) ? `<div class="chat chatmessage highlighted">${rendered}</div>` : rendered
				);
				if (curDate !== date) {
					curDate = date;

					date = `</div></details><details open><summary>[<a href="view-chatlog-${roomid}--${date}">${date}</a>]</summary>`;
					matched = `${date} ${matched}`;
				} else {
					date = '';
				}

				if (matched.includes('chat chatmessage highlighted')) {
					exactMatches.push(matched);
				}
				if (exactMatches.length > limit) return null;
				return matched;
			}).filter(Boolean).join(' ');
			return section;
		});
		let buf = `<div class ="pad"><strong>Results on ${roomid} for ${search}:</strong>`;
		buf += !limit ? ` ${exactMatches.length}` : '';
		buf += !limit ? `<hr></div><blockquote>` : ` (capped at ${limit})<hr></div><blockquote>`;
		buf += sorted.filter(Boolean).join('<hr>');
		if (limit) {
			buf += `</details></blockquote><div class="pad"><hr><strong>Capped at ${limit}.</strong><br>`;
			buf += `<button class="button" name="send" value="/sl ${search},${roomid},${limit + 200}">View 200 more<br />&#x25bc;</button>`;
			buf += `<button class="button" name="send" value="/sl ${search},${roomid},all">View all<br />&#x25bc;</button></div>`;
		}
		return buf;
	}
};

const accessLog = _fs.FS.call(void 0, `logs/chatlog-access.txt`).createAppendStream();

 const pages = {
	async chatlog(args, user, connection) {
		if (!user.named) return Rooms.RETRY_AFTER_LOGIN;
		if (!user.trusted) {
			return exports.LogViewer.error("Access denied");
		}
		let [roomid, date, opts] = _utils.Utils.splitFirst(args.join('-'), '--', 2) 
;
		if (!roomid || roomid.startsWith('-')) {
			this.title = '[Logs]';
			return exports.LogViewer.list(user, _optionalChain([roomid, 'optionalAccess', _ => _.slice, 'call', _2 => _2(1)]));
		}

		// permission check
		const room = Rooms.get(roomid);
		if (roomid.startsWith('spl') && roomid !== 'splatoon' && !user.can('rangeban')) {
			return exports.LogViewer.error("SPL team discussions are super secret.");
		}
		if (roomid.startsWith('wcop') && !user.can('rangeban')) {
			return exports.LogViewer.error("WCOP team discussions are super secret.");
		}
		if (room) {
			if (!room.checkModjoin(user) && !user.can('bypassall')) {
				return exports.LogViewer.error("Access denied");
			}
			if (!user.can('lock') && !this.can('mute', null, room)) return;
		} else {
			if (!this.can('lock')) return;
		}

		void accessLog.writeLine(`${user.id}: <${roomid}> ${date}`);
		this.title = '[Logs] ' + roomid;
		/** null = no limit */
		let limit = null;
		let search;
		if (_optionalChain([opts, 'optionalAccess', _3 => _3.startsWith, 'call', _4 => _4('search-')])) {
			let [input, limitString] = opts.split('--limit-');
			input = input.slice(7);
			search = Dashycode.decode(input);
			if (search.length < 3) return exports.LogViewer.error(`Too short of a search query.`);
			if (limitString) {
				limit = parseInt(limitString) || null;
			} else {
				limit = 500;
			}
			opts = '';
		}
		const isAll = (toID(date) === 'all' || toID(date) === 'alltime');

		const parsedDate = new Date(date );
		// this is apparently the best way to tell if a date is invalid
		if (isNaN(parsedDate.getTime()) && !isAll && date !== 'today') {
			return exports.LogViewer.error(`Invalid date.`);
		}

		if (date && search) {
			this.title = `[Search] [${room}] ${search}`;
			if (Config.chatlogreader === 'fs' || !Config.chatlogreader) {
				return LogSearcher.fsSearch(roomid, search, date, limit);
			} else if (Config.chatlogreader === 'ripgrep') {
				return LogSearcher.ripgrepSearch(roomid, search, limit);
			} else {
				throw new Error(`Config.chatlogreader must be 'fs' or 'ripgrep'.`);
			}
		} else if (date) {
			if (date === 'today') {
				return exports.LogViewer.day(roomid, LogReader.today(), opts);
			} else if (date.split('-').length === 3) {
				return exports.LogViewer.day(roomid, parsedDate.toISOString().slice(0, 10), opts);
			} else {
				return exports.LogViewer.month(roomid, parsedDate.toISOString().slice(0, 7));
			}
		} else {
			return exports.LogViewer.room(roomid);
		}
	},
}; exports.pages = pages;

 const commands = {
	chatlog(target, room, user) {
		const targetRoom = target ? Rooms.search(target) : room;
		const roomid = targetRoom ? targetRoom.roomid : target;
		this.parse(`/join view-chatlog-${roomid}--today`);
	},

	sl: 'searchlogs',
	searchlog: 'searchlogs',
	searchlogs(target, room) {
		target = target.trim();
		const [search, tarRoom, limit, date] = target.split(',').map(str => str.trim());
		if (!target) return this.parse('/help searchlogs');
		if (search.length < 3) return this.errorReply(`Too short of a search query.`);
		if (!search) return this.errorReply('Specify a query to search the logs for.');
		let limitString;
		if (/^[0-9]+$/.test(limit)) {
			limitString = `--limit-${limit}`;
		} else if (toID(limit) === 'all') {
			limitString = `--limit-all`;
		} else if (!limit) {
			limitString = ``;
		} else {
			return this.errorReply(`Cap must be a number or [all].`);
		}
		const currentMonth = Chat.toTimestamp(new Date()).split(' ')[0].slice(0, -3);
		const curRoom = tarRoom ? Rooms.search(tarRoom) : room;
		return this.parse(
			`/join view-chatlog-${curRoom}--${date ? date : currentMonth}--search-${Dashycode.encode(search)}${limitString}`
		);
	},

	searchlogshelp: [
		"/searchlogs [search], [room], [cap], [date] - searches logs in the current room for [search].",
		"A comma can be used to search for multiple words in a single line - in the format arg1, arg2, etc.",
		"If a [cap] is given, limits it to only that many lines. Defaults to 500.",
		"The delimiter | can be used to space searching for multiple terms.",
		"Date formatting is ISO formatting (YYYY-MM-DD.) E.g 2020-05, 2020, or `all`.",
		"Requires: % @ # &",
	],
}; exports.commands = commands;
