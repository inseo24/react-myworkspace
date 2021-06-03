import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const TodoForm = ({ inputRef, onChange, onAdd }) => {
  return (
    <div style={{ display: "flex" }}>
      <TextField
        variant="outlined"
        inputRef={inputRef}
        label="할 일 ..."
        onKeyPress={onChange}
        size="small"
        style={{
          width: "90%",
          marginRight: "0.5rem",
        }}
      />
      <Button
        style={{ width: "10%" }}
        variant="contained"
        color="primary"
        onClick={onAdd}
      >
        입력
      </Button>
    </div>
  );
};

export default TodoForm;
