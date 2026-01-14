"use client";
import Image from 'next/image';
import logoImage from '../assets/images/logo.svg';
import styles from './form.module.css';
import { useRouter } from "next/navigation";
import DotPattern from '../components/ui/dotPattern';


import { useEffect, useRef, useState } from 'react';
import { apiClient, LoginData } from '../utils/api'
import { getCookie } from 'cookies-next/client';
import Link from 'next/link';

export default function formAuth() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dotPatternRef = useRef<HTMLDivElement | null>(null);

    const [mode, setMode] = useState<"login" | "register">("login");

    /* ---------- FIRELIES ---------- */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = (canvas.width = window.innerWidth);
        let H = (canvas.height = window.innerHeight);

        const onResize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", onResize);

        interface Firefly { x: number; y: number; r: number; dx: number; dy: number; glow: number; }
        const fireflies: Firefly[] = Array.from({ length: 200 }).map(() => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: 1.5 + Math.random() * 6,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            glow: Math.random(),
        }));

        let raf = 0;
        const animate = () => {
            ctx.clearRect(0, 0, W, H);
            fireflies.forEach((f) => {
                f.x += f.dx; f.y += f.dy;
                f.glow += (Math.random() - 0.5) * 0.02;
                if (f.x < 0 || f.x > W) f.dx *= -1;
                if (f.y < 0 || f.y > H) f.dy *= -1;
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,180,${0.5 + f.glow})`;
                ctx.fill();
            });
            raf = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(raf);
        };
    }, []);

    const router = useRouter();
    const [loginDisabled, setLoginDisabled] = useState(true);

    const [form, setForm] = useState<LoginData>({
        email: "",
        password: "",
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        const updatedData = { ...form, [name]: value }

        if (updatedData.email.length > 0 && updatedData.password.length > 0) {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }

        setForm(updatedData);


    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setLoading(true);
        try {
            const res = await apiClient.login(form);
            // router.push(`/profile/${res}`);
        } catch (err: any) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className={styles.auth_page} id="auth-page">
            <canvas ref={canvasRef} id="fireflies" className='w-full h-screen' />
            <DotPattern initialRadius={140} activeRadius={220} />
            <div className="flex items-center justify-center w-full h-screen fixed top-0">
                <div className={styles.auth_panel} >
                    <div className='w-3/5'>
                        <h2 className='text-4xl mb-8 text-center'>Войти</h2>
                        <form onSubmit={handleLogin} className='flex flex-col gap-5'>

                            <label htmlFor="email">Введите почту</label>
                            <input
                                placeholder=''
                                type="email"
                                name="email"
                                id="email"
                                className='p-3 border border-gray-300 rounded flex-1 focus:outline-none focus:border-green-500'
                                onChange={handleChange} />
                            <label htmlFor="password">Введите пароль</label>
                            <input
                                placeholder=''
                                className='p-3 border border-gray-300 rounded flex-1 focus:outline-none focus:border-green-500'
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                            />
                            <button type="submit" disabled={loginDisabled} className='w-full px-5 py-2 rounded-lg text-white bg-green-400 disabled:bg-gray-300 hover:bg-green-500'>
                                {loading ? 'Вход...' : 'Войти'}
                            </button>
                            <Link href="/forgot-password" className='hover:text-green-400'>Забыли пароль?</Link>
                        </form>
                    </div>
                    <div className='w-2/5 flex flex-col justify-between py-5 items-center border-l-1 border-gray-200 pl-10'>
                        <Link href='/'>
                            <Image
                                src={logoImage}
                                alt="Lumina's logo"
                                className='logo'
                                title='На главную'
                            />
                        </Link>
                        <Link href="/register" className='text-green-400 text-center'>Нет аккаунта? Зарегестрироваться</Link>
                    </div>
                </div >
            </div >
        </div >

    );
}
