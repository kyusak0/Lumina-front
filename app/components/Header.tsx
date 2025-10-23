import Image from 'next/image'

import logoImage from '../assets/images/logo.svg'

export default function Header() {
    return (
        <header className="flex items-center">
            <Image
                src={logoImage}
                alt="Lumina's logo"
                width='200'
                height='60' />

            <div className="">
                <button className='btn'>
                    Войти
                </button>
            </div>
        </header>
    )
}