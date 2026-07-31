import axios from "axios";

const API = axios.create({
  baseURL: "https://craftnest-ecommerce.onrender.com/api",
});

export default API;