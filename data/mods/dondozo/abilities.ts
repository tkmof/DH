export const Abilities: {[k: string]: ModdedAbilityData} = {
	imterrifiedofdondozo: {
		onDamagingHit(damage, target, source, move) {
			if (target.species.id.includes('dondozo')) {
				this.boost({spe: 1});
			}
		},
		name: "I'm terrified of Dondozo",
		shortDesc: "When hit by Dondozo, speed is increased by one stage.",
	},
	coldcommander: {
		name: "Cold Commander",
		shortDesc: "If Eisugiri, first physical hit deals 0 damage, user transforms into Dondozo. Revert to Eisugiri in hail.",
		onStart(pokemon) {
			if (this.field.isWeather(['hail', 'snow']) &&
				pokemon.species.id === 'eisugiridondozo' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eisugiri', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && effect.category === 'Physical' &&
				target.species.id === 'eisugiri' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Cold Commander');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eisugiri' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['bypasssub'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eisugiri' || target.transformed) return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eisugiri' && this.effectState.busted) {
				pokemon.formeChange('Eisugiri-Dondozo', this.effect, true);
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isWeather(['hail', 'snow']) &&
				pokemon.species.id === 'eisugirinoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Cold Commander');
				this.effectState.busted = false;
				pokemon.formeChange('Eisugiri', this.effect, true);
			}
		},
		isBreakable: true,
		isPermanent: true,
	},
	nauticalnuke: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (target.species.id === 'cramogirigorging') {
				this.damage(source.baseMaxhp / 4, source, target);
				this.boost({atk: -2, def: -2, spa: -2, spd: -2, spe: -2}, source, target, null, true);
				target.formeChange('cramogiri', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (effect && effect.id === 'surf' 
				&& source.hasAbility('nauticalnuke') &&
				source.species.name === 'cramogiri' && !source.transformed) {
				source.formeChange('cramogirigorging', effect);
			}
		},
		isPermanent: true,
		name: "Nautical Nuke",
		shortDesc: "When hit after Surf/Dive, attacker takes 1/4 max HP and -2 to all stats.",
	},
	paramedic: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
			pokemon.side.addSlotCondition(pokemon, 'paramedic');
        },
        condition: {
            onStart(pokemon, source) {
                this.effectData.hp = source.maxhp / 3;
            },
            onSwap(target) {
                if (!target.fainted && target.species.id.includes('dondozo')) {
                    const damage = this.heal(this.effectData.hp, target, target);
                    if (damage) this.add('-heal', target, target.getHealth, '[from] ability: Paramedic', '[of] ' + this.effectData.source);
                    target.side.removeSlotCondition(target, 'paramedic');
                }
            },
        },
		name: "Paramedic",
		shortDesc: "If switching out into Dondozo, both Pokemon are healed, each for 33.3% of its Max HP.",
	},
	commanderguard: {
		onTryHit(target, source, move) {
			this.debug('Commander Guard immunity: ' + move.id);
			if (target.species.id.includes('dondozo')) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Commander Guard');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Commander Guard",
		shortDesc: "This Pokemon can only be hit by Dondozo.",
	},
	notpayingattentiontodondozoatallsorry: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'not paying attention to dondozo at all, sorry');
		},
		onModifyMove(move) {
			for (const target of pokemon.foes()) {
				if(target.species.id.includes('dondozo')) {
					move.ignoreAbility = true;
				}
			}
		},
		name: "not paying attention to dondozo at all, sorry",
		shortDesc: "This Pokemon ignores the abilities of Dondozo.",
	},
	imperialretreat: {
		onDamagingHit(damage, target, source, move) {
			if (target.species.id.includes('dondozo')) {
				source.switchFlag = true;
				this.add('-activate', target, 'ability: Emergency Exit');
			}
		},
		name: "Imperial Retreat",
		shortDesc: "This Pokemon switches out when hit by Dondozo.",
	},
	powerofdondozo: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Power of Dondozo');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Power of Dondozo');
			}
			return false;
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Power of Dondozo');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Power of Dondozo');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Power of Dondozo');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Power of Dondozo');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Power of Dondozo', '[of] ' + target);
			}
		},
		isBreakable: true,
		name: "Power of Dondozo",
		shortDesc: "This Pokemon has the abilities of Dondozo.",
	},
	sacrifice: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: 2, def: 2, spa: 2, spd: 2, spe:2}, target, pokemon, null, true);
					pokemon.faint();
				}
			}
		},
		name: "Sacrifice",
		shortDesc: "On switchin, this Pokemon jumps into the opponent's mouth, raising all of its stats by 2.",
	},
	fishingseason: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Fishing Season');
		},
		name: "Fishing Season",
		shortDesc: "(placeholder) While this Pokemon is active, Dondozo is suppressed.",
	},
	fishesofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Fishes of Ruin');
		},
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				target.addVolatile('fishesofruin');
			}
		},
		condition: {
			onStart(pokemon) {
				const randAbil = this.random(3);
				pokemon.formeChange('Seismitoad');
				if (randForm < 1) pokemon.setAbility('unaware');
				else if (randForm < 2) pokemon.setAbility('waterveil');
				else pokemon.setAbility('oblivious');
			},
			onEnd(pokemon) {
				if (['Dondozo'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		name: "Fishes of Ruin",
		shortDesc: "(placeholder) While this Pokemon is active, every other active Pokemon is Dondozo.",
	},
	fishout: {
		name: "Fish Out",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(504, source, target);
			}
		},
		shortDesc: "When this Pokemon is knocked out by an opponent's attack, it deals damage to that opponent equal to Dondozo's HP.",
	},
	fishbond: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (source.species.id === 'grenigiri' && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.add('-activate', source, 'ability: Fish Bond');
				pokemon.formeChange('Grenigiri-Dondozo', effect, true);
			}
		},
		isPermanent: true,
		name: "Fish Bond",
		shortDesc: "When this Pokemon attacks and KOes another Pokemon, it transforms into Dondozo.",
	},
	zombiefish: {
		name: "Zombie Fish",
		shortDesc: "When this Pokemon faints, it's replaced by a Dondozo with 1/4 max HP.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.add('-activate', source, 'ability: Zombie Fish');
				pokemon.formeChange('Drifugiri-Dondozo', effect, true);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP / 4;
			}
		},
	},
	emergencymeeting: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			pokemon.transformInto("Dondozo", this.dex.abilities.get('emergencymeeting'));
		},
		name: "Emergency Meeting",
		shortDesc: "On switchin, this Pokemon transforms into Dondozo.",
	},
	yeah: {
		onStart(pokemon) {
			const dondozo = pokemon.side.pokemon.filter(ally => ally.includes("Dondozo") && !ally.fainted);
			this.add('-start', pokemon, `Dondozo${fallen}`, '[silent]');
			pokemon.boost({atk: dondozo * 2, def: dondozo * 2, spa:dondozo *  2, spd: dondozo * 2, spe: dondozo * 2});
			this.effectState.dondozo = dondozo;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `dondozo${this.effectState.dondozo}`, '[silent]');
		},
		name: "yeah",
		shortDesc: "On switchin, this Pokemon gains +2 to all stats for each Dondozo on its team.",
	},
	callforhelp: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['mimigiri'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Call for Help');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimigiri', 'mimigiritotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimigiri'].includes(target.species.id) || target.transformed) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimigiri', 'mimigiritotem'].includes(pokemon.species.id) && this.effectState.busted) {
				const speciesid = 'Mimigiri-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
		isBreakable: true,
		isPermanent: true,
		name: "Call for Help",
		shortDesc: "(Mimigiri only) The first hit it takes is blocked, and it takes 1/8 HP damage instead and becomes Dondozo.",
	},
	foodchain: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Food Chain');
			pokemon.faint();
			this.boost({atk: 2, def: 2, spa: 2, spd: 2, spe:2},);
		},
		name: "Food Chain",
		shortDesc: "On switchin, this Pokemon jumps into its own mouth and gains +2 to all stats.",
	},
	bozotodozo: {
		onSwitchOut(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Palagiri' || pokemon.transformed) return;
			if (pokemon.species.forme !== 'Dondozo') {
				pokemon.formeChange('Palagiri-Dondozo', this.effect, true);
			}
		},
		onSwitchIn() {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectState.switchingIn) return;
			this.effectState.switchingIn = false;
			if (pokemon.baseSpecies.baseSpecies !== 'Palagiri' || pokemon.transformed) return;
			if (!this.effectState.heroMessageDisplayed && pokemon.species.forme === 'Dondozo') {
				this.add('-activate', pokemon, 'ability: Zero to Hero');
				this.effectState.heroMessageDisplayed = true;
			}
		},
		isPermanent: true,
		name: "Bozo to Dozo",
		shortDesc: "This Pokemon transforms into Dondozo when switching out.",
	},
	donzoless: {
		onModifyCritRatio(critRatio, source, target) {
			if (target.species.id.includes('dondozo')) return 5;
		},
		name: "Donzoless",
		shortDesc: "This Pokemon's attacks are critical hits against Dondozo.",
	},
	falsedragon: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					pokemon.illusion = possibleTarget;
					break;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('False Dragon'), target.abilityState, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'False Dragon');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		name: "False Dragon",
		shortDesc: "(placeholder) This Pokemon is disguised as Dondozo until it takes a hit.",
	},
	dondozoshield: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minigiri' || pokemon.transformed) return;
			if (pokemon.hp < pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Dondozo') {
					pokemon.formeChange('Minigiri-Dondozo');
				}
			} else {
				if (pokemon.species.forme === 'Dondozo') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minigiri' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp < pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Dondozo') {
					pokemon.formeChange('Minigiri-Dondozo');
				}
			} else {
				if (pokemon.species.forme === 'Dondozo') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		isPermanent: true,
		name: "Dondozo Shield",
		shortDesc: "At 1/2 max HP or less, this Pokemon transforms into Dondozo.",
	},
	dondontzo: {
		onAnyTryMove(target, source, effect) {
			if (target.species.id.includes('dondozo')) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Dondon\'tzo', effect, '[of] ' + target);
				return false;
			}
		},
		isBreakable: true,
		name: "Dondon\'tzo",
		shortDesc: "Prevents Dondozo's moves while this ability is active.",
	},
	dondono: {
		onTryHit(target, source, move) {
			if (target !== source && target.species.id.includes('dondozo')) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dondo-No');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Dondo-No",
		name: "Dondon\'tzo",
		shortDesc: "This Pokemon heals 1/4 when hit by Dondozo; immunity to Dondozo.",
	},
	gyeah: {
		onUpdate(pokemon) {
			const target;
			for (const foe of pokemon.foes()) {
				target = foe;
			}
			if (pokemon.baseSpecies.baseSpecies !== 'Malagiri' ||
				!target.species.id.includes('dondozo')) {
				// Handle any edge cases
				if (pokemon.getVolatile('gyeahperpetrator')) pokemon.removeVolatile('gyeahperpetrator');
				return;
			}

			if (!pokemon.getVolatile('gyeahperpetrator')) {
				// If Dondozo already was gyeah-victim this fails
				if (target.getVolatile('gyeahvictim')) return;
				// Cancel all actions this turn for pokemon if applicable
				this.queue.cancelAction(pokemon);
				// Add volatiles to both pokemon
				this.add('-activate', pokemon, 'ability: gyeah', '[of] ' + ally);
				pokemon.addVolatile('gyeahperpetrator');
				target.addVolatile('gyeahvictim', pokemon);
				// Continued in conditions.ts in the volatiles
			} else {
				if (!target.fainted) return;
				pokemon.removeVolatile('gyeahperpetrator');
			}
		},
		name: "gyeah",
		shortDesc: "If enemy is Dondozo: this Pokemon cannot act or be hit, -2 to Dondozo's stats.",
	},
	fishnet: {
		onFoeTrapPokemon(pokemon) {
			if (pokemon.species.id.includes('dondozo') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (pokemon.species.id.includes('dondozo')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Fishnet",
		shortDesc: "Prevents opposing Dondozo from switching out.",
	},
	
}