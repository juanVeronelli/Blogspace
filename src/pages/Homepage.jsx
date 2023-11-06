import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/context.jsx";
import { useNavigate} from "react-router-dom";

//components
import NavAside from "../components/homepage/navAside.jsx"; 

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faPeopleGroup, faGear } from '@fortawesome/free-solid-svg-icons'

const Homepage = () => {
    const { loading, user } = useContext(AuthContext);
    const [text, setText] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('90px');
    
    const handleTextChange = (e) => {
        setText(e.target.value);
        if(e.target.value == '') {
            setTextareaHeight('90px');
        } else {
            const newHeight = e.target.scrollHeight;
            setTextareaHeight(`${newHeight}px`);
        }
      };
    
    if(loading) return(<><h1>Loading...</h1></>) 
      
    return (
        <div className="grid grid-cols-5 h-screen">
            <NavAside/>
            <div className="col-span-3 w-full">
                    <div className="col-span-9 mx-auto text-center justify-center w-full">
                        <div className="mt-5 flex h-20 w-full mx-auto ">
                            <div className="flex items-center w-full mx-auto justify-center p-5">
                                <div className="rounded-lg p-5 w-full">
                                    <div className="flex w-full border rounded-full">
                                        <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r p-5">
                                            <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                                                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                            </svg>
                                        </div>
                                        <input type="text" className="w-full pl-2 text-base font-semibold outline-0" placeholder="Searh people in blogspace" id=""></input>
                                        <input type="button" value="Search" className="bg-custom-color cursor-pointer p-2 rounded-full rounded-full text-white font-semibold hover:bg-green-500 transition-colors" />
                                    </div> 
                                </div> 
                            </div>
                        </div>
                        <hr className="mb-5"/>
                        <div className=" ml-8 h-full flex">
                            <div className="h-full mt-3 w-24" >
                                <img src={user.thumbnail} alt="Profile photo" className="rounded-full float-right w-12"/>
                            </div>
                            <div className="h-full ml-2 w-full" >
                                <form action="">
                                    <textarea placeholder="What progress have you made today?" className="text-2xl w-full p-4 outline-none resize-none" style={{height: textareaHeight}} required value={text} onChange={handleTextChange}/>
                                    <div className=" h-14">
                                        <div className="w-full h-14 justify-between flex items-center">
                                            <div className="ml-5">
                                                <FontAwesomeIcon className="rounded-full p-2 hover:bg-custom-hover" icon={faPaperclip} style={{ color: "green", fontSize: "20px", cursor:"pointer"}} />
                                                <FontAwesomeIcon className="ml-2 rounded-full p-2 hover:bg-custom-hover" icon={faPeopleGroup} style={{ color: "green", fontSize: "20px", cursor:"pointer"}} />
                                                <FontAwesomeIcon className="ml-2 rounded-full p-2 hover:bg-custom-hover" icon={faGear} style={{ color: "green", fontSize: "20px", cursor:"pointer"}} />
                                            </div>
                                            <button type="submit" className="rounded-full w-28 h-9 mr-5 text-white font-bold bg-custom-color hover:bg-green-500"> POST </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr className="mt-5 mb-5"/>
                        
                        <div className="w-5/6 h-96 mx-auto"></div>
                        <hr className="mt-5 mb-5"/>

                        <div className="w-5/6 h-96 mx-auto"></div>
                        <hr className="mt-5 mb-5"/>

                        <div className="w-5/6 h-96  mx-auto"></div>
                        <hr className="mt-5 mb-5"/>


                    </div>
            </div>
            <div className="h-full w-full border-l"></div>
        </div>
    );
};

export default Homepage;
