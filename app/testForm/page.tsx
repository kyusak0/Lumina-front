"use client"
import Image from 'next/image'
import { useEffect,useState } from 'react';
import api from '../api/api'

import logoImage from '../assets/images/logo.svg'
import styles from '../components/form.module.css'

export default function testFormAuth() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [policy, setPolicy] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/catalog")
            .then(res => setProducts(res.data.data))
            .catch(err => console.error("Ошибка:", err));
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await api.post("/form", { name, email, pass, rePass, policy });
            console.log('Успех:', response.data);
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    };

    return (
        <>
            <div className="flex mt-10">
                <div className="flex mx-auto gap-10">
                    <div className="form form-reg p-4">
                        <h2 className='text-4xl mb-8 text-center'>Регистрация</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputWrappers}>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="text" name="username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                    <label htmlFor="">username</label>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="email">
                                        email
                                    </label>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="text" name="pass" id="pass" value={pass} onChange={(e) => setPass(e.target.value)} />
                                    <label htmlFor="">pass</label>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input placeholder='' type="text" name="reppass" id="reppass" value={rePass} onChange={(e) => setRePass(e.target.value)} />
                                    <label htmlFor="reppass">reppass</label>
                                </div>
                                <div className="ml-5 flex gap-2">
                                    <input type="checkbox" name="policy" id="policy" value={policy} onChange={(e) => setPolicy(e.target.value)} />
                                    <label htmlFor="policy">policy</label>
                                </div>
                                <div className={styles.btns}>
                                    <button type="submit">Регистрация</button></div>
                            </div>
                        </form>
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
            <div className="p-10">
                <h1>Мои заказы</h1>
                {products.length === 0 ? (
                    <p>Загрузка или товаров нет</p>
                ) : (
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}