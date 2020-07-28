function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})}
function issue(message, args, command, bot) {
    if (args[0] == undefined) {
        message.channel.send("Invalid arguments.");
        return false;
    }
    let allowed = true;
    let amount = 1;
    forbidden.forEach((element) => {
        if (args[0].indexOf(element) != -1) {
            allowed = false;
        }
    });

    if (message.author.id in developers) {
        args.forEach((element) => {
            if (
                args.indexOf(element) != 0 &&
                element.indexOf("-|-AMOUNT-|-") != -1
            ) {
                let number = element.slice(12);
                amount = number;
                args.forEach((element) => {
                    if (element.indexOf("-|-AMOUNT-|-") != -1) {
                        args.splice(args.indexOf(element), 1);
                    }
                });
            }
        });
    }


    if (!allowed && !(message.author.id in developers)) {
        message.channel.send("Fck ya for using that mail! Its forbidden!");
        return false;
    }
    let mailOptions = {
        from: auth.mail,
        to: args[0],
        subject: args[1],
        html: args.slice(2).join(" "),
    };

    for (let num = 0; num < amount; num++) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                message.channel.send("Error: " + error);
                return false;
            } else {
                console.log("Email sent: " + info.response);
                message.channel.send("Success: " + info.response);
            }
        });
    }
    return true;
}

nocache("../../developers.json")
nocache("./forbidden.json")
nocache("../../auth.json")
const developers = require("../../developers.json");
const forbidden = require("./forbidden.json");
const auth = require("../../auth.json");
const fs = require("fs")
var nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: auth.mail,
        pass: auth.mailpwd,
    },
});

module.exports = {
    issue: function (message, args, command, bot) {
        return issue(message, args, command, bot);
    },
};
