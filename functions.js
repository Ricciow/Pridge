import settings from "./settings";

export function replacePlaceholders(text, arr) {
    return text.replace(/\$\{(\d+)\}/g, (match, index) => {
        return arr[parseInt(index)] !== undefined ? arr[parseInt(index)] : match;
    });
}
  
function timeFunc(number, suffix) {
    if(number>0) number = " "+ String(number) + suffix
    else number = ""
    return number
}

export function contest1(message, matcher) {
    crop = matcher[1]
    hours = parseInt(matcher[2])
    minutes = parseInt(matcher[3])
    seconds = parseInt(matcher[4])
    hours = timeFunc(hours, "h")
    minutes = timeFunc(minutes, "m")
    seconds = timeFunc(seconds, "s")
    return `&eNext ${crop} contest in${hours}${minutes}${seconds}`
}

export function contest2(message, matcher) {
    crop1 = matcher[1]
    crop2 = matcher[2]
    crop3 = matcher[3]
    minutesActive = matcher[4]
    secondsAtive = matcher[5]
    crop = matcher[6]
    hours = parseInt(matcher[7])
    minutes = parseInt(matcher[8])
    seconds = parseInt(matcher[9])
    minutesActive = timeFunc(minutesActive, "m")
    secondsAtive = timeFunc(secondsAtive, "s")
    hours = timeFunc(hours, "h")
    minutes = timeFunc(minutes, "m")
    seconds = timeFunc(seconds, "s")
    return `\n &a&lActive Contest\n &6${crop1}, ${crop2}, ${crop3}\n&eNext ${crop} contest in&f${hours}${minutes}${seconds}`
}

export function contest3(message, matcher) {
    crop1 = matcher[1]
    crop2 = matcher[2]
    crop3 = matcher[3]
    minutesActive = matcher[4]
    secondsAtive = matcher[5]
    crop4 = matcher[6]
    crop5 = matcher[7]
    crop6 = matcher[8]
    hours = parseInt(matcher[9])
    minutes = parseInt(matcher[10])
    seconds = parseInt(matcher[11])
    minutesActive = timeFunc(minutesActive, "m")
    secondsAtive = timeFunc(secondsAtive, "s")
    hours = timeFunc(hours, "h")
    minutes = timeFunc(minutes, "m")
    seconds = timeFunc(seconds, "s")
    return `\n &a&lActive Contest\n &6${crop1}, ${crop2}, ${crop3}\n &e&lNext: \n &6${crop4}, ${crop5}, ${crop6}\n &eIn&f${hours}${minutes}${seconds}`
}

export function contest4(message, matcher) {
    crop1 = matcher[1]
    crop2 = matcher[2]
    crop3 = matcher[3]
    hours = parseInt(matcher[4])
    minutes = parseInt(matcher[5])
    seconds = parseInt(matcher[6])
    hours = timeFunc(hours, "h")
    minutes = timeFunc(minutes, "m")
    seconds = timeFunc(seconds, "s")
    return `&e&lNext:\n &6${crop1}, ${crop2}, ${crop3}\n &eIn&f${hours}${minutes}${seconds}`
}

const bestiaryRegex = /(\w[\w\s]* \d+\/\d+(?: \([\d.]+\))? )/g
const beDataRegex = /(\w[\w\s]*) (\d+)\/(\d+)(?: \(([\d.]+)\))?/

export function bestiary(message, matcher) {
    let bestiary = matcher[1]
    let user = matcher[2]
    let profile = matcher[3]
    let message = matcher[4]
    const matches = message.match(bestiaryRegex)
    let newMsg = `\n &6&l${bestiary} bestiary - &f&l${user} (&f&l${profile})&6&l:`
    for (let i in matches) {
        let data = matches[i].match(beDataRegex)
        newMsg += `\n &e&l${data[1]} &f&l${data[2]}&e&l/&f&l${data[3]}`
        if(data[4]) {
            Value = parseFloat(data[4])
            let color = "&4"
            if(Value > 1) {
                color = "&a"
            }
            else if(Value > 0.75) {
                color = "&e"
            }
            else if(Value > 0.5) {
                color = "&6"
            }
            else if(Value > 0.25) {
                color = "&c"
            }
            newMsg += ` &e&l(${color}&l${data[4]}&e&l)`
        }
        else {
            newMsg += ` &e&l(&a&lPro&e&l)`
        }
    }
    return newMsg
}

