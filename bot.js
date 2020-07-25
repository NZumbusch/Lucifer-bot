var commands = require("./commands.js")
var Discord = require("discord.js");
var logger = require("winston");
var auth = require("./auth.json");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true,
});
logger.level = "debug";

const bot = new Discord.Client();
bot.login(auth.token);


bot.on("ready", function () {
    logger.info("Connected");
    logger.info("Logged in as: ");
    logger.info(bot.user);
});

bot.on("message", ( message) => {


    if (message.author.bot) {
        return;
    }

    let config = require("./config.json");

    if (message.content[0] == config.commandChar) {
        commands.issue(message, bot);
    }
});
