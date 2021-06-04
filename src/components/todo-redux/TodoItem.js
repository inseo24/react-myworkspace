import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Check } from "@material-ui/icons";
import { useState, useRef } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const TodoItem = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(todo.isEdit);
  const history = useHistory(); // 코드를 이용하여 경로 이동 제어를 할 수 있음
  const dispatch = useDispatch();
  const inputRef = useRef();

  const remove = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const save = (id) => {
    const memo = inputRef.current.value;
    dispatch({ type: "SAVE_TODO", payload: { id, memo } });
  };

  return (
    <ListItem>
      <ListItemIcon
        onClick={() => {
          remove(todo.id);
        }}
      >
        <Check style={{ cursor: "pointer" }} />
      </ListItemIcon>
      {!isEdit && (
        <ListItemText
          style={{ cursor: "pointer" }}
          // history.push('경로'), history 스택(stack)에 경로 추가
          onClick={() => {
            history.push(`/todo/${todo.id}`);
          }}
        >
          {todo.memo}
        </ListItemText>
      )}
      {!isEdit && (
        <Button
          onClick={() => {
            setIsEdit(true);
          }}
        >
          edit
        </Button>
      )}
      {isEdit && (
        <ListItemText>
          <TextField
            type="text"
            inputRef={inputRef}
            defaultValue={todo.memo}
            style={{ width: "100%" }}
          ></TextField>
        </ListItemText>
      )}
      {isEdit && (
        <Button
          onClick={() => {
            save(todo.id);
            setIsEdit(false);
          }}
        >
          save
        </Button>
      )}
      {isEdit && (
        <Button
          onClick={() => {
            setIsEdit(false);
          }}
        >
          cancel
        </Button>
      )}
    </ListItem>
  );
};

export default TodoItem;
