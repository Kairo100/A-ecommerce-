import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../css/cart.css';
import Nav from './Nav';

// CartPage component
export default function CartPage() {
  const { cart, total, setCart,deleteFromCart } = useContext(CartContext); 
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  // Check authentication on component mount
  useEffect(() => {
   
    const checkAuth = async () => {
    
      const auth = true; 
      setIsAuthenticated(auth);
    };
    checkAuth();
  }, []);

  // Handle checkout button click
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to checkout.');
      return;
    }
    
    const isAuthenticated = true; 
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/order-complete', { state: { selectedItems } });
    }
  };
  
  
  // Handle delete button click
  const handleDelete = async (itemId) => {
    try {
      await deleteFromCart(itemId); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle item selection
  const handleSelect = (item) => {
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
   
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
    } else {
     
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
   
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart); 
  };

  // Calculate total for selected items
  const selectedItemsTotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Render the CartPage component
  return (
    <>
      <Nav />
      <div className="cart-page">
        <div className="cart-items">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                 
                  <input
                    type="checkbox"
                    checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                    onChange={() => handleSelect(item)}
                  />
                  
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={`http://127.0.0.1:8000${item.images[0].image}`}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  ) : (
                    <p>No image available</p>
                  )}

                  <div className="cart-info">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price}</p>

                    {/* Quantity input */}
                 <div className='btncart'>
                 <div className="quantity-container">
                          <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      />
                         </div>

                    <button onClick={() => handleDelete(item.id)} className="delete-button">
                    <i class='bx bx-trash'></i>
                    </button>
                 </div>
                  </div>
                </div>
              ))}
            </>
          )}
         
      
        </div>

       
        {selectedItems.length > 0 && (
          <div className="selected-items">
            <h3>Selected Items</h3>
            {selectedItems.map((item) => (
              <div key={item.id} className="selected-item-card">
                
                {item.images && item.images.length > 0 ? (
                  <img
                    src={`http://127.0.0.1:8000${item.images[0].image}`}
                    alt={item.name}
                    className="cart-item-image"
                  />
                ) : (
                  <p>No image available</p>
                )}
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                  <p>Total: ${item.price * item.quantity}</p>
                  
                </div>
              </div>
            ))}

           
            <div className="selected-items-total">
              <h4>Total for Selected Items: ${selectedItemsTotal.toFixed(2)}</h4>

         
              <button onClick={handleCheckout} className="place-order-button">
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
