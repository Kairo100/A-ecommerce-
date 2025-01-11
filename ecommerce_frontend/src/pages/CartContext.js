import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creating the context for the cart
export const CartContext = createContext();

// Setting up the API with base URL and credentials
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/payment',
  withCredentials: true, // Ensure credentials are included in requests
});

// Attaching token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CartProvider component
export function CartProvider({ children }) {
  // State for cart, total, loading, and error
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch cart data
  const fetchCart = async () => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await API.get('/cart/');
      if (response.status === 200) {
        setCart(response.data.items);
        setTotal(response.data.total);
      } else {
        setError('Failed to fetch cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to fetch cart');
    } finally {
      setLoading(false); 
    }
  };

  // Function to add product to cart
  const addToCart = async (productId) => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await API.post('/cart/', { product_id: productId });
      if (response.status === 200) {
        await fetchCart(); 
      } else {
        setError('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add product to cart');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete product from cart
  const deleteFromCart = async (itemId) => {
    setLoading(true);
    setError(null); 
    try {
      const response = await API.delete('/cart/', { data: { item_id: itemId } });
      if (response.status === 200) {
        await fetchCart(); 
      } else {
        setError('Failed to delete item from cart');
      }
    } catch (error) {
      console.error('Error deleting from cart:', error);
      setError('Failed to delete item from cart');
    } finally {
      setLoading(false); 
    }
  };

  // Fetch cart data on initial load and re-fetch on successful addToCart
  useEffect(() => {
    fetchCart();
  }, []); 

  return (
    <CartContext.Provider
    value={{ cart, setCart, total, addToCart, deleteFromCart, loading, error }}
  >
    {children}
  </CartContext.Provider>
  );
}