export function bestiary2(message, matcher) {
    let mob = matcher[1]
    let user = matcher[2]
    let profile = matcher[3]
    let num = matcher[4]
    let str = "&4&l0"
    if(parseInt(num) > 0) str = "&a&lPro"
    return `&f&l${user} (&f&l${profile})&6&l:\n &6&l${mob} - &f&l${num}&e&l/&f&l0 &e&l(${str}&e&l)`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const collectionRegex = /(\w[\w\s]* \d+\/\d+ \([\d,]+(?:\/[\d,]+)?\) )/g
const dataRegex = /(\w[\w\s]*) (\d+)\/(\d+) \(([\d,\/]+)\)/

export function collection(message, matcher) {
    let skill = matcher[1]
    let user = matcher[2]
    let profile = matcher[3]
    let message = matcher[4]
    const matches = message.match(collectionRegex)
    let newMsg = `&6&l${capitalizeFirstLetter(skill)} collections - &f&l${user} (&f&l${profile})&6&l:`
    for (i in matches) {
        let data = matches[i].match(dataRegex)
        newMsg += `\n &e&l${data[1]} &f&l${data[2]}&e&l/&f&l${data[3]} &e&l(&f&l${data[4].replace("/", "&e&l/&f&l")}&e&l)`
    }
    return newMsg
}

export const sounds = {
    "*rap*": [new Sound({ source: "rap.ogg"}), 0.5],
    "*sus*": [new Sound({ source: "sus.ogg"}), 0.05],
    "*bonk*": [new Sound({ source: "bonk.ogg"}), 1],
    "*bunger?*": [new Sound({ source: "bunger1.ogg"}), 1],
    "*bunger!*": [new Sound({ source: "bunger2.ogg"}), 1],
    "*bunger:(*": [new Sound({ source: "bunger3.ogg"}), 1],
    "*bwomp*": [new Sound({ source: "bwomp.ogg"}), 1],
    "*dies*": [new Sound({ source: "dies.ogg"}), 1],
    "*grr*": [new Sound({ source: "grr.ogg"}), 0.5],
    "*happi*": [new Sound({ source: "happi-happi-happi.ogg"}), 0.25],
    "*hog rida*": [new Sound({ source: "hog.ogg"}), 1],
    "*meow*": [new Sound({ source: "meow.ogg"}), 1],
    "*noot noot*": [new Sound({ source: "noot-noot.ogg"}), 1],
    "*poyo*": [new Sound({ source: "poyo.ogg"}), 1],
    "*rng*": [new Sound({ source: "rareDrop.ogg"}), 0.5],
    "*meow meow meow*": [new Sound({ source: "tripleMeow.ogg"}), 0.5],
    "*trol*": [new Sound({ source: "trol.ogg"}), 1],
    "*yipee*": [new Sound({ source: "yipee.ogg"}), 1],
    "*winning*":[new Sound({ source: "winning.ogg"}), 0.25],
    "*losing*":[new Sound({ source: "losing.ogg"}), 0.1],
    "*gambling*":[new Sound({ source: "gambling.ogg"}), 0.1]
}

export const soundsRegex = new RegExp(Object.keys(sounds).map((value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}).join("|"), "g")

export function checkForSounds(message) {
    if(settings.funni) {
        soundsRegex.lastIndex = 0
        if(soundsRegex.test(message)) {
            soundsRegex.lastIndex = 0
            const matches = message.match(soundsRegex)
            let sound = sounds[matches[0]]
            try {
                sound[0]?.setVolume(sound[1]*settings.volume)?.play()   
            } catch (error) {
                console.error(error) 
            }
        }
    }
}

//TODO: Whenever we get image sending working...

const COLORS = ["&0","&1","&2","&3","&4","&5","&6","&7","&8","&9","&a","&b","&c","&d","&e","&f"]

export function discord(message, matcher) {
    user = matcher[1]
    message = matcher[2]
    if(user.includes(":")) {
        user = user.split(": ");
        userName = user.shift();
        message = user.reduce((accumulator, currentValue) => accumulator + currentValue + ": ", "") + message;
    }
    else {
        userName = user;
    }
    return `(bypass)${settings.newName} ${settings.discordName} ${COLORS[settings.colorSelected]}${userName}${COLORS[settings.colorSelectedChat]}: ${message}`;
}

