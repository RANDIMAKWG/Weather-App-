import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const yourAPIKey = "736705aafe83b089779178bf15cb7b90";

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
 
});

app.post("/get-weather", async (req, res) => {
  
  try {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const result = await axios.get(API_URL + `?lat=${latitude}&lon=${longitude}&appid=${yourAPIKey} `);
    
    res.render("index.ejs", {
      location : result.data.name,
      country : result.data.sys.country,
      currentWeather: result.data.weather[0].main,
      temperature : result.data.main.temp,
      windSpeed : result.data.wind.speed,

      
    });
    
  } catch (error) {
    res.render("index.ejs", {
      content: "Waiting for data...",
      errorMessage: "An error occurred while fetching weather data"
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
