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
			if (user.baseSpecies.baseSpecies === 'Vulcdor') {
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
}