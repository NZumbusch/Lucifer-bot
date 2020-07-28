function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}

function issue (message, bot) {
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    let issued_command = false;
    for (element in command_list) {
        if (command_list[element] == command) {
            issued_command = true;
            if (message.channel.type !== "dm") {
                console.log("Command:" + "\n.    author: " + message.author.tag + "\n.    content: " + message.content + "\n.    channel: " + message.channel.name + "\n.    guild: " + message.guild.name)
            } else {
                console.log("Command:" + "\n.    author: " + message.author.tag + "\n.    content: " + message.content + "\n.    channel: " + message.channel.type)
            }
            
            let command_file = require("./commands/" + command + "/main.js")
            console.log(command_file.issue(message, args, command, bot));
        }
    }

    if (issued_command === false) {
        message.channel.send("Unknown command.")
    }
}













nocache("./config.json")
nocache("./commands/list.json")
const config = require("./config.json")
const command_list = require("./commands/list.json")

module.exports = {
    issue: function (message, bot) {
        issue(message,  bot)
    }
};