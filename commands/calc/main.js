function issue(message, args, command, bot) {
    switch (args[1]) {
        case undefined:
            let operation = args[0];
            try {
                message.channel.send(mexp.eval(operation));
            } catch {
                message.channel.send("Wrong operation");
            }
            break;
        default:
            try {
                let expr = new algebra.parse(args[0]);
            let sol = "Solution: " + expr.solveFor(args[1]);
            message.channel.send(sol);
            } catch {
                message.channel.send("Error while solving, please check your command.")
            }
            
    }
}

const algebra = require("algebra.js");
const mexp = require("math-expression-evaluator");
const developers = require("../../developers.json");
const auth = require("../../auth.json");

module.exports = {
    issue: function (message, args, command, bot) {
        issue(message, args, command, bot);
    },
};
