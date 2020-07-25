function roll(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function issue(message, args, command, bot) {
    if (args[0] === undefined) {
        args[0] = 6;
    }
    if (args[2] === undefined) {
        args[2] = ", ";
    }

    if (args[1] === undefined) {
        args[1] = 1;
    }
    let len = Math.ceil(Math.log10(args[0] + 1));
    if ((len + args[2].length) * args[1] + 20 > 2000) {
        message.channel.send("Sorry, that are too many numbers!");
    }
    let TOTAL = 0;
    let response = ".\n";
    for (let i = 0; i < args[1]; i++) {
        let cur_num = roll(args[0]);
        response += cur_num;
        TOTAL += cur_num;
        if (!(i + 1 >= args[1])) {
            response += args[2];
        }
    }
    response += ".\nTOTAL: " + TOTAL;
    message.channel.send(response);
}

var going = {};
const developers = require("../../developers.json");
const auth = require("../../auth.json");

module.exports = {
    issue: function (message, args, command, bot) {
        issue(message, args, command, bot);
    },
};
