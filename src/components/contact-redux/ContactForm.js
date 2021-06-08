import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const ContactForm = () => {
  const inputNameRef = useRef();
  const inputNumberRef = useRef();
  const inputMailRef = useRef();
  // store에 dispatch할 함수를 생성
  const dispatch = useDispatch();

  // dispatch(action 객체)
  // action객체 = {type:"명령어", payload:메시지객체}
  const add = () => {
    dispatch({
      type: "ADD_CONTACT",
      payload: {
        name: inputNameRef.current.value,
        number: inputNumberRef.current.value,
        mail: inputMailRef.current.value,
      },
    });
    inputNameRef.current.value = "";
    inputNumberRef.current.value = "";
    inputMailRef.current.value = "";
  };

  const change = (event) => {
    if (event.charCode === 13) {
      add();
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <TextField
        variant="outlined"
        inputRef={inputNameRef}
        label="이름"
        onKeyPress={change}
        size="small"
        style={{ width: "90%", marginRight: "0.5rem" }}
      />
      <TextField
        variant="outlined"
        inputRef={inputNumberRef}
        label="전화번호"
        onKeyPress={change}
        size="small"
        style={{ width: "90%", marginRight: "0.5rem" }}
      />
      <TextField
        variant="outlined"
        inputRef={inputMailRef}
        label="메일"
        onKeyPress={change}
        size="small"
        style={{ width: "90%", marginRight: "0.5rem" }}
      />
      <Button
        style={{ width: "10%" }}
        variant="contained"
        color="secondary"
        onClick={add}
      >
        입력
      </Button>
    </div>
  );
};

export default ContactForm;
