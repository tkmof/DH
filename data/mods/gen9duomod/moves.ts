export const Moves: {[moveid: string]: MoveData} = {
  blueshell: {
		num: 9001,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Blue Shell",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
   	onModifyMove(move, source, target) {
      	const userSide = source.side.pokemon.filter(ally => ally === source || !ally.fainted && !ally.status);
      	const targetSide = target.side.pokemon.filter(ally => ally === target || !ally.fainted && !ally.status);
			if (userSide.length < targetSide.length) {move.basePower = 140;}
      	else {move.basePower = 70;}
    	},
		secondary: null,
		target: "allAdjacent",
		type: "Rock",
		zMove: {basePower: 140},
		maxMove: {basePower: 140},
		contestType: "Tough",
	},

	doubledab: {
		num: 9002,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Bonemerang",
		pp: 1,
		noPPBoosts: true,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
		multihit: 2,
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
		maxMove: {basePower: 130},
		contestType: "Tough",
	},

	exobash: {
		num: 9003,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let power = Math.floor(25 * target.getStat('def') / pokemon.getStat('def')) + 1;
			if (!isFinite(power)) power = 1;
			if (power > 150) power = 150;
			this.debug(`${power} bp`);
			return power;
		},
		category: "Physical",
		name: "Exo Bash",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	
	extremebeam: {
		num: 9004,
		accuracy: 99,
		basePower: 250,
		category: "Special",
		desc: "If this move is successful, the user begins to Bide.",
		shortDesc: "User Bides. Priority -6.",
		name: "EXTREME BEAM",
		pp: 5,
		priority: -6,
		flags: {recharge: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Photon Geyser", target);
		},
		self: {
			volatileStatus: 'bide',
		},
		condition: {
			duration: 2,
			onLockMove: 'bide',
		},		
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},	

	gelatinize: {
		num: 9005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gelatinize",
		pp: 10,
		priority: 1,
		flags: {snatch: 1},
		onTryHit(target) {
			if (target.getAbility().isPermanent || target.ability === 'magicbounce' || target.ability === 'truant') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('magicbounce');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Magic Bounce', '[from] move: Gelatinize');
				return;
			}
			return false;
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	
	herbaljuice: {
		num: 9008,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Herbal Juice",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'herbaljuice',
		condition: {
			duration: 5,
			onTakeItem(item, pokemon, source) {
				if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
					this.add('-message', "The Herbal Juice kept ", source.name, " alert enough to block the attempt!");
					return false;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Herbal Juice');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-sideend', side, 'Herbal Juice');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Grass",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	
};
