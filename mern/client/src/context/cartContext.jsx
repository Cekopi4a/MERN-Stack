// import { createContext, useReducer } from 'react'

// export const CartContext = createContext()

// export const CartReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_CART': 
//       return {
//        carts: action.payload
//       }
//     case 'CREATE_CART':
//       return {
//        carts: [action.payload, state.carts]
//       }
//     case 'DELETE_CART':
//       return {
//         carts: state.carts.filter((w) => w._id !== action.payload._id)
//       }
//     default:
//       return state
//   }
// }


// export const CartContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(CartReducer, {
//     carts: null
//   })

//   return (
//     <CartContext.Provider value={{...state, dispatch}}>
//       { children }
//     </CartContext.Provider>
//   )
// }

import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Create a new context
export const CartContext = createContext();

// Create a provider for the context
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  let totalItems = 0;
  

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    
  }, []);

  // Update local storage whenever cart items change
  useEffect(() => {

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);



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

  const deleteFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          // Decrease quantity if > 1
          return { ...item, quantity: item.quantity - 1 ,totalItems: cartItems.quantity};
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
    <CartContext.Provider value={{ totalItems,cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
