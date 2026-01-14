'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MainLayout from '../../layouts/mainLayout';
import { useRouter } from 'next/navigation';
import Loading from '../../loading';
import { UseAuth } from '@/app/_providers/useAuth';
import Api, {getCSRF} from '../../_api/api';
import { AxiosError } from 'axios';
import LogoutButton from '@/app/components/ui/logoutButton';



type PageProps = {
    params: Promise<{pid: string}>
}

interface IUser {
    id: string | null;
    userName: string | null;
    email: string | null;
}



export default function Profile({ params }: PageProps) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [profileUser, setProfileUser] = useState<IUser | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    
    const { pid } = React.use(params); // просто деструктурируем slug
    const { user: contextUser, authenticated, loading: authLoading, setUser} = UseAuth();

    useEffect(() => {
        async function fetchProfile() {
            if (!authenticated) {
                alert('Не авторизован');
                router.push('/login');
                return;
            }

            // Если pid совпадает с текущим пользователем, берем данные из контекста
            if (contextUser && contextUser.id === pid) {
                setProfileUser(contextUser);
                setLoading(false);
                return;
            }

            // Иначе делаем запрос на сервер, чтобы получить чужой профиль
            try {
                const res = await Api.post('/user', { pid });
                setProfileUser({
                    id: res.data.id,
                    userName: res.data.userName,
                    email: res.data.email,
                });
            } catch (err) {
                const error = err as AxiosError;
                if (error.response?.status === 401 || error.response?.status === 419) {
                    alert('Не авторизован');
                    router.push('/login');
                } else {
                    alert('Непредвиденная ошибка: ' + error);
                }
            } finally {
                setLoading(false);
            }
        }

        if (!authLoading) {
            fetchProfile();
        }
    }, [authLoading, authenticated, contextUser, pid, router]);

    if (loading || authLoading) return <Loading />;

    if (!profileUser) return <p>Профиль не найден</p>;

    const handleLogoutButton = async ()=>{
        console.log(2)
        setIsLoggingOut(true)
    
       
            try {
                await Api.get("/logout").then((res) => {
                    if(res.data.message =='Logged out'){
                        console.log("null & push")
                        router.push("/");
                        
                    }
                }).finally(); 
                 
            } catch (err) {
                console.error(err);
                alert("Ошибка при выходе");
            } finally{
                await getCSRF();
                console.log("csrf")
                setIsLoggingOut(false)
                
            }
            
    }

    return (
        <MainLayout>
            <>
                <p>pid: {pid}</p>
                <p>id: {profileUser.id}</p>
                <p>имя: {profileUser.userName}</p>
                <p>почта: {profileUser.email}</p>
                <LogoutButton onLoggout={handleLogoutButton}></LogoutButton>
            </>
        </MainLayout>
    );
}