'use strict';
exports.BattleAbilities = {
    "karmicretribution": {
        desc: "This Pokemon's damaging moves become multi-hit moves that hit four times. Does not affect moves that have multiple targets or moves that use the target's attacking stats instead of the user's.",
        shortDesc: "This Pokemon's damaging moves hit four times (not Foul Play).",
        onPrepareHit(source, target, move) {
            if (['iceball', 'rollout'].includes(move.id) || move.useTargetOffensive || move.useSourceDefensive) return;
            if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
                move.multihit = 4;
                move.multihitType = 'karmicretribution';
            } else if (move.multihit) {
                if (Array.isArray(move.multihit) && move.multihit[1] > 4) {
                    if (move.multihit[0] === 2 && move.multihit[1] === 5 && this.randomChance(1, 3)) {
                        move.multihit = 4;
                    } else {
                        move.multihit = [4, move.multihit[1]];
                    }
                } else move.multihit = 4;
            }
        },
        onSourceModifySecondaries(secondaries, target, source, move) {
            if (move.multihitType === 'karmicretribution' && move.id === 'secretpower' && move.hit < 4) {
                // hack to prevent accidentally suppressing King's Rock/Razor Fang
                return secondaries.filter(effect => effect.volatileStatus === 'flinch');
            }
        },
        id: "karmicretribution",
        name: "Karmic Retribution",
    },
    "baneofdarkness": {
        desc: "This Pokemon's Psychic-type attacks are super-effective against Dark-types and its Fairy-type attacks are super-effective against Poison-types. Psychic-type attacks ignore the Dark-type's immunity.",
        shortDesc: "User's Psychic- and Fairy-type moves are SE against Dark and Poison, respectively, ignoring immunities if applicable.",
		  onModifyMovePriority: -5,
		  onModifyMove(move, source, target) {
			  if (!move.ignoreImmunity) move.ignoreImmunity = {};
			  if (move.ignoreImmunity !== true && target.hasType('Dark')) {
				  move.ignoreImmunity['Psychic'] = true;
			  }
		  },
		  onSourceEffectiveness(typeMod, target, type, move) {
			  if (move && ((type === 'Poison' && move.type === 'Fairy') || (type === 'Dark' && move.type === 'Psychic'))) return 1;
			  return typeMod;
		  },
        id: "baneofdarkness",
        name: "Bane of Darkness",
    },
	"mountaincall": {
		desc: "This Pokemon's sound-based moves become Ice-type moves. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokemon's sound-based moves become Ice type.",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.flags['sound']) {
				move.type = 'Ice';
			}
		},
		id: "mountaincall",
		name: "Mountain Call",
	},
	"toughitout": {
		desc: "Prevents adjacent opposing Pokemon from choosing to switch out unless they are immune to trapping.",
		shortDesc: "Prevents adjacent foes from choosing to switch.",
		onFoeTrapPokemon(pokemon) {
			if ( this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			pokemon.maybeTrapped = true;
		},
		id: "toughitout",
		name: "Tough It Out!",
	},
	"groundworker": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Ground-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				this.debug('Groundworker boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				this.debug('Groundworker boost');
				return this.chainModify(1.5);
			}
		},
		id: "groundworker",
		name: "Groundworker",
	},
	"sonicwind": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Flying-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Sonic Wind boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Sonic Wind boost');
				return this.chainModify(1.5);
			}
		},
		id: "sonicwind",
		name: "Sonic Wind",
	},
	"poisondippedclaws": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Poison-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Poison-Dipped Claws boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Poison-Dipped Claws boost');
				return this.chainModify(1.5);
			}
		},
		id: "poisondippedclaws",
		name: "Poison-Dipped Claws",
	},
	"divinecourage": {
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Attack and Defense are raised by 1 stage each. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect.",
		shortDesc: "This Pokemon's Attack and Defense are raised by 1 when it reaches 1/2 or less of its max HP.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			if (target.hp <= target.maxhp / 2 && target.hp + move.totalDamage > target.maxhp / 2) {
				this.boost({atk: 1, def: 1});
			}
		},
		id: "divinecourage",
		name: "Divine Courage",
	},
	"divinewisdom": {
		shortDesc: "This Pokemon's Sp. Def is raised by 1 stage after it is damaged by a move.",
		onAfterDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.id !== 'confused') {
				this.boost({spd: 1});
			}
		},
		id: "divinewisdom",
		name: "Divine Wisdom",
	},
	"crystalbarrier": {
		shortDesc: "This Pokemon's Defense and Sp. Def are doubled; Every damaging move used against this Pokemon will always hit.",
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(2);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd) {
			return this.chainModify(2);
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (!move || typeof accuracy !== 'number' || move.category === 'Status') return;
			return true;
		},
		id: "crystalbarrier",
		name: "Crystal Barrier",
	},
	"powershield": {
		shortDesc: "Incoming moves of over 90 base power have 90 base power instead.",
		onBasePowerPriority: 8,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (basePower > 90) {
				return 90;
			}
		},
		id: "powershield",
		name: "Power Shield",
	},
	"antidotation": {
		desc: "This Pokemon is immune to Poison-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Poison-type move. The Poisoning status can still be inflicted through non-Poison-type moves.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Poison moves; Poison immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[from] ability: Antidotation');
				}
				return null;
			}
		},
		id: "antidotation",
		name: "Antidotation",
	},
	"chillingatmosphere": {
		desc: "On switch-in, this Pokemon lowers the Speed of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Speed of adjacent opponents by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Chilling Atmosphere', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon);
				}
			}
		},
		id: "chillingatmosphere",
		name: "Chilling Atmosphere",
	},
	"decayingdarkness": {
		desc: "Causes adjacent opposing Pokemon to lose 1/8 of their maximum HP, rounded down, at the end of each turn. This Pokemon is immune to Dark-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Dark-type move.",
		shortDesc: "Causes adjacent foes to lose 1/8 of their max HP at the end of each turn. This Pokemon heals 1/4 of its max HP when hit by Dark moves; Dark immunity. ",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.maxhp / 4)) {
					this.add('-immune', target, '[from] ability: Decaying Darkness');
				}
				return null;
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.side.foe.active) {
				if (!target || !target.hp) continue;
				this.damage(target.maxhp / 8, target, pokemon);
			}
		},
		id: "decayingdarkness",
		name: "Decaying Darkness",
	},
	"powerofsummer": {
		shortDesc: "This Pokemon resists Fire, regardless of typing. x1.5 to all stats in Sun.",
		onModifyAtkPriority: 3,
		onModifyAtk(atk) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 4,
		onModifySpD(spd) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(1.5);
			}
		},
	  onEffectiveness(typeMod, target, type, move) {
		  if (!move || move.type !== 'Fire') return typeMod;
		  if (type !== target.types[0]) return 0;
		  return -1;
	  },
		id: "powerofsummer",
		name: "Power of Summer",
	},
    "baneoflight": {
        desc: "This Pokemon's Dark-type attacks are super-effective against Fairy-types, and its Poison-type attacks are super-effective against Psychic-types.",
        shortDesc: "User's Dark- and Poison-type moves are SE against Fairy and Psychic, respectively.",
		  onSourceEffectiveness(typeMod, target, type, move) {
			  if (move && ((type === 'Fairy' && move.type === 'Dark') || (type === 'Psychic' && move.type === 'Poison'))) return 1;
			  return typeMod;
		  },
        id: "baneoflight",
        name: "Bane of Light",
    },
    "fourofakind": {
        desc: "This Pokemon's damaging moves become multi-hit moves that hit four times. Does not affect moves that have multiple targets or moves that use the target's attacking stats instead of the user's.",
        shortDesc: "This Pokemon's damaging moves hit four times, but have x0.25 power and halved secondary chances.",
			onModifyMovePriority: -2,
			onModifyMove(move) {
				if (move.secondaries && move.multihitType === 'parentalbond') {
					this.debug('halving secondary chance');
					for (const secondary of move.secondaries) {
						if (secondary.chance) secondary.chance /= 2;
					}
				}
			},
        onPrepareHit(source, target, move) {
            if (['iceball', 'rollout'].includes(move.id)) return;
            if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
                move.multihit = 4;
                move.multihitType = 'parentalbond';
					 if (move.secondaries) {
						this.debug('halving secondary chance');
						for (const secondary of move.secondaries) {
							if (secondary.chance) secondary.chance /= 2;
						}
					 }
            }
        },
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond') return this.chainModify(0.25);
		},
        onSourceModifySecondaries(secondaries, target, source, move) {
            if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 4) {
                // hack to prevent accidentally suppressing King's Rock/Razor Fang
                return secondaries.filter(effect => effect.volatileStatus === 'flinch');
            }
        },
        id: "fourofakind",
        name: "Four of a Kind",
    },
    "fourheads": {
        desc: "This Pokemon's damaging moves become multi-hit moves that hit four times. Does not affect moves that have multiple targets or moves that use the target's attacking stats instead of the user's.",
        shortDesc: "This Pokemon's damaging moves hit four times, but have x0.3 power and halved secondary chances.",
			onModifyMovePriority: -2,
			onModifyMove(move) {
				if (move.secondaries && move.multihitType === 'fourheads') {
					this.debug('halving secondary chance');
					for (const secondary of move.secondaries) {
						if (secondary.chance) secondary.chance /= 2;
					}
				}
			},
        onPrepareHit(source, target, move) {
            if (['iceball', 'rollout'].includes(move.id)) return;
            if (move.category !== 'Status' && !move.selfdestruct && !move.multihit && !move.flags['charge'] && !move.spreadHit && !move.isZ) {
                move.multihit = 4;
                move.multihitType = 'fourheads';
					 if (move.secondaries) {
						this.debug('halving secondary chance');
						for (const secondary of move.secondaries) {
							if (secondary.chance) secondary.chance /= 2;
						}
					 }
            }
        },
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'fourheads') return this.chainModify(0.3);
		},
        onSourceModifySecondaries(secondaries, target, source, move) {
            if (move.multihitType === 'fourheads' && move.id === 'secretpower' && move.hit < 4) {
                // hack to prevent accidentally suppressing King's Rock/Razor Fang
                return secondaries.filter(effect => effect.volatileStatus === 'flinch');
            }
        },
        id: "fourheads",
        name: "Four Heads",
    },
	"abilitytodestroyanything": {
		shortDesc: "Sniper + Sheer Force + Super Luck + This Pokemon's moves that would otherwise lack recoil now deal 25% of damage dealt back to the user.",
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
			if (!move.recoil){
				move.recoil = [1, 4];
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([0x14CD, 0x1000]);
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		id: "abilitytodestroyanything",
		name: "Ability to Destroy Anything",
	},
	"miner": {
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Rock-type attack.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Miner boost (except not really because x1.5 multiplier)');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Miner boost (except not really because x1.5 multiplier)');
				return this.chainModify(1.5);
			}
		},
		id: "miner",
		name: "Miner",
	},
	"noncorporeal": {
		shortDesc: "This Pokemon can only be damaged by supereffective or Rock-type moves and indirect damage.",
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' ||| move.type === 'Rock' || move.id === 'struggle') return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				this.add('-immune', target, '[from] ability: Noncorporeal');
				return null;
			}
		},
		id: "noncorporeal",
		name: "Noncorporeal",
	},
	"kalibersfury": {
		shortDesc: "Any attacks with 60 bp or less get a +1 to priority.",
		onModifyPriority: function(priority, pokemon, target, move, basePower) {
			if (move.category !== 'Status' && move.basePower <= 60) return priority + 1;
		},
		id: "kalibersfury",
		name: "Kaliber's Fury",
	},
	"unsteadyhood": {
		desc: "If this Pokemon is Hyness, the first hit taken in battle deals halved damage and causes a forme-change into Unhooded Hyness. Confusion damage also breaks the disguise.",
		shortDesc: "If this Pokemon is Hyness, the first hit taken in battle deals halved damage and causes a forme-change into Hyness-Unhooded.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move' && target.template.speciesid === 'hyness' && !target.transformed) {
				this.add('-activate', target, 'ability: Unsteady Hood');
				this.effectData.busted = true;
				return damage / 2;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.template.speciesid === 'hyness' && this.effectData.busted) {
				pokemon.formeChange('Hyness-Unhooded', this.effect, true);
			}
		},
		id: "unsteadyhood",
		name: "Unsteady Hood",
	},
	"moonstruckblossom": {
		desc: "This Pokemon's moon-based moves have their power multiplied by 1.5. Moonlight now restores 1.5x more HP. If this Pokemon is a Grass-type, then the weaknesses of said type are negated.",
		shortDesc: "x1.5 power to Moon moves; Moonlight heals 1.5x more HP to the user; Weaknesses from the Grass type are negated.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (['moonblast', 'moongeistbeam', 'menacingmoonrazemaelstrom'].includes(move.id)) {
				return this.chainModify(1.5);
			}
		},
		onTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			if (effect.id === 'moonlight') {
				return damage * 1.5;
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move && type === 'Grass' && typeMod > 0) return 0;
		},
		id: "moonstruckblossom",
		name: "Moonstruck Blossom",
	},
	"soul0system": {
		desc: "This Pokemon is immune to Ghost. If this Pokemon is Star Dream Soul 0S's Clockwork Star forme, a situation that would cause it to faint instead forme-changes it into Star Dream Soul 0S-Heart, restoring back to full HP. This Pokemon's Psychic-type moves become Ghost-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Electrify's effects.",
		shortDesc: "This Pokemon's Psychic-type moves become Ghost type and have 1.2x power. This Pokemon is immune to Ghost. If Star Dream Soul 0S-Clockwork Star, becomes Star Dream Soul 0S-Heart when it would faint and restores to full HP.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				this.add('-immune', target, '[from] ability: Soul 0 System');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp && target.template.speciesid === 'stardreamsoulosclockworkstar') {
				this.damage(target.hp - 1, target, target);
				target.formeChange('Star Dream-Soul OS-Heart', this.effect, false, '[msg]');
				this.heal(target.maxhp);
				return null;
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (move.type === 'Psychic' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ghost';
				move.soul0SBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.soul0SBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "soul0system",
		name: "Soul 0 System",
	},
	"shadesoul": {
		desc: "If this Pokemon is The Knight, a situation that would cause it to faint instead forme-changes it into The Knight-Shade.",
		shortDesc: "If The Knight, becomes The Knight-Shade it would otherwise faint and restores to full HP.",
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp && target.template.speciesid === 'theknight') {
				this.damage(target.hp - 1, target, target);
				target.formeChange('The Knight-Shade', this.effect, false, '[msg]');
				this.heal(target.maxhp);
				return null;
			}
		},
		id: "shadesoul",
		name: "Shade Soul",
	},
	"physicalbreakdown": {
		desc: "If this Pokemon is the Chaos Kin, a situation that would cause it to faint instead forme-changes it into its ashen forme.",
		shortDesc: "If Chaos Kin, becomes Chaos Kin-Ash if it would otherwise faint and restores to half HP.",
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp && target.template.speciesid === 'chaoskin') {
				this.damage(target.hp - 1, target, target);
				target.formeChange('Chaos Kin-Ash', this.effect, false, '[msg]');
				this.heal(target.maxhp / 2);
				return null;
			}
		},
		id: "physicalbreakdown",
		name: "Physical Breakdown",
	},
	"lastditcheffort": {
		desc: "If this Pokemon is 0, a situation that would cause it to faint instead causes the iris to burst out, changing formes and restoring HP.",
		shortDesc: "If Zero (Kirby), becomes Zero-Iris if it would otherwise faint and restores to full HP.",
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (damage >= target.hp && target.template.speciesid === 'zerokirby') {
				this.damage(target.hp - 1, target, target);
				target.formeChange('Zero-Iris', this.effect, false, '[msg]');
				this.heal(target.maxhp);
				return null;
			}
		},
		id: "lastditcheffort",
		name: "Last-Ditch Effort",
	},
	"eternalbeauty": {
		desc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Grass- or Fairy-type attack. If this Pokemon is Soul of Sectonia, she changes forme and unroots herself if she has 1/2 or less of her maximum HP, and changes to Meteor Form if it has more than 1/2 its maximum HP. This check is done on switch-in and at the end of each turn. While in its Meteor Form, it cannot become affected by major status conditions. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "This Pokemon's attacking stat is multiplied by 1.5 while using a Grass- or Fairy-type attack. If Sectonia-Soul, end of turn changes to Soul-Unrooted at 1/2 max HP or less.",
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseTemplate.baseSpecies !== 'Sectonia' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp <= pokemon.maxhp / 2) {
				if (pokemon.template.speciesid === 'sectoniasoul') {
					pokemon.formeChange('Sectonia-Soul-Unrooted');
				}
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' || move.type === 'Fairy') {
				this.debug('Eternal Beauty boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' || move.type === 'Fairy') {
				this.debug('Eternal Beauty boost');
				return this.chainModify(1.5);
			}
		},
		id: "eternalbeauty",
		name: "Eternal Beauty",
	},
	"incorporeal": {
		shortDesc: "This Pokemon's attacks do not make contact with the target. Any moves that otherwise would have 1.2x power.",
		onModifyMove(move) {
			if (move.flags['contact']){
				delete move.flags['contact'];
				move.incorporealBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.incorporealBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		id: "incorporeal",
		name: "Incorporeal",
	},
	"supercharge": {
		desc: "If this Pokemon is a Creeper and takes damage from an Electric-type Attack, it forme-changes into a Charged Creeper.",
		shortDesc: "If Creeper, forme-change into Creeper-Charged after taking damage from an Electric-type attack.",
		onAfterDamageOrder: 1,
		onAfterDamage(damage, target, source, move) {
			if (source && source !== target && move && move.type === 'Electric' && target.template.speciesid === 'creeper') {
				target.formeChange('Creeper-Charged', this.effect, false, '[msg]');
			}
		},
		id: "supercharge",
		name: "Supercharge",
	},
	"kroganrage": {
		desc: "This Pokemon's Attack and Speed are both raised by 1 stage if it attacks and knocks out another Pokemon with a Physical attack.",
		shortDesc: "This Pokemon's Attack and Speed are raised by 1 stage if it attacks and KOes another Pokemon via Physical move.",
		onSourceFaint(target, source, effect) {
			if (effect && effect.effectType === 'Move' && effect.category === 'Physical') {
				this.boost({atk: 1, spe: 1}, source);
			}
		},
		id: "kroganrage",
		name: "Krogan Rage",
	},
	"knightmare": {
		desc: "This Pokemon's slash-based moves deal x1.3 damage and bypass type-based immunities.",
		shortDesc: "This Pokemon's slash-based moves deal x1.3 damage and bypass immunities.",
		onModifyMovePriority: -1,
		onModifyMove(move, pokemon) {
			if (['sacredsword', 'leafblade', 'cut', 'nightslash', 'crosspoison', 'slash', 'razorwind', 'airslash', 'furycutter', 'falseswipe', 'psychocut', 'secretsword', 'xscissor', 'swordrainbeta', 'machtornado', 'solarblade', 'invisibleair', 'foilflourish', 'zsaber', 'risingphoenix', 'chargedsaber', 'dashslash', 'greatslash', 'cycloneslash', 'swordofhisou', 'excaliburswordofpromisedvictory', 'rosaichthys', 'underworldkingslash', 'laevateinn', 'demonicrend'].includes(move.id)) {
				move.ignoreImmunity = true;
				move.knightmareBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.knightmareBoosted) {
				this.debug('Knightmare boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		id: "knightmare",
		name: "Knightmare",
	},
	"swordofswords": {
		shortDesc: "This Pokemon deals x1.33 damage with slash-based moves and takes x0.667 damage from slash-based moves.",
		onModifyMovePriority: -1,
		onAnyModifyMove(move, pokemon) {
			if (['sacredsword', 'leafblade', 'cut', 'nightslash', 'crosspoison', 'slash', 'razorwind', 'airslash', 'furycutter', 'falseswipe', 'psychocut', 'secretsword', 'xscissor', 'swordrainbeta', 'machtornado', 'solarblade', 'invisibleair', 'foilflourish', 'zsaber', 'risingphoenix', 'chargedsaber', 'dashslash', 'greatslash', 'cycloneslash', 'swordofhisou', 'excaliburswordofpromisedvictory', 'gladiusanusblauserium', 'rosaichthys', 'underworldkingslash', 'laevateinn', 'demonicrend'].includes(move.id)) {
				move.swordOfSwordsBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onAnyBasePower(basePower, attacker, defender, move) {
			if (move.swordOfSwordsBoosted && [attacker, defender].includes(this.effectData.target)) {
				this.debug('Sword of Swords - Altering damage taken.');
				return this.chainModify([((defender === this.effectData.target) ? 0x0AAC : 0x1547), 0x1000]);
			}
		},
		id: "swordofswords",
		name: "Sword of Swords",
	},
	"swordspirit": {
		shortDesc: "This Pokemon deals x1.5 damage with slash-based moves and takes x0.5 damage from slash-based moves.",
		onModifyMovePriority: -1,
		onAnyModifyMove(move, pokemon) {
			if (['sacredsword', 'leafblade', 'cut', 'nightslash', 'crosspoison', 'slash', 'razorwind', 'airslash', 'furycutter', 'falseswipe', 'psychocut', 'secretsword', 'xscissor', 'swordrainbeta', 'machtornado', 'solarblade', 'invisibleair', 'foilflourish', 'zsaber', 'risingphoenix', 'chargedsaber', 'dashslash', 'greatslash', 'cycloneslash', 'swordofhisou', 'excaliburswordofpromisedvictory', 'gladiusanusblauserium', 'rosaichthys', 'underworldkingslash', 'laevateinn', 'demonicrend'].includes(move.id)) {
				move.swordSpiritBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onAnyBasePower(basePower, attacker, defender, move) {
			if (move.swordSpiritBoosted && [attacker, defender].includes(this.effectData.target)) {
				this.debug('Sword Spirit - Altering damage taken.');
				return this.chainModify(((defender === this.effectData.target) ? 0.5 : 1.5));
			}
		},
		id: "swordspirit",
		name: "Sword Spirit",
	},
	"saberclass": {
		shortDesc: "This Pokemon deals x1.33 damage with slash-based moves.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (['sacredsword', 'leafblade', 'cut', 'nightslash', 'crosspoison', 'slash', 'razorwind', 'airslash', 'furycutter', 'falseswipe', 'psychocut', 'secretsword', 'xscissor', 'swordrainbeta', 'machtornado', 'solarblade', 'invisibleair', 'foilflourish', 'zsaber', 'risingphoenix', 'chargedsaber', 'dashslash', 'greatslash', 'cycloneslash', 'swordofhisou', 'excaliburswordofpromisedvictory', 'gladiusanusblauserium', 'rosaichthys', 'underworldkingslash', 'laevateinn', 'demonicrend'].includes(move.id)) {
				this.debug('Saber Class - Boosting Damage.');
				return this.chainModify([0x1547, 0x1000]);
			}
		},
		id: "saberclass",
		name: "Saber Class",
	},
	
	//These vanilla abilities are overridden, though mostly just to account for custom elements (For instance, Damp blocking Creeper Blast, etc.)
	
	"mummy": {
		desc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy. Does not affect the Battle Bond, Comatose, Disguise, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, and Zen Mode Abilities.",
		shortDesc: "Pokemon making contact with this Pokemon have their Ability changed to Mummy.",
		id: "mummy",
		name: "Mummy",
		onAfterDamage(damage, target, source, move) {
			if (source && source !== target && move && move.flags['contact'] && source.ability !== 'mummy') {
				let oldAbility = source.setAbility('mummy', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Mummy', this.getAbility(oldAbility).name, '[of] ' + source);
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
			if (move.multihitType === 'fourheads' && move.hit > 1) return this.chainModify(0.3);
		},
		rating: 2.5,
		num: 152,
	},
	"damp": {
		desc: "While this Pokemon is active, Explosion, Mind Blown, Self-Destruct, and the Aftermath Ability are prevented from having an effect.",
		shortDesc: "Prevents Explosion/Mind Blown/Self-Destruct/Creeper Blast/Aftermath while this Pokemon is active.",
		id: "damp",
		onAnyTryMove(target, source, effect) {
			if (['explosion', 'mindblown', 'selfdestruct', 'creeperblast'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'aftermath') {
				return false;
			}
		},
		name: "Damp",
		rating: 1,
		num: 6,
	},
	//Expanded abilities start here.
	
	"cursed": {
		shortDesc: "This Pokemon hits Fairy super-effectively with Dark moves, but is weak to Water and takes an additional 2x damage.",
		onSourceEffectiveness(typeMod, target, type, move) {
			if (move && ((type === 'Fairy' && move.type === 'Dark'))) return 1;
			return typeMod;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.type === 'Water') return (target.types[0] === type ? 1 : 0);
			return typeMod;
		}, /* I don't know how to force a 4x weakness so I'm going to do a pro gamer move */
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Cursed strengthen');
				return this.chainModify(2);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Cursed strengthen');
				return this.chainModify(2);
			}
		},
		id: "cursed",
		name: "Cursed",
    },
	"voiceless": {
		shortDesc: "Punching moves 1.5x power, sound moves Physical.",
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('voiceless boost');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move) {
			if (move.flags['sound'] && move.category !== 'Status') {
				move.category = 'Physical';
				delete move.flags['sound'];
			}
		},
		id: "voiceless",
		name: "voiceless",
	},
};
