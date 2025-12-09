
import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const api = axios.create({
  baseURL: "http://api.localhost.test:8001/api",

});

export function availabilityOfCSRFToken(){
  if (!getCookie("XSRF-TOKEN")) {
    return false
  } else {
    return true
  }
}

export async function getCSRF() {
  var XSRF
  if(!availabilityOfCSRFToken()){
  
    await api.get("/csrf-cookie").catch(err => {
       XSRF = false
    }).then(() => {
       XSRF = true
    })
    
  }else{
    XSRF = true
  }
  return XSRF
}



export default api;