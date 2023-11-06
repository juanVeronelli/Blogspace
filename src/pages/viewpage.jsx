import React from 'react'
import { Link } from 'react-router-dom';

//assets
import peopleGreen from '../assets/images/people-green.jpg'

//components
import Header from '../components/viewpage/Header';


function Viewpage() {
  return (
    <div className="bg-100" style={{ padding: "0.02px"}}>
    <Header />
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-20" style={{lineHeight: "28px"}}>
          Llive blogspace, create your own path through posts about your professional advancement!
        </h1>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-black px-10 py-3 rounded hover:bg-custom-color hover:text-white transition-colors duration-300 ease-in-out" style={{ border: "3px solid #7bed9f"}}>
            Read More
          </button>
            <Link to={'/login'} style={{ display: "flex"}} className="bg-custom-color text-white px-10 py-0 rounded ml-2 hover:bg-transparent hover:text-black transition-colors duration-300 ease-in-out ml-2">
              <button>
                  Get Started
              </button>
            </Link>
        </div>
      </div>
      <div className="w-1/2">
        <img src={peopleGreen} className="w-3/4 mx-auto" alt="People green in the BlogSpace homepage" />
      </div>
    </div>
  </div>
  )
}

export default Viewpage
