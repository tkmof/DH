'use strict';

let BattleFormats = {
	abilityclause: {
		effectType: 'ValidatorRule',
		name: 'Ability Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon with the same ability",
		onBegin() {
			this.add('rule', 'Ability Clause: Limit one of each Pokémon');
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			let abilityTable = [];
			for (const set of team) {
				if (!abilityTable.includes( set.ability )){
					abilityTable.push( set.ability );
				}
				else {
					return [`You have two pokemon with the ability ${set.ability}.`];
				}
			}
		},
	},
};

exports.BattleFormats = BattleFormats;
