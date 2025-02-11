import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AdmnNdOrg.css";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      setMessage('You must be logged in to access this page');
      return;
    }

    // Fetch user profile
    async function fetchProfile() {
      try {
        const response = await axios.get('http://localhost:3000/getLoggedInAdminOrg', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { username, email, Name } = response.data;
        setFormData({
          username: username || '',
          email: email || '',
          name: Name || '',
          password: '',
        });
      } catch (error) {
        console.log(error);
        setMessage('Error fetching profile data');
      }
    }
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prompt for password confirmation
    const password = prompt('Enter your password to confirm profile update:');
    if (!password) return;
  
    try {
      const dataToUpdate = { ...formData, password }; // Include password in the request
  
      const response = await axios.put('http://localhost:3000/user/updateUser', dataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setMessage('Profile updated successfully!');
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error updating profile. Ensure the password is correct.');
    }
  };
  

  const handleDeleteUser = async () => {
    const password = prompt('Enter your password to confirm account deletion:');
    if (!password) return;

    try {
      const response = await axios.delete('http://localhost:3000/deleteAdminOrg', {
        headers: { Authorization: `Bearer ${token}` },
        data: { password },
      });

      if (response.status === 200) {
        setMessage('Account deleted successfully.');
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login after deletion
      }
    } catch (error) {
      console.error(error);
      setMessage('Error deleting account. Ensure the password is correct.');
    }
  };

  return (
    <div className="profile-update-container">
      <h1 className="profile-update-title">Profile</h1>
      <form className="profile-update-form" onSubmit={handleSubmit}>
        <label className="form-label">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label form-label--password">
          Password (Leave blank to keep current):
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <button type="submit" className="profile-update-button">
          Update Profile
        </button>
      </form>
      <button onClick={handleDeleteUser} className="delete-account-button">
        Delete Account
      </button>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default ProfilePage;
