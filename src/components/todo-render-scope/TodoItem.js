import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Check } from "@material-ui/icons";
import { useState } from "react";

const TodoItem = ({ index, todo, onRemove, onSave }) => {
  const [isEdit, setIsEdit] = useState(todo.isEdit);

  return (
    <ListItem>
      <ListItemIcon
        onClick={() => {
          onRemove(index);
        }}
      >
        <Check />
      </ListItemIcon>
      {!isEdit && <ListItemText>{todo.memo}</ListItemText>}
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
            defaultValue={todo.memo}
            style={{ width: "100%" }}
          ></TextField>
        </ListItemText>
      )}
      {isEdit && (
        <Button
          onClick={() => {
            onSave(index);
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
