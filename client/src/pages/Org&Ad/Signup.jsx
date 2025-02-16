import React, { useState } from 'react';
import './Signup.css'; // Importing the new CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Footer from '../../components/Footer';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name, setName] = useState(""); // New field

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/signupAdminOrg', // Adjusted endpoint
        { username, email, password, Name }
      );

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Signup Successful',
        text: response.data.message || 'Your account has been created successfully!',
        timer: 2000,
        showConfirmButton: false
      });

      // Clear form and redirect
      setEmail("");
      setName("");
      setPassword("");
      setUsername("");
      navigate('/loginorg');
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <>
      <div className="signup-container">
        <form action="#" autoComplete="off" className='form1' onSubmit={handleSubmit}>
          <h2>Organizer Signup</h2>
          <div className="inputBox">
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="inputBox">
            <input
              type="text"
              id="Name"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
          </div>
          <div className="inputBox">
            <input
              type="email"
              id="user"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
            />
          </div>
          <input type="submit" value="Signup" />
          <div className="link-container">
            <a href="/loginorg">Already have an account? Login</a>
          </div>
        </form>
      </div>
      <br></br>
      <Footer />
    </>
  );
}

export default Signup;
