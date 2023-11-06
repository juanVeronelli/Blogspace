import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

import NavAside from "../components/homepage/navAside.jsx"; 
import Aside from "../components/homepage/Aside.jsx"; 
import axios from "axios";
import Cookies from "js-cookie";


const Profile = () => {
    const { username } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('auth');
        if(!token) return navigate('/login')
        setLoading(true); 
        try {
            axios.get(`http://localhost:3000/profile/${username}`, {headers:{'x-access-token': token}})
                .then((response) => {
                    if(!response.data.error){
                        setUser(response.data.user)
                        setLoading(false);
                    } else {
                        Cookies.remove('auth');
                        navigate('/login');
                    }
                })
        }catch(err){
            console.log(err);
        }
    }, [username])

    if(loading) return (<></>)

    return(
        <div className="grid grid-cols-5 h-screen">
            <NavAside/>
            <div className="col-span-3 w-full">
                <div className="col-span-9 mx-auto text-center justify-center w-full">
                    <div className="mt-5 flex h-56 w-full mx-auto">
                        <div className="w-56 h-56 rounded-full mx-auto">
                            <img src={user.thumbnail} alt="User profile picture" className="rounded-full w-56 h-56" />
                        </div>
                    </div>
                    <div className="w-full p-4 mt-5 items-center" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)"}}>
                        <div className="w-3/4 flex mx-auto justify-between">
                        <div className="text-2xl p-4 font-bold"> <h1> Your posts </h1></div>
                        <div className="text-2xl p-4 font-bold"> <h1> Followers </h1></div>
                        <div className="text-2xl p-4 font-bold"> <h1> Following </h1></div>
                        </div>

                    </div>
                </div>
            </div>
            <Aside user={user}/>
        </div>
    )
}

export default Profile;