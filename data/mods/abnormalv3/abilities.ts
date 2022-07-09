export const Abilities: {[k: string]: ModdedAbilityData} = {
 
normalize: {
    desc: "This Pokemon's moves are changed to match its primery type and have their power multiplied by 1.2. This effect comes before other effects that change a move's type.",
    shortDesc: "This Pokemon's moves are changed to match its primary type and have 1.2x power.",
    onModifyType(move, pokemon) {
      if (!(move.isZ && move.category !== 'Status') && !['hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'weatherball'].includes(move.id)) {
        move.type = pokemon.types[0];
        move.normalizeBoosted = true;
      }
    },
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.normalizeBoosted) return this.chainModify([0x1333, 0x1000]);
		},
	name: "Normalize",
	rating: 0,
	num: 96,
  },
  aerilate: {
    desc: "This Pokemon's contact and sound moves become Flying-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc: "This Pokemon's contact/sound moves become Flying type and have 1.2x power.",
    onModifyType(move, pokemon) {
      if ((move.flags['contact'] || move.flags['sound']) && move.id !== 'multiattack' && !(move.isZ && move.category !== 'Status')) {
        move.type = 'Flying';
        move.aerilateBoosted = true;
      }
    },
	onBasePowerPriority: 23,
	onBasePower(basePower, pokemon, target, move) {
		if (move.aerilateBoosted) return this.chainModify([0x1333, 0x1000]);
	},
	name: "Aerilate",
	rating: 4,
	num: 185,
  },
  refrigerate: {
    desc: "This Pokemon's contact and sound moves become Ice-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc: "This Pokemon's contact/sound moves become Ice type and have 1.2x power.",
    onModifyType(move, pokemon) {
      if ((move.flags['contact'] || move.flags['sound']) && move.id !== 'multiattack' && !(move.isZ && move.category !== 'Status')) {
        move.type = 'Ice';
        move.refrigerateBoosted = true;
      }
    },
	onBasePowerPriority: 23,
	onBasePower(basePower, pokemon, target, move) {
		if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
	},
	name: "Refrigerate",
	rating: 4,
	num: 174,
  },
  pixilate: {
    desc: "This Pokemon's contact and sound moves become Fairy-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc: "This Pokemon's contact/sound moves become Fairy type and have 1.2x power.",
    onModifyType(move, pokemon) {
      if ((move.flags['contact'] || move.flags['sound']) && move.id !== 'multiattack' && !(move.isZ && move.category !== 'Status')) {
        move.type = 'Fairy';
        move.pixilateBoosted = true;
      }
    },
	onBasePowerPriority: 23,
	onBasePower(basePower, pokemon, target, move) {
		if (move.pixilateBoosted) return this.chainModify([0x1333, 0x1000]);
	},
	name: "Pixilate",
	rating: 4,
	num: 182,
  },
  galvanize: {
    desc: "This Pokemon's contact and sound moves become Electric-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
    shortDesc: "This Pokemon's contact/sound moves become Electric type and have 1.2x power.",
    onModifyType(move, pokemon) {
      if ((move.flags['contact'] || move.flags['sound']) && move.id !== 'multiattack' && !(move.isZ && move.category !== 'Status')) {
        move.type = 'Electric';
        move.galvanizeBoosted = true;
      }
    },
	onBasePowerPriority: 23,
	onBasePower(basePower, pokemon, target, move) {
		if (move.galvanizeBoosted) return this.chainModify([0x1333, 0x1000]);
	},
	name: "Galvanize",
	rating: 4,
	num: 206,
  },
  scrappy: {
    desc: "This Pokemon can hit Ghost types with Fighting-type moves. Immune to Intimidate.",
    shortDesc: "Fighting moves hit Ghost. Immune to Intimidate.",
    onModifyMove(move) {
      if (!move.ignoreImmunity) move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity['Fighting'] = true;
      }
    },
	onBoost(boost, target, source, effect) {
		if (effect.id === 'intimidate') {
			delete boost.atk;
			this.add('-immune', target, '[from] ability: Scrappy');
		}
	},
	name: "Scrappy",
	rating: 3,
	num: 113,
  },
};
