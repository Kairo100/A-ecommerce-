import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/nav.css";
import { fetchCategories } from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 

export default function Nav() {
  // Navigation and state management
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  

  // Fetch categories and check authentication on mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    getCategories();

    // Check if user is authenticated
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);  
    } else {
      setIsAuthenticated(false); 
    }
  }, []);

  // Blur header on scroll
  useEffect(() => {
    const blurHeader = () => {
      const header = document.getElementById("header");
      if (header) {
        window.scrollY >= 50
          ? header.classList.add("blur-header")
          : header.classList.remove("blur-header");
      }
    };

    window.addEventListener("scroll", blurHeader);

    return () => {
      window.removeEventListener("scroll", blurHeader);
    };
  }, []);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    navigate(`/search/${searchQuery}`); 
  };

  // Handle cart icon click
  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart', { state: { from: '/cart' } }); 
    } else {
      navigate('/login', { state: { from: '/cart' } });  
    }
  };

  return (
    <>
      <header className="header" id="header">
        <div className="container">
          {/* Logo Section */}
          <div className="logo">
            <Link to="/">
              <h3>LOGO</h3>
            </Link>
          </div>

          <div className="Nav">
            {/* Search Bar */}
            <div className="search-form">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
            </div>

            {/* Icons Section */}
            <div className="icon-menu">
              <Link to="/login" className="icon-link">
                <i className="bx bx-user-circle" title="Profile"></i>
              </Link>
             
              <button type="button" className="icon-link" onClick={handleCartClick}>
                <i className="bx bx-cart" title="Cart"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Line in Header */}
        <div className="categories-swiper">
          <Swiper
            spaceBetween={5}
            slidesPerView={window.innerWidth > 1200 ? 8.2 : window.innerWidth > 768 ? 5.2 : 3.2}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <a href={`/category/${category.id}`} className="category-card">
                  {category.name}
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>
    </>
  );
}
