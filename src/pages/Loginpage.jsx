import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuthRedirect from "../hooks/authRedirect";

//axios
import axios from 'axios'

//cookies
import Cookies from "js-cookie";

//static
import logo from '../assets/images/Logo.png'

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation} from '@fortawesome/free-solid-svg-icons'


const Login = () => {
    const [user, setUser] = useState({ email: "", password: ""});
    const [response, setResponse] = useState({ error: false, success: false, message: ""});
    const navigate = useNavigate();

    //if user already login
    const login = useAuthRedirect();

    const handleChange = (e) => {
        setUser({...user,
            [e.target.name]: e.target.value,
            });
        };

    const handleSumbit = async (e) => {
        e.preventDefault();
        try{
          axios.post("http://localhost:3000/login", user)
            .then((response)=>{
              setResponse({error: false, success: true, message: response.data.message});
              Cookies.set("auth", response.data.token);
              navigate('/home'); //Redirect
            })
            .catch((error) =>{ setResponse({error: true, success: false, message: error.response.data.message})});
        } catch(err){
          console.log(err);
        }
    }

    return(
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: "#7bed9f"}}>
      <div className="bg-white rounded shadow-lg text-center" style={{ width: "40%", height: "80%"}}>
        <Link to={'/'} className="flex items-center justify-center" style={{width: "100%"}}>
            <img src={logo} alt="Logo blogspace" className="" style={{width: "20%"}}/>
            <h2 className="text-4xl font-bold" style={{ color:"green" }}>LLIVE BLOGSPACE</h2>
        </Link>
        <h2 className="text-2xl font-bold " style={{  marginTop:"1rem"}}>LOGIN</h2>
        <form onSubmit={handleSumbit} style={{ marginTop:"2rem"}}>
          <div className="mb-4 mx-auto " style={{width: "80%"}}>
            <input
              type="email"
              id="email"
              value={user.email}
              style={{width:"100%", padding: "0.5rem"}}
              name="email"
              onChange={handleChange}
              className="w-full px-20 py-2 border rounded-md text-center"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 mx-auto " style={{width: "80%"}}>
            <input
              type="password"
              id="password"
              style={{ marginTop: "20px", width: "100%", padding: "0.5rem"}}
              value={user.password}
              name="password"
              onChange={handleChange}
              className="w-full px-20 py-2 border rounded-md text-center"
              placeholder="Password"
              required
            />
          </div>
          { response.error && 
            <p style={{fontSize: "14px", marginTop:"1.5rem", color: "red"}}> <FontAwesomeIcon icon={faCircleExclamation} style={{ fontSize: "28px"}} /> { response.message} </p>
          }
          <button
            type="submit"
            style={{margin: "3rem 0rem 1rem 0rem"}}
            className="bg-custom-color text-white px-10 py-3 rounded hover:bg-transparent hover:text-black transition-colors duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-sm" style={{marginTop: "15px"}}>You do not have an account? <Link to={'/register'} className="text-black-500" style={{ textDecoration: "underline"}}>Sign in!</Link></p>
      </div>
    </div>  
    )
}

export default Login;