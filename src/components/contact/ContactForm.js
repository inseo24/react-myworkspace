import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const ContactForm = ({
  inputNameRef,
  inputNumberRef,
  inputMailRef,
  onAdd,
  onChange,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <TextField
        variant="outlined"
        inputRef={inputNameRef}
        label="이름"
        onKeyPress={onChange}
        size="small"
        style={{ width: "90%", marginRight: "0.5rem" }}
      />
      <TextField
        variant="outlined"
        inputRef={inputNumberRef}
        label="전화번호"
        onKeyPress={onChange}
        size="small"
        style={{ width: "90%", marginRight: "0.5rem" }}
      />
      <TextField
        variant="outlined"
        inputRef={inputMailRef}
        label="메일"
        onKeyPress={onChange}
        size="small"
        style={{ width: "90%", marginRight: "0.5rem" }}
      />
      <Button
        style={{ width: "10%" }}
        variant="contained"
        color="secondary"
        onClick={onAdd}
      >
        입력
      </Button>
    </div>
  );
};

export default ContactForm;
