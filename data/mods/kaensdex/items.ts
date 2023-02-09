export const Items: {[itemid: string]: ItemData} = {
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