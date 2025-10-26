'use client';

import Link from "next/link";
import MainLayout from "../layouts/mainLayout";
import { useSearchParams } from "next/navigation";

export default function profile() {

    const searchParams = useSearchParams();

    const name = searchParams.get('username');
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
    return (
        <>
            <MainLayout>
                <Link href="/">
                    home
                </Link>
                <h1 className="text-4xl">
                    this a Profile's Page
                </h1>
                <p>
                    имя: {name}
                </p>
                <p>
                    почта: {name} @mail.com
                </p>
                <p>
                    пароль: {name}
                </p>
            </MainLayout>
        </>)
}