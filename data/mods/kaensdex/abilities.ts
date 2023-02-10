export const Abilities: {[k: string]: ModdedAbilityData} = {

success: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		name: "Success",
		desc: "This Pokémon's Speed is raised by 1 stage if it attacks and KOes another Pokémon.",
		rating: 3,
		num: 10000,
	},
hotknife: {
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'brn',
				ability: this.dex.getAbility('hotknife'),
			});
		},
		name: "Hot Knife",
		desc: "This Pokémon's Contact moves have a 30% chance of burning.",
		rating: 2,
		num: 10001,
	},
openmind: {
		onModifySpe(spe) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(2);
			}
		},
		name: "Open Mind",
		desc: "If Psychic Terrain is active, this Pokémon's speed is doubled.",
		rating: 3,
		num: 10002,
	},
voidbody: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-ability', target, 'Void Body');
				this.boost({atk: -1}, source, target, null, true);
			}
		},
		name: "Void Body",
		desc: "Pokémon making contact with this Pokémon have their Attack lowered by 1 stage.",
		rating: 2,
		num: 10003,
	},
frightening: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Frightening', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Frightening",
		desc: "On switch-in, this Pokémon lowers the SpA of opponents by 1 stage.",
		rating: 3.5,
		num: 10004,
	},
eternalice: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.3);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Eternal Ice');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Eternal Ice');
			}
			return false;
		},
		name: "Eternal Ice",
		desc: "This Pokémon's Ice power is 1.3x; It can't be burned; Fire power against it is halved.",
		rating: 4.5,
		num: 10005,
	},
leecher: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['heal']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([0x14CC, 0x1000]);
			}
		},
		name: "Leecher",
		desc: "Healing moves Heal for 1.3x HP and Draining moves are 1.3 stronger.",
		rating: 3.5,
		num: 10006,
	},
airionizer: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Air Ionizer');
				}
				return null;
			}
		},
		name: "Air Ionizer",
		desc: "This Pokémon SpA is raised 1 stage if hit by a Flying move; Flying immunity.",
		rating: 3,
		num: 10007,
	},
deepsea: {
		onModifyDef(def, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
            onModifySpD(spd, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "Deep Sea",
		desc: "If Rain is active, this Pokemon's Defense and Special defense is doubled.",
		rating: 3,
		num: 10008,
	},
leafplates: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Water') mod /= 2;
			if (move.type === 'Ice') mod /= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Leaf Plates",
		desc: "Halves damage from contact moves, and any Ice or Water move.",
		rating: 3.5,
		num: 10009,
	},
storm: {
		onDamagingHit(damage, target, source, move) {
			if (this.field.getWeather().id !== 'hail') {
				this.field.setWeather('hail');
			}
		},
		name: "Storm",
		desc: "When this Pokemon is hit by an attack, the effect of Hail begins.",
		rating: 2,
		num: 10010,
	},
protectivepelt: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		name: "Protective Pelt",
		desc: "Halves damage from special moves.",
		rating: 4,
		num: 10011,
	},
	
royalhoney: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod /= 2;
			if (move.type === 'Rock') mod /= 2;
			if (move.type === 'Flying') mod /= 2;
			return this.chainModify(mod);
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
		this.heal(pokemon.baseMaxhp / 16);
		},
		isBreakable: true,
		name: "Royal Honey",
		desc:  "Halves the damage from moves that would be super effective on Bug-Type. Heals 1/16 HP each turn.",
		rating: 3.5,
		num: 10012,
	},	
	
revitalizingrain: {
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		name: "Revitalizing Rain",
		desc:  "On switch-in, this Pokemon summons Rain Dance. During Rain, Heals 1/8 HP each turn.",
		rating: 4,
		num: 10013,
	},
	
