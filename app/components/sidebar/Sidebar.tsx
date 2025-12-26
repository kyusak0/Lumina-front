import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';


export default function Sidebar() {
    const currentPath = usePathname();

    const [popUpOpen, setPopUpOpen] = useState(true);
    const closePopUp = () => {
        setPopUpOpen(!popUpOpen);
    }
    return (<>
        <div className={`${popUpOpen ? '' : 'hidden'} sidebar fixed top-20 left-0 p-20 gap-5 flex flex-col`}>
            <button className='absolute top-5 left-5' onClick={closePopUp}>x</button>
            <Link href="/" className={`${currentPath == '/' ? 'active' : ''}`}> Главная </Link>
            <Link href="/friends" className={`${currentPath == '/friends' ? 'active' : ''}`}> Чаты </Link>
            <Link href="/videos" className={`${currentPath == '/videos' ? 'active' : ''}`}> Видео-лента </Link>
            <Link href="/profile" className={`${currentPath == '/profile' ? 'active' : ''}`}> Профиль </Link>
        </div>
        <button className={`${popUpOpen ? 'hidden' : 'absolute top-20'}`} onClick={closePopUp}>Открыть навигацию</button></>
    )
}