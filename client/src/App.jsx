import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHome from './pages/User/UserHome';
import UserLogin from './pages/User/UserLogin';
import UserProfile from './pages/User/userProfile';
import UserSignup from './pages/User/UserSignup';
import Login from './pages/Org&Ad/Login';
import Signup from './pages/Org&Ad/Signup';
import AboutUs from './pages/User/AboutUs';
import WeddingPlanners from './pages/User/WeddingPlanners'; // Importing the Wedding Planners page
import ContactUs from './pages/User/ContactUs';
import VenuesSection from './pages/User/VenuesSection';
import VenueForm from './pages/Org&Ad/VenueForm';
import AdminNavbar from './components/Admin/AdminNavbar';
import ViewOrganizers from './pages/Admin/ViewOrganizer';
import AdminLogin from './pages/Admin/AdminLogin';
import ViewVenues from './pages/Admin/ViewVenues';

function App () {
        
    return (
        <Routes>
            <Route path="/" element={<UserHome />} /> 
            <Route path='/loginuser' element={<UserLogin/>}/>
            <Route path='/signupuser' element={<UserSignup/>}/>
            <Route path='/profileuser' element={<UserProfile/>}/>
            <Route path='/loginorg' element={<Login/>}/>
            <Route path='/signuporg' element={<Signup/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/contactus' element={<ContactUs/>}/>
            <Route path='/wedding' element={<WeddingPlanners/>}/>
            <Route path='/form' element={<VenueForm/>}/>
            <Route path='/adminnavbar'element={<AdminNavbar/>}/>
            <Route path='/adminlogin' element={<AdminLogin/>}/>
            <Route path='/organizer' element={<ViewOrganizers/>}/>
            <Route path='/venue' element={<ViewVenues/>}/>
            <Route path='/venuesection' element={<VenuesSection/>}/>
        </Routes>
    );
};

export default App;
