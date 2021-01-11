"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } const Conditions = {
	reverberation1: {
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.deepClone(this.dex.getMove(this.effectData.moveid));
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 8;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						pokemon.addVolatile('reverberation');
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
						pokemon.removeVolatile('reverberation');
					}
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.deepClone(this.dex.getMove(this.effectData.moveid));
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 16;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						pokemon.addVolatile('reverberation');
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
						pokemon.removeVolatile('reverberation');
					}
					pokemon.removeVolatile('reverberation1');
				}
			}
		},
	},
	reverberation2: {
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.getMove(this.effectData.moveid);
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 8;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						pokemon.addVolatile('reverberation');
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
						pokemon.removeVolatile('reverberation');
					}
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.getMove(this.effectData.moveid);
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 16;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						pokemon.addVolatile('reverberation');
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
						pokemon.removeVolatile('reverberation');
					}
					pokemon.removeVolatile('reverberation2');
				}
			}
		},
	},
	reverberation3: {
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.deepClone(this.dex.getMove(this.effectData.moveid));
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 8;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						pokemon.addVolatile('reverberation');
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
						pokemon.removeVolatile('reverberation');
					}
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.deepClone(this.dex.getMove(this.effectData.moveid));
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 16;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						pokemon.addVolatile('reverberation');
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
						pokemon.removeVolatile('reverberation');
					}
					pokemon.removeVolatile('reverberation3');
				}
			}
		},
	},
	acidicterrain: {
		inherit: true,
		durationCallback(source, effect) {
			if (_optionalChain([source, 'optionalAccess', _ => _.hasItem, 'call', _2 => _2('terrainextender')])) {
				 return 8;
			}
			if (_optionalChain([source, 'optionalAccess', _3 => _3.hasAbility, 'call', _4 => _4('acidrock')])) {
				 return 0;
			}
			return 5;
		},
	},
}; exports.Conditions = Conditions;
