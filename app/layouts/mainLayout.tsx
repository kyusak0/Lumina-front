import Header from "../components/Header";
import Api, {getCSRF} from "../_api/api";


export default function MainLayout({ children }: { children: React.ReactNode }) {
  getCSRF()
  return (
    <>
      <Header /> 
      <main>{children}</main>
    </>

  );
}