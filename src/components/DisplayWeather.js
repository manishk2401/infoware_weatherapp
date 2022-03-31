import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";

export default function DisplayWeather(props) {
  const [city, setCity] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    // console.log(props);
    setCity(props.city);
    setWeather(props.weather);
  }, [props]);

  let iconurl = "https://developer.accuweather.com/sites/default/files/";

  return (
    <div className="displayweather">
      {city.city && weather.weather ? (
        <React.Fragment>
          <div className="maincard mx-4 my-2 p-3 border rounded" style={{ backgroundColor: "#abaaaa2e" }}>
            <div className={style.cardHeader}>
              <h4>
                {city.city.EnglishName}, {city.city.Country.EnglishName}
              </h4>
              <span className="text-secondary mx-2">{new Date().toLocaleTimeString()}</span>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div>
                  <div className={style.weatherDetailsRight}>
                    <div className={style.image}>
                      <img className={style.weatherIcon} src={iconurl + ("0" + weather.weather.WeatherIcon).slice(-2) + "-s.png"} alt="" />
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={style.weatherDetailsLeft}>
                  <div className={style.mainWeather}>
                    <h1 className="text-center m-0" style={{ fontSize: "70px" }}>
                      {" "}
                      {weather.weather.Temperature.Metric.Value}
                    </h1>
                    <h4 className="mt-3">
                      <sup>o</sup>
                      {weather.weather.Temperature.Metric.Unit}
                    </h4>
                  </div>
                  <h3 className="weather-description"> {weather.weather.WeatherText}</h3>
                </div>
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
      ) : (
        "Loading"
      )}
    </div>
  );
}
