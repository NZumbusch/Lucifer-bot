function issue (message, event) {
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command_list[0].indexOf(command) != -1) {
        let command = require("./commands/" + command + ".js")
        command.issue(message, event, args, command)
    }
}














var config = require("./config.json")
var command_list = require("./commands/list.json")

module.exports = {
    issue: function (message, event) {
        issue(message, event)
    }
};