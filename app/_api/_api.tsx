import axios from "axios";


const api = axios.create({
    baseURL: "http://127.0.0.1:8001/api",
    withCredentials:true,
});

export async function getCSRF() {
    await axios.get("http://127.0.0.1:8001/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  }


export default api;