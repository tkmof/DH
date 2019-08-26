'use strict';

exports.BattleMovedex = {
	"aerialstab": {
		num: 10001,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		id: "aerialstab",
		isViable: true,
		name: "Aerial Stab",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 120,
		contestType: "Cool",
	},
	"blimpblast": {
		num: 10002,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let ratio = (pokemon.getStat('spe') / target.getStat('spe'));
			let power = ( ratio * 30 ) + 1;
			this.debug([40, 60, 80, 120, 150][(Math.floor(ratio) > 4 ? 4 : Math.floor(ratio))] + ' bp');
			if (power >= 120) {
				return 120;
			}
			return power;
		},
		category: "Special",
		desc: "The power of this move depends on (user's current Speed / target's current Speed), rounded down. Power is equal to 150 if the result is 4 or more, 120 if 3, 80 if 2, 60 if 1, 40 if less than 1. If the target's current Speed is 0, this move's power is 40.",
		shortDesc: "More power the faster the user is than the target.",
		id: "blimpblast",
		name: "Blimp Blast",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMovePower: 160,
		contestType: "Cool",
	},
	"defensivebarrier": {
		num: 10003,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 2 turns, damage to allies is halved. 4 turns with Light Clay",
		shortDesc: "For 2 turns, damage to allies is halved.",
		id: "defensivebarrier",
		isViable: true,
		name: "Defensive Barrier",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'defensivebarrier',
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source && source.hasItem('lightclay')) {
					return 4;
				}
				return 2;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Defensive Barrier weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Rock",
		zMoveBoost: {spe: 1},
		contestType: "Beautiful",
	},
	"lingeringblast": {
		num: 10004,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
		id: "lingeringblast",
		isViable: true,
		name: "Lingering Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ghost",
		zMovePower: 180,
		contestType: "Cool",
	},
	"lingeringsurround": {
		num: 99998,
		accuracy: true,
		basePower: 195,
		category: "Special",
		desc: "If this move is successful, it sets Magic Room.",
		shortDesc: "Summons Magic Room.",
		id: "lingeringsurround",
		name: "Lingering Surround",
		pp: 1,
		priority: 0,
		flags: { sound: 1,},
		isZ: "persaniumz",
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.addPseudoWeather('magicroom');
				},
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	"naturesguardian": {
		num: 10005,
		accuracy: true,
		basePower: 190,
		category: "Special",
		desc: "If this move is successful, the terrain becomes Grassy Terrain.",
		shortDesc: "Summons Grassy Terrain.",
		id: "naturesguardian",
		name: "Nature's Guardian",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "simisagiumz",
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setTerrain('grassyterrain');
				},
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	"pebblepunch": {
		num: 10006,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "No additional effect.",
		id: "pebblepunch",
		name: "Pebble Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Rock",
		zMovePower: 150,
		contestType: "Tough",
	},
	"puffup": {
		num: 10007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1.",
		id: "puffup",
		isViable: true,
		name: "Puff Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 1,
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"spikebomb": {
		num: 10008,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: ".",
		shortDesc: ".",
		id: "spikebomb",
		name: "Spike Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 60,
			onHit(target, source, move) {
				console.log('hi');
				target.side.addSideCondition( 'spikes' );
			},
		},
		target: "allAdjacentFoes",
		type: "Ground",
		zMovePower: 140,
		contestType: "Tough",
	},
	"staticsignal": {
		num: 1000009,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, burning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
		shortDesc: "Burns grounded foes on switch-in.",
		id: "staticsignal",
		isViable: true,
		name: "Static Signal",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'staticsignal',
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Static Signal');
				this.effectData.layers = 1;
			},
			onRestart: function (side) {
				if (this.effectData.layers >= 1) return false;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Electric')) return;
				if (pokemon.hasType('Electric')) {
					this.add('-sideend', pokemon.side, 'move: Static Signal', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('staticsignal');
				} 
				else {
					pokemon.trySetStatus('par', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lava Plume", target);
		},
		target: "foeSide",
		type: "Fire",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	"rapidspin": {
		inherit: true,
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'coaltrap'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
	},
	"defog": {
		inherit: true,
		onHit: function (target, source, move) {
			/**@type {?boolean | number} */
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = this.boost({evasion: -1});
			let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'staticsignal'];
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'staticsignal'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + target);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
	},
};