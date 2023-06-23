export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['TPDP OU', 'TPDP LC'],
	},
	pokemon: {
		getStatusSlots(): number {
			let statusSlots = 0;
			for (const st in this.status) {
				const s = this.battle.dex.getEffect(st);
				console.log(s);
				if (s.statusSlots)
					statusSlots += s.statusSlots;
			}
			console.log(statusSlots);
			return statusSlots;
		},
		setStatus(
			status: string | string[] | Condition | Condition[],
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities = false,
			force = false
		) {
			if (Array.isArray(status)) {
				for (const s of status) {
					this.setStatus(s);
				}
				return;
			}
			console.log(this.status);
			if (!this.hp) return false;
			let statusSlots = this.getStatusSlots();
			status = this.battle.dex.getEffect(status);
			if (status.statusSlots && statusSlots + status.statusSlots > 2) {
				if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
				}
				return false;
			}

			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (this.status[status.id]) {
				if (status.stackCondition) {
					delete this.status[status.id];
					status = this.battle.dex.conditions.get(status.stackCondition);
				} else if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
					return false;
				}
			}

			if (!ignoreImmunities && status.id &&
					!(source?.hasAbility('corrosion') && ['tox', 'psn'].includes(status.id))) {
				// the game currently never ignores immunities
				if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
					this.battle.debug('immune to status');
					if ((sourceEffect as Move)?.status) {
						this.battle.add('-immune', this);
					}
					return false;
				}
			}
			const prevStatus = this.status;
			if (status.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
				if (!result) {
					this.battle.debug('set status [' + status.id + '] interrupted');
					return result;
				}
			}

			
			this.status = status.id;
			this.statusData = {id: status.id, target: this};
			if (source) this.statusData.source = source;
			if (status.duration) this.statusData.duration = status.duration;
			if (status.durationCallback) {
				this.statusData.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}

			if (status.id && !this.battle.singleEvent('Start', status, this.statusData, this, source, sourceEffect)) {
				this.battle.debug('status start [' + status.id + '] interrupted');
				// cancel the setstatus
				this.status = prevStatus;
				this.statusData = prevStatusData;
				return false;
			}
			if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
				return false;
			}
			return true;
		},
		runImmunity(type: string, message?: string | boolean) {
		if (!type || type === '???') return true;
		if (!(type in this.battle.dex.data.TypeChart)) {
			if (
				//type === 'Void'|| 
				type === 'Nature' || 
				//type === 'Earth' ||
				//type === 'Wind' ||
				type === 'Light' ||
				type === 'Nether' ||
				//type === 'Illusion' ||
				type === 'Sound' ||
				type === 'Warped' ||
				type === 'Dream') return true;
			throw new Error("Use runStatusImmunity for " + type);
		}
		if (this.fainted) return false;

		const negateImmunity = !this.battle.runEvent('NegateImmunity', this, type);
		const notImmune = type === 'Earth' ?
			this.isGrounded(negateImmunity) :
			negateImmunity || this.battle.dex.getImmunity(type, this);
		if (notImmune) return true;
		if (!message) return false;
		if (notImmune === null) {
			this.battle.add('-immune', this, '[from] ability: Air Cushion');
		} else {
			this.battle.add('-immune', this);
		}
		return false;
	}
	},
};
