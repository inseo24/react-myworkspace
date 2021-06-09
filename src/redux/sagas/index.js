// root saga
// 다른 saga들을 합쳐주는 역할

import { fork } from "@redux-saga/core/effects";
import todoSaga from "./todo-paging";
import contactSaga from "./contact-paging";

export default function* rootSaga() {
  yield fork(todoSaga);
  yield fork(contactSaga);
}
