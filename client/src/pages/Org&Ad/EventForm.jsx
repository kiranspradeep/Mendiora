import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import "./EventForm.css";
import OrganizerNavbar from "../../components/Org/organizerNavbar";
import OrganizerFooter from "../../components/Org/OrganizerFooter";

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
  
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const allowedCategories = ["Corporate Event", "Music Concerts", "Fashion shows", "Dj Party"];
  const addOnOptions = ["Catering", "Parking", "Security", "Wi-Fi"];

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, images: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
    setLoading(true); 
    
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
      await axios.post("http://localhost:3000/event/createEvent", formDataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Event created successfully!");
      
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

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error creating event", error);
      alert(`Error creating event: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  }, [formData]);
  return (
    <>
    <OrganizerNavbar/>
    <div className="eventForm-body">
      <form className="form3"onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>

        <div className="form-group full-width">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="basePrice">Base Price:</label>
          <input type="number" id="basePrice" name="basePrice" value={formData.basePrice} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            Premium Access:
            <input type="checkbox" name="premiumAccess" checked={formData.premiumAccess} onChange={handleChange} />
          </label>
        </div>

        <fieldset>
          <legend>Add-On Services:</legend>
          {addOnOptions.map((option) => (
            <label key={option}>
              <input type="checkbox" value={option} checked={formData.addOnServices.includes(option)} onChange={handleAddOnChange} /> {option}
            </label>
          ))}
        </fieldset>

        <div className="form-group">
          <label htmlFor="featuredPerformer">Featured Performer:</label>
          <input type="text" id="featuredPerformer" name="featuredPerformer" value={formData.featuredPerformer} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {allowedCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group full-width">
            <label htmlFor="images">Upload Images:</label>
            <input type="file" id="images" multiple ref={fileInputRef} onChange={handleChange} />
          </div>

          <button  type="submit" disabled={loading} className={loading ? "button-loading" : ""}>
            {loading ? (
              <>
                Creating Event... <span className="spinner"></span>
              </>
            ) : (
              "Create Event"
            )}
          </button>
      </form>
    </div>
    <OrganizerFooter/>
    </>
  );
};

export default EventForm;
