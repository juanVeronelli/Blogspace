import React, {useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/context.jsx";

import NavAside from "../components/homepage/navAside.jsx";  
import axios from "axios";
import Cookies from "js-cookie";


const Profile = () => {
    const { username } = useParams();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [thisUser, setThisUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [newUser, setNewUser] = useState({email: '', password: '', current: '', imageInput: File});
    const [isOwn, setIsOwn] = useState(false);

    const token = Cookies.get('auth');

    const navigate = useNavigate();

    const handleChange = (event) => {
        setNewUser({...newUser,
            [event.target.name]: 
            event.target.name != "imageInput"
            ? event.target.value
            : event.target.files[0],
        });
    }

    const hanldleSubmit = (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append('imageInput', newUser.imageInput);
            formData.append('email', newUser.email);
            formData.append('current', newUser.current);
            formData.append('password', newUser.password);
            axios.patch(`http://localhost:3000/update/${username}`, formData, {headers: { 'x-access-token': token }})
                .then((response)=>{})
                .catch((err)=> console.log(err))
        }catch(err){
            console.log(err)
        }

    }

    const getUserByParam = () => {
        try {
            axios.get(`http://localhost:3000/profile/${username}`, {headers:{'x-access-token': token}})
                .then((response) => {
                    if(!response.data.error){
                        setThisUser(response.data.user)
                        setLoading(false);
                    } else {
                        navigate('/home')
                    }
                }).catch(()=>{ navigate('/home')})
        }catch(err){
            navigate('/home');
        }
    }

    const follow = () => {

    }


    useEffect(() => {
        if(!token) return navigate('/login')
        setLoading(true); 
        getUserByParam();
        if(user.username !== username){
            setIsOwn(false)
        }else if(user.username == username){
            setIsOwn(true)
        } else {
            setIsOwn(false);
        }
    }, [username]);



    if(loading) return (<></>)

    return(
        <div className="grid grid-cols-5 h-screen">
            <NavAside/>
            <div className="col-span-3 w-full">
                {edit ? (
                <div className="col-span-9 mx-auto text-center w-full">
                    <div className="w-full h-20 text-center">
                        <h1 className="mt-5 text-3xl font-bold uppercase">Edit profile</h1>
                    </div>
                    <div className="w-fu">
                        <form className="w-full h-96" onSubmit={hanldleSubmit}>
                            <label className="block text-black text-sm font-bold mb-2">Upload profile picture</label>
                            <label className="cursor-pointer" htmlFor="imageInput">
                                <img src={thisUser.thumbnail} alt="profile picture" className="w-28 h-28 mx-auto mt-1 rounded-full" />
                                <input onChange={handleChange} name="imageInput" type="file" accept="image/*" id="imageInput" style={{display: "none"}}/>
                            </label>
                            <div className="w-full h-auto mt-5">
                                <label htmlFor="email" className="block text-black text-sm font-bold">New email:</label>
                                <div className="">
                                    <input onChange={handleChange} name="email" type="text" id="email" placeholder="Email" value={user.email} className="border w-96 mt-5 p-2"/>
                                </div>
                            </div>
                            <div className="w-full h-auto mt-5">
                                <label htmlFor="email" className="block text-black text-sm font-bold">Current password:</label>
                                <div className="">
                                    <input onChange={handleChange} name="current" type="password" id="current" placeholder="your password" className="border w-96 mt-5 p-2"/>
                                </div>
                            </div>
                            <div className="w-full h-auto mt-5">
                                <label htmlFor="email" className="block text-black text-sm font-bold">New password:</label>
                                <div className="">
                                    <input onChange={handleChange} name="password" type="password" id="password" placeholder="your new password" className="border w-96 mt-5 p-2"/>
                                </div>
                            </div>
                            <button type="submit" className="rounded-full left-80 w-28 h-9 mt-5 text-white font-bold bg-custom-color hover:bg-green-500"> Update </button>
                        </form>
                    </div>
                </div>
                ) : (                    
                <div className="col-span-9 mx-auto text-center justify-center w-full">
                    <div className="mt-5 flex h-56 w-full mx-auto">
                        <div className="w-56 h-56 rounded-full mx-auto">
                            <img src={thisUser.thumbnail} alt="User profile picture" className="rounded-full" style={{ width: "350px"}}/>
                            <h3 className="text-1xl mt-3 font-bold">@{thisUser.username}</h3>
                        </div>
                        {isOwn ? (
                            <button type="button" onClick={()=>{setEdit(!edit)}} className="rounded-full absolute left-80 w-28 h-9 mr-5 text-white font-bold bg-custom-color hover:bg-green-500"> Edit </button>
                        ):(
                            <button type="button" onClick={follow} className="rounded-full absolute left-80 w-28 h-9 mr-5 text-white font-bold bg-custom-color hover:bg-green-500"> Follow </button>
                        )}
                    </div>
                    <div className="w-full p-4 mt-10 items-center" style={{ borderBottom: "1px solid rgba(0,0,0,0.1)"}}>
                        <div className="w-3/4 flex mx-auto justify-between">
                        <div className="text-2xl p-4 font-bold"> <h1> Your posts </h1></div>
                        <div className="text-2xl p-4 font-bold"> <h1> Followers </h1></div>
                        <div className="text-2xl p-4 font-bold"> <h1> Following </h1></div>
                        </div>

                    </div>
                </div>
                )}
            </div>
            <div className="w-full h-full border-l"></div>
        </div>
    )
}

export default Profile;