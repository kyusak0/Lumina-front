'use client';

import { Suspense } from 'react'
import Link from "next/link";
import MainLayout from "../layouts/mainLayout";
import { useSearchParams } from "next/navigation";


function ProfileContent() {
    const searchParams = useSearchParams();

    const name = searchParams.get('username');
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
    return (
        <>
            <p> имя: {name || 'нет данных'} </p>
            <p> почта: {email || 'нет данных'} </p>
            <p> пароль: {pass || 'нет данных'} </p>
        </>)
}

function Fallback() {
    return (
        <>
            <p> имя: Загрузка... </p>
            <p> почта: Загрузка... </p>
            <p> пароль: Загрузка... </p>
        </>)
}
export default function profile() {


    return (
        <>

            <MainLayout>
                <Link href="/">
                    home
                </Link>
                <h1 className="text-4xl">
                    this a Profile's Page
                </h1>
                <Suspense fallback={<Fallback />}>
                    <ProfileContent />
                </Suspense>
            </MainLayout>
        </>)
}