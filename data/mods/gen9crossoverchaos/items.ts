export const Items: {[itemid: string]: ModdedItemData} = {
	dededesmask: {
		name: "Dedede's Mask",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 2) || pokemon.baseSpecies.num === 2) {
				return false;
			}
			return true;
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		forcedForme: "Masked Dedede",
		itemUser: ["Masked Dedede"],
		num: -1,
		gen: 9,
		desc: "If held by King Dedede, this item changes its forme to Masked Dedede. Holder is immune to flinching.", 
	},
	dracocentauriumz: {
		name: "Dracocentaurium Z",
		desc: "If held by a Draco Centauros with Draco Burning, it can use Great Fire.", 
		spritenum: 632,
		onTakeItem: false,
		zMove: "Great Fire",
		zMoveFrom: "Draco Burning",
		itemUser: ["Draco Centauros"],
		num: -2,
		gen: 9,
	},
	wriggliumz: {
		name: "Wrigglium Z",
		desc: "If held by a Wriggle Nightbug with Centipede Assault, it can use Luciola Cruciata.", 
		spritenum: 632,
		onTakeItem: false,
		zMove: "Luciola Cruciata",
		zMoveFrom: "Centipede Assault",
		itemUser: ["Wriggle Nightbug-Altered"],
		num: -3,
		gen: 9,
	},
};
