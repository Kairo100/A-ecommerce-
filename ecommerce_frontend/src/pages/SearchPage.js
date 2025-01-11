import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './CartContext';
import { fetchProductsBySearch } from '../services/api';
import '../css/products.css';
import Nav from './Nav';
import Footer from './Footer'

// SearchPage component definition
export default function SearchPage() {
  // Extracting search query from URL parameters
  const { query } = useParams();
  // State to hold the list of products
  const [products, setProducts] = useState([]);
  // Context to access cart functionality
  const { addToCart } = useContext(CartContext);

  // Effect to fetch products based on the search query
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProductsBySearch(query);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products for search:', error);
      }
    };

    // Fetch products only if the search query is not empty
    if (query && query.trim().length > 0) {
      getProducts();
    }
  }, [query]);

  // JSX for the SearchPage component
  return (<>
  <Nav/>
    <div className="product-list products-search">
     
      {products.length > 0 ? (
        // Filter and map the products based on the search query
        products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase()))
          .map((product) => (
            <div key={product.id} className="product-card">
              <a href={`/products/${product.slug}`}>
                <img src={product.images[0]?.image} alt={product.name} />
                <p>
                  {product.description.length > 20
                    ? `${product.description.substring(0, 20)}...`
                    : product.description}
                </p>
              </a>
              <div className="card-info">
                <h3>${product.price}</h3>
                <button onClick={() => addToCart(product.id)}>
                  <i className="bx bx-cart" title="Cart"></i>
                </button>
              </div>
            </div>
          ))
      ) : (
        // Display a message if no products are found for the search query
        <p>No products found for "{query}"</p>
      )}
    </div>
  <Footer/>
    </>

  );
}
