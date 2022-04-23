import axios, { AxiosInstance } from "axios";
let token = sessionStorage.getItem("token");
const instance = axios.create({
  baseURL: "http://localhost:9999/api/v1/user",
  headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
});

export default instance;
