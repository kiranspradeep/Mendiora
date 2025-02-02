import React, { useState } from 'react';
import axios from 'axios';
import './VenueForm.css'; // Import the CSS file

const VenueForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    // location: '',
    address: '',
    city:"",
    state:"",
    country:"",
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
    <label>
      Venue Name:
      <input type="text" name="name" placeholder='VENUE-NAME' onChange={handleChange} required />
    </label>
  
    <label>
      Description:
      <textarea name="description" placeholder='DESCRIPTION' onChange={handleChange} required />
    </label>
  
    <label>
      Address:
      <input type="text" name="address" placeholder='ADDRESS' onChange={handleChange} required />
    </label>
  
    <label>
      City:
      <input type="text" name="city" placeholder='CITY' onChange={handleChange} required />
    </label>
  
    <label>
      State:
      <input type="text" name="state" placeholder='STATE' onChange={handleChange} required />
    </label>
  
    <label>
      Country:
      <input type="text" name="country" placeholder='COUNTRY' onChange={handleChange} required />
    </label>
  
    <label>
      Capacity:
      <input type="number" name="capacity" placeholder='CAPACITY' onChange={handleChange} required />
    </label>
  
    <label>
      Minimum Price:
      <input type="number" name="minPrice" placeholder='MIN-PRICE' onChange={handleChange} required />
    </label>
  
    <label>
      Maximum Price:
      <input type="number" name="maxPrice" placeholder='MAX-PRICE' onChange={handleChange} required />
    </label>
  
    <label>
      Categories (comma separated):
      <input type="text" name="categories" placeholder='CATEGORIES' onChange={handleChange} required />
    </label>
  
    <label>
      Unavailable Dates (yy-mm-dd format):
      <input type="text" name="unavailableDates" placeholder='YY-MM-DD' onChange={handleChange} />
    </label>
  
    <label>
      Images (Upload Multiple):
      <input type="file" name="images" multiple onChange={handleFileChange} required />
    </label>
  
    <button type="submit">Create Venue</button>
  </form>
  
  );
};

export default VenueForm;
