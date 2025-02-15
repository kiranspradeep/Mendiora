import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import "./VenueForm.css";
import OrganizerNavbar from "../../components/Org/organizerNavbar";
import OrganizerFooter from "../../components/Org/OrganizerFooter";

const VenueForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    capacity: "",
    minPrice: "",
    maxPrice: "",
    categories: [],
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const allowedCategories = [
    "Corporate Event Management",
    "Wedding Planners & Management",
    "Entertainment & Show Management",
    "Birthday Party & Venue Management",
  ];

  const handleChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, images: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleCategoryChange = useCallback((e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedCategories = checked
        ? [...prev.categories, value]
        : prev.categories.filter((category) => category !== value);
      return { ...prev, categories: updatedCategories };
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "images") {
          for (let i = 0; i < formData[key]?.length; i++) {
            formDataToSend.append("images", formData[key][i]);
          }
        } else if (key === "categories") {
          formData.categories.forEach((category) => formDataToSend.append("categories", category));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:3000/venue/createVenue", formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Venue created successfully!");
        setFormData({
          name: "",
          address: "",
          city: "",
          state: "",
          country: "",
          capacity: "",
          minPrice: "",
          maxPrice: "",
          categories: [],
          images: [],
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error creating venue", error);
        alert(`Error creating venue: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  return (
    <>
      <OrganizerNavbar />
      <div className="venueForm-body">
        <form className="form3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Venue Name:</label>
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
            <label htmlFor="capacity">Capacity:</label>
            <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="minPrice">Minimum Price:</label>
            <input type="number" id="minPrice" name="minPrice" value={formData.minPrice} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Maximum Price:</label>
            <input type="number" id="maxPrice" name="maxPrice" value={formData.maxPrice} onChange={handleChange} required />
          </div>

          <fieldset>
            <legend>Categories:</legend>
            {allowedCategories.map((category) => (
              <label key={category}>
                <input type="checkbox" value={category} checked={formData.categories.includes(category)} onChange={handleCategoryChange} />{" "}
                {category}
              </label>
            ))}
          </fieldset>

          <div className="form-group full-width">
            <label htmlFor="images">Upload Images:</label>
            <input type="file" id="images" multiple ref={fileInputRef} onChange={handleChange} />
          </div>

          <button type="submit" disabled={loading} className={loading ? "button-loading" : ""}>
            {loading ? (
              <>
                Creating Venue... <span className="spinner"></span>
              </>
            ) : (
              "Create Venue"
            )}
          </button>
        </form>
      </div>
      <OrganizerFooter/>
    </>
  );
};

export default VenueForm;
