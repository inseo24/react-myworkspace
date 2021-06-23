import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";

import LineTable from "./assets/LineTable";
import MapTable from "./assets/Map";

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

  return (
    <Grid container spacing={3} className={classes.container}>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={6} lg={5}>
        <Paper className={classes.paper} style={{ height: "65vh" }}>
          <h3>지역별 평균 기온</h3>
          <MapTable />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} lg={5}>
        <Paper className={classes.paper} style={{ height: "65vh" }}>
          <h3>지역별 날씨</h3>
          <LineTable />
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
    </Grid>
  );
};
export default Weather;
