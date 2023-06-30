import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Replace with your desired base URL
});

export default axiosInstance;
