// Presenter(표현부) Component
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

//
const TodoList = ({
  inputRef,
  ulRef,
  todoList,
  onAdd,
  onInputChange,
  onItemRemove,
  onItemEdit,
  onItemCancel,
  onItemSave,
}) => {
  const classes = useStyles();

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
                inputRef={inputRef}
                label="할 일 ..."
                onKeyPress={onInputChange}
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
                  onAdd();
                }}
              >
                입력
              </Button>
            </div>
            <div>
              <List ref={ulRef} style={{ height: "40vh", overflowY: "auto" }}>
                {todoList.map((todo, index) => (
                  <ListItem key={index}>
                    <ListItemIcon
                      onClick={() => {
                        onItemRemove(index);
                      }}
                    >
                      <Check />
                    </ListItemIcon>
                    {!todo.isEdit && <ListItemText>{todo.memo}</ListItemText>}
                    {!todo.isEdit && (
                      <Button
                        onClick={() => {
                          onItemEdit(index);
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
                          onItemSave(index);
                        }}
                      >
                        save
                      </Button>
                    )}
                    {todo.isEdit && (
                      <Button
                        onClick={() => {
                          onItemCancel(index);
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

export default TodoList;
