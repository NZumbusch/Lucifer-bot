function issue(message, args, command, bot) {
    let mes = ".\n";
    if (args[0] == undefined) {
        for (co in commands) {
            let config = require("../../config.json");
            com = commands[co]
            mes +=
                "> " +
                config.commandChar +
                com +
                ", see " +
                config.commandChar +
                "help " +
                com +
                " for more info.\n";
        }
    } else {
        try {
            let message_file = require("../" + args[0] + "/help.json");
            for (element in message_file) {
                mes += message_file[element] + "\n";
            }
            message.channel.send(mes);
        } catch {
            mes += "Invalid argument.";
            message.channel.send(mes);
            return false;
        }
    }
    return true;
}


const commands = ["help", "calc", "weather", "roll", "mail"]
const developers = require("../../developers.json");
const auth = require("../../auth.json");

module.exports = {
    issue: function (message, args, command, bot) {
        return issue(message, args, command, bot);
    },
};
