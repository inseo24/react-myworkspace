import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const ContactForm = ({ inputName, inputTel, inputEmail, onChange, onAdd }) => {
  return (
    <div style={{ display: "flex" }}>
      <TextField
        variant="outlined"
        inputRef={inputName}
        label="이름"
        onKeyPress={onChange}
        size="small"
        style={{
          width: "20%",
          marginRight: "0.5rem",
        }}
      />
      <TextField
        variant="outlined"
        inputRef={inputTel}
        label="연락처"
        onKeyPress={onChange}
        size="small"
        style={{
          width: "40%",
          marginRight: "0.5rem",
        }}
      />
      <TextField
        variant="outlined"
        inputRef={inputEmail}
        label="이메일"
        onKeyPress={onChange}
        size="small"
        style={{
          width: "40%",
          marginRight: "0.5rem",
        }}
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
  );
};

export default ContactForm;
