export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
   venusaur: {
	  	inherit: true,
      baseStats: {hp: 95, atk: 82, def: 83, spa: 100, spd: 100, spe: 80},
   }, 
   venusaurmega: {
      inherit: true, 
      baseStats: {hp: 95, atk: 100, def: 123, spa: 122, spd: 120, spe: 80},
   },
   charizard: {
		  inherit: true,
      baseStats: {hp: 78, atk: 84, def: 78, spa: 115, spd: 85, spe: 100},
      abilities: {0: "Blaze", H: "Sheer Force"}
   }, 
   charizardmegax: {
	   inherit: true,
      baseStats: {hp: 78, atk: 130, def: 117, spa: 130, spd: 85, spe: 100},
   },
   charizardmegay: {
	   inherit: true,
      baseStats: {hp: 78, atk: 104, def: 78, spa: 165, spd: 115, spe: 100},
	},
	blastoise: {
      inherit: true
		baseStats: {hp: 79, atk: 83, def: 100, spa: 95, spd: 105, spe: 78}
