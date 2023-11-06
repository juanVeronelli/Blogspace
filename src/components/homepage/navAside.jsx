import React, {useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faGear, faHouse, faBookmark, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'

import Logo from '../../assets/images/logo.png';


import { AuthContext } from "../../context/context.jsx";
import Cookies from 'js-cookie';
import axios from 'axios';



const NavAside = () => {
    const { loading, user } = useContext(AuthContext);
    const navigate = useNavigate()
    
    const logOut = () => {
      try{
        const token = Cookies.get('auth');
        axios.post('http://localhost:3000/logout', null, {headers: {'x-access-token': token}} )
          .then(()=>{ Cookies.remove('auth'); navigate('/login')})
          .catch((err)=>{ console.log(err) })
      }catch(err){
        console.log(err)
      }
    }

    if(loading) return (<> <h1> Loading...</h1></>)

    return (
        <div className="col-span-1 p-4 flex w-full border-r">
        <div className="grid grid-rows-8 gap-4 fixed">
          <div className="row-span-2 h-20">
            <Link to="/home" className="w-full flex items-center">
              <div className="w-20 mx-auto">
                <img src={Logo} alt="Blogspace logo" className="rounded-full w-20" />
              </div>
              <div className="w-4/5 ml-2 flex items-center font-bold uppercase">
                <h1>Blogspace</h1>
              </div>
            </Link>
          </div>
          <div className="row-span-1 mt-4 hover:bg-custom-hover rounded-full p-2 w-56">
            <Link to="/home" className="menu-link">
              <div className="menu-item flex ml-2">
                <FontAwesomeIcon icon={faHouse} fontSize="28px" color="green" className='w-7' />
                <h1 className="font-bold text-2xl menu-text ml-2 w-56 text-start">Home</h1>
              </div>
            </Link>
          </div>
          <div className="row-span-1 hover:bg-custom-hover rounded-full p-2 w-56">
            <Link to={`/profile/${user.username}`} className="menu-link">
              <div className="menu-item flex ml-2">
                <FontAwesomeIcon icon={faUser} fontSize="28px" color="green" className='w-7' />
                <h1 className="font-bold text-2xl menu-text ml-2 w-56 text-start">Profile</h1>
              </div>
            </Link>
          </div> 
          <div className="row-span-1 hover:bg-custom-hover rounded-full p-2 w-56">
            <Link to="/bookmarks" className="menu-link">
              <div className="menu-item flex ml-2">
                <FontAwesomeIcon icon={faBookmark} fontSize="28px" color="green" className='w-7'/>
                <h1 className="font-bold text-2xl menu-text ml-2 w-56 text-start">Bookmarks</h1>
              </div>
            </Link>
          </div>
          <div className="row-span-1 hover:bg-custom-hover rounded-full p-2 w-56">
            <Link to="/notifications" className="menu-link">
              <div className="menu-item flex ml-2">
                <FontAwesomeIcon icon={faEnvelope} fontSize="28px" color="green" className='w-7' />
                <h1 className="font-bold text-2xl menu-text ml-2 w-56 text-start">Notifications</h1>
              </div>
            </Link>
          </div>
          <div className="row-span-1 hover:bg-custom-hover rounded-full p-2 w-56">
            <Link to="/settings" className="menu-link">
              <div className="menu-item flex ml-2">
                <FontAwesomeIcon icon={faGear} fontSize="28px" color="green" className='w-7' />
                <h1 className="font-bold text-2xl menu-text ml-2 w-56 text-start">Settings</h1>
              </div>
            </Link>
          </div>
          <div className="row-span-1 hover:bg-custom-hover rounded-full p-2 w-56">
            <Link to="/groups" className="menu-link">
              <div className="menu-item flex ml-2">
                <FontAwesomeIcon icon={faPeopleGroup} fontSize="28px" color="green" className='w-7' />
                <h1 className="font-bold text-2xl menu-text ml-2 w-56 text-start">Groups</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="fixed bottom-0 w-60">
          <button onClick={logOut} className="w-full h-14 rounded-full mb-5 text-black font-bold hover:bg-custom-color hover:text-white transition-colors duration-300 ease-in-out border-2 border-green-500">
            Log out
          </button>
        </div>
      </div>      
    )
}

export default NavAside