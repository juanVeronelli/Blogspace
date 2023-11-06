import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';


const useAuthRedirect = () => {
  const navigate = useNavigate();
  const token = Cookies.get("auth");

  useEffect(() => {
    if (token) {
        try{
            axios.get("http://localhost:3000/auth", { headers: {'x-access-token': token} })
                .then(() => { navigate('/home') })
                .catch((err)=>{ throw err });
        } catch(err){
            console.log(err);
            navigate('/login');
        }
    }
  }, [token]);
};

export default useAuthRedirect;
