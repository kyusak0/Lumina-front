'use client'
import Header from "../components/header/Header";
import Sidebar from '../components/sidebar/Sidebar';



export default function MainLayout({ children }: { children: React.ReactNode }) {



  return (
    <>
      <Header />
      <Sidebar />
      <main className="mt-20 flex pl-35">
        <div className="w-full">
          {children}
        </div>
      </main>
    </>
  );
}