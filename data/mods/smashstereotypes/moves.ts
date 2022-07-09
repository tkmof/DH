export const Moves: {[moveid: string]: ModdedMoveData} = {
	allterrainblast: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Power doubles and type varies in each terrain.",
		id: "allterrainblast",
		name: "All-Terrain Blast",
		pp: 10,
		priority: 0,
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1
		},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Weather Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	leafage: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.species.id === 'shaymin') {
				return priority + 1;
			}
		},
	},
	shedleaves: {
 		  accuracy: true,
		  basePower: 0,
		  category: "Status",
		  shortDesc: "Removes the user's Grass-type, resets negative stat changes, and cures the user of status.",		
		  name: "Shed Leaves",
		  pp: 10,
		  priority: 0,
		  flags: {snatch: 1},
		  onTryMove(pokemon, target, move) {
			  if (pokemon.hasType('Grass')) return;
			  this.add('-fail', pokemon, 'move: Shed Leaves');
			  this.attrLastMove('[still]');
			  return null;
		  },		
		  onHit(pokemon) {
				if (['', 'slp', 'frz'].includes(pokemon.status)) return;
				pokemon.cureStatus();
		  },
		  self: {
			  onHit(pokemon) {
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
				this.add('-message', pokemon.name + "'s negative stat changes were removed!");
				
				  pokemon.setType(pokemon.getTypes(true).map(type => type === "Grass" ? "???" : type));
				  this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Shed Leaves');
			  },
		  },
		  secondary: null,
		  target: "self",
		  type: "Grass",
		  zMove: {effect: 'heal'},
		  contestType: "Clever",
	},
	seedbomb: {
		inherit: true,
		secondary: {
			chance: 50,
			onHit(target, source, move) {
				if (source.species.id !== 'shaymin') return;
				target.addVolatile('leechseed');
			},
		},
	},
	focusblast: {
		inherit: true,
		onSourceModifyAccuracy(accuracy) {
			if (source.species.id !== 'heatmor') return;
			return accuracy + 15;
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'typhlosion') return;
			if (target.newlySwitched || !this.queue.willMove(target)) move.accuracy = true;
		},
	},
	adaptableattack: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Deals typeless damage. Special if SpA > Atk.",
		isViable: true,
		name: "Adaptable Attack",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Multi-Attack", target);
		},
		onModifyMove(move, pokemon, target) {
			move.type = '???';
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.species.name === 'Type: Null') {
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	chipaway: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'mytheon') {
				move.type = 'Dragon';
				move.basePower = 85;
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			if (pokemon.species.id === 'mytheon') {
				this.add('-message', `${pokemon.name}'s ${move.name} is ${move.type}-type!`);
			}
		},
	},
	doublekick: {
		inherit: true,
		onSourceModifyAccuracy(accuracy) {
			if (source.species.id !== 'mytheon') return;
			return accuracy - 10;
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'mytheon') {
				move.basePower = 50;
			}
		},
	},
	naturalgift: {
		inherit: true,
		onPrepareHit(target, pokemon, move) {
			if (pokemon.species.id !== 'mytheon') {
				if (pokemon.ignoringItem()) return false;
				const item = pokemon.getItem();
				if (!item.naturalGift) return false;
				move.basePower = item.naturalGift.basePower;
				pokemon.setItem('');
				pokemon.lastItem = item.id;
				pokemon.usedItemThisTurn = true;
				this.runEvent('AfterUseItem', pokemon, null, null, item);
			}
			else if (pokemon.species.id === 'mytheon') {
				if (pokemon.ignoringItem()) return false;
				const item = pokemon.getItem();
				if (!item.naturalGift) return false;
				move.basePower = item.naturalGift.basePower;
			}
		},
	},
	poisonfang: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'mytheon') {
				move.basePower = 65;
			}
		},
		onSourceModifyAccuracy(accuracy) {
			if (source.species.id !== 'mytheon') return;
			return accuracy - 5;
		},
		secondary: {
			chance: 50,
			status: 'tox',
		}, 
		self: {
			chance: 10,
			onHit(source, pokemon) {
				if (source.species.id !== 'mytheon') return;
				pokemon.addVolatile('flinch');
			}
		},				
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	skittersmack: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'mytheon') {
				move.basePower = 90;
			}
			if (source.species.id === 'shedinja') {
				move.basePower = 80;
			}
		},
		onSourceModifyAccuracy(accuracy) {
			if (source.species.id !== 'mytheon' || source.species.id !== 'shedinja') return;
			return accuracy = 100;
		},
		secondaries: [
			{
				chance: 30,
				onHit(source, pokemon) {
					if (pokemon.species.id === 'mytheon') {
						this.boost({spa: -1}, source);
					}
				}
			}, {
				chance: 100,
				onHit(source, pokemon) {
					if (pokemon.species.id !== 'mytheon') {
						this.boost({spa: -1}, source);
					}
				}
			},
		],
	},
	synchronoise: {
		inherit: true,
		onTryImmunity(target, source) {
			if (source.species.id !== 'mytheon') {
				return target.hasType(source.getTypes());
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'mytheon') {
				move.basePower = 70;
				move.ignoreImmunity = false;
				move.flags.sound = 1;
			}
		},
		onBasePower(basePower, pokemon, target) {
			if (target.hasType(pokemon.getTypes()) && pokemon.species.id === 'mytheon') {
				return this.chainModify(2);
			}
		},
	},
	uturn: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'mytheon') {
				move.basePower = 60;
			}
		},
	},
	doubleironbash: {
		num: 742,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Hits twice.",
		name: "Double Iron Bash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 2,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 180},
		maxMove: {basePower: 140},
		contestType: "Clever",
	},
	eyesofchaos: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
		isViable: true,
		name: "Eyes of Chaos",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glare", target);
		},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	multiattack: {
		num: 718,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Multi-Attack",
		shortDesc: "Type varies based on the user's type.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	slitherstrike: {
		num: -1,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "User switches out after damaging the target. If used by Sandaconda, it transforms into Sandaconda-Uncoiled for the rest of the match.",
		name: "Slither Strike",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Sandaconda' && !pokemon.transformed && pokemon.species.id !== 'sandacondauncoiled') {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				let forme = '';
				if (pokemon.species.id === 'sandaconda') {
					forme = '-Uncoiled';
				}
				pokemon.formeChange('Sandaconda' + forme, move, true, '[silent]');
				this.add('-message', `${pokemon.name} uncoiled!`);
				const species = this.dex.getSpecies(pokemon.species.name);
				const abilities = species.abilities;
				const baseStats = species.baseStats;
				const type = species.types[0];
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cute",
	},
	coralcrash: {
		num: 1006,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: " Has 1/4 recoil. 10% chance to lower the target's Special Attack by 1.",
		name: "Coral Crash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	puyopop: {
		num: 40046,
		accuracy: 90,
		basePower: 10,
		basePowerCallback(pokemon, target, move) {
			return 10 * move.hit;
		},
		category: "Special",
		shortDesc: "Hits 4 times. Each hit can miss, but power rises. Fourth hit clears user side's hazards.",
		id: "puyopop",
		name: "Puyo Pop",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
		if (move.hit !== 4) return;
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Puyo Pop', '[of] ' + source);
				}
			}
		},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Cute",
	},
	permutation: {
		num: 40053,
		accuracy: true,
		basePower: 200,
		category: "Special",
		shortDesc: "No additional effect.",
		id: "permutation",
		name: "Permutation",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "puyoniumz",
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	crunch: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'arcanine') {
				move.basePower = 85;
			}
		},
	},
	thunderfang: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'arcanine') {
				move.basePower = 85;
			}
		},
	},
	firefang: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'arcanine') {
				move.basePower = 85;
			}
		},
	},
	wildcharge: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'arcanine') {
				move.basePower = 100;
			}
		},
	},
	doublekick: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'arcanine') {
				move.basePower = 50;
			}
		},
	},
	dragonragesylve: {
		num: 82,
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Special",
		shortDesc: "Deals fixed damage equal to the user's level",
		id: "dragonragesylve",
		isViable: true,
		name: "Dragon Rage (Sylve)",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rage", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMovePower: 100,
		contestType: "Cool",
	},
	flamewheelsylve: {
		num: 228,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the flame wheel succeeds
			if (target.beingCalledBack) {
				this.debug('Flame Wheel damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if a foe is switching out.",
		id: "flamewheelsylve",
		isViable: true,
		name: "Flame Wheel (Sylve)",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('flamewheelsylve', pokemon);
				const data = side.getSideConditionData('flamewheelsylve');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('flamewheelsylve');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Flame Wheel start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Flame Wheel');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Flame Wheel user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('flamewheelsylve', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Wheel", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 100,
		contestType: "Clever",
	},
	incineratesylve: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		id: "incineratesylve",
		isViable: true,
		name: "Incinerate (Sylve)",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1,
			mirror: 1
		},
		onBasePowerPriority: 4,
		onBasePower: function(basePower, source, target, move) {
			let item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onHit: function(target, source) {
			let item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Incinerate', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
				}
				if (item.onEat) source.ateBerry = true;
			}
		},
		onAfterHit: function(target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Incinerate', '[of] ' + source);
				}
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Incinerate", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMovePower: 120,
	},
	morningsun: {
		num: 234,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Morning Sun",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onModifyMove(move, source, target) {
			if (source.species.id === 'arcanine') {
				move.pp = 10;
			}
		},
		onHit: function(pokemon) {
			if (this.field.isWeather(['desolateland', 'sunnyday'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else if (this.field.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail']) && pokemon.species.id !== 'arcanine') {
				return this.heal(this.modify(pokemon.maxhp, 0.25));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	mudslapsylve: {
		num: 98,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Usually goes first.",
		id: "mudslapsylve",
		isViable: true,
		name: "Mud Slap (Sylve)",
		pp: 30,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mud Slap", target);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		zMovePower: 100,
		contestType: "Cool",
	},
	teleport: {
		num: 100,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Teleport",
		pp: 20,
		priority: -6,
		flags: {},
		onModifyMove(move, source, target) {
			if (source.species.id === 'arcanine') {
				move.basePower = 70;
				move.target = 'normal';
			}
		},
		onModifyPriority(priority, source, target, move) {
			if (source.species.id === 'arcanine') {
				return priority + 0;
			}
		},
		selfSwitch: true,
		onTryHit: true,
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'heal'},
		contestType: "Cool",
	},
	stormstrike: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Power doubles and type varies in each weather.",
		id: "stormstrike",
		name: "Storm Strike",
		pp: 10,
		priority: 0,
		flags: {
			bullet: 1,
			protect: 1,
			mirror: 1
		},
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
				move.type = 'Ice';
				break;
			case 'aircurrent':
				move.type = 'Flying';
				break;
			case 'shadowsky':
				move.type = 'Ghost';
				break;					
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
				move.basePower *= 2;
				break;
			case 'aircurrent':
				move.basePower *= 2;
				break;
			case 'shadowsky':
				move.basePower *= 2;
				break;					
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Weather Ball", target);
			this.add('-anim', source, "Knock Off", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	peekaboo: {
		num: 712,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			return this.random(130);
		},
		category: "Special",
		name: "Peek-a-Boo",
		shortDesc: "Deals a random amount of damage and forces user out.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit(pokemon, target, move, source) {
            if (!this.canSwitch(pokemon.side)) {
                return false;
            }
			source.forceSwitch();
			return;
		},
		self: {
			forceSwitch: true,
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mean Look", target);
			this.add('-anim', source, "Poltergeist", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	planetarycrash: {
		num: 1002,
		accuracy: 80,
		basePower: 120,
		category: "Special",
		name: "Planetary Crash",
		shortDesc: "User takes 50% of max HP if it misses. Phys if Atk > Sp. Atk",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('Planetary Crash'));
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cosmic Power", target);
			this.add('-anim', source, "Head Smash", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	terraforming: {
		num: 1015,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Terraforming",
		shortDesc: "Fails if there is no weather active. Ends the weather.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit() {
			if (this.field.isWeather('')) return false;
		},
		onHit() {
			this.field.clearWeather();
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rototiller", target);
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	aerostrike: {
		num: 369,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "User switches out after damaging the target.",
		name: "Aerostrike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aeroblast", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cute",
	},
	sweetmelody: {
		num: 10001,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "The target is freed from Infestation.",
		name: "Sweet Melody",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sparkling Aria", target);
		},
		secondary: {
			dustproof: true,
			chance: 100,
			onHit(target) {
				if (target.volatiles['infestation']) target.removeVolatile('infestation');
			},
		},
		target: "allAdjacent",
		type: "Water",
		contestType: "Tough",
	},
	flashhandoff: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "User switches out. The replacement's next move has perfect accuracy.",
		isViable: true,
		name: "Flash Handoff",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		slotCondition: 'flashhandoff',
		condition: {
			duration: 1,
			onResidualOrder: 7,
			onEnd(source) {
				for (const pokemon of source.side.active) {
					if (!pokemon.fainted) {
						pokemon.addVolatile('lockon');
					}
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "U-turn", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'healreplacement'},
		contestType: "Tough",
	},
	terracharge: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Deals 33% of the damage dealt in recoil. 10% chance to lower the target's Speed.",
		isViable: true,
		name: "Terra Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		recoil: [33, 100],
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	thundercage: {
		inherit: true,
		category: "Physical",
		flags: {protect: 1, mirror: 1, contact: 1},
	},
	freezeshock: {
		num: 553,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		name: "Freeze Shock",
		shortDesc: "30% chance to paralyze the target.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	fusionbolt: {
		num: 559,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "If a Pokémon in the user's party has Fusion Flare; 1.3x power & 20% chance to burn.",
		name: "Fusion Bolt",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, move) {
			for (const ally of pokemon.side.pokemon) {
				if (!ally || ally.fainted) continue;
				for (const moveSlot of ally.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.id === 'fusionflare') continue;
					this.debug('double power');
					return this.chainModify(1.3);
				}
			}
		},
		secondary: {
			chance: 20,
			onHit(target, pokemon, move) {
				for (const ally of pokemon.side.pokemon) {
					if (!ally || ally.fainted) continue;
					for (const moveSlot of ally.moveSlots) {
						const move = this.dex.getMove(moveSlot.move);
						if (move.id === 'fusionflare') continue;
						target.trySetStatus('brn');
					}
				}
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	hiddenpowermiasmons: {
		num: 237,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		shortDesc: "Type varies on Memory, Plate, Type-Item or Berry.",
		name: "Hidden Power (Miasmons)",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			if (['insectplate', 'bugmemory', 'silverpowder', 'figyberry', 'comnberry', 'tangaberry', 'enigmaberry'].includes(item.id)) {
				move.type = 'Bug';
			}
			else if (['dreadplate', 'darkmemory', 'blackglasses', 'iapapaberry', 'spelonberry', 'colburberry', 'rowapberry', 'marangaberry'].includes(item.id)) {
				move.type = 'Dark';
			}
			else if (['dracoplate', 'dragonmemory', 'dragonfang', 'aguavberry', 'nomelberry', 'habanberry', 'jaboocaberry'].includes(item.id)) {
				move.type = 'Dragon';
			}
			else if (['zapplate', 'electricmemory', 'magnet', 'pechaberry', 'wepearberry', 'belueberry', 'wacanberry'].includes(item.id)) {
				move.type = 'Electric';
			}
			else if (['pixieplate', 'fairymemory', 'roseliberry', 'keeberry'].includes(item.id)) {
				move.type = 'Fairy';
			}
			else if (['flameplate', 'firememory', 'charcoal', 'cheriberry', 'blukberry', 'watmelberry', 'occaberry'].includes(item.id)) {
				move.type = 'Fire';
			}
			else if (['fistplate', 'fightingmemory', 'blackbelt', 'leppaberry', 'kelpsyberry', 'chopleberry', 'salacberry'].includes(item.id)) {
				move.type = 'Fighting';
			}
			else if (['skyplate', 'flyingmemory', 'sharpbeak', 'lumberry', 'grepaberry', 'cobaberry', 'lansatberry'].includes(item.id)) {
				move.type = 'Flying';
			}
			else if (['spookyplate', 'ghostmemory', 'spelltag', 'magoberry', 'rabutaberry', 'kasibberry', 'custapberry'].includes(item.id)) {
				move.type = 'Ghost';
			}
			else if (['meadowplate', 'grassmemory', 'miracleseed', 'rawstberry', 'pinapberry', 'rindoberry', 'liechiberry'].includes(item.id)) {
				move.type = 'Grass';
			}
			else if (['earthplate', 'groundmemory', 'softsand', 'persimberry', 'hondewberry', 'shucaberry', 'apicotberry'].includes(item.id)) {
				move.type = 'Ground';
			}
			else if (['icicleplate', 'icememory', 'nevermeltice', 'aspearberry', 'pomegberry', 'yacheberry', 'ganlonberry'].includes(item.id)) {
				move.type = 'Ice';
			}
			else if (['toxicplate', 'poisonmemory', 'poisonbarb', 'oranberry', 'qualotberry', 'kebiaberry', 'petayaberry'].includes(item.id)) {
				move.type = 'Poison';
			}
			else if (['mindplate', 'psychicmemory', 'twistedspoon', 'sitrusberry', 'tamatoberry', 'payapaberry', 'starfberry'].includes(item.id)) {
				move.type = 'Psychic';
			}
			else if (['stoneplate', 'rockmemory', 'hardstone', 'wikiberry', 'magostberry', 'chartiberry', 'micleberry'].includes(item.id)) {
				move.type = 'Rock';
			}
			else if (['ironplate', 'steelmemory', 'metalcoat', 'razzberry', 'pamtreberry', 'babiriberry'].includes(item.id)) {
				move.type = 'Steel';
			}
			else if (['splashplate', 'watermemory', 'mysticwater', 'chestoberry', 'nanabberry', 'durinberry', 'passhoberry'].includes(item.id)) {
				move.type = 'Water';
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Power", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	hypnosis: {
		inherit: true,
		onSourceModifyAccuracy(accuracy) {
			if (source.species.id !== 'lunatone') return;
			return accuracy = 70;
		},
	},
	return: {
		inherit: true,
		basePowerCallback(pokemon) {
			if (pokemon.species.id === 'lunatone') return;
			return Math.floor((pokemon.happiness * 10) / 25) || 1;
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'lunatone') {
				move.basePower = 90;
			}
		},
	},
	stompingtantrum: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'lunatone') {
				move.basePower = 80;
			}
		},
	},
	aurasphere: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'shedinja') {
				move.basePower = 90;
			}
		},
	},
	dreameatercfm: {
		num: 138,
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 1.5;
			return move.basePower;
		},
		category: "Special",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Dream Eater (CFM)",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {basePower: 140},
		contestType: "Clever",
	},
	drillruncfm: {
		num: 529,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "10% chance to lower the target's Defence by 1.",
		name: "Drill Run (CFM)",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, antiair: 1},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	furyswipes: {
		inherit: true,
		onSourceModifyAccuracy(accuracy) {
			if (source.species.id !== 'shedinja') return;
			return accuracy + 15;
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'shedinja') {
				move.basePower = 25;
			}
		},
	},
	gustcfm: {
		num: 16,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "Usually goes first.",
		cfmDesc: "Priority: +1",
		name: "Gust (CFM)",
		pp: 35,
		priority: 1,
		flags: {protect: 1, mirror: 1, distance: 1},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Clever",
	},
	leechlife: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'shedinja') {
				move.basePower = 75;
			}
		},
	},
	mudslapcfm: {
		num: 189,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		name: "Mud-Slap (CFM)",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, antiair: 1},
		secondary: {
			chance: 100,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Cute",
	},
	nightslash: {
		inherit: true,
		onSourceModifyAccuracy(accuracy) {
			if (source.species.id !== 'shedinja') return;
			return accuracy - 5;
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'shedinja') {
				move.basePower = 100;
			}
		},
	},
	phantomforcecfm: {
		num: 566,
		accuracy: true,
		basePower: 75,
		category: "Physical",
		shortDesc: "Breaks through Substitutes. Never misses",
		name: "Phantom Force (CFM)",
		pp: 10,
		priority: 0,
		flags: {contact: 1, mirror: 1, protect: 1, authentic: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 140},
		contestType: "Cool",
	},
	protect: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'shedinja') {
				move.type = 'Psychic';
			}
		},
	},
	restcfm: {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Sleeps for 2 turns to recover HP; Comatose: heal 50%.",
		name: "Rest (CFM)",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTry(source, target, move) {
			if (source.hp === source.maxhp) {
				this.add('-fail', source, 'heal');
				return null;
			}
			if (source.status === 'slp') return false;
			if (source.hasAbility(['insomnia', 'vitalspirit'])) {
				this.add('-fail', source, '[from] ability: ' + source.getAbility().name, '[of] ' + source);
				return null;
			}
			if (source.hasAbility('comatose'))
				move.heal = [1, 2];
		},
		onHit(target, source, move) {
			if (!target.hasAbility('comatose')) {
				if (!target.setStatus('slp', source, move)) return false;
				const timer = target.hasAbility('earlybird') ? 1 : 3;
				target.statusState.time = timer;
				this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
			}
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	sandattackcfm: {
		num: 28,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Sand Attack (CFM)",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			accuracy: -1,
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		zMove: {boost: {evasion: 1}},
		contestType: "Cute",
	},
	screech: {
		inherit: true,
		onSourceModifyAccuracy(accuracy) {
			if (source.species.id !== 'shedinja') return;
			return accuracy + 15;
		},
		onModifyMove(move, source, target) {
			if (source.species.id === 'shedinja') {
				move.pp = 15;
			}
		},
	},
	shadowball: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'shedinja') {
				move.basePower = 90;
				move.pp = 10;
			}
		},
	},
	shadowclawcfm: {
		num: 421,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "20% chance to lower foe's defense.",
		name: "Shadow Claw (CFM)",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Cool",
	},
	slashcfm: {
		num: 163,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Type varies based on the user's primary type.",
		name: "Slash (CFM)",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, omnitype: 1, antiair: 1},
		onModifyMove(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 175},
		contestType: "Cool",
	},
	sleeptalkcfm: {
		num: 214,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sleep Talk (CFM)",
		pp: 10,
		priority: 0,
		flags: {},
		sleepUsable: true,
		onTry(source) {
			return source.status === 'slp' || source.hasAbility('comatose');
		},
		onHit(pokemon) {
			const noSleepTalk = [
				'assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'rest', 'shelltrap', 'sketch', 'skyattack', 'sleeptalk', 'uproar',
			];
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const moveid = moveSlot.id;
				if (!moveid) continue;
				const move = this.dex.moves.get(moveid);
				if (noSleepTalk.includes(moveid) || move.flags['charge'] || (move.isZ && move.basePower !== 1)) {
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
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'crit2'},
		contestType: "Cute",
	},
	xscissor: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'shedinja') {
				move.basePower = 90;
				move.ignoreEvasion = true;
				move.ignoreDefensive = true;
			}
		},
	},
	solarbeamcfm: {
		num: 76,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "Base power is halved if weather is not harsh sunlight.",
		name: "Solar Beam (CFM)",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (!this.field.isWeather(['sunnyday', 'desolateland'])) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	clobbertackle: {
		num: -1,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Clobber Tackle NOT boosted');
				return move.basePower;
			}
			this.debug('Clobber Tackle damage boost');
			return move.basePower * 1.5;
		},
		category: "Physical",
		shortDesc: "1.5x power if user moves after the target.",
		name: "Clobber Tackle",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		type: "Rock",
	},
	flicker: {
		num: -1007,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Flicker",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfSwitch: true,
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Moonblast", target);
        },
		secondary: null,
		shortDesc: "The user switches out after using the move.",
		target: "normal",
		type: "Fairy",
	},
	borealshine: {
		num: -1002,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Boreal Shine",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Aurora Veil", target);
        },
		target: "self",
		shortDesc: "Raises the user's Atk, Def and Spe.",
		type: "Ice",
		contestType: "Beautiful",
	},
	maelstrom: {
		num: -1012,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Maelstrom",
		pp: 10,
		priority: -6,
		flags: {mirror: 1},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
		shortDesc: "Forces the target to switch to a random ally.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Whirlpool", target);
		},
	},
	thunderpunch: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'typhlosion') {
				move.basePower = 85;
			}
		},
	},
	firepunch: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'typhlosion') {
				move.basePower = 85;
			}
		},
	},
	solventshot: {
		num: -1030,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "10% chance to toxic. Super effective on Steel.",
		name: "Solvent Shot",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: {'Poison': true},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gunk Shot", target);
		},
		secondary: {
			chance: 10,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		zMove: {basePower: 140},
		contestType: "Beautiful",
	},
	shortcircuit: {
		num: -1035,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		shortDesc: "Lowers the user's Atk by 2.",
		name: "Short Circuit",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		self: {
			boosts: {
				atk: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	springtidestorm: {
		shortDesc: "10% chance to lower all target's stats.",
		num: -1005,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		name: "Springtide Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fairy Wind", target);
		},
		onTry(pokemon) {
			if (pokemon.species.baseSpecies === 'Enamorus-Therian') {
				return;
			}
			this.hint("Only a Pokemon whose form is Enamorus-Therian can use this move.");
			this.add('-fail', pokemon, 'move: Springtide Storm');
			return null;
		},
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
				def: -1,
				spa: -1,
				spd: -1,
				spe: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	dualchop: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.species.id === 'primeape') {
				move.basePower = 50;
			}
		},
	},
	bonemerangpgp: {
		num: 155,
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		shortDesc: "Hits 2 times in one turn. Hits airbone Pokemon.",
		name: "Bonemerang (PGP)",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bonemerang", target);
		},
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "normal",
		type: "Ground",
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	strengthpgp: {
		num: 70,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Super effective on Fighting. Removes Spikes and Toxic Spikes",
		name: "Strength (PGP)",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Strength", target);
		},
		onAfterHit(target, pokemon) {
			const sideConditions = ['spikes', 'toxicspikes'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Strength (PGP)', '[of] ' + pokemon);
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Strength (PGP)', '[of] ' + pokemon);
				}
			}
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fighting') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	cocoonfeeding: {
		num: 262,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cocoon Feeding",
		shortDesc: "User faints. Incoming Pokemon gains +1 Def and +1 SpDef.",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		onTryHit(pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		slotCondition: 'cocoonfeeding',
		condition: {
			onSwap(target) {
				this.boost({def: 1});
				this.boost({spd: 1});
				target.side.removeSlotCondition(target, 'cocoonfeeding');
			},
		},
		selfdestruct: "ifHit",
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'healreplacement'},
		contestType: "Tough",
	},
	feudalharpoon: {
		num: 830,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Feudal Harpoon",
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Tough",
	},
	banefulbladedance: {
		num: 1014,
		accuracy: true,
		basePower: 160,
		category: "Special",
		name: "Baneful Blade Dance",
		shortDesc: "Guarantees critical hits.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "odonagiumz",
		self: {
			onHit(source) {
				for (const pokemon of source.side.active) {
					pokemon.addVolatile('banefulbladedance');
				}
			},
		},
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Baneful Blade Dance');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 3;
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	breegullblaster: {
		num: 40054,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Varies in type based on the user's Sp. Atk IV. (Ice if odd, Fire if even)",
		id: "breegullblaster",
		name: "Breegull Blaster",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (!(pokemon.set.ivs['spa'] % 2)){
				move.type = 'Fire';
			} else {
				move.type = 'Ice';
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 120,
		contestType: "Clever",
	},
	shocktail: {
		num: -1000,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "The target gets paralyzed when they have positive stat changes.",
		name: "Shock Tail",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", target);
			this.add('-anim', source, "Iron Tail", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source) {
				if (target.positiveBoosts()) {
					target.trySetStatus('par', source);
				}
			},
		},
		target: "normal",
		type: "Electric",
	},
};
