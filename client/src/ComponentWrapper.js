import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import ModifyProduct from './components/pages/ModifyProduct';
import PrivateRoute from './components/PrivateRoute';

const ComponentWrapper = () => {
    const [logged, setLogged] = useState(false);

    const handleLog = () => {
        setLogged(!logged);
    }

    const handleLogout = () => {
        if (logged) {
            localStorage.removeItem('token');
            setLogged(!logged);
        }
    };

    return (
        <BrowserRouter>
            <div>
                <Navbar logged={logged} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
                    <Route path="/modify" element={<PrivateRoute><ModifyProduct /></PrivateRoute>} />
                    <Route path="/login" element={<Login handleLog={handleLog} />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default ComponentWrapper;
