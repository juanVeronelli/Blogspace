import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";

//components
import NavAside from "../components/homepage/navAside.jsx"; 
import Aside from "../components/homepage/Aside.jsx";
//loader
import Loader from "../components/loader/Loader.jsx";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faPeopleGroup, faGear } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import Cookies from "js-cookie";

const Homepage = () => {
    const [text, setText] = useState('');
    const [textareaHeight, setTextareaHeight] = useState("auto");
    const [pageFocus, setPageFocus] = useState(true);
    const [loading, setloading] = useState(true);
    const [user, setUser] = useState(null);

    
    const token = Cookies.get('auth')
    const navigate = useNavigate()

    const handleTextChange = (e) => {
        setText(e.target.value);
        if(e.target.value == '') {
            setTextareaHeight('auto');
        } else {
            const maxHeight = 300; 
            const newHeight = e.target.scrollHeight;
            setTextareaHeight(newHeight > maxHeight ? maxHeight + "px" : newHeight + "px");
        }
      };

 
      useEffect(() => {
        try{
            axios.get('http://localhost:3000/users', { headers: {'x-access-token': token} } )
                .then((response) => setUser( response.data.user) )
                .catch((error) =>{
                    if(error.response.status === 401) {
                        navigate("/login");
                        Cookies.remove('auth');
                    } else {
                        setloading(false);
                    }
                })
                .finally(()=> {setloading(false);})
        } catch(err){
            setloading(false);
            console.log(err);
        }
      })


    if(loading) return(<Loader/>) 
    return (
      <div className="grid grid-cols-4 h-screen">
        <NavAside user={user} loading={loading} />
        <div className="col-span-2 w-full h-[100vh]">
          <div className="w-full h-[8vh] flex justify-center items-end border-b">
            <div className="w-[70%] h-[5vh] flex justify-evenly items-end">
              <div className={`w-[30%] h-full flex justify-center items-center cursor-pointer ${ pageFocus ? "border-b-8 border-green-500" : "hover:border-b-8 hover:border-green-500" }`} onClick={() => setPageFocus(true)}  >
                <h2 className={pageFocus ? "font-bold text-xl": "font-bold text-xl text-gray-300"}>All</h2>
              </div>
              <div  className={`w-[30%] h-full flex justify-center items-center cursor-pointer ${pageFocus ? "hover:border-b-8 hover:border-green-500" : "border-b-8 border-green-500"}`}onClick={() => setPageFocus(false)}>
                <h2 className={pageFocus ? "font-bold text-xl text-gray-300" : "font-bold text-xl"}> Favorites </h2>
              </div>
            </div>
          </div>
          <form className="w-full h-auto mt-5 p-4 border-b">
            <div className="w-full h-auto flex">
                <div className="w-[15%] h-full flex justify-end">
                    <img src={user.thumbnail} alt="user profile picture" className="w-14 h-14 mr-1 rounded-full" />
                </div>
                <div className="w-[85%] h-full">
                    <textarea className="resize-none w-full outline-none p-2" placeholder="What progress have you made today?" onChange={handleTextChange} value={text} style={{height: textareaHeight}}/>
                </div>
            </div>
            <div className="w-full h-[20%] flex">
                <div className="w-[16%] h-full"></div>
                <div className="w-[85%] h-full mt-2 flex justify-between">
                    <div className="w-[15%] h-full flex">
                        <div className="w-[33%] flex items-center justify-center h-full">
                            <FontAwesomeIcon icon={faPaperclip} color="green" fontSize={"20"} className=" rounded-full p-2 hover:bg-gray-200" />
                        </div>
                        <div className="w-[33%] flex items-center h-full">
                            <FontAwesomeIcon icon={faPeopleGroup} color="green" fontSize={"20"} className=" rounded-full p-2 hover:bg-gray-200" />
                        </div>
                        <div className="w-[33%] flex items-center h-full">
                            <FontAwesomeIcon icon={faGear} color="green" fontSize={"20"} className=" rounded-full p-2 ml-1 hover:bg-gray-200" />
                        </div>
                    </div>
                    <div className="w-[25%] h-full flex items-center justify-end">
                        <button type="submit" className=" w-28 h-8 bg-custom-color hover:bg-green-400 font-bold text-white uppercase rounded-full"> Post </button>
                    </div>
                </div>
            </div>
          </form>
        </div>
        <Aside user={user}/>
      </div>
    );
};

export default Homepage;
