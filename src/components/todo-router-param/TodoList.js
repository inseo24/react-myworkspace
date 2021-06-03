import List from "@material-ui/core/List";
import TodoItem from "./TodoItem";

const TodoList = ({ todoList, ulRef, onRemove, onSave }) => {
  return (
    <div>
      <List ref={ulRef} style={{ height: "40vh", overflowY: "auto" }}>
        {todoList.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            onRemove={onRemove}
            onSave={onSave}
          />
        ))}
      </List>
    </div>
  );
};

export default TodoList;
