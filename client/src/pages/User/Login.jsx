import React, { useState } from 'react';
import './Login.css'; // Importing the new CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/loginUser', // Adjusted endpoint
        { email, password }
      );
      setMessage(response.data.message || "Login successful");
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      setMessage(error.response?.data.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="login-container"> {/* Updated class name */}
        <form action="#" autoComplete="off" className='form1' onSubmit={handleSubmit}>
          <h2>Login In</h2>
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
            <a href="/signup">Signup</a>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
      <br></br>
      <Footer/>
    </>
  );
}

export default Login;
