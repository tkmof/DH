/*
	--TODO--
	Go through each TPDP item and make sure it's implemented properly
*/

export const Items: {[itemid: string]: ItemData} = {
	absorber: {
		name: "Absorber",
		category: 'great',
		onDamagingHit(damage, target, source, move) {
			if (target.getMoveHitData(move).typeMod < 0)
				this.heal(target.baseMaxhp * 0.18);
		},
	},
	almightygodstone: {
		name: "Almighty Godstone",
		category: 'good',
		// Implemented in conditions.ts
	},
	amber: {
		name: "Amber",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fighting' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	amberhairpin: {
		name: "Amber Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return this.chainModify(1.2);
			}
		},
	},
	amethyst: {
		name: "Amethyst",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Poison' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	amethysthairpin: {
		name: "Amethyst Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Poison') {
				return this.chainModify(1.2);
			}
		},
	},
	ancientcoin: { // Useless
		name: "Ancient Coin",
		category: 'bad'
	},
	ancientlunarsake: {
		name: "Ancient Lunar Sake",
		category: 'bad'
	},
	antiaquacharm: {
		name: "Anti-Aqua Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antiboltcharm: {
		name: "Anti-Bolt Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antidarkcharm: {
		name: "Anti-Dark Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antidotecharm: {
		name: "Antidote Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hasStatus(['psn', 'tox'])) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.hasStatus(['psn', 'tox'])) {
				pokemon.cureStatus(['psn', 'tox']);
			}
		},
	},
	antiearthcharm: {
		name: "Anti-Earth Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Earth' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antifightcharm: {
		name: "Anti-Fight Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antifirecharm: {
		name: "Anti-Fire Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antifloracharm: {
		name: "Anti-Flora Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Nature' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antilightcharm: {
		name: "Anti-Light Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Light' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antinecrocharm: {
		name: "Anti-Necro Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Nether' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antisoundcharm: {
		name: "Anti-Sound Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Sound' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antisteelcharm: {
		name: "Anti-Steel Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antitoxincharm: {
		name: "Anti-Toxin Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antiveilcharm: {
		name: "Anti-Veil Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Illusion' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antiwarpcharm: {
		name: "Anti-Warp Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Warped' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	antiwindcharm: {
		name: "Anti-Wind Charm",
		category: 'good',
		isBerry: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Wind' && (target.getMoveHitData(move).typeMod > 0 || this.format.mod.endsWith("tpdp"))) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
	},
	awakeningcharm: {
		name: "Awakening Charm",
		category: 'good',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status['stp']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status['stp']) {
				pokemon.cureStatus('stp');
			}
		},
	},
	bandage: {
		name: "Bandage",
		category: 'poor',
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([5324, 4096]);
			}
		},
	},
	bellhairpin: { //Useless
		name: "Bell Hairpin",
		category: 'bad'
	},
	binoculars: {
		name: "Binoculars",
		category: 'good',
		onModifyAccuracyPriority: 15,
		onFoeModifyAccuracy(relayVar, target, source, move) {
			this.chainModify(0.9);
		},
	},
	blackchoker: {
		name: "Black Choker",
		category: 'great',
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				if (target.useItem()) {
					this.add('-activate', target, "item: Black Choker");
					return target.hp - 1;
				}
			}
		},
	},
	blackring: {
		name: "Black Ring",
		category: 'poor',
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (this.randomChance(1, 10) && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add("-activate", target, "item: Black Ring");
				return target.hp - 1;
			}
		},
	},
	blindingorb: {
		name: "Blinding Orb",
		category: 'bad',
	},
	blitzcharm: {
		name: "Blitz Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile('focusenergy');
		},
	},
	blueearrings: {
		name: "Blue Earrings",
		category: 'good',
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.1);
		},
	},
	boundarytrance: { // Illegal
		name: "Boundary Trance",
		category: 'bad',
	},
	bronzemirror: {
		name: "Bronze Mirror",
		category: 'poor',
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.fullname?.endsWith('Bronze Mirror')) return;
			const boostPlus: SparseBoostsTable = {};
			let statsRaised = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boostPlus[i] = boost[i];
					statsRaised = true;
				}
			}
			if (!statsRaised) return;
			const pokemon: Pokemon = this.effectState.target;
			pokemon.useItem();
			this.boost(boostPlus, pokemon);
		},
	},
	burningstone: {
		name: "Burning Stone",
		category: 'good',
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('brnheavy', pokemon);
		},
	},
	capturerope: {
		name: "Capture Rope",
		onFoeModifyMove(move, pokemon, target) {
			move.selfSwitch = false;
		},
	},
	championsmedal: {
		name: "Champion's Medal",
		category: 'good',
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
	},
	choicebelt: {
		name: "Choice Belt",
		category: 'great',
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock'])
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpePriority: 1,
		onModifySpe(spa, pokemon) {
			return this.chainModify(1.5);
		},
		isChoice: true,
	},
	choiceearrings: {
		name: "Choice Earrings",
		category: 'great',
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock'])
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			return this.chainModify(1.5);
		},
		isChoice: true,
	},
	choicering: {
		name: "Choice Ring",
		category: 'great',
		onStart(pokemon) {
			if (pokemon.volatiles['choicelock'])
				this.debug('removing choicelock: ' + pokemon.volatiles['choicelock']);
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove(move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		onModifyAtkPriority: 1,
		onModifyAtk(spa, pokemon) {
			return this.chainModify(1.5);
		},
		isChoice: true,
	},
	circularamulet: { // Unimplemented
		name: "Circular Amulet",
		category: 'bad'
	},
	claritycharm: {
		name: "Clarity Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.removeVolatile('confusion');
		},
	},
	clearhairpin: {
		name: "Clear Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Illusion') {
				return this.chainModify(1.2);
			}
		},
	},
	columncharm: {
		name: "Column Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({def: 1});
		},
	},
	combathandbook: { // Useless
		name: "Combat Handbook",
		category: 'bad'
	},
	counterbit: {
		name: "Counter Bit",
		category: 'great',
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	couragecharm: {
		name: "Courage Charm",
		category: 'good',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hasStatus(['weak', 'weakheavy'])) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.hasStatus(['weak', 'weakheavy'])) {
				pokemon.cureStatus(['weak', 'weakheavy']);
			}
		},
	},
	crystalmirror: {
		name: "Crystal Mirror",
		category: 'good',
		onFoeImmunity(type, pokemon) {
			if (this.field.isTerrain("byakko") && this.dex.types.isName(type))
				return false;
		},
	},
	curingcharm: {
		name: "Curing Charm",
		category: 'great',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hasStatus() || pokemon.volatiles['confusion']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.cureStatus();
			pokemon.removeVolatile('confusion');
		},
	},
	curseddoll: {
		name: "Cursed Doll",
		category: 'poor',
		onFoeImmunity(type, pokemon) {
			if (this.dex.types.get(type))
				return false;
		},
	},
	deadlysecrets: {
		name: "Deadly Secrets",
		category: 'great',
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(1.2);
			}
		},
	},
	diamond: {
		name: "Diamond",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Void' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	diamondhairpin: {
		name: "Diamond Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Void') {
				return this.chainModify(1.2);
			}
		},
	},
	dispelcharm: {
		name: "Dispel Charm",
		category: 'good',
		isBerry: true,
		onUpdate(pokemon) {
			const conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
			for (const firstCondition of conditions) {
				if (pokemon.volatiles[firstCondition]) {
					if (!pokemon.eatItem()) return;
					for (const secondCondition of conditions) {
						pokemon.removeVolatile(secondCondition);
					}
					return;
				}
			}
		},
	},
	dragonamulet: {
		name: "Dragon Amulet",
		category: 'great',
		onFoeModifyCritRatio(relayVar, source, target, move) {
			return 0;
		},
	},
	dreamshard: { // Illegal
		name: "Dream Shard",
		category: 'bad',
	},
	echeloncharm: {
		name: "Echelon Charm",
		category: 'good',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({evasion: 1});
		},
	},
	emerald: {
		name: "Emerald",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Nature' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	emeraldhairpin: {
		name: "Emerald Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Nature') {
				return this.chainModify(1.2);
			}
		},
	},
	evictionnotice: {
		name: "Eviction Notice",
		category: 'good',
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && source.hp && target.hp && move && move.category !== 'Status') {
				if (!source.isActive || !this.canSwitch(source.side) || source.forceSwitchFlag || target.forceSwitchFlag) {
					return;
				}
				// The item is used up even against a pokemon with Ingrain or that otherwise can't be forced out
				if (target.useItem(source)) {
					if (this.runEvent('DragOut', source, target, move)) {
						source.forceSwitchFlag = true;
					}
				}
			}
		},
	},
	floatingstone: {
		name: "Floating Stone",
		category: 'good',
		onStart(target) {
			if (!target.ignoringItem() && !this.field.getPseudoWeather('gravity')) {
				this.add('-item', target, 'Floating Stone');
			}
		},
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Floating Stone');
			target.item = '';
			target.itemState = {id: '', target};
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('floatingstone'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Floating Stone');
				target.item = '';
				target.itemState = {id: '', target};
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('floatingstone'));
			}
		},
	},
	fluorite: {
		name: "Fluorite",
		category: 'good',
		//Implemented in moves.ts
	},
	foodrations: {
		name: "Food Rations",
		category: 'great',
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
	},
	giantbit: {
		name: "Giant Bit",
		category: 'good',
		onDamagingHit(damage, target, source, move) {
			if (move.basePower >= 100)
				source.damage(source.baseMaxhp / 8);
		},
	},
	goldtalisman: {
		name: "Gold Talisman",
		category: 'good',
		onAfterBoost(boost, target, source, effect) {
			if (boost.atk && target.useItem())
				this.boost({def: boost.atk});
		},
	},
	goldenhairpin: {
		name: "Golden Hairpin",
		category: 'great',
		onModifyDefPriority: 15,
		onModifyDef(relayVar, target, source, move) {
			this.chainModify(1.5);
		},
		onTryMove(source, target, move) {
			if (move.category === "Status")
				return null;
		},
	},
	hakureiamulet: { // Useless
		name: "Hakurei Amulet",
		category: 'bad',
	},
	halogodstone: {
		name: "Halo Godstone",
		category: 'good',
	},
	hastecharm: {
		name: "Haste Charm",
		category: 'good',
		isBerry: true,
		onBeforeMove(source, target, move) {
			if (move.volatileStatus === "twoturnmove") {
				delete move.volatileStatus;
				source.eatItem();
			}
		},
	},
	healingcharm: {
		name: "Healing Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(20);
		},
	},
	heavyarmor: {
		name: "Heavy Armor",
		category: 'poor',
		onFractionalPriority: -0.1,
	},
	hematite: {
		name: "Hematite",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Steel' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	hematitehairpin: {
		name: "Hematite Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Steel') {
				return this.chainModify(1.2);
			}
		},
	},
	hexagoncharm: {
		name: "Hexagon Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spd: 1});
		},
	},
	hopemask: {
		name: "Hope Mask",
		category: 'good',
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
	},
	ironclogs: {
		name: "Iron Clogs",
		onModifySpe(spe, pokemon) {
			this.chainModify(0.5);
		},
	},
	ironwillribbon: {
		name: "Iron Will Ribbon",
		category: 'poor',
		onFoeModifyDamage(relayVar, target, source, move) {
			var moveCount:number = 0;
			for (const move in target.moveSlots) {
				if (move) moveCount++;
			}
			if (moveCount === 3)
				this.chainModify(0.9);
		},
	},
	izanagiobject: {
		name: "Izanagi Object",
		category: 'good',
		onModifySpe(spe, pokemon) {
			if (this.field.isTerrain("kohryu"))
				this.chainModify(1.5);
		},
	},
	jade: {
		name: "Jade",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Wind' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	jadehairpin: {
		name: "Jade Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Wind') {
				return this.chainModify(1.2);
			}
		},
	},
	jarofpoison: {
		name: "Jar of Poison",
		category: 'great',
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hasType('Poison')) {
				this.heal(pokemon.baseMaxhp / 16);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
	},
	javelinarts: {
		name: "Javelin Arts",
		category: 'good',
		onBasePower(relayVar, source, target, move) {
			if (move.flags.javelin)
				this.chainModify(1.2);
		},
	},
	lapishairpin: {
		name: "Lapis Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Warped') {
				return this.chainModify(1.2);
			}
		},
	},
	lapislazuli: {
		name: "Lapis Lazuli",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Warped' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	largeshield: {
		name: "Large Shield",
		category: 'poor',
		onSourceModifyDamage(relayVar, source, target, move) {
			if (move) {
				switch (target.getMoveHitData(move).typeMod) {
					case 1:
						this.chainModify(2);
						break;
					case -1:
						this.chainModify(0.5);
						break;
				}
			}
		},
	},
	laylasamulet: { // Useless
		name: "Layla's Amulet",
		category: 'bad'
	},
	lifecharm: {
		name: "Life Charm",
		category: 'good',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 4);
		},
	},
	lightcharm: {
		name: "Light Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status['dark']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status['dark']) {
				pokemon.cureStatus('dark');
			}
		},
	},
	magicring: {
		name: "Magic Ring",
		category: 'good',
		onModifyCritRatio(relayVar, source, target, move) {
			return relayVar + 1;
		},
	},
	massagecharm: {
		name: "Massage Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hasStatus(['par', 'shk'])) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.hasStatus(['par', 'shk'])) {
				pokemon.cureStatus(['par', 'shk']);
			}
		},
	},
	morganite: {
		name: "Morganite",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Illusion' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	nativegrace: { // Useless
		name: "Native Grace",
		category: 'bad'
	},
	obsidian: {
		name: "Obsidian",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Dark' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	obsidianhairpin: {
		name: "Obsidian Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Dark') {
				return this.chainModify(1.2);
			}
		},
	},
	ointmentcharm: {
		name: "Ointment Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hasStatus(['brn', 'brnheavy'])) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.hasStatus(['brn', 'brnheavy'])) {
				pokemon.cureStatus(['brn', 'brnheavy']);
			}
		},
	},
	onyx: {
		name: "Onyx",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Sound' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	onyxhairpin: {
		name: "Onyx Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Sound') {
				return this.chainModify(1.2);
			}
		},
	},
	opal: {
		name: "Opal",
		category: 'good',
		isBerry: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Light' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	opalhairpin: {
		name: "Opal Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Light') {
				return this.chainModify(1.2);
			}
		},
	},
	outlookglasses: {
		name: "Outlook Glasses",
		category: 'good',
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] item: Outlook Glasses', '[of] ' + pokemon, '[identify]');
				}
			}
		},
	},
	pinpointcharm: {
		name: "Pinpoint Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({accuracy: 1});
		},
	},
	puresand: {
		name: "Pure Sand",
		category: 'good',
		onFoeModifyAccuracy(relayVar, target, source, move) {
			if (this.field.isTerrain("genbu"))
				this.chainModify(0.5);
		},
	},
	purifycharm: {
		name: "Purify Charm",
		category: 'good',
		isBerry: true,
		onAfterBoost(boost, target, source, effect) {
			const revertBoosts:Partial<BoostsTable> = {};
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					revertBoosts[i]! = boost[i]! * -1;
				}
			}
			this.boost(revertBoosts);
			target.eatItem();
		},
	},
	quartzhairpin: {
		name: "Quartz Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Earth') {
				return this.chainModify(1.2);
			}
		},
	},
	radianthairpin: {
		name: "Radiant Hairpin",
		category: 'great',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			function remap(value:number, low1:number, high1:number, low2:number, high2:number):number {
				return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
			}

			if (user.hp >= user.maxhp * 0.99) 
				return this.chainModify(remap(user.hp/user.maxhp, 0.99, 1, 1.2, 1.3));
			else
				return this.chainModify(remap(user.hp/user.maxhp, 0, 0.99, 0, 1.2));
		},
	},
	rebelliontome: {
		name: "Rebellion Tome",
		category: 'good',
		onDamagingHit(damage, target, source, move) {
			if (target.getMoveHitData(move).typeMod > 0)
				this.boost({atk: 2, spa: 2});
		},
	},
	redring: {
		name: "Red Ring",
		category: 'good',
		onModifyAtkPriority: 1,
		onModifyAtk(spa, pokemon) {
			return this.chainModify(1.1);
		},
	},
	reflectbit: {
		name: "Reflect Bit",
		category: 'great',
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	reliefcharm: {
		name: "Relief Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.status['fear']) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			if (pokemon.status['fear']) {
				pokemon.cureStatus('fear');
			}
		},
	},
	repetitivearts: {
		name: "Repetitive Arts",
		category: 'good',
		onStart(pokemon) {
			pokemon.addVolatile('repetitivearts');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasItem('repetitivearts')) {
					pokemon.removeVolatile('repetitivearts');
					return;
				}
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				return this.chainModify(this.effectState.numConsecutive ? 1.2 : 1);
			},
		},
	},
	retreatmanual: {
		name: "Retreat Manual",
		category: 'good',
		onAfterMoveSecondaryPriority: 2,
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && target.hp && move && move.category !== 'Status' && !move.isFutureMove) {
				if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.beingCalledBack || target.isSkyDropped()) return;
				if (target.volatiles['commanding'] || target.volatiles['commanded']) return;
				for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return;
				}
				target.switchFlag = true;
				if (target.useItem()) {
					source.switchFlag = false;
				} else {
					target.switchFlag = false;
				}
			}
		},
	},
	rosary: {
		name: "Rosary",
		category: 'good',
		onModifyAccuracy(relayVar, target, source, move) {
			this.chainModify(0.9);
		},
	},
	rotationcharm: {
		name: "Rotation Charm",
		category: 'poor',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in pokemon.boosts) {
				if (stat !== 'accuracy' && stat !== 'evasion' && pokemon.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 2;
				this.boost(boost);
			}
		},
	},
	ruby: {
		name: "Ruby",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Fire' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	rubyhairpin: {
		name: "Ruby Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fire') {
				return this.chainModify(1.2);
			}
		},
	},
	sandgodstone: {
		name: "Sand Godstone",
		category: 'good',
	},
	sapphire: {
		name: "Sapphire",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Water' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	sapphirehairpin: {
		name: "Sapphire Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Water') {
				return this.chainModify(1.2);
			}
		},
	},
	sereingodstone: {
		name: "Serein Godstone",
		category: 'good',
	},
	silentgodstone: {
		name: "Silent Godstone",
		category: 'good',
	},
	silverhairpin: {
		name: "Silver Hairpin",
		category: 'great',
		onModifyDefPriority: 15,
		onModifySpD(relayVar, target, source, move) {
			this.chainModify(1.5);
		},
		onTryMove(source, target, move) {
			if (move.category === "Status")
				return null;
		},
	},
	silvertalisman: {
		name: "Silver Talisman",
		category: 'good',
		onAfterBoost(boost, target, source, effect) {
			if (boost.spa && target.useItem())
				this.boost({spd: boost.spa});
		},
	},
	skirmishercharm: {
		name: "Skirmisher Charm",
		category: 'great',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spe: 1});
		},
	},
	smallbit: {
		name: "Small Bit",
		category: 'good',
		onDamagingHit(damage, target, source, move) {
			if (move.basePower <= 70)
				source.damage(source.baseMaxhp / 8);
		},
	},
	spirittorch: {
		name: "Spirit Torch",
		category: 'good',
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (this.field.isTerrain("suzaku")) {
				for (const foe of pokemon.foes()) {
					foe.damage(foe.baseMaxhp/8);
				}
			}
		},
	},
	strawdoll: {
		name: "Straw Doll",
		category: 'great',
		onModifyDamage(damage, source, target, move) {
			return this.chainModify(1.3);
		},
		onAfterMoveSecondary(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.items.get('strawdoll'));
			}
		},
	},
	sturdyrope: {
		name: "Sturdy Rope",
		category: 'poor',
		//Implemented in conditions.ts
	},
	substitutetag: {
		name: "Substitute Tag",
		category: 'good',
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
	},
	sugilite: {
		name: "Sugilite",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Nether' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	sugilitehairpin: {
		name: "Sugilite Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Nether') {
				return this.chainModify(1.2);
			}
		},
	},
	telescope: {
		name: "Telescope",
		category: 'good',
		onFoeModifyAccuracy(relayVar, defender, pokemon, move) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				return this.chainModify(0.8);
			}
		},
	},
	tengugeta: {
		name: "Tengu Geta",
		category: 'great',
		// Implemented in conditions.ts
	},
	thorncharm: {
		name: "Thorn Charm",
		category: 'good',
		isBerry: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === "Physical") {
				source.damage(source.baseMaxhp/8);
			}
		},
	},
	tigereye: {
		name: "Tiger Eye",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Earth' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	topaz: {
		name: "Topaz",
		category: 'good',
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Electric' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
	},
	topazhairpin: {
		name: "Topaz Hairpin",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Electric') {
				return this.chainModify(1.2);
			}
		},
	},
	tsuzumidrum: {
		name: "Tsuzumi Drum",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			for (const moveSlot of user.moveSlots) {
				var moveData = this.dex.moves.get(moveSlot.move);
				if (moveData.category !== 'Status' && user.hasType(moveData.type)) {
					return;
				}
			}

			this.chainModify(1.3);
		},
	},
	twilightgodstone: {
		name: "Twilight Godstone",
		category: 'good',
	},
	veecharm: {
		name: "Vee Charm",
		category: 'good',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spa: 1});
		},
	},
	wedgecharm: {
		name: "Wedge Charm",
		category: 'good',
		isBerry: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 &&
					pokemon.hasAbility('worrywart') && pokemon.abilityState.worrywart)) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({atk: 1});
		},
	},
	wolfsbaneroot: {
		name: "Wolfsbane Root",
		category: 'good',
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('tox', pokemon);
		},
	},
	woodensword: { // Useless
		name: "Wooden Sword",
		category: 'bad'
	},
	yggdrasilseed: {
		name: "Yggdrasil Seed",
		category: 'good',
		onBasePowerPriority: 15,
		onBasePower(relayVar, source, target, move) {
			if (this.field.isTerrain('seiryu'))
				this.chainModify(1.5);
		},
		onFoeBasePowerPriority: 15,
		onFoeBasePower(relayVar, source, target, move) {
			if (this.field.isTerrain('seiryu'))
				this.chainModify(1.5);
		},
	},
	youmascrollblack: {
		name: "Youma Scroll: Black",
		category: 'specific'
		//Handled in Bibliophilia ability
	},
	youmascrollblue: {
		name: "Youma Scroll: Blue",
		category: 'specific'
		//Handled in Bibliophilia ability
	},
	youmascrollred: {
		name: "Youma Scroll: Red",
		category: 'specific'
		//Handled in Bibliophilia ability
	},
	youmascrollwhite: {
		name: "Youma Scroll: White",
		category: 'specific'
		//Handled in Bibliophilia ability
	},
};
