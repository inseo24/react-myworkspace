import List from "@material-ui/core/List";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";

import TodoPagination from "./TodoPagination";

const TodoList = () => {
  // useSelctor는 redux store의 state를 선택(select)
  // const 하위state변수 = useSelector((전체state) => 하위state)

  // select: 현재 state를 조회하고 변경을 감지, state가 변경되면 컴포넌트를 업데이트함
  const data = useSelector((state) => state.todo);
  console.log("-- todo state in TodoList Component --");
  console.log(data);
  const dispatch = useDispatch();

  // 컴포넌트가 처음 마운트 됐을 때 서버에서 데이터를 받아옴
  // useEffect 훅: 특정 값이 변경됐을 때 처리하는 로직을 작성
  // []: 컴포넌트가 처음 마운트 됐을 때 실행
  // [변수]: 변수 값이 바뀔 때 실행

  // 컴포넌트가 마운트되고 dispatch 함수가 생성되면 실행
  useEffect(() => {
    // 서버에서 데이터를 받아오는 action을 실행
    dispatch({ type: "FETCH_TODOLIST_PAGING" });
  }, [dispatch]);

  return (
    <div>
      <List style={{ height: "40vh", overflowY: "auto" }}>
        {data.content.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
      <TodoPagination
        totalElements={data.totalElements}
        page={data.page}
        size={data.size}
      />
    </div>
  );
};

export default TodoList;
