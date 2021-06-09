import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const TodoForm = () => {
  const inputRef = useRef();
  // store에 dispatch할 함수를 생성
  const dispatch = useDispatch();

  const add = () => {
    const memo = inputRef.current.value;
    // dispatch(action객체)
    // action객체 = {type:"명령어", payload:메시지객체}
    dispatch({ type: "ADD_TODO", payload: { memo } });
    inputRef.current.value = "";
  };

  const change = (event) => {
    // console.log(event);
    if (event.charCode === 13) {
      add();
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <TextField
        variant="outlined"
        inputRef={inputRef}
        label="할 일 ..."
        onKeyPress={change}
        size="small"
        style={{
          width: "90%",
          marginRight: "0.5rem",
        }}
      />
      <Button
        style={{ width: "15%" }}
        variant="contained"
        color="secondary"
        onClick={add}
      >
        추가✨
      </Button>
    </div>
  );
};

export default TodoForm;
