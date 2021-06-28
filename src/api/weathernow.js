import axios from "axios";

const weatherNowApi = {
  fetchWeatherNow: () =>
    axios.get(`${process.env.REACT_APP_API_BASE}/opendata/weather/now`),
};

export default weatherNowApi;
