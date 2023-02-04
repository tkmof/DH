export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	managate: {
		desc: "When using a Psychic-type move, this Pokémon moves last among Pokémon using the same or greater priority moves, then switches out to a chosen ally.",
		shortDesc: "Psychic moves: move last in priority bracket, pivot the user out.",
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === "Status" && move.type === "Psychic") return -0.1;
		},
		onModifyMove(move) {
			if (move.category === "Status" && move.type === "Psychic" && !move.selfSwitch) move.selfSwitch = true;
		},
		name: "Mana Gate",
		rating: 3,
		num: -1001,
	},
	partialeclipse: {
		desc: "Causes all adjacent Pokémon to lose 1/8 of their maximum HP, rounded down, at the end of each turn if this Pokémon has 1/2 or less of its maximum HP.",
		shortDesc: "When HP is 1/2 or less, adjacent Pokémon lose 1/8 of their max HP each turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.hp || pokemon.hp > pokemon.maxhp / 2) return;
			for (const target of pokemon.side.foe.active) {
				if (target && target.hp) this.damage(target.baseMaxhp / 8, target, pokemon);
			}
		},
		name: "Partial Eclipse",
		rating: 3,
		num: -1002,
	},
};
