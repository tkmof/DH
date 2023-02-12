export const Items: {[itemid: string]: ItemData} = {
magicwood: {
		name: "Magic Wood",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Jaklove') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Jaklove"],
		num: 100000,
		gen: 2,
		desc: "If held by a Jaklove, its Defense is doubled."
	},
	
	volcanicrock: {
		name: "Volcanic Rock",
		spritenum: 438,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				if (pokemon.baseSpecies.baseSpecies === 'Vulcdor') {
					this.heal(pokemon.lastDamage / 2, pokemon);
				}				
			}
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Vulcdor') {
				return this.chainModify(1.2);
			}
		},
		itemUser: ["Vulcdor"],
		num: 100001,
		gen: 3,
		desc: "If held by a Vulcdor, gains 50% drain and 1.2x power."
	},

cookies: {
		name: "Cookies",
		spritenum: 242,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			if (pokemon.baseSpecies.baseSpecies === 'Donter') {
				this.heal(pokemon.baseMaxhp / 8);
			}			
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			if (pokemon.baseSpecies.baseSpecies === 'Donter') {
				this.heal(pokemon.baseMaxhp / 8);
			}		
		},
		itemUser: ["Donter"],
		num: 100002,
		gen: 2,
		desc: "If held by a Donter, is healed by 1/8 of its max HP each turn.",
	},
	
toysword: {
		name: "Toy Sword",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Toknight') {
				return this.chainModify(1.7);
			}
		},
		itemUser: ["Toknight"],
		num: 100003,
		gen: 2,
		desc: "If held by a Toknight, it gains 1.7x Attack.",
	},
abomigorite: {
		name: "Abomigorite",
		spritenum: 575,
		megaStone: "Abomigo-Mega",
		megaEvolves: "Abomigo",
		itemUser: ["Abomigo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Abomigo, this item allows it to Mega Evolve in battle.",
	},
	
	vizcarite: {
		name: "Vizcarite",
		spritenum: 596,
		megaStone: "Vizcachu-Mega",
		megaEvolves: "Vizcachu",
		itemUser: ["Vizcachu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Vizcachu, this item allows it to Mega Evolve in battle.",
	},
	
	porcusrite: {
		name: "Porcusrite",
		spritenum: 576,
		megaStone: "Porcusquill-Mega",
		megaEvolves: "Porcusquill",
		itemUser: ["Porcusquill"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Porcusquill, this item allows it to Mega Evolve in battle.",
	},
	
	grussgurite: {
		name: "Grussgurite",
		spritenum: 608,
		megaStone: "Grussgu-Mega",
		megaEvolves: "Grussgu",
		itemUser: ["Grussgu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Grussgu, this item allows it to Mega Evolve in battle.",
	},
	
	crobatite: {
		name: "Crobatite",
		spritenum: 608,
		megaStone: "Crobat-Mega",
		megaEvolves: "Crobat",
		itemUser: ["Crobat"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Crobat, this item allows it to Mega Evolve in battle.",
	},

//gen9 stuff
	
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
		gen: 8,
		desc: "Prevents other Pokemon from lowering the holder's stat stages.",
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
		gen: 8,
		desc: "Holder is not affected by the secondary effect of another Pokemon's attack.",
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
			const pokemon: Pokemon = this.effectState.target;
			pokemon.useItem();
			this.boost(boostPlus, pokemon);
		},
		num: 1883,
		gen: 8,
		desc: "When an opposing Pokemon raises a stat stage, the holder copies it. Single use.",
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
		gen: 8,
		desc: "Holder's punch-based attacks have 1.1x power and do not make contact.",
	},
}