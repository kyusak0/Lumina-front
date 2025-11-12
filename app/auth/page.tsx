'use client'

import Image from 'next/image'

import logoImage from '../assets/images/logo.svg'
import styles from './auth.module.css';

import { useState } from 'react';

export default function Auth() {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div className="flex">
            <div className="flex mx-auto gap-10">
                <div className={styles.forms}>
                    <div className="form form-reg p-4">
                        <h2 className='text-4xl mb-8 text-center'>Регистрация</h2>
                        <form action="/profile" method='get'>
                            <div className={styles.inputWrappers}>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="text" name="username" id="username" />
                                    <label htmlFor="">username</label>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="email" name="email" id="email" />
                                    <label htmlFor="email">
                                        email
                                    </label>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="text" name="pass" id="pass" />
                                    <label htmlFor="">pass</label>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="text" name="reppass" id="reppass" />
                                    <label htmlFor="reppass">reppass</label>
                                </div>
                                <div className="ml-5 flex gap-2">
                                    <input type="checkbox" name="policy" id="policy" />
                                    <label htmlFor="policy">policy</label>
                                </div>
                                <div className={styles.btns}>
                                    <button type="submit">Регистрация</button></div>
                            </div>
                        </form>
                    </div>
                    <div className="form form-reg p-4">
                        <h2 className='text-4xl mb-8 text-center'>Войти</h2>
                        <form action="/profile" method='get'>
                            <div className={styles.inputWrappers}>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="text" name="username" id="username" />
                                    <label htmlFor="">username</label>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="email" name="email" id="email" />
                                    <label htmlFor="email">
                                        email
                                    </label>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="text" name="pass" id="pass" />
                                    <label htmlFor="">pass</label>
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
    );
}