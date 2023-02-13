// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"
Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
export const Formats: FormatList = [
];
--------------------------------------------------------------------------------
If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [
	// Smogon Pet Mods ///////////////////////////////////////////////////////////////////
	{
		section: "Gen 9 Mods",
		column: 1,
	},
	{
		name: "[Gen 8] Alternatium EX",
		desc: `<b>Alternatium EX</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-ex-slate-1-starter-pack.3701560/">Alternatium EX on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatiumex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon'],
		unbanlist: [
				'Decidueye-Hermit', 'Decidueye-Autumn', 'Typhlosion-Explosive', 'Typhlosion-Warlock', 'Samurott-Foamy', 'Samurott-Rogue', 
				'Oricorio', 'Oricorio-Cheerleader','Oricorio-Pa\u2019u', 'Horrorcorio',
				'Pikachu-Kanto', 'Pikachu-Hoenn', 'Pikachu-Sinnoh', 'Pikachu-Unova', 'Pikachu-Tactic', 'Pikachu-Alola', 'Pikachu-World',
				'Ribombee', 'Ribombee-Totem', 'Araquanid', 'Araquanid-Totem', 'Vikavolt', 'Vikavolt-Totem',
				'Urshifu', 'Urshifu-Erosion', 'Calyrex-Mythic', 'Calyrex-Glacier','Calyrex-Midnight',
				'Kommo-o', 'Rockmo-o', 'Salazzle', 'Salazzle-Ruler', 'Lurantis', 'Lurantio',
				'Mr. Mime', 'Mr. Mime-Prance', 'Stunfisk', 'Stunfisk-Trap',
				'Necrozma', 'Necrozma-Lionheart', 'Necrozma-Batwing', 'Necrozma-Dragon',
				'Braviary-Patriot', 'Braviary-Hisui', 'Lilligant-Bard', 'Mistlegant', 'Electrode-Screwball','Electrode-Ringo',
				'Persian-Bandit', 'Persian-Omen', 'Meowstic-Untethered', 'Meowstic-TwoTales',
				"Indeedee-Devil", "Indeedee-Angel", "Polteageist", "Polteageist-Antique", "Toxtricity-Rock-Star", "Toxtricity-Low-Key", 
				"Articuno-Mistral", "Articuno-Tsunami", "Zapdos", "Charpados", "Moltres", "Bennutres",
				"Marowak", "Alolawak", "Marowak-Alola-Totem", "Enamorus", "Violentine",
				"Dialga", "Archronos", "Palkia", "Palkia-Origin",
				"Basculin-Hot-Headed","Basculectric", "Basculin-Skyship", "Basculegion", "Basculagoon",
				"Magearna", "Magearna-Prototype", "Zarude", "Zarude-Hero",
				"Qwilfish", "Aquattack", "Zoroark-Jorogumo", "Zoroark-Hoarfrost", "Goodra-Tsunade", "Goodra-Symbiotic",
				"Maushold-Raider", "Maushold-Extended", "Oinkologne", "Oinkologne-F", "Dudunsparce", "Dududunsparce",
				"Greninja", "Greninja-Ronin", "Imperil", "Hoopa-Ifrit",
				"Kyurem", "Kyurem-Black", "Kyurem-White", "Xerneas-Dormant", "Xerneas-Justice",
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (speciesTable[template.id]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different formes). ", "You have more than one " + template.id + "."];
				}
				speciesTable[template.id] = true;
			}
		},
	},
	{
		name: "[Gen 8] Book of Enigmas",
		mod: 'bookofenigmas',
		desc: [
			"<b>Book of Enigmas</b>: A Pet Mod that aims to create new Paradox Pokemon based on Ho-oh and Lugia - the sky and the sea, respectively.",
		],
		threads: [
			`&bullet: <a href="https://www.smogon.com/forums/threads/book-of-enigmas-slate-0-the-beginning-custom-abilities-names.3711490/">Thread on Smogon.`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
			'Sceptilite', 'Blazikenite', 'Swampertite', 'Gardevoirite', 'Galladite', 'Alakazite', 'Gyaradosite',
			'Sablenite', 'Mawilite', 'Aggronite', 'Medichamite', 'Manectite', 'Sharpedonite', 'Cameruptite', 
			'Altarianite', 'Absolite', 'Glalitite', 'Salamencite', 'Metagrossite', 'Latiasite', 'Latiosite', 
			'Garchompite', 'Steelixite', 'Beedrillite', 'Pidgeotite', 
			'Blue Orb', 'Red Orb', //this is just copied from ANL's lol
			'Beedrill-Mega', 'Pidgeot-Mega', //?????
			'Weavile', 'Mewtwo', 'Ho-oh', 'Lugia',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['BoE Uber', 'BoE OU', "BoE NFE", "BoE LC"];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Book of Enigmas OU.'];
				}
			}
		},
		validateSet(set, teamHas) { // stolen from SV Specualative
			const species = this.dex.getSpecies(set.species);
			const ability = this.dex.getAbility(set.ability);
			if (!set.hpType === 'Fairy' && !set.hpType === 'Normal') {
				return this.validateSet(set, teamHas);
			} else {
				const terastal = set.hpType;
				set.hpType = 'Fire';
				const fakeValidation = this.validateSet(set, teamHas);
				if (fakeValidation?.length) return fakeValidation;
				set.hpType = terastal;
				return null;
			}
		},
	},
	{
		name: "[Gen 9] Clean Slate Micro 2",
		desc: `Clean Slate.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/clean-slate-micro-2.3696166/">Clean Slate Micro 2</a>`,
		],
		mod: 'csm2',
		ruleset: ['Standard', 'Dynamax Clause'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'CSM2') {
					return [set.species + ' is not useable in Clean Slate Micro 2.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] More Balanced Hackmons",
		desc: `<b>More Balanced Hackmons</b>: A National Dex mod of Balanced Hackmons with new pokemon, moves, and abilities, as well as some additional bans.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-8-more-balanced-hackmons.3644050/">More Balanced Hackmons on Smogon Forums</a>`,
		],
		mod: 'morebalancedhackmons',
		ruleset: [ 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Sleep Clause Mod',
					'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 
					'Species Clause', '+Past'],
		banlist: ['Groudon-Primal', 'Eternatus-Eternamax', 'Arena Trap', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 
					'Moody', 'Parental Bond', 'Protean', 'Octolock', 'Pure Power', 'Shadow Tag',
					'Stakeout', 'Water Bubble', 'Wonder Guard', 'Gengarite', 'Chatter', 'Comatose + Sleep Talk',
					'Libero', 'Neutralizing Gas', 'Gorilla Tactics', 'Contrary'],
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'Zacian' || set.species === 'Zacian-Crowned') {
				if (item === 'rustedsword') {
					set.species = 'Zacian-Crowned';
					set.ability = 'Intrepid Sword';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothblade';
					}
				} else {
					set.species = 'Zacian';
				}
			}
			else if (set.species === 'Zamazenta' || set.species === 'Zamazenta-Crowned') {
				if (item === 'rustedshield') {
					set.species = 'Zamazenta-Crowned';
					set.ability = 'Dauntless Shield';
					let ironHead = set.moves.indexOf('ironhead');
					if (ironHead >= 0) {
						set.moves[ironHead] = 'behemothbash';
					}
				} else {
					set.species = 'Zamazenta';
				}
			}
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			}
		},
	},
	{
		name: "[Gen 8] Poketypos",
		desc: `<b>[Gen 8] Poketypos</b>: A NatDex metagame that alters the names of Pokemon and change said Pokemon to fit their new name.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/pok%C3%A9typos-slate-2-single-stage-pokemon.3711498/">Poketypos on Smogon Forums</a>`,
		],
		mod: 'poketypos',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['Poketypos', 'Poketypos NFE', 'Poketypos LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Poketypos' && template.tier !== 'Poketypos NFE' && template.tier !== 'Poketypos LC') {
					return [set.species + ' is not legal in the Poketypos format.'];
				}
			}
		},
	 },
	{
		section: "Gen 8 Mods",
		column: 1,
	},
	{
		name: "[Gen 8] Abilitypos",
		desc: `<b>Abilitypos</b>: In this Pet Mod, your goal is to take an ability and change a few letters in its name to make it brand new. `,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/abilitypos-slate-3-keen-eye-clear-body-and-inner-focus.3703365/">Abilitypos on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1B2LTJv_UnAG_vDGlmyyA00qL6KcY2aFkZ6NCixbdpmU/edit#gid=1595974891">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon'],
		unbanlist: ['Sceptile', 'Charizard', 'Inteleon', 'Lanturn', 'Larvesta', 'Aggron', 'Sableye', 'Carbink', 'Entei', 'Hatterene', 'Raticate-Alola', 'Lapras'],
		mod: "abilitypos",
	},
	{
		name: "[Gen 8] Alternatium",
		desc: `<b>Alternatium</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-slate-7-slow-twins-slate-also-vote-in-poll.3683767/">Alternatium on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatium',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon', 'Slowbronite', 'Red Orb', 'Blue Orb'],
		unbanlist: [
					'Silvally', 'Silvally-Bug', 'Silvally-Dark', 'Silvally-Dragon', 'Silvally-Electric', 'Silvally-Fairy', 'Silvally-Fighting', 'Silvally-Fire', 'Silvally-Flying', 'Silvally-Ghost', 
					'Silvally-Grass', 'Silvally-Ground', 'Silvally-Ice', 'Silvally-Poison', 'Silvally-Psychic', 'Silvally-Rock', 'Silvally-Steel', 'Silvally-Water', 'Pikachu', 'Pikachu-Rock-Star', 
					'Pikachu-Belle', 'Pikachu-Idol', 'Pikachu-PhD', 'Pikachu-Libre', 'Pikachu-Partner', 'Pikachu-Starter', 'Darmanitan', 'Darmanitan-Zen', 'Darmanitan-Galar', 'Darmanitan-Galar-Zen', 
					'Aegishield', 'Aegislash', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Rotom', 'Rotom-Heat', 'Rotom-Wash', 'Rotom-Frost', 'Rotom-Fan', 'Rotom-Mow', 'Dugtrio', 
					'Dugtrio-Alola', 'Muk', 'Muk-Oilslick', 'Slowbro', 'Slowbro-Galar', 'Slowking', 'Slowking-Galar', 'Tornadus', 'Cummulus', 'Thundurus', 'Thundurus-Therian', 'Landorus', 'Landorus-Bengal', 
					'Vivillon-Fancy', 'Vivillon-Spirit', 'Vivillon-Combat', 'Genesect', 'Genesect-Douse', 'Genesect-Molten', 'Genesect-Freezer', 'Genesect-Type-Delta', 'Groudon', 'Groudon-Primal', 'Kyogre', 
					'Kyogre-Primal', 'Deoxys-Wood', 'Deoxys-Gem', 'Deoxys-Tank', 'Deoxys-Speed', 'Sandslash-Lustrous', 'Sandslash-Alola', 'Ninetales-Steamwork', 'Ninetales-Alola', 'Giratina', 'Giratina-Shadow', 
					'Eternatus', 'Manustorm', 'Exeggutor', 'Exeggutor-Lighthouse', 'Weezing', 'Weezing-King', 'Raticate', 'Raticate-Alola', 'Linoone', 'Linoone-Punk', 'Castform', 'Castform-Firestorm', 
					'Castform-Thunderstorm', 'Castform-Snowy', 'Wormadam', 'Wormadam-Sandy', 'Fibormadam', 'Farfetch\u2019d', 'Farfetch\u2019d-Galar', 'Corsola', 'Corsoul', 'Shaymin', 'Shaymin-Sky', 'Keldeo', 
					'Swordeo', 'Meloetta', 'Meloetta-Fighter', 'Lycanday', 'Lycanroc-Spectre', 'Lycanroc-Dusk', 'Gourgeist', 'Gourgeist-Fae', 'Gourgeist-Pulpy', 'Supergeist', 'Cramorant', 'Cramorant-Swimmer', 
					'Cramorant-Gorging', 'Eiscue', 'Eiscue-Noice', 'Mimikyu', 'Mimikyu-Sparkstone', 'Morpeko-Marsh', 'Morvilant', 'Zygarde-Wyrm', 'Zygarde-Canid', 'Zygarde-Goliath',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (speciesTable[template.id]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different formes). ", "You have more than one " + template.id + "."];
				}
				speciesTable[template.id] = true;
			}
		},
	},
	
	{
		name: "[Gen 8] Black Market",
		mod: "blackmarket",
		desc: [
			`<b>Black Market</b>: A Pet Mod where users build Fakemon over the span of a tournament.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/tournament-black-market-starting-phase.3704607/">Black Market on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/10BkMc61hCnfEc6XpjozDrQ20zMVAt5rArlvjsCENR7I/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Kyurem'], 
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga',
			'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White',
			'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
			'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal',
			'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
			'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z'
		],
	},
	{
		name: "[Gen 1] Burgundy Version",
		desc: `<b>[Gen 1] Burgundy Version</b>: An expansion of the Gen 1 OU metagame that changes some mechanics and adds new Pokemon and moves, both original and from later gens.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-burgundy-version-slate-3-new-moves-voting.3711525/">Burgundy Version on Smogon Forums</a>`,
		],
		mod: 'gen1burgundy',
		ruleset: ['Standard With Dig and Fly', 'Data Mod', 'Allow Tradeback'],
		banlist: ['Uber'],
		unbanlist: ['Anorith', 'Armaldo', 'Meditite', 'Medicham', 'Fletchling', 'Fletchinder', 'Talonflame', 'Sneasel-Hisui', 'Sneasler', 'Snover', 'Abomasnow',
					  ],
    },
	{
		name: "[Gen 8] Bust A Move",
		desc: [
			"<b>Bust A Move</b>: A Pet Mod where previously competitively useless moves are given much needed makeovers.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/bust-a-move-slate-5-sing-synchronoise-and-sparkling-aria.3681338/">Bust A Move on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149hYZMn1N92ofxiBdJEQ78g1EaQdBmex2wHCK3Fyais/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'bustamove',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 
			'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 
			'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Magearna', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian', 'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: "OU",
	},
	{
		name: "[Gen 2] Crystal: Sevii Islands",
		desc: ["<b>Crystal: Sevii Islands</b>- A Gen 2 pet mod that aims to create new Pokemon, items, and moves for the GSC OU Metagame."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/crystal-sevii-islands.3695569/">Crystal: Sevii Islands on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1QL_789vTzxG8An43itUxPonK9ee7ezxH6GCR9dD_JyQ/edit?usp=sharing">Crystal: Sevii Islands spreadsheet</a>`,
		      ],
		mod: 'gen2crystalseviiislands',
		ruleset: ['Standard', 'Data Mod', 'Crystal: Sevii Islands Mod'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 8] Extreme Reboot",
		desc: `A metagame where the types, statuses, moves, abilities, and pokemon are rebooted.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3695749/">Extreme Reboot</a>`,
		],

		mod: 'extremereboot',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod',],
		banlist: ['All Pokemon', 'All Items'],
		unbanlist: [
			'Extreme Ribbit', 'Baobloss', 'Tenquarrel', 'Tradituki', 'Hibarrage', 'Pumking', 'Carboneichus', 'Calmengo', 'Paciphal', 'Hullacane', 'Cylindrake', 
			'Efflor', 'Rantler', 'Zeploom', 'Terraphi', 'Stratophi', 'Pelaphi', 'Sunmola', 'Phantahawk', 'Memilifyy', 'Plantadiomicrisa', 'Terrahephas', 'Parvualias', 
			'Rancicoon', 'Meditoid', 'Yukinooh', 'Misausmia', 'Pavronin', 'Kraklone', 'Crustair', 'Yulisse', 'Totodem', 'Persebloom', 'Persebloom-Frost', 'Hawkmorph', 
			'Gallurise', 'Hensomnia', 'Protectonic', 'Crowbotic', 'Sponjourner', 'Emajanaja', 'Zenphin', 'Technophin', 'Beavair', 'Gyozumo-Spring', 'Gyozumo-Summer', 
			'Onlaxy', 'Infinistar', 'Guareye', 'Curuprowl', 'Fertiri', 'Ruinne', 'Tantton', 'Crimsoil', 'Stakstok', 'Lychy', 'Onigashiba', 'Lunsura', 'Galactagon', 
			'Axolacred', 'Dimetrogem', 'Anhaflara', 'Stormanos', 'Alchemeel', 'Alchemeel-Offense', 'Rasteal', 'Nailberg', 'Hoolican', 'Anchorage', 'Nosferanguis', 
			'Pontiac', 'Sclam', 'Cicaguren', /*'Bozunami', 'Cryptice',*/ 'Mekangiras', 'Mononokero', 'Surfright', 'Potsworth', 'Cloudim', 'Salamoon', 'Salamoon-Allegro', 
			'Gokaeru', 'Himekuji', 'Guroteserp', 'Galaxea', 'Galaxea-Complete', 'Pegathemum', 'Pegathemum-Complete', 'Cyrome-Book', 'Cyrome-Scribe', 'Cyrome-Author', 
			'Darkira', 'Darkira-Ancient', 'Lakera', 'Lakera-Ancient', 'Mew 3.0', 'Solamateru', 'Jirachi-Extreme',
			'Blood Vial', 'Calming Salt', 'Cursed Orb', 'Emblematic Scarf', 'Enigmatic Shield', 'Fell Scythe', 'Gospel Notes', 'Life Gem', 'Maid Dress', 'Metalmorph',
			'Pokemon Standard', 'Power Stone', 'Seasons Gem', 'Tricky Hourglass', 'Platinum Orb', 'Iridescent Orb', 'Frosted Seed',
		],
		onModifySpeciesPriority: 2,
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			if (species.id !== 'extremeribbit') return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.getMove(move.id).type))];
			return {...species, types: types};
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id === 'extremeribbit') return;
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Fusion Evolution UU",
		mod: "feuu",
		desc: [
			`<b>Fusion Evolution Under Used</b>: A micrometa Pet Mod aiming to create more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Red Orb', 'Baton Pass', 'Ninjacross + Heracronite', 'Kokovoir + Gardevoirite', 'Salamencite', 'Charizardite Y', 'Blue Orb', 'Wishirupti + Cameruptite', 'Mawilite', 'Gastrocham + Medichamite', 'Manectite', 'Herasir + Heracronite', 'Herasir + Pinsirite', 'Light Ball', 'Gengarite', 'Sablemime + Sablenite',
		],
		unbanlist: [
			'Volquag', 'Toxalure', 'Kingtsar', 'Tanette', 'Slowton', 
			'Flaant', 'Umbat', 'Chomplim', 'Chomplim-Mega', 'Xotalion', 'Miemie', 'Dusking', 'Jelliswine',
			'Pigapult', 'Lycanserker-Dusk', 'Tapu Lop', 'Tapu Lop-Mega', 'Dragontler', 'Eternabat',
			'Grimmlurk', 'Manicuno-Galar', 'Yacian-Crowned', 'Cryogolem', 'Stoudrago',
			'Grousle', 'Dongoro', 'Slurpum', 
			'Corveot', 'Corveot-Mega', 'Igglyzenta-Crowned', 'Arctres-Galar', 'Garborude', 'Noicity', 'Ferros',
			'Landmaldo-Therian', 'Tentoxys-Defense', 'Strikados-Galar', 'Hooporant',
			'Brontun', 'Mesflame', 'Thornbro-Galar', 'Glidol', 'Pincurchitar', 'Pincurchitar-Mega', 'Snortine', 'Flygalge',
			'Absable', 'Absable-Mega-X', 'Absable-Mega-Y', 'Scolisharp', 'Ninjacross', 'Gossephalon', 'Dracodoom', 
			'Dracodoom-Mega', 'Toucosta', 'Weezlord-Galar', 'Sableior', 'Sableior-Mega', 'Sableior-Meteor', 'Sableior-Meteor-Mega', 
			'Eeluk', 'Maroligatr-Alola', 'Frozerade',
			'Hattaka', 'Glasnow', 'Glasnow-Mega', 'Kokovoir', 'Kyottler', 'Clawliwrath',
			'Meloslash', 'Meloslash-Melee', 'Tornachamp', 'Cofazor', 'Cofazor-Mega', 'Talonsyl', 'Heatki', 
			'Sirsola', 'Noze-Dawn-Wings', 'Noze-Ultra', 'Bruxray', 'Kingdeedee', 'Tapu Koma', 'Hawlazzle',
			'Whimsilotic', 'Vullacham', 'Vullacham-Mega', 'Dracolix', 'Dracolix-Mega', 'Serpanadel', 'Accelest', 'Buzzeggutor-Alola',
			'Roaramp', 'Roaramp-Mega', 'Glakiss', 'Glakiss-Mega', 'Leafdon',
			'Crustboar', 'Paracoal', 'Arctovic', 'Altarizard', 'Altarizard-Mega-X', 'Altarizard-Mega', 'Sandamar-Alola', 
			'Jirachonator', 'Dredvul', 'Druddifini', 'Swannamence', 'Tyranette-Eternal',
			'Lurodactyl', 'Lurodactyl-Mega', 'Ninelands-Alola', 'Aurorona', 'Monferpa-Unbound', 'Gigacrab', 'Rosenaught', 'Keclyrex-Shadow',
			'Regibee', 'Regibee-Mega', 'Sigileye', 'Darmearna', 'Mr. Ace', 'Deciduskorch', 'Hypnakart', 'Zerclef',
			'Exeggutor-Prime', 'Porygrigus', 'Golisotops',
			'Avarupt', 'Avarupt-Mega', 'Goatitar', 'Goatitar-Mega', 'Fraxshadow', 'Pherogonga', 'Crawmise', 'Wishirupti',
			
			'Torranadus-Therian', 'Togetops', 'Toxicargo', 'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Swalurchin', 'Serpeblim',
			'Azekrow', 'Trapeino', 'Goodevoir', 'Goodevoir-Mega', 'Duramaw', 'Rhybite', 'Oricolyph-Sensu',
			'Grapplor', 'Masquerajah', 'Litleesect', 'Bearyx', 'Fetchey', 'Audiyem', 'Audiyem-Mega',
			'Eelektoad', 'Dialgast', 'Galsola', 'Galsola-Mega', 'Genebro-Galar', 'Hatterune',
			'Deodon-Attack', 'Sharpiskorch', "Sharpiskorch-Mega", "Gourninja", "Cleracross", "Cleracross-Mega", "Aromarel", "Lycansian",
			'Landowak-Alola', 'Emolggron', 'Emolggron-Mega', 'Metagon', 'Hoopagigas-Unbound', 'Nashifu', 'Cramotricity', 'Raibat', 'Darmanitan-Prime',
			'Zarapex', 'Pingar', 'Pingar-Mega', 'Kommo-tot', 'Rotokyu', 'Krookogatr', 'Venuroar', 'Venuroar-Mega', 'Klefilego', 'Rhychomp-Mega', 'Rhychomp',
			'Mr. Basc', 'Gastrocham', 'Manditop', 'Mienpa', 'Vikadrill',
			'Venoqueen', 'Arcalie', 'Yangarde', 
			'Xurkirat', 'Golneton', 'Alakannon', 'Alakannon-Mega', 'Kingfezant', 'Googersby', 
			'Dhelarina', 'Flychu-Alola', 'Haxel', 'Frossharp', 'Tyrantricity-Low-Key', 
			'Champlume', 'Pyraskewda', 'Rotofable', 'Harisect', 'Tapu Pilo', 'Appletom-Wash', 'Phancrozma-Dawn-Wings', 'Phancrozma-Ultra',
			'Toxislash-Alola', 'Tentaterra', 'Minimie', 'Tsarant', 'Golevish-Alola',
			'Manecpig', 'Herasir', 'Magmovire', 'Giga Fini',
			'Impert-Female', 'Impert-Female-Mega', 'Koalicuno-Galar', 'Weezking-Galar', 'Ferrocario', 'Ferrocario-Mega', 'Mukremie', 'Acceldrill', 
			
			'Silvino-Bug', 'Silvino-Dark', 'Silvino-Dragon', 'Silvino-Electric', 'Silvino-Fairy', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Ghost', 'Silvino-Grass', 'Silvino-Ground', 'Silvino-Ice', 
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino-Steel', 'Silvino-Water', 'Silvino',
			
			/*'Silvino-Bug-Mega', 'Silvino-Dark-Mega', 'Silvino-Dragon-Mega', 
			'Silvino-Electric-Mega', 'Silvino-Fairy-Mega', 'Silvino-Fighting-Mega',
			'Silvino-Fire-Mega', 'Silvino-Flying-Mega', 'Silvino-Ghost-Mega', 
			'Silvino-Grass-Mega', 'Silvino-Ground-Mega', 'Silvino-Ice-Mega', 
			'Silvino-Poison-Mega', 'Silvino-Psychic-Mega', 'Silvino-Rock-Mega', 
			'Silvino-Steel-Mega', 'Silvino-Water-Mega',*/ 'Silvino-Mega',
			
			'Litleesect-Douse', 'Litleesect-Shock', 'Litleesect-Burn', 'Litleesect-Chill',
			'Genebro-Galar-Douse', 'Genebro-Galar-Shock', 'Genebro-Galar-Burn', 'Genebro-Galar-Chill',
			
			
			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned', 
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola', 'Salasian-Alola-Mega', 
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Dragancie-Mega", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",

			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
			'Exeggcute',
		],
	},
	{
		name: "[Gen 8] Fusion Evolution RU",
		mod: "feuu",
		desc: [
			`<b>Fusion Evolution Rarely Used</b>: A micrometa Pet Mod aiming to create even-more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-rarely-used-slate-1-results-discussion-not-open-for-submissions.3691700/">Fusion Evolution Rarely Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1oelJdiPECm0guZWA9lIHG0w8xQV2nReGZu5lh2d0qcI/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass', 'Gardevoirite', 'Mawilite', 'Cameruptite', 'Scizorite', 'Glalitite', 'Sablenite', 'Lopunnite', 'Garchompite', 'Venusaurite', 'Pinsirite', 'Medichamite', 'Alakazite', 'Beedrillite', 'Manectite', 'Herasir + Heracronite', 'Charizardite Y', 'Charizardite X', 'Lucarionite', 'Swannamence + Salamencite', 'Diancite', 'Gengarite', 'Sablemime + Sablenite',
		],
		unbanlist: [
			'Torranadus-Therian', 'Togetops', 'Toxicargo', 'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Swalurchin', 'Serpeblim',
			'Azekrow', 'Trapeino', 'Goodevoir', 'Duramaw', 'Rhybite', 'Oricolyph-Sensu',
			'Grapplor', 'Masquerajah', 'Litleesect', 'Bearyx', 'Fetchey', 'Audiyem', 'Audiyem-Mega',
			'Eelektoad', 'Dialgast', 'Galsola', 'Galsola-Mega', 'Hatterune',
			'Deodon-Attack', 'Sharpiskorch', "Sharpiskorch-Mega", "Gourninja", "Cleracross", "Cleracross-Mega", "Aromarel", "Lycansian",
			'Landowak-Alola', 'Emolggron', 'Emolggron-Mega', 'Metagon', 'Hoopagigas-Unbound', 'Nashifu', 'Cramotricity', 'Raibat', 'Darmanitan-Prime',
			'Zarapex', 'Pingar', 'Kommo-tot', 'Rotokyu', 'Krookogatr', 'Venuroar', 'Klefilego', 'Rhychomp',
			'Mr. Basc', 'Gastrocham', 'Manditop', 'Mienpa', 'Vikadrill',  
			'Venoqueen', 'Arcalie', 'Yangarde', 
			'Xurkirat', 'Golneton', 'Alakannon', 'Kingfezant', 'Googersby',
			'Dhelarina', 'Flychu-Alola', 'Haxel', 'Frossharp', 'Tyrantricity-Low-Key', 
			'Champlume', 'Pyraskewda', 'Rotofable', 'Harisect', 'Tapu Pilo', 'Appletom-Wash', 'Phancrozma-Dawn-Wings', 'Phancrozma-Ultra',
			'Toxislash-Alola', 'Tentaterra', 'Minimie', 'Tsarant', 'Golevish-Alola',
			'Manecpig', 'Herasir', 'Magmovire', 'Giga Fini',
			'Impert-Female', 'Impert-Female-Mega', 'Koalicuno-Galar', 'Weezking-Galar', 'Ferrocario', 'Mukremie', 'Acceldrill', 
			
			'Tapu Lop', 'Absable', 'Absable-Mega-X', 'Cofazor', 'Lurodactyl', 'Lurodactyl-Mega', 'Wishirupti', 'Hypnakart', 'Talonsyl', 'Paracoal', 'Avarupt', 'Pherogonga', 
			'Hawlazzle', 'Glakiss', 'Glasnow', 'Glasnow-Mega', 'Dusking', 'Strikados-Galar', 'Regibee',
			'Toxalure', 'Pigapult', 'Eternabat', 'Goatitar', 'Goatitar-Mega', 'Altarizard', 'Serpanadel', 'Crustboar', 'Flaant', 'Keclyrex-Shadow', 'Frozerade', 'Sirsola', 'Snortine',
			'Swannamence', 'Vullacham', 
			
			'Silvino-Bug', 'Silvino-Dark', 'Silvino-Dragon', 'Silvino-Electric', 'Silvino-Fairy', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Ghost', 'Silvino-Grass', 'Silvino-Ground', 'Silvino-Ice', 
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino-Steel', 'Silvino-Water', 'Silvino', 'Silvino-Mega',			
			'Litleesect-Douse', 'Litleesect-Shock', 'Litleesect-Burn', 'Litleesect-Chill',
			
			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned', 
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola', 'Salasian-Alola-Mega', 
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",
			
			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
			'Exeggcute',
		],
	},
	{
		name: "[Gen 8] Fusion Evolution NU",
		mod: "feuu",
		desc: [
			`<b>Fusion Evolution Never Used</b>: A micrometa Pet Mod aiming to create excessively-more-balanced-than-usual "Pokemon Fusions" with unique abilities.`
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-never-used-slate-1-results-not-open-for-submissions.3701949/">Fusion Evolution Never Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1PGYIFPSfjMtA0cGQgjyxnngJ2WODLWIH9v46_upPSOA/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass', 'Salamencite', 'Abomasite', 'Absolite', 'Medichamite', 'Lopunnite', 'Diancite', 'Gengarite', 'Sablemime + Sablenite',
		],
		unbanlist: [
	 		'Rhybite',
			'Appledam', 'Regidurr', 'Duskoma', 'Fraxblade', 'Igglycian-Crowned', 
			'Eiscudile', 'Carcannon', 'Lapfisk', 'Whisdur', 'Emposerker', 'Salasian-Alola',
			"Pelilicky", "Zaponaw-Galar", "Yandos", "Mudscash", "Woopquaza-Mega", "Woopquaza", "Qwilsimian", "Buzzvine", "Solabat",
			"Jellopod", "Jellopod-F", "Espetops", "Regigoss", "Nihitrio",
			"Ferropion", "Scytic", "Dragancie", "Yanturne", "Emberajah",
			"Tornett-Alola", "Togelot", "Aegix", "Dugflame", "Mr. Gar", "Spewtwo", "Spewtwo-Mega-X", "Spewtwo-Mega-Y",
			"Victreegeist-Small", "Dragerigus", "Drudlinks", "Oricroak", "Deciduvolt",
			
			'Claylamar', 'Vishitomb', 'Swampflora', 'Swampflora-Mega', 'Azekrow', 'Trapeino', 'Bearyx', 'Fetchey', "Aromarel", 'Googersby', 'Harisect', 
			'Absable', 'Tapu Lop', 'Hypnakart', 'Hawlazzle', 'Glasnow', 'Paracoal',
			'Swannamence', 'Vullacham', 
			"Krowtom", "Sablemime", "Lycaking-Dusk",
			
			'Silvino-Bug', 'Silvino-Electric', 'Silvino-Fighting',
			'Silvino-Fire', 'Silvino-Flying', 'Silvino-Grass', 'Silvino-Ice', 
			'Silvino-Poison', 'Silvino-Psychic', 'Silvino-Rock', 'Silvino', 'Silvino-Mega',	
			
			'Corveotto', 'Torraaffy', 'Rosadin', 'Mr. Boot-Galar', 'Palpitrik', 'Pikabat', 'Krokocroco', 'Ivycat', 'Tranquorino', 'Kadabeak', 'Vibrachu', 'Chokloom', 'Magmabuzz', 'Mr. Haunt-Galar', "Dartbug",
			'Mariwick', 'Krabsweet', 'Slowmite', 'Eebat', 'Gibloon', 'Mieyu', 'Duspoke', 'Frillnub', 'Dreepig', 'Meowruff-Galar', 'Golidimp', 'Panchanpy', 'Shroolix', 'Noixel', 'Pidgeidee', 'Bronlin', 'Seedpoke-Galar', 'Glitoy', 'Munchyke', 'Venipawn', 'Krelpinch', 'Tirtipek', 'Grinamo', 'Cubodile', 'Snodew', 'Claunchiwag', 'Scymask', 'Fletchee', 'Farsola-Galar', 'Cottonas', 'Snipole', 'Maritten', 'Snogepi', 'Hippee', 'Dwepig', 'Parycoly', 'Charblu', 'Inkshrew-Alola', 'Chewkit', 'Duckgon', 'Larvaura', 'Crabrola', 'Chespew', 'Rowlipede', 'Scor Jr.', 'Porymask', 'Wimbuto', 'Larkiddo', 'Bergmel',
			'Croagma', 'Inktoy', 'Sunkip', 'Sniloon', 'Rhyble', 'Goolts', 'Clobbgar', 'Sursfant', 'Hatamask-Galar', 'Tynapole', "Meowruff", "Carvipede", "Froakaboo", "Spritdoof", "Beldino", "Pibat", "Darumaka-Prime", "Totosand", "Bulbalit", 'Vullarogue', 'Grubbur', 'Purrlithe', 'Venoran-F', 'Zubnemite', 'Abripek', 'Nidove-M', 'Gooby', 'Pinchu', 'Buixew', 'Pawnrunt', 'Tyrunxel', 'Shellitite', 'Oddchop', 'Makuras', 'Litlokuda', 'Croagshrew-Alola', 'Tentatwig', 'Magkid', 'Elecoink', 'Ferrolu', 'Koffipoke-Galar', 'Shelbur', 'Grimcery',
			'Burmlin', 'Axedge', 'Rolypek', 'Piplouth-Galar', 'Bagouth-Alola', "Mudboach", "Lickigull", "Frillopod", "Frillopod-F", "Eevuto", "Yannea", "Cupig", "Digling", "Gas Jr.", "Rockoran-M", "Rowbbin", "Maskrelp", "Bellaboo-Small",
			'Exeggcute',
		],
	},
	{
	name: "[Gen 1] FutureProofing",
	   desc: `<b>[Gen 1] FutureProofing</b>: Adapting Dark, Steel, and Fairy-type moves and Pokemon to the Gen 1 OU metagame.`,
	   threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	   ],
      mod: 'gen1futureproofing',
      ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
		unbanlist: ['Tyranitar', 'Gardevoir', 'Escavalier', 'Karrablast', 'Ralts', 'Kirlia', 'Pupitar', 'Larvitar',
					   'Snarl', 'Steel Wing', 'Strange Steam',
					   'Deino', 'Zweilous', 'Hydreigon', 'Scizor', 'Cottonee', 'Whimsicott', 
						'Nature\'s Madness', 'Fake Tears', 'Gear Up',
						'Steelix', 'Spiritomb', 'Swablu', 'Altaria',
						'Fleur Cannon', 'Taunt', 'Heavy Slam',
						'Yveltal', 'Skarmory', 'Tapu Koko',
						'Lash Out', 'Crafty Shield', 'Sunsteel Strike',
						'Cacnea', 'Cacturne', 'Duraludon', 'Milcery', 'Alcremie', 
						'Zigzagoon-Galar', 'Linoone-Galar', 'Obstagoon', 'Stunfisk-Galar', 'Mimikyu', 'Mimikyu-Busted', 
						'Oshawott', 'Dewott', 'Samurott-Hisui', 'Riolu', 'Lucario', 'Popplio', 'Brionne', 'Primarina',
						'Grimmsnarl', 'Impidimp', 'Morgrem', 'Sylveon', 'Diglett-Alola', 'Dugtrio-Alola',
						'Magnezone', 'Houndour', 'Houndoom', 'Cutiefly', 'Ribombee',
						'Zarude', 'Zarude-Dada', 'Vulpix-Alola', 'Ninetales-Alola', 'Piplup', 'Prinplup', 'Empoleon',
					  ],
    },
	{
		name: "[Gen 3] Hoenn Gaiden",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-the-gen-3-pet-mod-round-1-discussion.3681339/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3hoenngaiden',
		ruleset: ['Standard', 'Data Mod', 'Baton Pass Mod', 'Freeze Clause Mod', 'Hoenn Gaiden Mod'],
		banlist: ['Uber', 'Air Balloon', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Baton Pass + Ingrain'],
		unbanlist: [
			//Abilities
			'Sand Veil',
		],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 3] Hoenn Gaiden UU",
		desc: ["<b>Hoenn Gaiden</b>: A Gen 3 pet mod that aims to devamp Gen 4-8 Pokemon, moves and items into the Gen 3 mechanics."],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/hoenn-gaiden-the-gen-3-pet-mod-round-1-discussion.3681339/">Hoenn Gaiden on Smogon Forums</a>`,
		],

		mod: 'gen3uuhoenngaiden',
		searchShow: false,
		ruleset: ['[Gen 3] Hoenn Gaiden'],
		banlist: ['OU', 'UUBL', 'Snow Warning'],
		unbanlist: [],
	},
	{
		name: "[Gen 8] JolteMons",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'joltemons',	
		teambuilderFormat: 'OU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Dragapult', 'Tornadus-Therian', 'Blaziken', 'Greninja-Ash', 'Moody', 'Shaymin-Sky', 'Kangaskhan-Mega', 'Darmanitan-Galar', 'Metagross-Mega'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Arceus', 'Blazikenite', 'Blastoisinite', 'Darkrai', 'Deoxys-Base', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Gengarite', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Berserk Gene', 'Eevee-Starter', 'Pikachu-Starter', 'Moody', 'Magearna', 'Spectrier', 'Dracovish', 'Urshifu-Base',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Decidium Z', 'Kommonium Z',
					'Soul Blade Lvl. 2', 'Soul Blade Lvl. 3', 'Soul Blade Lvl. 4', 'Soul Blade Lvl. 5', 'Ultra Soul Blade',
					'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang'],
	},
	{
		name: "[Gen 8] Legends: Hoopa",
		desc: [
			"<b>A New Legend</b>: A Pet Mod that aims to create a hypothetical new entry in a full Pokemon Legends subseries - Pokemon Legends Hoopa.",
		],
		threads: [
			`&bullet: <a href="https://www.smogon.com/forums/threads/a-new-legend-hoopa.3703382/">Thread on Smogon.`,
			`&bullet: <a href="https://docs.google.com/spreadsheets/d/1oBcQpXGar8CwoBpqbIa7Y1gVbx7HwtqtXMy_c017OoY/edit?usp=sharing">Spreadsheet.`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Legends Boosts Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
			'Sceptilite', 'Blazikenite', 'Swampertite', 'Gardevoirite', 'Galladite', 'Alakazite', 'Gyaradosite',
			'Sablenite', 'Mawilite', 'Aggronite', 'Medichamite', 'Manectite', 'Sharpedonite', 'Cameruptite', 
			'Altarianite', 'Absolite', 'Glalitite', 'Salamencite', 'Metagrossite', 'Latiasite', 'Latiosite', 
			'Garchompite', 'Steelixite', 'Beedrillite', 'Pidgeotite', 
			'Blue Orb', 'Red Orb',
			'Dragon Ascent', 'Hidden Power', //fuck Unown I'm not coding this sorry
			'Beedrill-Mega', 'Pidgeot-Mega', //?????
		],
		mod: 'legendshoopa',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['ANL OU', "ANL NFE", "ANL LC"];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Pokemon Legends: Hoopa OU.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] M4A OU (Natdex)",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Plays like National Dex, just with more Megas.",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		mod: 'm4av6',
		// teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] Megas for All: Kalos",
		desc: ["<b>Megas for All</b>: A Pet Mod that aims to create unique Mega Evolutions for every fully evolved Pokémon. Current season is focused on the Kalos dex!",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Z-Move Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		banlist: [
			'AG', 'Uber',
			'Aegislash', 'Hoopa-Unbound', 'Greninja',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Baton Pass',
			'Bright Powder', 'Lax Incense', 'King\'s Rock', 'Razor Fang', 'Quick Claw',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Mega' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.getSpecies(set.species);
			let item = this.dex.getItem(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.getSpecies(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
		mod: 'm4akalos',
	},
	{
		name: "[Gen 8] M4A VGC",
		desc: ["Megas for All v7 but it's a VGC format",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Mega Data Mod'],
		mod: 'm4av6',
		// teambuilderFormat: 'S',
		onValidateSet(set) {
			// These Pokemon are still unobtainable
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.getSpecies(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
		},
	},
	{
		name: "[Gen 8] M4A Sandbox",
		desc: ["Megas for All v7 but it's Custom Game. Add custom typings and stats via Sandbox Mod!",
		      ],
		threads: [
				`&bullet; <a href="https://docs.google.com/document/d/1hhF49OIQKot72C30mCzSwxYgb3Ephhm9KCL_nMPrCW0/edit">Sandbox Mod Usage Guide</a>`,
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		searchShow: false,
		// now intended as a custom game-esque format with more freedom for testing
		ruleset: ['Team Preview', 'Cancel Mod', 'HP Percentage Mod', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Data Mod', 'Mega Data Mod', 'Sandbox Mod', 'Overflow Stat Mod'],
		mod: 'm4asandbox',
	},
	{
		name: "[Gen 6] Megas Revisited",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-6-megas-revisited-slate-2-submissions.3713949/">Megas Revisited on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1wK11cPHnPCmH7JFss6leKW6_-cumn3DuZA-YMzrzF-U/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen6megasrevisited',
		ruleset: ['Standard', 'Swagger Clause', 'Mega Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass',
					"Charizardite X", "Beedrillite", "Pidgeotite", "Alakazite", "Slowbronite", "Gengarite", 
					"Kangaskhanite", "Pinsirite", "Gyaradosite", "Aerodactylite", "Mewtwonite X", "Mewtwonite Y", "Ampharosite", "Steelixite", "Scizorite",
					"Heracronite", "Tyranitarite", "Sceptilite", "Blazikenite", "Swampertite", "Gardevoirite", "Sablenite", "Mawilite",
					"Aggronite", "Medichamite", "Manectite", "Sharpedonite", "Cameruptite", "Altarianite", "Absolite", "Salamencite",
					"Metagrossite", "Latiasite", "Latiosite", "Garchompite", "Abomasite", "Galladite", "Diancite"
					],
	},
	/*
	{
		name: "[Gen 8] Metamorphosis",
		desc: [
			"<b>Metamorphosis</b>: A mod that adds brand new forme changes to existing Pokemon.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/metamorphosis-slate-3-liepard-delcatty-meowstic.3683773/">Metamorphosis on Smogon Forums</a>`,
		],

		mod: 'gen8',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 'Darkrai', 'Darmanitan-Galar',
            'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed', 'Dialga', 'Dracovish', 'Dragapult', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina',
            'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega',
            'Lugia', 'Lunala', 'Magearna', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
            'Necrozma-Ultra', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian',
            'Urshifu-Base', 'Xerneas', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde-Base', 'Zygarde-Complete',
            'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass'
		],
	},
	*/
	{
		name: "[Gen 8] MetaMons",
		desc: [
			"In this Pet Mod, we will aim to create a decently-sized micrometa that will expand in the unique niches of some Pokémon, giving them the spotlight after all the time they have been waiting.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/metamons-slate-3-galarian-slowbro-sableye-grapploct.3703361/">MetaMons</a>',
			'&bullet; <a href="https://docs.google.com/spreadsheets/d/142lxuFtTgQCY56Wz_ZjAGaqlk7HgJj0CVKMChQcei1U/edit#gid=0">Spreadsheet</a>',
		],
		mod: 'metamons', 
		ruleset:['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon', 'Baton Pass', 'Sablenite'],
		unbanlist: ['Whimsicott', 'Salazzle', 'Kingler', 'Ariados', 'Sandslash', 'Bastiodon', 'Slowbro-Galar', 'Sableye', 'Grapploct', 'Eelektross', 'Arcanine', 'Tauros', 'Tsareena', 'Sylveon', 'Perrserker', 'Mantine', 'Persian-Alola', 'Druddigon', 'Duraludon', 'Houndoom', 'Stunfisk', 'Emolga', 'Espeon', 'Toxicroak', 'Granbull', 'Abomasnow', 'Eldegoss', 'Guzzlord', 'Entei', 'Necrozma', 'Xatu', 'Jellicent', 'Gigalith', 'Florges', 'Sunflora', 'Frogadier', 'Articuno', 'Passimian'],
	},
	{
		name: "[Gen 8] National Dex Balanced Hackmons v3",
		desc: `<b>More Balanced Hackmons</b>: A National Dex mod of Balanced Hackmons with new pokemon, moves, and abilities, as well as some additional bans.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/national-dex-bh-v3.3690179/">More Balanced Hackmons on Smogon Forums</a>`,
		],

		mod: 'nationaldexbalancedhackmons',
		ruleset: ['Standard NatDex', '+Nonexistent', '!Obtainable Abilities', '!Obtainable Moves', '!Obtainable Formes', 'Forme Clause', '2 Ability Clause', 'OHKO Clause', 'Evasion Moves Clause', 'CFZ Clause', 'Dynamax Clause'/*, 'Arceus Clause'*/],
		banlist: [
				'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Cramorant-Gorging', 'Calyrex-Shadow', 'Eternatus-Eternamax', 
				'Arena Trap', 'Contrary', 'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Libero', 'Magnet Pull', 
				'Moody', 'Neutralizing Gas', 'Parental Bond', 'Protean', 'Pure Power', 'Shadow Tag', 'Stakeout', 'Water Bubble', 'Wonder Guard', 
				'Gengarite', 
				'Chatter', 'Octolock', 'Double Iron Bash', 'Shell Smash', 'Bolt Beak', 'Belly Drum', 'Electrify', 
				'Comatose + Sleep Talk', 'Imprison + Transform',
		],
		onChangeSet(set) {
			const item = this.dex.toID(set.item);
			if (set.species === 'Zacian' && item === 'rustedsword') {
				set.species = 'Zacian-Crowned';
				set.ability = 'Intrepid Sword';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothblade';
				}
			}
			if (set.species === 'Zamazenta' && item === 'rustedshield') {
				set.species = 'Zamazenta-Crowned';
				set.ability = 'Dauntless Shield';
				const ironHead = set.moves.indexOf('ironhead');
				if (ironHead >= 0) {
					set.moves[ironHead] = 'behemothbash';
				}
			}
		},
		onValidateTeam(team, format){
			/**@type {{[k: string]: true}} */
			for (const set of team) {
				if (set.species == 'Zacian-Crowned' && set.ability !== 'Intrepid Sword')
					 return ["Zacian-Crowned can only have Intrepid Sword as its ability."]
				if (set.species == 'Zacian-Crowned' && set.item !== 'Rusted Sword')
					 return ["Zacian-Crowned can only have Rusted Sword as its item."]
				if ((set.species !== 'Zacian-Crowned' && set.species !== 'Zacian') && set.ability === 'Intrepid Sword')
					 return ["Only Zacian-Crowned can have Intrepid Sword as its ability."]
			}
		},
	},
	{
		name: "[Gen 8] OU Theorymon",
		desc: [
		   "<b>OU Theorymon</b>: A Sword and Shield OU metagame where low-ranked Pokemon are improved to become more viable.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymon on Smogon Forums</a>`,
		],
		
		mod: 'outheorymons',
      ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'], 
	},

	{
		name: "[Gen 8] Paleomons",
		desc: [
			"<b>Paleomons</b>: A Sword and Shield metagame that aims to create a micrometa full of ancient Pokemon."
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/paleomons-slate-3-non-dino-stars-dimetrodon-dodo-sea-scorpion-submission-phase.3695565/">Paleomons on Smogon Forums`,
		],

		mod: 'paleomons',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['Paleomons', 'Paleomons NFE', 'Paleomons LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Paleomons' && template.tier !== 'Paleomons NFE' && template.tier !== 'Paleomons LC') {
					return [set.species + ' is not legal in the Paleomons format.'];
				}
			}
		},
	},
	
	 {
		name: "[Gen 8] Restrictions",
		desc: `<b>Restrictions</b>: A metagame made up of brand new Pok&eacute;mon that are made according to various random and non-random restrictions.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673824/">Restrictions on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1XsplBqN8njHZJT9cTP_3i3YSFITB9WaVfNOYAbNY75M/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'restrictions',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', 'lcuber', 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
	},
	{
		name: "[Gen 8] Signature Restrictions",
		desc: `<b>Singature Restrictions</b>: A metagame made up of brand new Pok&eacute;mon that are made according to various restrictions provided by Pet Mod Users.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3673824/">Singature Restrictions on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1nUaGjuy4ZHWa7x-f1hpw7jc6ecNUZtT7QChAidv5CvY/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'signaturerestrictions',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['uber', 'ou', 'uubl', 'uu', 'rubl', 'ru', 'nubl', 'nu', 'publ', 'pu', 'zu', 'nfe', 'lcuber', 'lc', 'cap', 'caplc', 'capnfe', 'ag','past', 'future', 'lgpe'],
		teambuilderBans: ['unreleased'],
	},
	{
		name: "[Gen 8] Super Smash Stereotypes",
		desc: [
			"<b>Super Smash Stereotypes</b>: A project that aims to create a micrometa containing a Pokemon from other mods for all 171 possible types.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/super-smash-stereotypes-fire-grass-water.3690227/">Super Smash Mods Melee on Smogon Forums</a>`,
		      ],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: ['Gardevoirite', 'Chillytite', 'Bisharpite', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'SSS') {
					return [set.species + ' is not usable in Super Smash Stereotypes.'];
				}
			}
		},
		mod: 'smashstereotypes',
	},
	{
		name: "[Gen 8] Stereotypes",
		mod: "stereotypes",
		desc: [
			"<b>Stereotypes</b>: A project that aims to create a micrometa containing a unique new Pokemon for all 171 possible types, with the hope that each mon will use its typing and the options that typing affords well, while still being balanced and interesting.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/stereotypes-slate-1-fire-grass-water.3681312/">Stereotypes on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/19CbVWEkREchf_88VNfyEpcYEIdH_aJe20VMQyc8i-8Y/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Conversion', 'Conversion2', 'Libero', 'Protean', 'Transistor', 'Dragon\'s Maw', 'Steelworker', 'Steely Spirit', 'Color Change', 'Arena Trap', 'Shadow Tag', 'Moody'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['ST', 'ST NFE', 'ST LC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not useable in Stereotypes.'];
				}
			}
		},
		teambuilderFormat: "ST",
	},
	{
		section: "Duomod Randbats Tournament",
		column: 2,
	},

	{
        name: "[Gen 8] Gen 9 Duomod Randbats",
        desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        ],
        team: 'random',
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Subscribe For More Content', 'Duomod Data Mod'],
        onSwitchIn(pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        },
   },
	
	{
        name: "[Gen 8] Gen 9 Duomod",
        desc: `<b>Duomod</b>: back and better than ever baybeeeeee`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Subscribe For More Content', 'Duomod Data Mod'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
        unbanlist: [
             'Baloon', 'Fluxtape-Stereo', 'Pokat', 'Spirox', 'Badgearth', 'Bittle', 'Fairydisc', 'Shroominesce', 'Abysseil', 'Draxplosion', 'Jewelode', 'Treemu', 'Capsaken', 'Cephalopire', 'Chemiclysm', 'Commanto', 'Eneryth', 'Falcola', 'Gelsius', 'Hydread', 'Mountough', 'Sanbatter', 'Antestar', 'Escarglace', 'Fauxster', 'Gargitect', 'Temporand', 'Kuribandit', 'Mantelec', 'Noxinobi', 'Fluidrake',
			],	
			onSwitchIn(pokemon) {
        		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        	},	
	},

	{
        name: "[Gen 8] Gen 9 Duomod Randbats (TWO SPINS)",
        desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        ],
        team: 'random',
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Subscribe For More Content', 'Duomod Data Mod', 'Second Spin'],
        onSwitchIn(pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        },
   },

	{
        name: "[Gen 8] Gen 9 Duomod (TWO SPINS)",
        desc: `<b>Duomod</b>: back and better than ever baybeeeeee`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Subscribe For More Content', 'Duomod Data Mod', 'Second Spin'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
        unbanlist: [
             'Baloon', 'Fluxtape-Stereo', 'Pokat', 'Spirox', 'Badgearth', 'Bittle', 'Fairydisc', 'Shroominesce', 'Abysseil', 'Draxplosion', 'Jewelode', 'Treemu', 'Capsaken', 'Cephalopire', 'Chemiclysm', 'Commanto', 'Eneryth', 'Falcola', 'Gelsius', 'Hydread', 'Mountough', 'Sanbatter', 'Antestar', 'Escarglace', 'Fauxster', 'Gargitect', 'Temporand', 'Kuribandit', 'Mantelec', 'Noxinobi', 'Fluidrake',
			],	
			onSwitchIn(pokemon) {
        		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        	},	
	},

	{
        name: "[Gen 8] Gen 9 Duomod Randbats (CAMOMONS)",
        desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        ],
        team: 'random',
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Subscribe For More Content', 'Duomod Data Mod'],
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.getMove(move.id).type))];
			return {...species, types: types};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
   },

	{
        name: "[Gen 8] Gen 9 Duomod (CAMOMONS)",
        desc: `<b>Duomod</b>: back and better than ever baybeeeeee`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Subscribe For More Content', 'Duomod Data Mod'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
        unbanlist: [
             'Baloon', 'Fluxtape-Stereo', 'Pokat', 'Spirox', 'Badgearth', 'Bittle', 'Fairydisc', 'Shroominesce', 'Abysseil', 'Draxplosion', 'Jewelode', 'Treemu', 'Capsaken', 'Cephalopire', 'Chemiclysm', 'Commanto', 'Eneryth', 'Falcola', 'Gelsius', 'Hydread', 'Mountough', 'Sanbatter', 'Antestar', 'Escarglace', 'Fauxster', 'Gargitect', 'Temporand', 'Kuribandit', 'Mantelec', 'Noxinobi', 'Fluidrake',
			],	
		onModifySpecies(species, target, source, effect) {
			if (!target) return; // Chat command
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.getMove(move.id).type))];
			return {...species, types: types};
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]');
		},
	},

	{
        name: "[Gen 8] Gen 9 Duomod Randbats (INVERSE)",
        desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        ],
        team: 'random',
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Subscribe For More Content', 'Duomod Data Mod', 'Inverse Mod'],
        onSwitchIn(pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        },
   },

	{
        name: "[Gen 8] Gen 9 Duomod (INVERSE)",
        desc: `<b>Duomod</b>: back and better than ever baybeeeeee`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Subscribe For More Content', 'Duomod Data Mod', 'Inverse Mod'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
        unbanlist: [
             'Baloon', 'Fluxtape-Stereo', 'Pokat', 'Spirox', 'Badgearth', 'Bittle', 'Fairydisc', 'Shroominesce', 'Abysseil', 'Draxplosion', 'Jewelode', 'Treemu', 'Capsaken', 'Cephalopire', 'Chemiclysm', 'Commanto', 'Eneryth', 'Falcola', 'Gelsius', 'Hydread', 'Mountough', 'Sanbatter', 'Antestar', 'Escarglace', 'Fauxster', 'Gargitect', 'Temporand', 'Kuribandit', 'Mantelec', 'Noxinobi', 'Fluidrake',
			],	
			onSwitchIn(pokemon) {
        		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        	},	
	},

	{
        name: "[Gen 8] Gen 9 Duomod CC1v1",
        desc: `<b>gen 9 duomod back and better than ever baybeeeeee</b>`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1VZp8emRachS_ieusnF8FWKFqTcOUjrVyr393J-J17pY/edit?usp=sharing">Spreadsheet</a>`,
        ],
        team: 'randomCC',
		teamLength: {
			battle: 1,
		},
        mod: 'g9duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Subscribe For More Content', 'Duomod Data Mod'],
        onSwitchIn(pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        },
   },

	{
	name: "[Gen 8] GEN 8 Duomod Randbats",
		desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, build around the idea where nobody is ever truly losing.`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
		team: 'random',
		mod: 'duomod',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Subscribe For More Content', 'Duomod Data Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},

	{
        name: "[Gen 8] GEN 8 Duomod",
        desc: `<b>Duomod</b>: Legendary YouTuber and professional Smash player DuoM2's solomod, built around the idea where nobody is ever truly losing.`,
        threads: [
            `&bullet; <a href="https://docs.google.com/spreadsheets/d/1lguyF31tjV8f-Gv3uLxmZXGAlg23k2fkF_nBqevJouM/edit?usp=sharing">Spreadsheet</a>`,
        ],
        mod: 'duomod',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Subscribe For More Content', 'Duomod Data Mod'],
        banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'King\'s Rock',],
        unbanlist: [
             'Abysseil', 'Annelait', 'Azurolt', 'Baloon', 'BaloonPopped', 'BaloonWater', 'Catelax', 'Crypterid', 'Deliriophage', 'Detonuke', 'Draglow', 'Draxplosion', 'Fluidrake', 'Fluxtape', 'FluxtapeRadio', 'FluxtapeStereo', 'Gorilax', 'Grievenge', 'Hyperoach', 'Lemotic', 'Lumineel', 'Modolith', 'Monstratus', 'Mortemoth', 'Pokat', 'Spirox', 'SpiroxAncient', 'SpiroxRipped', 'Treemu', 'Valianch', 'Spisces', 'Pterrost', 'Jewelode', 'Jellyolk', 'Crazefly', 'Fairydisc', 'Badgearth', 'Shroominesce', 'Fleetle', 'Sharmpedo', 'Steroach',
			  
			],	
			onSwitchIn(pokemon) {
        		this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        	},	
	}, 
	// Solo Mods
	{
		section: "Solomods",
		column: 2,
	},
	{
		name: "[Gen 8] Evolution Project",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Alakazam', 'Excadrill-Base', 'Exploud', 'Lycanroc-Dusk', 'Naganadel-Base', 'Reuniclus-Base', 'Scizor', 'Scolipede-Base', 'Starmie-Base', 'Polteageist-Base',
			'Polteageist-Antique', 'Baton Pass'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)') {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
		},
		mod: 'evolutionproject',
	},
	{
		name: "[Gen 8] Evolution Project VGC",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		banlist: ['Scizor'],
		ruleset: ['Standard GBU', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)') {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.getSpecies(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
		mod: 'evolutionproject',
	},
	{
		name: "[Gen 8] Kaen's Dex",
		mod: "kaensdex",
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Evasion Moves Clause', 'Species Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Luvdisc', 'Hypno','Arbok','Shuckle','Crobat','Woodite','Manteaf','Fasmiwood','Smice','Ratevil','Burstrat','Doplash','Makid','Merdolph','Princeguin',
						'Kinguin','Ekidna','Porcusquill','Mop','Mopper','Puppessum','Grimssum','Spiball','Scopiball','Navird','Peckbeard','Bask','Peayes','Weaworm',
						'Lilfly','Koafly','Puptwin','Duog','Bureep','Parllama','Debi','Deecrust','Pickynest','Vulcdor','Buroach','Bugler','Roamai','Rack','Mountse',
						'Lacorn','Antney','Hairpu','Sockorm','Kibaion','Kibasol','Gnodog','Dressog','Tigle','Biitora','Psyguana','Forguana','Timk','Dynabite','Positt',
						'Frogassin','Jaklove','Wospark','Ravesp','Cabbitt','Haresprout','Seerd','Evialden','Ostranch','Pasuragu','Grussgu','Orvenom','Nerdium','Smartish',
						'Higarden','Unimount','Birnal','Yeagle','Flysh','Seaplane','Airpier','Likaba','Sucabra','Mousse','Donter','Melops','Harvetops','Pentamelop',
						'Scarferret','Lovefume','Smolle','Molvel','Toxtaur','Venotauro','Helmdillo','Rescurer','Crimske','Snagant','Zhulong','Yufo','Spavader','Grichick',
						'Grileo','Sbusho','Pangearth','Ankylonite','Champkylo','Slomoss','Milomoss','Rampeck','Terroccer','Tifrost','Smilofrost','Vizcachu','Paramer',
						'Toolsaur','Neuro','Brancell','Freezegon','Snoak','Coldrake','Capowt','Capoedar','Warcon','Istrebitel','Voltcro','Wirechomp','Thungator',
						'Scalpick','Roostlax','Eagatrice','Theri','Theriscyno','Ghoca','Moclaw','Jawlusk','Tumbna','Plesioskul','Laveel','Thermaque','Thermandril',
						'Tamantula','Spideth','Abomigo','Chillma','Wintber','Evergrowl','Stontler','Balatone','Coayena','Pherosmoke','Octovase','Cthulhurn','Shahood',
						'Karakasa','Grag','Kimokus','Toknight','Cowpy','Cowork','Barbecow','Hoorel','Baishark','Luviu','Shucklony','Dreamer','Nohtyp','Abomigo-Mega',
						'Vizcachu-Mega','Iron Sun','Crazy Moon','Grussgu-Mega','Porcusquill-Mega','Jumpfurr','SurivExe','Eevee-Cile','Vaporeon-Cile','Jolteon-Cile',
						'Flareon-Cile','Espeon-Cile','Umbreon-Cile','Leafeon-Cile','Glaceon-Cile','Sylveon-Cile','Qilineon','Fossileon','Crobat-Mega','Cupida']
	},
	{
		name: "[Gen 1] Kanto Expansion Pak OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 8] Roulettemons The Solomod",
		desc: `<b>Roulettemons The Solomod</b>: literally roulettemons but a solomod + clean slate micro`,
		mod: 'roulettemonsthesolomod',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: [
			'Spinmadillo', 'Coyoctric', 'Spizelle', 'Fierhog', 'Elatuff', 'Glasyte', 'Bisong', 'Megalo', 'Oysteat', 'Ponymph', 'Hypepion', 'Chickola', 'Skelehawk', 'Catetar', 'Blastquito', 'Hawkward', 'Pandaid', 'Autoad', 'Skelephin', 'Doomossum', 'Llamagic', 'Venoroach', 'Salamados', 'Steelboon', 'Jaguaplume',
		],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Scootopia",
		desc: "A solomod consisting of Scoopapa's first 30 sprited fakemons!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "scootopia",
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Evasion Moves Clause', 'Species Clause', 'Z-Move Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Orchile', 'Dolphena', 'Scalaron', 'Rantler', 'Cobracotta', 'Albatrygon', 'Electangle', 'Torgeist', 'Platypad', 'Soleron', 'Nunopod', 'Zeploom', 'Brawnkey', 'Salamalix', 'Cinnastar', "Muab'Boa", 'Volvolpa', 'Harzodia', 'Cyllindrake', 'Kodokai', 'Jaegorm', 'Jaegorm-Collective', 'Faerenheit', 'Cellsius', 'Kelven', 'Salaos', 'Morndos', 'Pythos', 'Quadringo', 'Corundell', 'Flocura' ],
	},
	{
		name: "[Gen 9] Scoop Test Gen 9",
		mod: 'gen9',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 8] The 3-3-1 Typechart",
		desc: [
			"<b>The 3-3-1 Typechart</b>: A solomod that gives every type 3 weaknesses, 3 resistances, and 1 immunity.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8939651">Post in the Solomods Megathread</a>`,
		],

		mod: 'the331typechart',
		teambuilderFormat: 'OU',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass', 'Kyurem', 'Slowking-Base', 'Slowbro-Base'],
	},
	// Randomized Metas
	///////////////////////////////////////////////////////////////////

	{
		section: "Randomized Metas",
		column: 3,
	},
	{
		name: "[Gen 8] Branched Potential Random Battle",
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/branched-potential-v2-aircraft-slate-yanmega-magnezone-dragapult.3688252/">Branched Potential on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/135ZGOSBMqzI9Ff-iVhtQzAwy80nORF2Qrv8iJU583NE/edit?usp=sharing">Spreadsheet</a>`,
		      ],
		mod: 'branchedpotential',
		team: 'random',
		ruleset: ['OHKO Clause', 'Obtainable', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Cancel Mod',],
	},
	{
		name: "[Gen 1] Burgundy Version Random Battle",
	   desc: `<b>[Gen 1] Burgundy Version</b>: An expansion of the Gen 1 OU metagame that changes some mechanics and adds new Pokemon and moves, both original and from later gens.`,
	   threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-burgundy-version-slate-3-new-moves-voting.3711525/">Burgundy Version on Smogon Forums</a>`,
	   ],
		mod: 'gen1burgundy',
		team: 'random',
      ruleset: ['Standard With Dig and Fly', 'Data Mod', 'Allow Tradeback'],
	},


	{
		name: "[Gen 8] Fusion Evolution UU Random Battle",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/fusion-evolution-under-used-submission-slate-3.3674163/">Fusion Evolution Under Used on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1zFk1_DBIoXFFn_7JpvYbVBrW-f1oFFh80Wn0CJNnbVo/edit#gid=0">Spreadsheet</a>`,
		],
		mod: 'feuu',
		team: 'random',
		ruleset: ['OHKO Clause', 'Obtainable', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] FutureProofing Random Battle",
	   desc: `<b>[Gen 1] FutureProofing</b>: Adapting Dark, Steel, and Fairy-type moves and Pokemon to the Gen 1 OU metagame.`,
	   threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	   ],
		mod: 'gen1futureproofing',
		team: 'random',
		ruleset: ['Standard', 'Data Mod'],
	},
	{
		name: "[Gen 8] JolteMons Random Battle",
		desc: [
			"<b>JolteMons</b>: A sequel to SylveMons where Pokemon, items, abilities and moves are redesigned for OU (and new items, abilities and moves are added) without changing base stats.",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/joltemons-slate-1-distribution-phase.3694234/">Thread on the Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/149ZlQY0bJIAqfWB_233Dvbpqs3pVSHYpIoAQQkwquls/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'joltemons',	
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Mega Data Mod', 'Data Mod', 'Z-Move Clause'],
	},
	{
		name: "[Gen 8] M4A Random Battle",
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/megas-for-all-v7-slate-33-electrode-golurk-and-silvally-please-read-the-first-post-fully-playable-through-slate-32.3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		mod: 'm4asandbox',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod', 'Mega Hint Mod'],
	},
	{
		name: "[Gen 8] Roulettemons Random",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		],
		team: 'random',
		mod: 'roulettemons',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
		onChangeSet(set) {
			if (set.species === 'Chillyte-Mega') {
				set.species = 'Chillyte';
				set.ability = 'Grassy Surge';
			}
		},
	},
	{
      name: "[Gen 8] OU Theorymons Random Battle",
      threads: [ 
          `&bullet; <a href="https://www.smogon.com/forums/threads/ss-ou-theorymon.3695574/">OU Theorymons on Smogon Forums</a>`,
          `&bullet; <a href="https://docs.google.com/spreadsheets/d/1AgqKo8IiXky8apuu0FUgx4MJRVtsVwtuhg_Wj_ACgao/edit#gid=0">Spreadsheet</a>`,
      ],
      team: 'random',
		mod: 'outheorymons', 
		ruleset: ['Dynamax Clause', 'Data Mod', 'Species Clause'],
	},
	{
		name: "[Gen 8] Roulettemons Random Doubles",
		threads: [
		   `&bullet; <a href="https://www.smogon.com/forums/threads/3649106/">Roulettemons on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1EOA1m7JXTq7Zz0ViVI4n6lBppFjVBa4S1GqhAwkPTZQ/edit?usp=sharing">Spreadsheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1J5ZMVzTAfJ48KQWVE7jt1S6fm7Y8DQX1tFX0-iENWiw/edit?usp=sharing">Bonus Random Team Generator</a>`,
		],
		team: 'random',
		gameType: 'doubles',
		mod: 'roulettemons',
		ruleset: ['Standard NatDex', 'Sleep Clause Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
		onChangeSet(set) {
			if (set.species === 'Chillyte-Mega') {
				set.species = 'Chillyte';
			}
		},
	},
	{
		name: "[Gen 8] SylveMons Random Battle",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/.3612509/">SylveMons on Smogon Forums</a>`,
				 `&bullet; <a href="https://docs.google.com/spreadsheets/d/18DiYjbZXv1Nm7tU-W0OMgPow0ZO7J2ETJF-hWapwM-o/edit">Spreadsheet</a>`,
		      ],
		mod: 'sylvemonstest',
		team: 'random',
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'SylveMons Intro Mod', 'Data Mod', 'Mega Data Mod'],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Ubermons Random Battle",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/ubermons-slate-2-spooky-scary-skeletons-dragapult-marshadow-spectrier.3683759/">Ubermons on Smogon Forums</a>`,
		], 
		mod: 'ubermons',
		team: 'random',
		ruleset: ['[Gen 8] Ubermons', '!Team Preview', '!Dynamax Clause'],
	},
	/*
	{
		name: "[Gen 8] Ink's Winter Wonderland",
		desc: `Play around both your opponent and the treacherous weather conditions in this randomized micrometa!`,
		mod: 'inksrandbats',
		team: 'random', 
		ruleset: ['Dynamax Clause', 'Obtainable', 'Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Permasnow'],
		searchShow: false,
		challengeShow: false,
	},
	*/
	// Non-Smogon Mods
	{
		section: "Non-Smogon Mods",
		column: 4,
	},
	{
		name: "[Gen 8] Conniecord Draft League", 
		desc: [
			"<b>Conniecord Draft League</b>: Initially for a draft league being run on a friends server on Discord, but now we just add and play around with new Fakemon for fun.",
		],
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1cPOiJawmEFg7yBK73nrVJepq1zbEcD7NjP-ZBaBQgkI/edit?usp=sharing">Spreadsheet (does not include learnsets)</a>`,
			`&bullet; <a href="http://conniecorddraft.wikidot.com/">Incomplete reference</a>`,

		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Movexit Clause', 'Data Mod', 'Mega Data Mod'],
		mod: 'conniecorddraft',
		searchShow: false,
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blaziken', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 
			'Latias-Mega', 'Latios-Mega', 'Mawile-Mega', 
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag',
			'Alakazite', 'Gengarite', 'Lucarionite', 'Salamencite', 'Latiasite', 'Latiosite', 'Mawilite', 
			'Shell Smash ++ Blastoisinite', 'Seismic Toss ++ Kangaskhanite', 'Kyurem-Black ++ Dragon Dance', 
			'Cinderace ++ Libero', 'Kommo-o ++ Clangorous Soul', 'Greninja ++ Protean',
		],
	},
	{
		name: "[Gen 8] Evolution Project",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Alakazam', 'Excadrill-Base', 'Exploud', 'Lycanroc-Dusk', 'Naganadel-Base', 'Reuniclus-Base', 'Scizor', 'Scolipede-Base', 'Starmie-Base', 'Polteageist-Base',
			'Polteageist-Antique', 'Baton Pass'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)') {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 8] Evolution Project VGC",
		desc: [
			`<b>Evolution Project</b>: A small group's creative exercise being given a test run. More details when we go public!`,
		],
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		banlist: ['Scizor'],
		ruleset: ['Standard GBU', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Evo!' && template.tier !== 'Evo (NFE)') {
					return [set.species + ' is not legal in the Evolution Project format.'];
				}
			}
		},
		onValidateSet(set) {
			const unobtainables = [
				'Eevee-Starter', 'Floette-Eternal', 'Pichu-Spiky-eared', 'Pikachu-Belle', 'Pikachu-Cosplay', 'Pikachu-Libre',
				'Pikachu-PhD', 'Pikachu-Pop-Star', 'Pikachu-Rock-Star', 'Pikachu-Starter', 'Eternatus-Eternamax',
			];
			const species = this.dex.getSpecies(set.species);
			if (unobtainables.includes(species.name)) {
				if (this.ruleTable.has(`+pokemon:${species.id}`)) return;
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			if (species.tier === "Unreleased") {
				const basePokemon = this.toID(species.baseSpecies);
				if (this.ruleTable.has(`+pokemon:${species.id}`) || this.ruleTable.has(`+basepokemon:${basePokemon}`)) {
					return;
				}
				return [`${set.name || set.species} does not exist in the National Dex.`];
			}
			// Items other than Z-Crystals and Pokémon-specific items should be illegal
			if (!set.item) return;
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not currently allowed to Mega Evolve.`];
			if (!item.isNonstandard) return;
			if (['Past', 'Unobtainable'].includes(item.isNonstandard) && !item.zMove && !item.itemUser && !item.forcedForme) {
				if (this.ruleTable.has(`+item:${item.id}`)) return;
				return [`${set.name}'s item ${item.name} does not exist in Gen ${this.dex.gen}.`];
			}
		},
		mod: 'evolutionproject',
		searchShow: false,
	},
	{
		name: "[Gen 5] Prism",
		desc: "Under Construction",
		mod: 'prism',
		ruleset: ['Pokemon', 'Standard Prism', 'Evasion Abilities Clause'],
		banlist: ['Weedle', 'Kakuna', 'Beedrill', 'Rattata', 'Raticate', 'Ekans', 'Arbok', 'Sandshrew', 'Sandslash', 'Nidoran-F', 'Nidorina', 'Nidoqueen', 'Nidoran-M', 'Nidorino', 'Nidoking',
		'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk',
		'Shellder', 'Cloyster', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Cubone', 'Marowak', 'Lickitung', 'Horsea', 'Seadra','Staryu', 'Starmie', 'Mr. Mime', 'Jynx',
		'Pinsir', 'Tauros', 'Lapras', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Dratini', 'Dragonair', 'Dragonite', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Bellossom',
		'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Wooper', 'Quagsire', 'Murkrow', 'Unown', 'Wobbuffet', 'Girafarig', 'Dunsparce', 'Snubbull', 
		'Granbull', 'Qwilfish', 'Shuckle', 'Heracross', 'Corsola', 'Remoraid', 'Octillery', 'Mantine', 'Skarmory', 'Kingdra', 'Stantler', 'Smeargle', 'Smoochum', 'Miltank', 'Raikou', 'Entei',
		'Suicune', 'Celebi', 'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert', 'Poochyena', 'Mightyena', 'Zigzagoon', 'Linoone', 'Wurmple',
		'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Seedot', 'Nuzleaf', 'Shiftry', 'Wingull', 'Pelipper', 'Slakoth', 'Vigoroth', 'Slaking', 'Nincada', 'Ninjask', 'Shedinja', 'Azurill', 'Nosepass',
		'Skitty', 'Delcatty', 'Meditite', 'Medicham', 'Plusle', 'Minun', 'Roselia', 'Gulpin', 'Swalot', 'Carvanha', 'Sharpedo', 'Spoink', 'Grumpig', 'Spinda', 'Zangoose', 'Seviper', 'Barboach', 'Whiscash',
		'Corphish', 'Crawdaunt', 'Baltoy', 'Claydol', 'Castform', 'Kecleon', 'Tropius', 'Wynaut', 'Spheal', 'Sealeo', 'Walrein', 'Clamperl', 'Huntail', 'Gorebyss', 'Luvdisc', 'Regirock', 'Regice', 'Registeel', 
		'Latias', 'Latios', 'Jirachi', 'Deoxys', 'Turtwig', 'Grotle', 'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon', 'Starly', 'Staravia', 'Staraptor', 
		'Bidoof', 'Bibarel', 'Kricketot', 'Kricketune', 'Budew', 'Roserade', 'Burmy', 'Wormadam', 'Mothim', 'Combee', 'Vespiquen', 'Pachirisu', 'Buizel', 'Floatzel', 'Cherubi', 'Cherrim',
		'Shellos', 'Gastrodon', 'Ambipom', 'Honchkrow', 'Glameow', 'Purugly', 'Stunky', 'Skuntank', 'Bonsly', 'Mime Jr.', 'Happiny', 'Chatot', 'Munchlax', 'Hippopotas', 'Hippowdon', 'Croagunk',
		'Toxicroak', 'Finneon', 'Lumineon', 'Mantyke', 'Snover', 'Abomasnow', 'Lickilicky', 'Probopass', 'Rotom', 'Uxie', 'Mesprit', 'Azelf', 'Dialga', 'Palkia', 'Heatran', 'Regigigas', 'Giratina',
		'Cresselia', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',],
	},
	{
		name: "[Gen 8] Ink's Custom Game",
		desc: [
			"Ink's code sandbox for whatever is on his mind at the time. It's called Custom Game so it won't show up in the teambuilder, but also there are no legality rules for testing purposes so",
		],
		threads: [
			`&bullet; <a href="https://docs.google.com/document/d/19GrXiOJswv6gv8r6ZU5C58SLu1Low_VX-KqAlv7Qhi8/edit?usp=sharing">Reference doc</a>`,
		],
		ruleset: ['Team Preview', 'Cancel Mod', 'HP Percentage Mod', 'Data Mod', 'Mega Data Mod'],
		mod: "inksdynamaxadventure",
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] SV Speculative",
		desc: [
			"Currently just a custom game format with Terastal implemented instead of Mega Evolution; will make a more specific speculative format for SV when we have a bit more to work with!",
		],

		searchShow: false,
		
		ruleset: ['Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Dynamax Clause', 'Sleep Clause Mod'],
		onValidateSet(set) {
			const item = this.dex.getItem(set.item);
			if (item.megaStone) return [`${set.name || set.species} is not allowed to Mega Evolve. (We have Terastal instead!)`];
			if (item.zMove) return [`${set.name || set.species} is not allowed to hold a Z-Crystal. (We have Terastal instead!)`];
		},
		validateSet(set, teamHas) {
			const species = this.dex.getSpecies(set.species);
			const ability = this.dex.getAbility(set.ability);
			if (!set.hpType === 'Fairy' && !set.hpType === 'Normal') {
				return this.validateSet(set, teamHas);
			} else {
				const terastal = set.hpType;
				set.hpType = 'Fire';
				const fakeValidation = this.validateSet(set, teamHas);
				if (fakeValidation?.length) return fakeValidation;
				set.hpType = terastal;
				return null;
			}
		},
		mod: 'svspeculative',
	},
	{
		name: "[Gen 8] Spookymons 2022",
		desc: [
			"Testing currently",
		],
		mod: "spookyhalloweenfuntimes",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Item Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		searchShow: false,
	},
	{
		name: "[Gen 8] Spookymons 2022 VGC",
		desc: [
			"Testing currently",
		],
		mod: "spookyhalloweenfuntimes",
		ruleset: ['Standard GBU', '+Unobtainable', '+Past', 'VGC Timer', 'Dynamax Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		searchShow: false,
		gameType: 'doubles',
		forcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
	},
	// Solo Mods
	{
		section: "Solomods",
		column: 4,
	},
	{    
        name: "[Gen 8] Abismons OU",
        desc: 'The result of "What if we let abismal make his own metagame?"',
			threads: [
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pQvZOZZ7ZQ7dufJzQ0oQDC19yq5EdTJU_fNl_ZFSdQA/edit#gid=0">Spreadsheet</a>`,
			],
        mod: "abismons",
        teambuilderFormat: 'OU',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause'],
        banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Cinderace ++ Libero', 'Battle Bond', 'Magearna'],
        unbanlist: ['Spectrier']
    },
    {    
        name: "[Gen 8] Abismons Ubers",
        desc: 'Abismons 2 Electric Boogaloo.',
		 threads: [
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pQvZOZZ7ZQ7dufJzQ0oQDC19yq5EdTJU_fNl_ZFSdQA/edit#gid=0">Spreadsheet</a>`,
			],
        mod: "abismons",
        teambuilderFormat: 'Ubers',
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod'],
        banlist: ['Rayquaza-Mega'],
    },
    {    
        name: "[Gen 8] Abismons AG",
        desc: 'ABISMONS: CLASH OF THE TITANS, IN THEATERS NOW NEAR YOU',
		 threads: [
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pQvZOZZ7ZQ7dufJzQ0oQDC19yq5EdTJU_fNl_ZFSdQA/edit#gid=0">Spreadsheet</a>`,
			],
        mod: "abismons",
        teambuilderFormat: 'Ubers',
        ruleset: ['Standard NatDex'],
        banlist: [],
	},

	{
		name: "[Gen 8] A Golden Experience",
		mod: "agoldenexperience", 
		desc: 'Another Pet Mod, NatDex based, where we try to make every single Pokemon viable, or at least usable, and we also have Fakemons!',
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Arceus', 'Blaziken-Mega', 'Blazikenite', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Speed',
		    'Dialga', 'Eternatus', 'Gengar-Mega', 'Gengarite', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Lucario-Mega', 'Lucarionite', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 
			'Necrozma-Dusk-Mane', 'Palkia', 'Parafgufa', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Solgaleo', 'Xerneas', 'Yveltal', 
			'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base', 'Moody', 'Power Construct', 'Heavy-Duty Boots', 'Bright Powder', 'Lax Incense', 'Quick Claw', 'Razor Fang', 'King\'s Rock',
			'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Pikashunium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Ultranecrozium Z', 'Marshadium Z', 
		],
		teambuilderFormat: 'National Dex',
	},

	{
		name: "[Gen 8] A Golden Experience Uber",
		mod: "agoldenexperience", 
		desc: 'Another Pet Mod, NatDex based, where we try to make every single Pokemon viable, or at least usable, and we also have Fakemons !',
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Moody', 'Bright Powder', 'Lax Incense', 'Quick Claw', 'Razor Fang', 'King\'s Rock',
			'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Pikanium Z', 'Pikashunium Z', 'Aloraichium Z', 'Eevium Z', 'Snorlium Z', 'Mewnium Z', 'Decidium Z', 'Incinium Z', 'Primarium Z', 'Lycanium Z', 'Mimikium Z', 'Kommonium Z', 'Tapunium Z', 'Solganium Z', 'Lunalium Z', 'Ultranecrozium Z', 'Marshadium Z', 
		],
		//teambuilderFormat: 'National Dex AG',
	},


	{    
		name: "[Gen 8] AsOnemons",
		desc: 'AsOnemons is a Generation 8 based Solomod that revolves around creating new As One forms for official Pokémon.',
		threads: [
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TRYfbFkLYSnFrOidd42FvQVlOjgYBzuSoK4tCFZPNOU/edit?usp=sharing">Spreadsheet</a>`,
		],
		
		mod: 'asonemons',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod', 'AsOnemons Mod'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: ['Yanmega-Shell', 'Pelipper-Ink', 'Excadrill-Boulder', 'Vanilluxe-Fur', 'Butterfree-Angler', 'Dedenne-Luchador', 'Shuckle-Brick', 'Munchlax-Forest', 'Bunnelby-Worker', 'Sirfetch\u2019d-Fantasy', 'Frogadier-Beetle', 'Chandelure-Balloon', 'Infernape-Climber', 'Ribombee-Charmer', 'Beheeyem-UFO', 'Sableye-Doom', 'Mareanie-Magma', 'Thwackey-Dune', 'Spheal-Siren', 'Pincurchin-Goo', 'Nihilego-Psychosis', 'Stunfisk-Jagged', 'Pawniard-Aviation', 'Watchog-Scout', 'Mothim-Gourd', 'Clefairy-Selene', 'Hoothoot-Perch', 'Swoobat-Aroma', 'Blacephalon-Borealis', 'Malamar-Parallel'],
	},
	{
		name: "[Gen 8] Baby Boom",
		desc: '<b>Baby Boom</b>: A Solomod where only Baby Pokemon are allowed and are balanced around each other.',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9069509">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1QrZKlNrqKiRcprYtvyIPveR0vMp0dpM1X60zeo6N5xU/edit#gid=999775779">Spreadsheet</a>`,
		],
		mod: 'babyboom',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: ['Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 
					'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Mantyke', 'Riolu', 'Toxel', 'Armorick', 'Crawscor', 'Dreddon',
					'Sneaz', 'Durone', 'Drifble', 'Tangel',
		],
	},
	{
		name: "[Gen 8] Blindstrictions",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9056974">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1hn_35rXKq6cNk1k4mg4g3IkgG4xTnX7JQT3wsvHRd4U/edit#gid=0">Spreadsheet</a>`,
		],
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod'],
		banlist: ['Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( template.tier !== 'Blindstrictions') {
					return [set.species + ' is not usable in Blindstrictions.'];
				}
			}
		},
		mod: 'blindstrictions',
	},
	{    
		name: "[Gen 8] Boatmod OU",
		desc: "Regic Boat's solomod.",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQoBw-L2HININ-a3khG8iCqIqspSN4IRbifAZsoaGW1BMPlTE95JMxBeCWRPKHWygIdv336kyI4JVhN/pubhtml#">Spreadsheet</a>`,
		],
		mod: "boatmod",
		teambuilderFormat: 'boatmod',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] Chaos Chaos Chaos",
		desc: `Chaos Chaos Chaos`,
  		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1MsqO579H1XzNJawNxL064ANjtPwyS4823882JTImnoU/edit?usp=sharing">Spreadsheet</a>`,
		    `&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9187061">Forum Post</a>`
			],
  		ruleset: ['Standard NatDex', 'Species Clause','!Species Clause', 'Dynamax Clause', 'Z-Move Clause'],
		banlist: ['Uber', 'Power Construct', 'Baton Pass'],
		mod: 'chaoschaoschaos',
		banlist: ['Baton Pass', 'Stance Change', 'Aerodactylite', 'Eviolite', 'Cameruptite', 'Gulp Missile', 'Glalitite', 'Manectite', 'Mawilite', 'Aspear Berry', 'Sinistea-Antique'],
		onSwitchIn: function (pokemon) {
            this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[silent]');
        },
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (speciesTable[template.name]) {
					return ["You are limited to one of each Pokémon by Species Clause. ", "You have more than one " + template.baseSpecies + "."];
				}
				speciesTable[template.name] = true;
				if ( template.tier !== 'CCC' ) {
					return [set.name + ' is not useable in Chaos Chaos Chaos.'];
				}
			}
		},
	},
	// {
        // name: "[Gen 8] Dance of the Dead",
        // desc: `<b>?????</b>`,
        // threads: [
            // `&bullet; <a href="https://docs.google.com/spreadsheets/d/1sh7JljsjdTXlVlvUq45O2rT8x6ZM3nVv-kWkMnCgK_A/edit?usp=sharing">Spreadsheet</a>`,
        // ],
        // mod: 'danceofthedead',
        // ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Item Clause', 'Data Mod'],
        // banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'King\'s Rock',],
        // unbanlist: [
 // 'Baloon-Popped', 'Encrave', 'Eneryth', 'Fantom', 'Flamepion', 'Grievenge', 'Hydread', 'Marspookial', 'Mortemoth', 'Pozaqes', 'Sanbatter', 'Sheegal', 'Spirox', 'Tumbleak', 'Wistape',			  
			// ],	
			// onSwitchIn(pokemon) {
        		// this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
        	// },	
	// }, 
	{
		name: "[Gen 8] Dex Reversal",
		desc: `<b>Dex Reversal</b>.`,
		mod: 'dexreversal',
		teambuilderFormat: "National Dex AG",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Moves Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
				//Abilities
				'Arena Trap', 'Drizzle', 'Moody', 'Shadow Tag',
				
				//Items
				'Blastoisinite', 'Blazikenite', 'Bright Powder', 'Charizardite X', 'Eviolite', 'Gengarite', 'Kangaskhanite', 
				'King\'s Rock', 'Lax Incense', 'Light Ball', 'Medichamite', 'Pidgeotite', 'Razor Fang', 'Red Orb', 'Sablenite', 
				'Swampertite', 'Thick Club',
				
				//Moves
				'Baton Pass', 'Quiver Dance',
				
				//Pokemon
				'AG',
		],
	},

	{
		name: "[Gen 8] Earth & Sky OU",
		desc: `The metagame based on Pok&eacute;mon Earth & Sky, a set of theoretical games created by En Passant.`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1CL_DALzaisaMwr2709KMleWU6ntxBPnzfHukN0SR5Ss">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		ruleset: [ 'Earth & Sky',],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blaziken-Mega', 'Blastoise-Mega', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kyogre',
			'Kyurem', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom',
			/*'ES Uber', */'Oceides', 'Hatar', 'Zuros', 'Norphaval', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 8] Earth & Sky Egelas Dex",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1CL_DALzaisaMwr2709KMleWU6ntxBPnzfHukN0SR5Ss">Competitive Cheat Sheet</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/u/1/d/1N_kSuPC2XifKplZ9huLVlxmkYv3fCmt2">Egelan Pokedex</a>`,
		],
		mod: 'earthsky',
		ruleset: [ '[Gen 8] Earth & Sky OU', 'Egelas Pokedex',],
		banlist: ['Mawile-Mega',],
		teambuilderFormat: 'National Dex',
	},
	{
		name: "[Gen 8] Earth & Sky Ubers",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1CL_DALzaisaMwr2709KMleWU6ntxBPnzfHukN0SR5Ss">Competitive Cheat Sheet</a>`,
		],
		mod: 'earthsky',
		ruleset: [ 'Earth & Sky',],
		banlist: [],
		teambuilderFormat: 'National Dex Ubers',
	},
	{
		name: "[Gen 8] Ema Mod",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9065303">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ39z8ud7QYaf1R5TIz9Ad967U4bmhABy-CGYNK-LpXjjKw_RHVAFi-5etInNdaCR9Gudv2JWpPPL2/pubhtml">Spreadsheet</a>`,
		],
		mod: 'emamod',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		unbanlist: ['Deoxys-Defense', 'Landorus-Therian', 'Zygarde-10%'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fairy', 'Arceus-Fighting', 
			'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 
			'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water', 'Blastoise-Mega', 'Blaziken-Mega', 'Calyrex-Ice', 'Calyrex-Shadow', 'Cinderace', 
			'Darkrai', 'Darmanitan-Galar', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Dialga-Origin', 'Dracovish', 'Dragapult', 
			'Eternatus', 'Genesect', 'Genesect-Burn', 'Genesect-Chill', 'Genesect-Douse', 'Genesect-Shock', 'Gengar-Mega', 'Giratina', 
			'Giratina-Origin', 'Groudon', 'Groudon-Primal', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre', 'Kyogre-Primal', 'Kyurem-Black','Kyurem-White', 
			'Landorus', 'Lucario-Mega', 'Lugia', 'Lunala', 'Magearna', 'Magearna-Original', 'Marshadow', 'Metagross-Mega', 'Mewtwo', 'Mewtwo-Mega-X', 
			'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Palkia', 'Palkia-Origin', 'Pheromosa', 
			'Rayquaza', 'Rayquaza-Mega', 'Reshiram','Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Spectrier', 'Tornadus-Therian', 'Urshifu-Base', 
			'Xerneas', 'Yveltal', 'Zacian','Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'Zygarde', 'Zygarde-Complete', 'Arena Trap', 
			'Moody','Power Construct', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'Bright Powder', 'King\'s Rock', 'Lax Incense', 'Razor Fang',
			'Quick Claw', 'Baton Pass',
		],
	},
	{
		name: "[Gen 8] FE Imposter's Cut",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8988462">Solomod Post</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1VlWGUuOnTRpWnZT4_rUttVhIlSw3LeogaFv6clwbnNs/edit#gid=0">Spreadsheet</a>`,
		],
		mod: "feimposter",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'All Pokemon', 'Baton Pass',
		],
		unbanlist: [
			'Butterchomp', 'Bascugly', 'Tapu Sawk', 'Wormaiclus', 'Nidoreena', 'Persaconda', 'Swalagross', 'Ramaparaptor', 'Dragasire', 'Slasle', 'Dubdos', 
			'Toxtriceebel', 'Gliscremie', 'Spirisopod', 'Tornabeat', 'Weezking', 'Typhlobat', 'Chimerem', 'Duskcino', 'Kecletana', 'Xataskewda', 'Hoopiinotic', 
			'Ariarados', 'Mimidactyl', 'Stantilego', 'Trevecuno', 'Calyrex-Amp-Rider', 'Leavo-o', 'Corsizor', 'Wigglytres',
		],
	},
	{
		name: "[Gen 8] GPT2mons",
	   desc: '<b>GPT2mons</b>: A solomod featuring pokemon generated using a GPT2 neural network. It is currently unfinished',
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8809448">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ec0GmZbGuVu1P7xtmv2pOAe5Nd0xS_gzU0KpsHnch1s/edit?usp=sharing">Spreadsheet</a>`,
		],
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		searchShow: false,
		challengeShow: false,
		mod: "gpt2mons", 
		teambuilderFormat: "OU", 	
	},
	{
		name: "[Gen 8] GPT3mons",
	   desc: '<b>GPT3mons</b>: A solomod featuring pokemon generated using a GPT3 neural network.',
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1tJ99u-GxfyCq5-fGMaygDUN8FUzQadk0aK5Y9Gstf9k/edit#gid=0
			">Spreadsheet</a>`,
		],
		mod: "gpt3mons",
		teambuilderFormat: "G3",
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'OHKO Clause', 'Data Mod'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: ['Abrakin', 'Bunbunt', 'Crawk', 'Dopplebop', 'Echovine', 'Fiendal', 'Grimalkin', 'Hoarfrost', 'Isickle', 'Jiagu', 'Kitsune', 'Leaford', 'Miasmax', 'Nyaon', 'Obscurio', 'Piplant', 'Quirog', 'Rolyboly', 'Saevus', 'Toxidile', 'Ursaforce', 'Vectol', 'Wyverna', 'Xaetron', 'Yeetle', 'Zaprong'],	
	},
	{
		name: "[Gen 2] GSC Doubles",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9132049">Post in Solomods Megathread</a>`,
		],

		mod: 'gen2doubles',
		gameType: 'doubles',
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['Uber'],
	},
    {
		name: "[Gen 3] Hoennification",
        mod: 'gen3hoennification',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod', 'Data Mod'],
		banlist: ['Uber', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain'],
	},
	{    
       name: "[Gen 8] i forgor OU",
       desc: 'i forgor :skull: (the anaconja solomod)',
       mod: "iforgor",
       teambuilderFormat: 'OU',
       ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'OHKO Clause', 'Data Mod', 'Mega Data Mod'],
       banlist: ['All Pokemon', 'dragongroundite', 'firepsychic', 'electricnormal', 'iceghost', 'firedark'],
		 unbanlist: ['grasselectric', 'firerock', 'waterghost', 'darkpoison', 'normalpsychic', 'fightingflying', 'bugice', 'bugicemega', 'bugpsychic', 'bugpsychicmega', 'grassfairy', 'grassfire', 'normalpoison', 'normalpoisonmega', 'groundfairy', 'groundfairymega', 'bugelectric', 'darkflying', 'fightingice', 'fightingsteel', 'dragon', 'steelflying', 'electricpoison', 'electricpoisonmega', 'ground', 'rockghost', 'fairyflying', 'electricsteel', 'rockgrass', 'fairydragon', 'icepoison', 'icerock', 'normal', 'normalmega', 'normalfairy', 'normalfairymega', 'bugfighting', 'ghostdragon', 'waterground', 'watergroundmega', 'watersteel', 'fireground', 'firenormal', 'grassnormal', 'electric', 'dragonpoison', 'darkfairy', 'darkfairymega', 'poisonpsychic', 'poisonpsychicmega', 'darkrock', 'darkrockmega', 'poisonground', 'poisongroundmega', 'rockpsychic', 'rockfighting', 'water', 'waterelectric', 'dragonsteel', 'psychicfighting', 'bugsteel', 'psychicdragon', 'normalghost', 'darksteel', 'ghostground', 'ghostgroundmega', 'electricflying', 'grasspoison', 'dragonfighting', 'waterice', 'watericemega', 'ghostflying', 'bugdark', 'iceground', 'bugwater', 'bugfire', 'grassice', 'dragonground', 'psychicfairy', 'grassflying', 'firepsychic', 'darkghost', 'waterflying', 'steel', 'rock', 'iceghost', 'electricnormal', 'firedark', 'firefairy', 'fighting', 'steelfairy', 'waterpoison', 'waterpoisonmega', 'firepoison', 'bug', 'buggrass', 'waterfairy', 'firesteel', 'firesteelmega', 'iceelectric', 'groundflying', 'groundflyingmega', 'rockflying', 'rockground', 'grassfighting', 'electricdark', 'normaldark', 'ghostfighting', 'dragonice', 'dragonnormal', 'ghostpsychic', 'psychic'],	
	},
	{    
       name: "[Gen 8] i forgor Ubers",
       desc: 'i forgor :skull: (the anaconja solomod)',
       mod: "iforgor",
       teambuilderFormat: 'Uber',
       ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'OHKO Clause', 'Data Mod', 'Mega Data Mod'],
       banlist: ['All Pokemon'],
		   unbanlist: ['grasselectric', 'firerock', 'waterghost', 'darkpoison', 'normalpsychic', 'fightingflying', 'bugice', 'bugicemega', 'bugpsychic', 'bugpsychicmega', 'grassfairy', 'grassfire', 'normalpoison', 'normalpoisonmega', 'groundfairy', 'groundfairymega', 'bugelectric', 'darkflying', 'fightingice', 'fightingsteel', 'dragon', 'steelflying', 'electricpoison', 'electricpoisonmega', 'ground', 'rockghost', 'fairyflying', 'electricsteel', 'rockgrass', 'fairydragon', 'icepoison', 'icerock', 'normal', 'normalmega', 'normalfairy', 'normalfairymega', 'bugfighting', 'ghostdragon', 'waterground', 'watergroundmega', 'watersteel', 'fireground', 'firenormal', 'grassnormal', 'electric', 'dragonpoison', 'darkfairy', 'darkfairymega', 'poisonpsychic', 'poisonpsychicmega', 'darkrock', 'darkrockmega', 'poisonground', 'poisongroundmega', 'rockpsychic', 'rockfighting', 'water', 'waterelectric', 'dragonsteel', 'psychicfighting', 'bugsteel', 'psychicdragon', 'normalghost', 'darksteel', 'ghostground', 'ghostgroundmega', 'electricflying', 'grasspoison', 'dragonfighting', 'waterice', 'watericemega', 'ghostflying', 'bugdark', 'iceground', 'bugwater', 'bugfire', 'grassice', 'dragonground', 'psychicfairy', 'grassflying', 'firepsychic', 'darkghost', 'waterflying', 'steel', 'rock', 'iceghost', 'electricnormal', 'firedark', 'firefairy', 'fighting', 'steelfairy', 'waterpoison', 'waterpoisonmega', 'firepoison', 'bug', 'buggrass', 'waterfairy', 'firesteel', 'firesteelmega', 'iceelectric', 'groundflying', 'groundflyingmega', 'rockflying', 'rockground', 'grassfighting', 'electricdark', 'normaldark', 'ghostfighting', 'dragonice', 'dragonnormal', 'ghostpsychic', 'psychic', 'dragongroundmega'], 
  },
    {
		name: "[Gen 3] Inverse OU",
        mod: 'gen3inverse',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod', 'Data Mod'],
		banlist: ['Uber', 'Soundproof', 'Assist', 'Baton Pass + Block', 'Baton Pass + Mean Look', 'Baton Pass + Spider Web', 'Smeargle + Ingrain', 'Jolteon', 'Alakazam', 'Sceptile', 'Gengar'],
	},
	{
		name: "[Gen 3] Inverse Split",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9230529">Solomod Post</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1dzHPJfiqSyvTeZkeBmJOI7OfUIEb6SVDjb7P3vrX9L4/edit">Spreadsheet</a>`,
		],
		mod: 'gen3inversesplit',
		ruleset: ['Standard', '3 Baton Pass Clause'],
		banlist: ['Uber', 'Smeargle + Baton Pass', 'Overheat', 'Psycho Boost'],
	},
	/*
	{    
       name: "[Gen 8] JosMons",
       desc: 'A meta created by JosJet focused on making balance changes to the NatDex OU meta. Ex. Bug-type Buff.',
       mod: "josmons",
       teambuilderFormat: 'OU',
       ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause'],
       banlist: ['Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Cinderace', 'Magearna', 'Darmanitan-Galar', 'Dracovish', 'Dragapult', 'Metagross-Mega', 'Tornadus-Therian', 'Urshifu'],
   },
	*/
	{
	name: "[Gen 1] JohtoMons",
	desc: '<b>[Gen 1] JohtoMons</b>: Adding the Johto mons to RBY',
	threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-futureproofing-slate-1-discussion.3703375/">FutureProofing on Smogon Forums</a>`,
	],
    mod: 'gen1johtomons',
    ruleset: ['Standard', 'Data Mod'],
	banlist: ['Uber'],
	unbanlist: ['Aeroblast', 'Sacred Fire', 'Sketch', 'Present', 'Megahorn', 'Steel Wing', 'Milk Drink', 'Metal Claw', 'Spider Web', 'Hidden Power', 'Octazooka', 'Triple Kick', 'Vital Throw', 'Extreme Speed', 'Mach Punch', 'Outrage', 'Morning Sun',
		'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Sentret', 'Furret', 'Hoothoot', 'Noctowl', 'Ledyba', 'Ledian', 'Spinarak', 'Ariados', 'Crobat', 'Chinchou', 'Lanturn', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Togetic',
		'Natu', 'Xatu', 'Mareep', 'Flaaffy', 'Ampharos', 'Bellossom', 'Marill', 'Azumarill', 'Sudowoodo', 'Politoed', 'Hoppip', 'Skiploom', 'Jumpluff', 'Aipom', 'Sunkern', 'Sunflora', 'Yanma', 'Wooper', 'Quagsire', 'Espeon', 'Umbreon', 'Murkrow', 'Slowking', 
		'Misdreavus', 'Unown', 'Wobbuffet', 'Girafarig', 'Pineco', 'Forretress', 'Dunsparce', 'Gligar', 'Steelix', 'Snubbull', 'Granbull', 'Qwilfish', 'Scizor', 'Shuckle', 'Heracross', 'Sneasel', 'Teddiursa', 'Ursaring', 'Slugma', 'Magcargo', 'Swinub', 
		'Piloswine', 'Corsola', 'Remoraid', 'Octillery', 'Delibird', 'Mantine', 'Skarmory', 'Houndour', 'Houndoom', 'Kingdra', 'Phanpy', 'Donphan', 'Porygon2', 'Stantler', 'Smeargle', 'Tyrogue', 'Hitmontop', 'Smoochum', 'Elekid', 'Magby', 'Miltank', 
		'Blissey', 'Raikou', 'Entei', 'Suicune', 'Larvitar', 'Pupitar', 'Tyranitar', 'Lugia', 'Ho-Oh', 'Celebi',
		],
    },
	{
		name: "[Gen 8] Journey to Kilirthy",
		desc: '<b>Journey to Kilirthy</b>: A solomod, where Fakemons are added as if it was a new game.',
    threads: [
      `&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/1Sie-60JVUUuY3sNL4LTvDLGJeITbc-JEt3-ZTnIL_v0/edit?usp=drivesdk">Spreadsheet</a>`,
      ],
		mod: 'j2k',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Uber', 'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Regieleki',
		],
		teambuilderFormat: 'OU',
	},
	{
		name: "[Gen 8] Journey to Kilirthy Ubers",
		desc: '<b>Journey to Kilirthy</b>: A solomod, where Fakemons are added as if it was a new game.',
    threads: [
      `&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8753030">Post in Solomods Megathread</a>`,
      `&bullet; <a href="https://docs.google.com/spreadsheets/d/1Sie-60JVUUuY3sNL4LTvDLGJeITbc-JEt3-ZTnIL_v0/edit?usp=drivesdk">Spreadsheet</a>`,
      ],
		mod: 'j2k',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'AG', 'Eternatus-Eternamax', 'Rayquaza-Mega', 'Zacian-Crowned', 'Moody', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: 'Uber',
	},
	{
		name: "[Gen 8] Kaen's Dex",
		mod: "kaensdex",
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Evasion Moves Clause', 'Species Clause', 'Z-Move Clause', 'Data Mod', 'Mega Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Luvdisc', 'Hypno','Arbok','Shuckle','Crobat','Woodite','Manteaf','Fasmiwood','Smice','Ratevil','Burstrat','Doplash','Makid','Merdolph','Princeguin',
						'Kinguin','Ekidna','Porcusquill','Mop','Mopper','Puppessum','Grimssum','Spiball','Scopiball','Navird','Peckbeard','Bask','Peayes','Weaworm',
						'Lilfly','Koafly','Puptwin','Duog','Bureep','Parllama','Debi','Deecrust','Pickynest','Vulcdor','Buroach','Bugler','Roamai','Rack','Mountse',
						'Lacorn','Antney','Hairpu','Sockorm','Kibaion','Kibasol','Gnodog','Dressog','Tigle','Biitora','Psyguana','Forguana','Timk','Dynabite','Positt',
						'Frogassin','Jaklove','Wospark','Ravesp','Cabbitt','Haresprout','Seerd','Evialden','Ostranch','Pasuragu','Grussgu','Orvenom','Nerdium','Smartish',
						'Higarden','Unimount','Birnal','Yeagle','Flysh','Seaplane','Airpier','Likaba','Sucabra','Mousse','Donter','Melops','Harvetops','Pentamelop',
						'Scarferret','Lovefume','Smolle','Molvel','Toxtaur','Venotauro','Helmdillo','Rescurer','Crimske','Snagant','Zhulong','Yufo','Spavader','Grichick',
						'Grileo','Sbusho','Pangearth','Ankylonite','Champkylo','Slomoss','Milomoss','Rampeck','Terroccer','Tifrost','Smilofrost','Vizcachu','Paramer',
						'Toolsaur','Neuro','Brancell','Freezegon','Snoak','Coldrake','Capowt','Capoedar','Warcon','Istrebitel','Voltcro','Wirechomp','Thungator',
						'Scalpick','Roostlax','Eagatrice','Theri','Theriscyno','Ghoca','Moclaw','Jawlusk','Tumbna','Plesioskul','Laveel','Thermaque','Thermandril',
						'Tamantula','Spideth','Abomigo','Chillma','Wintber','Evergrowl','Stontler','Balatone','Coayena','Pherosmoke','Octovase','Cthulhurn','Shahood',
						'Karakasa','Grag','Kimokus','Toknight','Cowpy','Cowork','Barbecow','Hoorel','Baishark','Luviu','Shucklony','Dreamer','Nohtyp','Abomigo-Mega',
						'Vizcachu-Mega','Iron Sun','Crazy Moon','Grussgu-Mega','Porcusquill-Mega','Jumpfurr','SurivExe','Eevee-Cile','Vaporeon-Cile','Jolteon-Cile',
						'Flareon-Cile','Espeon-Cile','Umbreon-Cile','Leafeon-Cile','Glaceon-Cile','Sylveon-Cile','Qilineon','Fossileon','Crobat-Mega']
	},
	{
		name: "[Gen 8] Kantodex",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9213138">Post in Solomods Megathread</a>`,
		],
		mod: 'kantodex',
		ruleset: ['Standard', 'Dynamax Clause'],
		banlist: ['Uber', 'Arena Trap', 'Baton Pass', 'Sand Veil', 'Snow Cloak'],
	},
    {
		name: "[Gen 1] Kantoification",
		mod: 'gen1kantoification',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Modern Gen 1",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9250110">Post in Solomods Megathread</a>`,
		],
		mod: 'gen1moderngen1',
		ruleset: ['Standard Natdex', '!Obtainable', 'Sleep Moves Clause', 'Evasion Moves Clause', 'OHKO Clause', 'Species Clause', '!Team Preview'],
		banlist: ['All Abilities', 'Bind', 'Clamp', 'Fire Spin', 'Infestation', 'Magma Storm', 'Sand Tomb', 'Snap Trap', 'Thunder Cage', 'Whirlpool', 'Wrap', 'Spikes', 'Toxic Spikes', 'Stealth Rock', 'Sticky Web', 'Fake Out', 'Wonder Room', 'Trick Room', 'Magic Room', 'Lucky Chant', 'Tailwind', 'Safeguard', 'Gravity', 'Mew', 'Inteleon', 'Regigigas', 'Regieleki', 'Slaking', 'Kyurem', 'Omastar', 'Cloyster', 'Gorebyss', 'Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Eternatus', 'Genesect', 'Giratina', 'Groudon', 'Ho-oh', 'Kyogre', 'Kyurem-White', 'Kyurem-Black', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Naganadel', 'Necrozma-Dusk-Mane', 'Necrozma-Dawn-Wings', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Solgaleo', 'Xerneas', 'Zacian', 'Zamazenta', 'Zekrom', 'Dragapult', 'Zygarde'],
		unbanlist: ['No Ability'],
	},
	{
		name: "[Gen 1] Kanto Expansion Pak OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
		banlist: ['Uber'],
	},
		{
		name: "[Gen 1] Kanto Expansion Pak Ubers",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-9233581">Post in Solomods Megathread</a>`,
      	`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TpTH9ksUWOOJJQK69RIcvnot_mH_JvfGfM4zra6V3Ec/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'gen1expansionpack',
		ruleset: ['Standard', 'Data Mod', 'Welcome Message'],
	},
	{
      name: "[Gen 8] Mememons",
      desc: `<b>Mememons</b>: solomod`,
      mod: 'mememons',
      ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
      banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
      },	
	},
	{
		name: "[Gen 8] National Dex VGC",
		mod: 'gen8',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Species Clause', 'Item Clause', '!! Adjust Level = 50', 'VGC Timer', 'Picked Team Size = 4', 'Limit Two Restricted'],
		banlist: ['Mythical'],
		restricted: ['Restricted Legendary'],
	},
	{
		name: "[Gen 8] PKMN YB OU",
		desc: [
			"PKMN YB",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8365236">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ikLNnDXoImPnAzMtqVniU3FASOq4tIyxlqjaI7LK5ZU/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'pkmnybv2',	
		teambuilderFormat: 'OU',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod'],
		unbanlist: ['Floette-Eternal', 'Light of Ruin'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Alakazite', 'Arceus', 'Darkrai', 'Gorilla Tactics', 'Deoxys-Attack', 'Deoxys-Speed', 'Dialga', 'Genesect', 'Greninja-Ash', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucarionite', 'Lugia', 'Lunala', 'Metagrossite', 'Mewtwo', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Salamencite', 'Solgaleo', 'Tornadus-Therian', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde', 'Berserk Gene', 'Kommonium Z', 'Eevee-Starter', 'Pikachu-Starter', 'Moody',
					'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z'],
	},
	
	{
		name: "[Gen 8] Patratdex",
		desc: `<b>Patratdex</b>: Galvantic's Solomod, containing a new regional dex with a bunch of new stuff, notably 151 Fakemon.`,
		mod: 'patratdex',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Realmon Clause'],
		banlist: ['Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z',],
		onSwitchIn(pokemon) {
      	this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},	
	},
	
	{
		name: "[Gen 8] PKMN YB VGC",
		desc: [
			"PKMN YB",
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8365236">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1ikLNnDXoImPnAzMtqVniU3FASOq4tIyxlqjaI7LK5ZU/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'pkmnybv2',
		teambuilderFormat: 'Doubles OU',
		gameType: 'doubles',
		forcedLevel: 77,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Standard GBU', 'VGC Timer', 'Dynamax Clause', 'Data Mod', 'Mega Data Mod', '+Past'],
		banlist: ['All Pokemon', 'Normalium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Darkinium Z', 'Dragonium Z', 'Buginium Z', 'Waterium Z', 'Electrium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Seal Away', 'Moody'],
		unbanlist: [
			'Floette-Eternal', 'Light of Ruin',
			'Synthinobi', 'Chemicander', 'Primadillo', 'Bersawk', 'Electzal', 'Pyrogrine', 'Chompean', 'Mothicoal', 'Neurowatt', 'Menursa', 'Bloomivolt', 'Muaytiger', 'Hareloom', 'Razorine', 'Frospherous', 'Arbborry', 'Mustellar', 'Wolverflare', 'Photyrant', 'Ghoulgoyle', 'Cortefauna', 'Gammaroo', 'Serpentorch', 'Kaclash', 'Solinira', 'Zapish', 'Sanatee', 'Glaciarch', 'Creaviary', 'Plummuse', 'Sparsqueak', 'Darsqueak', 'Giraflame', 'Lycacia', 'Remodile', 'Petrasapien', 'Petradvena', 'Fyrecho', 'Osprime', 'Buffalocean', 'Ingarde', 'Venometta', 'Nimbless', 'Frixen', 'Necrice', 'Goblizz', 'Ptarabola', 'Dominidon', 'Frostonna', 'Geareon', 'Mytheon',  
			'Butterfree', 'Vespiquen', 'Ariados', 'Ledian', 'Yanmega', 'Accelgor', 'Escavalier', 'Masquerain', 'Mothim', 'Pinsir',
			'Drapion', 'Thievul', 'Hypno', 'Weavile', 'Scrafty', 'Absol', 'Houndoom', 'Morpeko', 'Cacturne', 'Sharpedo', 
			'Hydreigon', 'Noivern', 'Drampa', 'Goodra', 'Flygon', 'Tyrantrum', 'Dracovish', 'Dracozolt', 'Dragalge', 'Altaria',
			'Boltund', 'Togedemaru', 'Electivire', 'Pachirisu', 'Luxray', 'Lanturn', 'Raichu', 'Volbeat', 'Vikavolt', 'Eelektross',
			'Granbull', 'Shiinotic', 'Ribombee', 'Florges', 'Illumise', 'Mienshao', 'Wigglytuff', 'Rapidash', 'Gardevoir', 'Comfey',
			'Bewear', 'Falinks', 'Infernape', 'Passimian', 'Breloom', 'Grapploct', 'Hariyama', 'Toxicroak', 'Poliwrath', 'Heracross',  
			'Typhlosion', 'Turtonator', 'Magmortar', 'Ninetales', 'Camerupt', 'Pyroar', 'Salazzle', 'Magcargo', 'Centiskorch', 'Darmanitan',  
			'Talonflame', 'Honchkrow', 'Beautifly', 'Gliscor', 'Staraptor', 'Cramorant', 'Drifblim', 'Sirfetchd', 'Minior', 'Pidgeot', 
			'Dusknoir', 'Mismagius', 'Banette', 'Gourgeist', 'Golurk', 'Palossand', 'Jellicent', 'Polteageist', 'Cofagrigus', 'Sableye',  
			'Meganium', 'Cherrim', 'Carnivine', 'Wormadam', 'Tropius', 'Jumpluff', 'Cradily', 'Tsareena', 'Gogoat', 'Victreebel',  
			'Krookodile', 'Torterra', 'Wormadam-Sandy', 'Sandaconda', 'Claydol', 'Whiscash', 'Golem', 'Dugtrio', 'Steelix', 'Sandslash', 
			'Froslass', 'Walrein', 'Glalie', 'Arctozolt', 'Vanilluxe', 'Dewgong', 'Mamoswine', 'Eiscue', 'Avalugg', 'Minun',
			'Cinccino', 'Lickilicky', 'Delcatty', 'Oranguru', 'Castform', 'Bibarel', 'Kecleon', 'Purugly', 'Stantler', 'Zangoose',
			'Tentacruel', 'Roserade', 'Dustox', 'Vileplume', 'Crobat', 'Swalot', 'Toxtricity', 'Seviper', 'Garbodor', 'Arbok', 
			'Malamar', 'Beheeyem', 'Slowbro', 'Mr. Mime', 'Gallade', 'Xatu', 'Girafarig', 'Bruxish', 'Musharna', 'Exeggutor',  
			'Rhyperior', 'Aurorus', 'Gigalith', 'Armaldo', 'Stonjourner', 'Drednaw', 'Sudowoodo', 'Lycanroc', 'Shuckle', 'Probopass',
			'Duraludon', 'Copperajah', 'Empoleon', 'Wormadam-Trash', 'Chimecho', 'Skarmory', 'Scizor', 'Perrserker', 'Klinklang', 'Bisharp', 
			'Feraligatr', 'Slowking', 'Milotic', 'Arctovish', 'Clawitzer', 'Floatzel', 'Politoed', 'Seaking', 'Qwilfish', 'Quagsire',
			'Zweilous', 'Electabuzz', 'Magmar', 'Murkrow', 'Misdreavus', 'Dusclops', 'Lickitung', 'Roselia', 'Rhydon', 'Floette', 'Mr. Mime-Galar', 'Pikachu', 'Charjabug', 'Jigglypuff', 'Jynx', 'Scyther', 
			'Unown', 'Mr. Rime', 'Azelf', 'Uxie', 'Mesprit', 'Rapidash-Galar', 'Ninetales-Alola', 'Simisage', 'Simisear', 'Simipour', 'Darmanitan-Galar', 'Gourgeist-Large', 'Gourgeist-Super', 'Gourgeist-Small', 'Runerigus', 'Bellossom', 'Golem-Alola', 'Dugtrio-Alola', 'Sandslash-Alola', 'Plusle', 'Exeggutor-Alola', 'Lycanroc-Midnight', 'Lycanroc-Dusk', 'Persian', 'Persian-Alola',
 			'Farfetchd', 'Farfetchd-Galar', 'Raichu-Alola', 'Eevee', 'Vaporeon', 'Flareon', 'Jolteon', 'Espeon', 'Umbreon', 'Leafeon', 'Sylveon', 'Glaceon', 'Skuntank', 'Sneasel', 'Gligar',		
			'Absol-Mega', 'Altaria-Mega', 'Banette-Mega', 'Bewear-Mega', 'Butterfree-Mega', 'Camerupt-Mega', 'Cinccino-Mega', 'Drapion-Mega', 'Duraludon-Mega', 'Dusknoir-Mega', 'Feraligatr-Mega', 'Froslass-Mega', 'Gallade-Mega', 'Gardevoir-Mega', 'Glalie-Mega', 'Granbull-Mega', 'Heracross-Mega', 'Houndoom-Mega', 'Hydreigon-Mega', 'Malamar-Mega', 'Meganium-Mega', 'Milotic-Mega', 'Pidgeot-Mega', 'Pinsir-Mega', 'Sableye-Mega', 'Scizor-Mega', 'Sharpedo-Mega', 'Shiinotic-Mega', 'Slowbro-Mega', 'Slowking-Mega', 'Steelix-Mega', 'Talonflame-Mega', 'Thievul-Mega', 'Tentacruel-Mega', 'Typhlosion-Mega',
		],
	},
	{    
        name: "[Gen 8] Pokemon North & South OU",
        desc: "Gravity Monkey's solomod, where a brand new generation of pokemon is playable in a restricted regional dex format.",
			threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/page-4#post-8981852">Thread</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1yW-XuEn5FoXQ6zbdFGwQ9bk9A5ex9pIHbbie84Beyzw/edit?usp=sharing">Spreadsheet</a>`,
			],
        mod: "pokemonns",
		teambuilderFormat: 'NSOU',
        ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
        banlist: ['Baton Pass'],
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['NSOU', 'NSNFE', 'NSLC'];
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if ( !allowedTiers.includes(template.tier) ) {
					return [set.species + ' is not usable in Pokemon North & South OU.'];
				}
			}
		},
	},
	{    
		name: "[Gen 8] Pupumons OU",
		desc: "Pupugugu's fakemon region, the Apple region!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pBJ8SD-BwSduBQL59pLwEAImxMMK1eabrebSmko1OCI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "pupumons",
		teambuilderFormat: 'Pupumons',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Grizzeal', 'Stampyro', 'Hippothagoras', 'Moleder', 'Bombatross', 'Galvia', 'Calistaiji', 'Setstorm', 'Kheprise', 'Weeplim', 'Puddogre', 'Doderror', 'Strignight', 'Coowoo', 'Spectropa', 'Crikeri', 'Boxetta', 'Kingphan', 'Skuntomic', 'Croantagion', 'Gaggular', 'Ultranaut', 'Ultranaut-V', 'Dragulonimbus', 'Dragulare', 'Dragulanche', 'Scrittle', 'Corruptrain', 'Pasdovo', 'Glasiosaur', 'Bellophus', 'Velocust', 'Kuwengu', 'Putango', 'Rishelios', 'Odonaga', 'Solrock-Apple', 'Lunatone-Apple', 'Ooreina', 'Ooreina-Flare', 'Amphikits', 'Detectrice', 'Nosferoyle', 'Amplifire', 'Lumberax', 'Anjamanis', 'Bonfiper', 'Kalover', 'Sophisturn', 'Trestoobee', 'Uractal', 'Venusmog', 'Plutrapeze', 'Mercureign', 'Moncub', 'Rabbear', 'Elephire', 'Centrunkion', 'Hippothesis', 'Hippothalamus', 'Dwole', 'Ducket', 'Swannon', 'Calistone', 'Calistower', 'Dungee', 'Scarobus', 'Seedlim', 'Peetlim', 'Goblone', 'Doduo-Apple', 'Dodrio-Apple', 'Hoothoot-Apple', 'Noctowl-Apple', 'Hauntvea', 'Geecrik', 'Hopetta', 'Phanpy-Apple', 'Donphan-Apple', 'Stunky-Apple', 'Skuntank-Apple', 'Croagunk-Apple', 'Toxicroak-Apple', 'Juguler', 'Astromini', 'Dragutus', 'Peeckay', 'Prettysaur', 'Crichus', 'Anthusol', 'Samunata', 'Odaimyo', 'Anjawoof', 'Threador', 'Goldov'],
	},
	{
		name: "[Gen 8] Pupumons Natdex",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1pBJ8SD-BwSduBQL59pLwEAImxMMK1eabrebSmko1OCI/edit?usp=sharing">Spreadsheet</a>`,
		],

		mod: 'pupumons',
		teambuilderFormat: 'National Dex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass', 'Venomab', 'Forganon', 'Isladon', 'Rangdemos',
			'Baronglaiv', 'Thundra', 'Eruptil', 'Batakala', 'Batambu'
		],
	},
	{
		name: "[Gen 8] Randomly Exist",
		desc: `<b>Randomly Exist</b>: A micrometa where randomly chosen Pokemon can only have their custom regional forms used. Stats are randomly determined.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/page-7#post-9275823">Randomly Exist on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1sl4Ds-vbd_ye4L_jJH6NC85uorT4riX3UxdwQuQEbzA/edit#gid=0">Spreadsheet</a>`,
		],
		mod: 'randomlyexist',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Dragalge', 'Rotom-Wash', 'Pyroar', 'Bronzong', 'Dragapult', 'Spheal', 'Octillery', 'Stakataka', 'Ralts', 'Corsola', 'Exeggcute', 'Regice', 'Vivillon', 'Zapdos', 'Giratina', 'Ninjask', 'Galvantula', 'Gyarados', 'Lunala', 'Reuniclus', 'Porygon-Z', 'Floette', 'Karrablast', 'Vanilluxe'],
	},
