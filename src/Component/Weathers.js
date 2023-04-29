import React, { useState } from "react";
import axios from "axios";
function Weathers() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <h3>{data.name}</h3>
          </div>
          <div className="temp">
            {data.main ? <h2>{data.main.temp.toFixed()}°F</h2> : null}
            {/* Option-Shift-8. °*/}
          </div>
          <div className="description">
            {data.weather ? <h3>{data.weather[0].main}</h3> : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p> wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Weathers;
