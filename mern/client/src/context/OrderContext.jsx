import React, { createContext, useState, useEffect } from 'react';

// Create a new context
export const OrderContext = createContext();

// Create a provider for the context
export const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderItem, setOrderItem ] = useState([]);
  let totalItems = 0;
  

  const addOrder = (paymentType, subtotal) => {
   

     // Проверка за съществуващ обект в localStorage
     let orderItems = JSON.parse(localStorage.getItem('cartItems'));

     if (orderItems) {
         // Добавяне на новите параметри към обекта
         orderItems.paymentType = paymentType;
         orderItems.subtotal = subtotal;
 
 
         // Запазване на обновения обект в localStorage
         localStorage.setItem('orderItems', JSON.stringify(orderItems));
         setOrderItems(orderItems);
        console.log(orderItems)
         console.log('Начинът на плащане, крайната сума и общата цена бяха успешно добавени към обекта в localStorage.');
     } else {
         console.log('Не може да се намери съществуващ обект в localStorage.');
     }

  };


  const deleteFromCart = (itemId) => {
    const updatedorderItems = orderItems.filter((item) => item.id !== itemId);
    setOrderItems(updatedorderItems);
  };

  const removeFromCart = (itemId) => {
    const updatedorderItems = orderItems.map((item) => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          // Decrease quantity if > 1
          return { ...item, quantity: item.quantity - 1 ,totalItems: orderItems.quantity};
        } else {
          // Remove item if quantity is 1
          return null;
        }
      }
      return item;
    }).filter(Boolean); // Filter out null values

    setOrderItems(updatedorderItems);
  };

  return (
    <OrderContext.Provider value={{ totalItems,orderItems, addOrder, removeFromCart }}>
      {children}
    </OrderContext.Provider>
  );
};

