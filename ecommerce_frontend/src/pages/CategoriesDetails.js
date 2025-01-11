import React, { useEffect, useState ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import '../css/categories.css';
import { CartContext } from './CartContext';
import Nav from './Nav';
import '../css/products.css'

// Function to fetch products based on category ID and set state
export default function CategoriesDetails() {
  const { categoryId } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  // Effect to fetch products when component mounts or categoryId changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/?category=${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  // Display loading message if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the Nav component and product list
  return (
   <>
<Nav />


<div className="product-list product-category" >

      {products.map((product) => (<>
     
          
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
        </>
      ))}
    </div>
    </>
  );
 
}
