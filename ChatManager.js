import settings from "./settings";
import { FormatManager } from "./FormatManager";
import { checkForSounds } from "./functions";

export class ChatManager {

    constructor() {
        this.formatManager = new FormatManager()
        this.splitChar = "➩"
        this.incompleteMessage = ""
        // * Guild chat Messages
        register("chat", (user, rank, message, event) => {
            message = message.slice(1)
            if(settings.enabled) {
                // * Bot message processing
                if(this._checkIfUser(user)) {
                    cancel(event)
                    // * Splice split messages
                    if(message.startsWith(this.splitChar)) {
                        if(message.endsWith(this.splitChar)) {
                            this.incompleteMessage = this.incompleteMessage + message.slice(1, message.length-2)
                            return
                        }
                        else {
                            message = this.incompleteMessage + message.slice(1, message.length-1)
                            this.incompleteMessage = ""
                        }
                    }
                    else if(message.endsWith(this.splitChar)) {
                        this.incompleteMessage = message.slice(0, message.length-2)
                        return
                    }
                    else if(this.incompleteMessage != "") {
                        this._sendBotMessage(`&c&lSomething went wrong...\n${this.incompleteMessage}`)
                    }
                    // * Process Message
                    this._formatMessage(message)
                }
                // * Player message processing
                else {
                    this._formatGuild(message, event)
                }
            }
        }).setCriteria("Guild > ${user} [${rank}]:${message}")

        // * Guild join/leave messages

        register("chat", (user, action, event) => {
            if(settings.enabled) {
                if(this._checkIfUser(user)) {
                    cancel(event);
                    switch (action) {
                        case "joined":
                            this._sendMessage(`${settings.newName} &6Bridge bot &ajoined hypixel.`);
                            break;
                        case "left":
                            this._sendMessage(`${settings.newName} &6Bridge bot &cleft hypixel.`);
                            break;
                    }
                }
                else {
                    if(settings.joinleave) {
                        if(!user.includes(" ")) {
                            cancel(event)
                            switch (action) {
                                case "joined":
                                    this._sendMessage(ChatLib.getChatMessage(event, true).replace("&2Guild >", settings.newName).replace('joined', '&ajoined'))
                                    break;
                                case "left":
                                    this._sendMessage(ChatLib.getChatMessage(event, true).replace("&2Guild >", settings.newName).replace('left', '&cleft'))
                                    break;
                            }
                        }
                    }
                }
            }
        }).setCriteria('Guild > ${user} ${action}.')
    }

    _formatGuild(message, event) {
        checkForSounds(message)
        if(settings.guild) {
            cancel(event)
            console.log(message)
            this._sendMessage(ChatLib.getChatMessage(event, true).replace("&2Guild >", settings.newName).replace(/&r$/, ""))
        }
    }

    _formatMessage(message) {
        // ? Maybe add a dev version later to see original message
        let originalMsg = message 
        message = message.replace(/ <@.+>$/, "")
        message = this.formatManager.processFormat(message)
        this._sendBotMessage(message)
    }

    _removeRankTag(ign){
        ign = ign.replace("[VIP] ", "");
        ign = ign.replace("[VIP+] ", "");
        ign = ign.replace("[MVP] ", "");
        ign = ign.replace("[MVP+] ", "");
        ign = ign.replace("[MVP++] ", "");
        return ign
    }

    _checkIfUser(user) {
        user = this._removeRankTag(user).toLowerCase();
        if(settings.enabled) {
            return user == settings.botIGN.toLowerCase()
        }
        else {
            return false;
        }
    }

    _addZeroToTheLeft(number) {
        if(number < 10) {
            number = "0" + String(number)
        }
        return number
    }
    
    _getTime(timestamp, hour12 = false) {
        minute = 1000*60
        hour = minute*60
        day = hour*24
        timestamp = timestamp-(Math.floor(timestamp/day)*day)
        hours = (Math.floor(timestamp/hour))
        timestamp = timestamp - hours*hour
        minutes = Math.floor(timestamp/minute)
        hours = hours + settings.timeOffset
        if(hours < 0) {
            hours = 24 + hours
        }
        if(hour12) {
            if(hours > 12) {
                hours = hours-12
                return `${this._addZeroToTheLeft(hours)}:${this._addZeroToTheLeft(minutes)} PM`
            }
            else if(hours == 12){
                return `${this._addZeroToTheLeft(hours)}:${this._addZeroToTheLeft(minutes)} PM`
            }
            else if(hours == 0) {
                return `12:${this._addZeroToTheLeft(minutes)} AM`
            }
            else {
                return `${this._addZeroToTheLeft(hours)}:${this._addZeroToTheLeft(minutes)} AM`
            }
        }
        else {
            return `${this._addZeroToTheLeft(hours)}:${this._addZeroToTheLeft(minutes)}`
        }
    }
    
    _createTimestampMessage(str) {
        return new TextComponent(str).setHover("show_text", `&7Sent at &e${this._getTime(Date.now(), settings.timestamp12hour)}&7.`)
    }
    
    _sendBotMessage(message) {
        if(message?.startsWith("(bypass)")){
            this._sendMessage(message.replace("(bypass)", ""))
        }
        else {
            this._sendMessage(`${settings.newName} ${settings.botName} &f${message}`)
        }
    }

    _sendMessage(message) {
        // ? Instead of canceling and re-sending messages, maybe replace them?
        if(settings.timestamp) {
            ChatLib.chat(this._createTimestampMessage(message))
            return
        }
        ChatLib.chat(message)
    }

}