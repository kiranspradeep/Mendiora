import React, { useState } from 'react';
import './Login.css'; // Importing the updated CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Footer from '../../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        'http://localhost:3000/loginAdminOrg',
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: response.data.message || 'You have logged in successfully!',
          timer: 2000,
          showConfirmButton: false
        });

        navigate('/orgnavdash');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response.data.message || 'Invalid credentials.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchData = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.log("No token found, user not authenticated");
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:3000/protectedRoute', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  return (
    <>
      <div className="login-container">
        <form action="#" autoComplete="off" className="form1" onSubmit={handleSubmit}>
          <h2>Organizer Login</h2>
          <div className="inputBox">
            <input
              type="email"
              id="user"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              aria-label="Email Address"
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              id="pass"
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              aria-label="Password"
            />
          </div>
          <div className="submit-btn-container">
            <input
              type="submit"
              value={isLoading ? 'Logging in...' : 'Login'}
              disabled={isLoading}
            />
          </div>
          <div className="link-container">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="link-container">
            <a href="/signuporg">Signup</a>
          </div>
        </form>
      </div>
      <br />
      <Footer />
    </>
  );
}

export default Login;
