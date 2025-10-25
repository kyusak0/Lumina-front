"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import api, { getCSRF } from '../api/_api'

import logoImage from '../assets/images/logo.svg'
import styles from '../components/form.module.css'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(false);
    const [form, setForm] = useState({
        userName: "",
        email: "",
        login: "",
        pass: "",
        rePass: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            await getCSRF();
            await api.post("/api/register", form);
            alert("Регистрация прошла успешно");
            setIsLogin(true);
        } catch (err: any) {
            alert(err.response?.data?.message || "Ошибка регистрации");
        }
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            await getCSRF();
            const res = await api.post("/api/login", {
                login: form.login,
                pass: form.pass,
            });
            localStorage.setItem("token", res.data.token);
            alert("Авторизация успешна");
        } catch (err: any) {
            alert(err.response?.data?.message || "Ошибка входа");
        }
    };
    return (
        <>
            <div>

            </div>
            <div className="flex mt-10">
                <div className="flex mx-auto gap-10">
                    <div className="form form-reg p-4">
                        <h2 className='text-4xl mb-8 text-center'>Регистрация</h2>
                        {isLogin ? (

                            <form onSubmit={handleLogin}>
                                <div className={styles.inputWrappers}>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' 
                                            type="text"
                                            name="login"
                                            onChange={handleChange} />
                                        <label htmlFor="">Email или Username</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="text" name="pass" id="pass" onChange={handleChange} />
                                        <label htmlFor="">pass</label>
                                    </div>
                                </div>
                                <button type="submit">Войти</button>
                                <p onClick={() => setIsLogin(false)}>Нет аккаунта? Зарегистрироваться</p>
                            </form>
                        ) : (
                            <form onSubmit={handleRegister}>
                                <div className={styles.inputWrappers}>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="text" name="username" id="username" onChange={handleChange} />
                                        <label htmlFor="">username</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="email" name="email" id="email" onChange={handleChange} />
                                        <label htmlFor="email">
                                            email
                                        </label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="text" name="pass" id="pass" onChange={handleChange} />
                                        <label htmlFor="">pass</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="text" name="reppass" id="reppass" onChange={handleChange} />
                                        <label htmlFor="reppass">reppass</label>
                                    </div>
                                    <div className="ml-5 flex gap-2">
                                        <input type="checkbox" name="policy" id="policy" onChange={handleChange} />
                                        <label htmlFor="policy">policy</label>
                                    </div>
                                    <div className={styles.btns}>
                                        <button type="submit">Регистрация</button></div>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className={styles.formTitle}>
                        <div className={styles.formTitleTop}>
                            <Image
                                src={logoImage}
                                alt="Lumina's logo"
                                width='200'
                                height='60' />

                            <h2 className='text-3xl mb-8 text-center'>Добро пожаловать</h2>
                        </div>
                        <div className={styles.formTitleBottom}>
                            <button className={styles.btn}>
                                Уже есть аккаунт?
                                <br></br>
                                Войти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
