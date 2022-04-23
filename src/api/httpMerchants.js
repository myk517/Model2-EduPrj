import axios, { AxiosInstance } from "axios";
let token = sessionStorage.getItem("token");
const instanceMerchants = axios.create({
  baseURL: "http://localhost:9999/api/v1/merchants",
  headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
});

export default instanceMerchants;
