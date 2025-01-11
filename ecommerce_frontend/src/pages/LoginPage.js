import React, { useState } from "react";
import { login } from "../services/api";  
import '../css/authentication.css';
import { Link } from "react-router-dom"; 
import Nav from './Nav'; 
import { useNavigate, useLocation } from "react-router-dom";

// LoginPage component definition
const LoginPage = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Function to handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Using react-router-dom hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      alert("Login successful!");
      navigate(from);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  // JSX for the LoginPage component
  return (
    <>
      <Nav />
      <div className="authentication">
        <div className="section">
          <div className="con">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                onChange={handleChange} 
                value={formData.username}
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                onChange={handleChange} 
                value={formData.password}
              />
              <button type="submit">Login</button>
            </form>
            <div className="login-link">
              New User? Register Here <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
