"use client";
import Image from 'next/image';
import logoImage from '../assets/images/logo.svg';
import styles from './form.module.css';
import { useRouter } from "next/navigation";
import DotPattern from '../components/ui/dotPattern';
import Loading from '../loading';

import { useEffect, useRef, useState } from 'react';
import Api, { getCSRF } from '../_api/api'
import { getCookie } from 'cookies-next/client';
const user = await Api.post("/user").catch(error => {
    console.log("sss")
})

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

    const [form, setForm] = useState({
        userName: "",
        email: "",
        login: "",
        password: "",
        rePassword: "",
        policy: Boolean,
    });
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            await Api.post("/register", form);
            const res = await Api.post("/login", {
                login: form.email || form.userName,
                password: form.password,
            });

            router.push("/profile");

        } catch (err: any) {
            alert(err.response?.data?.message || "Ошибка входа");
        }

    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const res = await Api.post("/login", {
                login: form.login,
                password: form.password,
            });
    
            // Успешный логин (обычно 200 / 204)
            router.push('/profile');
    
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Ошибка входа";
    
            alert(message);
    
        } finally {
            setLoading(false);
        }
    };

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }
    


    return (

        <div className={styles.auth_page} id="auth-page">
            <canvas ref={canvasRef} id="fireflies" />
            <DotPattern initialRadius={140} activeRadius={220} />


            <div className={styles.auth_container}>
    <div className={styles.auth_panel}>

        {/* Левая часть — форма */}
        <div className={styles.auth_left}>
            <h2 className="text-4xl mb-8 text-center">Регистрация</h2>

            <form onSubmit={handleRegister}>
                <div className={styles.input_wrappers}>

                    <div className={styles.input_wrapper}>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            onChange={handleChange}
                        />
                        <label htmlFor="userName">
                            Введите никнейм
                        </label>
                    </div>

                    <div className={styles.input_wrapper}>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                        />
                        <label htmlFor="email">
                            Введите почту
                        </label>
                    </div>

                    <div className={styles.input_wrapper}>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            onChange={handleChange}
                        />
                        <label htmlFor="login">
                            Введите login
                        </label>
                    </div>

                    <div className={styles.input_wrapper}>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                        />
                        <label htmlFor="password">
                            Введите пароль
                        </label>
                    </div>

                    <div className={styles.input_wrapper}>
                        <input
                            type="password"
                            name="rePassword"
                            id="rePassword"
                            onChange={handleChange}
                        />
                        <label htmlFor="rePassword">
                            Подтверждение пароля
                        </label>
                    </div>

                    <div className="ml-2 flex gap-2 items-center">
                        <input
                            type="checkbox"
                            name="policy"
                            id="policy"
                            onChange={handleChange}
                        />
                        <label htmlFor="policy">
                            Согласен с политикой
                        </label>
                    </div>

                    <div className={styles.btns}>
                        <button type="submit">
                            Зарегистрироваться
                        </button>
                    </div>

                </div>
            </form>
        </div>

        {/* Правая часть — как в авторизации */}
        <div className={styles.auth_right}>
            <div className={styles.logo_container}>
                <h2 className="text-3xl mb-4 text-center">
                    Добро пожаловать
                </h2>

                <p>
                    Уже есть аккаунт?{' '}
                    <a href="/login">Войти</a>
                </p>
            </div>
        </div>

    </div>
</div>
                </div>
            

    );
}
