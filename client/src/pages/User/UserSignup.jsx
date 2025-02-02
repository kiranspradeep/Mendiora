import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

function UserSignup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Name, setName] = useState(""); // New field
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/user/signupUser', // Adjusted endpoint
        { username, email, password, Name } // Include new fields
      );
      setMessage(response.data.message || "Signup successful");
      navigate('/loginuser'); // Redirect to login after successful signup
    } catch (error) {
      setMessage(error.response?.data.message || "Something went wrong");
    }
  };

  return (
    <>
    <div className="signup-container"> {/* Updated class name */}
      <form action="#" autoComplete="off" className='form1' onSubmit={handleSubmit}>
        <h2>User Sign Up</h2>
        <div className="inputBox">
          <input type="text" id="username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} value={username} />
        </div>
        <div className="inputBox">
          <input type="text" id="Name" placeholder="Name" required onChange={(e) => setName(e.target.value)} value={Name} />
        </div>
        <div className="inputBox">
          <input type="email" id="user" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="inputBox">
          <input type="password" id="pass" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <input type="submit" />
        <div className="link-container">
          <a href="/loginuser">Already have an account? Login</a>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default UserSignup;


//jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj