import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="First Name"
          />
          <label htmlFor="fname">First Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Last Name"
          />
          <label htmlFor="lname">Last Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
          />
          <label htmlFor="email">Email</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDisabled"
            id="flexRadioDisabled"
          />
          <label class="form-check-label" for="flexRadioDisabled">
            Seller
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDisabled"
            id="flexRadioCheckedDisabled"
            checked
          />
          <label class="form-check-label" for="flexRadioCheckedDisabled">
            Buyer
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Phone"
            maxLength={10}
          />
          <label htmlFor="phone">Phone</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
