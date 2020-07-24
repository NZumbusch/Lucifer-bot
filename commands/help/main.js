function issue(message, args, command, bot) {
    let mes = ".\n";
    if (args[0] == undefined) {
        mes +=
            "> " +
            config.commandChar +
            "mail, See " +
            config.commandChar +
            "help mail for more info.\n";
        mes +=
            "> " +
            config.commandChar +
            "calc, See " +
            config.commandChar +
            "help calc for more info.\n";
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

const developers = require("../../developers.json");
const config = require("../../config.json");
const auth = require("../../auth.json");

module.exports = {
    issue: function (message, args, command, bot) {
        issue(message, args, command, bot);
    },
};
