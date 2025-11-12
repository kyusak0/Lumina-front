import Image from 'next/image';

import logoImage from '../assets/images/logo.svg';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full h-20 p 20">
            <Image
                src={logoImage}
                alt="Lumina's logo"
                width='200'
                height='60' />

            <nav className="flex text-white gap-10">
                <Link
                    href="/friends">Chats
                </Link>
                <Link
                    href="/auth">Log In
                </Link>
            </nav>
        </header>
    )
}