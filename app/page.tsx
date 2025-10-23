import MainLayout from "./layouts/mainLayout";
import FormAuth from "./components/formAuth";

export default function Home() {
  return (
      <MainLayout>
        <h1>
          Hello world!
        </h1>
        <FormAuth />
      </MainLayout>
  );
}
