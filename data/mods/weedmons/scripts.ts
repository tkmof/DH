export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen9',
	gen: 9,

	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['Weedmons', 'Weedmons NFE', 'Weedmons LC'],
	},
};
