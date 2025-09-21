import axios from "axios";

// 1️⃣ Create axios instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});


export default apiClient;
