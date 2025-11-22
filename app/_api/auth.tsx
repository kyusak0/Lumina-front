import { useState, useEffect } from 'react';
import Api, { getCSRF} from '../_api/api'

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        
        checkAuth();
    }, []);
    
    
    const checkAuth = async () => {
        try{
            

        } catch(err: any){

        }
        // try {
        //     const response = await fetch('http://localhost:8000/api/user', {
        //         method: 'GET',
        //         credentials: 'include', // отправляем cookies
        //     });

        //     if (response.ok) {
        //         const userData = await response.json();
        //         setUser(userData);
        //     } else {
        //         setUser(null);
        //     }
        // } catch (error) {
        //     console.error('Auth check failed:', error);
        //     setUser(null);
        // } finally {
        //     setLoading(false);
        // }
    };

    const logout = async () => {
        // try {
        //     await fetch('http://localhost:8000/api/logout', {
        //         method: 'POST',
        //         credentials: 'include',
        //     });
        // } catch (error) {
        //     console.error('Logout error:', error);
        // } finally {
        //     setUser(null);
        // }
    };

//     return { user, loading, login, logout, checkAuth };
};
