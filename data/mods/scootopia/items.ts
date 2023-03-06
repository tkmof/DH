export const Items: {[itemid: string]: ItemData} = {
	crystalorb: {
		name: "Crystal Orb",
		num: 1001,
		desc: "The holder's secondary type is replaced with Crystal. 20% boost to Crystal attacks.",
		onStart(pokemon) {
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser !== pokemon.id) return false;
			if (pokemon.hasType('Crystal')) return false;
			if (!pokemon.addType('Crystal')) return false;
			pokemon.setType([pokemon.types[0],"Crystal"]);
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			pokemon.side.usedSuperType = true;
			pokemon.side.superTypeUser = pokemon.id;
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1130) || pokemon.baseSpecies.num === 1130) {
				return false;
			}
			return true;
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Crystal') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: 275,
		gen: 8,
	},
	feralorb: {
		name: "Feral Orb",
		num: 1001,
		desc: "The holder's secondary type is replaced with Feral. 20% boost to Feral attacks.",
		onStart(pokemon) {
			if (pokemon.side.usedSuperType && pokemon.side.superTypeUser !== pokemon.id) return false;
			if (pokemon.hasType('Feral')) return false;
			if (!pokemon.addType('Feral')) return false;
			pokemon.setType([pokemon.types[0],"Feral"]);
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			pokemon.side.usedSuperType = true;
			pokemon.side.superTypeUser = pokemon.id;
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1130) || pokemon.baseSpecies.num === 1130) {
				return false;
			}
			return true;
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Feral') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		num: 275,
		gen: 8,
	},
};