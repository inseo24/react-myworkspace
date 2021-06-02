// Container(데이터로직부) Component
import { useState, useRef } from "react";

// 컨테이너 컴포넌트에서 표현 컴포넌트를 임포트함
import TodoList from "./TodoList";

const Todo = () => {
  const [todoList, setTodoList] = useState([
    { memo: "React 공부하기" },
    { memo: "Javascript 연습하기" },
  ]);
  const input = useRef();
  const ul = useRef();

  const handleInputChage = (event) => {
    // console.log(event);
    if (event.charCode === 13) {
      handleAdd();
    }
  };

  const handleAdd = () => {
    console.log(input.current);
    setTodoList([{ memo: input.current.value }, ...todoList]);
    input.current.value = "";
  };

  const handleItemRemove = (index) => {
    const arr = todoList;
    const newArr = todoList.filter((todo, idx) => idx !== index);

    console.log(arr[0] === newArr[0]);

    setTodoList(todoList.filter((todo, idx) => idx !== index));
  };

  const handleItemEdit = (index) => {
    setTodoList(
      todoList.map((todo, idx) => {
        if (idx === index) {
          todo.isEdit = true;
        }

        return todo;
      })
    );
  };

  const handleItemCancel = (index) => {
    setTodoList(
      todoList.map((todo, idx) => {
        if (idx === index) {
          delete todo.isEdit;
        }

        return todo;
      })
    );
  };

  const handItemSave = (index) => {
    setTodoList(
      todoList.map((todo, idx) => {
        if (idx === index) {
          const li = ul.current.children[index];
          const editInput = li.querySelector("input");
          todo.memo = editInput.value;
          delete todo.isEdit;
        }

        return todo;
      })
    );
  };

  // Presenter 컴포넌트에서 사용할 객체를 속성으로 넘김
  return (
    <TodoList
      inputRef={input}
      ulRef={ul}
      todoList={todoList}
      onAdd={handleAdd}
      onInputChange={handleInputChage}
      onItemRemove={handleItemRemove}
      onItemEdit={handleItemEdit}
      onItemCancel={handleItemCancel}
      onItemSave={handItemSave}
    />
    // TodoList 컴포넌트의 onInputChange 이벤트를 정의, 이벤트가 발생하면 handleInputChage 호출
  );
};

export default Todo;
