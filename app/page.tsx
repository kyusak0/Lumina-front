import MainLayout from "./layouts/mainLayout";
import FormAuth from "./components/formAuth";

import Link from "next/link";
export default function Home() {
  return (
    
      <MainLayout>
        <h1>
          Hello world!
        </h1>
        <FormAuth />
        <Link href="/profile">
            123
        </Link>
      </MainLayout>
  );
}
