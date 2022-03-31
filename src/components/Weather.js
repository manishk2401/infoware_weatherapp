import React, { useState, useEffect } from "react";
import DisplayWeather from "./DisplayWeather";
import Forcast from "./Forcast";
const axios = require("axios").default;
// import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState({});
  const [cityDetails, setCityDetails] = useState({});
  const [inputCity, setInputCity] = useState({ city: "delhi" });
  const [forcast, setForcast] = useState({});

  const APIKEY = "uqk74ftUSvnydJYCniT29zsTQrYPAAFa";

  useEffect(() => {
    getWeatherDetails();
  }, []);

  const getWeatherDetails = () => {
    let cityData;
    axios
      .get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKEY}&q=${inputCity.city}`)
      .then(function (response) {
        setCityDetails({ city: response.data[0] });
        cityData = response.data[0];
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        if (cityData !== undefined) {
          getCondition(cityData);
          getForcastDetails(cityData);
        }
      });
  };

  const getForcastDetails = (data) => {
    const cityCode = data.Key;
    axios
      .get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${APIKEY}`)
      .then(function (response) {
        setForcast({ forcast: response.data });
      })
      .catch(function (error) {
        console.log(error);
        alert("Please renew you API Key");
      });
  };

  const getWeather = () => {
    getWeatherDetails();
  };

  const getCondition = (data) => {
    const cityCode = data.Key;
    axios
      .get(`http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${APIKEY}`)
      .then(function (response) {
        setWeather({ weather: response.data[0] });
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setInputCity({ city: value });
  };

  return (
    <div className="weather container border" style={{ width: "50%", minWidth: "500px" }}>
      <h3 className="title m-0 text-center">Weather App</h3>
      <form className="row m-0">
        <div className="form-group col-sm-6 mt-2">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="city" value={inputCity.city} name="city" onChange={(e) => handleChange(e)} />
        </div>
      </form>
      <div className="d-grid gap-2">
        <button
          className="getweather btn btn-success m-2"
          onClick={() => {
            getWeather();
          }}
        >
          Get Weather
        </button>
      </div>

      <div>
        {cityDetails.city && weather.weather ? <DisplayWeather weather={weather} city={cityDetails} /> : "Not Found"}
        {forcast.forcast ? <Forcast data={forcast} /> : ""}
      </div>
    </div>
  );
}

export default Weather;
