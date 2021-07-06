import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import React, { useEffect, useState } from "react";

import MapChart from "./assets/MapChart";
import ColumnChart from "./assets/ColumnChart";

import areaCode from "./assets/data/areaCode";
import skyImage from "./assets/data/skyImage";
import ptyImage from "./assets/data/ptyImage";
import latitude from "./assets/data/latitude";
import longitude from "./assets/data/longitude";

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

  const WeatherData = sourceNow.filter(
    (item) => ["PTY", "SKY"].includes(item.category) && item.fcstTime === "1500"
  );

  console.log("--category: PTY, SKY && fcstTime: 1500 --");
  console.log(WeatherData);

  const categoryPty = WeatherData.filter(
    (item) => item.category === "PTY" && item.fcstValue !== "0"
  );
  console.log("-- category : PTY && fcstValue != 0 ");
  console.log(categoryPty);

  const categorySky = Object.values(
    WeatherData.reduce((array, item) => {
      array[item.ny] = { ...(array[item.ny] || {}), [item.category]: item };
      return array;
    }, {})
  )
    .filter(({ PTY }) => PTY.fcstValue === "0")
    .map(({ SKY }) => SKY);

  console.log("--category: SKY(category: PTY && fcstValue === 0) --");
  console.log(categorySky);

  const transformPtyImage = categoryPty.map((el) => {
    if (ptyImage[el.fcstValue]) {
      return {
        ...el,
        fcstValue: ptyImage[el.fcstValue],
      };
    }
    return el;
  });

  console.log("--PTY imageURL 넣기--");
  console.log(transformPtyImage);

  const transformSkyImage = categorySky.map((el) => {
    if (skyImage[el.fcstValue]) {
      return {
        ...el,
        fcstValue: skyImage[el.fcstValue],
      };
    }
    return el;
  });

  console.log("--SKY imageURL 넣기--");
  console.log(transformSkyImage);

  const mergeCategory = [...transformPtyImage, ...transformSkyImage];

  console.log("-- merge array-- ");
  console.log(mergeCategory);

  const addLongitude = mergeCategory.map((item) => {
    item.longitude = item.ny;
    item.latitude = item.ny;
    return item;
  });

  const transLongitude = addLongitude.map((el) => {
    if (longitude[el.longitude]) {
      return {
        ...el,
        longitude: longitude[el.longitude],
      };
    }
    return el;
  });

  const transLatitude = transLongitude.map((el) => {
    if (latitude[el.latitude]) {
      return {
        ...el,
        latitude: latitude[el.latitude],
      };
    }
    return el;
  });

  console.log("--add longitude, latitude--");
  console.log(transLatitude);

  const transformLocationData = transLatitude.map((el) => {
    if (areaCode[el.ny]) {
      return {
        ...el,
        ny: areaCode[el.ny],
      };
    }
    return el;
  });

  console.log("--areaCode -> areaName--");
  console.log(transformLocationData);

  const mapData = transformLocationData.map(
    ({ ny, fcstValue, longitude, latitude }) => {
      return {
        latitude: latitude,
        longitude: longitude,
        지역: ny,
        imageURL: fcstValue,
        width: 32,
        height: 32,
      };
    }
  );

  console.log("-- mapData :  add width, height --");
  console.log(mapData);

  return mapData;
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
          <h3>지역별 오후 날씨</h3>
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
