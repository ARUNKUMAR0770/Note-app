import axios from "axios";

const API = axios.create({
    baseURL: "https://note-app-frontend-smnd.onrender.com/api",
    withCredentials: true,
})

export default API;
