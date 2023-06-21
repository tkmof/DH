/*

List of flags and their descriptions:

bypasssub: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
allyanim: Animates when used against allies
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
slicing: Power is multiplied by 1.5 when used by a Pokemon with the Ability Sharpness.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.
wind: Activates the Wind Power and Wind Rider Abilities.

*/

/*
	--TODO--
	Go through each TPDP move and make sure it's implemented properly
*/

export const Moves: {[moveid: string]: MoveData} = {
	//TOUHOU

	atempo: {
		name: "A Tempo",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target) {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.clearBoosts();
				this.add('-clearboost', pokemon);
			}
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 196
	},
	acidtears: {
		name: "Acid Tears",
		target: "normal",
		type: "Poison",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 85,
		priority: 0,
		flags: {},
		status: ['psn', 'fear'],
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 240
	},
	aikidoarts: {
		name: "Aikido Arts",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		damage: 'level',
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 133
	},
	airstamp: {
		name: "Air Stamp",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 55,
		pp: 10,
		accuracy: 95,
		priority: -6,
		flags: {protect: 1, contact: 1},
		forceSwitch: true,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 58
	},
	alluringmaze: {
		name: "Alluring Maze",
		target: "normal",
		type: "Warped",
		category: "Physical",
		basePower: 80,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		overrideDefensiveStat: 'def',
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 130
	},
	ambient: {
		name: "Ambient",
		target: "normal",
		type: "Sound",
		category: "Physical",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				onHit(target, source, move) {
					const stats: BoostID[] = [];
					let stat: BoostID;
					for (stat in target.boosts) {
						if (target.boosts[stat] > -6) {
							stats.push(stat);
						}
					}
					if (stats.length) {
						const randomStat = this.sample(stats);
						const boost: SparseBoostsTable = {};
						boost[randomStat] = -1;
						target.boostBy(boost);
					} else {
						return false;
					}
				},
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 64
	},
	amnesia: {
		name: "Amnesia",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'amnesia',
		onTryHit(target) {
			if (target.hasStatus() || !target.runStatusImmunity('stp')) {
				return false;
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 2,
			onStart(target, source) {
				this.add('-start', target, 'move: Amnesia', '[of] ' + source);
			},
			onResidualOrder: 23,
			onEnd(target) {
				this.add('-end', target, 'move: Amnesia', '[silent]');
				target.trySetStatus('stp', this.effectState.source);
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 188
	},
	angelladder: {
		name: "Angel Ladder",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 70,
		pp: 20,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			boosts: {accuracy: -1}
		}
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 78
	},
	applebomb: {
		name: "Apple Bomb",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	aquacannon: {
		name: "Aqua Cannon",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 150,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hp === pokemon.baseMaxhp) {
				return 150;
			}
			return 100 * pokemon.hp / pokemon.baseMaxhp;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 117
	},
	aquacutter: {
		name: "Aqua Cutter",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	aquajavelin: {
		name: "Aqua Javelin",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1, javelin: 1},
		secondary: {
			chance: 20,
			boosts: {spe: -1}
		}
		// Class: BU
		// Effect Chance: 200
		// Effect ID: 38
	},
	aquarake: {
		name: "Aqua Rake",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 150,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {recharge: 1, protect: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 50
	},
	aquasonic: {
		name: "Aquasonic",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	aquaticwaltz: {
		name: "Aquatic Waltz",
		target: "normal",
		type: "Water",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		onHit(target) {
			if (target.getTypes().join() === 'Water' || !target.setType('Water')) {
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Water');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 220
	},
	arclight: {
		name: "Arclight",
		target: "normal",
		type: "Light",
		category: "Special",
		basePower: 130,
		pp: 5,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		self: {
			boosts: {spa: -2}
		},
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 56
	},
	armorpierce: {
		name: "Armor Pierce",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 90,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 18
	},
	astrology: {
		name: "Astrology",
		target: "normal",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		self: {
			boosts: {
				atk: -2
			}
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 44
	},
	atomicenergy: {
		name: "Atomic Energy",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 75,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		drain: [1, 2]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 141
	},
	auradrain: {
		name: "Aura Drain",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 75,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		drain: [1, 2]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 141
	},
	backdraft: {
		name: "Backdraft",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				status: 'brn'
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 2
	},
	backhandblow: {
		name: "Backhand Blow",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	backupplan: {
		name: "Backup Plan",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 40,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target) {
			if (!this.canSwitch(target.side)) {
				this.attrLastMove('[still]');
				this.add('-fail', target);
				return this.NOT_FAIL;
			}
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		selfSwitch: true,
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 61
	},
	badmoon: {
		name: "Bad Moon",
		target: "normal",
		type: "Dark",
		category: "Special",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				status: 'dark'
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 3
	},
	barrierup: {
		name: "Barrier Up",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 35,
		accuracy: true,
		priority: 0,
		flags: {},
		self: {
			boosts: {
				spd: 1,
			},
		}
	},
	battlepreparation: {
		name: "Battle Preparation",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1, def: 1, accuracy: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 82
	},
	behindyou: {
		name: "Behind You!",
		target: "normal",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: 90,
		priority: 0,
		flags: {},
		status: 'fear'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 23
	},
	bellow: {
		name: "Bellow",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		boosts: {spd: -1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 47
	},
	bewitchingpollen: {
		name: "Bewitching Pollen",
		target: "normal",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 70,
		priority: 0,
		flags: {},
		status: 'stp',
		onTryHit(source, target, move) {
			if (target.hasType('Nature')) {
				this.add('-immune', target);
				return null;
			}
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 25
	},
	bindtrap: {
		name: "Bind Trap",
		target: "foeSide",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		sideCondition: 'bindtrap',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Bind Trap');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem(['heavydutyboots', 'tengugeta'])) return;
				this.add('-activate', pokemon, 'move: Bind Trap');
				this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('bindtrap'));
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 215
	},
	blackhole: {
		name: "Black Hole",
		target: "normal",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			if (target.addVolatile('trapped', source, move, 'trapper')) {
				source.addVolatile('blackhole');
				return true;
			}
		},
		condition: {
			onSwitchOut(pokemon) {
				for (const foe of pokemon.foes()) {
					foe.removeVolatile('trapped');
				}
			},
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 183
	},
	blackout: {
		name: "Blackout",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 75,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 30,
				status: 'dark'
			}
		]
		// Class: BU
		// Effect Chance: 300
		// Effect ID: 3
	},
	bladedance: {
		name: "Blade Dance",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 120,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('drainseed')) {
				this.add('-end', pokemon, 'Drain Seed', '[from] move: Blade Dance', '[of] ' + pokemon);
			}
			const sideConditions = ['bindtrap', 'minetrap', 'poisontrap', 'stealthtrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Blade Dance', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('drainseed')) {
				this.add('-end', pokemon, 'Drain Seed', '[from] move: Blade Dance', '[of] ' + pokemon);
			}
			const sideConditions = ['bindtrap', 'minetrap', 'poisontrap', 'stealthtrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Blade Dance', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 171
	},
	blazeoftenmei: {
		name: "Blaze of Tenmei",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 100,
		pp: 5,
		accuracy: 50,
		priority: 0,
		flags: {protect: 1, contact: 1},
		status: 'brn'
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 2
	},
	blazespear: {
		name: "Blaze Spear",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 100,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				status: 'brn'
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 2
	},
	blitzkrieg: {
		name: "Blitzkrieg",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 55,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (this.queue.willMove(target) || target.beingCalledBack || target.switchFlag) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('blitzkrieg', pokemon);
				const data = side.getSideConditionData('blitzkrieg');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('blitzkrieg');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Blitzkrieg start');
				let alreadyAdded = false;
				pokemon.removeVolatile('callofthedead');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Blitzkrieg');
						alreadyAdded = true;
					}
					this.actions.runMove('blitzkrieg', source, source.getLocOf(pokemon));
				}
			},
		},
		// Class: BU
		// Effect Chance: 0
		// Effect ID: 600
	},
	bloodystorm: {
		name: "Bloody Storm",
		target: "normal",
		type: "Dark",
		category: "Special",
		basePower: 70,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 18
	},
	blowfromcalamity: {
		name: "Blow from Calamity",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 70,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hasStatus()) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	bombardment: {
		name: "Bombardment",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 80,
		pp: 10,
		accuracy: 90,
		priority: 1,
		flags: {protect: 1, contact: 1},
		multihit: 2,
		// Class: BU
		// Effect Chance: 0
		// Effect ID: 224
	},
	booing: {
		name: "Booing",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: -6,
		flags: {},
		forceSwitch: true,
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 57
	},
	boundaryrend: {
		name: "Boundary Rend",
		target: "normal",
		type: "Dream",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			target.sethp(1);
		},
		// Class: EN
		// Effect Chance: 1000
		// Effect ID: 603
	},
	boutdrunkard: {
		name: "Bout Drunkard",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {},
		status: 'stp',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 25
	},
	brandish: {
		name: "Brandish",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 120,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		recoil: [1, 3],
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 51
	},
	braveburst: {
		name: "Brave Burst",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 90,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	bravesong: {
		name: "Brave Song",
		target: "self",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		self: {
			boosts: {spa: 2}
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 41
	},
	breakshot: {
		name: "Break Shot",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 75,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onTryHit(pokemon) {
			pokemon.side.removeSideCondition('fieldprotect');
			pokemon.side.removeSideCondition('fieldbarrier');
		},
	},
	burnstrike: {
		name: "Burn Strike",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 90,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 1,
		secondaries: [
			{
				chance: 10,
				status: 'brn'
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 100
	},
	butterflysflit: {
		name: "Butterfly's Flit",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'butterflysflit',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, "Butterfly's Flit");
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 222
	},
	calamity: {
		// I don't know where this came from but it was in my game data, apparently no one learns it
		name: "Calamity",
		target: "normal",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: 80,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			const statuses = ['brn', 'psn', 'par', 'dark', 'fear', 'stp', 'weak'];
			let status1 = this.sample(statuses);
			let status2 = this.sample(statuses.filter(status => status !== status1));
			target.setStatus(status1);
			target.setStatus(status2);
		},
		// Class: EN
		// Effect Chance: 1000
		// Effect ID: 602
	},
	calamityscythe: {
		name: "Calamity Scythe",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 100,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		status: 'weak',
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 94
	},
	callofthedead: {
		name: "Call of the Dead",
		target: "self",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'callofthedead',
		onPrepareHit(pokemon) {
			return !pokemon.removeVolatile('callofthedead');
		},
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Destiny Bond');
			},
			onFaint(target, source, effect) {
				if (!source || !effect || target.isAlly(source)) return;
				if (effect.effectType === 'Move' && !effect.isFutureMove) {
					this.add('-activate', target, 'move: Call of the Dead');
					source.faint();
				}
			},
			onBeforeMovePriority: -1,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'callofthedead') return;
				this.debug('removing Destiny Bond before attack');
				pokemon.removeVolatile('callofthedead');
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile('callofthedead');
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 181
	},
	camouflage: {
		name: "Camouflage",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {evasion: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 80
	},
	cataclysm: {
		name: "Cataclysm",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 150,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {recharge: 1, protect: 1, contact: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 50
	},
	catastrophe: {
		name: "Catastrophe",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				boosts: {spd: -1}
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 37
	},
	changeling: {
		name: "Changeling",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 70,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		selfSwitch: true,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 60
	},
	chargethief: {
		name: "Charge Thief",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 75,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		drain: [1, 2]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 141
	},
	chargingstun: {
		name: "Charging Stun",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 55,
		pp: 10,
		accuracy: 95,
		priority: -6,
		flags: {protect: 1, contact: 1},
		forceSwitch: true,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 58
	},
	charonferries: {
		name: "Charon Ferries",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 0,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		damage: 'level',
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 133
	},
	cheer: {
		name: "Cheer",
		target: "self",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {spd: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 42
	},
	chromeray: {
		name: "Chrome Ray",
		target: "normal",
		type: "Steel",
		category: "Special",
		basePower: 90,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				boosts: {spd: -1}
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 37
	},
	claim: {
		name: "Claim",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {},
		volatileStatus: 'claim',
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-start', pokemon, 'Claim');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Claim');
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
	},
	clearingmist: {
		name: "Clearing Mist",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			switch (target.getWeight()) {
				case 0:
					return 40;
				case 1:
					return 60;
				case 2:
					return 80;
				case 3:
					return 100;
				case 4:
					return 120;
			}
			return 40;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 126
	},
	cloudburst: {
		name: "Cloudburst",
		target: "self",
		type: "Water",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1, def: 1, spe: -1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 71
	},
	coldrain: {
		name: "Cold Rain",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 80,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				status: 'stp'
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 6
	},
	concussion: {
		name: "Concussion",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 18
	},
	confine: {
		name: "Confine",
		target: "normal",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {},
		status: "par"
	},
	conflagration: {
		name: "Conflagration",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			let costDiff = pokemon.getWeight() - target.getWeight();
			switch (costDiff) {
				case 1:
					return 75;
				case 2:
					return 90;
				case 3:
					return 105;
				case 4:
					return 120;
			}
			return 60;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 121
	},
	contagion: {
		name: "Contagion",
		target: "normal",
		type: "Poison",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {},
		status: 'psn'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 20
	},
	continue: {
		name: "Continue",
		target: "self",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {heal: 1},
		onTry(source) {
			if (source.hasStatus('stp') || source.hasAbility('comatose'))
				return false;

			if (source.hp === source.maxhp) {
				this.add('-fail', source, 'heal');
				return null;
			}
			if (source.hasAbility(['insomnia', 'vitalspirit'])) {
				this.add('-fail', source, '[from] ability: ' + source.getAbility().name, '[of] ' + source);
				return null;
			}
		},
		onHit(target, source, move) {
			this.heal(target.maxhp);
			target.clearStatus();
			const result = target.setStatus('stp', source, move);
			if (!result) return result;
			target.status['stp'].time = 3;
			target.status['stp'].startTime = 3;
		},
	},
	corkscrew: {
		name: "Corkscrew",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 50,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 70,
				self: {
					boosts: {spa: 1}
				}
			}
		]
		// Class: BU
		// Effect Chance: 700
		// Effect ID: 29
	},
	creepingdarkness: {
		name: "Creeping Darkness",
		target: "normal",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 85,
		priority: 0,
		flags: {},
		status: ['psn', 'dark']
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 239
	},
	crosschange: {
		name: "Cross Change",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			let targetAbility = target.ability;
			let sourceAbility = source.ability;
			target.setAbility(sourceAbility);
			source.setAbility(targetAbility);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 190
	},
	crosscounter: {
		name: "Cross Counter",
		target: "scripted",
		type: "Fighting",
		category: "Physical",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: -5,
		flags: {protect: 1, contact: 1, counter: 1},
		damageCallback(pokemon) {
			if (!pokemon.volatiles['counter']) return 0;
			return pokemon.volatiles['counter'].damage || 1;
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('counter');
			pokemon.volatiles['counter'].categories = ['Physical'];
		},
		onTry(source) {
			if (!source.volatiles['counter']) return false;
			if (source.volatiles['counter'].slot === null) return false;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 135
	},
	crossdrive: {
		name: "Cross Drive",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 100,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		self: {
			boosts: {spe: -1}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 226
	},
	crossbowassault: {
		name: "Crossbow Assault",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 85,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			status: 'par'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 5
	},
	cruciform: {
		name: "Cruciform",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 50,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 224
	},
	cursereversal: {
		name: "Curse Reversal",
		target: "normal",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, pokemon) {
			const targetHP = target.getUndynamaxedHP();
			const averagehp = Math.floor((targetHP + pokemon.hp) / 2) || 1;
			const targetChange = targetHP - averagehp;
			target.sethp(target.hp - targetChange);
			this.add('-sethp', target, target.getHealth, '[from] move: Curse Reversal', '[silent]');
			pokemon.sethp(averagehp);
			this.add('-sethp', pokemon, pokemon.getHealth, '[from] move: Curse Reversal');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 191
	},
	dancingrain: {
		name: "Dancing Rain",
		target: "normal",
		type: "Sound",
		category: "Physical",
		basePower: 75,
		pp: 10,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 50,
				boosts: {def: -1}
			}
		]
		// Class: BU
		// Effect Chance: 500
		// Effect ID: 35
	},
	dancingsword: {
		name: "Dancing Sword",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	dancingwind: {
		name: "Dancing Wind",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			self: {
				boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1, accuracy: 1, evasion: 1}
			}
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 63
	},
	danmakudance: {
		name: "Danmaku Dance",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 150
	},
	danmakuorchestra: {
		name: "Danmaku Orchestra",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	darkarrow: {
		name: "Dark Arrow",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 50,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 224
	},
	darkball: {
		name: "Dark Ball",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				status: 'dark'
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 3
	},
	darkinnocence: {
		name: "Dark Innocence",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 25,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		multihit: [2, 5]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 53
	},
	darkpower: {
		name: "Dark Power",
		target: "self",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1, def: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 72
	},
	darksign: {
		name: "Dark Sign",
		target: "normal",
		type: "Dark",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	darksphere: {
		name: "Dark Sphere",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 100,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			if (target?.moveSlots) {
				for (const moveSlot of target?.moveSlots) {
					if (moveSlot.id === 'camouflage' && moveSlot.used) {
						return move.basePower * 2;
					}
				}
			}
			return move.basePower;
		},
		onModifyMove(move, pokemon, target) {
			if (target?.moveSlots) {
				for (const moveSlot of target?.moveSlots) {
					if (moveSlot.id === 'camouflage' && moveSlot.used) {
						move.accuracy = true;
						return;
					}
				}
			}
		},
		secondaries: [
			{
				chance: 20,
				volatileStatus: 'flinch'
			}
		]
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 105
	},
	darksweets: {
		name: "Dark Sweets",
		target: "normal",
		type: "Dark",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				status: 'dark'
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 3
	},
	darknessdance: {
		name: "Darkness Dance",
		target: "normal",
		type: "Dark",
		category: "Special",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 150
	},
	deadofnight: {
		name: "Dead of Night",
		target: "self",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {evasion: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 79
	},
	deathmatch: {
		name: "Death Match",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 0,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
		    const bp = [200, 150, 100, 80, 40];
			if (pokemon.hp === 1)
				return bp[0];

			const numerators = [2, 5, 10, 17, 33];
			let hp = pokemon.hp/pokemon.maxhp;

			for (let i = 0; i < numerators.length; i++) {
				if (hp < numerators[i]/48)
					return bp[i];
			}

			return 20;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 122
	},
	decrescendo: {
		name: "Decrescendo",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		boosts: {atk: -1, spa: -1},
		selfSwitch: true
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 86
	},
	deflagration: {
		name: "Deflagration",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 150,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {recharge: 1, protect: 1,},
		self: {
			volatileStatus: 'mustrecharge',
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 50
	},
	densebarrage: {
		name: "Dense Barrage",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 140,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	densefogbloom: {
		name: "Dense Fog Bloom",
		target: "normal",
		type: "Warped",
		category: "Special",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['heavyfog'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 235
	},
	depressingrain: {
		name: "Depressing Rain",
		target: "normal",
		type: "Poison",
		category: "Physical",
		basePower: 60,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		onHit(target, source, move) {
			target.clearBoosts();
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 131
	},
	destruction: {
		name: "Destruction",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 70,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 18
	},
	destructionrift: {
		name: "Destruction Rift",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onBasePower(relayVar, source, target, move) {
			if (this.field.terrain) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		onAfterHit(target, source, move) {
			this.field.clearTerrain();
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 164
	},
	detonationburst: {
		name: "Detonation Burst",
		target: "normal",
		type: "Sound",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		self: {
			boosts: {atk: -1, def: 1}
		}
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 62
	},
	diffusionlaser: {
		name: "Diffusion Laser",
		target: "normal",
		type: "Light",
		category: "Special",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 18
	},
	diligence: {
		name: "Diligence",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: -4,
		flags: {protect: 1, counter: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.volatiles['counter'].damage)
				return move.basePower * 2;
			return move.basePower;
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('counter');
		},
		onTry(source) {
			if (!source.volatiles['counter']) return false;
			if (source.volatiles['counter'].slot === null) return false;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 115
	},
	direstate: {
		name: "Dire State",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 0,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
		    const bp = [200, 150, 100, 80, 40];
			if (pokemon.hp === 1)
				return bp[0];

			const numerators = [2, 5, 10, 17, 33];
			let hp = pokemon.hp/pokemon.maxhp;

			for (let i = 0; i < numerators.length; i++) {
				if (hp < numerators[i]/48)
					return bp[i];
			}

			return 20;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 122
	},
	distortionbomb: {
		name: "Distortion Bomb",
		target: "normal",
		type: "Warped",
		category: "Physical",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				boosts: {def: -1}
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 35
	},
	divinepunishment: {
		name: "Divine Punishment",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 0,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		onHit(target, source, move) {
			target.damage(source.hp, source, move);
			source.faint();
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 134
	},
	divinethunder: {
		name: "Divine Thunder",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 50,
		priority: 0,
		flags: {protect: 1,},
		status: 'par'
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 5
	},
	doppelganger: {
		name: "Doppelganger",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 1,
		flags: {},
		onHit(target, source, move) {
			source.setType(target.types);
			this.add('-start', source, 'typechange', source.getTypes().join('/'), '[from] move: Doppelganger');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 205
	},
	drainseed: {
		name: "Drain Seed",
		target: "normal",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {},
		volatileStatus: 'drainseed',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Drain Seed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['drainseed'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return !target.hasType('Nature');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 182
	},
	drought: {
		name: "Drought",
		target: "normal",
		type: "Water",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {},
		status: "weak"
	},
	dualspark: {
		name: "Dual Spark",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 80,
		priority: -1,
		flags: {protect: 1,},
		multihit: 2,
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 224
	},
	dustbomb: {
		name: "Dust Bomb",
		target: "normal",
		type: "Poison",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 30,
			status: 'psn'
		}
		// Class: BU
		// Effect Chance: 300
		// Effect ID: 1
	},
	dustcloud: {
		name: "Dust Cloud",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 30,
			boosts: {accuracy: -1}
		}
		// Class: BU
		// Effect Chance: 300
		// Effect ID: 78
	},
	dustdevilgate: {
		name: "Dust Devil Gate",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 20,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		volatileStatus: 'partiallytrapped'
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 149
	},
	earthsign: {
		name: "Earth Sign",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	earthenfeast: {
		name: "Earthen Feast",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			boosts: {accuracy: -1}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 78
	},
	earthlyblessing: {
		name: "Earthly Blessing",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (this.field.terrain) {
				switch (this.field.terrain) {
					case "byakko":
						move.type = "Steel";
					case "genbu":
						move.type = "Water";
					case "kohryu":
						move.type = "Earth";
					case "seiryu":
						move.type = "Nature";
					case "suzaku":
						move.type = "Fire";
				}
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	earthlyinfluence: {
		name: "Earthly Influence",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (this.field.terrain) {
				switch (this.field.terrain) {
					case "byakko":
						move.type = "Steel";
					case "genbu":
						move.type = "Water";
					case "kohryu":
						move.type = "Earth";
					case "seiryu":
						move.type = "Nature";
					case "suzaku":
						move.type = "Fire";
				}
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	ebbtide: {
		name: "Ebb Tide",
		target: "normal",
		type: "Water",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {},
		boosts: {spe: -2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 48
	},
	electricheritage: {
		name: "Electric Heritage",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 130,
		pp: 10,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1,},
		drain: [1, 2]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 141
	},
	electricsign: {
		name: "Electric Sign",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	elementreverse: {
		name: "Element Reverse",
		target: "normal",
		type: "Warped",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {},
		volatileStatus: 'elementreverse',
		condition: {
			noCopy: true,
			onStart(target, source, sourceEffect) {
				this.add('-start', target, 'move: Element Reverse');
			},
			onEffectiveness(typeMod, target, type, move) {
				return typeMod * -1;
			},
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 244
	},
	encourage: {
		name: "Encourage",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {},
		volatileStatus: 'encourage',
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				const noEncore = [
					'assist', 'copycat', 'dynamaxcannon', 'encourage', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'sketch', 'sleeptalk', 'struggle', 'transform',
				];
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || noEncore.includes(move.id) || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encourage');
				if (!this.queue.willMove(target)) {
					this.effectState.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectState.move) return this.effectState.move;
			},
			onResidualOrder: 16,
			onResidual(target) {
				if (target.moves.includes(this.effectState.move) &&
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encourage');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encourage');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 173
	},
	energyabsorb: {
		name: "Energy Absorb",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 75,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		drain: [1, 2]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 141
	},
	energybolt: {
		name: "Energy Bolt",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				status: 'stp'
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 6
	},
	ephemeral: {
		name: "Ephemeral",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				boosts: {def: -1}
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 35
	},
	eternalrecord: {
		name: "Eternal Record",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			target.side.addSideCondition('fieldprotect');
			target.side.addSideCondition('fieldbarrier');
			target.side.addSideCondition('luckyrainbow');
			target.faint();
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 231
	},
	evilcrushingarrow: {
		name: "Evil-Crushing Arrow",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 18
	},
	explodingblaze: {
		name: "Exploding Blaze",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 30,
				status: 'brn'
			}
		]
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 2
	},
	explodingfist: {
		name: "Exploding Fist",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 100,
		pp: 5,
		accuracy: 50,
		priority: 0,
		flags: {protect: 1, contact: 1},
		volatileStatus: 'confusion'
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 17
	},
	eyeofcalamity: {
		name: "Eye of Calamity",
		target: "normal",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 85,
		priority: 0,
		flags: {},
		status: ['brn', 'fear']
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 242
	},
	eyeoflaplace: {
		name: "Eye of Laplace",
		target: "normal",
		type: "Dark",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	fadingout: {
		name: "Fading Out",
		target: "self",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: -6,
		flags: {},
		selfSwitch: true,
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 60
	},
	fairydance: {
		name: "Fairy Dance",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {spa: 1, spd: 1, spe: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 66
	},
	fakejewel: {
		name: "Fake Jewel",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (
				!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
				!source.setItem(yourItem)
			) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-item', source, yourItem, '[from] move: Fake Jewel', '[of] ' + target);
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 146
	},
	falsecourage: {
		name: "False Courage",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 4,
		flags: {},
		volatileStatus: 'falsecourage',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: False Courage');
			},
			onDamagePriority: -10,
			onDamage(damage, target, source, effect) {
				if (effect?.effectType === 'Move' && damage >= target.hp) {
					this.add('-activate', target, 'move: False Courage');
					return target.hp - 1;
				}
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 179
	},
	fantasymelody: {
		name: "Fantasy Melody",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 60,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	fantasyseal: {
		name: "Fantasy Seal",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 40,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: [2, 5]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 53
	},
	favorablewind: {
		name: "Favorable Wind",
		target: "self",
		type: "Wind",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {evasion: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 79
	},
	feathershot: {
		name: "Feather Shot",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	fieldbarrier: {
		name: "Field Barrier",
		target: "allySide",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: true,
		priority: 0,
		flags: {},
		sideCondition: 'fieldbarrier',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('fluorite')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Field Barrier weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Field Barrier');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Field Barrier');
			},
		},
	},
	fieldbreak: {
		name: "Field Break",
		target: "normal",
		type: "Warped",
		category: "Special",
		basePower: 75,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onTryHit(pokemon) {
			pokemon.side.removeSideCondition('fieldprotect');
			pokemon.side.removeSideCondition('fieldbarrier');
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 142
	},
	fieldprotect: {
		name: "Field Protect",
		target: "allySide",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		sideCondition: 'fieldprotect',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('fluorite')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Field Protect weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Field Protect');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Field Protect');
			},
		},
	},
	fieldshift: {
		name: "Field Shift",
		target: "normal",
		type: "Warped",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 4,
		flags: {bypasssub: 1},
		onHit(target, source, move) {
			const movedConditions = ['fieldprotect', 'fieldbarrier', 'luckyrainbow', 'magicbarrier'];
			let success: string[][] = [];
			for (const cond of movedConditions) {
				this.debug('Trying to move ' + cond + ' as sideCondition');
				if (target.side.removeSideCondition(cond)) {
					success.push(['side', cond]);
					this.debug('Removed ' + cond + ' as sideCondition');
				}
				this.debug('Trying to move ' + cond + ' as volatile');
				if (target.removeVolatile(cond)) {
					success.push(['volatile', cond]);
					this.debug('Removed ' + cond + ' as volatile');
				}
			}
			for (var i = 0; i < success.length; i++) {
				switch (success[i][0]) {
					case 'side':
						source.side.addSideCondition(success[i][1], source);
						break;
					case 'volatile':
						source.addVolatile(success[i][1], source);
						break;
					default:
						this.debug('Unknown case ' + success[i][0]);
						break;
				}
			}

			return success.length > 0;
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 245
	},
	fierygame: {
		name: "Fiery Game",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				status: 'brn'
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 2
	},
	fightingsign: {
		name: "Fighting Sign",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	finaltribulation: {
		name: "Final Tribulation",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 100,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hasType('Void')) {
				return move.basePower * 1.5; //TODO - Find the actual multiplier
			}
			return move.basePower;
		},
		onTryHit(source, target, move) {
			target.addVolatile('finaltribulation');
		},
		onHit(target, source, move) {
			target.removeVolatile('finaltribulation');
			source.faint();
		},
		condition: {
			duration: 1,
			onModifyDef(relayVar, target, source, move) {
				this.chainModify(0.5);
			},
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 88
	},
	firejavelin: {
		name: "Fire Javelin",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1, javelin: 1},
		secondaries: [
			{
				chance: 10,
				status: 'brn'
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 2
	},
	firesign: {
		name: "Fire Sign",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	firewall: {
		name: "Fire Wall",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			if (target.item) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		onHit(target, source, move) {
			target.clearItem();
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 143
	},
	fireball: {
		name: "Fireball",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				status: 'brn'
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 2
	},
	firedragonspiral: {
		name: "Fire-Dragon Spiral",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 100,
		pp: 5,
		accuracy: 75,
		priority: 0,
		flags: {protect: 1,},
		volatileStatus: 'partiallytrapped'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 149
	},
	firesnakespiral: {
		name: "Fire-Snake Spiral",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 20,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		volatileStatus: 'partiallytrapped'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 149
	},
	firmspirit: {
		name: "Firm Spirit",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 130,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			attacker.boostBy({def: 1});
			return null;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 145
	},
	firstaid: {
		name: "First Aid",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {},
		heal: [1, 2]
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 54
	},
	flamepillar: {
		name: "Flame Pillar",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 20,
				status: 'brn'
			}
		]
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 2
	},
	flamewave: {
		name: "Flame Wave",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 80,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 50,
			self: {
				boosts: {spa: 1}
			}
		}
		// Class: 2
		// Effect Chance: 500
		// Effect ID: 31
	},
	flare: {
		name: "Flare",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 70,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				status: 'brn'
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 2
	},
	flash: {
		name: "Flash",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	flashbullet: {
		name: "Flash Bullet",
		target: "normal",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		volatileStatus: 'confusion'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 26
	},
	flashflood: {
		name: "Flash Flood",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	flashover: {
		name: "Flashover",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 30,
				status: 'brn'
			}
		]
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 2
	},
	flowerofhell: {
		name: "Flower of Hell",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 30,
				volatileStatus: 'stancebreak'
			}
		]
		// Class: BU
		// Effect Chance: 300
		// Effect ID: 128
	},
	flyingfrenzy: {
		name: "Flying Frenzy",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 95,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 18
	},
	foambubbles: {
		name: "Foam Bubbles",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	focusedmovement: {
		name: "Focused Movement",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1, def: 1, spe: -1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 71
	},
	focusedstance: {
		name: "Focused Stance",
		target: "self",
		type: "Steel",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1, accuracy: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 83
	},
	foehnwinds: {
		name: "Foehn Winds",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 120,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		recoil: [1, 3],
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 51
	},
	forceshield: {
		name: "Force Shield",
		target: "self",
		type: "Warped",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 4,
		flags: {},
		onTryHit(source, target, move) {
			if (target.removeVolatile('forceshield')) {
				this.add('-fail', source);
				return false;
			}
		},
		volatileStatus: 'forceshield',
		condition: {
			noCopy: true,
			onEffectiveness(typeMod, target, type, move) {
				return 0;
			},
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 230
	},
	foresee: {
		name: "Foresee",
		target: "normal",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		onTryHit(source, target, move) {
			let targetAction = this.queue.willMove(target);
			if (!targetAction || (targetAction && targetAction.move.category === "Status")) {
				this.add('-fail', source);
				return false;
			}
		},
		onHit(target, source, move) {
			let targetAction = this.queue.willMove(target);
			if (targetAction) {
				source.addVolatile('foresee');
				this.actions.useMove(targetAction.move, source, target, move);
			}
		},
		condition: {
			noCopy: true,
			duration: 1,
			onBasePower(relayVar, source, target, move) {
				this.chainModify(1.5);
			},
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 208
	},
	foresttherapy: {
		name: "Forest Therapy",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			for (const pokemon of target.side.activeTeam()) {
				pokemon.clearStatus();
			}
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 92
	},
	forwardthrust: {
		name: "Forward Thrust",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	fountainoflife: {
		name: "Fountain of Life",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'fountainoflife',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fountain of Life');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 178
	},
	frenziedjoururi: {
		name: "Frenzied Joururi",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 100,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
	},
	frostedge: {
		name: "Frost Edge",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				status: 'stp'
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 6
	},
	frozenprison: {
		name: "Frozen Prison",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	fullmetalcrash: {
		name: "Full Metal Crash",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 150,
		pp: 5,
		accuracy: 80,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 52
	},
	gatheredstars: {
		name: "Gathered Stars",
		target: "self",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 7
	},
	gensokyotyphoon: {
		name: "Gensokyo Typhoon",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 140,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		critRatio: 2,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 55
	},
	geyser: {
		name: "Geyser",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		willCrit: true
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 19
	},
	ghostchase: {
		name: "Ghost Chase",
		target: "self",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'ghostchase',
		condition: {
			noCopy: true,
			onStart(target, source, sourceEffect) {
				this.add('-start', target, 'Ghost Chase');
			},
			onTryHit(source, target, move) {
				if (move.type === "Fighting") {
					this.add('-immune', target);
					return null;
				}
			},
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 241
	},
	ghosttrick: {
		name: "Ghost Trick",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'flinch',
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 94
	},
	ghostwave: {
		name: "Ghost Wave",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			status: 'fear'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 4
	},
	gigantic: {
		name: "GIGANTIC",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				boosts: {spd: -1}
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 37
	},
	glamorpandemic: {
		name: "Glamor Pandemic",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 100,
		pp: 5,
		accuracy: 50,
		priority: 0,
		flags: {protect: 1,},
		volatileStatus: 'confusion'
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 17
	},
	goddessdecree: {
		name: "Goddess' Decree",
		target: "self",
		type: "Dream",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1, accuracy: 1, evasion: 1}
		// Class: EN
		// Effect Chance: 1000
		// Effect ID: 63
	},
	godstonefrenzy: {
		name: "Godstone Frenzy",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 25,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: [2, 5]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 53
	},
	goodluck: {
		name: "Good Luck",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target) {
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in target.boosts) {
				if (target.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 1;
				this.boost(boost);
			} else {
				return false;
			}
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 85
	},
	gorgonseye: {
		name: "Gorgon's Eye",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 75,
		priority: 0,
		flags: {},
		status: 'stp',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 25
	},
	graceofmana: {
		name: "Grace of Mana",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		heal: [1, 2]
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 54
	},
	grassjavelin: {
		name: "Grass Javelin",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1, javelin: 1},
		secondary: {
			chance: 10,
			status: 'weak',
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 94
	},
	gravityblast: {
		name: "Gravity Blast",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			if (target.hp === target.maxhp) {
				return 120;
			}
			return 80 * target.hp / target.maxhp;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 118
	},
	grazebolt: {
		name: "Graze Bolt",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			status: 'par'
		}
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 5
	},
	greattornado: {
		name: "Great Tornado",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 20,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		volatileStatus: 'partiallytrapped'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 149
	},
	guardsplit: {
		name: "Guard Split",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source) {
			const newdef = Math.floor((target.storedStats.def + source.storedStats.def) / 2);
			target.storedStats.def = newdef;
			source.storedStats.def = newdef;
			const newspd = Math.floor((target.storedStats.spd + source.storedStats.spd) / 2);
			target.storedStats.spd = newspd;
			source.storedStats.spd = newspd;
			this.add('-activate', source, 'move: Guard Split', '[of] ' + target);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 195
	},
	guardswap: {
		name: "Guard Swap",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source) {
			const targetBoosts: SparseBoostsTable = {};
			const sourceBoosts: SparseBoostsTable = {};

			const defSpd: BoostID[] = ['def', 'spd'];
			for (const stat of defSpd) {
				targetBoosts[stat] = target.boosts[stat];
				sourceBoosts[stat] = source.boosts[stat];
			}

			source.setBoost(targetBoosts);
			target.setBoost(sourceBoosts);

			this.add('-swapboost', source, target, 'def, spd', '[from] move: Guard Swap');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 194
	},
	guidedmissile: {
		name: "Guided Missile",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
	},
	hachimansblessing: {
		name: "Hachiman's Blessing",
		target: "self",
		type: "Fighting",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'hachimansblessing',
		condition: {
			onStart(target, source, effect) {
				this.add('-start', target, "move: Hachiman's Blessing");
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 2;
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 81
	},
	hallucination: {
		name: "Hallucination",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	hammerbash: {
		name: "Hammer Bash",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				boosts: {def: -1}
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 35
	},
	hammerthrow: {
		name: "Hammer Throw",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 70,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	heathaze: {
		name: "Heat Haze",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: -1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 12
	},
	heavenlyascent: {
		name: "Heavenly Ascent",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		self: {
			boosts: {atk: -1, spa: -1}
		}
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 49
	},
	heavenlyblessing: {
		name: "Heavenly Blessing",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 50,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1},
		basePowerCallback(pokemon, target, move) {
			if (this.field.weather) {
				switch (this.field.weather) {
					case "aurora":
						move.type = "Light";
					case "calm":
						move.type = "Wind";
					case "duststorm":
						move.type = "Earth";
					case "heavyfog":
						move.type = "Dark";
					case "sunshower":
						move.type = "Warped";
				}
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	heavenlyinfluence: {
		name: "Heavenly Influence",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 50,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1},
		basePowerCallback(pokemon, target, move) {
			if (this.field.weather) {
				switch (this.field.weather) {
					case "aurora":
						move.type = "Light";
					case "calm":
						move.type = "Wind";
					case "duststorm":
						move.type = "Earth";
					case "heavyfog":
						move.type = "Dark";
					case "sunshower":
						move.type = "Warped";
				}
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	heavyrain: {
		name: "Heavy Rain",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 20,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		volatileStatus: 'partiallytrapped'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 149
	},
	highmagnetism: {
		name: "High Magnetism",
		target: "normal",
		type: "Electric",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'highmagnetism',
		condition: {
			noCopy: true,
			onModifyMove(move, pokemon, target) {
				if (pokemon.removeVolatile('highmagnetism'))
					move.type = 'Electric';
			},
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 209
	},
	hightide: {
		name: "High Tide",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	hightonecrush: {
		name: "High Tone Crush",
		target: "normal",
		type: "Sound",
		category: "Physical",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				onHit(target, source, move) {
					const stats: BoostID[] = [];
					let stat: BoostID;
					for (stat in target.boosts) {
						if (target.boosts[stat] > -6) {
							stats.push(stat);
						}
					}
					if (stats.length) {
						const randomStat = this.sample(stats);
						const boost: SparseBoostsTable = {};
						boost[randomStat] = -1;
						target.boostBy(boost);
					} else {
						return false;
					}
				},
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 64
	},
	holyflare: {
		name: "Holy Flare",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 100,
		pp: 5,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 50,
				status: 'brn'
			}
		]
		// Class: 2
		// Effect Chance: 500
		// Effect ID: 2
	},
	honestmanslie: {
		name: "Honest Man's Lie",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			if (!source.status) return;
			for (const id in source.status)
				target.setStatus(id);
			source.clearStatus();
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 203
	},
	hornetsflit: {
		name: "Hornet's Flit",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 25,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: [2, 5]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 53
	},
	howlingvoice: {
		name: "Howling Voice",
		target: "normal",
		type: "Sound",
		category: "Physical",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	iceage: {
		name: "Ice Age",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			boosts: {spe: -1}
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 38
	},
	icecoffin: {
		name: "Ice Coffin",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 18
	},
	icegatling: {
		name: "Ice Gatling",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 15,
		pp: 5,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		multihit: [2, 5]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 53
	},
	illusionbullets: {
		name: "Illusion Bullets",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
	},
	illusionsign: {
		name: "Illusion Sign",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	imaginaryfriend: {
		name: "Imaginary Friend",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				boosts: {spd: -1}
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 37
	},
	imagination: {
		name: "Imagination",
		target: "self",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			const atk = target.storedStats.atk;
			const def = target.storedStats.def;
			target.storedStats.atk = def;
			target.storedStats.def = atk;
			this.add('-activate', source, 'move: Imagination');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 202
	},
	impactrebellion: {
		name: "Impact Rebellion",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 0,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target) {
			let power = Math.floor(40 * target.getStat('spe') / pokemon.getStat('spe')) + 1;
			if (!isFinite(power)) power = 1;
			if (power > 150) power = 150;
			return power;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 125
	},
	imposingair: {
		name: "Imposing Air",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1, spe: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 73
	},
	impulse: {
		name: "Impulse",
		target: "normal",
		type: "Warped",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				boosts: {spd: -1}
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 37
	},
	inferno: {
		name: "Inferno",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 10,
				status: 'brn'
			}
		]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 2
	},
	infinitedarkness: {
		name: "Infinite Darkness",
		target: "normal",
		type: "Dark",
		category: "Special",
		basePower: 20,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		volatileStatus: 'partiallytrapped'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 149
	},
	infinitescales: {
		name: "Infinite Scales",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 20,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts();
			return bp;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 119
	},
	innerpower: {
		name: "Inner Power",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target) {
			if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
				return false;
			}
			this.directDamage(target.maxhp / 2);
			this.boost({atk: 12}, target);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 87
	},
	inspiration: {
		name: "Inspiration",
		target: "self",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {def: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 40
	},
	invisibleheart: {
		name: "Invisible Heart",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	invokedeity: {
		name: "Invoke Deity",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target) {
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in target.boosts) {
				if (target.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 2;
				this.boost(boost);
			} else {
				return false;
			}
		},
	},
	ironwallstance: {
		name: "Iron Wall Stance",
		target: "self",
		type: "Steel",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {def: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 40
	},
	irreversibletrick: {
		name: "Irreversible Trick",
		target: "normal",
		type: "Warped",
		category: "Special",
		basePower: 80,
		pp: 10,
		accuracy: true,
		priority: -4,
		flags: {bypasssub: 1},
		infiltrates: true,
		basePowerCallback(pokemon, target, move) {
			if (!this.queue.willMove(target) && target.lastMove && target.lastMove?.category === "Status") {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 228
	},
	jewelrystorm: {
		name: "Jewelry Storm",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	jinx: {
		name: "Jinx",
		target: "normal",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		volatileStatus: 'jinx',
		onTryHit(target) {
			if (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === 'struggle') {
				return false;
			}
		},
		condition: {
			duration: 5,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				// The target hasn't taken its turn, or Cursed Body activated and the move was not used through Dancer or Instruct
				if (
					this.queue.willMove(pokemon) ||
					(pokemon === this.activePokemon && this.activeMove && !this.activeMove.isExternal)
				) {
					this.effectState.duration--;
				}
				if (!pokemon.lastMove) {
					this.debug(`Pokemon hasn't moved yet`);
					return false;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === pokemon.lastMove.id) {
						if (!moveSlot.pp) {
							this.debug('Move out of PP');
							return false;
						}
					}
				}
				if (effect.effectType === 'Ability') {
					this.add('-start', pokemon, 'Jinx', pokemon.lastMove.name, '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Jinx', pokemon.lastMove.name);
				}
				this.effectState.move = pokemon.lastMove.id;
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Jinx');
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && move.id === this.effectState.move) {
					this.add('cant', attacker, 'Jinx', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 207
	},
	killingbite: {
		name: "Killing Bite",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 70,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		willCrit: true,
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 19
	},
	knifethrow: {
		name: "Knife Throw",
		target: "normal",
		type: "Steel",
		category: "Special",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				boosts: {spd: -1}
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 37
	},
	laevateinn: {
		name: "Laevateinn",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		self: {
			boosts: {spa: -1, spd: -1}
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 601
	},
	landslide: {
		name: "Landslide",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (target.hp <= target.maxhp / 2)
				return move.basePower * 2;
			return move.basePower;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 114
	},
	lastfarewell: {
		name: "Last Farewell",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 0,
		pp: 3,
		accuracy: 80,
		priority: 0,
		flags: {protect: 1, contact: 1},
		ohko: true
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 138
	},
	lastresort: {
		name: "Last Resort",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 140,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onTryHit(source, target, move) {
			let usedMoves = 0;
			for (const slot of source.moveSlots) {
				if (slot.used)
					usedMoves++;
			}
			if (usedMoves < source.moveSlots.length - 2) {
				this.add('-fail', source);
				return false;
			}
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 144
	},
	lastslash: {
		name: "Last Slash",
		target: "normal",
		type: "Steel",
		category: "Special",
		basePower: 100,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		self: {
			volatileStatus: 'stancebreak'
		}
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 127
	},
	lazymist: {
		name: "Lazy Mist",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			status: 'weak',
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 94
	},
	lifeburst: {
		name: "Life Burst",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	lightjavelin: {
		name: "Light Javelin",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1, javelin: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 17
	},
	lightoforigin: {
		name: "Light of Origin",
		target: "normal",
		type: "Light",
		category: "Special",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	lightsign: {
		name: "Light Sign",
		target: "normal",
		type: "Light",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	lightup: {
		name: "Light Up",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 55,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		critRatio: 2,
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 19
	},
	lightningcharge: {
		name: "Lightning Charge",
		target: "self",
		type: "Electric",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'lightningcharge',
		condition: {
			onStart(pokemon, source, effect) {
				if (effect && ['Electromorphosis', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Lightning Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Lightning Charge');
				}
			},
			onRestart(pokemon, source, effect) {
				if (effect && ['Electromorphosis', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Lightning Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Lightning Charge');
				}
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
			onMoveAborted(pokemon, target, move) {
				if (move.id !== 'charge') {
					pokemon.removeVolatile('lightningcharge');
				}
			},
			onAfterMove(pokemon, target, move) {
				if ( move.id !== 'charge') {
					pokemon.removeVolatile('lightningcharge');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Lightning Charge', '[silent]');
			},
		},
		boosts: {
			spd: 1,
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 200
	},
	lightningcut: {
		name: "Lightning Cut",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 90,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {spe: 1}
			}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 33
	},
	lightningspeed: {
		name: "Lightning Speed",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 70,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		selfSwitch: true,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 60
	},
	lightningstrike: {
		name: "Lightning Strike",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			status: 'par'
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 5
	},
	limitlessrealm: {
		name: "Limitless Realm",
		target: "all",
		type: "Warped",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {},
		onTryHit(source, target, move) {
			if (!this.field.weather && !this.field.terrain)
				return false;
		},
		onHit(target, source, move) {
			this.field.clearWeather();
			this.field.clearTerrain();
		},
	},
	lostcrisis: {
		name: "Lost Crisis",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onBasePower(relayVar, source, target, move) {
			if (this.field.terrain) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		onAfterHit(target, source, move) {
			this.field.clearTerrain();
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 164
	},
	loveorpain: {
		name: "Love or Pain",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onBasePower(relayVar, source, target, move) {
			if (target.status)
				return move.basePower * 2;
			return move.basePower;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 113
	},
	luckyrainbow: {
		name: "Lucky Rainbow",
		target: "allySide",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 25,
		accuracy: true,
		priority: 0,
		flags: {},
		sideCondition: 'luckyrainbow',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('fluorite')) {
					return 8;
				}
				return 5;
			},
			onAnySetStatus(status, target, source, effect) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					this.debug('Lucky Rainbow protect');
					return false;
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Lucky Rainbow');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Lucky Rainbow');
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 176
	},
	lullaby: {
		name: "Lullaby",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 60,
		priority: 0,
		flags: {},
		status: 'stp',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 25
	},
	luminousflux: {
		name: "Luminous Flux",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 120,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		recoil: [1, 3],
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 51
	},
	lusciouswhisper: {
		name: "Luscious Whisper",
		target: "normal",
		type: "Warped",
		category: "Special",
		basePower: 80,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		overrideDefensiveStat: 'def'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 130
	},
	macroburst: {
		name: "Macroburst",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 80,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 17
	},
	madrushstance: {
		name: "Mad Rush Stance",
		target: "self",
		type: "Steel",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1, spe: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 76
	},
	magicbarrier: {
		name: "Magic Barrier",
		target: "self",
		type: "Void",
		category: "Status",
		pp: 10,
		basePower: 0,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'magicbarrier',
		onTryHit(source) {
			if (source.volatiles['magicbarrier']) {
				this.add('-fail', source, 'move: Magic Barrier');
				return this.NOT_FAIL;
			}
			if (source.hp <= source.maxhp / 4) {
				this.add('-fail', source, 'move: Magic Barrier', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			this.directDamage(target.maxhp / 4);
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'Magic Barrier');
				this.effectState.hp = Math.floor(target.maxhp / 4);
				if (target.volatiles['partiallytrapped']) {
					this.add('-end', target, target.volatiles['partiallytrapped'].sourceEffect, '[partiallytrapped]', '[silent]');
					delete target.volatiles['partiallytrapped'];
				}
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit(target, source, move) {
				if (target === source || move.flags['bypasssub'] || move.infiltrates) {
					return;
				}
				let damage = this.actions.getDamage(source, target, move);
				if (!damage && damage !== 0) {
					this.add('-fail', source);
					this.attrLastMove('[still]');
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['magicbarrier'].hp) {
					damage = target.volatiles['magicbarrier'].hp as number;
				}
				target.volatiles['magicbarrier'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['magicbarrier'].hp <= 0) {
					if (move.ohko) this.add('-ohko');
					target.removeVolatile('magicbarrier');
				} else {
					this.add('-activate', target, 'move: Magic Barrier', '[damage]');
				}
				if (move.recoil) {
					this.damage(this.actions.calcRecoilDamage(damage, move), source, target, 'recoil');
				}
				if (move.drain) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.singleEvent('AfterSubDamage', move, null, target, source, move, damage);
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return this.HIT_SUBSTITUTE;
			},
			onEnd(target) {
				this.add('-end', target, 'Magic Barrier');
			},
		},
	},
	masterspark: {
		name: "Master Spark",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 100,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		beforeTurnCallback(pokemon, target) {
			pokemon.addVolatile('ignoremodifiers');
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 132
	},
	merrydance: {
		name: "Merry Dance",
		target: "self",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {def: 1, spd: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 74
	},
	metalneedle: {
		name: "Metal Needle",
		target: "normal",
		type: "Steel",
		category: "Special",
		basePower: 65,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
	},
	meteorimpact: {
		name: "Meteor Impact",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 150,
		pp: 20,
		accuracy: 100,
		priority: -3,
		flags: {protect: 1, contact: 1},
		onTryHit(source, target, move) {
			if (source.hurtThisTurn) {
				this.add('-fail', source);
				return false;
			}
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 109
	},
	miasma: {
		name: "Miasma",
		target: "normal",
		type: "Poison",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {},
		onModifyMove(move, pokemon, target) {
			if (pokemon.hasType('Poison'))
				move.accuracy = true;
		},
		status: 'tox'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 27
	},
	midnightspecter: {
		name: "Midnight Specter",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		recoil: [1, 3]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 108
	},
	mindcontrol: {
		name: "Mind Control",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			target.setAbility(source.ability);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 211
	},
	minetrap: {
		name: "Mine Trap",
		target: "foeSide",
		type: "Earth",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		sideCondition: 'minetrap',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Mine Trap');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Mine Trap');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem(['heavydutyboots', 'tengugeta'])) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 217
	},
	miraclereprisal: {
		name: "Miracle Reprisal",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 20,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * target.positiveBoosts();
			return bp;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 120
	},
	mirage: {
		name: "Mirage",
		target: "self",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 4,
		flags: {},
		volatileStatus: 'mirage',
		condition: {
			onTryHitPriority: 1,
			onTryHit(target, source, move) {
				if (target === source || move.hasBounced || move.category !== "Status" || !move.flags['reflectable']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, target, source);
				return null;
			},
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 180
	},
	mirageedge: {
		name: "Mirage Edge",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	mirrordamage: {
		name: "Mirror Damage",
		target: "normal",
		type: "Warped",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: -4,
		flags: {protect: 1, counter: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.volatiles['counter'].damage)
				return move.basePower * 2;
			return move.basePower;
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('counter');
		},
		onTry(source) {
			if (!source.volatiles['counter']) return false;
			if (source.volatiles['counter'].slot === null) return false;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 115
	},
	mirrorworld: {
		name: "Mirror World",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 18
	},
	mirrorsreflection: {
		name: "Mirror's Reflection",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		damageCallback(pokemon) {
			if (!pokemon.volatiles['mirrorsreflection']) return 0;
			return pokemon.volatiles['mirrorsreflection'].damage || 1;
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('mirrorsreflection');
		},
		onTry(source) {
			if (!source.volatiles['mirrorsreflection']) return false;
			if (source.volatiles['mirrorsreflection'].slot === null) return false;
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectState.slot = null;
				this.effectState.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2, move) {
				if (move.id !== 'mirrorsreflection') return;
				if (source !== this.effectState.target || !this.effectState.slot) return;
				return this.getAtSlot(this.effectState.slot);
			},
			onDamagingHit(damage, target, source, move) {
				if (!source.isAlly(target) && this.getCategory(move) !== 'Status') {
					this.effectState.slot = source.getSlot();
					this.effectState.damage = 1.5 * damage;
				}
			},
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 137
	},
	moonbow: {
		name: "Moonbow",
		target: "normal",
		type: "Light",
		category: "Special",
		basePower: 100,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 0
		// Effect ID: 0
	},
	moonsprotection: {
		name: "Moon's Protection",
		target: "self",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {spa: 1, spd: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 67
	},
	moonsreflection: {
		name: "Moon's Reflection",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: -5,
		flags: {protect: 1, counter: 1},
		damageCallback(pokemon) {
			if (!pokemon.volatiles['counter']) return 0;
			return pokemon.volatiles['counter'].damage || 1;
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('counter');
			pokemon.volatiles['counter'].categories = ['Special'];
		},
		onTry(source) {
			if (!source.volatiles['counter']) return false;
			if (source.volatiles['counter'].slot === null) return false;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 136
	},
	mountainbreaker: {
		name: "Mountain Breaker",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			switch (target.getWeight()) {
				case 0:
					return 40;
				case 1:
					return 60;
				case 2:
					return 80;
				case 3:
					return 100;
				case 4:
					return 120;
			}
			return 40;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 126
	},
	muddango: {
		name: "Mud Dango",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	mudslide: {
		name: "Mudslide",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 75,
		pp: 25,
		accuracy: 80,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			boosts: {accuracy: -1}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 78
	},
	mysteriousflare: {
		name: "Mysterious Flare",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	mysteriousliquid: {
		name: "Mysterious Liquid",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (target.hasStatus(['psn', 'tox']))
				return move.basePower * 2;
			return move.basePower;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 112
	},
	mysteriouswave: {
		name: "Mysterious Wave",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 80,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		overrideDefensiveStat: 'def'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 130
	},
	mysticwind: {
		name: "Mystic Wind",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {def: 3}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 75
	},
	mysticalbugmist: {
		name: "Mystical Bug Mist",
		target: "normal",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: 75,
		priority: 0,
		flags: {},
		status: 'par'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 24
	},
	naturalbeauty: {
		name: "Natural Beauty",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 90,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 20,
			boosts: {atk: -1}
		}
		// Class: BU
		// Effect Chance: 200
		// Effect ID: 34
	},
	naturesign: {
		name: "Nature Sign",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	neardeathevent: {
		name: "Near-Death Event",
		target: "self",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		onTryHit(source, target, move) {
			if (!source.lastMoveUsed || source.lastMoveUsed.id === 'neardeathevent') {
				this.add('-fail', source);
				return false;
			}
		},
		onHit(target, source, move) {
			if (source.lastMoveUsed)
				this.actions.useMove(source.lastMoveUsed, source, target, move);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 185
	},
	negativemist: {
		name: "Negative Mist",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 60,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		onHit(target, source, move) {
			target.clearBoosts();
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 131
	},
	nethersign: {
		name: "Nether Sign",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	nightstep: {
		name: "Night Step",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 90,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	nightwind: {
		name: "Night Wind",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	offensivetrance: {
		name: "Offensive Trance",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 2, def: -1, spa: 2, spd: -1, spe: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 70
	},
	offseasonbloom: {
		name: "Off-Season Bloom",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 130,
		pp: 5,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		self: {
			boosts: {spa: -2}
		},
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 56
	},
	omen: {
		name: "Omen",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		self: {
			boosts: {spa: -1, spd: -1}
		}
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 601
	},
	ominousdoll: {
		name: "Ominous Doll",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondaries: [
			{
				chance: 10,
				status: 'dark'
			}
		]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 3
	},
	orreriessun: {
		name: "Orreries Sun",
		target: "normal",
		type: "Dream",
		category: "Special",
		basePower: 80,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		self: {
			boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1, accuracy: 1, evasion: 1}
		}
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 63
	},
	overray: {
		name: "Over Ray",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	overdrive: {
		name: "Overdrive",
		target: "normal",
		type: "Warped",
		category: "Physical",
		basePower: 130,
		pp: 5,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		boosts: {atk: -2}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 234
	},
	overrun: {
		name: "Overrun",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 100,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	overskill: {
		name: "Overskill",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 120,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		recoil: [1, 3],
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 51
	},
	overtakestrike: {
		name: "Overtake Strike",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	paniccall: {
		name: "Panic Call",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			if (target.item) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		onHit(target, source, move) {
			target.clearItem();
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 143
	},
	paralyzingwave: {
		name: "Paralyzing Wave",
		target: "normal",
		type: "Electric",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		status: 'par'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 24
	},
	parasite: {
		name: "Parasite",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 50,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		drain: [1, 2]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 141
	},
	passingbreeze: {
		name: "Passing Breeze",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1},
		basePowerCallback(pokemon, target, move) {
			return this.field.weather ? move.basePower : move.basePower * 2;
		},
		onAfterHit(source, target, move) {
			if (this.field.weather)
				this.field.clearWeather();
		},
	},
	peachthornarrow: {
		name: "Peach-Thorn Arrow",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 120,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		recoil: [1, 3],
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 51
	},
	perch: {
		name: "Perch",
		target: "self",
		type: "Wind",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {},
		self: {
			volatileStatus: 'perch',
		},
		condition: {
			duration: 1,
			onResidualOrder: 25,
			onStart(target) {
				this.add('-singleturn', target, 'move: Perch');
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 184
	},
	perfectaim: {
		name: "Perfect Aim",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 0,
		pp: 8,
		accuracy: 30,
		priority: 0,
		flags: {protect: 1, contact: 1},
		ohko: true
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 138
	},
	petaldance: {
		name: "Petal Dance",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 150
	},
	phantasmagoria: { // Unused
		name: "Phantasmagoria",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 50,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 0
	},
	phantomensemble: {
		name: "Phantom Ensemble",
		target: "normal",
		type: "Sound",
		category: "Physical",
		basePower: 55,
		pp: 15,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			boosts: {atk: -1}
		}
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 34
	},
	phaseinversion: {
		name: "Phase Inversion",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 1,
		flags: {},
		onHit(target, source, move) {
			const boosts = target.boosts as SparseBoostsTable;
			let b:BoostID;
			for (b in boosts) {
				boosts[b]! *= -1;
			}
			target.setBoost(boosts);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 218
	},
	phoenixwaltz: {
		name: "Phoenix Waltz",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 150,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hp === pokemon.baseMaxhp) {
				return 150;
			}
			return 100 * pokemon.hp / pokemon.baseMaxhp;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 117
	},
	piercingstab: {
		name: "Piercing Stab",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 70,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		beforeTurnCallback(pokemon, target) {
			pokemon.addVolatile('ignoremodifiers');
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 132
	},
	plasmaball: {
		name: "Plasma Ball",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 20,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		status: 'par'
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 5
	},
	playghost: {
		name: "Play Ghost",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'fear'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 4
	},
	poisonbomb: {
		name: "Poison Bomb",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'psn'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 1
	},
	poisonsign: {
		name: "Poison Sign",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	poisonstream: {
		name: "Poison Stream",
		target: "normal",
		type: "Poison",
		category: "Physical",
		basePower: 100,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	poisontrap: {
		name: "Poison Trap",
		target: "foeSide",
		type: "Poison",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		sideCondition: 'poisontrap',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Poison Trap');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Poison Trap');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Poison Trap', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('poisontrap');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem(['heavydutyboots', 'tengugeta']) || pokemon.hasAbility(['strictdosage'])) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 216
	},
	poisonedarrow: {
		name: "Poisoned Arrow",
		target: "normal",
		type: "Poison",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			status: 'psn'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 93
	},
	pollenmist: {
		name: "Pollen Mist",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			boosts: {spa: -1}
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 36
	},
	poltergeist: {
		name: "Poltergeist",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 90,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'fear'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 4
	},
	possession: {
		name: "Possession",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			source.setAbility(target.ability);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 199
	},
	powerdrain: {
		name: "Power Drain",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 75,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		drain: [1, 2]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 141
	},
	powersplit: {
		name: "Power Split",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source) {
			const newatk = Math.floor((target.storedStats.atk + source.storedStats.atk) / 2);
			target.storedStats.atk = newatk;
			source.storedStats.atk = newatk;
			const newspa = Math.floor((target.storedStats.spa + source.storedStats.spa) / 2);
			target.storedStats.spa = newspa;
			source.storedStats.spa = newspa;
			this.add('-activate', source, 'move: Power Split', '[of] ' + target);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 193
	},
	powerspot: {
		name: "Power Spot",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: true,
		priority: 0,
		flags: {},
		slotCondition: 'Power Spot',
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectState.hp = source.maxhp / 2;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Power Spot', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 187
	},
	powerswap: {
		name: "Power Swap",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source) {
			const targetBoosts: SparseBoostsTable = {};
			const sourceBoosts: SparseBoostsTable = {};

			const atkSpa: BoostID[] = ['atk', 'spa'];
			for (const stat of atkSpa) {
				targetBoosts[stat] = target.boosts[stat];
				sourceBoosts[stat] = source.boosts[stat];
			}

			source.setBoost(targetBoosts);
			target.setBoost(sourceBoosts);

			this.add('-swapboost', source, target, 'atk, spa', '[from] move: Power Swap');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 192
	},
	prank: {
		name: "Prank",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 0,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 139
	},
	pretense: {
		name: "Pretense",
		target: "self",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: true,
		priority: 1,
		flags: {},
		onHit(target, source, move) {
			const type = this.dex.moves.get(target.moveSlots[0].id).type;
			if (target.hasType(type) || !target.setType(type)) return false;
			this.add('-start', target, 'typechange', type);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 204
	},
	primalnoise: {
		name: "Primal Noise",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 75,
		pp: 10,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1,},
		secondaries: [
			{
				chance: 50,
				boosts: {spd: -1}
			}
		]
		// Class: 2
		// Effect Chance: 500
		// Effect ID: 37
	},
	projection: {
		name: "Projection",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source) {
			const targetBoosts: SparseBoostsTable = {};
			const sourceBoosts: SparseBoostsTable = {};

			let i: BoostID;
			for (i in target.boosts) {
				targetBoosts[i] = target.boosts[i];
				sourceBoosts[i] = source.boosts[i];
			}

			target.setBoost(sourceBoosts);
			source.setBoost(targetBoosts);

			this.add('-swapboost', source, target, '[from] move: Projection');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 212
	},
	pulselaser: {
		name: "Pulse Laser",
		target: "normal",
		type: "Light",
		category: "Special",
		basePower: 150,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {recharge: 1, protect: 1,},
		self: {
			volatileStatus: 'mustrecharge',
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 50
	},
	puppetsgrudge: {
		name: "Puppet's Grudge",
		target: "normal",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {},
		boosts: {atk: -2, spa: -2},
		onHit(target, source, move) {
			source.faint();
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 89
	},
	purgatoryflicker: {
		name: "Purgatory Flicker",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		recoil: [1, 3],
		secondary: {
			chance: 10,
			status: 'brn'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 99
	},
	purplelightning: {
		name: "Purple Lightning",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 50,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 70,
			self: {
				boosts: {spa: 1}
			}
		}
		// Class: 2
		// Effect Chance: 700
		// Effect ID: 31
	},
	purplesmog: {
		name: "Purple Smog",
		target: "normal",
		type: "Poison",
		category: "Physical",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			status: 'psn'
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 1
	},
	pursuit: {
		name: "Pursuit",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 50,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('pursuit', pokemon);
				const data = side.getSideConditionData('pursuit');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('pursuit');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Pursuit start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Pursuit');
						alreadyAdded = true;
					}
					this.actions.runMove('pursuit', source, source.getLocOf(pokemon));
				}
			},
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 148
	},
	quadruplebarrier: {
		name: "Quadruple Barrier",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 80,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		self: {
			boosts: {def: 1}
		}
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 8
	},
	quagmire: {
		name: "Quagmire",
		target: "normal",
		type: "Water",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {},
		boosts: {spe: -1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 16
	},
	racingearth: {
		name: "Racing Earth",
		target: "self",
		type: "Earth",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {spe: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 43
	},
	raid: {
		name: "Raid",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 40,
		pp: 10,
		accuracy: 100,
		priority: 3,
		flags: {protect: 1, contact: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Raid only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 106
	},
	rainbowflowers: {
		name: "Rainbow Flowers",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, charge: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['aurora'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 166
	},
	rainbowshot: {
		name: "Rainbow Shot",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 85,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		self: {
			sideCondition: 'veilofwater'
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 162
	},
	rainbowslash: {
		name: "Rainbow Slash",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 130,
		pp: 10,
		accuracy: 70,
		priority: 1,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 70,
			volatileStatus: 'flinch'
		}
		// Class: BU
		// Effect Chance: 700
		// Effect ID: 18
	},
	randomshots: {
		name: "Random Shots",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 25,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		multihit: [2, 5]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 53
	},
	rapidthrow: {
		name: "Rapid Throw",
		target: "normal",
		type: "Steel",
		category: "Special",
		basePower: 25,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: [2, 5]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 53
	},
	realmblackrain: {
		name: "Realm [Black Rain]",
		target: "all",
		type: "Warped",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'sunshower',
		terrain: 'genbu',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 251
	},
	realmcorona: {
		name: "Realm [Corona]",
		target: "all",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'aurora',
		terrain: 'byakko',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 248
	},
	realmgold: {
		name: "Realm [Gold]",
		target: "all",
		type: "Earth",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'duststorm',
		terrain: 'kohryu',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 250
	},
	realmscarletmist: {
		name: "Realm [Scarlet Mist]",
		target: "all",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'heavyfog',
		terrain: 'suzaku',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 247
	},
	realmserenity: {
		name: "Realm [Serenity]",
		target: "all",
		type: "Wind",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'calm',
		terrain: 'seiryu',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 249
	},
	recallnightmare: {
		name: "Recall Nightmare",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			target.setAbility('active');
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 210
	},
	recklessdive: {
		name: "Reckless Dive",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 130,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onMoveFail(target, source, move) {
			source.damage(source.hp / 2);
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 124
	},
	recollection: {
		name: "Recollection",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 3,
		flags: {},
		onHit(target, pokemon) {
			if (!pokemon.transformInto(target, this.effect, false)) {
				return false;
			}
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 229
	},
	recompensate: {
		name: "Recompensate",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 0,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onTryHit(source, target, move) {
			if (source.hp >= target.hp) {
				this.add('-fail', source);
				return false;
			}
		},
		onHit(target, source, move) {
			target.damage(target.hp - source.hp);
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 140
	},
	reprimand: {
		name: "Reprimand",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 110
	},
	resourcefulness: {
		name: "Resourcefulness",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			if (!pokemon.item && !pokemon.lastItem) {
				pokemon.setItem(pokemon.lastItem);
				pokemon.lastItem = '';
				this.add('-item', pokemon, pokemon.getItem(), '[from] move: Resourcefulness');
			}
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 186
	},
	retaliation: {
		name: "Retaliation",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 70,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.side.faintedLastTurn) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 116
	},
	reversalsword: {
		name: "Reversal Sword",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	reversesplash: {
		name: "Reverse Splash",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: -4,
		flags: {protect: 1, counter: 1},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.volatiles['counter'].damage)
				return move.basePower * 2;
			return move.basePower;
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('counter');
		},
		onTry(source) {
			if (!source.volatiles['counter']) return false;
			if (source.volatiles['counter'].slot === null) return false;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 115
	},
	revolvingillusions: {
		name: "Revolving Illusions",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		overrideOffensivePokemon: 'target'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 129
	},
	risingsun: {
		name: "Rising Sun",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 50,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		self: {
			boosts: {spe: 1}
		}
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 33
	},
	roar: {
		name: "Roar",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		boosts: {def: -2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 45
	},
	rockdrills: {
		name: "Rock Drills",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 70,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		willCrit: true
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 19
	},
	rockybarrage: {
		name: "Rocky Barrage",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	rootfrog: {
		name: "Root Frog",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	rootinjection: {
		name: "Root Injection",
		target: "normal",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {},
		status: 'psn'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 20
	},
	royalprism: {
		name: "Royal Prism",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 75,
		pp: 15,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 18
	},
	rubburn: {
		name: "Rub Burn",
		target: "normal",
		type: "Fire",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {},
		status: 'brn'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 21
	},
	ruinousvoice: {
		name: "Ruinous Voice",
		target: "all",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		onHitField(target, source, move) {
			let result = false;
			let message = false;
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
					this.add('-miss', source, pokemon);
					result = true;
				} else if (this.runEvent('TryHit', pokemon, source, move) === null) {
					result = true;
				} else if (!pokemon.volatiles['ruinousvoice']) {
					pokemon.addVolatile('ruinousvoice');
					this.add('-start', pokemon, 'perish3', '[silent]');
					result = true;
					message = true;
				}
			}
			if (!result) return false;
			if (message) this.add('-fieldactivate', 'move: Ruinous Voice');
		},
		condition: {
			duration: 4,
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 24,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['ruinousvoice'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 198
	},
	rushattack: {
		name: "Rush Attack",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 25,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: [2, 5]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 53
	},
	sakurablizzard: {
		name: "Sakura Blizzard",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'weak',
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 94
	},
	samuraiedge: {
		name: "Samurai Edge",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 70,
			self: {
				boosts: {spa: 1}
			}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 29
	},
	scatterbeam: {
		name: "Scatter Beam",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		critRatio: 2,
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 19
	},
	scatterbeans: {
		name: "Scatter Beans",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	scoreweb: {
		name: "Score Web",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 80,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			if (target.item) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		onHit(target, source, move) {
			target.clearItem();
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 143
	},
	scorn: {
		name: "Scorn",
		target: "normal",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {},
		onTryHit(source, target, move) {
			if (!target.lastMoveUsed) {
				this.add('-fail', source);
				return false;
			}
		},
		onHit(target, source, move) {
			if (target.lastMoveUsed)
				target.lastMoveUsed.pp -= 4;
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 213
	},
	seasondoyou: {
		name: "Season [Doyou]",
		target: "all",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'calm',
		terrain: 'kohryu'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 608
	},
	seasonfall: {
		name: "Season [Fall]",
		target: "all",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'heavyfog',
		terrain: 'byakko',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 607
	},
	seasonspring: {
		name: "Season [Spring]",
		target: "all",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'sunshower',
		terrain: 'seiryu',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 605
	},
	seasonsummer: {
		name: "Season [Summer]",
		target: "all",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'aurora',
		terrain: 'suzaku',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 606
	},
	seasonwinter: {
		name: "Season [Winter]",
		target: "all",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: -7,
		flags: {},
		weather: 'duststorm',
		terrain: 'genbu',
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 604
	},
	seasonalflowers: {
		name: "Seasonal Flowers",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			boosts: {spa: -1}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 36
	},
	shadowbomb: {
		name: "Shadow Bomb",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	shadowjavelin: {
		name: "Shadow Javelin",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1, javelin: 1},
		secondary: {
			chance: 10,
			status: 'fear'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 4
	},
	shadowrush: {
		name: "Shadow Rush",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 30,
		pp: 10,
		accuracy: 100,
		priority: 2,
		flags: {contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 170
	},
	sharktrade: {
		name: "Shark Trade",
		target: "normal",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {},
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source, move) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemState, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Shark Trade', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Shark Trade');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Shark Trade');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Shark Trade');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Shark Trade');
			}
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 197
	},
	sharpwind: {
		name: "Sharp Wind",
		target: "self",
		type: "Wind",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {spa: 1, spe: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 68
	},
	shatteringearth: {
		name: "Shattering Earth",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 0,
		pp: 8,
		accuracy: 30,
		priority: 0,
		flags: {protect: 1, contact: 1},
		ohko: true
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 138
	},
	shieldup: {
		name: "Shield Up",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 35,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {def: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 8
	},
	shinigamiswaltz: {
		name: "Shinigami's Waltz",
		target: "normal",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'shinigamiswaltz',
		onTryHit(target, source, move) {
			if (move.volatileStatus && target.volatiles['shinigamiswaltz']) {
				return false;
			}
		},
		onHit(target, source) {
			this.directDamage(source.maxhp / 2, source, source);
		},
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, "Shinigami's Waltz", '[of] ' + source);
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 206
	},
	shockingwave: {
		name: "Shocking Wave",
		target: "normal",
		type: "Electric",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 85,
		priority: 0,
		flags: {},
		onTryImmunity(target, source, move) {
			if (target.hasType('Earth'))
				return false;
		},
		status: 'shk'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 238
	},
	shootingarts: {
		name: "Shooting Arts",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 25,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: [2, 5]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 53
	},
	shootingpress: {
		name: "Shooting Press",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 100,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	shout: {
		name: "Shout",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		boosts: {
			atk: -2
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 44
	},
	shriek: {
		name: "Shriek",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {},
		boosts: {
			spa: -2
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 46
	},
	silverrain: {
		name: "Silver Rain",
		target: "normal",
		type: "Steel",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			self: {
				boosts: {spa: 1}
			}
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 31
	},
	singleminded: {
		name: "Single-Minded",
		target: "self",
		type: "Steel",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 7
	},
	skanda: {
		name: "Skanda",
		target: "self",
		type: "Wind",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {spe: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 43
	},
	skullbreaker: {
		name: "Skull Breaker",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	slimeball: {
		name: "Slime Ball",
		target: "normal",
		type: "Poison",
		category: "Physical",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 20,
			status: 'tox'
		}
		// Class: BU
		// Effect Chance: 200
		// Effect ID: 95
	},
	slimeshot: {
		name: "Slime Shot",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 55,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		boosts: {spe: -1}
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 38
	},
	slingshot: {
		name: "Slingshot",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 55,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		boosts: {accuracy: -1}
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 78
	},
	smashspin: {
		name: "Smash Spin",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 60,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('drainseed')) {
				this.add('-end', pokemon, 'Drain Seed', '[from] move: Smash Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['bindtrap', 'minetrap', 'poisontrap', 'stealthtrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Smash Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('drainseed')) {
				this.add('-end', pokemon, 'Drain Seed', '[from] move: Smash Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['bindtrap', 'minetrap', 'poisontrap', 'stealthtrap'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Smash Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
	},
	smogshot: {
		name: "Smog Shot",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 55,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 30,
			status: 'psn'
		}
		// Class: BU
		// Effect Chance: 300
		// Effect ID: 1
	},
	sneakattack: {
		name: "Sneak Attack",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 80,
		pp: 5,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 107
	},
	snowballfight: {
		name: "Snowball Fight",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			boosts: {spe: -1}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 38
	},
	solareclipse: {
		name: "Solar Eclipse",
		target: "normal",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 80,
		priority: 0,
		flags: {},
		status: 'fear',
		volatileStatus: 'confusion'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 103
	},
	sopranovoice: {
		name: "Soprano Voice",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	sorrowfultune: {
		name: "Sorrowful Tune",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 55,
		pp: 15,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1,},
		boosts: {spa: -1}
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 36
	},
	soulcorruption: {
		name: "Soul Corruption",
		target: "normal",
		type: "Warped",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 80,
		priority: 0,
		flags: {},
		status: 'dark',
		volatileStatus: 'confusion'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 246
	},
	souleater: {
		name: "Soul Eater",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1, accuracy: 1, evasion: 1}
			}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 63
	},
	soulhound: {
		name: "Soul Hound",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	soulwalking: {
		name: "Soul Walking",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 55,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 30,
			status: 'fear'
		}
		// Class: BU
		// Effect Chance: 300
		// Effect ID: 4
	},
	soundsign: {
		name: "Sound Sign",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	sparkcross: {
		name: "Spark Cross",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		boosts: {spe: -1}
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 38
	},
	sparkjavelin: {
		name: "Spark Javelin",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1, javelin: 1},
		secondary: {
			chance: 10,
			status: 'par'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 5
	},
	sparkshot: {
		name: "Spark Shot",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 55,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			status: 'par'
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 5
	},
	spearthegungnir: {
		// I don't know where this came from but it dumped with my game data; Desc reads it's exclusive to ERemi but she doesn't have it
		// Move effects are taken from Irreversable Trick because of the shared ID
		name: "Spear The Gungnir",
		target: "normal",
		type: "Fire",
		category: "Physical",
		basePower: 100,
		pp: 90,
		accuracy: 100,
		priority: 0,
		flags: {bypasssub: 1, contact: 1},
		infiltrates: true,
		basePowerCallback(pokemon, target, move) {
			if (!this.queue.willMove(target) && target.lastMove && target.lastMove?.category === "Status") {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 228
	},
	specterwarning: {
		name: "Specter Warning",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'weak',
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 94
	},
	specterswaltz: {
		name: "Specter's Waltz",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 90,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'fear'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 4
	},
	speedybarrage: {
		name: "Speedy Barrage",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 140,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	spikedstones: {
		name: "Spiked Stones",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		boosts: {spe: -1}
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 38
	},
	spinningair: {
		name: "Spinning Air",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 95,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 18
	},
	spiralstrike: {
		name: "Spiral Strike",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 70,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			self: {
				boosts: {spa: 1}
			}
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 31
	},
	spiritrush: {
		name: "Spirit Rush",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		recoil: [1, 4]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 97
	},
	springfirst: {
		name: "Spring First",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	squall: {
		name: "Squall",
		target: "normal",
		type: "Wind",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: -6,
		flags: {},
		forceSwitch: true
	},
	stelmosfire: {
		name: "St. Elmo's Fire",
		target: "normal",
		type: "Illusion",
		category: "Physical",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			if (target.item) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		onHit(target, source, move) {
			target.clearItem();
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 143
	},
	stalkandmurder: {
		name: "Stalk and Murder",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 120,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {protect: 1, contact: 1, charge: 1},
		infiltrates: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}

			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				return false;
			},
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 169
	},
	starflare: {
		name: "Star Flare",
		target: "normal",
		type: "Light",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 20,
			boosts: {accuracy: -1}
		}
		// Class: BU
		// Effect Chance: 200
		// Effect ID: 78
	},
	starvingspirit: {
		name: "Starving Spirit",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 100,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	stealthkill: {
		name: "Stealth Kill",
		target: "normal",
		type: "Warped",
		category: "Physical",
		basePower: 80,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1, contact: 1, bypasssub: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 243
	},
	stealthtrap: {
		name: "Stealth Trap",
		target: "foeSide",
		type: "Steel",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		sideCondition: 'stealthtrap',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Trap');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem(['heavydutyboots', 'tengugeta'])) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthtrap')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 214
	},
	steelsign: {
		name: "Steel Sign",
		target: "normal",
		type: "Steel",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	stonecircle: {
		name: "Stone Circle",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1, accuracy: 1, evasion: 1}
			}
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 63
	},
	stonepile: {
		name: "Stone Pile",
		target: "self",
		type: "Nether",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {
			spd: 1,
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 10
	},
	stonerain: {
		name: "Stone Rain",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch'
		}
		// Class: BU
		// Effect Chance: 200
		// Effect ID: 18
	},
	stonethrow: {
		name: "Stone Throw",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 50,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 224
	},
	stormcloudseye: {
		name: "Stormcloud's Eye",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			status: 'par'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 5
	},
	strenuousstance: {
		name: "Strenuous Stance",
		target: "self",
		type: "Steel",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {atk: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 39
	},
	strikeshot: {
		name: "Strike Shot",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	struggle: {
		name: "Struggle",
		target: "normal",
		type: "Dream",
		category: "Physical",
		basePower: 51,
		pp: 35,
		accuracy: true,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 1023
	},
	stunbomb: {
		name: "Stun Bomb",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 80,
		pp: 15,
		accuracy: 95,
		priority: 1,
		flags: {protect: 1, contact: 1},
		status: 'par'
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 5
	},
	sunbeamdance: {
		name: "Sunbeam Dance",
		target: "normal",
		type: "Light",
		category: "Physical",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1},
		basePowerCallback(pokemon, target, move) {
			return this.field.weather ? move.basePower : move.basePower * 2;
		},
		onAfterHit(source, target, move) {
			if (this.field.weather)
				this.field.clearWeather();
		},
	},
	sunsprotection: {
		name: "Sun's Protection",
		target: "self",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 40,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			let boost = 1;
			if (this.field.isWeather(['calm', 'aurora'])) {
				boost = 2;
			}
			this.boost({atk: boost, spa: boost});
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 201
	},
	supernaturalborder: {
		name: "Supernatural Border",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'supernaturalborder',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Supernatural Border');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'])
					return;
				if (move.smartTarget)
					move.smartTarget = false;
				else
					this.add('-activate', target, 'move: Supernatural Border');
				
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					if (source.volatiles['lockedmove'].duration === 2)
						delete source.volatiles['lockedmove'];
				}
				return this.NOT_FAIL;
			},
		},
	},
	supernova: {
		// I don't know where this came from but it dumped with my game data; Desc reads it's exclusive to EShinki but she doesn't have it
		// Move effects are taken from Calamity because of the shared ID
		name: "Supernova",
		target: "normal",
		type: "Dream",
		category: "Special",
		basePower: 160,
		pp: 99,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		onHit(target, source, move) {
			const statuses = ['brn', 'psn', 'par', 'dark', 'fear', 'stp', 'weak'];
			let status1 = this.sample(statuses);
			let status2 = this.sample(statuses.filter(status => status !== status1));
			target.setStatus(status1);
			target.setStatus(status2);
		},
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 602
	},
	swallowcut: {
		name: "Swallow Cut",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 80,
		pp: 5,
		accuracy: 100,
		priority: 2,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	swallowtaillance: {
		// I don't know where this came from but it dumped with my game data; Desc reads it's exclusive to EYuyu but she doesn't have it
		name: "Swallowtail Lance",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 110,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		drain: [1, 2]
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 141
	},
	sweetdesperado: {
		name: "Sweet Desperado",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 130,
		pp: 5,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		self: {
			chance: 10,
			boosts: {spa: -2}
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 56
	},
	sweetnightmare: {
		name: "Sweet Nightmare",
		target: "normal",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 15,
		accuracy: 90,
		priority: 0,
		flags: {},
		status: 'dark'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 22
	},
	swiftairraid: {
		name: "Swift Air-Raid",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1, bypasssub: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 243
	},
	swirlingleaves: {
		name: "Swirling Leaves",
		target: "normal",
		type: "Nature",
		category: "Special",
		basePower: 60,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	takeover: {
		name: "Take Over",
		target: "normal",
		type: "Nether",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		overrideOffensivePokemon: 'target'
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 129
	},
	tenseup: {
		name: "Tense Up",
		target: "self",
		type: "Fighting",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {def: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 8
	},
	terrainbyakko: {
		name: "Terrain [Byakko]",
		target: "all",
		type: "Steel",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		terrain: 'byakko'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 158
	},
	terraingenbu: {
		name: "Terrain [Genbu]",
		target: "all",
		type: "Water",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: -7,
		flags: {},
		terrain: 'genbu'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 159
	},
	terrainkohryu: {
		name: "Terrain [Kohryu]",
		target: "all",
		type: "Earth",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		terrain: 'kohryu'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 237
	},
	terrainseiryu: {
		name: "Terrain [Seiryu]",
		target: "all",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: -1,
		flags: {},
		terrain: 'seiryu'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 156
	},
	terrainsuzaku: {
		name: "Terrain [Suzaku]",
		target: "all",
		type: "Fire",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		terrain: 'suzaku'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 157
	},
	theripper: {
		name: "The Ripper",
		target: "normal",
		type: "Steel",
		category: "Physical",
		basePower: 60,
		pp: 25,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1, contact: 1},
		critRatio: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 19
	},
	thermit: {
		name: "Thermit",
		target: "normal",
		type: "Fire",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {},
		status: 'brnheavy'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 28
	},
	thievingwind: {
		name: "Thieving Wind",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
				!source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-enditem', target, yourItem, '[silent]', '[from] move: Thieving Wind', '[of] ' + source);
			this.add('-item', source, yourItem, '[from] move: Thieving Wind', '[of] ' + target);
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 172
	},
	thornedivy: {
		name: "Thorned Ivy",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'thornedivy',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Thorned Ivy');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					source.damage(source.maxhp / 16, target);
					return;
				}
				if (move.smartTarget)
					move.smartTarget = false;
				else
					this.add('-activate', target, 'move: Thorned Ivy');
				
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					if (source.volatiles['lockedmove'].duration === 2)
						delete source.volatiles['lockedmove'];
				}
				return this.NOT_FAIL;
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 168
	},
	thorshammer: {
		name: "Thor's Hammer",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		recoil: [1, 3],
		secondary: {
			chance: 10,
			status: 'par'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 98
	},
	thunderdrill: {
		name: "Thunder Drill",
		target: "normal",
		type: "Electric",
		category: "Physical",
		basePower: 70,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		willCrit: true
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 19
	},
	thunderforce: {
		name: "Thunder Force",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			status: 'par'
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 5
	},
	thunderveil: {
		name: "Thunder Veil",
		target: "normal",
		type: "Electric",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 80,
		priority: 0,
		flags: {},
		status: 'par',
		volatileStatus: 'confusion'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 104
	},
	thunderclap: {
		name: "Thunderclap",
		target: "normal",
		type: "Electric",
		category: "Status",
		basePower: 0,
		pp: 1,
		accuracy: true,
		priority: 3,
		flags: {},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch'
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 223
	},
	thunderlordsscorn: {
		name: "Thunderlord's Scorn",
		target: "normal",
		type: "Electric",
		category: "Special",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			status: 'par'
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 5
	},
	tigerrush: {
		name: "Tiger Rush",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 40,
		pp: 30,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	timescrew: {
		name: "Time Screw",
		target: "normal",
		type: "Warped",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	toxichaze: {
		name: "Toxic Haze",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 65,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			status: 'tox'
		}
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 95
	},
	toxicspiral: {
		name: "Toxic Spiral",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		boosts: {spd: -2}
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 77
	},
	trickster: {
		name: "Trickster",
		target: "normal",
		type: "Warped",
		category: "Physical",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 1,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	trieffect: {
		name: "Tri-Effect",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 96
	},
	tumbleplant: {
		name: "Tumble Plant",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 40,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			switch (target.getWeight()) {
				case 0:
					return 40;
				case 1:
					return 60;
				case 2:
					return 80;
				case 3:
					return 100;
				case 4:
					return 120;
			}
			return 40;
		},
	},
	tuning: {
		name: "Tuning",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {spa: 1}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 9
	},
	twilightinfection: {
		name: "Twilight Infection",
		target: "normal",
		type: "Dark",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	twingears: {
		name: "Twin Gears",
		target: "normal",
		type: "Steel",
		category: "Special",
		basePower: 50,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 224
	},
	twinthrust: {
		name: "Twin Thrust",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 50,
		pp: 10,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: 2,
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 224
	},
	twister: {
		name: "Twister",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 25,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		multihit: [2, 5]
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 53
	},
	ultrahightone: {
		name: "Ultra High Tone",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			onHit(target, source, move) {
				const stats: BoostID[] = [];
				let stat: BoostID;
				for (stat in target.boosts) {
					if (target.boosts[stat] < 6) {
						stats.push(stat);
					}
				}
				if (stats.length) {
					const randomStat = this.sample(stats);
					const boost: SparseBoostsTable = {};
					boost[randomStat] = 1;
					this.boost(boost);
				} else {
					return false;
				}
			},
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 65
	},
	unconsciousmind: {
		//TODO - Find out what is NOT allowed to be picked, if anything
		name: "Unconscious Mind",
		target: "self",
		type: "Void",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onTry(source) {
			return source.hasStatus('stp') || source.hasAbility('comatose');
		},
		onHit(pokemon) {
			const noSleepTalk = [
				'assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'dynamaxcannon', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'sleeptalk', 'uproar',
			];
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				if (!moveid) continue;
				const move = this.dex.moves.get(moveid);
				if (noSleepTalk.includes(moveid) || move.flags['charge'] || (move.isZ && move.basePower !== 1) || move.isMax) {
					continue;
				}
				moves.push(moveid);
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.actions.useMove(randomMove, pokemon);
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 151
	},
	understep: {
		name: "Understep",
		target: "normal",
		type: "Fighting",
		category: "Special",
		basePower: 60,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		boosts: {spe: -1}
		// Class: BU
		// Effect Chance: 1000
		// Effect ID: 38
	},
	unfetteredsoul: {
		name: "Unfettered Soul",
		target: "normal",
		type: "Nether",
		category: "Physical",
		basePower: 55,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item)
				return move.basePower * 2;
			return move.basePower;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 111
	},
	unknownflare: {
		name: "Unknown Flare",
		target: "normal",
		type: "Illusion",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 17
	},
	unstablehorizon: {
		name: "Unstable Horizon",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			boosts: {accuracy: -1}
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 78
	},
	unused: {
		name: "Unused",
		target: "normal",
		type: "Earth",
		category: "Physical",
		basePower: 150,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hp === pokemon.baseMaxhp) {
				return 150;
			}
			return 100 * pokemon.hp / pokemon.baseMaxhp;
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 117
	},
	upbeat: {
		name: "Upbeat",
		target: "normal",
		type: "Sound",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {},
		volatileStatus: 'upbeat',
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectState.duration++;
				}
				this.add('-start', target, 'move: Upbeat');
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Upbeat');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.category === 'Status') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (move.category === 'Status') {
					this.add('cant', attacker, 'move: Upbeat', move);
					return false;
				}
			},
		},
	},
	vacuumrupture: {
		name: "Vacuum Rupture",
		target: "normal",
		type: "Fighting",
		category: "Physical",
		basePower: 150,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {recharge: 1, protect: 1, contact: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 50
	},
	veilofwater: {
		name: "Veil of Water",
		target: "allySide",
		type: "Water",
		category: "Special",
		basePower: 40,
		pp: 25,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		sideCondition: 'veilofwater',
		condition: {
			duration: 5,
			onBoost(boost, target, source, effect) {
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if (source && target !== source) {
					let showMsg = false;
					let i: BoostID;
					for (i in boost) {
						if (boost[i]! < 0) {
							delete boost[i];
							showMsg = true;
						}
					}
					if (showMsg && !(effect as ActiveMove).secondaries) {
						this.add('-activate', target, 'move: Veil of Water');
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Veil of Water');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 4,
			onSideEnd(side) {
				this.add('-sideend', side, 'Veil of Water');
			},
		},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 162
	},
	venomfang: {
		name: "Venom Fang",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 80,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 30,
			status: 'psn'
		}
		// Class: BU
		// Effect Chance: 300
		// Effect ID: 1
	},
	venomnova: {
		name: "Venom Nova",
		target: "normal",
		type: "Poison",
		category: "Physical",
		basePower: 120,
		pp: 5,
		accuracy: 85,
		priority: 0,
		flags: {protect: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'psn'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 1
	},
	venomstrike: {
		name: "Venom Strike",
		target: "normal",
		type: "Poison",
		category: "Special",
		basePower: 120,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onTry(source, target, move) {
			if (source.item) {
				this.add('-fail', source);
				return false;
			}
		},
		secondary: {
			chance: 20,
			status: 'psn'
		}
		// Class: BU
		// Effect Chance: 200
		// Effect ID: 147
	},
	vigilantwatch: {
		name: "Vigilant Watch",
		target: "normal",
		type: "Steel",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'stancebreak'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 221
	},
	voiceoffamine: {
		name: "Voice of Famine",
		target: "normal",
		type: "Nature",
		category: "Physical",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			status: 'weak',
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 94
	},
	volcano: {
		name: "Volcano",
		target: "normal",
		type: "Fire",
		category: "Special",
		basePower: 130,
		pp: 5,
		accuracy: 90,
		priority: 0,
		flags: {protect: 1,},
		self: {
			boosts: {spa: -2}
		},
		// Class: 2
		// Effect Chance: 1000
		// Effect ID: 56
	},
	volley: {
		name: "Volley",
		target: "normal",
		type: "Void",
		category: "Special",
		basePower: 60,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	waltz: {
		name: "Waltz",
		target: "normal",
		type: "Sound",
		category: "Special",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			onHit(target, source, move) {
				const stats: BoostID[] = [];
				let stat: BoostID;
				for (stat in target.boosts) {
					if (target.boosts[stat] < 6) {
						stats.push(stat);
					}
				}
				if (stats.length) {
					const randomStat = this.sample(stats);
					const boost: SparseBoostsTable = {};
					boost[randomStat] = 1;
					this.boost(boost);
				} else {
					return false;
				}
			},
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 65
	},
	warpedsign: {
		name: "Warped Sign",
		target: "normal",
		type: "Warped",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	waterball: {
		name: "Water Ball",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 60,
		pp: 30,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	watersign: {
		name: "Water Sign",
		target: "normal",
		type: "Water",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	waterfalldrop: {
		name: "Waterfall Drop",
		target: "normal",
		type: "Water",
		category: "Physical",
		basePower: 100,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 0
	},
	wavesofearth: {
		name: "Waves of Earth",
		target: "normal",
		type: "Earth",
		category: "Special",
		basePower: 95,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 10,
			boosts: {accuracy: -1}
		}
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 78
	},
	weatheraurora: {
		name: "Weather [Aurora]",
		target: "all",
		type: "Light",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		weather: 'aurora'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 153
	},
	weathercalm: {
		name: "Weather [Calm]",
		target: "all",
		type: "Wind",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		weather: 'calm'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 152
	},
	weatherduststorm: {
		name: "Weather [Duststorm]",
		target: "all",
		type: "Earth",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		weather: 'duststorm'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 155
	},
	weatherheavyfog: {
		name: "Weather [Heavy Fog]",
		target: "all",
		type: "Dark",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		weather: 'heavyfog'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 154
	},
	weathersunshower: {
		name: "Weather [Sunshower]",
		target: "all",
		type: "Warped",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		weather: 'sunshower'
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 236
	},
	westerlies: {
		name: "Westerlies",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 65,
		pp: 20,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 20,
			self: {
				boosts: {spe: 1}
			}
		}
		// Class: 2
		// Effect Chance: 200
		// Effect ID: 33
	},
	whitelilydance: {
		name: "White Lily Dance",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: true,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			source.side.addSideCondition('whitelilydance');
			source.faint();
		},
		condition: {
			onSwitchIn(pokemon) {
				if (pokemon.hp == pokemon.maxhp && !pokemon.hasStatus()) {
					this.add('-fail', pokemon, 'move: White Lily Dance');
					return;
				}
				this.add('-activate', pokemon, '[from] move: White Lily Dance')
				pokemon.hp = pokemon.maxhp;
				pokemon.clearStatus();
				pokemon.side.removeSideCondition('whitelilydance');
			},
		}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 189
	},
	whitemist: {
		name: "White Mist",
		target: "self",
		type: "Nature",
		category: "Status",
		basePower: 0,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {},
		boosts: {spa: 2}
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 69
	},
	wholebeing: {
		name: "Whole Being",
		target: "normal",
		type: "Void",
		category: "Physical",
		basePower: 125,
		pp: 5,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onTryHit(source, target, move) {
			target.addVolatile('wholebeing');
		},
		onHit(target, source, move) {
			target.removeVolatile('wholebeing');
			source.faint();
		},
		condition: {
			duration: 1,
			onModifyDef(relayVar, target, source, move) {
				this.chainModify(0.5);
			},
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 88
	},
	willowisp: {
		name: "Will-o'-Wisp",
		target: "normal",
		type: "Fire",
		category: "Status",
		basePower: 0,
		pp: 10,
		accuracy: 85,
		priority: 0,
		flags: {},
		status: ['brn', 'dark']
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 102
	},
	windgodsgrace: {
		name: "Wind God's Grace",
		target: "allySide",
		type: "Wind",
		category: "Status",
		basePower: 0,
		pp: 30,
		accuracy: true,
		priority: 0,
		flags: {},
		sideCondition: 'windgodsgrace',
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (this.field.isWeather('calm')) {
					return 6;
				}
				return 4;
			},
			onSideStart(side) {
				this.add('-sidestart', side, "move: Wind God's Grace");
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, "move: Wind God's Grace");
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 175
	},
	windjavelin: {
		name: "Wind Javelin",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 80,
		pp: 15,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, contact: 1, javelin: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch'
		}
		// Class: BU
		// Effect Chance: 100
		// Effect ID: 18
	},
	windsign: {
		name: "Wind Sign",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 60,
		pp: 10,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1, sign: 1},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	windtrain: {
		name: "Wind Train",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 60,
		pp: 20,
		accuracy: true,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	windwave: {
		name: "Wind Wave",
		target: "normal",
		type: "Wind",
		category: "Special",
		basePower: 75,
		pp: 15,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1,},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch'
		}
		// Class: 2
		// Effect Chance: 300
		// Effect ID: 18
	},
	wintrywind: {
		name: "Wintry Wind",
		target: "normal",
		type: "Wind",
		category: "Physical",
		basePower: 55,
		pp: 20,
		accuracy: 95,
		priority: 0,
		flags: {protect: 1,},
		critRatio: 2,
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 19
	},
	wordbreak: {
		name: "Word Break",
		target: "normal",
		type: "Illusion",
		category: "Status",
		basePower: 0,
		pp: 5,
		accuracy: true,
		priority: 0,
		flags: {},
		volatileStatus: 'wordbreak',
		condition: {
			duration: 5,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				let lockableMoves:string[] = [];
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.pp) {
						lockableMoves.push(moveSlot.id);
					}
				}
				let lockedMoves:string[] = [];
				lockedMoves.push(this.sample(lockableMoves));
				lockedMoves.push(this.sample(lockableMoves.filter(move => move !== lockedMoves[0])));

				if (effect.effectType === 'Ability') {
					this.add('-start', pokemon, 'Word Break', lockedMoves.join(', '), '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Word Break', lockedMoves.join(', '));
				}
				this.effectState.moves = lockedMoves;
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Word Break');
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (this.effectState.moves.includes(move.id)) {
					this.add('cant', attacker, 'Word Break', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.effectState.moves.includes(moveSlot.id)) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		// Class: EN
		// Effect Chance: 100
		// Effect ID: 225
	},
	yangenergy: {
		name: "Yang Energy",
		target: "normal",
		type: "Dream",
		category: "Special",
		basePower: 55,
		pp: 35,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1,},
		// Class: 2
		// Effect Chance: 100
		// Effect ID: 0
	},
	yinenergy: {
		name: "Yin Energy",
		target: "normal",
		type: "Dream",
		category: "Physical",
		basePower: 55,
		pp: 35,
		accuracy: 100,
		priority: 0,
		flags: {protect: 1},
	},
};
