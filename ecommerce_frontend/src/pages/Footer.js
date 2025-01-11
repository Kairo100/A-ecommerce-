import React,  { useState ,useEffect}  from "react";
import '../css/Footer.css';
import { Link } from "react-router-dom";
import { subscribeToNewsletter } from '../services/api'; 
const Footer = () => {

 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await subscribeToNewsletter(email); 
    setMessage(result.message);
    if (result.success) {
      setEmail(''); 
    }
  };
  return (
    <footer className="footer-container">
      {/* Links Section */}
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* Social Media Icons Section */}
      <div className="footer-icons">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i class='bx bxl-facebook-square'></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i class='bx bxl-instagram-alt' ></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i class='bx bxl-twitter' ></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <i class='bx bxl-youtube' ></i>
          </a>
        </div>
      </div>

      {/* Email Subscription Section */}
      <div className="footer-email">
        <h4>Stay Connected</h4>
        <form  onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p>{message}</p>}
      </div>

    </footer>
  );
};

export default Footer;
