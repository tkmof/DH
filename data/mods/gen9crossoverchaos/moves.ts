/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.
*/

export const Moves: {[k: string]: ModdedMoveData} = {

	dededehammerthrow: {
		num: -1,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		shortDesc: "Lowers user Attack by 1. Inflicts burns on contact with the user before it moves.",
		name: "Dedede Hammer Throw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
    beforeTurnCallback(pokemon) {
			pokemon.addVolatile('dededehammerthrow');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Dedede Hammer Throw');
			},
			onHit(pokemon, source, move) {
				if (move.flags['contact']) {
					source.trySetStatus('brn', pokemon);
				}
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('dededehammerthrow');
		},
    self: {
			boosts: {
				atk: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
	},

  sheikahslate: {
		num: -2,
		accuracy: 100,
		basePower: 90,
		category: "Special",
    shortDesc: "20% chance to burn, freeze or paralyse the target.",
		name: "Sheikah Slate",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
  
  lightarrow: {
		num: -3,
		accuracy: 100,
		basePower: 70,
		category: "Special",
    shortDesc: "Traps target, super-effective against Dark.",
		name: "Light Arrow",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
    onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: {
      chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
};
