'use client'
import Header from "../components/header/Header";
import Sidebar from '../components/sidebar/Sidebar';
import api, { availabilityOfCSRFToken, getCSRF } from "../_api/api";
var XSRF = await getCSRF();
function backendIsAvailable() {
  if (!XSRF) {
    console.log("server is dead : ")
    {/* сервер умер*/ }
  } else {
    console.log("server is alive : ")
  }
}

export default function MainLayout({ children }: { children: React.ReactNode }) {

  backendIsAvailable();

  return (
    <>
      <Header />
      <main className="flex justify-evenly">
        <Sidebar />
        <div className="sidebar-border w-1/4">

        </div>
        <div className="flex w-full flex-col items-center">
          {children}
        </div>

      </main>
    </>
  );
}