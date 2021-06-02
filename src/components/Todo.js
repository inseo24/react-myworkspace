// react 모듈에서 useState라는 함수 하나를 import 한 것
import { useRef, useState } from "react"; // useState를 쓰니까 자동으로 import가 되었음.

const Todo = () => {
  // 화면에 먼가 표시해야함 -> props or state, 내부에서 쓸거야 state
  // 할 일 목록에 해당하는 state
  const [todoList, setTodoList] = useState([
    { memo: "React 공부하기" },
    { memo: "Javascript 연습하기" },
  ]);

  // JSX Element 요소를 참조하는 변수 (binding)
  const input = useRef();

  const add = () => {
    console.log("--add--");
    // 입력박스의 값을 가져오고
    console.log(input.current);
    console.log(input.current.value);
    // 입력박스의 값을 배열에 추가

    // todoList.push({}) // 배열 뒤에 넣기
    // todoList.unshift({})  // 배열 앞에 넣기

    // state 변수는 직접적으로 변경하면 안 됨.
    // staet 변수를 변경할 수 있는 방법은 state 변경 함수만 사용해야함.
    // setTodoList(새로운배열);

    // let a = []; // 새로운 빈 배열이 생성됨

    // let arr = [{memo:"a"}, {memo:"b"}];
    // let arr2 = [...arr]; // 새로운 배열을 생성하여 기존 배열을 복사

    // spread operator(3점표기법, triple-dot expression)
    // ...arr -> {memo:"a"}, {memo:"b"}
    // 배열의 요소 목록을 나열함
    // ...배열변수 -> 배열의 요소목록이 나열됨

    // let obj = {} // 새로운 빈 객체를 생성
    // let obj2 = { memo: input.current.value } // 메모 속성이 있는 새로운 객체를 생성

    setTodoList([{ memo: input.current.value }, ...todoList]);

    // (다른방법) concat 함수는 배열과 배열을 결합하고 새로운배열을 반환
    // setTodoList(() => [{ memo: input.current.value }].concat(todoList));

    // 입력박스의 값을 비움
    input.current.value = "";
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
            // map 함수
            // 배열변수.map((요소변수, 인덱스변수) => {
            //   return 변경할요소
            // })

            // 기존 배열 크기만큼 변경된 배열로 반환함
            /*
              let arr = [1, 2, 3, 4, 5];
              let newArr = arr.map((element, index) => {
                return element + 1;
              })

              newArr == [2, 3, 4, 5, 6]
            */

            /*
              todolist = [
                { memo: "React 공부하기" },
                { memo: "Javascript 연습하기" },
              ]

              변경된배열 = [
                <li key={0}>React 공부하기</li>, 
                <li key={1}>Javascript 연습하기</li>
              ]
             */

            /*
              JSX Element의 key 속성: React에서 요소가 변경된 것을 감지하는 속성
            */

            // 데이터와 UI요소를 연결하는 방법을 binding
            todoList.map((todo, index) => (
              <li key={index}>{todo.memo}</li>
            ))
          }
        </ul>
      </div>
    </>
  );
};

export default Todo;
