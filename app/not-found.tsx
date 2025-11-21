import Link from "next/link";
import MainLayout from "./layouts/mainLayout"

export default function NotFound() {
  return (
    <MainLayout>
    <div className="text-center p-5 ">
      <h1 className="text-4xl">404 - Страница не найдена</h1>
      <p className="text-2xl">Извините, мы не можем найти запрашиваемую страницу.</p>
      <Link href="/" className="underline">Вернуться на главную</Link>
    </div>
    </MainLayout>
  );
}