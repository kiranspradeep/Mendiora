import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Footer from '../../components/Footer';

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/user/loginUser',
        { email, password }
      );
      localStorage.setItem("token", response.data.token);

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: response.data.message || 'You have logged in successfully!',
        timer: 2000, // Optional: Auto close after 2 seconds
        showConfirmButton: false
      });

      navigate('/');
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <>
      <div className="login-container">
        <form action="#" autoComplete="off" className='form1' onSubmit={handleSubmit}>
          <h2>User Login</h2>
          <div className="inputBox">
            <input type="email" id="user" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className="inputBox">
            <input type="password" id="pass" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <input type="submit" />
          <div className="link-container">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="link-container">
            <a href="/signupuser">Signup</a>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UserLogin;
