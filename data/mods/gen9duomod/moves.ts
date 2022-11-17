export const Moves: {[moveid: string]: MoveData} = {
  blueshell: {
		num: 9001,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Blue Shell",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
    onModifyMove(move, source, target) {
      const userSide = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
      const targetSide = target.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
			if (userSide.length < targetSide.length) {move.basePower = 140;}
      else {move.basePower = 70;}
    },
		secondary: null,
		target: "allAdjacent",
		type: "Ground",
		zMove: {basePower: 140},
		maxMove: {basePower: 140},
		contestType: "Tough",
  },



};
