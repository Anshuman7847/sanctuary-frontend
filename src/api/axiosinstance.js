
import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: "https://sanctuary-backend-3m0s.onrender.com/",
    withCredentials: true,
});