function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
function issue(message, args, command, bot) {
    let mes = ".\n";
    if (args.length === 0) {
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
        message.channel.send(mes);
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


nocache("../list.json")
nocache("../../developers.json")
nocache("../../auth.json")
nocache("../../config.json")
const config = require("../../config.json");
const commands = require("../list.json")
const developers = require("../../developers.json");
const auth = require("../../auth.json");

module.exports = {
    issue: function (message, args, command, bot) {
        return issue(message, args, command, bot);
    },
};
