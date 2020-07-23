function issue (message, bot) {
    const args = message.content.slice(1).trim().split(/ +/);
    console.log(args)
    const command = args.shift().toLowerCase();
    if (command_list[0].indexOf(command) != -1) {
        let command_file = require("./commands/" + command + "/main.js")
        command_file.issue(message, args, command, bot)
    }
}














const config = require("./config.json")
var command_list = require("./commands/list.json")

module.exports = {
    issue: function (message, bot) {
        issue(message,  bot)
    }
};