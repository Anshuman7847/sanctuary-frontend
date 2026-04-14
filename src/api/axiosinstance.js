
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://sanctuary-backend-3m0s.onrender.com/",
   //  baseURL: "http://localhost:9080/",
    withCredentials: true,
});