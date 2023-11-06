
const Aside = ({ user }) => {
    return (
        <div className="col-span-1 p-4 border-l ">
            <div className="grid grid-rows-2 w-3/4 h-2/4 mt-5 fixed">
                {/* Filas en la columna derecha */}
                <div className="row-span-1 h-56 w-1/5 rounded-lg ml-10 text-center" style={{backgroundColor: "#f5f6fa"}}>
                    <h3 className="font-bold mt-3"> personal information </h3>
                    <div className="w-full h-80">
                        <div className=" grid grid-rows-5 mt-1">
                            <div className=" col-span-1 w-full justify-center flex h-full"> 
                                <h1 className="mr-2 font-bold w-20 text-start"> Email: </h1>
                                <h2> {user.email }</h2>
                            </div>
                            <div className=" col-span-1 w-full justify-center flex h-full"> 
                                <h1 className="mr-2 font-bold w-20 text-start"> Birthday: </h1>
                                <h2> Jveronelli@gmail.com</h2>
                            </div>
                            <div className=" col-span-1 w-full justify-center flex h-full"> 
                                <h1 className="mr-2 font-bold w-20 text-start"> Username: </h1>
                                <h2> {user.username}</h2>
                            </div>
                            <div className=" col-span-1 w-full justify-center flex h-full"> 
                                <h1 className="mr-2 font-bold w-20 text-start"> Followers </h1>
                                <h2> {user.followers}</h2>
                            </div>
                            <div className=" col-span-1 w-full justify-center flex h-full"> 
                                <h1 className="mr-2 font-bold w-20 text-start"> Following: </h1>
                                <h2>{user.following}</h2>
                            </div>         
                        </div>
                        <button type="submit" className="rounded-full mt-2 w-28 h-9 text-white font-bold bg-custom-color hover:bg-green-500"> Edit profile </button>

                    </div>
                </div>
                <div className="row-span-1 h-2/4 w-1/5 rounded-lg ml-10 text-center" style={{backgroundColor: "#f5f6fa"}}>
                    <h3 className="mt-5 font-bold">Customer help</h3>
                    <button className="rounded-full w-28 h-9 mt-5 text-black font-bold hover:bg-custom-color hover:text-white transition-colors duration-300 ease-in-out " style={{border: '3px solid #7bed9f'}}> Chat </button> 
                </div>
            </div>
        </div>
    )
}

export default Aside