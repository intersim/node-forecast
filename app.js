var weather = require("./forecast");
var zipCode = process.argv.slice(2);

weather.weather(zipCode);