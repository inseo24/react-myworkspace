/* contactList 상태를 관리하는 reducer */

/* reducer는 state와 action이라는 매개변수를 받는 함수 */
/* state: 이전 상태 == 이전 state 값/객체  */
/* action: component -> dispatcher로부터 전달 받은 action 객체 */

/* reducer는 이전 state와 action 객체를 받아서(이용해서) state를 변경 */

const initialState = [];

// 초기상태가 없으면 initialState를 적용

const contact = (state = initialState, action) => {
  // action의 type == 명령어 종류임. type에 따라 state 변경 로직을 실행함.
  // action = {type:'명령어', payload:'메시지'}
  // 메시지는 컴포넌트간 교환하는 데이터라고 생각해야함.(시스템간 전송하는 데이터)
  // design pattern 중에서 command pattern을 응용함.
  switch (action.type) {
    // action = {type: 'ADD_CONTACT', payload: {id: 1, name: '', number:'', mail:''}}
    case "ADD_CONTACT_SUCCEEDED":
      // action.type에 따라서 state를 변경하여 return
      // 변동된 state를 리턴함.
      // return 변동된state;

      // ... : sparead operator(나열 연산자)
      // array일 때는 element들을 나열
      // object일 때는 prop들을 나열
      // {...object} : object literal(ES2018)
      // 기존 객체에서 새로운 객체를 카피하여 생성함

      // ex)
      // let obj = {name: 'hong', age:'35};
      // let newStudent = {name: student.name, get:student.age};
      // let newStudent2 = Object.assign(student, {});  (예전 방식)
      // 기존 객체를 카피한 후 새로운 객체에 넣어주는 방식

      // let newStudent3 = {...student};
      // 새로운 객체 생성 방식(ES2018)

      return [{ ...action.payload }, ...state];
    case "REMOVE_CONTACT_SUCCEEDED":
      // action = { type:'REMOVE_TODO', payload:1 }
      // 배열에서 요소삭제 -> 배열크기가 변동됨 == 특정 조건에 맞지않는 요소만 리턴됨 == filter
      return state.filter((contact) => contact.id !== action.payload);

    case "MODIFY_CONTACT_SUCCEEDED":
      // 배열에서 요소변경 -> 배열크기는 변동 안 됨 == 특정 조건에 맞는 요소만 내용 변경 == map
      // action = { type:'SAVE_TODO', payload: {id:1, memo:"Redux 공부하기"} }
      return state.map((contact) =>
        contact.id === action.payload.id ? { ...action.payload } : contact
      );

    case "CANCEL_CONTACT":
      return state.map((contact) =>
        contact.id === action.payload.id ? { ...action.payload } : contact
      );

    case "FETCH_CONTACTLIST_SUCCEEDED":
      return [...action.payload];

    // default 케이스는 기존 상태를 반환
    default:
      return state;
  }
};

export default contact;
