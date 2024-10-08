import settings from "./settings";
import STuF from "../STuFLib"
import { sounds, soundsRegex, COLORS } from "./constants";

export function replacePlaceholders(text, arr) {
    return text.replace(/\$\{(\d+)\}/g, (match, index) => {
        return arr[parseInt(index)] !== undefined ? arr[parseInt(index)] : match;
    });
}

function timeFunc(number, suffix) {
    if (number > 0) number = " " + String(number) + suffix
    else number = ""
    return number
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function checkForSounds(message) {
    if (settings.funni) {
        soundsRegex.lastIndex = 0
        if (soundsRegex.test(message)) {
            soundsRegex.lastIndex = 0
            const matches = message.match(soundsRegex)
            let sound = sounds[matches[0]]
            try {
                sound[0]?.setVolume(sound[1] * settings.volume)?.play()
            } catch (error) {
                console.error(error)
            }
        }
    }
}

function mergeAlternating(arr1, arr2) {
    const result = [];
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++) {
        if (i < arr1.length) {
            result.push(arr1[i]);
        }
        if (i < arr2.length) {
            result.push(arr2[i]);
        }
    }
    return result;
}

function formatLinks(message, userName) {
    if (settings.enableSTuF) {
        const Bot = `${settings.newName} ${settings.discordName} ${COLORS[settings.colorSelected]}${userName}${COLORS[settings.colorSelectedChat]}: `
        if (message.startsWith(" ")) message = message.slice(1)
        const firstLink = message.startsWith("[LINK]")
        const matcher = message.match(/\[LINK\]\(l\$[^)]+\)/g)
        if (matcher) {
            message = message.split(/\[LINK\]\(l\$[^)]+\)/g)
            links = matcher.map((value) => {
                let link = value.match(/\((l\$[^)]*)\)/)[1]
                if (!link) return
                link = STuF.decode(link)
                return new TextComponent(settings.linkName).setClick('open_url', link).setHover('show_text', link)
            }).filter(Boolean)
            let result = undefined
            if (firstLink) {
                result = new Message(Bot, ...mergeAlternating(links, message))
            }
            else {
                result = new Message(Bot, ...mergeAlternating(message, links))
            }
            return result
        }
    }
}

export class specialFormat {

    static contest1(message, matcher) {
        crop = matcher[1]
        hours = parseInt(matcher[2])
        minutes = parseInt(matcher[3])
        seconds = parseInt(matcher[4])
        hours = timeFunc(hours, "h")
        minutes = timeFunc(minutes, "m")
        seconds = timeFunc(seconds, "s")
        return `&eNext ${crop} contest in${hours}${minutes}${seconds}`
    }

    static contest2(message, matcher) {
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

    static contest3(message, matcher) {
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

    static contest4(message, matcher) {
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

    static bestiary(message, matcher) {
        let bestiary = matcher[1]
        let user = matcher[2]
        let profile = matcher[3]
        let message = matcher[4]
        const matches = message.match(/(\w[\w\s]* \d+\/\d+(?: \([\d.]+\))? )/g) //Bestiary Regex
        let newMsg = `\n &6&l${bestiary} bestiary - &f&l${user} (&f&l${profile})&6&l:`
        for (let i in matches) {
            let data = matches[i].match(/(\w[\w\s]*) (\d+)\/(\d+)(?: \(([\d.]+)\))?/) //Bestiary Data Regex
            newMsg += `\n &e&l${data[1]} &f&l${data[2]}&e&l/&f&l${data[3]}`
            if (data[4]) {
                Value = parseFloat(data[4])
                let color = "&4"
                if (Value > 1) {
                    color = "&a"
                }
                else if (Value > 0.75) {
                    color = "&e"
                }
                else if (Value > 0.5) {
                    color = "&6"
                }
                else if (Value > 0.25) {
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

    static bestiary2(message, matcher) {
        let mob = matcher[1]
        let user = matcher[2]
        let profile = matcher[3]
        let num = matcher[4]
        let str = "&4&l0"
        if (parseInt(num) > 0) str = "&a&lPro"
        return `&f&l${user} (&f&l${profile})&6&l:\n &6&l${mob} - &f&l${num}&e&l/&f&l0 &e&l(${str}&e&l)`
    }

    static collection(message, matcher) {
        let skill = matcher[1]
        let user = matcher[2]
        let profile = matcher[3]
        let message = matcher[4]
        const matches = message.match(/(\w[\w\s]* \d+\/\d+ \([\d,]+(?:\/[\d,]+)?\) )/g) //Collection Regex
        let newMsg = `&6&l${capitalizeFirstLetter(skill)} collections - &f&l${user} (&f&l${profile})&6&l:`
        for (i in matches) {
            let data = matches[i].match(/(\w[\w\s]*) (\d+)\/(\d+) \(([\d,\/]+)\)/) //Collection Data Regex
            newMsg += `\n &e&l${data[1]} &f&l${data[2]}&e&l/&f&l${data[3]} &e&l(&f&l${data[4].replace("/", "&e&l/&f&l")}&e&l)`
        }
        return newMsg
    }

    static discord(message, matcher) {
        user = matcher[1]
        message = matcher[2]
        if (user.includes(":")) {
            user = user.split(": ");
            userName = user.shift();
            message = user.reduce((accumulator, currentValue) => accumulator + currentValue + ": ", "") + message;
        }
        else {
            userName = user;
        }
        checkForSounds(message)
        const linkMessage = formatLinks(message, user)
        if (linkMessage) return linkMessage
        return `(bypass)${settings.newName} ${settings.discordName} ${COLORS[settings.colorSelected]}${userName}${COLORS[settings.colorSelectedChat]}: ${message}`;

    }
}