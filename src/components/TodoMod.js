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
  const ul = useRef();

  const add = () => {
    setTodoList([{ memo: input.current.value }, ...todoList]);
    input.current.value = "";
  };

  const remove = (index) => {
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };

  const edit = (index) => {
    setTodoList(
      // 변경된 배열
      todoList.map((todo, idx) => {
        // 배열반복요소의 idx와 클릭한 요소의 index가 같은지 비교
        if (idx === index) {
          // 같으면 isEdit 속성을 추가함
          todo.isEdit = true;
        }

        return todo;
      })
    );
  };

  const cancel = (index) => {
    setTodoList(
      // 변경된 배열
      todoList.map((todo, idx) => {
        // 배열반복요소의 idx와 클릭한 요소의 index가 같은지 비교
        if (idx === index) {
          // 같으면 isEdit 속성을 삭제함
          delete todo.isEdit;
        }
        // 변경된 요소를 리턴해함
        return todo;
      })
    );
  };

  const save = (index) => {
    // ref 변수의 current는 현재 HTML태그로 그려진 요소(node)
    console.log(ul.current.children); // ul의 자식 li 목록
    console.log(ul.current.children[index]); // ul의 자식 li 목록에서 클릭한 버튼이 있는 li
    setTodoList(
      // 변경된 배열
      todoList.map((todo, idx) => {
        // 배열반복요소의 idx와 클릭한 요소의 index가 같은지 비교
        if (idx === index) {
          // ul > li > input 박스 선택
          const li = ul.current.children[index];
          const editInput = li.querySelector("input");
          console.log(editInput);
          // 같으면 입력박스의 값을 todo.memo에 대입
          todo.memo = editInput.value;
          // 조회 모드로 변경
          delete todo.isEdit;
        }
        // 변경된 요소를 반환
        return todo;
      })

      // 맵 함수가 반환하는 배열 == 맵 함수가 호출하는 함수의 리턴 객체의 모음

      // [undefined, undefined]
      // [{memo:ssdfsdf, }, {}.....]
    );
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
        <ul ref={ul}>
          {
            // 데이터와 UI요소를 연결하는 방법을 binding
            todoList.map((todo, index) => (
              //ㄴㅇㄹㄴㅁㅇㄹ
              <li key={index}>
                <button
                  onClick={() => {
                    remove(index);
                  }}
                >
                  ✔
                </button>
                {/* 조건식 && JSX엘리먼트 */}
                {/* 조건식이 true로 평가되면 JSX 엘리먼트 표시 */}
                {/* 조건식이 false로 평가되면 아무것도 표시하지 않음 */}
                {/* JSX Element안에서 js를 작성하려면 중괄호로 감싸줘야함 */}

                {/* 조회 모드일 때만 보이는 내용 */}
                {/* isEdit 속성이 undefined 상태이면 보임 */}
                {!todo.isEdit && <span>{todo.memo}</span>}
                {!todo.isEdit && (
                  <button
                    onClick={() => {
                      edit(index);
                    }}
                  >
                    edit
                  </button>
                )}

                {/* 수정 모드일 때만 보이는 내용 */}
                {/* isEdit 속성이 존재하고 true값이면 보임 */}
                {todo.isEdit && (
                  <input type="text" defaultValue={todo.memo}></input>
                )}
                {todo.isEdit && (
                  <button
                    onClick={() => {
                      save(index);
                    }}
                  >
                    save
                  </button>
                )}
                {todo.isEdit && (
                  <button
                    onClick={() => {
                      cancel(index);
                    }}
                  >
                    cancel
                  </button>
                )}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
};

export default Todo;
