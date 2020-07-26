function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
nocache("./config.json");
nocache("./auth.json");
const commands = require("./commands.js")
const Discord = require("discord.js");
const logger = require("winston");
const auth = require("./auth.json");
const config = require("./config.json");
const to_ignore = require("./ignore.json")
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true,
});
logger.level = "debug";

const bot = new Discord.Client();
bot.login(auth.token);

function update () {
    delete require.cache['./config.json'];
    const config = require("./config.json");
    bot.user.setUsername(config.username);
    bot.user.setPresence({activity:{ name: config.activity, type: config["activity-type"]}});
}


bot.on("ready", function () {
    update()
    logger.info("Connected");
    logger.info("Logged in as: ");
    logger.info(bot.user);
});

bot.on("message", ( message) => {
    update()


    if (message.author.tag in to_ignore) {return}

    if (message.author.bot) {
        return;
    }

    
    if (message.content[0] == config.commandChar && message.content.length > 1) {
        commands.issue(message, bot);
    }
});
