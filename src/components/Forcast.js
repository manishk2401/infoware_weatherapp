import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import style from "./forcast.module.css";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Divider } from "@mui/material";
import { ImportContactsOutlined } from "@mui/icons-material";

export default function Forcast(props) {
  const [forcastList, setForcastList] = useState([]);
  const [forcast, setForcast] = useState(props.data.forcast.DailyForecasts[1]);
  const [headLine, setHeadLine] = useState({});
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    setForcastList(props.data.forcast.DailyForecasts);
    setHeadLine(props.data.forcast.Headline);
    setForcast(props.data.forcast.DailyForecasts[1]);
  }, [props.data.forcast.DailyForecasts, props.data.forcast.Headline]);

  let iconurl = "https://developer.accuweather.com/sites/default/files/";

  const forecast = (e) => {
    setForcast(e);
  };

  function iconCode(code) {
    return ("0" + code).slice(-2);
  }

  return (
    <div style={{ padding: "10px 20px" }}>
      <h3>Forecast :</h3>
      <div>
        {headLine.Severity === 1 ? (
          <Alert severity="error">{headLine.Text}!</Alert>
        ) : headLine.Severity === 2 ? (
          <Alert severity="warning">{headLine.Text}!</Alert>
        ) : headLine.Severity === 3 ? (
          <Alert severity="info">{headLine.Text}!</Alert>
        ) : (
          <Alert severity="success">{headLine.Text}!</Alert>
        )}
      </div>
      <div className={style.forcastBtn}>
        {forcastList.map((item, i) => {
          return i !== 0 ? (
            <Button
              key={i}
              onClick={(e) => {
                forecast(item);
              }}
              disabled={forcast.EpochDate === item.EpochDate ? true : false}
              variant="outlined"
              style={{ marginRight: "10px" }}
            >
              {new Date(item.Date).toDateString()}{" "}
            </Button>
          ) : (
            ""
          );
        })}
      </div>
      <div style={{ padding: "0px 20px" }}>
        {/* Forcast Header */}
        <div className={style.forecastTemp}>
          <h5>
            <CalendarMonthIcon /> {new Date(forcast.Date).toDateString()}
          </h5>
          <h5>
            <DeviceThermostatIcon />
            <span style={{ color: "blue" }}>
              {(Math.round((5 / 9) * (forcast.Temperature.Minimum.Value - 32) * 100) / 100).toFixed(2)} <ArrowDropDownIcon />
            </span>{" "}
            to{" "}
            <span style={{ color: "red" }}>
              {(Math.round((5 / 9) * (forcast.Temperature.Maximum.Value - 32) * 100) / 100).toFixed(2)} <ArrowDropUpIcon />
            </span>
          </h5>
        </div>
        <Divider></Divider>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={style.dayForecast}>
              <h4>At Day</h4>
              <div className={style.dayImage}>
                <img className={style.weatherIcon} src={iconurl + iconCode(forcast.Day.Icon) + "-s.png"} alt="" />
              </div>
              <p>
                {" "}
                <strong>{forcast.Day.IconPhrase}</strong>
              </p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={style.nightForecast}>
              <h4>At Night</h4>
              <div className={style.dayImage}>
                <img className={style.weatherIcon} src={iconurl + iconCode(forcast.Night.Icon) + "-s.png"} alt="" />
              </div>
              <p>
                {" "}
                <strong>{forcast.Night.IconPhrase}</strong>
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
