import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @NumberProperty,
    @ColorProperty,
    @SliderProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
} from 'Vigilance/index';

// The only parameter that is required is the first, which should be the Module name.
// The other 2 parameters are optional.
// The 2nd parameter is the title of the settings window, seen in the top left above the
// category list.
// The 3rd parameter is an object that determines the sorting order of the categories.

@Vigilant('Pridge', 'Pridge Settings', {
    getCategoryComparator: () => (a, b) => {
        // By default, categories, subcategories, and properties are sorted alphabetically.
        // You can override this behavior by returning a negative number if a should be sorted before b,
        // or a positive number if b should be sorted before a.

        // In this case, we can put Not general to be above general.
        const categories = ['Pridge'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {

    @SwitchProperty({
        name: 'Toggle Formatter',
        description: 'Enable the bridge bot formatter',
        category: 'Pridge',
        subcategory: '! Important !',
    })
    enabled = true;

    @TextProperty({
        name: 'Bridge bot IGN',
        description: "The bot's IGN",
        category: 'Pridge',
        subcategory: 'Bot',
    })
    botIGN = 'NqekMyBeloved';

    @TextProperty({
        name: 'Bridge bot Rank',
        description: "The bot's Guild Rank",
        category: 'Pridge',
        subcategory: 'Bot',
    })
    botRank = 'Admin';

    @TextProperty({
        name: 'New name!',
        description: "The new way the chat will be shown as",
        category: 'Pridge',
        subcategory: 'Bot',
    })
    newName = '&2Pridge >';

    @TextProperty({
        name: 'Bot Name',
        description: "The name for the bot whenever it is his job to do something",
        category: 'Pridge',
        subcategory: 'Bot',
    })
    botName = '&b&l(Bot)';

    @SelectorProperty({
        name: 'Discord name color',
        description: "The color for discord users it is a discord message",
        category: 'Pridge',
        subcategory: 'Discord',
        options: ['§0Black', '§1Dark Blue', '§2Dark Green', '§3Cyan', '§4Dark Red', '§5Purple', '§6Orange', '§7Light Gray', '§8Dark Gray', '§9Light Blue', '§aLight Green', '§bBright Blue', "§cLight Red", "§dPink", "§eYellow", "§fWhite", "§zRainbow 1", "§ZRainbow 2"]
    })
    colorSelected = 14;

    @SelectorProperty({
        name: 'Discord message color',
        description: "The color for discord messages",
        category: 'Pridge',
        subcategory: 'Discord',
        options: ['§0Black', '§1Dark Blue', '§2Dark Green', '§3Cyan', '§4Dark Red', '§5Purple', '§6Orange', '§7Light Gray', '§8Dark Gray', '§9Light Blue', '§aLight Green', '§bBright Blue', "§cLight Red", "§dPink", "§eYellow", "§fWhite", "§zRainbow 1", "§ZRainbow 2"]
    })
    colorSelectedChat = 15;

    @TextProperty({
        name: 'Discord representation',
        description: "The name for discord whenever it is a discord message",
        category: 'Pridge',
        subcategory: 'Discord',
    })
    discordName = '&9&l(Discord)';

    @SwitchProperty({
        name: 'Enable link formatting',
        description: 'Choose whether or not you want links to be formatted\nTo excerce your right to not see links!',
        category: 'Pridge',
        subcategory: 'Other',
    })
    enableSTuF = true;
    
    @TextProperty({
        name: 'Link Representation',
        description: "The text for a link whenever it is sent",
        category: 'Pridge',
        subcategory: 'Discord',
    })
    linkName = '&a&l[Link]';

    @SwitchProperty({
        name: 'Also modify normal guild messages',
        description: 'Makes it so normal guild messages also follow the chat formatting',
        category: 'Pridge',
        subcategory: 'Other',
    })
    guild = true;

    @SwitchProperty({
        name: 'Also modify join/leave guild messages',
        description: 'Makes it so normal guild join/leave messages also follow the chat formatting',
        category: 'Pridge',
        subcategory: 'Other',
    })
    joinleave = true;

    @SwitchProperty({
        name: 'Sound Effects',
        description: 'Sound Effects on *sound* /pridgesounds or /shridgesounds to see sound effects',
        category: 'Pridge',
        subcategory: 'Other',
    })
    funni = true;

    @PercentSliderProperty({
        name: "Sounds Volume",
        description: "How loud the sound effects are",
        category: 'Pridge',
        subcategory: "Other"
    })
    volume = 1;

    @SwitchProperty({
        name: 'Timestamps',
        description: 'Turn on timestamps on pridge messages, just like patcher',
        category: 'Pridge',
        subcategory: 'Timestamps',
    })
    timestamp = true;

    @SwitchProperty({
        name: '12 Hour mode',
        description: 'Timestamps will use the 12h AM/PM format',
        category: 'Pridge',
        subcategory: 'Timestamps',
    })
    timestamp12hour = false;

    @SliderProperty({
        name: "Timezone offset",
        description: "How offset time is hourly",
        category: 'Pridge',
        subcategory: "Timestamps",
        min: -12,
        max: 12
    })
    timeOffset = 0;

    @SwitchProperty({
        name: 'Developer Mode',
        description: 'Just gives me some extra data that helps',
        category: 'Pridge',
        subcategory: 'Other',
    })
    devMode = false;

    @SwitchProperty({
        name: 'Auto update formatings on load',
        description: 'Update automatically the formatting once module loads',
        category: 'Pridge',
        subcategory: 'Other',
    })
    autoUpdate = true;

    constructor() {
        this.initialize(this);
        this.addDependency('12 Hour mode', 'Timestamps');
        this.addDependency('Timezone offset', 'Timestamps');
        this.addDependency('Sounds Volume', 'Sound Effects');
    }
}

export default new Settings();
