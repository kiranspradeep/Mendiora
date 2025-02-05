import React, { useState, useRef } from 'react';
import axios from 'axios';
import './VenueForm.css';

const allowedCategories = [
  "Corporate Event Management",
  "Wedding Planners & Management",
  "Entertainment & Show Management",
  "Birthday Party & Venue Management"
];

const VenueForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    capacity: '',
    minPrice: '',
    maxPrice: '',
    categories: [],
    unavailableDates: [],
    images: null,
  });

  const [newDate, setNewDate] = useState('');
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      categories: checked
        ? [...prevData.categories, value]
        : prevData.categories.filter((category) => category !== value),
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleAddDate = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Format YYYY-MM-DD
    if (!dateRegex.test(newDate)) {
      alert('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }

    const selectedDate = new Date(newDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Ignore time part for accurate comparison

    if (selectedDate <= currentDate) {
      alert('Date must be greater than the current date.');
      return;
    }

    if (formData.unavailableDates.includes(newDate)) {
      alert('Date already added.');
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      unavailableDates: [...prevData.unavailableDates, newDate],
    }));
    setNewDate('');
  };

  const handleRemoveDate = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      unavailableDates: prevData.unavailableDates.filter((d) => d !== date),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        for (let i = 0; i < formData[key]?.length; i++) {
          formDataToSend.append('images', formData[key][i]);
        }
      } else if (key === 'categories') {
        formDataToSend.append(key, formData[key].join(',')); 
      } else if (key === 'unavailableDates') {
        formData[key].forEach((date) => formDataToSend.append('unavailableDates', date)); 
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/venue/createVenue', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      setFormData({
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        country: '',
        capacity: '',
        minPrice: '',
        maxPrice: '',
        categories: [],
        unavailableDates: [],
        images: null,
      });
  
      fileInputRef.current.value = '';
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating venue');
    }
  };
  

  return (
    <>
    <div className="form-container">
    <form className="venue-form" onSubmit={handleSubmit}>
      <h2 className='venue-form-h2'>Venue Application Form</h2>
      <label>
        Venue Name:
        <input type="text" name="name" placeholder="VENUE-NAME" onChange={handleChange} value={formData.name} required />
      </label>

      <label>
        Description:
        <textarea name="description" placeholder="DESCRIPTION" onChange={handleChange} value={formData.description} required />
      </label>

      <label>
        Address:
        <input type="text" name="address" placeholder="ADDRESS" onChange={handleChange} value={formData.address} required />
      </label>

      <label>
        City:
        <input type="text" name="city" placeholder="CITY" onChange={handleChange} value={formData.city} required />
      </label>

      <label>
        State:
        <input type="text" name="state" placeholder="STATE" onChange={handleChange} value={formData.state} required />
      </label>

      <label>
        Country:
        <input type="text" name="country" placeholder="COUNTRY" onChange={handleChange} value={formData.country} required />
      </label>

      <label>
        Capacity:
        <input type="number" name="capacity" placeholder="CAPACITY" onChange={handleChange} value={formData.capacity} required />
      </label>

      <label>
        Minimum Price:
        <input type="number" name="minPrice" placeholder="MIN-PRICE" onChange={handleChange} value={formData.minPrice} required />
      </label>

      <label>
        Maximum Price:
        <input type="number" name="maxPrice" placeholder="MAX-PRICE" onChange={handleChange} value={formData.maxPrice} required />
      </label>

      <label>Categories (Select One or More):</label>
      {allowedCategories.map((category) => (
        <div key={category}>
          <input
            type="checkbox"
            id={category}
            value={category}
            onChange={handleCategoryChange}
            checked={formData.categories.includes(category)}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}

      <label>
        Add Unavailable Date (YYYY-MM-DD format):
        <input type="text" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <button type="button" onClick={handleAddDate}>Add Date</button>
      </label>

      <ul>
        {formData.unavailableDates.map((date, index) => (
          <li key={index}>
            {date}
            <button type="button" onClick={() => handleRemoveDate(date)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <label>
        Images (Upload Multiple):
        <input type="file" name="images" multiple onChange={handleFileChange} ref={fileInputRef} required />
      </label>

      <button type="submit">Create Venue</button>
    </form>
    </div>
    </>
  );
};

export default VenueForm;