stickyseeds: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
				this.damage(source.baseMaxhp / 8, source, target);
				this.heal(source.baseMaxhp / 8, target, source);
		},
		name: "Sticky Seeds",
		desc: "Drains 1/8 HP on being hit.",
		rating: 2.5,
		num: 10014,
	},
	
	malware: {
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'SurivExe' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Virus'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('malware');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Virus'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('malware');
				pokemon.removeVolatile('malware');
			}
		},
		condition: {
			onStart(pokemon) {
					if (pokemon.species.id !== 'surivexevirus') pokemon.formeChange('SurivExe-Virus');
					},
		},
		isPermanent: true,
		name: "Malware",
		desc: "If SurivExe, at end of turn changes Mode to Virus if < 1/2 max HP.",
		rating: 0,
		num: 10015,
	},
	
	airborne: {
		onUpdate(pokemon) {
			if (pokemon.hasType('Flying')) return false;
			if (!pokemon.addType('Flying')) return false;
			this.add('-start', pokemon, 'typeadd', 'Flying', '[from] move: Airborne');
		},
		name: "Airborne",
		desc: "Takes fly and become Flying-Type.",
		rating: 3.5,
		num: 10016,
	},
	
	archery: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (!move.flags['contact']) {
				if (move.category === 'Physical'){
				return this.chainModify([0x14CD, 0x1000]);
				}
			} 			
		},
		name: "Archery",
		desc: "Non-contact Physical moves have 1.3x power.",
		rating: 3.5,
		num: 10017,
	},
	
	insectmovement: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Bug' && pokemon.hp === pokemon.maxhp) return priority + 2;
		},
		name: "Insect Movement",
		desc: "Bug-Type moves have +2 priority while at full HP.",
		rating: 3,
		num: 10018,
	},
	
	cockatricedominance: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (defender && ['par'].includes(defender.status)) {
				return this.chainModify(1.5);
			}
		},
		name: "Cockatrice Dominance",
		desc: "Deals 1.5x damage against paralyzed opponents.",
		rating: 1.5,
		num: 10019,
	},
	
	//gen 9 stuff
	sharpness: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Shapness boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sharpness",
		desc: "This Pokemon's slicing moves have their power multiplied by 1.5.",
		rating: 3.5,
		num: 292,
	},
	
	eartheater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Earth Eater",
		desc: "This Pokemon heals 1/4 of its max HP when hit by Ground moves; Ground immunity.",
		rating: 3.5,
		num: 297,
	},
	
	windrider: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({atk: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		name: "Wind Rider",
		desc: "Attack raised by 1 if hit by a wind move or Tailwind begins. Wind move immunity.",
		rating: 3.5,
		// We do not want Brambleghast to get Infiltrator in Randbats
		num: 274,
	},
	
	wellbakedbody: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Well-Baked Body",
		desc: "This Pokemon's Defense is raised 2 stages if hit by a Fire move; Fire immunity.",
		rating: 3.5,
		num: 273,
	},
	
	angershell: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedAngerShell = false;
			} else {
				this.effectState.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1, spe: 1, def: -1, spd: -1}, target, target);
			}
		},
		name: "Anger Shell",
		desc: "At 1/2 or less of this Pokemon's max HP: +1 Atk, Sp. Atk, Spe, and -1 Def, Sp. Def.",
		rating: 4,
		num: 271,
	},
	
	lingeringaroma: {
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.isPermanent || sourceAbility.id === 'lingeringaroma') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('lingeringaroma', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Lingering Aroma', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		name: "Lingering Aroma",
		desc: "Making contact with this Pokemon has the attacker's Ability become Lingering Aroma.",
		rating: 2,
		num: 268,
	},
	
	guarddog: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Guard Dog');
			return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.boost({atk: 1}, target, target, null, false, true);
			}
		},
		name: "Guard Dog",
		desc: "Immune to Intimidate. Intimidated: +1 Attack. Cannot be forced to switch out.",
		rating: 2,
		num: 275,
	},
	
	cudchew: {
		onEatItem(item, pokemon) {
			if (item.isBerry && pokemon.addVolatile('cudchew')) {
				pokemon.volatiles['cudchew'].berry = item;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['cudchew'];
		},
		condition: {
			noCopy: true,
			duration: 2,
			onRestart() {
				this.effectState.duration = 2;
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const item = this.effectState.berry;
					this.add('-activate', pokemon, 'ability: Cud Chew');
					this.add('-enditem', pokemon, item.name, '[eat]');
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
					}
					if (item.onEat) pokemon.ateBerry = true;
				}
			},
		},
		name: "Cud Chew",
		desc: "If this Pokemon eats a Berry, it will eat that Berry again at the end of the next turn.",
		rating: 2,
		num: 291,
	},
	
	quarkdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('quarkdrive');
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster) {
				pokemon.removeVolatile('quarkdrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarkdrive'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		isPermanent: true,
		name: "Quark Drive",
		desc: "Electric Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 282,
	},
	
	protosynthesis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protosynthesis');
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster) {
				pokemon.removeVolatile('protosynthesis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protosynthesis'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		isPermanent: true,
		name: "Protosynthesis",
		desc: "Sunny Day active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 281,
	},
};
