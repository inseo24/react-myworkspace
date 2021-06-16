import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import BarChartSample from "./BarChartSample";
import LineChartSample from "./LineChartSample";
import ResponsiveTable from "./ResponsiveTableSample";

import sourceSample from "./data/source";
import sidoKorName from "./data/sidoKorName";
import bardata from "./data/bardata";
import linedata from "./data/linedata";
import tabledata from "./data/tabledata";
import { useEffect, useState } from "react";

import api from "../../api/opendata";

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

const transformSidoData = (source) => {
  if (source.length === 0) return [];

  // 가장 최근 데이터 (PM10, PM2.5)
  const sourceData = source.slice(0, 2);

  const transData = [];
  for (let name in sidoKorName) {
    const item = {
      sido: sidoKorName[name],
      pm10: parseInt(sourceData[0][name]),
      pm25: parseInt(sourceData[1][name]),
    };
    transData.push(item);
  }

  return transData;
};

const transformLocationData = (source, sido) => {
  if (source.length === 0) return [];

  const transData = [];
  let item = {};
  // for-in 문 동일한데, index를 사용하고 싶을 때 쓴다
  source.forEach((record, index) => {
    if (index % 2 === 0) {
      // PM10
      item.dataTime = record.dataTime.substr(11, 5);
      item.pm10 = parseInt(record[sido]);
    } else {
      // PM2.5
      item.pm25 = parseInt(record[sido]);
      transData.unshift(item);
      item = {};
    }
  });

  return transData;
};

const transformSidoTableData = (source) => {
  if (source.length === 0) return [];
  return source.map((item) => {
    let newItem = { 시간: item.dataTime.substr(5, 11), 구분: item.itemCode };
    for (let name in sidoKorName) {
      let val = item[name];
      newItem[sidoKorName[name]] = parseInt(val);
    }

    return newItem; // map함수 안에서 반환되는 객체
  });
};

const Home = () => {
  const classes = useStyles();
  const [sido, setSido] = useState("seoul");
  const [source, setSource] = useState([]);

  // 백엔드에서 받아온 데이터를 세팅함

  // useEffect(()=>{}, [])
  // [변수명] -> 변수의 값이 바뀔 때 마다 함수가 호출됨
  // [] -> 컴포넌트가 처음 마운트될 때만 호출됨

  useEffect(() => {
    // async-await, ES8, ES2017
    const getData = async () => {
      // await 키워드: promise 처리가 완료될 때까지 대기
      // async 함수 안에서만 쓸 수가 있음.
      // -> 네트워크 호출이 끝날때까지 대기하고 결과값을 반환함
      const result = await api.fetchDustHourly();
      setSource(result.data);
    };

    getData();

    // Promise chain, ES6, ES2015
    // api.fetchDustHourly().then(result => {
    //   setSource(result.data);
    // });
  }, []);

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
        <Paper className={classes.paper} style={{ height: "25vh" }}>
          <h3>시도별 미세먼지 현재 현황</h3>
          <BarChartSample data={transformSidoData(source)} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={5} lg={4}>
        <Paper className={classes.paper} style={{ height: "25vh" }}>
          <h3>
            <Select
              value={sido}
              onChange={(event) => {
                setSido(event.target.value);
              }}
            >
              {Object.keys(sidoKorName).map((sido) => (
                <MenuItem key={`menu-${sido}`} value={sido}>
                  {sidoKorName[sido]}
                </MenuItem>
              ))}
            </Select>
            {"\u00A0"} 미세먼지 현황
          </h3>
          <LineChartSample data={transformLocationData(source, sido)} />
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
      <Grid item xs={12} sm={12} lg={10}>
        <Paper className={classes.paper}>
          <h3>시도별 미세먼지 이력</h3>
          <ResponsiveTable data={transformSidoTableData(source.slice(0, 8))} />
        </Paper>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={1} />
      </Hidden>
    </Grid>
  );
};
export default Home;
