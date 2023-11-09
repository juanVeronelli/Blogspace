import React, {useState, useEffect, useContext} from "react";
import {  useParams } from "react-router-dom";

import NavAside from "../components/homepage/navAside.jsx";  
import axios from "axios";
import Cookies from "js-cookie";

import Loader from "../components/loader/Loader.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faCalendarDay } from '@fortawesome/free-solid-svg-icons'


const Profile = () => {
    const { username } = useParams();
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({});
    const [userProfile, setUserProfile] = useState({});
    const [error, setError] = useState({ error: false, message: ''});
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({email: '', password: '', current: '', imageInput: File});
    const [isOwn, setIsOwn] = useState(false);

    const token = Cookies.get('auth');

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

    const getUserByUsername = async () => {
        try{
            axios.get(`http://localhost:3000/profile/${username}`, {headers: { 'x-access-token': token } })
                .then((response)=> setUserProfile(response.data.user))
                .catch((error) =>{
                    if(error.response.status === 401) {
                        navigate("/login");
                        Cookies.remove('auth');
                    } else {
                        setLoading(false);
                    }
                })
                .finally(()=> {setLoading(false)})
        }catch(err){
            console.log(err)
        }
    }

    const getUser = () => {
        try{
            axios.get('http://localhost:3000/users', { headers: {'x-access-token': token} } )
                .then((response) => setUser( response.data.user) )
                .catch((error) => {
                    if(error.response.status === 401) {
                        navigate("/login");
                        Cookies.remove('auth');
                    } else {
                        setLoading(false);
                    }
                })
                .finally(()=> {
                        setIsOwn(user.username === username ? true : false);
                        getUserByUsername();
                })
        } catch(err){
            console.log("Aca")
            setLoading(false);
            console.log(err);
        }
    };


    useEffect(() => {
        try{
            getUser();
        } catch(err){
            console.log(err)
        }
      },[username])

    if(loading) return (<><Loader/></>)

    return(
        <div className="grid grid-cols-5 h-screen">
            <NavAside user={user} loading={loading}/>
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
                                <img src={userProfile.thumbnail} alt="profile picture" className="w-28 h-28 mx-auto mt-1 rounded-full" />
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
                    <div className=" w-full h-[30vh]">
                        <img src={userProfile.thumbnail} alt="User background" className="w-full h-full"/>
                        <div className="w-full h-[64px] flex items-center justify-center relative z-1 -top-20">
                            <img src={userProfile.thumbnail} alt="user profile picture" className="rounded-full w-56 h-56 p-2 bg-white" />
                        </div>
                    </div>
                    <div className="w-full h-[10vh] flex justify-between">
                        <div className="w-[30%] h-full  ml-5 mt-3">
                            <div className="w-full flex justify-start">
                                <h2 className="font-bold text-xl">@{userProfile.username}</h2>
                            </div>
                            <div className="w-full flex justify-start items-center">
                                <FontAwesomeIcon icon={faInbox} fontSize={"18"} color="gray" className="mr-2"/>
                                <h2 className="font-bold text-1xl text-gray-400">{userProfile.email}</h2>
                            </div>
                            <div className="w-full flex justify-start items-center">
                                <FontAwesomeIcon icon={faCalendarDay} fontSize={"18"} color="gray" className="mr-2"/>
                                <h2 className="font-bold text-1xl text-gray-400">Birthday</h2>
                            </div>
                        </div>
                        <div className="w-[30%] h-full mr-5 mt-3">
                            <div className="w-full flex justify-end">
                            {isOwn ? (
                                <button type="button" onClick={()=>{setEdit(!edit)}} className="rounded-full w-28 h-9 text-white font-bold bg-custom-color hover:bg-green-500"> Edit </button>
                            ):(
                                <button type="button"  className="rounded-full w-28 h-9 text-white font-bold bg-custom-color hover:bg-green-500"> Follow </button>
                            )}
                            </div>
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