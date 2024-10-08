export const jsonLink = "https://raw.githubusercontent.com/Ricciow/Pridge/master/formating.json"

export const COLORS = ["&0", "&1", "&2", "&3", "&4", "&5", "&6", "&7", "&8", "&9", "&a", "&b", "&c", "&d", "&e", "&f", "§z", "§Z"]

export const sounds = {
    "*rap*": [new Sound({ source: "rap.ogg" }), 0.5],
    "*sus*": [new Sound({ source: "sus.ogg" }), 0.05],
    "*bonk*": [new Sound({ source: "bonk.ogg" }), 1],
    "*bunger?*": [new Sound({ source: "bunger1.ogg" }), 1],
    "*bunger!*": [new Sound({ source: "bunger2.ogg" }), 1],
    "*bunger:(*": [new Sound({ source: "bunger3.ogg" }), 1],
    "*bwomp*": [new Sound({ source: "bwomp.ogg" }), 1],
    "*dies*": [new Sound({ source: "dies.ogg" }), 1],
    "*grr*": [new Sound({ source: "grr.ogg" }), 0.5],
    "*happi*": [new Sound({ source: "happi-happi-happi.ogg" }), 0.25],
    "*hog rida*": [new Sound({ source: "hog.ogg" }), 1],
    "*meow*": [new Sound({ source: "meow.ogg" }), 1],
    "*noot noot*": [new Sound({ source: "noot-noot.ogg" }), 1],
    "*poyo*": [new Sound({ source: "poyo.ogg" }), 1],
    "*rng*": [new Sound({ source: "rareDrop.ogg" }), 0.5],
    "*meow meow meow*": [new Sound({ source: "tripleMeow.ogg" }), 0.5],
    "*trol*": [new Sound({ source: "trol.ogg" }), 1],
    "*yipee*": [new Sound({ source: "yipee.ogg" }), 1],
    "*winning*": [new Sound({ source: "winning.ogg" }), 0.25],
    "*losing*": [new Sound({ source: "losing.ogg" }), 0.1],
    "*gambling*": [new Sound({ source: "gambling.ogg" }), 0.1]
}

export const soundsRegex = new RegExp(Object.keys(sounds).map((value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}).join("|"), "g")