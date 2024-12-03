// src/pages/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../Redux/Action'; // Make sure to define these actions

const Cart = () => {
  const {cart} = useSelector((state) => state); // Get cart items from Redux state
  const dispatch = useDispatch();
 
  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product)); 
  };

  // Function to handle decreasing the quantity of a product
  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product)); 
  };

  // Function to remove a product from the cart
  const handleRemoveProduct = (product) => {
    dispatch(removeFromCart(product)); 
  };

  // Calculate total price and quantity
  const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
  const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <h3>{product.name}</h3>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>

              <div>
                <button onClick={() => handleIncreaseQuantity(product)}>Increase</button>
                <button
                  onClick={() => handleDecreaseQuantity(product)}
                  disabled={product.quantity === 1}
                >
                  Decrease
                </button>
                <button onClick={() => handleRemoveProduct(product)}>Remove</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '20px' }}>
            <h3>Total Quantity: {totalQuantity}</h3>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
