// src/redux/actions.js
import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from './ActionType';

// Action to add a product to the cart
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

// Action to remove a product from the cart
export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  payload: product,
});

// Action to increase the quantity of a product
export const increaseQuantity = (product) => ({
  type: INCREASE_QUANTITY,
  payload: product,
});

// Action to decrease the quantity of a product
export const decreaseQuantity = (product) => ({
  type: DECREASE_QUANTITY,
  payload: product,
});
