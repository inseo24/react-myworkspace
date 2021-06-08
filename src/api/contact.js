import axios from "axios";

const contactApi = {
  add: (data) => axios.post(`${process.env.REACT_APP_API_BASE}/contacts`, data),

  fetch: () => axios.get(`${process.env.REACT_APP_API_BASE}/contacts`),

  remove: (id) =>
    axios.delete(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),
  modify: (data) =>
    axios.put(`${process.env.REACT_APP_API_BASE}/contacts/${data.id}`, data),
};

export default contactApi;
