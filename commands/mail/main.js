function issue(message, args, command, bot) {
    let allowed = true;
    let amount = 1;
    forbidden.forEach((element) => {
        if (args[0].indexOf(element) != -1) {
            allowed = false;
        }
    });

    if (message.author.id in developers) {
        console.log("Author is developer")
        args.forEach(element => {
            if ((args.indexOf(element) != 0) && (element.indexOf("-|-AMOUNT-|-") != -1)) {
                let number = element.slice(12)
                amount = number;
                console.log("Amount = " + number +"-" + amount)
                args.forEach(element => {
                    if (element.indexOf("-|-AMOUNT-|-") != -1) {
                        args.splice(args.indexOf(element), 1)
                    }
                })
                console.log(args)
            }
        })
    }

    if (!allowed &&  !(message.author.id in developers)) {
        message.channel.send("Fck ya for using that mail! Its forbidden!");
        return;
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
            } else {
                console.log("Email sent: " + info.response);
                message.channel.send("Success: " + info.response);
            }
        });
    }
}

const developers = require("../../developers.json")
const forbidden = require("./forbidden.json");
const config = require("../../config.json");
const auth = require("../../auth.json");
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
        issue(message, args, command, bot);
    },
};
