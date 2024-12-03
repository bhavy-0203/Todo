// src/pages/Home.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/Action';
import { Link } from 'react-router-dom';

const Home = () => {
  // Local state to manage form inputs
  const [product, setProduct] = useState({
    name: '',
    image: '',
    price: '',
    quantity: 1,
  });

  const dispatch = useDispatch();

  // Handle changes in form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to add product to cart
    const newProduct = {
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
    };
    dispatch(addToCart(newProduct));

    // Reset form after submission
    setProduct({
      name: '',
      image: '',
      price: '',
      quantity: 1,
    });
  };

  return (
    <div>
      <h1>Welcome to the Product Store</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Product Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <button type="submit">Add Product to Cart</button>
      </form>

      <Link to="/cart">
        <button>Go to Cart</button>
      </Link>
    </div>
  );
};

export default Home;
