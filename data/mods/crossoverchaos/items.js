'use strict';

exports.BattleItems = {
    "shulkiumz": {
        id: "shulkiumz",
        name: "Shulkium Z",
        onTakeItem: false,
        zMove: "Monado Buster",
        zMoveFrom: "Sacred Sword",
        zMoveUser: ["Shulk"],
        desc: "If held by Shulk with Sacred Sword, he can use Monado Buster.",
    },
	 "christmasspirit": { 
		  id: "christmasspirit",
		  name: "Christmas Spirit",
		  spritenum: "184",
		  megaStone: "Smolitzer-Mega",
		  megaEvolves: "Smolitzer",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by the Smolitzer, this item allows it to Mega Evolve in battle."
	 },
    "siivagunniumz": {
        id: "siivagunniumz",
        name: "SiIvaGunniumZ",
        onTakeItem: false,
        zMove: "Stone Halation",
        zMoveFrom: "Snow Halation",
        zMoveUser: ["SiIvaGunner"],
        desc: "If held by SiIvaGunner with Snow Halation, he can use Stone Halation.",
    },
	 "chaosemeralds": { 
		  id: "chaosemeralds",
		  name: "Chaos Emeralds",
		  megaStone: "Sonic-Super",
		  megaEvolves: "Sonic",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Sonic, this item allows him to become Super Sonic in battle."
	 },
    "zeromiumz": {
        id: "zeromiumz",
        name: "Zeromium Z",
        onTakeItem: false,
        zMove: "Big Bang",
        zMoveFrom: "Thunder",
        zMoveUser: ["True Zeromus"],
        desc: "If held by True Zeromus with Thunder, he can use Big Bang.",
    },
    "galeemiumz": {
        id: "galeemiumz",
        name: "Galeemium Z",
        onTakeItem: false,
        zMove: "Spear of Light",
        zMoveFrom: "Angelic Flare",
        zMoveUser: ["Galeem"],
        desc: "If held by Galeem with Angelic Flare, it can use Spear of Light.",
    },
    "dharkoniumz": {
        id: "dharkoniumz",
        name: "Dharkonium Z",
        onTakeItem: false,
        zMove: "Hammer of Darkness",
        zMoveFrom: "Demonic Rend",
        zMoveUser: ["Dharkon"],
        desc: "If held by Dharkon with Demonic Rend, it can use Hammer of Darkness.",
    },
};