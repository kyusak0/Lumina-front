// 'use client';

// import { Suspense } from 'react'
// import Link from "next/link";
// import MainLayout from "../layouts/mainLayout";
// import { useSearchParams } from "next/navigation";
// function ProfileContent() {
//     const searchParams = useSearchParams();

//     const name = searchParams.get('username');
//     const email = searchParams.get('email');
//     const pass = searchParams.get('pass');
//     return (
//         <>
//             <p> имя: {name || 'нет данных'} </p>
//             <p> почта: {email || 'нет данных'} </p>
//             <p> пароль: {pass || 'нет данных'} </p>
//         </>)
// }
// function Fallback() {
//     return (
//         <>
//             <p> имя: Загрузка... </p>
//             <p> почта: Загрузка... </p>
//             <p> пароль: Загрузка... </p>
//         </>)
// }
// export default function profile() {


//     return (
//         <>

//             <MainLayout>
//                 <Link href="/">
//                     home
//                 </Link>
//                 <h1 className="text-4xl">
//                     this a Profile's Page
//                 </h1>
//                 <Suspense fallback={<Fallback />}>
//                     <ProfileContent />
//                 </Suspense>
//             </MainLayout>
//         </>)
// }

"use client";
import { useAuth } from "../_context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth"); // если не авторизован — на страницу входа
    }
  }, [loading, user, router]);

  if (loading) return <div>Загрузка...</div>;
  if (!user) return null;

  return (
    <div>
      <h1>Профиль</h1>
      <p>Имя: {user.userName}</p>
      <p>Email: {user.email}</p>
      <Link href={"chat"}>АВываыва</Link>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}
