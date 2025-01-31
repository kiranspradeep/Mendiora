import React, { useState } from "react";
import axios from "axios";
import "./VenueForm.css";

const VenueForm = ({ onSuccess, token }) => {
  const [venue, setVenue] = useState({
    name: "",
    description: "",
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
    },
    capacity: "",
    minPrice: "",
    maxPrice: "",
    categories: [],
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categoryOptions = [
    "marriage",
    "music event",
    "corporate event",
    "get-together",
    "birthday party",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setVenue((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setVenue((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setVenue((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value),
    }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
          
    const token = localStorage.getItem("token")
    try {
      console.log(token);
      
      const formData = new FormData();
      formData.append("name", venue.name);
      formData.append("description", venue.description);
      formData.append("location", JSON.stringify(venue.location)); // Ensure server can parse it as JSON
      formData.append("capacity", venue.capacity);
      formData.append("minPrice", venue.minPrice);
      formData.append("maxPrice", venue.maxPrice);
      venue.categories.forEach((category) => formData.append("categories", category));
      Array.from(images).forEach((image) => formData.append("images", image)); // Handle multiple images

      const res = await axios.post(
        "http://localhost:3000/venue/createVenue",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        onSuccess(res.data.venue);
        console.log(res.data);
        
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="venue-form">
      <h2>Create Venue</h2>
      {error && <p className="error">{error}</p>}

      <label>Name:</label>
      <input type="text" name="name" value={venue.name} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={venue.description} onChange={handleChange} required />

      <label>Address:</label>
      <input type="text" name="location.address" value={venue.location.address} onChange={handleChange} required />

      <label>City:</label>
      <input type="text" name="location.city" value={venue.location.city} onChange={handleChange} required />

      <label>State:</label>
      <input type="text" name="location.state" value={venue.location.state} onChange={handleChange} required />

      <label>Country:</label>
      <input type="text" name="location.country" value={venue.location.country} onChange={handleChange} required />

      <label>Capacity:</label>
      <input type="number" name="capacity" value={venue.capacity} onChange={handleChange} required />

      <label>Min Price:</label>
      <input type="number" name="minPrice" value={venue.minPrice} onChange={handleChange} required />

      <label>Max Price:</label>
      <input type="number" name="maxPrice" value={venue.maxPrice} onChange={handleChange} required />

      <label>Images:</label>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />

      <label>Categories:</label>
      <div className="category-container">
        {categoryOptions.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={venue.categories.includes(category)}
              onChange={handleCategoryChange}
            />
            {category}
          </label>
        ))}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default VenueForm;
