export const Items: {[itemid: string]: ModdedItemData} = {
	altarianite: {
		name: "Altarianite",
		spritenum: 615,
		megaStone: "Muktaria-Alola-Mega",
		megaEvolves: "Muktaria-Alola",
		itemUser: ["Muktaria-Alola"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 755,
		desc: "If held by an Alolan Muktaria, this item allows it to Mega Evolve in battle.",
	},
	metagrossite: {
		name: "Metagrossite",
		spritenum: 618,
		megaStone: "Iron Meta-Mega",
		megaEvolves: "Iron Meta",
		itemUser: ["Iron Meta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 758,
		desc: "If held by an Iron Meta, this item allows it to Mega Evolve in battle.",
	},
	boosterenergy: {
		name: "Booster Energy",
		spritenum: 0, // TODO
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;

			if (!this.field.isWeather('sunnyday')) {
				for (const proto of ['protosynthesis', 'onceuponatime', 'primitive', 'openingact', 'weightoflife']) { 
					if (pokemon.hasAbility(proto)) {
						if (!pokemon.volatiles[proto] /* && !this.field.isWeather('sunnyday') */ && pokemon.useItem()) {
							pokemon.addVolatile(proto);
						}
						return;
					}
				}
			}
			if (!this.field.isTerrain('electricterrain')) {
				for (const quark of ['quarkdrive', 'lightdrive', 'quarksurge', 'nanorepairs', 'circuitbreaker']) { 
					if (pokemon.hasAbility(quark)) {
						if (!pokemon.volatiles[quark] && pokemon.useItem()) {
							pokemon.addVolatile(quark);
						}
						return;
					}
				}
			}
			if (pokemon.hasAbility('systempurge') && !pokemon.volatiles['systempurge'] && pokemon.useItem()) {
				pokemon.addVolatile('systempurge');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		gen: 9,
	},
	absolite: {
		name: "Absolite",
		spritenum: 576,
		megaStone: "Sol Valiant-Mega",
		megaEvolves: "Sol Valiant",
		itemUser: ["Sol Valiant"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 677,
		desc: "If held by a Sol Valiant, this item allows it to Mega Evolve in battle.",
	},
	garchompite: {
		name: "Garchompite",
		spritenum: 589,
		megaStone: "Garpyuku-Mega",
		megaEvolves: "Garpyuku",
		itemUser: ["Garpyuku"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 683,
		desc: "If held by a Garpyuku, this item allows it to Mega Evolve in battle.",
	},
	gengarite: {
		name: "Gengarite",
		spritenum: 588,
		megaStone: "Crygargonal-Mega",
		megaEvolves: "Crygargonal",
		itemUser: ["Crygargonal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 656,
		desc: "If held by a Crygargonal, this item allows it to Mega Evolve in battle.",
	},
	ampharosite: {
		name: "Ampharosite",
		spritenum: 580,
		megaStone: "Amphamence-Mega-Y",
		megaEvolves: "Amphamence",
		itemUser: ["Amphamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 658,
		desc: "If held by an Amphamence, this item allows it to Mega Evolve in battle.",
	},
	salamencite: {
		name: "Salamencite",
		spritenum: 627,
		megaStone: "Amphamence-Mega-X",
		megaEvolves: "Amphamence",
		itemUser: ["Amphamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 769,
		desc: "If held by an Amphamence, this item allows it to Mega Evolve in battle.",
	},
};
