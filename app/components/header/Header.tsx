import Image from 'next/image';

import logoImage from '../../assets/images/logo.svg';
import Link from 'next/link';

export default function Header() {
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

            <Link href='profile' className="px-5 py-2 rounded-lg text-white bg-green-400 hover:bg-green-500">Профиль</Link>
        </header>
    )
}