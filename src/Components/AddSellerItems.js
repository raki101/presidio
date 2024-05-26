import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerItems = () => {
  let navigate = useNavigate();

  const [sell, setSell] = useState({
    place: "",
    area: "",
    description: "",
  });

  const onChange = (e) => {
    setSell({ ...sell, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { place, area, description } = sell;

    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place, area, description }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      // Clear the form or do any other UI updates
      setSell({
        place: "",
        area: "",
        description: "",
      });

      // Navigate to the desired page
      navigate("/displayselleritems");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container my-3">
      <h1>Add an item</h1>
      <form className="my-3" onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="place" className="form-label">
            Place
          </label>
          <input
            type="text"
            className="form-control"
            id="place"
            name="place"
            value={sell.place}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">
            Area
          </label>
          <input
            type="text"
            className="form-control"
            id="area"
            name="area"
            value={sell.area}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={sell.description}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add item
        </button>
      </form>
    </div>
  );
};

export default SellerItems;
