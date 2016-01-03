var https = require("https");
var http = require("http");

//Print current temp
function printWeather(zipCode, currentFeel) {
  var message = "It currently feels like " + currentFeel + " degrees Fahrenheit in zip code " + zipCode + ".";
  console.log(message);
}

//Print out error message
function printError(error) {
  console.error(error.message);
}

function getLongLad(zipCode){
  //Convert zipcode to Longitude, Latitude - 
  //Need Google Maps Geocoding API key
  var geocodeKey = "AIzaSyCqKgm4CoUg28DqGD_Oe1vdrlgSIvb0dsA";
  var geocodeRequest = https.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=" + geocodeKey, function(response){
    var body = "";
    //Read the data
    response.on("data", function(chunk) {
      body += chunk;
    });
    
    response.on("end", function(){
      if(response.statusCode === 200) {
        try {
          //Parse the data
          //Store longitude, latitude to use later
          var location = JSON.parse(body);
          var latitude = location.results[0].geometry.location.lat;
          var longitude = location.results[0].geometry.location.lng;
          getWeather(latitude, longitude, zipCode);
        } catch(error) {
          //Parse error
          printError(error);
        }
      }
    });
  });
}

function getWeather(latitude, longitude, zipCode){
  //Get weather forecase from Longitude, Latitude - https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE
  //need Dark Sky API key: bb5fa5abfe68897364337923db0c92d8
  var darkSkyKey = "bb5fa5abfe68897364337923db0c92d8";
  var darkSkyRequest = https.get("https://api.forecast.io/forecast/" + darkSkyKey + "/" + latitude + "," + longitude, function(response){
    var body = "";
    //Read the data
    response.on("data", function(chunk) {
      body += chunk;
    });
    
    response.on("end", function(){
      if(response.statusCode === 200) {
        try {
          //Parse the data
          //Store longitude, latitude to use later
          var darkSkyResults = JSON.parse(body);
          var currentFeel = darkSkyResults.currently.apparentTemperature;

          printWeather(zipCode, currentFeel);
        
        } catch(error) {
          //Parse error
          printError(error);
        }
      }
    });
  });
}

module.exports.weather = getLongLad;