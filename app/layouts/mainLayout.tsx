import Header from "../components/Header";
import Api, {getCSRF} from "../_api/api";
import { getCookie, setCookie } from "cookies-next";
import type { AppProps } from "next/app";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header /> 
      <main>{children}</main>
    </>

  );
}
