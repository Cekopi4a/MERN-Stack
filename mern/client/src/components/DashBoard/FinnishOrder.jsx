import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import io from 'socket.io-client';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:5050'); 

const FinnishOrder = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/order/getFinnishOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        });
        if (!response.ok) {
          throw new Error('Неуспешна заявка за поръчки');
        }
        const json = await response.json();

        if (Array.isArray(json)) {
          setOrders(json);
        } else {
          const ordersArray = Object.values(json.ordersByClient).flat();
          setOrders(ordersArray);
        }
      } catch (error) {
        console.error('Възникна грешка при извличане на поръчки:', error.message);
      }
    };

    fetchOrders();

    // Set up Socket.IO listener
    socket.on('orderUpdated', (change) => {
      if (change.operationType === 'update') {
        setOrders((prevOrders) => prevOrders.map(order =>
          order._id === change.documentKey._id ? { ...order, ...change.updateDescription.updatedFields } : order
        ));
      } else if (change.operationType === 'insert') {
        setOrders((prevOrders) => [...prevOrders, change.fullDocument]);
      } else if (change.operationType === 'delete') {
        setOrders((prevOrders) => prevOrders.filter(order => order._id !== change.documentKey._id));
      }
    });

    return () => {
      socket.off('orderUpdated');
    };
  }, [orders]);

  const handleApprove = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/order/putReadyOrder/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Неуспешна заявка за одобряване на поръчка');
      }

      const json = await response.json();
      setOrders((prevOrders) => prevOrders.map(order =>
        order._id === orderId ? { ...order, status: 'ready' } : order
      ));

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Поръчката беше успешно одобрена!",
        showConfirmButton: false,
        timer: 1850
      });
    } catch (error) {
      console.error('Грешка при одобряване на поръчка:', error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Грешка при одобряване на поръчка. Моля, опитайте отново.",
        showConfirmButton: false,
        timer: 1850
      });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Приключени поръчки</h1>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order._id.$oid} className="list-group-item mb-3">
          <h2>Номер на поръчка:{order._id}</h2>
          <h2>Маса: {order.userTable}</h2>
          <h3>Статус: {order.status}</h3>
          <h5>Начин на плащане: {order.paymentType}</h5>
          <h5>Общо: {order.subtotal} лв.</h5>
          <h5>Създадена на: {new Date(order.createdAt).toLocaleString()}</h5>
          <h4>Продукти:</h4>
            <ul className="list-group">
              {order.orderItems.map(item => (
                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.quantity}x</span>
                    </div>
                    <img src={item.imageUrl} alt={item.name} className="img-thumbnail" style={{ width: '100px', height: '75px', marginRight: '15px' }} />
                    <div>
                      <p><strong>{item.name}</strong></p>
                      <p>{item.weight} {item.volume}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-danger mt-3"
              onClick={() => handleApprove(order._id)}
            >
              Завърши поръчка
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinnishOrder;
