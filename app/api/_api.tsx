import axios from "axios";


const api = axios.create({
    baseURL: "http://127.0.0.1:8001.api",
});

export const getCSRF = async () => {
    await api.get("/csrf-token")
};
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization =`Bearer ${ token }`;
    }
    return config;
}, error => {
    console.log(error)
    return Promise.reject(error);
    
});

export default api;