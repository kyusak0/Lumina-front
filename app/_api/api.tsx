"use client"
import { useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const Api = axios.create({
    baseURL: "http://api.localhost.test/api",

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