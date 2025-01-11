import React, { useEffect, useState, useContext } from "react";
import { fetchProductDetails, fetchProductsByCategoryId } from "../services/api";
import { useParams, useNavigate, Link } from "react-router-dom"; 
import "../css/products.css";
import Nav from "./Nav";
import { CartContext } from './CartContext';

export default function ProductDetails() {
  // Extracting slug from URL parameters
  const { slug } = useParams();
  // State to hold product details, category products, and selected image
  const [product, setProduct] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(null); 
  // Context to access cart functionality
  const { addToCart } = useContext(CartContext);
  // Navigation hook
  const navigate = useNavigate(); 

  // Effect to fetch product details and related products
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        console.log("Fetching product details for slug:", slug);
        const data = await fetchProductDetails(slug);
        if (data) {
          console.log("Fetched product data:", data); 
          setProduct(data);
  
          
          if (data.category) {
            console.log("Fetching category products for category:", data.category);
            const productsInCategory = await fetchProductsByCategoryId(data.category); 
            setCategoryProducts(productsInCategory);
          } else {
            console.error("No category ID found in product data.");
          }
  
          
          if (data.images?.length > 0) {
            setSelectedImage(data.images[0]);
          } else {
            console.error("No images available for this product.");
          }
        } else {
          console.error("No product data returned.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
  
    getProductDetails();
  }, [slug]);

  // Conditional rendering for loading state
  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Nav />
      <div className="product-details">
        {/* Thumbnails Section */}
        <div className="thumbnails">
          {product.images?.map((image) => (
            <div
              key={image.id}
              className={`thumbnail ${selectedImage?.id === image.id ? "active" : ""}`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.image}
                alt={image.alt_text}
                className="thumbnail-image"
              />
            </div>
          ))}
        </div>

        {/* Main Selected Image */}
        {selectedImage && (
          <div className="main-image-div">
            <img
              src={selectedImage.image}
              alt={selectedImage.alt_text || "Selected Product Image"}
              className="main-image"
            />
          </div>
        )}

        <div className="products-info">
          {/* Product Details */}
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <div className="btns">
            <button onClick={() => addToCart(product.id)} className="btnAddCart">
              Add to Cart
            </button>
            
          </div>
        </div>
      </div>


     

      {/* Products in the Same Category */}
      <h3>Related Products</h3>
      {categoryProducts.length > 0 ? (
        <div className="product-list">
        
          <div className="product-card">
            {categoryProducts.filter(categoryProduct => categoryProduct.id !== product.id).map((categoryProduct) => (
              <div key={categoryProduct.id} className="category-product-card">
                <div
                  className="category-product-link"
                     >
                  <Link to={`/products/${categoryProduct.slug}`}>
                  <img
                    src={categoryProduct.images[0]?.image}
                    alt={categoryProduct.name}
                    className="category-product-image"
                  />
              <p>{product.description.length > 20 ? `${product.description.substring(0, 20)}...` : product.description}</p>
         
                  </Link>
                </div>
                <div className='card-info'>

         <h3>${product.price}</h3>
          <button onClick={() => addToCart(product.id)}>
            <i className="bx bx-cart" title="Cart"></i>
          </button>
          </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-category-products">
          <p>No other products available in this category.</p>
        </div>
      )}
    </>
  );
}
