'use client'

import Image from 'next/image'

import logoImage from '../assets/images/logo.svg'
import styles from './auth.module.css';
import FormAuth from '../components/formAuth';
import { useState } from 'react';

export default function Auth() {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <FormAuth />
    )
}