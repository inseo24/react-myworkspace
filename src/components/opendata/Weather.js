import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import React, { useEffect, useState } from "react";

import MapChart from "./assets/MapChart";
import ColumnChart from "./assets/ColumnChart";

import areaCode from "./assets/data/areaCode";
import apiNow from "../../api/weathernow";
import apiMap from "../../api/weatherMap";

import mapdata from "./assets/data/mapdata";
console.log("--map dummy data--");
console.log(mapdata);

const transformNowData = (sourceNow) => {
  if (sourceNow.length === 0) return [];

  const nowWeatherData = sourceNow.filter((item) => item.category === "T1H");
  // .filter(({ obsrValue }) => ({
  //   obsrValue,
  // }));

  // console.log("--category: T1H--");
  // console.log(nowWeatherData);

  const transformLocationData = nowWeatherData.map((el) => {
    if (areaCode[el.ny]) {
      return {
        ...el,
        ny: areaCode[el.ny],
      };
    }
    return el;
  });
  // console.log("--areaCode -> areaName--");
  // console.log(transformLocationData);

  const nowWeather = transformLocationData.map(({ ny, obsrValue }) => {
    return {
      지역: ny,
      기온: parseFloat(obsrValue),
    };
  });

  // console.log("-- 현재 날씨 정보 --");
  // console.log(nowWeather);
  // const data = [];
  // console.log("--데이터 확인--");
  // console.log(data);

  // for (let i = 0; i < nowWeather.length; i++) {
  //   data.push(nowWeather[i]);
  // }

  return nowWeather;
};

const transformMapData = (sourceNow) => {
  if (sourceNow.length === 0) return [];
  //  && item.category === "SKY"

  const WeatherData = sourceNow
    .filter((item) => item.category.toString().includes("PTY"))
    .filter(({ fcstTime }) => fcstTime === "1500");

  console.log("--category: PTY && fcstTime: 1500 --");
  console.log(WeatherData);
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "80px",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
    },
  },
}));

const Weather = () => {
  const classes = useStyles();
  const [sourceNow, setSourceNow] = useState([]);
  const [sourceMap, setSourceMap] = useState([]);

  useEffect(() => {
    const getNowData = async () => {
      const result = await apiNow.fetchWeatherNow();
      setSourceNow(result.data);
    };
    getNowData();
  }, []);

  useEffect(() => {
    const getMapData = async () => {
      const result = await apiMap.fetchWeatherMapData();
      setSourceMap(result.data);
    };
    getMapData();
  }, []);

  return (
    <Grid container spacing={3} className={classes.container}>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={6} lg={5}>
        <Paper className={classes.paper} style={{ height: "65vh" }}>
          <h3>지역별 평균 기온</h3>
          <MapChart data={transformMapData(sourceMap)} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} lg={5}>
        <Paper className={classes.paper} style={{ height: "65vh" }}>
          <h3>지역별 현재 날씨</h3>
          <ColumnChart data={transformNowData(sourceNow)} />
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
    </Grid>
  );
};
export default Weather;
