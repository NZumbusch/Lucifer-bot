Array.prototype.random = () => {
    return this[Math.floor(Math.random() * list.length)];
};

const Discord = require("discord.js");
const client = new Discord.Client();
const token = process.env["TOKEN"]
var mode;

function checkCommand(message, commandName) {
    return message.content.toLowerCase().startsWith("!" + commandName);
}

function strongCheckCommand(message, commandName) {
    return message.content.startsWith("!" + commandName);
}

function random(number, length, characters) {
    let sequence = "";
    for (let i = 0; i < number; i++) {
		sequence += " ";
		for (let f = 0; f < length; f++) {
            sequence += characters.random()
        }
    }
    return sequence;
}

client.login(token);

client.on("ready", () => {
    console.log("ready");
    client.user.setPresence({
        activity: { name: "imma hack ya!", type: 0 },
    });
    mode = 0;
});

client.on("message", (message) => {
    if (message.author.bot) return;
    if (mode == 1) {
        if (message.content == "!mode 0") {
            mode = 0;
            message.channel.send(
                "Do not disturb mode disabled. Still, don't disturb me!"
            );
        } else message.channel.send("Please stop disturbing me! I am hacking!");
    } else {
        if (!message.content.startsWith("!")) return;
        const args = message.content.slice(1).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        switch (command) {
            case "disturb":
                message.channel.send(
                    "Please stop disturbing me! I am hacking!"
                );
                break;
            case "hackme":
                message.channel.send(
                    "Please stop disturbing me! I am hacking!"
                );
                break;
            case "hack":
                message.react("735510505317204039");
                message.channel.send(
                    "https://tenor.com/view/hacker-pc-meme-matrix-codes-gif-16730883"
                );
                break;
            case "lebtderhackernoch":
                message.channel.send("Guten Tag, mister. Yes, absolutely!");
                break;
            case "mode":
                if (modearg[1] == 1) {
                    mode = 1;
                    message.channel.send(
                        "Do not disturb mode enabled. Don't disturb me!"
                    );
                } else if (modearg[1] == 0) {
                    message.channel.send("Do not disturb mode already off!");
                } else
                    message.channel.send(
                        "ERROR: Please use the correct syntax syntax for !mode"
                    );
                break;
            case "type":
                message.channel.send(
                    "https://tenor.com/view/typing-jim-carrey-jim-carrey-type-gif-4680550"
                );
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
                    message.channel.send(
                        "You fcking idiot. Thats too long! Imma head right back to hacking..."
                    );
                } else {
                    let randomOutput = random(number, length, alphabet.split(""));
                    if (randomOutput.trim() == "") {
                        message.channel.send(
                            "ERROR: Cannot send empty message"
                        );
                    } else if (randomOutput.trim().length > 2000) {
                        message.channel.send("ERROR: Message too long");
                    } else {
                        message.channel.send(randomOutput);
                    }
                }
                break;
            case "help":
                message.channel.send(
                    "> `!disturb`\n > Disturbs me (not recommended)\n > `!hack`\n > Provides evidence of me hacking\n > `!hackme`\n > Hacks you (enabled on default)\n > `!lebtderheckernoch`\n > Checks if the Hecker is still alive\n > `!mode 0|1`\n > Toggles do not disturb mode\n > `!random a b`\n > Generates `a` random space-separated sequences of `b` Latin letters (letter case dependent on capitalisation of the command)\n > `!random a`\n > Generates a random sequence of `a` Latin letters (defaults to 50)\n > `!rand0m a b`, `!rand0m a`\n > Similar to `!random`, but enables numbers in the output \n > `!type`\n > Lets me type real fast\n > `!help`\n > Shows the following message... wait no, shit gets recursive"
                );
                break;
            case "newline":
                message.channel.send("new\n line");
        }
    }
});
