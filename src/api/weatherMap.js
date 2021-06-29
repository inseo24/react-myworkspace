import axios from "axios";

const weatherMapApi = {
  fetchWeatherMapData: () =>
    axios.get(`${process.env.REACT_APP_API_BASE}/opendata/weather`),
};

export default weatherMapApi;
