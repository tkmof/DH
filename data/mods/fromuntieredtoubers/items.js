'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
	"persianiumz": {
		id: "persianiumz",
		name: "Persianium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "Lingering Surround",
		zMoveFrom: "Lingering Blast",
		zMoveUser: ["Persian"],
		num: -2,
		gen: 7,
		desc: "If held by a Persian with Lingering Blast, it can use Lingering Surround.",
	},
	"simisagiumz": {
		id: "simisagiumz",
		name: "Simisagium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "Nature's Guardian",
		zMoveFrom: "Leaf Storm",
		zMoveUser: ["Persian"],
		num: -2,
		gen: 7,
		desc: "If held by a Simisage with Leaf Storm, it can use Nature's Guardian.",
	},
};

exports.BattleItems = BattleItems;
