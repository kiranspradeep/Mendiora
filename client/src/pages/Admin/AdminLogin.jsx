import React, { useState } from 'react';
import '../Org&Ad/Login'; // Importing the updated CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Footer from '../../components/Footer';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Adding loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state

    try {
      const response = await axios.post(
        'http://localhost:3000/loginAdminOrg', // Adjusted endpoint
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: response.data.message || 'You have successfully logged in!',
          timer: 2000,
          showConfirmButton: false
        });

        navigate('/adminnavbar'); // Redirect after successful login
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response.data.message || 'Invalid credentials. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data.message || 'Something went wrong. Please try again later.',
      });
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false); // Stop loading state after completion
    }
  };

  return (
    <>
      <div className="login-container">
        <form action="#" autoComplete="off" className="form1" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
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
              disabled={isLoading} // Disable button during loading
            />
          </div>
          <div className="link-container">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="link-container">
            <a href="#signup">Signup</a>
          </div>
        </form>
      </div>
      <br />
      <Footer />
    </>
  );
}

export default AdminLogin;
