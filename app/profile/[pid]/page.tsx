'use client';

import { Suspense, useState, useEffect, } from 'react'
import React from 'react';
import Link from "next/link";
import MainLayout from "../../layouts/mainLayout";
import { useRouter } from "next/navigation";

import Api from '../../_api/api';
import { AxiosError } from 'axios';
import Loading from '../../loading';

type PageProps = {
    params: Promise<{pid: string}>
}


interface IUser{
    id: string | null;
    userName: string| null;
    email: string| null;
}


export default function profile({params}: PageProps) {
    const {pid} = React.use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        id: "",
        userName: "",
        email: "",
    });
    console.log(pid)
   
      
    useEffect(() => {
        console.log("useeffect")
        async function fetchData() {
        const res = await Api.post("/user", {
            pid: pid,
        }).then(responce =>{
            console.log("responce")
            user.id= responce.data.id;
            user.email= responce.data.email;
            user.userName= responce.data.userName;
            setLoading(false);
        }).catch(error =>{
            console.log("error")
            if(error.status == 401 ||error.status == 419){
                alert("не авторизован")
                router.push("/login")
            }else{
                alert("Непредвиденная ошибка: " + error)
            }
            setLoading(false);
        }).finally (() => {
            //выполнение в любом случае
        })
        console.log("end")
        }
    
        fetchData();
        }, []);
        if (loading) {
            // Показываем загрузчик, пока isLoading истинно
            return <Loading />;
          }

        return(
            <MainLayout>
                <>
                <p> pid: {pid} </p>
                <p> id: {user.id} </p>
                <p> имя: {user.userName}</p>
                <p> почта: {user.email}</p>
            </>
            </MainLayout>
            
        )

    
    //   if (error) {
    //     return <p>Ошибка: {error.message}</p>;
    //   }
    
    //   return (
    //     <div>
    //       {/* Отображение данных */}
    //       <pre>{JSON.stringify(data, null, 2)}</pre>
    //     </div>
    //   );
    // }
    
    // export default MyComponent;
    
}
    
    


//         function Fallback() {
//             <>
//                 <p> имя: Загрузка... </p>
//                 <p> почта: Загрузка... </p>

//             </>
//         }

//     return (
//         <>

//             <MainLayout>

//                 <Suspense fallback={<Fallback />}>
//                     <ProfileContent />
//                 </Suspense>

//             </MainLayout>
//         </>)
