import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Create a new context
export const OrderContext = createContext();

// Create a provider for the context
export const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);
  let totalItems = 0;
  

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedorderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    setOrderItems(storedorderItems);
    
  }, []);

  // Update local storage whenever cart items change
  useEffect(() => {

    localStorage.setItem('orderItems', JSON.stringify(orderItems));
  }, [orderItems]);



  const addOrder = (paymentType, subtotal) => {
    // const existingItemIndex = orderItems.findIndex((orderItem) => orderItem.id === item.id);

    // if (existingItemIndex !== -1) {
    //   const updatedorderItems = [...orderItems];
    //   updatedorderItems[existingItemIndex].quantity += 1;
    //   setOrderItems(updatedorderItems);
    // } else {
    //   setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    // }

     // Проверка за съществуващ обект в localStorage
     let orderItems = JSON.parse(localStorage.getItem('cartItems'));

     if (orderItems) {
         // Добавяне на новите параметри към обекта
         orderItems.paymentType = paymentType;
         orderItems.subtotal = subtotal;
 
         // Пресмятане на общата цена, ако има елементи
         if (orderItems.items && orderItems.items.length > 0) {
             let totalPrice = orderItems.items.reduce((total, item) => total + item.price, 0);
             orderItems.totalPrice = totalPrice;
         }
 
         // Запазване на обновения обект в localStorage
         localStorage.setItem('cartItems', JSON.stringify(orderItems));
        console.log(orderItems);
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

