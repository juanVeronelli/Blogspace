import Logo from '../../assets/images/logo.png';


const Loader = () => {
    return (
        <div className="grid grid-cols-5 h-screen">
            <div className="col-span-1 border-r"></div>
            <div className="col-span-3 w-full">
                <div className="col-span-9 mx-auto text-center justify-center w-full">
                    <div className="">
                        <img src={Logo} alt="Logo llive blogspace" className='w-56 h-56 mx-auto mt-32' />
                        <div class="flex flex-row gap-2 mt-10 justify-center">
                            <div class="w-6 h-6 rounded-full bg-custom-color animate-bounce"></div>
                            <div class="w-6 h-6 rounded-full bg-custom-color animate-bounce [animation-delay:-.1s]"></div>
                            <div class="w-6 h-6 rounded-full bg-custom-color animate-bounce [animation-delay:-.2s]"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 border-l"></div>
        </div>


    )
}

export default Loader