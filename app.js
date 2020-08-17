const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/bg.jpg", function(req, res) {
  res.sendFile(__dirname + "/bg.jpg");
})
app.post("/", function(req, res) {
  const query = req.body.myCountry;
  // const appKey = daaaf679eaff9911aa11b5dbd0feec90;
  // const units = metric;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units=metric&appid=daaaf679eaff9911aa11b5dbd0feec90";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const t = Math.round(temp);
      const feel = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const lat = weatherData.coord.lat
      const longi = weatherData.coord.lon
      const humidity = weatherData.main.humidity
      const imgURL = "http://openweathermap.org/img/wn/" +icon+"@2x.png"
      res.write("<h1 style='color:white;font-size: 4.5rem;margin: 0 auto;background-color:#006a71;'><center style=' padding: 50px auto;'><br>"+query+ "<br><br></center></h1>");
      res.write("<center><h1 style='background-color:#006a71;font-size: 3.5rem;color:white;font-family:Arial, Helvetica, sans-serif;margin:0 auto;'>"+t+" &#8451</h1><div style='background-color:#006a71;'><img style='height: 200px;background-color:#006a71;' src=" +imgURL+ "></div></center>");
      res.write("<h5 style='font-family:Arial, Helvetica, sans-serif;margin:0 auto;;color:white;font-size: 1.2rem;background-color:#006a71;'><center>" +feel+"<br><br><br></center></h5>");
      res.write("<h5 style='font-family:Arial, Helvetica, sans-serif;margin:0 auto;;color:white;font-size: 1rem;background-color:#006a71;'><center>Latitude: "+lat+" <br>Longitude: "+longi+"<br><br><br></center></h5>");
      res.write("<h5 style='font-family:Arial, Helvetica, sans-serif;margin:0 auto;;color:white;font-size: 1rem;background-color:#006a71;'><center>Humidity: " +humidity+ "% <br><br><br>");

    });
  });

});

app.listen(3000, function() {
  console.log("Running on server with port 3000.");
})
