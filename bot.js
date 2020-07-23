Array.prototype.random = () => {
    return this[Math.floor(Math.random() * this.length)];
};

var mode = 0

var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

function checkCommand(message, commandName) {
    return message.toLowerCase().startsWith("!" + commandName);
}

function strongCheckCommand(message, commandName) {
    return message.startsWith("!" + commandName);
}

function random(number, length, characters) {
    let sequence = "";
		
	for (let f = 0; f < length * number; f++) {
        if (f % number == 0 && f != 0) {
            sequence = sequence + " "
        }
        sequence += characters.random()
    }
    return sequence;
}

function sendm (channelID, message) {
    bot.sendMessage({
        to: channelID,
        message: message
    });
}

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on("message", function (user, userID, channelID, message, evt) {
    console.log(message)
    if (mode == 1) {
        if (message == "!mode 0") {
            mode = 0;
            sendm(channelID, "Do not disturb mode disabled. Still, don't disturb me!")
        } else sendm(channelID, "Please stop disturbing me! I am hacking!");
    } else {
        if (!message.startsWith("!")) return;
        const args = message.slice(1).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        console.log(command)
        console.log(args)
        switch (command) {
            case "disturb":
                sendm(channelID, "Please stop disturbing me! I am hacking!");
                break;
            case "hackme":
                sendm(channelID, "Please stop disturbing me! I am hacking!");
                break;
            case "hack":
                sendm(channelID, "https://tenor.com/view/hacker-pc-meme-matrix-codes-gif-16730883");
                break;
            case "lebtderhackernoch":
                sendm(channelID, "Guten Tag, mister. Yes, absolutely!");
                break;
            case "mode":
                if (modearg[1] == 1) {
                    mode = 1;
                    sendm(channelID, "Do not disturb mode enabled. Don't disturb me!");
                } else if (modearg[1] == 0) {
                    sendm(channelID, "Do not disturb mode already off!");
                } else
                    sendm(channelID, "ERROR: Please use the correct syntax syntax for !mode");
                break;
            case "type":
                sendm(channelID, "https://tenor.com/view/typing-jim-carrey-jim-carrey-type-gif-4680550");
                break;
            case "random":
            case "rand0m":
                if (strongCheckCommand(message, "random")) {
                    var alphabet = "abcdefghijklmnopqrstuvwxyz";
                } else if (strongCheckCommand(message, "RANDOM")) {
                    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                } else if (checkCommand(message, "random")) {
                    var alphabet =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                } else if (strongCheckCommand(message, "rand0m")) {
                    var alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
                } else if (strongCheckCommand(message, "RAND0M")) {
                    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                } else if (checkCommand(message, "rand0m")) {
                    var alphabet =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                }
                var number = args[1];
                var length = args[2];
                if (!number) {
                    length = 50;
                    number = 1;
                } else if (!length) {
                    length = number;
                    number = 1;
                }

                if (number * length > 2000) {
                    sendm(channelID, "You fcking idiot. Thats too long! Imma head right back to hacking...");
                } else {
                    let randomOutput = random(number, length, alphabet.split(""));
                    if (randomOutput == "") {
                        sendm(channelID, "ERROR: Cannot send empty message");
                    } else if (randomOutput.length > 2000) {
                        sendm(channelID, "ERROR: Message too long");
                    } else {
                        sendm(channelID, randomOutput);
                    }
                }
                break;
            case "help":
                sendm(channelID, "> `!disturb`\n > Disturbs me (not recommended)\n > `!hack`\n > Provides evidence of me hacking\n > `!hackme`\n > Hacks you (enabled on default)\n > `!lebtderheckernoch`\n > Checks if the Hecker is still alive\n > `!mode 0|1`\n > Toggles do not disturb mode\n > `!random a b`\n > Generates `a` random space-separated sequences of `b` Latin letters (letter case dependent on capitalisation of the command)\n > `!random a`\n > Generates a random sequence of `a` Latin letters (defaults to 50)\n > `!rand0m a b`, `!rand0m a`\n > Similar to `!random`, but enables numbers in the output \n > `!type`\n > Lets me type real fast\n > `!help`\n > Shows the following message... wait no, shit gets recursive");
                break;
            case "newline":
                sendm(channelID, "new\n line");
                break;
            default:
                console.log("Default - unknown command")
        }
    }
});
