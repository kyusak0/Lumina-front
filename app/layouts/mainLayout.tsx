"use client"
import Header from "../components/Header";
import Api, { availabilityOfCSRFToken, getCSRF } from "../_api/api";

var XSRF = await getCSRF();
function backendIsAvailable(){
  if(!XSRF){
    console.log("server is dead : " )
    {/* сервер умер*/}
  }else{
    console.log("server is alive : " )
  }
  
}




export default function MainLayout({ children }: { children: React.ReactNode }) {

  backendIsAvailable()
  return (
    <>
      <Header /> 
      <main>{children}</main>
    </>

  );
}