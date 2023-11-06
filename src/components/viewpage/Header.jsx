import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//styles
import '../../assets/styles/Homepage/homepage.css'

//static
import logo from '../../assets/images/Logo.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
<header>
  <div className="flex items-center" style={{marginTop: "20px"}}>
    <div className="brand flex items-center" style={{width: "22%", marginLeft: "25px", cursor:"pointer"}}>
    <img src={logo} alt="Logo de blogspace" style={{width: "30%"}} />
    <h1 className="font-bold text-green-600 cursor-pointer" style={{fontSize: "25px"}}>Llive Blogspace</h1>
    </div>
    <nav className="flex justify-center items-center" style={{width: "50%"}}>
      <ul className="flex flex-col lg:flex-row space-x-4" style={{justifyContent:'space-evenly', width: "100%"}}>
        <li className="custom-hover font-bold lg:ml-0">
          <a className="text-1xl" href="#">
              Groups
          </a>
        </li>
        <li className="custom-hover font-bold lg:ml-4">
          <a className="text-1xl hover:bg-violet-600" href="#">
            Contact
          </a>
        </li>
        <li className="relative group lg:ml-4">
          <button className="text-1xl custom-hover font-bold" onClick={() => setIsOpen((prev) => !prev)}>
            Motivations
          </button>
          {isOpen && (
            <ul className="bg-custom-color text-white w-32 text-center rounded" style={{padding: '15px', position:'absolute', borderRadius: " 10px 40px 10px 20px" }}>
              <li className="text-1xl" style={{marginTop: "5px"}}>
                <a href="#">About me</a>
              </li>
              <li className="text-1xl mt-5" style={{marginTop: "10px"}}>
                <a href="#">Llive history</a>
              </li>
              <li className="text-1xl mt-5" style={{marginTop: "10px"}}>
                <a href="#">Goals</a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
    <Link to="/login" className='mx-auto'>
      <button className="bg-custom-color text-white px-10 py-3 rounded ml-2 hover:bg-transparent hover:text-black transition-colors duration-300 ease-in-out">
        Get Started
      </button>
    </Link>
  </div>
</header>

  );
}

export default Header;

