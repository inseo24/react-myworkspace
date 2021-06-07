import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";

import BarChartSample from "./BarChartSample";
import LineChartSample from "./LineChartSample";
import ComposedChartSample from "./ComposedChartSample";

const useStyles = makeStyles((theme) => ({
  // 내부 페이퍼에 스타일을 지정
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  // 화면이 1280px 이상이면 그리드 컨테이너 위쪽에 마진을 줌.
  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "80px",
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  const data = [
    { sido: "seoul", pm10: 20, pm25: 10 },
    { sido: "gyeonggi", pm10: 20, pm25: 10 },
    { sido: "incheon", pm10: 14, pm25: 7 },
    { sido: "gangwon", pm10: 33, pm25: 15 },
    { sido: "sejong", pm10: 22, pm25: 6 },
    { sido: "chungbuk", pm10: 34, pm25: 14 },
    { sido: "chungnam", pm10: 13, pm25: 7 },
    { sido: "daejeon", pm10: 51, pm25: 7 },
    { sido: "gyeongbuk", pm10: 23, pm25: 10 },
    { sido: "gyeongnam", pm10: 17, pm25: 9 },
    { sido: "daegu", pm10: 21, pm25: 9 },
    { sido: "ulsan", pm10: 17, pm25: 12 },
    { sido: "busan", pm10: 19, pm25: 12 },
    { sido: "jeonbuk", pm10: 9, pm25: 5 },
    { sido: "jeonnam", pm10: 17, pm25: 9 },
    { sido: "gwangju", pm10: 12, pm25: 7 },
    { sido: "jeju", pm10: 10, pm25: 4 },
  ];

  const sidoKorName = {
    seoul: "서울",
    gyeonggi: "경기",
    incheon: "인천",
    gangwon: "강원",
    sejong: "세종",
    chungbuk: "충북",
    chungnam: "충남",
    daejeon: "대전",
    gyeongbuk: "경북",
    gyeongnam: "경남",
    daegu: "대구",
    ulsan: "울산",
    busan: "부산",
    jeonbuk: "전북",
    jeonnam: "전남",
    gwangju: "광주",
    jeju: "제주",
  };

  for (let elm of data) {
    elm.sido = sidoKorName[elm.sido];
  }

  // 서울 중구의 시간대별 변화
  const locationCurrentData = [
    { dataTime: "05-27:01", pm10: 46, pm25: 15 },
    { dataTime: "05-27:02", pm10: 46, pm25: 18 },
    { dataTime: "05-27:03", pm10: 43, pm25: 16 },
    { dataTime: "05-27:04", pm10: 37, pm25: 12 },
    { dataTime: "05-27:05", pm10: 39, pm25: 13 },
    { dataTime: "05-27:06", pm10: 37, pm25: 14 },
    { dataTime: "05-27:07", pm10: 38, pm25: 14 },
    { dataTime: "05-27:08", pm10: 42, pm25: 16 },
    { dataTime: "05-27:09", pm10: 38, pm25: 15 },
    { dataTime: "05-27:10", pm10: 22, pm25: 9 },
    { dataTime: "05-27:11", pm10: 17, pm25: 8 },
    { dataTime: "05-27:12", pm10: 17, pm25: 10 },
  ];

  return (
    // Grid 컨테이너 선언
    // spacing: Grid Item(내부요소) 들의 띄어쓰기
    <Grid container spacing={3} className={classes.container}>
      {/* Grid 아이템 선언 lg사이즈 이상일 때 2칸 */}
      {/* item 공간 핪이 12개가되면 다음행으로 넘어감 */}
      {/* 1행 */}
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={7} lg={6}>
        <Paper className={classes.paper} style={{ height: "20vh" }}>
          <BarChartSample data={data} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={5} lg={4}>
        <Paper className={classes.paper} style={{ height: "20vh" }}>
          <LineChartSample data={locationCurrentData} />
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={12} lg={10}>
        <Paper className={classes.paper} style={{ height: "40vh" }}>
          <ComposedChartSample data={data} />
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
    </Grid>
  );
};
export default Home;
