import React, { FC } from 'react'
import Image from 'next/image'

import logoImage from '../assets/images/logo.svg'

const Header: FC = () => {
    return (
        <header className="flex items-center">
            <Image
                src={logoImage}
                alt="Lumina's logo"
                width='200'
                height='60' />

            <div className="">
                <button>
                    Войти
                </button>
            </div>
        </header>
    )
}

export default Header;