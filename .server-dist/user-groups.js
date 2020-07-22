"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _fs = require('../.lib-dist/fs');

 const PLAYER_SYMBOL = '\u2606'; exports.PLAYER_SYMBOL = PLAYER_SYMBOL;
 const HOST_SYMBOL = '\u2605'; exports.HOST_SYMBOL = HOST_SYMBOL;

 const ROOM_PERMISSIONS = [
	'addhtml', 'announce', 'ban', 'bypassafktimer', 'declare', 'editprivacy', 'editroom', 'exportinputlog', 'game', 'gamemanagement', 'gamemoderation', 'joinbattle', 'kick', 'minigame', 'modchat', 'modchatall', 'modlog', 'mute', 'nooverride', 'receiveauthmessages', 'roombot', 'roomdriver', 'roommod', 'roomowner', 'roomvoice', 'show', 'showmedia', 'timer', 'tournaments', 'warn',
] ; exports.ROOM_PERMISSIONS = ROOM_PERMISSIONS;

 const GLOBAL_PERMISSIONS = [
	// administrative
	'bypassall', 'console', 'disableladder', 'lockdown', 'potd', 'rawpacket',
	// other
	'addhtml', 'alts', 'autotimer', 'globalban', 'bypassblocks', 'bypassafktimer', 'forcepromote', 'forcerename', 'forcewin', 'gdeclare', 'ignorelimits', 'importinputlog', 'ip', 'lock', 'makeroom', 'modlog', 'rangeban', 'promote',
] ; exports.GLOBAL_PERMISSIONS = GLOBAL_PERMISSIONS;





















