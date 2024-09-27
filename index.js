ChatLib.chat("&5[&9&lBridge&5] &6&lLoading!");
import settings from "./settings";
import { ChatManager } from "./ChatManager";
import { sounds } from "./functions";

// * Main Command
register("command", () => {
    settings.openGUI()
}).setName("pridge").setAliases("shridge");

// * Command to see sounds
register('command', (...sound) => {
    sound = sounds["*"+sound?.join(" ")+"*"]
    if(sound) {
        try {
            sound[0]?.setVolume(sound[1]*settings.volume)?.play()   
        } catch (error) {
            console.error(error) 
        }
    }
    else if((sound??[]).length > 0) {
        ChatLib.chat("&c&lThat isnt a sound!")
    }
    else {
        ChatLib.chat(`&6&lAvailable sounds (&e&l*sound*&6&l):\n &f${Object.keys(sounds).map((sound) => sound.replace(/\*/g, "")).join("&6, &f")}`)
    }
}).setTabCompletions((args) => {
    return (Object.keys(sounds).map((sound) => sound.replace(/\*/g, "")).filter((sound) => sound.startsWith(args[0].toLowerCase())))??[]
}).setName("pridgesounds").setAliases("shridgesounds")

const chatManager = new ChatManager()
chatManager.formatManager.updateData()

register('command', () => {
    chatManager.formatManager.updateData()
}).setName("updatepridgedata")

ChatLib.chat("&5[&9&lBridge&5] &2&lLoaded!\n&5[&9&lBridge&5] &fDo /pridge or /shridge to open settings");