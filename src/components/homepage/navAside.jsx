import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faUserPlus, faGear, faHouse, faArrowRightFromBracket, faEnvelope, faUser, faArrowsUpDown} from '@fortawesome/free-solid-svg-icons'

import Logo from '../../assets/images/logo.png';

import Loader from '../loader/Loader';

import Cookies from 'js-cookie';
import axios from 'axios';



const NavAside = ({ user, loading}) => {
    const [isOpen, setIsOpen] = useState(false);
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

    if(loading) return (<Loader/>)

    return (
      <div className="col-span-1 flex w-full border-r justify-end">
        <div className="w-[350px] md:w-[250px] lg:w-[300px] xl:w-[350px] h-[100vh] block fixed">
          <Link to={"/home"} className="w-full h-[10vh] flex justify-center items-center">
            <img src={Logo} alt="Blogsppace logo" className='w-24' />
            <h1 className='font-bold hidden 2xl:flex text-2xl'>Blogsppace</h1>
          </Link>
          <div className="w-full h-[80vh] block">
            <div className="w-full h-[64px] mt-5 justify-center flex">
              <Link to={"/home"} className="w-[70%] md:w-[80%] lg:w-[70%] xl:w-[70%] rounded-full h-full flex justify-between cursor-pointer hover:bg-gray-200">
                <div className="w-[30%] h-full flex justify-center items-center rounded-full">
                  <FontAwesomeIcon icon={faHouse} fontSize={'34'} color='green' />
                </div>
                <div className="w-[70%] flex justify-start items-center h-full rounded-full">
                  <h1 className='font-bold text-[160%] text-black'>Home</h1>
                </div>
              </Link>
            </div>
            <div className="w-full h-[64px] mt-5 justify-center flex">
              <Link to={`/profile/${user.username}`} className="w-[70%] md:w-[80%] lg:w-[70%] xl:w-[70%] rounded-full h-full flex justify-between cursor-pointer hover:bg-gray-200">
                <div className="w-[30%] h-full flex justify-center items-center rounded-full">
                  <FontAwesomeIcon icon={faUser} fontSize={'34'} color='green' />
                </div>
                <div className="w-[70%] flex justify-start items-center h-full rounded-full">
                  <h1 className='font-bold text-[160%] text-black'>Profile</h1>
                </div>
              </Link>
            </div>
            <div className="w-full h-[28px] mt-4 flex justify-center items-center">
              <div className="w-2/3 md:w-1/2 lg:w-2/3 xl:w-1/2 h-full flex items-center justify-between">
                <h3 className='text-[100%] font-bold text-gray-300 -ml-4'>Your groups</h3>
              </div>
            </div>
            <div className="w-full h-[64px] mt-5 justify-center flex">
              <Link className="w-[70%] md:w-[80%] lg:w-[70%] xl:w-[70%] rounded-full h-full flex justify-between cursor-pointer hover:bg-gray-200">
                <div className="w-[30%] h-full flex justify-center items-center rounded-full">
                  <img src={Logo} alt="" className='w-18' />
                </div>
                <div className="w-[70%] flex justify-start items-center h-full rounded-full">
                  <h1 className='font-bold text-xl text-black'>Group 1</h1>
                </div>
              </Link>
            </div>
            <div className="w-full h-[64px] mt-5 justify-center flex">
              <div className="w-[70%] md:w-[80%] lg:w-[70%] xl:w-[70%] rounded-full h-full flex justify-between cursor-pointer hover:bg-gray-200">
                <div className="w-[30%] h-full flex justify-center items-center rounded-full">
                  <img src={Logo} alt="" className='w-18' />
                </div>
                <div className="w-[70%] flex justify-start items-center h-full rounded-full">
                  <h1 className='font-bold text-xl text-black'>React developers</h1>
                </div>
              </div>
            </div>
            <div className="w-full h-[64px] mt-5 justify-center flex">
              <div className="w-[70%] md:w-[80%] lg:w-[70%] xl:w-[70%] rounded-full h-full flex justify-between cursor-pointer hover:bg-gray-200">
                <div className="w-[30%] h-full flex justify-center items-center rounded-full">
                  <img src={Logo} alt="" className='w-18' />
                </div>
                <div className="w-[70%] flex justify-start items-center h-full rounded-full">
                  <h1 className='font-bold text-xl text-black'>Football players</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[8vh] w-[80%] xl:w-full mx-auto flex justify-center items-end">
            <div className={isOpen ? "w-[90%] h-[400px] border bg-white rounded-md" : "w-[90%] h-[50px] bg-white rounded-md"}>
            <div className="w-[100%] mx-auto flex p-4 justify-evenly h-[50px] bg-custom-color rounded-md cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              <div className="w-[80%] flex items-center">
                <img src={user.thumbnail} alt="user Profile picture" className='w-8 mr-2 rounded-full h-8' />
                <h3 className='text-white font-bold'> @{user.username} </h3>
              </div>
              <div className="w-[20%] flex justify-center items-center">
                <FontAwesomeIcon icon={faArrowsUpDown} color='white'/>
              </div>
            </div>
            <div className="w-full h-[64px] mt-2 hover:bg-gray-100 cursor-pointer flex justify-evenly">
              <div className="w-[15%] h-full flex justify-start items-center">
                <FontAwesomeIcon icon={faUserPlus} fontSize={"38"}color='green'/>
              </div>
              <div className="w-[38%] h-full flex items-center justify-start">
                <h2 className='font-bold text-xl'> Join a group </h2>
              </div>
            </div>
            <div className="w-full h-[64px] hover:bg-gray-100 cursor-pointer flex justify-evenly">
              <div className="w-[15%] h-full flex justify-start items-center">
                <FontAwesomeIcon icon={faPeopleGroup} fontSize={"38"} color='green'/>
              </div>
              <div className="w-[38%] h-full flex items-center justify-start">
                <h2 className='font-bold text-xl'> Discover </h2>
              </div>
            </div>
            <div className="w-full h-[64px] hover:bg-gray-100 cursor-pointer flex justify-evenly">
              <div className="w-[15%] h-full flex justify-start items-center">
                <FontAwesomeIcon icon={faGear} fontSize={"38"} color='green'/>
              </div>
              <div className="w-[38%] h-full flex items-center justify-start">
                <h2 className='font-bold text-xl'> Settings </h2>
              </div>
            </div>
            <div className="w-full h-[64px] hover:bg-gray-100 cursor-pointer flex justify-evenly">
              <div className="w-[15%] h-full flex justify-start items-center">
                <FontAwesomeIcon icon={faEnvelope} fontSize={"38"} color='green'/>
              </div>
              <div className="w-[38%] h-full flex items-center justify-start">
                <h2 className='font-bold text-xl'> Notifications </h2>
              </div>
            </div>
            <div className="w-full h-[64px] hover:bg-gray-100 cursor-pointer flex justify-evenly">
              <div className="w-[15%] h-full flex justify-start items-center">
                <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize={"38"} color='green'/>
              </div>
              <div className="w-[38%] h-full flex items-center justify-start">
                <h2 className='font-bold text-xl'> Logout </h2>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default NavAside