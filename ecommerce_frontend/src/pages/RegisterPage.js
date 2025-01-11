import React, { useState } from "react";
import { register } from "../services/api";
import '../css/authentication.css';
import { Link } from "react-router-dom";
import Nav from './Nav'

// RegisterPage component definition
const RegisterPage = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Function to handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      alert(response.data.message);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  // JSX for the RegisterPage component
  return (
  <>
     <Nav />
   <div className="authentication">
    <div className="section">
    <div className="con">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      <div className="login-link">
        Do you have an account? <Link to="/login">Login</Link>
      </div>
    </div>
    </div>
    </div>
  </>
  );
};

export default RegisterPage;
