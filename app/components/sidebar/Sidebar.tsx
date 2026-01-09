import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';


export default function Sidebar() {
    const currentPath = usePathname();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const openSidebar = () => {
        setSidebarOpen(true);
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return (
        <>
            <div className='fixed w-full top-0 left-0 z-2'>
                <div
                    onMouseMove={closeSidebar}
                    className={`duration-300 absolute h-screen bg-black ${sidebarOpen ? 'w-3/4' : 'w-0'} right-0 opacity-60`}
                ></div>
                <div
                    onMouseMove={openSidebar}
                    className={`duration-300 absolute h-screen bg-white left-0 flex flex-col gap-10 pt-40 ${sidebarOpen ? 'w-1/4 pl-20' : 'w-1/12 pl-10'} `}
                >
                    <div
                        className="absolute top-25 right-5"
                        onClick={sidebarOpen ? closeSidebar : openSidebar}
                    >
                        {sidebarOpen ? '❌' : '>'}
                    </div>
                    <Link href="/" className={`${currentPath == '/' ? 'text-green-400' : ''} hover:text-green-300`}>
                        <div className="flex gap-5 ">
                            <span> 🏠 </span>
                            <span className={`${sidebarOpen ? '' : 'duration-300 opacity-0'}`}>Главная</span>
                        </div>
                    </Link>
                    <Link href="/friends" className={`${currentPath == '/friends' ? 'text-green-400' : ''} hover:text-green-300`}>
                        <div className="flex gap-5 ">
                            <span> 💬 </span>
                            <span className={`${sidebarOpen ? '' : 'duration-300 opacity-0'}`}>Чаты</span>
                        </div>
                    </Link>
                    <Link href="/videos" className={`${currentPath == '/videos' ? 'text-green-400' : ''} hover:text-green-300`}>
                        <div className="flex gap-5 ">
                            <span> 📹 </span>
                            <span className={`${sidebarOpen ? '' : 'duration-300 opacity-0'}`}>Видео-лента</span>
                        </div>
                    </Link>
                    <Link href="/profile" className={`${currentPath == '/profile' ? 'text-green-400' : ''} hover:text-green-300`}>
                        <div className="flex gap-5 ">
                            <span> 👤 </span>
                            <span className={`${sidebarOpen ? '' : 'duration-300 opacity-0'}`}>Профиль</span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}