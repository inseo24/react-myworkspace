// AJAX library
import axios from "axios";

const openDataApi = {
  fetchDustHourly: () =>
    axios.get(`${process.env.REACT_APP_API_BASE}/opendata/dust/hourly`),
};

export default openDataApi;
