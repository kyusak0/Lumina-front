"use client"

import {  createContext, useEffect, useState } from "react"

import api, {getCSRF} from "../_api/api"

type User =any;

type AuthContextType ={
    user: User|null;
    loading: boolean;
    authenticated: boolean;
    setUser:(user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}){
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try{
                await getCSRF();
                const res = await api.post("/me");
                setUser(res.data)
            }catch{
                setUser(null)
            }
            finally{
                setLoading(false)
            }

        };

        initAuth();
    }, []);

    const authenticated = Boolean(user)

    return(
        <AuthContext.Provider 
            value={{
                user,
                loading,
                authenticated,
                setUser,
            }}>
                {children}
            </AuthContext.Provider>
    )

}

