export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['HOME', 'DreamWorld', 'OU', 'UU', 'RU', 'NU', 'PU', '(PU)'],
	},
  init: function() {
     this.modData('Learnsets', 'chansey').learnset.spikes = ['8L1'];
     this.modData('Learnsets', 'toedscruel').learnset.partingshot = ['8L1'];
     this.modData('Learnsets', 'tyranitar').learnset.knockoff = ['8L1'];
     this.modData('Learnsets', 'ironhands').learnset.recover = ['8L1'];
     this.modData('Learnsets', 'brutebonnet').learnset.swordsdance = ['8L1'];
     this.modData('Learnsets', 'lycanrocdusk').learnset.uturn = ['8L1'];
     this.modData('Learnsets', 'tinkaton').learnset.bulletpunch = ['8L1'];
     this.modData('Learnsets', 'zoroark').learnset.moonblast = ['8L1'];
     this.modData('Learnsets', 'rotomheat').learnset.lavaplume = ['8L1'];
     this.modData('Learnsets', 'arboliva').learnset.moonblast = ['8L1'];
     this.modData('Learnsets', 'samurott').learnset.shellsmash = ['8L1'];
     this.modData('Learnsets', 'tatsugiri').learnset.spacialrend = ['8L1'];
     this.modData('Learnsets', 'ironthorns').learnset.shiftgear = ['8L1'];
     this.modData('Learnsets', 'wochien').learnset.strengthsap = ['8L1'];
     this.modData('Learnsets', 'sylveon').learnset.surf = ['8L1'];
     this.modData('Learnsets', 'florges').learnset.leafstorm = ['8L1'];
     this.modData('Learnsets', 'florges').learnset.earthpower = ['8L1'];
     this.modData('Learnsets', 'abomasnow').learnset.partingshot = ['8L1'];
     this.modData('Learnsets', 'espeon').learnset.recover = ['8L1'];
     this.modData('Learnsets', 'jolteon').learnset.spikes = ['8L1'];
     this.modData('Learnsets', 'wigglytuff').learnset.recover = ['8L1'];
     this.modData('Learnsets', 'slaking').learnset.knockoff = ['8L1'];
     this.modData('Learnsets', 'tsareena').learnset.playrough = ['8L1'];
     this.modData('Learnsets', 'gyarados').learnset.acrobatics = ['8L1'];
     this.modData('Learnsets', 'espeon').learnset.quiverdance = ['8L1'];
     this.modData('Learnsets', 'slowbro').learnset.teleport = ['8L1'];
     this.modData('Learnsets', 'mismagius').learnset.focusblast = ['8L1'];
     this.modData('Learnsets', 'magnezone').learnset.earthpower = ['8L1'];
     this.modData('Learnsets', 'cryogonal').learnset.doomdesire = ['8L1'];
     this.modData('Learnsets', 'hippowdon').learnset.mortalspin = ['8L1'];
     this.modData('Learnsets', 'inteleon').learnset.freezedry = ['8L1'];
   },
};
