export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
   	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['ReGeneration', 'ReGeneration NFE', 'ReGeneration LC'],
		customDoublesTiers: ['ReGeneration', 'ReGeneration NFE', 'ReGeneration LC'],
	   },
		init: function () {
		   this.modData("Learnsets", "alakazam").learnset.brainwave = ["8L1"];

		   this.modData("Learnsets", "gengar").learnset.avalanche = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.blizzard = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.focusenergy = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.frostbreath = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.icebeam = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.iceshard = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.powdersnow = ["8L1"];
		   this.modData("Learnsets", "gengar").learnset.snowscape = ["8L1"];

		   this.modData("Learnsets", "dragonite").learnset.barrier = ["8L1"];
		   this.modData("Learnsets", "dragonite").learnset.guardiandive = ["8L1"];
		   this.modData("Learnsets", "dragonite").learnset.uturn = ["8L1"];

		   this.modData("Learnsets", "venusaur").learnset.aromaticmist = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.calmmind = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.dazzlinggleam = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.drainingkiss = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.fairywind = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.floralhealing = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.flowershield = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.healpulse = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.playrough = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.psychic = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.vitalenergy = ["8L1"];
		   this.modData("Learnsets", "venusaur").learnset.zenheadbutt = ["8L1"];

		   this.modData("Learnsets", "charizard").learnset.ceaselessedge = ["8L1"];
		   this.modData("Learnsets", "charizard").learnset.throatchop = ["8L1"];
		   this.modData("Learnsets", "charizard").learnset.smokytorment = ["8L1"];
		   this.modData("Learnsets", "charizard").learnset.suckerpunch = ["8L1"];

		   this.modData("Learnsets", "blastoise").learnset.chargebeam = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.charge = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.iondeluge = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.powerwash = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.thunder = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.thunderwave = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.thunderbolt = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.thundershock = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.voltswitch = ["8L1"];
		   this.modData("Learnsets", "blastoise").learnset.zapcannon = ["8L1"];

		   this.modData("Learnsets", "beedrill").learnset.closecombat = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.flail = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.reversal = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.spikes = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.stickyweb = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.taunt = ["8L1"];
		   this.modData("Learnsets", "beedrill").learnset.terablast = ["8L1"];

		   this.modData("Learnsets", "pidgeot").learnset.acrobatics = ["8L1"];
		   this.modData("Learnsets", "pidgeot").learnset.closecombat = ["8L1"];

			delete this.modData('Learnsets', 'alakazam').learnset.focusblast;	
			delete this.modData('Learnsets', 'alakazam').learnset.nastyplot;	

			delete this.modData('Learnsets', 'gengar').learnset.focusblast;	
			delete this.modData('Learnsets', 'gengar').learnset.nastyplot;	
			delete this.modData('Learnsets', 'gengar').learnset.terablast;	
			delete this.modData('Learnsets', 'gengar').learnset.thunderbolt;	
			delete this.modData('Learnsets', 'gengar').learnset.thunder;	

			delete this.modData('Learnsets', 'dragonite').learnset.dragonclaw;	
			delete this.modData('Learnsets', 'dragonite').learnset.dragondance;	
			delete this.modData('Learnsets', 'dragonite').learnset.dragonrush;	
			delete this.modData('Learnsets', 'dragonite').learnset.dualwingbeat;
			delete this.modData('Learnsets', 'dragonite').learnset.honeclaws;
			delete this.modData('Learnsets', 'dragonite').learnset.outrage;	
			delete this.modData('Learnsets', 'dragonite').learnset.poweruppunch;
			delete this.modData('Learnsets', 'dragonite').learnset.terablast;		

			delete this.modData('Learnsets', 'venusaur').learnset.earthpower;	
			delete this.modData('Learnsets', 'venusaur').learnset.weatherball;

			delete this.modData('Learnsets', 'blastoise').learnset.aurasphere;	
			delete this.modData('Learnsets', 'blastoise').learnset.avalanche;	
			delete this.modData('Learnsets', 'blastoise').learnset.blizzard;	
			delete this.modData('Learnsets', 'blastoise').learnset.focusblast;	
			delete this.modData('Learnsets', 'blastoise').learnset.hail;
			delete this.modData('Learnsets', 'blastoise').learnset.icebeam;
			delete this.modData('Learnsets', 'blastoise').learnset.icepunch;		
			delete this.modData('Learnsets', 'blastoise').learnset.icywind;
			delete this.modData('Learnsets', 'blastoise').learnset.mist;
			delete this.modData('Learnsets', 'blastoise').learnset.shellsmash;	

			delete this.modData('Learnsets', 'pidgeot').learnset.toxic;	

};
