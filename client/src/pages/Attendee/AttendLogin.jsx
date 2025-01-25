import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AttendLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/loginAtt', // Adjusted endpoint
        { email, password }
      );
      setMessage(response.data.message || "Login successful");
      navigate('/home'); // Redirect to home after successful login
    } catch (error) {
      setMessage(error.response?.data.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container"> {/* Updated class name */}
      <form action="#" autoComplete="off" className='form1' onSubmit={handleSubmit}>
        <h2>Attendee Login</h2>
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
  );
}

export default AttendLogin;
