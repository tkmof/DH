export const Abilities: {[k: string]: ModdedAbilityData} = {
	/* FEG9 abils */
	unfiltered: {
	  shortDesc: "Filter + Contrary",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Unfiltered neutralize');
				return this.chainModify(0.75);
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
	  name: "Unfiltered",
    },
	quickstart: {
	  shortDesc: "On switch-in, this Pokemon's Attack and Speed are doubled for 5 turns.",
		onStart(pokemon) {
			pokemon.addVolatile('quickstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quickstart'];
			this.add('-end', pokemon, 'Quickstart', '[silent]');
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add('-start', target, 'ability: Quickstart');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(target) {
				this.add('-end', target, 'Quickstart');
			},
		},
	  name: "Quickstart",
    },
	holygrail: {
	  shortDesc: "Good As Gold + Levitate",
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Holy Grail');
				return null;
			}
		},
		isBreakable: true,
	  name: "Holy Grail",
    },
	alldevouring: {
	  shortDesc: "Beast Boost + Serene Grace",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
	  name: "All-Devouring",
    },
	galvanicrelay: {
	  shortDesc: "Mycelium Might + Transistor; Mycelium Might effects extend to Electric-type attacks.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify(1.5);
			}
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status' || move.type === 'Electric') {
				return -0.1;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status' || move.type === 'Electric') {
				move.ignoreAbility = true;
			}
		},
	  name: "Galvanic Relay",
    },
	forestfury: {
	  shortDesc: "Effects of Intimidate and Hyper Cutter + This Pokemon can't be statused by opponents.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Forest Fury', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Forest Fury", "[of] " + target);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Forest Fury');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Forest Fury');
				return null;
			}
		},
	  name: "Forest Fury",
    },
	growthspurt: {
	  shortDesc: "Effects of Harvest; Berry is restored at 1/3 or less of its max HP.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.getItem(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Growth Spurt');
				}
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 3 && target.hp + damage > target.maxhp / 3 && !target.item && this.dex.getItem(target.lastItem).isBerry) {
					target.setItem(target.lastItem);
					target.lastItem = '';
					this.add('-item', target, target.getItem(), '[from] ability: Growth Spurt');
			}
		},
	  name: "Growth Spurt",
    },
	lightdrive: {
	  shortDesc: "Light Metal + Quark Drive. Quark Drive activates if the user is lighter.",
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['lightdrive']) {
				pokemon.addVolatile('lightdrive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('lightdrive');
				pokemon.addVolatile('lightdrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['lightdrive'].fromBooster = true;
			} else if (!(pokemon.volatiles['lightdrive']?.fromBooster || pokemon.volatiles['lightdrive']?.fromWeightDiff) && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('lightdrive');
			}
		},
		onAnyPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			if (source == target) return;
			const user = this.effectData.target;
			if (user.volatiles['lightdrive'] && !user.volatiles['lightdrive'].fromWeightDiff) return;
			if (source === user) {
				if (user.getWeight() < target.getWeight() && !user.volatiles['lightdrive']) {
					user.addVolatile('lightdrive');
					user.volatiles['lightdrive'].fromWeightDiff = true;
				} else if (user.volatiles['lightdrive'] && user.getWeight() >= target.getWeight()) {
					user.removeVolatile('lightdrive');
				}
			} else if (target === user) {
				if (user.getWeight() < source.getWeight() && !user.volatiles['lightdrive']) {
					user.addVolatile('lightdrive');
					user.volatiles['lightdrive'].fromWeightDiff = true;
				} else if (user.volatiles['lightdrive'] && user.getWeight() >= source.getWeight()) {
					user.removeVolatile('lightdrive');
				}
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['lightdrive'];
			this.add('-end', pokemon, 'Light Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Light Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Light Drive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'lightdrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Light Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Light Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Light Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Light Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Light Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Light Drive');
			},
		},
		isPermanent: true,
		name: "Light Drive",
		rating: 1,
		num: 135,
	},
	scraprock: {
	  shortDesc: "Scrappy + Solid Rock",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Scrap Rock neutralize');
				return this.chainModify(0.75);
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onBoost(boost, target, source, effect) {
			if (['intimidate','forestfury','shockfactor'].includes(effect.id)) {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Scrap Rock');
			}
		},
		name: "Scrap Rock",
		rating: 3,
	},
	reachless: {
	  shortDesc: "Effects of Rock Head and Reckless.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Reachless boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		name: "Reachless",
		rating: 3,
	},
	openingact: {
	  shortDesc: "Protosynthesis + Prankster",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Opening Act is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['openingact']) {
				pokemon.addVolatile('openingact');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('openingact');
				pokemon.addVolatile('openingact', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['openingact'].fromBooster = true;
			} else if (!pokemon.volatiles['openingact']?.fromBooster && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('openingact');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['openingact'];
			this.add('-end', pokemon, 'Opening Act', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Opening Act', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Opening Act');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'openingact' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Opening Act atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Opening Act def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Opening Act spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Opening Act spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Opening Act spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Opening Act');
			},
		},
		isPermanent: true,
		name: "Opening Act",
		rating: 3,
	},
	necromancer: {
	  shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Ghost-type attack and takes 50% damage from Ghost and Steel attacks; can't be statused.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Necromancer boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Necromancer boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost' || move.type === 'Steel') {
				this.debug('Necromancer weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost' || move.type === 'Steel') {
				this.debug('Necromancer weaken');
				return this.chainModify(0.5);
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Necromancer');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Necromancer');
				return null;
			}
		},
		name: "Necromancer",
		rating: 3,
	},
	regainpatience: {
	  shortDesc: "Berserk + Regenerator",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({spa: 1});
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Regain Patience",
		rating: 3,
	},
	quarksurge: {
	  shortDesc: "Quark Drive + Electric Surge",
		onStart(pokemon) {
			this.field.setTerrain('electricterrain');
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['quarksurge']) {
				pokemon.addVolatile('quarksurge');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('quarksurge');
				pokemon.addVolatile('quarksurge', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['quarksurge'].fromBooster = true;
			} else if (!pokemon.volatiles['quarksurge']?.fromBooster && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('quarksurge');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarksurge'];
			this.add('-end', pokemon, 'Quark Surge', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Surge', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Surge');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarksurge' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Quark Surge atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Quark Surge def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Quark Surge spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Quark Surge spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Quark Surge spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Surge');
			},
		},
		isPermanent: true,
		name: "Quark Surge",
		rating: 3,
	},
	onceuponatime: {
	  shortDesc: "Protosynthesis + Infiltrator",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Once Upon a Time is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['onceuponatime']) {
				pokemon.addVolatile('onceuponatime');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('onceuponatime');
				pokemon.addVolatile('onceuponatime', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['onceuponatime'].fromBooster = true;
			} else if (!pokemon.volatiles['onceuponatime']?.fromBooster && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('onceuponatime');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['onceuponatime'];
			this.add('-end', pokemon, 'Once Upon a Time', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Once Upon a Time', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Once Upon a Time');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'onceuponatime' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Once Upon a Time atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Once Upon a Time def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Once Upon a Time spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Once Upon a Time spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Once Upon a Time spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Once Upon a Time');
			},
		},
		onModifyMove(move) {
			move.infiltrates = true;
		},
		isPermanent: true,
		name: "Once Upon a Time",
		rating: 3,
	},
	primitive: {
	  shortDesc: "Protosynthesis + Oblivious",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (['attract','captivate','taunt'].includes(move.id)) {
				this.add('-immune', pokemon, '[from] ability: Primitive');
				return null;
			}
		},
		onBoost(boost, target, source, effect) {
			if (['intimidate','forestfury','shockfactor'].includes(effect.id)) {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Primitive');
			}
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Primitive');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Primitive');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Primitive');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
			// if (pokemon.transformed) return;
			// Primitive is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['primitive']) {
				pokemon.addVolatile('primitive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('primitive');
				pokemon.addVolatile('primitive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['primitive'].fromBooster = true;
			} else if (!pokemon.volatiles['primitive']?.fromBooster && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('primitive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['primitive'];
			this.add('-end', pokemon, 'Primitive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Primitive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Primitive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'primitive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Primitive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Primitive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Primitive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Primitive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Primitive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Primitive');
			},
		},
		isPermanent: true,
		name: "Primitive",
		rating: 3,
	},
	systempurge: {
	  shortDesc: "Hit by a Dark move or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				target.addVolatile('systempurge');
			}
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (pokemon.hasItem('boosterenergy') && pokemon.useItem()) {
				pokemon.removeVolatile('systempurge');
				pokemon.addVolatile('systempurge', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['systempurge'].fromBooster = true;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['systempurge'];
			this.add('-end', pokemon, 'System Purge', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: System Purge', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: System Purge');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'systempurge' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('System Purge atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('System Purge def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('System Purge spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('System Purge spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('System Purge spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'System Purge');
			},
		},
		isPermanent: true,
		name: "System Purge",
		rating: 3,
	},
	delayedreaction: {
	  shortDesc: "This Pokemon switches out at the end of the next turn after being lowered to 50% of its max HP.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				target.addVolatile('delayedreaction');
				this.add('-ability', target, 'Delayed Reaction');
				this.add('-message', `${target.name} is getting ready to leave the battlefield!`);
			}
		},
		condition: {
			duration: 1,
			onEnd(pokemon) {
				this.add('-ability', pokemon, 'Delayed Reaction');
				this.add('-message', `${pokemon.name} ejected itself from the battle!`);
				pokemon.switchFlag = true;				
			},
		},
		name: "Delayed Reaction",
		rating: 1,
	},
	choreography: {
	  shortDesc: "Protean + Dancer",
		onPrepareHit(source, target, move) {
			if (this.effectData.choreography) return;
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectData.choreography = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Choreography');
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectData.choreography;
		},
		name: "Choreography",
		rating: 4,
	},
	squall: {
	  shortDesc: "+1 Atk if hit by a Fire or Ice move or Tailwind begins; Fire & Ice immunity.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Ice' || move.type === 'Fire')) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Squall');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectData.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		name: "Squall",
		rating: 4,
	},
	stoneage: {
	  shortDesc: "Sturdy + Technician",
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.species.name !== 'Relishadow' || pokemon.transformed) return;
			pokemon.formeChange('Relishadow-Zenith');
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Stone Age');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Stone Age');
				return target.hp - 1;
			}
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Stone Age boost');
				return this.chainModify(1.5);
			}
		},
		name: "Stone Age",
		rating: 3,
	},
	moltencore: {
	  shortDesc: "Turboblaze + Rock Head",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Molten Core');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		name: "Molten Core",
		rating: 3,
	},
	eczema: {
	  shortDesc: "Pokemon that make contact with or KO this Pokemon lose 1/8 of their max HP.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (!target.hp) {
					this.damage(source.baseMaxhp / 4, source, target);
				} else {
					this.damage(source.baseMaxhp / 8, source, target);
				}
			}
			else if (!target.hp) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Eczema",
		rating: 3,
	},
	aurashield: {
	  shortDesc: "Shield Dust + While this Pokemon is active, moves with secondary effects used by any Pokemon have 1.33x power.",
		onModifySecondaries(secondaries) {
			this.debug('Aura Shield prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Aura Shield');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || !move.secondaries) return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		name: "Aura Shield",
		rating: 3,
	},
	faultyphoton: {
	  shortDesc: "Disguise + Quark Drive",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && target.species.id === 'ironmimic' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Faulty Photon');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (target.species.id !== 'ironmimic' || target.transformed) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates/* && this.gen >= 6*/);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.species.id !== 'ironmimic' || target.transformed) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates/* && this.gen >= 6*/);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'ironmimic' && this.effectData.busted) {
				const speciesid = /*pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' :*/ 'Iron Mimic-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
				pokemon.addVolatile('faultyphoton');
				//pokemon.volatiles['faultyphoton'].fromBooster = true;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['faultyphoton'];
			this.add('-end', pokemon, 'Faulty Photon', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {/*
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Faulty Photon', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Faulty Photon');
				}*/
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'faultyphoton' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Faulty Photon atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Faulty Photon def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Faulty Photon spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Faulty Photon spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Faulty Photon spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Faulty Photon');
			},
		},
		isPermanent: true,
		name: "Faulty Photon",
		rating: 3,
	},
	dyschronometria: {
	  shortDesc: "This Pokemon ignores other Pokemon's stat stages and Paradox boosts when taking or doing damage.",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectData.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			else if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		/*onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			//this.effectData.bestStat = attacker.getBestStat(false, true);
			if (attacker.getBestStat(false, true) !== 'atk') return;
			for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
										'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
										'weightoflife', 'circuitbreaker']) { 
				if (attacker.volatiles[paradox]) {
					this.debug('Dyschronometria weaken');
					return this.chainModify([3151, 4096]);
				}
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			//this.effectData.bestStat = attacker.getBestStat(false, true);
			if (attacker.getBestStat(false, true) !== 'spa') return;
			for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
										'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
										'weightoflife', 'circuitbreaker']) { 
					if (attacker.volatiles[paradox]) {
					this.debug('Dyschronometria weaken');
					return this.chainModify([3151, 4096]);
				}
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			const bestStat = source.getBestStat(false,true);
			if (['def','spd','spe'].includes(bestStat)) return;
			if (bestStat === 'atk' && move.category !== 'Physical') return;
			if (bestStat === 'spa' && move.category !== 'Special') return;
			for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
										'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs',
											'weightoflife', 'circuitbreaker']) { 
					if (source.volatiles[paradox]) {
					this.debug('Dyschronometria nullify');
					return this.chainModify([3151, 4096]);
				}
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			const bestStat = defender.getBestStat(false,true);
			if (bestStat !== 'def' && (!move.defensiveCategory || move.defensiveCategory === 'Physical')) return;
			if (move.defensiveCategory === 'Special' && bestStat !== 'spd') return;
			for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
									   'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs',
											'weightoflife', 'circuitbreaker']) { 
				if (defender.volatiles[paradox]) {
					this.debug('Dyschronometria nullify');
					return this.chainModify([5325, 4096]);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA (atk, attacker, defender, move) {
			const bestStat = defender.getBestStat(false,true);
			if (bestStat !== 'spd' && (!move.defensiveCategory || move.defensiveCategory === 'Special')) return;
			if (move.defensiveCategory === 'Physical' && bestStat !== 'def') return;
			for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
										'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs',
											'weightoflife', 'circuitbreaker']) { 
				if (defender.volatiles[paradox]) {
					this.debug('Dyschronometria nullify');
					return this.chainModify([5325, 4096]);
				}
			}
		},*/
		
		onAnyModifyAtkPriority: 6,
		onAnyModifyAtk(atk, attacker, defender, move) {
			//this.effectData.bestStat = attacker.getBestStat(false, true);
			const dyschronoUser = this.effectData.target;
			if (defender == dyschronoUser) {
				if (attacker.getBestStat(false, true) !== 'atk') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
											'weightoflife', 'circuitbreaker']) { 
					if (attacker.volatiles[paradox]) {
						this.debug('Dyschronometria weaken');
						return this.chainModify([3151, 4096]);
					}
				}
			} else if (attacker == dyschronoUser) {
				const bestStat = defender.getBestStat(false,true);
				if (bestStat !== 'def' && (!move.defensiveCategory || move.defensiveCategory === 'Physical')) return;
				if (move.defensiveCategory === 'Special' && bestStat !== 'spd') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs',
												'weightoflife', 'circuitbreaker']) { 
					if (defender.volatiles[paradox]) {
						this.debug('Dyschronometria nullify');
						return this.chainModify([5325, 4096]);
					}
				}
			}
		},
		onAnyModifySpAPriority: 5,
		onAnyModifySpA(atk, attacker, defender, move) {
			//this.effectData.bestStat = attacker.getBestStat(false, true);
			const dyschronoUser = this.effectData.target;
			if (defender == dyschronoUser) {
				if (attacker.getBestStat(false, true) !== 'spa') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
											'weightoflife', 'circuitbreaker']) { 
					if (attacker.volatiles[paradox]) {
						this.debug('Dyschronometria weaken');
						return this.chainModify([3151, 4096]);
					}
				}
			} else if (attacker == dyschronoUser) {
				const bestStat = defender.getBestStat(false,true);
				if (bestStat !== 'spd' && (!move.defensiveCategory || move.defensiveCategory === 'Special')) return;
				if (move.defensiveCategory === 'Physical' && bestStat !== 'def') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs',
												'weightoflife', 'circuitbreaker']) { 
					if (defender.volatiles[paradox]) {
						this.debug('Dyschronometria nullify');
						return this.chainModify([5325, 4096]);
					}
				}
			}
		},
		name: "Dyschronometria",
		rating: 3,
	},
	nanorepairs: {
	  shortDesc: "Quark Drive + Regenerator",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Nanorepairs is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['nanorepairs']) {
				pokemon.addVolatile('nanorepairs');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('nanorepairs');
				pokemon.addVolatile('nanorepairs', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['nanorepairs'].fromBooster = true;
			} else if (!pokemon.volatiles['nanorepairs']?.fromBooster && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('nanorepairs');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['nanorepairs'];
			this.add('-end', pokemon, 'Nanorepairs', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Nanorepairs', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Nanorepairs');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'nanorepairs' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Nanorepairs atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Nanorepairs def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Nanorepairs spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Nanorepairs spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Nanorepairs spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Nanorepairs');
			},
		},
		isPermanent: true,
		name: "Nanorepairs",
		rating: 3,
	},
	ironsights: {
	  shortDesc: "This Pokemon's Attack, Special Attack, and accuracy are x1.33.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify([5461, 4096]);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify([5461, 4096]);
		},
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('iron sights - enhancing accuracy');
			return accuracy / 0.75;
		},
		name: "Iron Sights",
		rating: 3,
	},
	rejuvenate: {
	  shortDesc: "Regenerator + Natural Cure",
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Rejuvenate already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Rejuvenate')) {
					// this.add('-message', "" + curPoke + " skipped: no Rejuvenate");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility(['naturalcure','rejuvenate'])) {
					// this.add('-message', "" + curPoke + " confirmed: could be Rejuvenate (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Rejuvenate (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Rejuvenate.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
			if (!pokemon.status) return;
			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;
			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Rejuvenate');
			pokemon.setStatus('');
			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		name: "Rejuvenate",
		rating: 3,
	},
	electromagneticveil: {
	  shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Electric moves or burned; Electric & Burn immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Electromagnetic Veil');
				}
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.heal(target.baseMaxhp / 4);
				this.add('-immune', target, '[from] ability: Electromagnetic Veil');
			}
			return false;
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Electromagnetic Veil');
				this.heal(target.baseMaxhp / 4);
				pokemon.cureStatus();
			}
		},
		name: "Electromagnetic Veil",
		rating: 3,
	},
	risingtension: {
	  shortDesc: "Levitate + Cursed Body",
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (!move.isFutureMove) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectData.target);
				}
			}
		},
		name: "Rising Tension",
		rating: 3,
	},
	grindset: {
	  shortDesc: "While active, own Attack is 1.5x, other Pokemon's Attack is 0.5.",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Grindset');
			this.add('-message', `The grind never stops for ${pokemon.name}, lowering the foe's Attack and raising its own!`);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(1.5);
		},
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectData.target;
			if (source.hasAbility('Grindset')) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Grindset Atk drop');
			return this.chainModify(0.5);
		},
		name: "Grindset",
		rating: 3,
	},
	shockfactor: {
	  shortDesc: "Static + Intimidate",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Shock Factor', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
			}
		},
		name: "Shock Factor",
		rating: 3,
	},
	shellshock: {
	  shortDesc: "Effects of Rock Head. Moves with Recoil have a 30% chance of inflicting paralysis.",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onModifyMove(move) {
			if (!move || !move.recoil || !move.hasCrashDamage || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'par',
				ability: this.dex.getAbility('shellshock'),
			});
		},
		name: "Shell Shock",
		rating: 3,
	},
	circuitbreaker: {
	  shortDesc: "Quark Drive + Mold Breaker",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
			this.add('-ability', pokemon, 'Circuit Breaker');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Nanorepairs is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['nanorepairs']) {
				pokemon.addVolatile('circuitbreaker');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('circuitbreaker');
				pokemon.addVolatile('circuitbreaker', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['circuitbreaker'].fromBooster = true;
			} else if (!pokemon.volatiles['circuitbreaker']?.fromBooster && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('circuitbreaker');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['circuitbreaker'];
			this.add('-end', pokemon, 'Circuit Breaker', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Circuit Breaker', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Circuit Breaker');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'circuitbreaker' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Circuit Breaker atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Circuit Breaker def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Circuit Breaker spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Circuit Breaker spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Circuit Breaker spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Circuit Breaker');
			},
		},
		isPermanent: true,
		name: "Circuit Breaker",
		rating: 3,
	},
	weightoflife: {
	  shortDesc: "Heavy Metal + Protosynthesis. Protosynthesis activates if the user is heavier.",
		onModifyWeightPriority: 1,
		onModifyWeight(weighthg) {
			return weighthg*2
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['weightoflife']) {
				pokemon.addVolatile('weightoflife');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('weightoflife');
				pokemon.addVolatile('weightoflife', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['weightoflife'].fromBooster = true;
			} else if (!(pokemon.volatiles['weightoflife']?.fromBooster || pokemon.volatiles['weightoflife']?.fromWeightDiff) && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('weightoflife');
			}
		},
		onAnyPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			if (source == target) return;
			const user = this.effectData.target;
			if (user.volatiles['weightoflife'] && !user.volatiles['weightoflife'].fromWeightDiff) return;
			if (source === user) {
				if (user.getWeight() > target.getWeight() && !user.volatiles['weightoflife']) {
					user.addVolatile('weightoflife');
					user.volatiles['weightoflife'].fromWeightDiff = true;
				} else if (user.volatiles['weightoflife'] && user.getWeight() <= target.getWeight()) {
					user.removeVolatile('weightoflife');
				}
			} else if (target === user) {
				if (user.getWeight() > source.getWeight() && !user.volatiles['weightoflife']) {
					user.addVolatile('weightoflife');
					user.volatiles['weightoflife'].fromWeightDiff = true;
				} else if (user.volatiles['weightoflife'] && user.getWeight() <= source.getWeight()) {
					user.removeVolatile('weightoflife');
				}
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['weightoflife'];
			this.add('-end', pokemon, 'Weight of Life', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Weight of Life', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Weight of Life');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'weightoflife' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Weight of Life atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Weight of Life def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Weight of Life spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Weight of Life spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Weight of Life spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Weight of Life');
			},
		},
		isPermanent: true,
		name: "Weight of Life",
		rating: 1,
		num: 135,
	},
	//Vanilla abilities
	naturalcure: {
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure') && !Object.values(species.abilities).includes('Rejuvenate')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility(['naturalcure','rejuvenate'])) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Cure');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		name: "Natural Cure",
		rating: 2.5,
		num: 30,
	},
	//Mainly did this so we could try to see if Quark Drive would work
	protosynthesis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['protosynthesis']) {
				pokemon.addVolatile('protosynthesis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('protosynthesis');
				pokemon.addVolatile('protosynthesis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protosynthesis'].fromBooster = true;
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster && !this.field.isWeather('sunnyday')) {
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: ' + pokemon.getAbility().name, '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: ' + pokemon.getAbility().name);
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		isPermanent: true,
		name: "Protosynthesis",
		rating: 3,
		num: 281,
	},
	quarkdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['quarkdrive']) {
				pokemon.addVolatile('quarkdrive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('quarkdrive');
				pokemon.addVolatile('quarkdrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['quarkdrive'].fromBooster = true;
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster && !this.field.isTerrain('electricterrain')) {
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: ' + pokemon.getAbility().name, '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: ' + pokemon.getAbility().name);
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		isPermanent: true,
		name: "Quark Drive",
		rating: 3,
		num: 282,
	},
};
