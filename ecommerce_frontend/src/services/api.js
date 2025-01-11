import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/accounts/",
});

// Attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => API.post("register/", data);
export const login = (data) => API.post("login/", data);
export const getUserDetails = () => API.get("me/");

//to fetch categories from backend
const BASE_URL = 'http://127.0.0.1:8000/api/products';
  
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};



// advertisements

export const fetchAdvertisements = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/products/advertisements/');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch advertisements');
  }
};


// products
export const fetchProducts = async ( categoryId = null) => {
  const url = categoryId
  ? `http://127.0.0.1:8000/api/categories/${categoryId}/`
  : `http://127.0.0.1:8000/api/products/`;

  const response = await fetch(url);
  return await response.json();
};

export const fetchProductDetails = async (slug) => {
  const response = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`);
  return await response.json();
};

// categories detailes
export const fetchProductsByCategory = async (categoryId) => {
  const response = await fetch(`http://127.0.0.1:8000/api/products?category=${categoryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  return await response.json();
};


//cart
const BASE_URL_CART = 'http://127.0.0.1:8000/api/payment'
export const fetchCart = async () => {
  try {
    const response = await fetch(`${BASE_URL_CART}/cart/`, { credentials: 'include' });
    const data = await response.json();
    console.log('Cart items:', data.items);  
    return data.items;
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};




//Addcart

const BASE_URL_CARTs = 'http://127.0.0.1:8000/api/';
export const addToCart = async (productId) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${BASE_URL_CARTs}/cart/`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      credentials: 'include',
      body: JSON.stringify({ product_id: productId }),
    });

    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to add to cart');
  } catch (error) {
    console.error(error);
    throw error;
  }
};






//categories in product detail page
export const fetchProductsByCategoryId = async (categoryId) => {
  try {
    const url = `http://127.0.0.1:8000/api/products/?category=${categoryId}`;
    console.log("Fetching URL:", url); 
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    throw error;
  }
};


//subscribe
const API_SUBSCRIBE= axios.create({
  baseURL: "http://127.0.0.1:8000/api/accounts/",
});

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await API_SUBSCRIBE.post("subscribe/", { email });
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    const errorMsg = error.response?.data?.message || "An error occurred";
    return { success: false, message: errorMsg };
  }
};


// Fetch products by search term
const API_SEARCH = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/products',
});


export const fetchProductsBySearch = async (query) => {
  try {
    const response = await API_SEARCH.get(`?search=${query}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching products by search:', error);
    return [];
  }
};