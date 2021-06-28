import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import { useEffect, useState } from "react";

import MapChart from "./assets/Map";
import ColumnChart from "./assets/ColumnChart";

import areaCode from "./assets/data/areaCode";
import apiNow from "../../api/weathernow";

const transformNowData = (sourceNow) => {
  if (sourceNow.length === 0) return [];

  const nowWeatherData = sourceNow
    .filter((item) => item.category === "T1H")
    .filter(({ obsrValue }) => ({
      obsrValue,
    }));

  console.log("--현재 날씨 데이터만 뽑기--");
  console.log(nowWeatherData);

  const transformLocationData = nowWeatherData.map((el) => {
    if (areaCode[el.ny]) {
      return {
        ...el,
        ny: areaCode[el.ny],
      };
    }
    return el;
  });
  console.log("--지역명 넣기--");
  console.log(transformLocationData);

  const nowWeather = transformLocationData.map(({ ny, obsrValue }) => {
    return {
      지역: ny,
      기온: parseFloat(obsrValue),
    };
  });

  console.log("--컬럼 데이터 완성--");
  console.log(nowWeather);

  return nowWeather;
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

  useEffect(() => {
    const getNowData = async () => {
      const result = await apiNow.fetchWeatherNow();
      setSourceNow(result.data);
    };
    getNowData();
  }, []);

  return (
    <Grid container spacing={3} className={classes.container}>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={6} lg={5}>
        <Paper className={classes.paper} style={{ height: "65vh" }}>
          <h3>지역별 평균 기온</h3>
          <MapChart />
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
