"use client"
import { useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

import axios from "axios";

const Api = axios.create({
    baseURL: "http://127.0.0.1:8001/api",
    withCredentials:true,
    headers:{
      'Authorization': `Bearer ${getCookie("TOKEN")}`
    }
});

export async function  setToken (tokenParam:any) {
setCookie("TOKEN", tokenParam)
}
export async function getCSRF() {
    await Api.get("/csrf-cookie")
  }
  
export default Api;