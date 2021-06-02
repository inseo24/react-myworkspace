// react 모듈에서 useState라는 함수 하나를 import 한 것
import { useRef, useState } from "react"; // useState를 쓰니까 자동으로 import가 되었음.

const Todo = () => {
  // 할 일 목록에 해당하는 state
  const [todoList, setTodoList] = useState([
    { memo: "React 공부하기" },
    { memo: "Javascript 연습하기" },
  ]);

  // JSX Element 요소를 참조하는 변수 (binding)
  const input = useRef();

  const add = () => {
    setTodoList([{ memo: input.current.value }, ...todoList]);
    input.current.value = "";
  };

  const remove = (index) => {
    console.log("클릭한 요소의 index: " + index);
    // state 배열, 원래배열 변경은 안 됨.
    // 배열 함수에서 새로운 배열을 반환하는 함수를 주로 사용
    // map, filter, concat

    // map: 배열 크기와 동일한 다른 배열을 생성

    // filter: 배열 크기와 다른 배열을 생성
    // 특정 조건에 맞는 요소들만 있는 배열

    // 배열.filter((요소변수, 인덱스변수) => {
    //  return 조건식(true/false)
    // })

    // ***return에 있는 조건식이 true인 요소만 반환되어 새로운 배열이 생성됨.

    // 사용 사례)
    // 클릭한 요소의 인덱스(index)와 배열 요소의 인덱스가 서로 다른 것만 새로운 배열로 생성

    // 클릭한 요소의 index = 0일 때,
    // idx = 0, index = 0, false -> 이 요소는 반환되지 않음 -> 새로운 배열에 존재하지 않음
    // idx = 1, index = 0, true -> 이 요소는 반환됨 -> 새로운 배열에 존재함

    // const newTodoList = todoList.filter((todo, idx) => {
    //   console.log("filter안에 idx: " + idx);
    //   return idx !== index;
    // });
    // console.log(newTodoList);

    // setTodoList(newTodoList);
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };

  // <></>: Fragment
  // 컴포넌트의 최상위 JSX Element는 1개만 존재할 수 있음
  return (
    <>
      {/* JSX Element 안에서 주석 넣기 */}
      {/* 입력폼 */}
      <div>
        <input type="text" placeholder="할 일 ..." ref={input} />
        {/* 함수의 이름을 대리자(delegate) == 함수의 본체와 같다 */}
        <button onClick={add}>입력</button>
      </div>
      {/* 목록 */}
      <div>
        <ul>
          {
            // 데이터와 UI요소를 연결하는 방법을 binding
            todoList.map((todo, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    remove(index);
                  }}
                >
                  ✔
                </button>
                {todo.memo}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
};

export default Todo;
