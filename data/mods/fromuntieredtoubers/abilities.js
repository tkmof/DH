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
		shortDesc: "On switch-in, this Pokemon summons Wonder Room.",
		onStart(source) {
			this.field.addPseudoWeather('wonderroom');
		},
		id: "wonderous",
		name: "Wonderous",
		rating: 4,
		num: 100004,
	},
	"arachnophobia": {
		desc: "On switch-in, this Pokemon lowers the Defense of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Defense of adjacent opponents by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Arachnophobia', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({def: -1}, target, pokemon);
				}
			}
		},
		id: "arachnophobia",
		name: "Arachnophobia",
		rating: 3.5,
		num: 100005,
	},
	"armoredplates": {
		desc: "This Pokemon receives 3/4 damage from contact moves.",
		shortDesc: "This Pokemon takes 3/4 damage from contact moves.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.flags['contact']) mod = .75;
			return this.chainModify(mod);
		},
		id: "armoredplates",
		name: "Armored Plates",
		rating: 2.5,
		num: 100006,
	},
	"blazingflames": {
		shortDesc: "This Pokemon's moves have their burn chance doubled.",
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
		},
		id: "blazingflames",
		name: "Blazing Flames",
		rating: 4,
		num: 100007,
	},
	"flightrisk": {
		desc: ".",
		shortDesc: ".",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source 
				&& move.category !== 'Status' 
				&& move.type == "Flying") 
			{
				this.boost({def: -1}, target, pokemon);
			}
		},
		id: "flightrisk",
		name: "Flight Risk",
		rating: 1.5,
		num: 100008,
	},
	"foambath" : {
		shortDesc: "If Rain Dance is active, this Pokemon's Def and SpA are boosted by 50%.",
		onModifyDef(def, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpa(spa, pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(1.5);
			}
		},
		id: "foambath",
		name: "Foam Bath",
		rating: 3,
		num: 100009,
	},
	"grouping": {
		desc: "If this Pokemon is an Aegislash, it changes to Blade Forme before attempting to use an attacking move, and changes to Shield Forme before attempting to use King's Shield.",
		shortDesc: "If Aegislash, changes Forme to Blade before attacks and Shield before King's Shield.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Wishiwashi' || attacker.transformed) return;
			let targetSpecies = (move.category === 'Status' ? 'Wishiwashi' : 'Wishiwashi-School');
			if (attacker.template.species !== targetSpecies) attacker.formeChange(targetSpecies);
		},
		id: "grouping",
		name: "Grouping",
		rating: 5,
		num: 100010,
	},
	"impactabsorber": {
		shortDesc: "This Pokemon takes 50% less damage from recoil moves.",
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.recoil) {
				move.recoil[1] *= 2;
			}
		},
		id: "impactabsorber",
		name: "Impact Absorber",
		rating: 4,
		num: 100011,
	},
};
