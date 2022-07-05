const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res){


  const query = req.body.cityName;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&units=metric&appid=263a5a686eefb0226ac016d63155d911"
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const wheatherData = JSON.parse(data)
      const temp = wheatherData.main.temp;
      const wheatherdescription = wheatherData.weather[0].description
      const icon = wheatherData.weather[0].icon
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>weather is currently " + wheatherdescription + "</p>");
      res.write("<h1>The temprature in " + query + " is " + temp + " degree </h1>" );
      res.write("<img src= " + imageURL + ">");
      res.send();
      // console.log(temp);

    });

  });

});








app.listen(3000, function() {
  console.log("server is running on the port 3000");
});
