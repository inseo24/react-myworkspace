import { useState, useRef } from "react";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

import { list } from "./data";

const TodoContainer = () => {
  const [todoList, setTodoList] = useState(list);
  const ul = useRef();

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
      <TodoForm />
      <TodoList ulRef={ul} onRemove={remove} onSave={save} />
    </>
  );
};

export default TodoContainer;
