"use client";
import Image from 'next/image'
import logoImage from '../assets/images/logo.svg'
import styles from './form.module.css';
import { useRouter } from "next/navigation";
import { useCookies } from 'next-client-cookies';

import { useEffect, useState } from 'react';
import Api, { getCSRF, setToken } from '../_api/api'


export default function formAuth() {
    const router = useRouter();

    const [form, setForm] = useState({
        userName: "",
        email: "",
        login: "",
        password: "",
        password_confirmation: "",
        policy: Boolean,
    });
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            await Api.post("/register", form);
            const res = await Api.post("/register", {
                userName: form.userName,
                email: form.email,
                login: form.login ,
                password: form.password,
                password_confirmation: form.password_confirmation
            });

            console.log(res.data.loginCheck)
            setToken(res.data.TOKEN)
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
            setToken(res.data.TOKEN)

            console.log('авторизация прошла' + res.data.message);
            router.push("/profile");

        } catch (err: any) {
            alert(err.response?.data?.message || "Ошибка входа");
        }
    };

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }


    return (
        <>
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
                                        <input placeholder='' type="text" name="login" id="login" onChange={handleChange} />
                                        <label htmlFor="login">
                                            Введите логин
                                        </label>
                                    </div>

                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="text" name="password" id="password" onChange={handleChange} />
                                        <label htmlFor="">Введите пароль</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="text" name="password_confirmation" id="password_confirmation" onChange={handleChange} />
                                        <label htmlFor="password_confirmation">Подтверждение пароля</label>
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
                        <div className="form form-reg p-4">
                            <h2 className='text-4xl mb-8 text-center'>Войти</h2>
                            <form onSubmit={handleLogin}>
                                <div className={styles.inputWrappers}>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="text" name="login" id="login" onChange={handleChange} />
                                        <label htmlFor="">Введите почту или никнейм</label>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <input placeholder='' type="text" name="password" id="password" onChange={handleChange} />
                                        <label htmlFor="">Введите пароль</label>
                                    </div>
                                    <div className={styles.btns}>
                                        <button type="submit">Войти</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={open ? styles.formBackRight : styles.formBackLeft}>
                        <div className={styles.formTitle} >
                            <div className={styles.formTitleTop}>
                                <Image
                                    src={logoImage}
                                    alt="Lumina's logo"
                                    width='200'
                                    height='60' />

                                <h2 className='text-3xl mb-8 text-center'>Добро пожаловать</h2>
                            </div>
                            <div className={styles.formTitleBottom}>
                                {open
                                    ? <button
                                        className={styles.btn}
                                        onClick={handleClick}
                                    >
                                        Уже есть аккаунт?
                                        <br></br>
                                        Войти
                                    </button>
                                    : <button
                                        className={styles.btn}
                                        onClick={handleClick}
                                    >
                                        Ещё нет аккаунта?
                                        <br></br>
                                        Создать
                                    </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}