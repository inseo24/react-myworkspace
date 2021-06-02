import React, { useState } from "react";

// props: 화면에 표시하는 변수, 외부에서 받아옴
// state: 화면에 표시하는 변수, 내부에서 선언
const Counter = () => {
  // React Hooks에서 useState Hook을 사용한 방법

  // state 변수를 선언하는 방법
  // const [state변수명, state변경함수명] = useState(state변수의 초깃값);
  // state변수 생성 및 state 변경 함수를 생성
  const [count, setCount] = useState(0);
  // const [data, setData] = useState("");

  const increaseCounter = () => {
    // state변수를 변경
    // state변경함수(변경할 값)

    // state 변경함수를 실행 -> 컴포넌트를 다시 렌더링함
    setCount(count + 1); // 기존 state에 + 1을 해서 적용
    // setData("test: " + count);

    // 변동된 내용을 HTML에 바로 적용하지 않음
    // Virtual Dom Tree(자바스크립트 객체)에만 업데이트
    // 렌더링 시점에 일괄 반영
  };

  return (
    <div>
      {/* state변수를 읽음 */}
      <p>You clicked {count} times </p>
      <button
        onClick={() => {
          increaseCounter();
        }}
      >
        Click me
      </button>
    </div>
  );
};

export default Counter;
