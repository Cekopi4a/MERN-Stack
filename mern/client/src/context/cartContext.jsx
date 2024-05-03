import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Create a new context
export const CartContext = createContext();

// Create a provider for the context
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    calculateTotalItems(storedCartItems);
  }, []);

  // Update local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    calculateTotalItems(cartItems);
  }, [cartItems]);

  const calculateTotalItems = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.quantity;
    });
    setTotalItems(total);
  };

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          // Decrease quantity if > 1
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // Remove item if quantity is 1
          return null;
        }
      }
      return item;
    }).filter(Boolean); // Filter out null values

    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ totalItems, cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};