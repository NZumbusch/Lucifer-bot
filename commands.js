function issue (message, bot) {
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    for (element in command_list) {
        if (command_list[element].indexOf(command) != -1) {
            console.log(command)
            let command_file = require("./commands/" + command + "/main.js")
            command_file.issue(message, args, command, bot)
        }
    }
}














const config = require("./config.json")
var command_list = require("./commands/list.json")

module.exports = {
    issue: function (message, bot) {
        issue(message,  bot)
    }
};