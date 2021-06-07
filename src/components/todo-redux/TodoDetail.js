import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";
import { Box, Button, Divider, Typography } from "@material-ui/core";

import { useParams, useHistory } from "react-router-dom";

import TodoComment from "./TodoComment";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },

  container: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "80px",
    },
  },
}));

const TodoDetail = () => {
  const classes = useStyles();
  const history = useHistory();

  // /todo/:id
  const { id } = useParams();
  // console.log(id);
  // URL 매개변수는 문자열로 들어옴 숫자값 비교면 변환 후 비교
  const todo = useSelector(
    (state) => state.todo.filter((todo) => todo.id === parseInt(id))[0]
  );
  // console.log(todo);

  return (
    <>
      <Grid container spacing={3} className={classes.container}>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={3} />
        </Hidden>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper className={classes.paper}>
            <Typography variant="h3">To-Do</Typography>
            <Divider style={{ marginTop: "1rem", marginBottom: "2rem" }} />
            <Box style={{ padding: "1rem" }}>{todo.memo}</Box>
            <Box style={{ display: "flex", direction: "rtl" }}>
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  history.push("/todo");
                }}
                // onClick={() => {
                //   history.replace("/todo");
                // }}
                // onClick={() => {
                //   history.goBack(-1);
                // }}
              >
                목록
              </Button>
            </Box>
          </Paper>
          {todo.comments && (
            <Paper style={{ marginTop: "2rem" }} className={classes.paper}>
              <List>
                {todo.comments.map((comment, index) => (
                  <TodoComment key={index} index={index} comment={comment} />
                ))}
              </List>
            </Paper>
          )}
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={3} />
        </Hidden>
      </Grid>
    </>
  );
};

export default TodoDetail;
