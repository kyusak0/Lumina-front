'use client'

import Image from 'next/image'

import logoImage from '../assets/images/logo.svg'
import styles from './auth.module.css';
import FormAuth from '../components/formAuth';
import { useState } from 'react';
import MainLayout from '../layouts/mainLayout';
import { useRouter } from "next/navigation";

export default function Auth() {

    const router = useRouter();
    const [form, setForm] = useState({
        userName: "",
        email: "",
        login: "",
        password: "",
        rePassword: "",
        policy:Boolean,
    });
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            await getCSRF();
            await api.post("/register", form);
            const res = await api.post("/login", {
                login: form.email || form.userName,
                password: form.password,
              });
              router.push("/profile");
            
        } catch (err: any) {
            alert(err.response?.data?.message || "Ошибка входа");
        }
        
        
        
    };
    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            await getCSRF();
            const res = await api.post("/login", {
                login: form.login,
                password: form.password,
            });
            
            router.push("/profile");   
        } catch (err: any) {
            console.log(err)
            alert(err.response?.data?.message || "Ошибка входа");
        }
    };

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <FormAuth />
    )
}