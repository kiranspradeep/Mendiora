import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import AttendSignup from './pages/Attendee/AttendSignup';
import AttendLogin from './pages/Attendee/AttendLogin';
import Home from './pages/User/Home';

function App () {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/loginatt' element={<AttendLogin/>}/>
            <Route path='/signupatt' element={<AttendSignup/>}/>
        </Routes>
    );
};

export default App;
