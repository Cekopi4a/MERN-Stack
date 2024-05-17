import { Outlet, useNavigate,useLocation,Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';
import {useAuthContext} from '../../hooks/useAuthContext';

const AllOrder = () => {
    const [orders,setOrders] = useState([]);
    const { user } = useAuthContext();
    
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await fetch(`http://localhost:5050/api/order/getNewOrder`, {
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
              setOrders(json); // ако json е върнат като масив
            } else {
              // ако поръчките са в друг формат, конвертирайте ги в масив
              const ordersArray = Object.values(json.ordersByClient).flat();
              setOrders(ordersArray);
            }
          } catch (error) {
            console.error('Възникна грешка при извличане на поръчки:', error.message);
            // Тук можете да добавите логика за обработка на грешката, като показване на съобщение за потребителя
          }
        };

      
        fetchOrders();
    }, [orders]); // Празен масив от зависимости, ако не се изисква повторно извикванe




    const handleApprove = async (orderId) => {
      console.log(orderId);
        try {
      const response = await fetch(`http://localhost:5050/api/order/approveOrder/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    if (!response.ok) {
      throw new Error('Неуспешна заявка за одобряване на поръчка');
    }
    alert('Поръчката беше успешно одобрена!');
  } catch (error) {
    console.error('Грешка при одобряване на поръчка:', error);
    alert('Грешка при одобряване на поръчка. Моля, опитайте отново.');
  }
};


return (
    <div>
      <h1>Нови Поръчки</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id.$oid}>
            <h2>Маса: {order.userTable}</h2>
            <h3>Статус: {order.status}</h3>
            <h5>Начин на плащане: {order.paymentType}</h5>
            <h5>Общо: {order.subtotal}</h5>
            <h5>Създадена на: {new Date(order.createdAt).toLocaleString()}</h5>
            <h4>Продукти:</h4>
            <ul>
              {order.orderItems.map(item => (
                 <div key={item._id}>
                 <div className="row d-flex align-items-center">
                   <div className="col-lg-3 col-md-12">
                     <div
                       className="bg-image rounded"
                       data-mdb-ripple-color="light"
                     >
                       <img
                         src={item.imageUrl}
                         // className="w-100"
                         alt={item.name}
                         width={100}
                         height={75}
                       />
                     </div>
                   </div>

                   <div className="col-lg-5 col-md-6">
                     <p>
                       <strong>{item.name}</strong>
                       </p>
                       <p>
                       <strong>{item.weight}</strong>
                       <strong>{item.volume}</strong>
                     </p>
                     {/* <p>Color: blue</p>
                     <p>Size: M</p> */}
                   </div>

                   <div className="col-lg-4 col-md-6">
                     <div
                       className="d-flex mb-4"
                       style={{ maxWidth: "300px" }}
                     >
             

                       
                     </div>

                     <p className="text-start text-md-center">
                       <strong>
                         <h5 className="text-muted"  >{item.quantity}x</h5>
                         
                       </strong>
                    </p>
                   </div>
                 </div>

                 <hr className="bg-danger border-top my-4" />
               </div>  
              ))}
            </ul>
            <button className="btn btn-primary" onClick={() => handleApprove(order._id)}>Одобри поръчка</button>
          </li>
        ))}
      </ul>
    </div>
)
}

export default AllOrder;