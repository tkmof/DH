'use strict';
exports.BattleAbilities = {
	"hardhooves": {
		shortDesc: "This Pokemon's contact moves have their power multiplied by 1.3.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "hardhooves",
		name: "Hard Hooves",
		rating: 3.5,
		num: 100001,
	},
	"gravitate": {
		shortDesc: "On switch-in, this Pokemon summons Grassy Terrain.",
		onStart(source) {
			this.field.addPseudoWeather('gravity');
		},
		id: "gravitate",
		name: "Gravitate",
		rating: 4,
		num: 100002,
	},
	"ninelives": {
		desc: "If this Pokemon is knocked out with a contact move, that move's user loses 1/4 of its maximum HP, rounded down. If any active Pokemon has the Damp Ability, this effect is prevented.",
		shortDesc: "If this Pokemon is KOed with a contact move, that move's user loses 1/4 its max HP.",
		id: "ninelives",
		name: "Nine Lives",
		onAfterDamageOrder: 1,
		onAfterDamage(damage, target, source, move) {
			if (source && source !== target && !target.hp) {
				source.side.addSideCondition('lunardance')
			}
		},
		rating: 2.5,
		num: 100003,
	},
	"wonderous": {
		shortDesc: "On switch-in, this Pokemon summons Grassy Terrain.",
		onStart(source) {
			this.field.addPseudoWeather('wonderroom');
		},
		id: "wonderous",
		name: "Wonderous",
		rating: 4,
		num: 100004,
	},
};
