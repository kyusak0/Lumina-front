import { useContext } from 'react';
import { AuthContext } from '../_providers/authProvider';

export function UseAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx){
        throw new Error("useAuth вне AuthProvider")
    }
    return ctx;
}