/**
 * Auth table - a Map for which users are in which groups.
 *
 * Notice that auth.get will return the default group symbol if the
 * user isn't in a group.
 */
 class Auth extends Map {
	/**
	 * Will return the default group symbol if the user isn't in a group.
	 *
	 * Passing a User will read `user.group`, which is relevant for unregistered
	 * users with temporary global auth.
	 */
	get(user) {
		if (typeof user !== 'string') return (user ).group;
		return super.get(user) || Auth.defaultSymbol();
	}
	isStaff(userid) {
		return this.has(userid) && this.get(userid) !== '+';
	}
	atLeast(user, group) {
		if (!Config.groups[group]) return false;
		if (user.locked || user.semilocked) return false;
		if (!this.has(user.id)) return false;
		return Auth.getGroup(this.get(user.id)).rank >= Auth.getGroup(group).rank;
	}

	static defaultSymbol() {
		return Config.groupsranking[0];
	}
	

	static getGroup(symbol, fallback) {
		if (Config.groups[symbol]) return Config.groups[symbol];

		if (fallback !== undefined) return fallback;

		// unidentified groups are treated as voice
		return Object.assign({}, Config.groups['+'] || {}, {
			symbol,
			id: 'voice',
			name: symbol,
		});
	}
	static hasPermission(
		symbol,
		permission,
		targetSymbol,
		targetingSelf
	) {
		const group = Auth.getGroup(symbol);
		if (group['root']) {
			return true;
		}

		if (group[permission]) {
			const jurisdiction = group[permission];
			if (!targetSymbol) {
				return !!jurisdiction;
			}
			if (jurisdiction === true && permission !== 'jurisdiction') {
				return Auth.hasPermission(symbol, 'jurisdiction', targetSymbol);
			}
			if (typeof jurisdiction !== 'string') {
				return !!jurisdiction;
			}
			if (jurisdiction.includes(targetSymbol)) {
				return true;
			}
			if (jurisdiction.includes('s') && targetingSelf) {
				return true;
			}
			if (jurisdiction.includes('u') &&
				Config.groupsranking.indexOf(symbol) > Config.groupsranking.indexOf(targetSymbol)) {
				return true;
			}
		}
		return false;
	}
	static listJurisdiction(symbol, permission) {
		const symbols = Object.keys(Config.groups) ;
		return symbols.filter(targetSymbol => Auth.hasPermission(symbol, permission, targetSymbol));
	}
	static isValidSymbol(symbol) {
		if (symbol.length !== 1) return false;
		return !/[A-Za-z0-9|,]/.test(symbol);
	}
} exports.Auth = Auth;

 class RoomAuth extends Auth {
	
	constructor(room) {
		super();
		this.room = room;
	}
	get(user) {
		const parentAuth = this.room.parent ? this.room.parent.auth :
			this.room.settings.isPrivate !== true ? Users.globalAuth : null;
		const parentGroup = parentAuth ? parentAuth.get(user) : Auth.defaultSymbol();
		const id = typeof user === 'string' ? user : (user ).id;

		if (this.has(id)) {
			// authority is whichever is higher between roomauth and global auth
			const roomGroup = this.getDirect(id);
			let group = Config.greatergroupscache[`${roomGroup}${parentGroup}`];
			if (!group) {
				// unrecognized groups always trump higher global rank
				const roomRank = Auth.getGroup(roomGroup, {rank: Infinity}).rank;
				const globalRank = Auth.getGroup(parentGroup).rank;
				if (roomGroup === Users.PLAYER_SYMBOL || roomGroup === Users.HOST_SYMBOL || roomGroup === '#') {
					// Player, Host, and Room Owner always trump higher global rank
					group = roomGroup;
				} else {
					group = (roomRank > globalRank ? roomGroup : parentGroup);
				}
				Config.greatergroupscache[`${roomGroup}${parentGroup}`] = group;
			}
			return group;
		}

		return parentGroup;
	}
	/** gets the room group without inheriting */
	getDirect(id) {
		return super.get(id);
	}
	save() {
		// construct auth object
		const auth = Object.create(null);
		for (const [userid, groupSymbol] of this) {
			auth[userid] = groupSymbol;
		}
		(this.room.settings ).auth = auth;
		this.room.saveSettings();
	}
	load() {
		for (const userid in this.room.settings.auth) {
			super.set(userid , this.room.settings.auth[userid]);
		}
	}
	set(id, symbol) {
		const user = Users.get(id);
		if (user) {
			this.room.onUpdateIdentity(user);
		}
		if (symbol === 'whitelist' ) {
			symbol = Auth.defaultSymbol();
		}
		super.set(id, symbol);
		this.room.settings.auth[id] = symbol;
		this.room.saveSettings();
		return this;
	}
	delete(id) {
		if (!this.has(id)) return false;
		super.delete(id);
		delete this.room.settings.auth[id];
		this.room.saveSettings();
		return true;
	}
} exports.RoomAuth = RoomAuth;

 class GlobalAuth extends Auth {
	__init() {this.usernames = new Map()}
	constructor() {
		super();GlobalAuth.prototype.__init.call(this);;
		this.load();
	}
	save() {
		_fs.FS.call(void 0, 'config/usergroups.csv').writeUpdate(() => {
			let buffer = '';
			for (const [userid, groupSymbol] of this) {
				buffer += `${this.usernames.get(userid) || userid},${groupSymbol}\n`;
			}
			return buffer;
		});
	}
	load() {
		const data = _fs.FS.call(void 0, 'config/usergroups.csv').readIfExistsSync();
		for (const row of data.split("\n")) {
			if (!row) continue;
			const [name, symbol] = row.split(",");
			const id = toID(name);
			this.usernames.set(id, name);
			super.set(id, symbol.charAt(0) );
		}
	}
	set(id, group, username) {
		if (!username) username = id;
		const user = Users.get(id);
		if (user) {
			user.group = group;
			user.updateIdentity();
			username = user.name;
		}
		this.usernames.set(id, username);
		super.set(id, group);
		void this.save();
		return this;
	}
	delete(id) {
		if (!super.has(id)) return false;
		super.delete(id);
		const user = Users.get(id);
		if (user) {
			user.group = ' ';
		}
		this.usernames.delete(id);
		this.save();
		return true;
	}
} exports.GlobalAuth = GlobalAuth;
