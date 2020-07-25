const commands = require("./commands.js")
const Discord = require("discord.js");
const logger = require("winston");
const auth = require("./auth.json");
const config = require("./config.json");
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

    
    if (message.content[0] == config.commandChar) {
        commands.issue(message, bot);
    }
});
