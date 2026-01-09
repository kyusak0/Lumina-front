"use client";
import Image from 'next/image'
// import logoImage from '../assets/images/#chatName'
import styles from './form.module.css';
import { useRouter } from "next/navigation";
import DotPattern from '../ui/dotPattern';


import { useEffect, useRef, useState } from 'react';
import Api, { getCSRF } from '../../_api/api'
import { getCookie } from 'cookies-next/client';
const user = await Api.get("/user").catch(error => {
    console.log("sss")
})

export default function formAuth() {

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
    const fireflies: Firefly[] = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.5 + Math.random() * 4,
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
    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {

            const res = await Api.post("/login", {
                login: form.login,
                password: form.password,

            });
            const user = await Api.get("/user");
            console.log(user)

        } catch (err: any) {
            alert(err.response?.data?.message || "Ошибка входа");
        }
    };

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }


    return (
        
            <div id="auth-page">
                <canvas ref={canvasRef} id="fireflies" />
                <DotPattern initialRadius={140} activeRadius={220} />


                <div className="flex">
                    <div className="flex mx-auto gap-10">
                        <div className={styles.forms}>
                            <div className="form form-reg p-4">
                                <h2 className='text-4xl mb-8 text-center'>Регистрация</h2>
                                <form onSubmit={handleRegister}>
                                    <div className={styles.inputWrappers}>
                                        <div className={styles.inputWrapper}>
                                            <input placeholder='' type="text" name="userName" id="userName" onChange={handleChange} />
                                            <label htmlFor="">Введите никнейм</label>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <input placeholder='' type="email" name="email" id="email" onChange={handleChange} />
                                            <label htmlFor="email">
                                                Введите почту
                                            </label>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <input placeholder='' type="login" name="login" id="login" onChange={handleChange} />
                                            <label htmlFor="login">
                                                Введите login
                                            </label>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <input placeholder='' type="text" name="password" id="password" onChange={handleChange} />
                                            <label htmlFor="">Введите пароль</label>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <input placeholder='' type="text" name="rePassword" id="rePassword" onChange={handleChange} />
                                            <label htmlFor="rePassword">Подтверждение пароля</label>
                                        </div>
                                        <div className="ml-5 flex gap-2">
                                            <input type="checkbox" name="policy" id="policy" onChange={handleChange} />
                                            <label htmlFor="policy">policy</label>
                                        </div>
                                        <div className={styles.btns}>
                                            <button type="submit">Регистрация</button></div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                        <div className={open ? styles.formBackRight : styles.formBackLeft}>
                            <div className={styles.formTitle} >
                                <div className={styles.formTitleTop}>
                                    {/* <Image
                                    src={logoImage}
                                    alt="Lumina's logo"
                                    width='200'
                                    height='60' /> */}

                                    <h2 className='text-3xl mb-8 text-center'>Добро пожаловать</h2>
                                </div>
                                <div className={styles.formTitleBottom}>
                                    <button
                                        className={styles.btn}
                                        onClick={handleClick}
                                    >
                                        Уже есть аккаунт?
                                        <br></br>
                                        Войти
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </div>
        
    );
}

