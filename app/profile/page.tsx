'use client'

import { Suspense, useState, useEffect} from 'react'
import Link from "next/link";
import MainLayout from "../layouts/mainLayout";
import { useRouter } from "next/navigation";
import FormAuth from '../components/formAuth';
import Api, {setToken} from '../_api/api';
import { AxiosError } from 'axios';


interface IUser{
    id: string | null;
    userName: string| null;
    email: string| null;
}


export default function profile() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        id: "",
        userName: "",
        email: "",
    });
    
    useEffect(() => {
        async function fetchData() {
            console.log((await Api.get("/user")).status)
          try {
            console.log((await Api.get("/user")).status)
            const res = await Api.get("/user")
            console.log(res)
            confirm("gg")
            user.id= res.data.id;
            user.email= res.data.email;
            user.userName= res.data.userName;

          } catch (error: any) {
            if(error.status == 401){
                console.log(error.status)
                confirm("gg")
                alert("не авторизован")
                router.push("/auth")
            }
          } finally {
            setLoading(false);
          }
        }
    
        fetchData();
        }, []);
    

        if (loading) {
            return (
                <MainLayout>
                <>
                    <p> id: Загрузка... </p>
                    <p> имя: Загрузка... </p>
                    <p> почта: Загрузка... </p>
                </>
                </MainLayout>)
        }
        if (error) {
            return <p>Ошибка: {error}</p>;
        }
       
        return(
            <MainLayout>
                <>
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
