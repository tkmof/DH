export const Pokedex: {[speciesid: string]: SpeciesData} = {
	pollutron: {
		num: 1,
		name: "Pollutron",
		types: ["Poison", "Electric"],
		baseStats: {hp: 90, atk: 65, def: 120, spa: 85, spd: 70, spe: 60},
		abilities: {0: "Levitate", 1: "Poison Point", H: "Corrosion"},
	},
	paleocust: {
		num: 2,
		name: "Paleocust",
		types: ["Bug", "Rock"],
		baseStats: {hp: 75, atk: 130, def: 91, spa: 42, spd: 92, spe: 90},
		abilities: {0: "Prankster", 1: "Compound Eyes", H: "Swarm"},
	},
	cryolith: {
		num: 3,
		name: "Cryolith",
		types: ["Ice", "Rock"],
		baseStats: {hp: 70, atk: 110, def: 70, spa: 100, spd: 70, spe: 110},
		abilities: {0: "Purifying Salt", 1: "Levitate", H: "Flash Fire"},
	},
};