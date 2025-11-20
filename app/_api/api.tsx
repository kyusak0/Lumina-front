import axios from "axios";


interface Data {
    userName: string,
    email: string,
    login?: string,
    password: string,
    rePassword: String,
    policy:Boolean,
}

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