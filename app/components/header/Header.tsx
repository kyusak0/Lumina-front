import Image from 'next/image';
import { useEffect, useState } from 'react';
import logoImage from '../../assets/images/logo.svg';
import api from '@/app/_api/api';
import Link from 'next/link';

export default function Header() {
    const [Auth, setAuth] = useState(false);
    const [id, setId] = useState(0);
    const [name, setName] = useState(null);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        async function fetchPid() {
            if(!checked){
                const res = await api.post("/me")
                .then(responce => {

                    setAuth(true)
                    setId(responce.data.id)
                    setName(responce.data.userName)
                })
                .catch(err =>{
                    if(err?.responce?.status == 401 || err?.responce?.status == 419) {
                    }
                })
                .finally()
                }
            }
        fetchPid()
    })
        

    console.log(Auth)
    
    return (
        <header className="fixed flex items-center justify-between w-full py-2 px-60 top-0 left-0 z-2">
            <Link href="/">
                <Image
                    src={logoImage}
                    alt="Lumina's logo"
                    className='logo'
                    title='На главную' />
            </Link>

            <div className="search-bar">
                <form action="" method="post" className="search-form form">
                    <input type="text" name="" id="" />
                </form>
            </div>
            

            <Link href={`/profile/${id}`} className="px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500">{Auth ? "тут будет фото, id:" + id + " Имя:" + name : "Войти"}</Link>
        </header>
    )
}