function issue(message, args, command, bot) {
    let mes = ".\n";
    if (args[0] == undefined) {
        for (co in commands) {
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
        } catch {
            mes += "Invalid argument.";
        }
    }
    message.channel.send(mes);
}

const commands = ["help", "calc", "weather", "roll", "mail"]
const developers = require("../../developers.json");
const config = require("../../config.json");
const auth = require("../../auth.json");

module.exports = {
    issue: function (message, args, command, bot) {
        issue(message, args, command, bot);
    },
};
