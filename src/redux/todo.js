/* todoList 상태를 관리하는 reducer */

/* reducer는 state와 action이라는 매개변수를 받는 함수 */
/* state: 이전 상태 == 이전 state 값/객체  */
/* action: component -> dispatcher로 부터 전달 받은 action 객체 */

/* reducer는 이전 state와 action 객체를 받아서(이용해서) state를 변경 */

const initialState = [
  {
    id: 1,
    memo: "React 공부하기",
    comments: [
      { id: 1, content: "커멘트입니다1." },
      { id: 2, content: "커멘트입니다2." },
    ],
  },
  {
    id: 2,
    memo: "Javascript 연습하기",
    comments: [
      { id: 3, content: "커멘트입니다3." },
      { id: 4, content: "커멘트입니다4." },
    ],
  },
];

// 초기상태가 없으면 initialState를 적용
// initialState는 state의 기본 뼈대를 만들 때 사용 또는 테스트 데이터용
const todo = (state = initialState, action) => {
  // action의 type(명령어종류)에 따라서 state 변경로직을 실행
  // action = {type:'명령어', payload:'메시지'}
  // design pattern 중에서 command pattern을 응용
  switch (action.type) {
    // action = {type: 'ADD_TODO', payload: {id:3, memo:'redux 공부'}}
    case "ADD_TODO":
      // action.type에 따라서 state 변경하여 return
      // return 변동된state;

      // ...: spread operator(나열 연산자)
      // array일 때는 element들을 나열
      // object일 때는 prop들을 나열
      // {...object} : object literal, ES2018
      // 기존 객체에서 새로운 객체를 카피하여 생성

      // let student = {name:'hong', age:35};
      // let newStudent = {name:student.name, age:student.age};
      // let newStudent2 = Object.assign(student, {});
      // let newStudent3 = {...student};

      return [{ ...action.payload }, ...state];
    // default 케이스는 기존 상태를 반환
    default:
      return state;
  }
};

export default todo;
