// AJAX library
import axios from "axios";

const todoApi = {
  // todoApi.add(data) -> POST http://....:8080/todos {"memo":"redux-saga 공부하기"}
  // JS object가 JSON 문자열로 자동변환

  // axios.post() -> return Promise
  // .then(res => ....)

  // const result = axios.post(...)
  // result.then(res => {
  //   console.log(res.data); //결과 데이터
  // })

  // const result = todoApi.add(data)
  // ...

  // POST /todos {"memo":"Redux 공부하기"}
  add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/todos`, data),
  // GET /todos
  fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/todos`),
  // GET /todos/paging?page=0&size=10
  fetchPaging: (page, size) =>
    axios.get(
      `${process.env.REACT_APP_API_BASE}/todos/paging?page=${page}&size=${size}`
    ),
  // DELETE /todos/1
  remove: (id) => axios.delete(`${process.env.REACT_APP_API_BASE}/todos/${id}`),
  modify: (data) =>
    axios.put(`${process.env.REACT_APP_API_BASE}/todos/${data.id}`, data),
};

export default todoApi;
