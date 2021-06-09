/* contactList 상태를 관리하는 reducer */

/* reducer는 state와 action이라는 매개변수를 받는 함수 */
/* state: 이전 상태 == 이전 state 값/객체  */
/* action: component -> dispatcher로부터 전달 받은 action 객체 */

/* reducer는 이전 state와 action 객체를 받아서(이용해서) state를 변경 */

const initialState = {
  content: [],
  page: 0,
  size: 10,
  totalElements: 0,
};

// 초기상태가 없으면 initialState를 적용

const contact = (state = initialState, action) => {
  switch (action.type) {
    case "MODIFY_CONTACT_SUCCEEDED": {
      const newState = { ...state };
      newState.content = state.content.map((contact) =>
        contact.id === action.payload.id ? { ...action.payload } : contact
      );

      return newState;
    }

    case "FETCH_CONTACTLIST_PAGING_SUCCEEDED":
      return {
        content: action.payload.content,
        page: action.payload.number,
        size: action.payload.size,
        totalElements: action.payload.totalElements,
      };

    // default 케이스는 기존 상태를 반환
    default:
      return state;
  }
};

export default contact;
