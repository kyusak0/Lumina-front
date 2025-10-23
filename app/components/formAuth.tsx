import Image from 'next/image'

import logoImage from '../assets/images/logo.svg'
import styles from './form.module.css'

export default function formAuth() {


    
    return (
        <>
            <div className="flex">
                <div className="flex mx-auto gap-10">
                    <div className="form form-reg p-4">
                        <h2 className='text-4xl mb-8 text-center'>Регистрация</h2>
                        <form action="">
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