//Here are all the routes of the different pages in the application.
import { BrowserRouter, Route, Routes} from 'react-router-dom';
//Pages Import
import Viewpage from '../pages/viewpage';
import Login from '../pages/Loginpage';
import Register from '../pages/Regsiter';
import Homepage from '../pages/Homepage';
import Profile from '../pages/Profile';

const Router = () => {

    return (
        <BrowserRouter>
                <Routes>
                    {/* Main Route */}
                    <Route path='/' exact element={<Viewpage/>} />;
                    {/* Login Route */}
                    <Route path='/login' exact element={<Login />}/>
                    {/* Register Route */}
                    <Route path='/register' exact element={<Register />}/>
                    {/* Home Route */}
                    <Route path='/home' exact element={<Homepage />}/>
                    {/* Profile Route */}
                    <Route path='/profile/:username' exact element={<Profile />} />
                </Routes>
        </BrowserRouter>
    );
};

export default Router;