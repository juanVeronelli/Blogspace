import React, { useState  } from "react";
import { Link} from "react-router-dom";



//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import Cookies from "js-cookie";

const Aside = ({ user }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(true);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const token = Cookies.get('auth')


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value === '') {
            setSearchResults([]);
          } else {
        try{
            if(searchTerm == "" || searchTerm.length === 0) return console.log("No search term")
            axios.get(`http://localhost:3000/search/${searchTerm}`, { headers: {'x-access-token': token} } )
                .then((response) =>{ setSearchResults(response.data.usernames)})
                .catch((error) =>{
                  if(error.response.status === 401) {
                      navigate("/login");
                      Cookies.remove('auth');
                  } else {
                      setSearchLoading(false);
                  }
              })
                .finally(()=> { setSearchLoading(false)});
        }catch(err){
            setSearchLoading(true);
        }
      }
    }

    
    return (
        <div className="h-full w-full border-l">
          <div className="mt-5 flex h-20 w-full mx-auto fixed">
            <div className="flex items-center w-full mx-auto justify-center p-5">
              <div className="rounded-lg p-5 w-full">
                <div className={`${isInputFocused ? "flex w-96 border rounded-full border-green-500" : "flex w-96 border rounded-full" }`}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                >
                  <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r p-5">
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition" >
                      <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                    </svg>
                  </div>
                  <input type="text" onChange={handleSearchChange} value={searchTerm} className="w-full pl-2 p-1 text-sm font-semibold outline-0" placeholder="Searh people in blogspace" ></input>
                  <FontAwesomeIcon icon={faXmark} className={ searchResults.length !== 0 ? "bg-custom-color cursor-pointer p-1 mt-2 mr-2 rounded-full rounded-full text-white font-semibold hover:bg-green-500 transition-colors" : "p-1 mt-2 mr-2 rounded-full rounded-full text-white font-semibold" }/>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            {searchResults.length > 0 && (
              <ul className="border h-56 w-80 mt-20 rounded-lg fixed">
                {searchLoading ? (
                  // Render loading indicator here if needed
                  <p>Loading...</p>
                ) : (
                  searchResults.map((user) => (
                    <li key={user.id}>
                      <Link
                        to={`/profile/${user.username}`}
                        className="w-full h-14 p-2 items-center mt-1 cursor-pointer grid grid-cols-4 hover:bg-gray-100"
                      >
                        <div className="col-span-1 w-full h-full">
                          <img
                            src={user.thumbnail}
                            alt="user profile picture"
                            className="w-12 mx-auto h-12 rounded-full"
                          />
                        </div>
                        <div className="block w-full">
                          <h1 className="font-bold">@{user.username}</h1>
                          <h2 className="font-bold text-sm text-gray-500 ml-1">
                            {user.email}
                          </h2>
                        </div>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
    )
}

export default Aside