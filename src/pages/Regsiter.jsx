import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import useAuthRedirect from "../hooks/authRedirect";

//axios
import axios from "axios";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

//static
import logo from '../assets/images/Logo.png'

const Register = () => {
    const [user, setUser] = useState({ email: "", password: "", username: "", thumbnail: 'user.png'});
    const [response, setResponse] = useState({ error: false, success: false, message: ""});
    const navigate = useNavigate();

    const login = useAuthRedirect();


    const handleChange = (e) => {
        setUser({...user,
            [e.target.name]: e.target.value,
            });
    }

    const hanldleSubmit = (e) => {
        e.preventDefault();
        try{
            axios.post('http://localhost:3000/register', user)
                .then((response) =>{ setResponse({ error: false, success: true, message: response.data.message})})
                .catch((error) =>{ setResponse({ error: true, success: false, message: error.response.data.message})});
        }catch(err){
            console.log(err);
        } 
    }


    return (
        <>
        <div className="flex justify-center items-center h-screen" style={{ backgroundColor: "#7bed9f"}}>
            <div className="bg-white rounded shadow-lg text-center" style={{ width: "40%", height: "80%"}}>
            <Link to={'/'} className="flex items-center justify-center" style={{width: "100%"}}>
                <img src={logo} alt="Logo blogspace" className="" style={{width: "20%"}}/>
                <h2 className="text-4xl font-bold" style={{ color:"green" }}>LLIVE BLOGSPACE</h2>
            </Link>
            <h2 className="text-2xl font-bold " style={{  marginTop:"1rem"}}>SIGN IN</h2>
            {
                response.success ? (
                    <>
                    <h1><FontAwesomeIcon icon={faCircleCheck} style={{fontSize: "48px", marginTop: "40px", color: "green"}}/></h1>
                    <p style={{fontSize:"24px", marginTop: "20px"}}> Wait, you will be redirected to Login... </p>
                    { setTimeout(()=>{navigate("/login")}, 1000)}
                    </>
                ) : (
                    <>
                        <form style={{ marginTop:"2.5rem"}} onSubmit={hanldleSubmit}>
                        <div className="mb-4 mx-auto " style={{width: "80%"}}>
                            <input
                            type="email"
                            id="email"
                            style={{width:"100%", padding: "0.5rem"}}
                            name="email"
                            onChange={handleChange}
                            className="w-full px-20 py-2 border rounded-md text-center"
                            placeholder="Correo electrónico"
                            required
                            />
                        </div>
                        <div className="mb-4 mx-auto " style={{width: "80%"}}>
                            <input
                            type="password"
                            id="password"
                            style={{ marginTop: "20px", width: "100%", padding: "0.5rem"}}
                            name="password"
                            onChange={handleChange}
                            className="w-full px-20 py-2 border rounded-md text-center"
                            placeholder="Contraseña"
                            required
                            />
                        </div>
                        <div className="mb-4 mx-auto " style={{width: "80%"}}>
                            <input
                            type="username"
                            id="username"
                            style={{ marginTop: "20px", width: "100%", padding: "0.5rem"}}
                            name="username"
                            onChange={handleChange}
                            className="w-full px-20 py-2 border rounded-md text-center"
                            placeholder="Username"
                            required
                            />
                        </div>
                        { response.error &&
                        <p style={{fontSize: "14px", marginTop:"1.5rem", color: "red"}}> <FontAwesomeIcon icon={faCircleExclamation} style={{ fontSize: "28px"}} /> { response.message} </p>
                        }
                        <button
                            type="submit"
                            style={{margin: "1rem 0rem 1rem 0rem"}}
                            className="bg-custom-color text-white px-10 py-3 rounded hover:bg-transparent hover:text-black transition-colors duration-300 ease-in-out"
                        >
                            Sign in
                        </button>
                        </form>
                        <p className="mt-5 text-sm" style={{marginTop: "15px"}}> you already have an account? <Link to={'/login'} className="text-black-500" style={{ textDecoration: "underline"}}>Login</Link></p>
                    </>
                )
            }

        </div>
      </div>  
        </>
    )
}

export default Register