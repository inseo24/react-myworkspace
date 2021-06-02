import { useState, useRef } from "react";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([
    { memo: "React 공부하기" },
    { memo: "Javascript 연습하기" },
  ]);
  const input = useRef();
  const ul = useRef();

  const add = () => {
    console.log(input.current);
    setTodoList([{ memo: input.current.value }, ...todoList]);
    input.current.value = "";
  };

  const change = (event) => {
    // console.log(event);
    if (event.charCode === 13) {
      add();
    }
  };

  const remove = (index) => {
    const arr = todoList;
    const newArr = todoList.filter((todo, idx) => idx !== index);

    console.log(arr[0] === newArr[0]);

    setTodoList(todoList.filter((todo, idx) => idx !== index));
  };

  const save = (index) => {
    console.log(index);
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

  return (
    <>
      <TodoForm inputRef={input} onAdd={add} onChange={change} />
      <TodoList
        todoList={todoList}
        ulRef={ul}
        onRemove={remove}
        onSave={save}
      />
    </>
  );
};

export default TodoContainer;
