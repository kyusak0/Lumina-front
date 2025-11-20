import MainLayout from "./layouts/mainLayout"

export default function NotFound() {
  return (
    <MainLayout>
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, мы не можем найти запрашиваемую страницу.</p>
      <a href="/">Вернуться на главную</a>
    </div>
    </MainLayout>
  );
}