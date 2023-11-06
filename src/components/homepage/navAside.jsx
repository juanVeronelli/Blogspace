import React, {useContext} from 'react'
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faGear, faHouse, faBookmark, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'

import Logo from '../../assets/images/logo.png';


import { AuthContext } from "../../context/context.jsx";



const NavAside = () => {
    const { loading, user } = useContext(AuthContext);

    if(loading) return (<></>)

    return (
        <div className="col-span-1 p-4 flex w-full border-r ">
        <div className="grid grid-rows-8 gap-4 fixed">
            <div className="row-span-2 h-40 mr-14">
                <div className="w-full h-20 flex">
                    <Link to={"/home"} className="w-full h-20 flex">
                        <div className="h-full w-2/6 mx-auto">
                            <img src={Logo} alt="llive blogspace logo" className="rounded-full w-20 float-right mt-2" />
                        </div>
                        <div className="h-full w-4/6 ml-1 flex items-center font-bold uppercase">
                            <h1 className="mt-4">Blogspace</h1>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="row-span-1 h-16 w-60 mr-28 rounded-full mx-auto hover:bg-custom-hover cursor-pointer">
                <Link to={'/home'}>
                    <div className="h-full w-full flex justify-center">
                        <div className="h-full w-2/4 flex items-center ml-5">
                            <FontAwesomeIcon icon={faHouse} fontSize={'28px'} color={"green"} />
                        </div>
                        <div className="h-full w-3/4">
                            <div className="h-full w-3/4 flex items-center">
                                <h1 className="font-bold text-2xl h-full w-screen flex items-center ml-5"> Home </h1>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="row-span-1 h-16 w-60 mr-28 rounded-full mx-auto hover:bg-custom-hover cursor-pointer">
                <Link to={`/profile/${user.username}`}>
                    <div className="h-full w-full flex justify-center">
                        <div className="h-full w-2/4 flex items-center ml-5">
                            <FontAwesomeIcon icon={faUser} fontSize={'28px'} color={"green"} />
                        </div>
                        <div className="h-full w-3/4">
                            <div className="h-full w-3/4 flex items-center">
                                <h1 className="font-bold text-2xl h-full w-screen flex items-center ml-5"> Profile </h1>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="row-span-1 h-16 w-60 mr-28 rounded-full mx-auto hover:bg-custom-hover cursor-pointer">
                <Link to={'/bookmarks'}>
                    <div className="h-full w-full flex justify-center">
                        <div className="h-full w-2/4 flex items-center ml-6">
                            <FontAwesomeIcon icon={faBookmark} fontSize={'28px'} color={"green"} />
                        </div>
                        <div className="h-full w-3/4">
                            <div className="h-full w-3/4 flex items-center">
                            <h1 className="font-bold text-2xl h-full w-screen flex items-center ml-5"> Bookmarks </h1>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="row-span-1 h-16 w-60 mr-28 rounded-full mx-auto hover:bg-custom-hover cursor-pointer">
                <Link to={'/notifications'}>
                    <div className="h-full w-full flex justify-center">
                        <div className="h-full w-2/4 flex items-center ml-6">
                            <FontAwesomeIcon icon={faEnvelope} fontSize={'28px'} color={"green"} />
                        </div>
                        <div className="h-full w-3/4">
                            <div className="h-full w-3/4 flex items-center">
                            <h1 className="font-bold text-2xl h-full w-screen flex items-center ml-5"> Notifications </h1>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="row-span-1 h-16 w-60 mr-28 rounded-full mx-auto hover:bg-custom-hover cursor-pointer">
                <Link to={'/settings'}>
                    <div className="h-full w-full flex justify-center">
                        <div className="h-full w-2/4 flex items-center ml-6">
                            <FontAwesomeIcon icon={faGear} fontSize={'28px'} color={"green"} />
                        </div>
                        <div className="h-full w-3/4">
                            <div className="h-full w-3/4 flex items-center">
                            <h1 className="font-bold text-2xl h-full w-screen flex items-center ml-5"> Settings </h1>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="row-span-1 h-16 w-60 mr-28 rounded-full mx-auto hover:bg-custom-hover cursor-pointer">
                <Link to={'/groups'}>
                    <div className="h-full w-full flex justify-center">
                        <div className="h-full w-2/4 flex items-center ml-6">
                            <FontAwesomeIcon icon={faPeopleGroup} fontSize={'28px'} color={"green"} />
                        </div>
                        <div className="h-full w-3/4">
                            <div className="h-full w-3/4 flex items-center">
                            <h1 className="font-bold text-2xl h-full w-screen flex items-center ml-5"> Groups </h1>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        <div className="fixed h-14 w-60 flex items-center justify-center" style={{ top: "85%"}}>
            <button className="rounded-full w-56 h-14 text-black font-bold hover:bg-custom-color hover:text-white transition-colors duration-300 ease-in-out " style={{border: '3px solid #7bed9f'}}> Log out </button>
        </div>
    </div>
    )
}

export default NavAside