/*
	{
		name: "[Gen 8] Randommons",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656899/">National Dex Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658849/">National Dex Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3659038/">National Dex Viability Rankings</a>`,
		],

		mod: 'random',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod'],
		banlist: [
			'Alakazam-Mega', 'Arceus', 'Blastoise-Mega', 'Blaziken', 'Darkrai', 'Deoxys-Attack', 'Deoxys-Base', 'Deoxys-Speed',
			'Dialga', 'Eternatus', 'Genesect', 'Gengar-Mega', 'Giratina', 'Groudon', 'Ho-Oh', 'Kangaskhan-Mega', 'Kyogre',
			'Kyurem-Black', 'Kyurem-White', 'Landorus-Base', 'Lucario-Mega', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo',
			'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Pheromosa', 'Rayquaza', 'Reshiram',
			'Salamence-Mega', 'Shaymin-Sky', 'Solgaleo', 'Xerneas', 'Yveltal', 'Zacian', 'Zamazenta', 'Zekrom', 'Zygarde-Base',
			'Arena Trap', 'Moody', 'Power Construct', 'Shadow Tag', 'Baton Pass',
		],
		teambuilderFormat: "Rand",
	},
*/
	{
		name: "[Gen 8] Random Pool 0",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8894655">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1e49Kywx7ouHlUMQAp7R88wnQ-ZF3ykrUUiMCvK0coCE/edit#gid=171151629">Spreadsheet</a>`,
		],
		mod: 'randompool0',
		ruleset: ['Standard', 'Dynamax Clause', "Data Mod", "Mega Data Mod"],
		banlist: ['Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'RP0') {
					return [set.species + ' is not useable in Random Pool 0.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Roulettemons The Solomod",
		desc: `<b>Roulettemons The Solomod</b>: literally roulettemons but a solomod + clean slate micro`,
		mod: 'roulettemonsthesolomod',
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Species Clause', 'Moody Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Baton Pass Clause', 'OHKO Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: [
			'Spinmadillo', 'Coyoctric', 'Spizelle', 'Fierhog', 'Elatuff', 'Glasyte', 'Bisong', 'Megalo', 'Oysteat', 'Ponymph', 'Hypepion', 'Chickola', 'Skelehawk', 'Catetar', 'Blastquito', 'Hawkward', 'Pandaid', 'Autoad', 'Skelephin', 'Doomossum', 'Llamagic', 'Venoroach', 'Salamados', 'Steelboon', 'Jaguaplume',
		],
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
		},
	},
	{
		name: "[Gen 8] Scootopia",
		desc: "A solomod consisting of Scoopapa's first 30 sprited fakemons!",
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1khgnzqe3xldhLw1LbfjyYDcsltZrgyo8by4Y8EDE4vQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: "scootopia",
		ruleset: ['Standard NatDex', 'Dynamax Clause', 'Evasion Moves Clause', 'Species Clause', 'Z-Move Clause', 'Data Mod'],
		banlist: ['All Pokemon'],
		unbanlist: ['Orchile', 'Dolphena', 'Scalaron', 'Rantler', 'Cobracotta', 'Albatrygon', 'Electangle', 'Torgeist', 'Platypad', 'Soleron', 'Nunopod', 'Zeploom', 'Brawnkey', 'Salamalix', 'Cinnastar', "Muab'Boa", 'Volvolpa', 'Harzodia', 'Cyllindrake', 'Kodokai', 'Jaegorm', 'Jaegorm-Collective', 'Faerenheit', 'Cellsius', 'Kelven', 'Salaos', 'Morndos', 'Pythos', 'Quadringo', 'Corundell', 'Flocura' ],
	},
	{
		name: "[Gen 8] The 3-3-1 Typechart",
		desc: [
			"<b>The 3-3-1 Typechart</b>: A solomod that gives every type 3 weaknesses, 3 resistances, and 1 immunity.",
			],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3660004/post-8939651">Post in the Solomods Megathread</a>`,
		],

		mod: 'the331typechart',
		teambuilderFormat: 'OU',
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['Uber', 'Moody', 'Shadow Tag', 'Baton Pass', 'Kyurem', 'Slowking-Base', 'Slowbro-Base'],
	},
	{    
        name: "[Gen 8] Under The Weather",
        desc: 'Only pokemon with abilities affected by weather are allowed.',
        mod: "undertheweather",
        ruleset: ['Standard NatDex', 'Dynamax Clause', 'Sleep Clause Mod', 'Evasion Moves Clause', 'Species Clause', 'Z-Move Clause'],
        banlist: ['Groudon', 'Kyogre', 'Rayquaza', 'Dracovish', 'Dracozolt', 'Arctozolt', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass', 'Charizard-Mega-Y', 'Charizard-Mega-X', 'Abomasnow-Mega', 'Tyranitar-Mega'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Sun' && template.tier !== 'Rain' && template.tier !== 'Sand' && template.tier !== 'Hail' && template.tier !== 'NFE') {
					return [set.species + ' is not legal in the Under The Weather format.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Waght",
		desc: 'A giant memepost. Abismons 2 electric boogaloo',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Data Mod', 'Z-Move Clause'],
		banlist: ['All Pokemon'],
		unbanlist: ['Chansey', 'Rhydon', 'Ivysaur', 'Blaziken', 'Megaracross', 'Barboach', 'Nickit', 'Chandelure'],
		mod: "waght",
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.getSpecies(set.species);
				if (template.tier !== 'Waght' && template.tier !== 'DoublesWaght') {
					return [set.species + ' is not legal in the [Gen 8] Waght format.'];
				}
			}
		},
	},
	{
		name: "[Gen 8] Wild'mons",
		desc: `<b>Wildmons</b>.`,
		mod: 'wildmons',
		teambuilderFormat: "OU",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Moves Clause', 'Z-Move Clause', 'Mega Rayquaza Clause', 'Data Mod',],
		banlist: [
				//Abilities
				'Arena Trap', 'Power Construct', 'Moody', 'Shadow Tag',
				
				//Items
				'Abomasite', 'Absolite', 'Aerodactylite', 'Aggronite', 'Alakazite', 'Altarianite', 'Ampharosite', 'Audinite', 
				'Banettite', 'Beedrillite', 'Blastoisinite', 'Blazikenite', 'Blue Orb', 'Cameruptite', 'Charizardite X', 
				'Charizardite Y', 'Galladite', 'Gardevoirite', 'Gengarite', 'Glalitite', 'Gyaradosite', 'Heracronite', 
				'Houndoominite', 'Kangaskhanite', 'Latiasite', 'Latiosite', 'Lopunnite', 'Lucarionite', 'Manectite', 'Mawilite', 
				'Medichamite', 'Metagrossite', 'Mewtwonite X', 'Mewtwonite Y', 'Pidgeotite', 'Pinsirite', 'Sablenite', 'Salamencite', 
				'Sceptilite', 'Scizorite', 'Sharpedonite', 'Slowbronite', 'Steelixite', 'Swampertite', 'Tyranitarite', 'Venusaurite', 
				'Bright Powder', 'King\'s Rock', 'Red Orb',
				
				'Assault Vest', 'Choice Band', 'Choice Scarf', 'Choice Specs', 'Eviolite', 'Expert Belt', 'Focus Sash', 'Life Orb',
				'Rocky Helmet', 'Absorb Bulb', 'Adrenaline Orb', 'Air Balloon', 'Black Sludge', 'Blunder Policy', 'Cell Battery', 
				'Damp Rock', 'Eject Button', 'Eject Pack', 'Electric Seed', 'Flame Orb', 'Full Incense', 'Grassy Seed', 'Grip Claw', 
				'Heat Rock', 'Icy Rock', 'Lagging Tail', 'Lax Incense', 'Light Clay', 'Luminous Moss', 'item:Metronome', 'Misty Seed', 
				'Muscle Band', 'Normal Gem', 'Odd Incense', 'Protective Pads', 'Quick Claw', 'Razor Claw', 'Red Card', 'Rock Incense', 
				'Room Service', 'Rose Incense', 'Safety Goggles', 'Scope Lens', 'Sea Incense', 'Shed Shell', 'Shell Bell', 'Smooth Rock', 
				'Snowball', 'Sticky Barb', 'Terrain Extender', 'Throat Spray', 'Toxic Orb', 'Utility Umbrella', 'Wave Incense', 
				'Weakness Policy', 'Wide Lens', 'Wise Glasses', 'Zoom Lens',

				'Heavy-Duty Boots',

				'Big Root', 'Binding Band', 'Destiny Knot', 'Float Stone', 'Focus Band', 'Iron Ball', 'Macho Brace', 'Power Anklet',
				'Power Band', 'Power Belt', 'Power Bracer', 'Power Lens', 'Power Weight', 'Ring Target',

				//Legendary items
				/*'Adamant Orb', 'Griseous Orb', 'Lustrous Orb', 'Soul Dew',*/

				//Moves
				'Baton Pass',
				
				//Pokemon
				'AG', 'Uber',
		],
	},
	{
		name: "[Gen 8] Yoshiblaze's Greatest Hits",
		desc: [
			"Yoshiblaze's Greatest Hits",
		],
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/10_bQ22nYNsWUrEyEvl080VaijY1CMZip0x-ItLqXOsk/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'ybsgreatesthits',	
		ruleset: ['Standard', 'Dynamax Clause', 'Data Mod'],
		banlist: ['All Pokemon', 'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass'],
		unbanlist: ['Decidium Z', 'Revelation Dance',
					  'Alakazam', 'Riolu', 'Gallade', 'Gardevoir', 'Morpeko', 'Zapdos-Galar', 'Archeops', 'Castform', 'Corsola', 'Chatot', 
						'Ariados', 'Carnivine', 'Weavile', 'Noctowl', 'Lurantis', 'Octillery', 'Articuno', 'Unfezant', 'Kricketune', 'Leafeon',
						'Dedenne', 'Electrode', 'Luxray', 'Seviper', 'Kangaskhan', 'Venusaur', 'Charizard', 'Blastoise', 'Houndoom', 'Scyther',
						'Probopass', 'Luxio', 'Banette', 'Heracross', 'Pidgeot', 'Kirlia', 'Sandslash', 'Pelipper', 'Monferno', 'Greedent', 
						'Indeedee-F', 'Primarina', 'Hoopa', 'Hoopa-Unbound', 'Delibird', 'Vanilluxe', 'Oranguru', 'Primeape', 'Machamp', 
						'Wartortle', 'Garbodor', 'Yanmega', 'Rotom-Fan', 'Oricorio-Sensu', 'Ledian', 'Accelgor', 'Floatzel', 'Furret', 'Masquerain',
						'Arbok', 'Rapidash', 'Flygon', 'Polteageist', 'Decidueye', 'Kyurem-Black', 'Obstagoon', 'Starmie', 'Xurkitree', 'Skuntank',
						'Tauros', 'Sudowoodo', 'Runerigus', 'Talonflame', 'Incineroar', 'Dracovish', 'Armaldo', 'Hitmonlee', 'Flaaffy', 'Sunflora',
						'Clefable', 'Mawile', 'Avalugg', 'Deoxys', 'Cherrim', 'Ampharos', 'Centiskorch', 'Magmortar', 'Electivire', 'Swampert', 'Copperajah',
						'Pyroar', 'Pinsir', 'Toucannon', 'Tapu Koko', 'Rotom-Heat', 'Fearow', 'Mightyena', 'Manectric', 'Slaking', 'Dragapult',
						'Krookodile', 'Carracosta', 'Goodra', 'Oricorio-Pom-Pom', 'Delcatty', 'Tropius', 'Skitty'],
	},
	
	// Past Gens OU
	///////////////////////////////////////////////////////////////////

	{
		section: "Past Gens OU",
		column: 4,
	},
	{
		name: "[Gen 7] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/sm/tags/ou/">USM OU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3638845/">USM OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3621329/">USM OU Viability Rankings</a>`,
		],

		mod: 'gen7',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Arena Trap', 'Power Construct', 'Shadow Tag', 'Baton Pass'],
	},
	{
		name: "[Gen 6] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/xy/tags/ou/">ORAS OU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133793/">ORAS OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3623399/">ORAS OU Viability Rankings</a>`,
		],

		mod: 'gen6',
		ruleset: ['Standard', 'Swagger Clause'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass'],
	},
	{
		name: "[Gen 6] OU (No Megas)",
		threads: [
			`&bullet; <a href="https://www.smogon.com/dex/xy/tags/ou/">ORAS OU Banlist</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133793/">ORAS OU Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3623399/">ORAS OU Viability Rankings</a>`,
		],

		mod: 'gen6',
		ruleset: ['Standard', 'Swagger Clause'],
		banlist: ['Uber', 'Arena Trap', 'Shadow Tag', 'Soul Dew', 'Baton Pass',
					"Venusaurite", "Blastoisinite", "Charizardite Y", "Charizardite X", "Beedrillite", "Pidgeotite", "Alakazite", "Slowbronite", "Gengarite", 
					"Kangaskhanite", "Pinsirite", "Gyaradosite", "Aerodactylite", "Mewtwonite X", "Mewtwonite Y", "Ampharosite", "Steelixite", "Scizorite",
					"Heracronite", "Houndoominite", "Tyranitarite", "Sceptilite", "Blazikenite", "Swampertite", "Gardevoirite", "Sablenite", "Mawilite",
					"Aggronite", "Medichamite", "Manectite", "Sharpedonite", "Cameruptite", "Altarianite", "Banettite", "Absolite", "Glalitite", "Salamencite",
					"Metagrossite", "Latiasite", "Latiosite", "Lopunnite", "Garchompite", "Lucarionite", "Abomasite", "Galladite", "Audinite", "Diancite"
					],
	},
	{
		name: "[Gen 5] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133791/">BW2 Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658220/">BW2 OU Viability Rankings</a>`,
		],

		mod: 'gen5',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Sleep Moves Clause', 'Swagger Clause'],
		banlist: ['Uber', 'Arena Trap', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Rush', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "[Gen 4] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3506147/">DPP OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133790/">DPP Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3652538/">DPP OU Viability Rankings</a>`,
		],

		mod: 'gen4',
		ruleset: ['Standard'],
		banlist: ['Uber', 'Sand Veil', 'Soul Dew', 'Swinub + Snow Cloak', 'Piloswine + Snow Cloak', 'Mamoswine + Snow Cloak', 'Baton Pass'],
	},
	{
		name: "[Gen 3] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133789/">ADV Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3503019/">ADV OU Viability Rankings</a>`,
		],

		mod: 'gen3',
		ruleset: ['Standard', '3 Baton Pass Clause'],
		banlist: ['Uber', 'Smeargle + Baton Pass'],
	},
	{
		name: "[Gen 3] Sample Team Randbats",
		team: 'random',
		mod: 'gen3sampleteamrandbats',
		ruleset: ['Standard', 'One Boost Passer Clause', 'Freeze Clause Mod'],
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				var side = pokemon.side;
				this.hint(side.team[0].sampleTeamName, true, pokemon.side);
			}
		},
	},
	{
		name: "[Gen 2] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133788/">GSC Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3556533/">GSC OU Viability Rankings</a>`,
		],

		mod: 'gen2',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8133786/">RBY Sample Teams</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3572352/">RBY OU Viability Rankings</a>`,
		],

		mod: 'gen1',
		ruleset: ['Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 7 Let's Go] OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3658931/">LGPE OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3656868/">LGPE OU Viability Rankings</a>`,
		],

		mod: 'letsgo',
		searchShow: false,
		forcedLevel: 50,
		ruleset: ['Obtainable', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 7] Custom Game",

		mod: 'gen7',
		searchShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		teamLength: {
			validate: [1, 24],
			battle: 24,
		},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		name: "[Gen 7] Doubles OU",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3661293/">USUM Doubles OU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8394179/">USUM Doubles OU Viability Rankings</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/posts/8394190/">USUM Doubles OU Sample Teams</a>`,
		],

		mod: 'gen7',
		gameType: 'doubles',
		// searchShow: false,
		ruleset: ['Standard Doubles', 'Swagger Clause'],
		banlist: ['DUber', 'Power Construct', 'Eevium Z', 'Dark Void'],
	},
	// Past Generations
	///////////////////////////////////////////////////////////////////

	/*{
		section: "Past Generations",
		column: 4,
	},*/
	{
		name: "[Gen 3] Ubers Custom Game",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286280/">ADV Ubers</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] UU Custom Game",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3585923/">ADV UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3548578/">ADV UU Viability Rankings</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard', 'NFE Clause'],
		banlist: ['Uber', 'OU', 'UUBL', 'Smeargle + Ingrain'],
		unbanlist: ['Scyther'],
	},
	{
		name: "[Gen 3] 1v1 Custom Game",
		desc: `Bring three Pok&eacute;mon to Team Preview and choose one to battle.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8031456/">ADV 1v1</a>`,
		],

		mod: 'gen3',
		searchShow: false,
		challengeShow: false,
		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['[Gen 3] OU', 'Accuracy Moves Clause', 'Sleep Moves Clause', 'Team Preview'],
		banlist: ['Slaking', 'Snorlax', 'Suicune', 'Destiny Bond', 'Explosion', 'Ingrain', 'Perish Song', 'Self-Destruct'],
	},
	{
		name: "[Gen 3] Custom Game",

		mod: 'gen3',
		searchShow: false,
		challengeShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Doubles Custom Game",

		mod: 'gen3',
		gameType: 'doubles',
		searchShow: false,
		challengeShow: false,
		debug: true,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] Ubers Custom Game",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/posts/8286282/">GSC Ubers</a>`,
		],

		mod: 'gen2',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard'],
	},
	{
		name: "[Gen 2] UU Custom Game",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3576710/">GSC UU</a>`],

		mod: 'gen2',
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 2] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 2] NU Custom Game",
		threads: [`&bullet; <a href="https://www.smogon.com/forums/threads/3642565/">GSC NU</a>`],

		mod: 'gen2',
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 2] UU'],
		banlist: ['UU', 'NUBL'],
	},
	{
		name: "[Gen 2] Custom Game",

		mod: 'gen2',
		searchShow: false,
		challengeShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] UU Custom Game",
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3573896/">RBY UU Metagame Discussion</a>`,
			`&bullet; <a href="https://www.smogon.com/forums/threads/3647713/">RBY UU Viability Rankings</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		challengeShow: false,
		ruleset: ['[Gen 1] OU'],
		banlist: ['OU', 'UUBL'],
	},
	{
		name: "[Gen 1] OU (Tradeback) Custom Game",
		desc: `RBY OU with movepool additions from the Time Capsule.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/articles/rby-tradebacks-ou">RBY Tradebacks OU</a>`,
		],

		mod: 'gen1',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Obtainable', 'Allow Tradeback', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Stadium OU Custom Game",

		mod: 'stadium',
		searchShow: false,
		challengeShow: false,
		ruleset: ['Standard', 'Team Preview', '!Sleep Clause Mod', 'Stadium Sleep Clause'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Custom Game",

		mod: 'gen1',
		searchShow: false,
		challengeShow: false,
		debug: true,
		maxLevel: 9999,
		battle: {trunc: Math.trunc},
		defaultLevel: 100,
		ruleset: ['HP Percentage Mod', 'Cancel Mod'],
	},
	{
		section: "Super Secret Tour Formats",
		column: 3,
	},
	// SUPER SECRET FORMATS OWO
	// These are all titled Custom Game so they don't show up in the teambuilder.
	{
		name: "[Gen 8] M4A Monothreat Normal Custom Game",
		ruleset: ['Monothreat Normal', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Lopunnite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Fire Custom Game",
		ruleset: ['Monothreat Fire', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Water Custom Game",
		ruleset: ['Monothreat Water', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Electric Custom Game",
		ruleset: ['Monothreat Electric', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Grass Custom Game",
		ruleset: ['Monothreat Grass', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Ice Custom Game",
		ruleset: ['Monothreat Ice', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Fighting Custom Game",
		ruleset: ['Monothreat Fighting', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Poison Custom Game",
		ruleset: ['Monothreat Poison', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Ground Custom Game",
		ruleset: ['Monothreat Ground', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Flying Custom Game",
		ruleset: ['Monothreat Flying', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Talonflite'],
		unbanlist: ['Butterfrite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Psychic Custom Game",
		ruleset: ['Monothreat Psychic', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Meowstic-Base ++ Meowsticite', 'Meowstic-Mega'],
		unbanlist: ['Meowstic-F-Mega'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Bug Custom Game",
		ruleset: ['Monothreat Bug', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Rock Custom Game",
		ruleset: ['Monothreat Rock', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Lycanroc-Dusk-Mega', 'Lycanroc-Dusk ++ Lycanite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Ghost Custom Game",
		ruleset: ['Monothreat Ghost', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Gourgeist-Large-Mega', 'Gourgeist-Large ++ Gourgeite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Dragon Custom Game",
		ruleset: ['Monothreat Dragon', 'Standard NatDex', 'Standard M4A Monothreat'],
		banlist: ['Altarianite'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Dark Custom Game",
		ruleset: ['Monothreat Dark', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Steel Custom Game",
		ruleset: ['Monothreat Steel', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Monothreat Fairy Custom Game",
		ruleset: ['Monothreat Fairy', 'Standard NatDex', 'Standard M4A Monothreat'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		name: "[Gen 8] M4A Megas Only Custom Game",
		ruleset: ['Megas Only Mod', 'Standard NatDex', 'Standard M4A', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Mega Data Mod'],
		mod: 'm4av6',
		searchShow: false,
		challengeShow: false,
	},
	{
		section: "Non-Pet Mod Bonus Formats",
		column: 3,
	},
	// Littlest Cup
	///////////////////////////////////////////////////////////////////
	{
		name: "[Gen 8] Littlest Cup",
		desc: [
			"<b>Littlest Cup</b>: A National Dex metagame where only Baby Pokemon are allowed."
		],
		threads: [
			`&bullet; <a href="https://pastebin.com/PtqmRUhG">Littlest Cup VR and Sample Sets</a>`,
		],
		mod: 'littleestcup',
		maxLevel: 1,
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Sleep Clause Mod'],
		banlist: ['All Pokemon', 'Belly Drum', 'Huge Power'],
		unbanlist: ['Shadow Tag', 'Pichu', 'Cleffa', 'Igglybuff', 'Togepi', 'Tyrogue', 'Smoochum', 'Elekid', 'Magby', 'Azurill', 'Wynaut', 'Budew', 'Chingling', 'Bonsly', 'Mime Jr.', 'Happiny', 'Munchlax', 'Riolu', 'Mantyke', 'Toxel'],
	},
];
