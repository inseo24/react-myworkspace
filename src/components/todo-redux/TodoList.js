import List from "@material-ui/core/List";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // useSelctor는 redux store의 state를 선택(select)
  // const 하위state변수 = useSelector((전체state) => 하위state)

  // select: 현재 state를 조회하고 변경을 감지, state가 변경되면 컴포넌트를 업데이트함
  const todoList = useSelector((state) => state.todo);

  return (
    <div>
      <List style={{ height: "40vh", overflowY: "auto" }}>
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </div>
  );
};

export default TodoList;
