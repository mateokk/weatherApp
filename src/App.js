import React, { useState } from "react";
import axios from "axios";
import clear from "./assets/clear.png"
import clouds from "./assets/clouds.png"
import mist from "./assets/mist.png"
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import drizzle from "./assets/drizzle.png"

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState(''); 
  const API_KEY = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${API_KEY}`;

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
      setError('');
    }).catch((error) => {
      if (error.response.status == 404) {
        setData({});
        setError("Location not found");
      } else {
        setError("Error");
      }
    });
  };

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    searchLocation();
    setLocation("");
  };
  
  let weatherIcon;
  if (data.weather && data.weather[0]) {
    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon = clouds;
        break;
      case "Clear":
        weatherIcon = clear;
        break;
      case "Drizzle":
        weatherIcon = drizzle;
        break;
      case "Mist":
        weatherIcon = mist;
        break;
      case "Rain":
        weatherIcon = rain;
        break;
      case "Snow":
        weatherIcon = snow;
        break;
    } 
  } else {
    weatherIcon = null;
  }
    

  return (
    <div className="app">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input className="search-input"
          placeholder="enter city name"
          spellCheck="false"
          type="text"
          value={location}
          onChange={handleInputChange}/>
          <button 
          type="submit"
          className="search-button" >
            <img src={require("./assets/search.png")}/>
          </button> 
        </form>    
      </div>
       <div className="container">
        {error && <div className="error">{error}</div>}
        <div className="top">
          <div className="weather-icon">
            <img src={weatherIcon}/>
          </div>
          <div className="temperature">
            {data.main ? <h1>{Math.round(data.main.temp * 2)/2} °C</h1> : null}  
          </div>
          <div className="location">
            {data.name ? <h2>{data.name}</h2> : null}
          </div>
        </div>
        {data.name &&
          <div className="bottom">
            <div className="col">
            <img src={require("./assets/humidity.png")}/>
              <div>
                {data.main ? <p className="humidity">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
            <img src={require("./assets/wind.png")}/>
              <div>
                {data.main ? <p className="wind">{Math.round(data.wind.speed)} m/s</p> : null}
                <p>Wind speed</p>
              </div>
            </div>
          </div>                    
        }

       </div>
    </div>
  );
}

export default App;
