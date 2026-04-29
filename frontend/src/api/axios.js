import axios from "axios";

const API = axios.create({
    baseURL: "https://note-app-backend-rk9i.onrender.com/api",
    // baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

export default API;
