import React, { useState } from 'react';
import './Login.css'; // Importing the updated CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Adding loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state
    setMessage(''); // Clear previous messages
  
    try {
      const response = await axios.post(
        'http://localhost:3000/loginAdminOrg', // Adjusted endpoint
        { email, password }
      );
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setMessage(response.data.message || 'Login successful');
        navigate('/'); // Redirect to home after successful login
      } else {
        setMessage(response.data.message || 'Login Failed');
      }
    } catch (error) {
      setMessage(error.response?.data.message || 'Something went wrong');
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false); // Stop loading state after completion
    }
  };
  
  const fetchData = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  
    if (!token) {
      console.log("No token found, user not authenticated");
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:3000/protectedRoute', {
        headers: {
          'Authorization': `Bearer ${token}` // Send the token in the Authorization header
        }
      });
  
      // Handle the response from the protected route
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };
  

  return (
    <>
      <div className="login-container"> {/* Keeping original class name */}
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
              aria-label="Email Address" // Accessibility improvement
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
              aria-label="Password" // Accessibility improvement
            />
          </div>
          <div className="submit-btn-container">
            <input
              type="submit"
              value={isLoading ? 'Logging in...' : 'Login'}
              disabled={isLoading} // Disable button during loading
            />
          </div>
          <div className="link-container">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="link-container">
            <a href="/signuporg">Signup</a>
          </div>
          {message && <p>{message}</p>} {/* Error message styling */}
        </form>
      </div>
      <br />
      <Footer />
    </>
  );
}

export default Login;
