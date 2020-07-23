Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

function checkCommand(message, commandName) {
    return message.toLowerCase().startsWith("$" + commandName);
}

function strongCheckCommand(message, commandName) {
    return message.startsWith("!" + commandName);
}

function random(number, length, characters) {
    let sequence = "";

    for (let f = 0; f < length * number; f++) {
        if (f % number == 0 && f != 0) {
            sequence = sequence + " ";
            console.log(number, length);
        }
        console.log(sequence);
        sequence += characters.random();
    }
    return sequence;
}

function sendm(channelID, message) {
    bot.sendMessage({
        to: channelID,
        message: message,
    });
}

var mode = 0;


var commands = require("./commands.js")
var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");
var config = require("./config.json");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
    colorize: true,
});
logger.level = "debug";

var bot = new Discord.Client({
    token: auth.token,
    autorun: true,
});

bot.on("ready", function (evt) {
    logger.info("Connected");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");
});

bot.on("message", (user, userID, channelID, message, evt) => {
    var event = {
        user: user,
        userID: userID,
        channelID: channelID,
        message: message,
        evt: evt,
    };
    message = event.evt.d;
    if (message.author.bot) {
        return;
    }

    if (message.content[0] == config.commandChar) {
        commands.issue(message, event);
    }
});
