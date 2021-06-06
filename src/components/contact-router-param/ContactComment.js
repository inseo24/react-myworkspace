import { Divider, TableCell } from "@material-ui/core";

const TodoComment = ({ index, comment }) => {
  return (
    <>
      {index !== 0 && (
        <Divider
          key={`divider-${comment.id}`}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        />
      )}
      <TableCell key={`item-${comment.id}`}>{comment.content}</TableCell>
    </>
  );
};
export default TodoComment;
