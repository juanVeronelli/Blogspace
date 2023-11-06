import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = Cookies.get("auth");

            if (!token) {
                navigate('/login');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/auth', { headers: { 'x-access-token': token } });

                if (response.data.state) {
                    setUser(response.data.user);
                    setLoading(false);
                } else {
                    Cookies.remove("auth");
                    setLoading(false);
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
                navigate('/login');
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <AuthContext.Provider value={{user, loading}}>
            { children }
        </AuthContext.Provider>
    );
}
