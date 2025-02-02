import React, { useState } from 'react';
import axios from 'axios';
import './VenueForm.css'; // Import the CSS file

const VenueForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    capacity: '',
    minPrice: '',
    maxPrice: '',
    categories: '',
    unavailableDates: '',
    images: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await axios.post('http://localhost:3000/venue', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form className="venue-form" onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Venue Name" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
      <input type="number" name="capacity" placeholder="Capacity" onChange={handleChange} required />
      <input type="number" name="minPrice" placeholder="Minimum Price" onChange={handleChange} required />
      <input type="number" name="maxPrice" placeholder="Maximum Price" onChange={handleChange} required />
      <input type="text" name="categories" placeholder="Categories (comma separated)" onChange={handleChange} required />
      <input type="text" name="unavailableDates" placeholder="Unavailable Dates (JSON format)" onChange={handleChange} />
      <input type="file" name="images" multiple onChange={handleFileChange} required />
      <button type="submit">Create Venue</button>
    </form>
  );
};

export default VenueForm;
