// 리듀서들을 결합하는 rootReducer를 생성
import { combineReducers } from "redux";
import todo from "./todo"; // 하위 리듀서를 import

const rootReducer = combineReducers({
  // todo: store에 state이름
  // todo state를 처리하는 리듀서가 todo 함수
  todo,
});

export default rootReducer;
