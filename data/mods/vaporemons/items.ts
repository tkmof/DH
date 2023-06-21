export const Items: {[k: string]: ModdedItemData} = {
	//---------Gen 9 Items----------//
	abilityshield: {
		name: "Ability Shield",
		spritenum: 0, // TODO
		ignoreKlutz: true,
		// Neutralizing Gas protection implemented in Pokemon.ignoringAbility() within sim/pokemon.ts
		// and in Neutralizing Gas itself within data/abilities.ts
		onSetAbility(ability, target, source, effect) {
			if (effect && effect.effectType === 'Ability' && effect.name !== 'Trace') {
				this.add('-ability', source, effect);
			}
			this.add('-block', target, 'item: Ability Shield');
			return null;
		},
		// Mold Breaker protection implemented in Battle.suppressingAbility() within sim/battle.ts
		num: 1881,
		desc: "Holder's Ability cannot be changed by any effect.",
		gen: 9,
	},
	clearamulet: {
		name: "Clear Amulet",
		spritenum: 0, // TODO
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add('-fail', target, 'unboost', '[from] item: Clear Amulet', '[of] ' + target);
			}
		},
		num: 1882,
		desc: "Prevents other Pokemon from lowering the holder's stat stages.",
		gen: 9,
	},
	mirrorherb: {
		name: "Mirror Herb",
		fling: {
			basePower: 10,
		},
		spritenum: 0, // TODO
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			const boostPlus: SparseBoostsTable = {};
			let statsRaised = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boostPlus[i] = boost[i];
					statsRaised = true;
				}
			}
			if (!statsRaised) return;
			const pokemon: Pokemon = this.effectData.target;
			pokemon.useItem();
			this.boost(boostPlus, pokemon);
		},
		num: 1883,
		desc: "When an opposing Pokemon raises a stat stage, the holder copies it. Single use.",
		gen: 9,
	},
	punchingglove: {
		name: "Punching Glove",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify([4506, 4096]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['punch']) delete move.flags['contact'];
		},
		num: 1884,
		desc: "Holder's punch-based attacks have 1.1x power and do not make contact.",
		gen: 9,
	},
	covertcloak: {
		name: "Covert Cloak",
		fling: {
			basePower: 10,
		},
		spritenum: 0, // TODO
		onModifySecondaries(secondaries) {
			this.debug('Covert Cloak prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		num: 1885,
		desc: "Holder is not affected by the secondary effect of another Pokemon's attack.",
		gen: 9,
	},
	loadeddice: {
		name: "Loaded Dice",
		spritenum: 0, // TODO
		// partially implemented in sim/battle-actions.ts:BattleActions#hitStepMoveHitLoop
		onModifyMove(move) {
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		num: 1886,
		desc: "Holder's moves that hit 2-5 times hit 4-5 times; Population Bomb hits 4-10 times.",
		gen: 9,
	},
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 0, // TODO
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (pokemon.hasAbility('protosynthesis') && !pokemon.volatiles['protosynthesis'] && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('quarkdrive') && !pokemon.volatiles['quarkdrive'] && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.addVolatile('quarkdrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		desc: "Activates the Protosynthesis or Quark Drive Abilities. Single use.",
		gen: 9,
	},

// new stuff
	bigroot: {
		name: "Big Root",
		spritenum: 29,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['heal'] || move.id === 'bitterblade') {
				this.debug('Punching Glove boost');
				return this.chainModify([0x14CC, 0x1000]);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([0x14CC, 0x1000]);
			}
		},
		num: 296,
		desc: "Damaging draining moves deal 30% more damage, status draining moves heal 30% more.",
		gen: 4,
	},
	terashard: {
		name: "Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.hpType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???' && pokemon.getTypes().join() !== type) {
				if (!pokemon.setType(type)) return;
				this.add('-start', pokemon, 'typechange', type, '[from] item: Tera Shard');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Tera Shard');
				return null;
			}
		},
		num: -1000,
		gen: 8,
		desc: "Holder becomes its Tera Type on switch-in.",
	},	
	seginstarshard: {
		name: "Segin Star Shard",
		spritenum: 658,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Segin Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-start', pokemon, 'typechange', 'Dark');
				this.add('-message', `${pokemon.name}'s Segin Star Shard changed its type!`);
				pokemon.setAbility('intimidate', pokemon, true);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Revavroom' && (move.type === 'Dark' || move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Segin Star Shard');
				return null;
			}
		},
		itemUser: ["Revavroom"],
		num: -1001,
		gen: 8,
		desc: "Revavroom: Becomes Dark-type, Ability: Intimidate, 1.2x Dark/Poison/Steel power.",
	},	
	schedarstarshard: {
		name: "Schedar Star Shard",
		spritenum: 658,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Schedar Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-start', pokemon, 'typechange', 'Fire');
				this.add('-message', `${pokemon.name}'s Schedar Star Shard changed its type!`);
				pokemon.setAbility('speedboost', pokemon, true);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Revavroom' && (move.type === 'Fire' || move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Schedar Star Shard');
				return null;
			}
		},
		itemUser: ["Revavroom"],
		num: -1002,
		gen: 8,
		desc: "Revavroom: Becomes Fire-type, Ability: Speed Boost, 1.2x Fire/Poison/Steel power.",
	},	
	navistarshard: {
		name: "Navi Star Shard",
		spritenum: 658,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Navi Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-start', pokemon, 'typechange', 'Poison');
				this.add('-message', `${pokemon.name}'s Navi Star Shard changed its type!`);
				pokemon.setAbility('toxicdebris', pokemon, true);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Revavroom' && (move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Navi Star Shard');
				return null;
			}
		},
		itemUser: ["Revavroom"],
		num: -1003,
		gen: 8,
		desc: "Revavroom: Becomes Poison-type, Ability: Toxic Debris, 1.2x Poison/Steel power.",
	},	
	ruchbahstarshard: {
		name: "Ruchbah Star Shard",
		spritenum: 658,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Ruchbah Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-start', pokemon, 'typechange', 'Fairy');
				this.add('-message', `${pokemon.name}'s Ruchbah Star Shard changed its type!`);
				pokemon.setAbility('mistysurge', pokemon, true);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Revavroom' && (move.type === 'Fairy' || move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Ruchbah Star Shard');
				return null;
			}
		},
		itemUser: ["Revavroom"],
		num: -1004,
		gen: 8,
		desc: "Revavroom: Becomes Fairy-type, Ability: Misty Surge, 1.2x Fairy/Poison/Steel power.",
	},	
	caphstarshard: {
		name: "Caph Star Shard",
		spritenum: 658,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Revavroom') return false;
			return true;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Revavroom') {			
				this.add('-item', pokemon, 'Caph Star Shard');
				this.add('-anim', pokemon, "Cosmic Power", pokemon);
				this.add('-start', pokemon, 'typechange', 'Fighting');
				this.add('-message', `${pokemon.name}'s Caph Star Shard changed its type!`);
				pokemon.setAbility('stamina', pokemon, true);
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && user.baseSpecies.name === 'Revavroom' && (move.type === 'Fighting' || move.type === 'Steel' || move.type === 'Poison')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Caph Star Shard');
				return null;
			}
		},
		itemUser: ["Revavroom"],
		num: -1005,
		gen: 8,
		desc: "Revavroom: Becomes Fighting-type, Ability: Stamina, 1.2x Fighting/Poison/Steel power.",
	},	
	tuffytuff: {
		name: "Tuffy-Tuff",
		spritenum: 251,
		fling: {
			basePower: 10,
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Igglybuff' || source.baseSpecies.baseSpecies === 'Jigglypuff' || source.baseSpecies.baseSpecies === 'Wigglytuff') return false;
			return true;
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Igglybuff' || pokemon.baseSpecies.baseSpecies === 'Jigglypuff' || pokemon.baseSpecies.baseSpecies === 'Wigglytuff') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Igglybuff' || pokemon.baseSpecies.baseSpecies === 'Jigglypuff' || pokemon.baseSpecies.baseSpecies === 'Wigglytuff') {
				return this.chainModify(2);
			}
		},
		desc: "Igglybuff line: 2x Defense & Special Defense.",
		itemUser: ["Igglybuff", "Jigglypuff", "Wigglytuff"],
		num: -1006,
		gen: 8,
	},
};
