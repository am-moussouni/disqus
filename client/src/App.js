import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Navbar from './Navbar';
import { UserContext } from './UserContext';
import { useState } from 'react';

export default function App() {
    const [page, setPage] = useState("signup");
    const [isConnected, setIsConnected] = useState(false);
    const [login, setLogin] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");

    const changeIsConnected = (value) => {
        setIsConnected(value);
    };

    return (
        <div>
            <UserContext.Provider value={{page, setPage, isConnected, changeIsConnected, login, setLogin, lastname, setLastname, firstname, setFirstname}}>
                
                <Navbar />

                <Routes>
                    <Route path='/' element={<SignupPage />} />
                    <Route path='/main' element={<MainPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignupPage />} /> 
                </Routes>
            </UserContext.Provider>
        </div>
    )
}