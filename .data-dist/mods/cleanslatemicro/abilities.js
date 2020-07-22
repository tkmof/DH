"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const BattleAbilities = {
	"flowergift": {
		inherit: true,
		onAllyModifyAtk: function (atk) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpD: function (spd) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
	},
}; exports.BattleAbilities = BattleAbilities;
