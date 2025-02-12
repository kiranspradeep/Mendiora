import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import "./EventForm.css";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    date: "",
    capacity: "",
    basePrice: "",
    premiumAccess: false,
    addOnServices: [],
    featuredPerformer: "",
    category: "",
    images: [],
  });

  const fileInputRef = useRef();
  const allowedCategories = ["Corporate Event", "Music Concerts", "Fashion shows", "Dj Party"];
  const addOnOptions = ["Catering", "Parking", "Security", "Wi-Fi"];

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  const handleAddOnChange = useCallback((e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedAddOns = checked
        ? [...prev.addOnServices, value]
        : prev.addOnServices.filter((service) => service !== value);
      return { ...prev, addOnServices: updatedAddOns };
    });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    for (const key in formData) {
      if (key === "images") {
        for (let i = 0; i < formData[key]?.length; i++) {
          formDataToSend.append("images", formData[key][i]);
        }
      } else if (key === "addOnServices") {
        formData.addOnServices.forEach((service) => formDataToSend.append("addOnServices", service));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/event/createEvents", formDataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Event created successfully!");
      
      // Reset form fields
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        date: "",
        capacity: "",
        basePrice: "",
        premiumAccess: false,
        addOnServices: [],
        featuredPerformer: "",
        category: "",
        images: [],
      });
  
      // Clear file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error creating event", error);
      alert(`Error creating event: ${error.response?.data?.message || error.message}`);
    }
  }, [formData]);
  

  return (
    <div className="eventForm-body">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required />
        <input type="number" name="basePrice" placeholder="Base Price" value={formData.basePrice} onChange={handleChange} required />
        
        <label>
          Premium Access:
          <input type="checkbox" name="premiumAccess" checked={formData.premiumAccess} onChange={handleChange} />
        </label>
        
        <fieldset>
          <legend>Add-On Services:</legend>
          {addOnOptions.map((option) => (
            <label key={option}>
              <input type="checkbox" value={option} checked={formData.addOnServices.includes(option)} onChange={handleAddOnChange} /> {option}
            </label>
          ))}
        </fieldset>

        <input type="text" name="featuredPerformer" placeholder="Featured Performer" value={formData.featuredPerformer} onChange={handleChange} />
        
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {allowedCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input type="file" multiple ref={fileInputRef} onChange={handleChange} />
        
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;