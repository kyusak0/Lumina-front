// 'use client'

// import { Suspense, useState, useEffect} from 'react'
// import Link from "next/link";
// import MainLayout from "../layouts/mainLayout";
// import { useRouter } from "next/navigation";
// import FormAuth from '../components/formAuth';
// import Api, {setToken} from '../_api/api';
// import { AxiosError } from 'axios';

// import { useRequireAuth } from "../hooks/UseRequireAuth";

// export default function ProfilePage() {
//   const { user, loading } = useRequireAuth();

//   if (loading) return <p>Загрузка...</p>;
//   if (!user) return null; // редиректит хук

//   return (
//     <MainLayout>
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Профиль</h1>
//       <div className="bg-white shadow rounded p-4">
//         <p><strong>Имя:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         {/* Добавьте другие данные */}
//       </div>
//     </div>
//     </MainLayout>
//   );
// }
