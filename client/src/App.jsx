import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import AttendHome from './pages/Attendee/AttendeeHome';
import AttendSignup from './pages/Attendee/AttendSignup';
import AttendLogin from './pages/Attendee/AttendLogin';


function App () {
    return (
        <Routes>
            <Route path="/" element={<AttendHome />} /> 
            <Route path="/login" element={<Login />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/loginatt' element={<AttendLogin/>}/>
            <Route path='/signupatt' element={<AttendSignup/>}/>
        </Routes>
    );
};

export default App;
