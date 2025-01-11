import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { fetchProducts } from '../services/api';
import '../css/products.css';

export default function ProductList() {
  // State to hold the list of products
  const [products, setProducts] = useState([]);
  // Context to access cart functionality
  const { addToCart } = useContext(CartContext);

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <a href={`/products/${product.slug}`}>
            <img src={product.images[0]?.image} alt={product.name} />
            <p>{product.description.length > 20 ? `${product.description.substring(0, 20)}...` : product.description}</p>
           
          </a>
         <div className='card-info'>

         <h3>${product.price}</h3>
          <button onClick={() => addToCart(product.id)}>
            <i className="bx bx-cart" title="Cart"></i>
          </button>
         </div>
        </div>
      ))}
    </div>
  );
}
