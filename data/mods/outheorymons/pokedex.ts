export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	tinkaton: {
		inherit: true,
		baseStats: {hp: 85, atk: 95, def: 77, spa: 70, spd: 105, spe: 94},
	},
	salamence: {
		inherit: true,
		baseStats: {hp: 115, atk: 135, def: 80, spa: 110, spd: 80, spe: 100},
	},
	electrodehisui: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Magic Guard", H: "Aftermath"},
	},
};
