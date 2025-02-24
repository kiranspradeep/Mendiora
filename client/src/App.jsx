import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHome from './pages/User/UserHome';
import UserLogin from './pages/User/UserLogin';
import UserProfile from './pages/User/userProfile';
import UserSignup from './pages/User/UserSignup';
import Login from './pages/Org&Ad/Login';
import Signup from './pages/Org&Ad/Signup';
import EventForm from './pages/Org&Ad/EventForm';
import VenuePayments from './pages/Org&Ad/venuePayments';
import AboutUs from './pages/User/AboutUs';
import WeddingPlanners from './pages/User/WeddingPlanners'; // Importing the Wedding Planners page
import ContactUs from './pages/User/ContactUs';
import VenuesSection from './pages/User/VenuesSection';
import VenueForm from './pages/Org&Ad/VenueForm';
import AdmnNdOrg from './pages/Org&Ad/OrgndAdmnProfile';
import AdminNavbar from './components/Admin/AdminNavbar';
import ApprovedOrg from './pages/Admin/ApprovedOrg';
import ViewOrganizers from './pages/Admin/ViewOrganizer';
import AdminLogin from './pages/Admin/AdminLogin';
import ViewVenues from './pages/Admin/ViewVenues';
import OrganizerNavbar from './components/Org/OrganizerNavbar';
import EventPage from './pages/User/EventPage';
import ViewEvents from './pages/Admin/ViewEvents';
import DashboardGraph from './pages/Admin/DashboardGraph';
import AdminPage from './pages/Admin/AdminPage';
import AdminFooter from './components/Admin/AdminFooter';
import OrganizerPage from './pages/Org&Ad/OrganizerPage';
import UserEventBookings from './pages/User/UserEventBookings';
import OrganizerEventOrders from './pages/Org&Ad/OrganizerEventOrder';
import Navbar from './components/User/Navbar';
import Venueorderu from  "./pages/User/UderBooking"


function App () {
        
    return (
        <Routes>
            <Route path="/" element={<UserHome />} /> 
            <Route path='/loginuser' element={<UserLogin/>}/>
            <Route path='/signupuser' element={<UserSignup/>}/>
            <Route path='/profileuser' element={<UserProfile/>}/>
            <Route path='/event'element={<EventPage/>}/>
            <Route path='/adminNdOrg' element={<AdmnNdOrg/>}/>
            <Route path='/loginorg' element={<Login/>}/>
            <Route path='/signuporg' element={<Signup/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/contactus' element={<ContactUs/>}/>
            <Route path='/wedding' element={<WeddingPlanners/>}/>
            <Route path='/form' element={<VenueForm/>}/>
            <Route path='/eventForm' element={<EventForm/>}/>
            <Route path='/adminnavbar'element={<AdminNavbar/>}/>
            <Route path='/approvedorg'element={<ApprovedOrg/>}/>
            <Route path='/adminlogin' element={<AdminLogin/>}/>
            <Route path='/organizer' element={<ViewOrganizers/>}/>
            <Route path='/venue' element={<ViewVenues/>}/>
            <Route path='/viewevent' element={<ViewEvents/>}/>
            <Route path='/venuesection' element={<VenuesSection/>}/>
            <Route path= '/orgnavbar' element={<OrganizerNavbar/>}/>
            <Route path= '/venuePayments' element={<VenuePayments/>}/>
            <Route path='/graph' element={<DashboardGraph/>}/>
            <Route path='/adpage' element={<AdminPage/>}/>
            <Route path='/orgnavdash' element={<OrganizerPage/>}/>
            <Route path='/adminfooter' element={<AdminFooter/>}/>
            <Route path='/UserEventBookings' element={<UserEventBookings/>}/>
            <Route path='/OrganizerEventOrders' element={<OrganizerEventOrders/>}/>
            <Route path='/usernav' element={<Navbar/>}/>
            <Route path='/venueorder' element={<Venueorderu/>}/>
        </Routes>
    );
};

export default App;
