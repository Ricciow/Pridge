import { Base64, functions, JavaString, jsonLink } from "./constants"
import { replacePlaceholders } from "./functions"
import settings from "./settings"
import request from "../requestV2"

export class FormatManager {
    constructor() {
        this.version = "0.1.0"
        this.formats = {}
        this.readFormats()
    }

    readFormats() {
        const data = JSON.parse(FileLib.read("Pridge", "formating.json"))
        this.formats = data.formats
        this.version = data.version
    }

    updateData() {
        ChatLib.chat("&6&lUpdating formatter data...")
        request(jsonLink).then((data) => {
            data = JSON.parse(data)
            data = new JavaString(Base64.getDecoder().decode(data.content.replace(/\n/g, "")), "UTF-8")
            FileLib.write("Pridge", "formating.json", data)
            this.readFormats()
            ChatLib.chat("&a&lDone updating!")
        })
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
                    console.log(message)
                    console.log(JSON.stringify(format, null, 4))
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
                return functions[format.functionName](message, matcher)
            }
        }
        catch(error) {
            console.error(`[Pridge] RegExp Error - ${format.trigger}\n${error}`)
            return
        }
    }
}