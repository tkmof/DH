'use strict';

exports.BattleScripts = {

	useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove) {
		if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
		if (sourceEffect && ['instruct', 'custapberry'].includes(sourceEffect.id)) sourceEffect = null;

		let move = this.getActiveMove(moveOrMoveName);
		if (move.id === 'weatherball' && zMove) {
			// Z-Weather Ball only changes types if it's used directly,
			// not if it's called by Z-Sleep Talk or something.
			this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
			if (move.type !== 'Normal') sourceEffect = move;
		}
		if (zMove || (move.category !== 'Status' && sourceEffect && sourceEffect.isZ)) {
			move = this.getActiveZMove(move, pokemon);
		}

		if (this.activeMove) {
			move.priority = this.activeMove.priority;
			if (!move.hasBounced) move.pranksterBoosted = this.activeMove.pranksterBoosted;
		}
		let baseTarget = move.target;
		if (target === undefined) target = this.resolveTarget(pokemon, move);
		if (move.target === 'self' || move.target === 'allies') {
			target = pokemon;
		}
		if (sourceEffect) {
			move.sourceEffect = sourceEffect.id;
			move.ignoreAbility = false;
		}
		let moveResult = false;

		this.setActiveMove(move, pokemon, target);

		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Target changed in ModifyMove, so we must adjust it here
			// Adjust before the next event so the correct target is passed to the
			// event
			target = this.resolveTarget(pokemon, move);
		}
		move = this.runEvent('ModifyMove', pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Adjust again
			target = this.resolveTarget(pokemon, move);
		}
		if (!move || pokemon.fainted) {
			return false;
		}

		let attrs = '';

		let movename = move.name;
		if (move.id === 'hiddenpower') movename = 'Hidden Power';
		if (sourceEffect) attrs += '|[from]' + this.getEffect(sourceEffect);
		if (zMove && move.isZ === true) {
			attrs = '|[anim]' + movename + attrs;
			movename = 'Z-' + movename;
		}
		this.addMove('move', pokemon, movename, target + attrs);

		if (zMove) this.runZPower(move, pokemon);

		if (!target) {
			this.attrLastMove('[notarget]');
			this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
			return false;
		}

		const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);

		if (!sourceEffect || sourceEffect.id === 'pursuit') {
			let extraPP = 0;
			for (const source of pressureTargets) {
				let ppDrop = this.runEvent('DeductPP', source, pokemon, move);
				if (ppDrop !== true) {
					extraPP += ppDrop || 0;
				}
			}
			if (extraPP > 0) {
				pokemon.deductPP(move, extraPP);
			}
		}

		if (!this.singleEvent('TryMove', move, null, pokemon, target, move) ||
			!this.runEvent('TryMove', pokemon, target, move)) {
			move.mindBlownRecoil = false;
			return false;
		}

		this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		if (this.gen !== 4 && move.selfdestruct === 'always') {
			this.faint(pokemon, pokemon, move);
		}

		/** @type {number | false | undefined | ''} */
		let damage = false;
		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage === this.NOT_FAIL) pokemon.moveThisTurnResult = null;
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		} else {
			if (!targets.length) {
				this.attrLastMove('[notarget]');
				this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
				return false;
			}
			if (this.gen === 4 && move.selfdestruct === 'always') {
				this.faint(pokemon, pokemon, move);
			}
			moveResult = this.trySpreadMoveHit(targets, pokemon, move);
		}
		if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
		if (!pokemon.hp) {
			this.faint(pokemon, pokemon, move);
		}

		if (!moveResult) {
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			return false;
		}

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility(['sheerforce', 'abilitytodestroyanything']))) {
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
		}

		return true;
	},
  pokemon: {
    
// 	  getHealth = () => {
// 		  if (!this.hp) return {side: this.side.id, secret: '0 fnt', shared: '0 fnt'};
// 		  let secret = `${this.hp}/${this.maxhp}`;
// 		  let shared;
// 		  const ratio = ((!!('tippedarrowpsychic' in this.volatiles) ? 1 : this.hp) / this.maxhp);
// 		  if (this.battle.reportExactHP) {
// 		  	shared = secret;
// 		  } else if (this.battle.reportPercentages) {
// 		  	// HP Percentage Mod mechanics
// 		  	let percentage = Math.ceil(ratio * 100);
// 		  	if ((percentage === 100) && (ratio < 1.0)) {
// 		  		percentage = 99;
// 		  	}
// 		  	shared = `${percentage}/100`;
// 		  } else {
// 		  	// In-game accurate pixel health mechanics
// 		  	const pixels = Math.floor(ratio * 48) || 1;
// 		  	shared = `${pixels}/48`;
// 		  	if ((pixels === 9) && (ratio > 0.2)) {
// 		  		shared += 'y'; // force yellow HP bar
// 		  	} else if ((pixels === 24) && (ratio > 0.5)) {
// 		  		shared += 'g'; // force green HP bar
// 		  	}
// 		  }
// 		  if (this.status) {
// 		  	secret += ` ${this.status}`;
// 		  	shared += ` ${this.status}`;
// 		  }
// 		  return {side: this.side.id, secret, shared};
// 	  };  
  
	  isGrounded(negateImmunity: boolean = false) {
		  if ('gravity' in this.battle.field.pseudoWeather) return true;
		  if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
		  if ('smackdown' in this.volatiles) return true;
		  const item = (this.ignoringItem() ? '' : this.item);
		  if (item === 'ironball') return true;
		  // If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
		  if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
		  if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
		  if ('magnetrise' in this.volatiles) return false;
		  if ('cycloneslash' in this.volatiles) return false;
		  if ('telekinesis' in this.volatiles) return false;
		  return item !== 'airballoon';
	  },
  },

};
