// action에 대해서 중간에 가로채기하여 처리하는 saga

import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import api from "../../api/todo";

function* addTodo(action) {
  console.log("--sagas: add Todo --");
  console.log(action);

  // 0. 처리중입니다. 메시지 표시, progress bar, spinner, indicator
  // https://material-ui.com/components/progress/#progress
  // progress reducer가 있어야함
  // yield put({type:"PROGRESS"})
  // progress 컴포넌트에서 변경된 상태에 따라서 팝업을 띄움

  // action.payload.memo = ""; // 강제로 에러 발생시키기
  try {
    // 1. 서버의 REST API를 호출함
    // call: 비동기함수를 호출하는 이펙트
    // yield call(비동기함수, 매개변수1, 매개변수2........)
    // api.add(action.payload).then(result => result);
    const result = yield call(api.add, action.payload);
    console.log(result);
    // const id = new Date().getTime();
    // 2. API호출이 완료되면 state를 변경함
    // put: reducer에 state를 변경하는(dispatch) 이펙트
    yield put({
      type: "ADD_TODO_SUCCEEDED",
      payload: { id: result.data.id, ...action.payload },
    });
  } catch (e) {
    // Error
    // Alert 처리 reducer가 있어야함
    // yield put({type:"ALERT"})
    // alert 상태에 따라서 알림창을 띄우는 컴포넌트가 있어야함
    alert(e.message);
  }

  // 3. 처리중입니다. 메시지 숨기기
  // yield put({type:"PROGRESS_DONE"})
}

function* fetchTodoList(action) {
  console.log("--sagas: fetch Todolist --");
  console.log(action);

  try {
    // 1. 서버에서 데이터 받아오기
    const result = yield call(api.fetch);
    console.log(result);
    // 2. 받아온 데이터로 state 변경
    yield put({ type: "FETCH_TODOLIST_SUCCEEDED", payload: result.data });
  } catch (e) {
    alert(e.message);
  }
}

function* removeTodo(action) {
  console.log("--sagas: remove Todo --");
  console.log(action);

  try {
    // 1. 서버의 REST API를 호출함
    // action.payload == id
    // id: 데이터베이스의 PK, JPA 엔티티의 @Id
    const result = yield call(api.remove, action.payload);
    console.log(result);
    // 2. API호출이 완료되면 state를 변경함
    yield put({
      type: "REMOVE_TODO_SUCCEEDED",
      payload: action.payload,
    });
  } catch (e) {
    alert(e.message);
  }
}

function* modifyTodo(action) {
  console.log("--sagas: modify Todo --");
  console.log(action);

  try {
    // 1. 서버의 REST API를 호출함
    // action.payload == {id, memo}
    const result = yield call(api.modify, action.payload);
    console.log(result);
    // result.data == {id, createdTime, memo}
    // 2. API호출이 완료되면 state를 변경함
    yield put({
      type: "MODIFY_TODO_SUCCEEDED",
      payload: result.data,
    });
  } catch (e) {
    alert(e.message);
  }
}

// todo list와 관련된 액션이 dispatch되면 중간에 처리할 함수 목록을 작성
function* todoSaga() {
  // takeEvery: 모든 dispatch하는 action에 대해서 처리함
  // takeLatest: 가장 나중에 dispatch하는 action에 대해서만 처리함
  yield takeEvery("ADD_TODO", addTodo);
  yield takeEvery("REMOVE_TODO", removeTodo);
  yield takeEvery("MODIFY_TODO", modifyTodo);
  yield takeLatest("FETCH_TODOLIST", fetchTodoList);
}

export default todoSaga;
