function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
function issue(message, args, command, bot) {
    switch (args[1]) {
        case undefined:
            let operation = args[0];
            try {
                message.channel.send(mexp.eval(operation));
            } catch {
                message.channel.send("Wrong operation");
                return false;
            }
            break;
        default:
            try {
                let term = (args.slice(0, args.length - 1)).join("")
                let solve_for = args[args.length - 1]
                
                let expr = new algebra.parse(term);
                let sol = "Solution: " + expr.solveFor(solve_for);
                message.channel.send(sol);
            } catch {
                message.channel.send(
                    "Error while solving, please check your command."
                );
                return false;
            }
    }
    return true;
}

nocache("../../developers.json")
nocache("../../auth.json")
const algebra = require("algebra.js");
const mexp = require("math-expression-evaluator");
const developers = require("../../developers.json");
const auth = require("../../auth.json");

module.exports = {
    issue: function (message, args, command, bot) {
        return issue(message, args, command, bot);
    },
};
