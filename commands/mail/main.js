function issue(message, args, command, bot) {
    let mailOptions = {
        from: auth.mail,
        to: args[0],
        subject: args[1],
        html: args.slice(2).join(" ")
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            message.channel.send("Error: " + error)
            
        } else {
            console.log("Email sent: " + info.response);
            message.channel.send("Success: " + info.response)
        }
    });
}





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
