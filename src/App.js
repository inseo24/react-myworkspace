import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Suspense, lazy, useState } from "react";

// https://material-ui.com/customization/palette/
// https://material-ui.com/customization/color/
// https://material-ui.com/styles/api/#themeprovider
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";

// Core Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Icons
// https://material-ui.com/components/material-icons/
import {
  Home as HomeIcon,
  PlaylistAddCheck,
  TableChart,
  Menu as MenuIcon,
} from "@material-ui/icons";

import Home from "./components/home/Home";
// 리덕스 스토어 만들기1
import { createStore, applyMiddleware } from "redux"; // saga milldeware를 redux store에 적용하는데 사용
// 리덕스 스토어 만들기4
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga"; // saga middleware를 생성하는데 씀

// ./redux :
// redux.js , ./redux/index.js
// 리덕스 스토어 만들기2
import rootReducer from "./redux/reducers"; // 루트 리듀서
import rootSaga from "./redux/sagas"; // 루트 사가

// saga middleware 생성
const sagaMiddleWare = createSagaMiddleware();

// rootReduer로 redux store 생성
// 리덕스 스토어 만들기3(index의 rootReducer 연결)
// sagamiddleware 적용
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

// saga middleware 실행
// saga에서 중간에 캐치할 action들에 대해서 응답대기
// 반복문이 돌고 있음. event-loop
sagaMiddleWare.run(rootSaga);

// 라우터에 로딩되는 컴포넌트는 컨테이너 컴포넌트
const Todo = lazy(() => import("./components/todo-redux/Todo"));
const TodoDetail = lazy(() => import("./components/todo-redux/TodoDetail"));
const Contact = lazy(() => import("./components/contact-redux/Contact"));
const ContactDetail = lazy(() =>
  import("./components/contact-redux/ContactDetail")
);

const drawerWidth = "240px";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // viewport 가로가 1280px 이상일때 적용
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${drawerWidth})`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    marginRight: theme.spacing(2), // 기본 spacing(띄어쓰기)이 8px * 2
  },
  toolbar: theme.mixins.toolbar, // 툴바에 대한 기본 스타일
  content: {
    flexGrow: 1,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: drawerWidth,
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3),
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  link: {
    textDecoration: "none", // 밑줄 없애기
    color: "inherit", // 폰트 컬러를 부모요소에 색상으로
  },
}));

function App() {
  const classes = useStyles(); // css 클래스 목록이 생성됨
  const [mobileOpen, setMobileOpen] = useState(false); // 앱서랍 열기/닫기

  // https://material-ui.com/customization/palette/
  // https://material-ui.com/customization/color/
  const theme = createMuiTheme({
    palette: {
      // type: "dark",
      primary: {
        main: "#d7a8df",
      },
      secondary: {
        main: "#ce93d8",
      },
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List component="nav">
        <Link to="/" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>
        <Link to="/todo" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PlaylistAddCheck />
            </ListItemIcon>
            <ListItemText>To-Do</ListItemText>
          </ListItem>
        </Link>
        <Link to="/contacts" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <TableChart />
            </ListItemIcon>
            <ListItemText>Contacts</ListItemText>
          </ListItem>
        </Link>
      </List>
    </>
  );

  return (
    // Provider 하위 컴포넌트들에 redux store를 쓸 수 있게 해줌
    // 리덕스 스토어 만들기5
    <Provider store={store}>
      {/* // https://material-ui.com/styles/api/#themeprovider */}
      <ThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <header>
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  {/* color="inherit" 부모 요소의 폰트 컬러를 사용함 */}
                  <IconButton
                    color="inherit"
                    edge="start"
                    className={classes.menuButton}
                    onClick={handleDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                    MY WORKSPACE
                  </Typography>
                </Toolbar>
              </AppBar>

              {/* 앱서랍(Drawer)  */}

              {/* 화면이 1280px 이상일 때 숨기는 서랍 */}
              <Hidden lgUp implementation="css">
                <Drawer
                  variant="temporary"
                  open={mobileOpen}
                  classes={{ paper: classes.drawerPaper }}
                  onClose={handleDrawerToggle}
                >
                  {drawer}
                </Drawer>
              </Hidden>

              {/* 화면이 1280px 미만일 때 숨기는 서랍 */}
              <Hidden mdDown implementation="css">
                <Drawer
                  open
                  variant="permanent"
                  classes={{ paper: classes.drawerPaper }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </header>
            <main className={classes.content}>
              {/* 상단 toolbar 공간만큼 띄우기 */}
              <div className={classes.toolbar} />
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/" component={Home} exact></Route>
                  <Route path="/todo" component={Todo} exact></Route>
                  {/* :매개변수명 -> 컴포넌트에서 변수처럼 받을 수 있음 */}
                  <Route path="/todo/:id" component={TodoDetail}></Route>
                  <Route path="/contacts" component={Contact} exact></Route>
                  <Route path="/contacts/:id" component={ContactDetail}></Route>
                </Switch>
              </Suspense>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; // export: 내보내기, import: 가져오기
