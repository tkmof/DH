export const Pokedex: {[speciesid: string]: SpeciesData} = {
	alakazam: {
		inherit: true,
		baseStats: {hp: 80, atk: 50, def: 50, spa: 110, spd: 110, spe: 110},
		abilities: {0: "Galaxy Brain", 1: "Inner Focus", H: "Trace"},
	},
   gengar: {
		inherit: true,
		types: ["Ghost", "Ice"],
		baseStats: {hp: 65, atk: 65, def: 65, spa: 100, spd: 90, spe: 115},
		abilities: {0: "Blackout"},
	},
	dragonite: {
		inherit: true,
		baseStats: {hp: 91, atk: 134, def: 95, spa: 95, spd: 84, spe: 101},
		abilities: {0: "Lifeguard", H: "Marvel Scale"},
	},
	venusaur: {
		inherit: true,
		types: ["Grass", "Fairy"],
		baseStats: {hp: 80, atk: 66, def: 98, spa: 111, spd: 100, spe: 70},
		abilities: {0: "Overgrow", H: "Misty Surge"},
	},
	charizard: {
		inherit: true,
		types: ["Fire", "Dark"],
		baseStats: {hp: 68, atk: 120, def: 89, spa: 60, spd: 87, spe: 109},
		abilities: {0: "Blaze", H: "Levitate"},
	},
	blastoise: {
		inherit: true,
		types: ["Water", "Electric"],
		baseStats: {hp: 79, atk: 53, def: 100, spa: 105, spd: 105, spe: 88},
		abilities: {0: "Torrent", H: "Motor Drive"},
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 40, spa: 35, spd: 94, spe: 116},
		abilities: {0: "Poison Touch", H: "Speed Boost"},
	},
	pidgeot: {
		inherit: true,
		types: ["Flying"],
		baseStats: {hp: 83, atk: 100, def: 75, spa: 50, spd: 70, spe: 112},
		abilities: {0: "Keen Eye", 1: "Tangled Feet", H: "Wings of Victory"},
	},
	onix: {
		inherit: true,
		baseStats: {hp: 75, atk: 135, def: 140, spa: 30, spd: 75, spe: 70},
		abilities: {0: "Sturdy", 1: "Solid Rock", H: "Excavate"},
   },
};
