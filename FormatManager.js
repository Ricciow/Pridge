import { jsonLink } from "./constants"
import { replacePlaceholders } from "./functions"
import settings from "./settings"
import { specialFormat } from "./functions"

export class FormatManager {
    constructor() {
        this.version = "0.1.0"
        this.formats = {}
    }

    readFormats() {
        const data = JSON.parse(FileLib.read("Pridge", "formating.json"))
        this.formats = data.formats
        this.version = data.version
    }

    updateData() {
        ChatLib.chat("&6&lUpdating formatter data...")
        try {
            const data = FileLib.getUrlContent(jsonLink)
            FileLib.write("Pridge", "formating.json", data)
            this.readFormats()
            ChatLib.chat("&a&lDone updating!")
        }
        catch(error) {
            ChatLib.chat("&c&lError getting json data, update Chattriggers.")
        }
    }

    processFormat(message) {
        for (let index in this.formats) {
            let format = this.formats[index]
            let result = undefined
            let type = format?.type
            switch (type) {
                case "regex":
                    result = this._regexFormat(message, format)
                    break;
                case "string":
                    result = this._stringFormat(message, format)
                    break;
                case "stringarray":
                    result = this._stringArrayFormat(message, format)
                    break;
                case "special":
                    result = this._specialFormat(message, format)
                    break;
                default:
                    continue
            }
            if(result) {
                if(settings.devMode) {
                    console.log(`[Pridge] Format Message:\n${message}\nFormat:\n${JSON.stringify(format, null, 4)}`)
                }
                return result
            }
        }
        return message
    }

    _regexFormat(message, format) {
        try {
            const regex = new RegExp(format.trigger)
            let matcher = message.match(regex)
            if(matcher) {
                for(let key in format.groupFormating) {
                    const index = parseInt(key)
                    const replacer = format.groupFormating[key]
                    matcher[index] = ((replacer[matcher[index]])??replacer.defaultStr).replace("${str}", matcher[index])
                }
                message = replacePlaceholders(format.finalFormat, matcher)
                return message
            }
        }
        catch(error) {
            console.error(`[Pridge] RegExp Error - ${format.trigger}\n${error}`)
            return
        }
    }

    _stringFormat(message, format) {
        if(message == format.trigger) {
            return format.finalFormat.replace("${msg}", message)
        }
    }

    _stringArrayFormat(message, format) {
        if(format.trigger.includes(message)) {
            return format.finalFormat.replace("${msg}", message)
        }
    }

    _specialFormat(message, format) {
        try {
            const regex = new RegExp(format.trigger)
            let matcher = message.match(regex)
            if(matcher) {
                return specialFormat[format.functionName](message, matcher)
            }
        }
        catch(error) {
            console.error(`[Pridge] Special Error - ${format.trigger}\n${error}`)
            return
        }
    }
}