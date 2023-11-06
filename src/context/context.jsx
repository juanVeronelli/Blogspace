import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true)
        const token = Cookies.get("auth");
        if(!token) return navigate('/login');
        try{
            axios.get('http://localhost:3000/auth', {headers:{'x-access-token': token}})
                .then((response) => {
                    if(response.data.state){
                        setUser(response.data.user);
                    } else {
                        Cookies.remove("auth");
                        navigate('/login');
                    }
                }).catch((err)=>{ console.log(err)}).finally(()=>{ setLoading(false)});
        } catch(err) {
            console.log(err);
            navigate('/login');
        }
    },[]);

    return (
        <AuthContext.Provider value={{user, loading}}>
            { children }
        </AuthContext.Provider>
    );
}
