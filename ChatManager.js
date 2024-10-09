import settings from "./settings";
import { FormatManager } from "./FormatManager";
import { checkForSounds } from "./functions";

export class ChatManager {

    constructor() {
        this.formatManager = new FormatManager()
        this.splitChar = "➩"
        this.incompleteMessage = ""
        this.placeHolderMessage = undefined
        // * Guild chat Messages
        register("chat", (user, rank, message, event) => {
            message = message.slice(1)
            if(settings.enabled) {
                // * Bot message processing
                if(this._checkIfUser(user)) {
                    // * Splice split messages
                    if(message.startsWith(this.splitChar)) {
                        if(message.endsWith(this.splitChar)) {
                            cancel(event)
                            this.incompleteMessage = this.incompleteMessage + message.slice(1, message.length-1)
                            let newMessage = new Message(this.placeHolderMessage.getFormattedText() + "&6&l.")
                            this.placeHolderMessage.edit(newMessage)
                            this.placeHolderMessage = newMessage
                            return
                        }
                        else {
                            message = this.incompleteMessage + message.slice(1)
                            this.incompleteMessage = ""
                            ChatLib.deleteChat(this.placeHolderMessage)
                            this.placeHolderMessage = undefined
                            // * Process Message
                            this._formatMessage(message, event)
                        }
                    }
                    else if(message.endsWith(this.splitChar)) {
                        cancel(event)
                        this.incompleteMessage = message.slice(0, message.length-1)
                        this.placeHolderMessage = new Message(`${settings.newName} ${settings.botName} &6&lLoading Msg`)
                        ChatLib.chat(this.placeHolderMessage)
                        return
                    }
                    else if(this.incompleteMessage != "") {
                        this._replaceBotMessage(`&c&lSomething went wrong...\n${this.incompleteMessage}`, event)
                    }
                    else {
                        // * Process Message
                        this._formatMessage(message, event)
                    }
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
                    switch (action) {
                        case "joined":
                            this._replaceMessage(`${settings.newName} &6Bridge bot &ajoined hypixel.`, event);
                            break;
                        case "left":
                            this._replaceMessage(`${settings.newName} &6Bridge bot &cleft hypixel.`, event);
                            break;
                    }
                }
                else {
                    if(settings.joinleave) {
                        if(!user.includes(" ")) {
                            switch (action) {
                                case "joined":
                                    this._replaceMessage(ChatLib.getChatMessage(event, true).replace("&2Guild >", settings.newName).replace('joined', '&ajoined'), event)
                                    break;
                                case "left":
                                    this._replaceMessage(ChatLib.getChatMessage(event, true).replace("&2Guild >", settings.newName).replace('left', '&cleft'), event)
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
            let message = ChatLib.getChatMessage(event, true)
            ?.replace("&2Guild >", settings.newName)
            .replace(/&([a-fklmnorzZ0-9])/g, "§$1")
            .replace(/\\n/g, "\n")
            this._replaceMessage(message, event)
        }
    }

    _formatMessage(message, event) {
        if(settings.devMode) {
            console.log(`[Pridge] Guild Message:\n${message}`)
        }
        message = message.replace(/ <@.+>$/, "")
        message = this.formatManager.processFormat(message)
        this._replaceBotMessage(message, event)
    }

    _removeRankTag(ign){
        ign = ign.replace(/\[(VIP|MVP)\+*\] /, "");
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
    
    _replaceMessage(message, event) {
        if(typeof message == 'string') message = new Message(message)
        if(event) {
            event.message = message.getChatMessage()
        }
        else {
            console.log(`No event was sent in ${message}`)
        }
    }

    _replaceBotMessage(message, event) {
        if(message?.startsWith("(bypass)")){
            this._replaceMessage(message.replace("(bypass)", ""), event)
        }
        else if(typeof message != 'string') {
            this._replaceMessage(message, event)
        }
        else {
            this._replaceMessage(`${settings.newName} ${settings.botName} &f${message}`, event)
        }
    }

    _getMessage(message) {
        if(settings.timestamp) {
            return this._createTimestampMessage(message)
        }
        return new Message(message)
    }

}