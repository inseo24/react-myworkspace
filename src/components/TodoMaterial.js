import React, { useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Check } from "@material-ui/icons";
import { Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formRoot: {
    display: "flex",
    height: theme.typography.fontSize * 2,
  },
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

const Todo = () => {
  const classes = useStyles();

  const [todoList, setTodoList] = useState([
    { memo: "React 공부하기" },
    { memo: "Javascript 연습하기" },
  ]);
  const input = useRef();
  const ul = useRef();

  const change = (event) => {
    // console.log(event);
    if (event.charCode === 13) {
      add();
    }
  };

  const add = () => {
    console.log(input.current);
    setTodoList([{ memo: input.current.value }, ...todoList]);
    input.current.value = "";
  };

  const remove = (index) => {
    const arr = todoList;
    const newArr = todoList.filter((todo, idx) => idx !== index);

    console.log(arr[0] === newArr[0]);

    setTodoList(todoList.filter((todo, idx) => idx !== index));
  };

  const edit = (index) => {
    setTodoList(
      todoList.map((todo, idx) => {
        if (idx === index) {
          todo.isEdit = true;
        }

        return todo;
      })
    );
  };

  const cancel = (index) => {
    setTodoList(
      todoList.map((todo, idx) => {
        if (idx === index) {
          delete todo.isEdit;
        }

        return todo;
      })
    );
  };

  const save = (index) => {
    setTodoList(
      todoList.map((todo, idx) => {
        if (idx === index) {
          const li = ul.current.children[index];
          const editInput = li.querySelector("input");
          todo.memo = editInput.value;
          delete todo.isEdit;
        }

        return todo;
      })
    );
  };

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
            <div style={{ display: "flex" }}>
              <TextField
                variant="outlined"
                inputRef={input}
                label="할 일 ..."
                onKeyPress={change}
                size="small"
                style={{
                  width: "90%",
                  marginRight: "0.5rem",
                }}
                // className="memo"
                inputProps={{ className: "memo" }}
              />
              <Button
                style={{ width: "10%" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  add();
                }}
              >
                입력
              </Button>
              <Button variant="contained" color="secondary">
                취소
              </Button>
            </div>
            <div>
              <List ref={ul} style={{ height: "40vh", overflowY: "auto" }}>
                {todoList.map((todo, index) => (
                  <ListItem key={index}>
                    <ListItemIcon
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                    {!todo.isEdit && <ListItemText>{todo.memo}</ListItemText>}
                    {!todo.isEdit && (
                      <Button
                        onClick={() => {
                          edit(index);
                        }}
                      >
                        edit
                      </Button>
                    )}
                    {todo.isEdit && (
                      <ListItemText>
                        <TextField
                          type="text"
                          defaultValue={todo.memo}
                          style={{ width: "100%" }}
                        ></TextField>
                      </ListItemText>
                    )}
                    {todo.isEdit && (
                      <Button
                        onClick={() => {
                          save(index);
                        }}
                      >
                        save
                      </Button>
                    )}
                    {todo.isEdit && (
                      <Button
                        onClick={() => {
                          cancel(index);
                        }}
                      >
                        cancel
                      </Button>
                    )}
                  </ListItem>
                ))}
              </List>
            </div>
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={1} md={2} lg={3} />
        </Hidden>
      </Grid>
    </>
  );
};

export default Todo;
