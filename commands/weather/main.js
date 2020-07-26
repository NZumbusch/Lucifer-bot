function issue(message, args, command, bot) {
    if (args[0] === undefined) {
        message.channel.send("Invalid arguments.");
        return false;
    }
    let apiKey = auth.weatherapikey;
    let city = args.join(" ");
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let current_time = new Date();

    if (!(city in weather_list)) {
        console.log("lol");
        var load = "new";
    } else if (
        weather_list[city]["date"] + 40 <
        current_time.getMinutes() + current_time.getHours() * 60
    ) {
        var load = "new";
    } else {
        var load = "old";
    }

    if (load == "new") {
        request(url, function (err, response, body) {
            if (err) {
                message.channel.send(err);
            } else {
                let weather = JSON.parse(body);
                let response =
                    ".\nThe current weather there is: \nweather: " +
                    weather.weather[0].main +
                    "\ntemperatur: " +
                    weather.main.temp +
                    "°";
                message.channel.send(response);
                weather_list[city] = {
                    resp: response,
                    date:
                        current_time.getMinutes() +
                        current_time.getHours() * 60,
                };
            }
        });
    } else {
        response = weather_list[city]["resp"];
        message.channel.send(response);
    }
}

var weather_list = {};
const fetch = require("node-fetch");
const request = require("request");
const developers = require("../../developers.json");
const auth = require("../../auth.json");

module.exports = {
    issue: function (message, args, command, bot) {
        return issue(message, args, command, bot);
    },
};
