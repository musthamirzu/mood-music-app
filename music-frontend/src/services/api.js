import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5005/api"
  //  baseURL: import.meta.env.VITE_API_URL

});

export default API;
