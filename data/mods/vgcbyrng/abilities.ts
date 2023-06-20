export const Abilities: {[abilityid: string]: AbilityData} = {
	sandveil: {
    shortDesc: "Boosts highest non-HP, non-Speed stat by 1.3x in sandstorm.",                                                      
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sandstorm')) {
				pokemon.addVolatile('sandveil');
			} else if (!this.field.isWeather('sandstorm')) {
				pokemon.removeVolatile('sandveil');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['sandveil'];
			this.add('-end', pokemon, 'Sand Veil', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'ability: Sand Veil');
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'sandveil' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk' && this.effectData.bestStat !== 'spe') return;
				this.debug('Sand Veil atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def' && this.effectData.bestStat !== 'spe') return;
				this.debug('Sand Veil def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa' && this.effectData.bestStat !== 'spe') return;
				this.debug('Sand Veil spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd' && this.effectData.bestStat !== 'spe') return;
				this.debug('Sand Veil spd boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sand Veil');
			},
		},
		name: "Sand Veil",
		rating: 1.5,
		num: 8,
	},
	snowcloak: {
    shortDesc: "Boosts highest non-HP, non-Speed stat by 1.3x in snow.",                                                      
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('snow')) {
				pokemon.addVolatile('snowcloak');
			} else if (!this.field.isWeather('snow')) {
				pokemon.removeVolatile('snowcloak');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['snowcloak'];
			this.add('-end', pokemon, 'Snow Cloak', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'ability: Snow Cloak');
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'snowcloak' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk' && this.effectData.bestStat !== 'spe') return;
				this.debug('Snow Cloak atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def' && this.effectData.bestStat !== 'spe') return;
				this.debug('Snow Cloak def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa' && this.effectData.bestStat !== 'spe') return;
				this.debug('Snow Cloak spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd' && this.effectData.bestStat !== 'spe') return;
				this.debug('Snow Cloak spd boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Snow Cloak');
			},
		},
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
	},
	wonderskin: {
    shortDesc: "This Pokemon is immune to moves of its own type.",                                                      
		onTryHit(target, source, move) {
			if (target !== source && target.types.includes(move.type)) {
				this.add('-immune', target, '[from] ability: Wonder Skin');
				return null;
			}
		},
		name: "Wonder Skin",
		rating: 2,
		num: 147,
	},
	tangledfeet: {
    shortDesc: "This Pokemon's moves deal 1.5x damage if it's confused.",                                                      
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['confusion']) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['confusion']) {
				return this.chainModify(1.5);
			}
		},
		name: "Tangled Feet",
		rating: 1,
		num: 77,
	},
};
