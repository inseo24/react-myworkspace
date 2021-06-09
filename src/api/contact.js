import axios from "axios";

const contactApi = {
  add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/contacts`, data),

  fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/contacts`),

  fetchPaging: (page, size) =>
    axios.get(
      `${process.env.REACT_APP_API_BASE}/contacts/paging?page=${page}&size=${size}`
    ),

  remove: (id) =>
    axios.delete(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),
  modify: (data) =>
    axios.put(`${process.env.REACT_APP_API_BASE}/contacts/${data.id}`, data),
};

export default contactApi;
