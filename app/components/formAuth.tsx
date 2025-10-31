"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../_context/AuthContext"; // путь подстрой под себя
import logoImage from "../assets/images/logo.svg";
import styles from "./form.module.css";

export default function FormAuth() {
    const router = useRouter();
    const { login, register } = useAuth();

    const [form, setForm] = useState({
        userName: "",
        email: "",
        login: "",
        password: "",
        rePassword: "",
        policy: false,
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        if (form.password !== form.rePassword) {
            alert("Пароли не совпадают");
            return;
        }

        try {
            await register(form);
            router.push("/profile");
        } catch (err: any) {
            alert(err.response?.data?.message || "Ошибка регистрации");
        }
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            await login(form.login, form.password);
            router.push("/profile");
        } catch (err: any) {
            alert(err.response?.data?.message);
        }
    };

    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(!open);

    return (
        <>
            <div className="flex">
                <div className="flex mx-auto gap-10">
                    <div className={styles.forms}>
                        <div className="form form-reg p-4">
                            <h2 className="text-4xl mb-8 text-center">Регистрация</h2>
                            <form onSubmit={handleRegister}>
                                <div className={styles.inputWrappers}>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="text"
                                            name="userName"
                                            onChange={handleChange}
                                        />
                                        <label>Введите никнейм</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                        />
                                        <label>Введите почту</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                        />
                                        <label>Введите пароль</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="password"
                                            name="rePassword"
                                            onChange={handleChange}
                                        />
                                        <label>Подтверждение пароля</label>
                                    </div>
                                    <div className="ml-5 flex gap-2">
                                        <input
                                            type="checkbox"
                                            name="policy"
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="policy">policy</label>
                                    </div>
                                    <div className={styles.btns}>
                                        <button type="submit">Регистрация</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="form form-reg p-4">
                            <h2 className="text-4xl mb-8 text-center">Войти</h2>
                            <form onSubmit={handleLogin}>
                                <div className={styles.inputWrappers}>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="text"
                                            name="login"
                                            onChange={handleChange}
                                        />
                                        <label>Введите почту или никнейм</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                        />
                                        <label>Введите пароль</label>
                                    </div>
                                    <div className={styles.btns}>
                                        <button type="submit">Войти</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div
                        className={open ? styles.formBackRight : styles.formBackLeft}
                    >
                        <div className={styles.formTitle}>
                            <div className={styles.formTitleTop}>
                                <Image
                                    src={logoImage}
                                    alt="Lumina's logo"
                                    width={200}
                                    height={60}
                                />
                                <h2 className="text-3xl mb-8 text-center">
                                    Добро пожаловать
                                </h2>
                            </div>
                            <div className={styles.formTitleBottom}>
                                <button className={styles.btn} onClick={handleClick}>
                                    Уже есть аккаунт?
                                    <br />
                                    Войти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

