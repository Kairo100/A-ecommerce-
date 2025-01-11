// Importing necessary components and hooks
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import '../css/OrderCompletePage.css';

// Defining the OrderCompletePage component
export default function OrderCompletePage() {
  // Setting up navigation
  const navigate = useNavigate();

  // Handling continue shopping button click
  const handleContinueShopping = () => {
    navigate('/');
  };

  // Rendering the component
  return (
    <>
    <Nav />
    <div className="order-complete-page">
      
      <div className="order-complete-content">
        <h1 className="order-complete-title">Thank You for Your Order!</h1>
        <p className="order-complete-message">Your order has been successfully placed. We will process it shortly.</p>
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
     
    </div>
     <Footer />
    </>
  );
}
