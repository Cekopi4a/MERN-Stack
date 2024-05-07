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
            const response = await fetch(`http://localhost:5050/api/order/getOrders`, {
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
    }, []); // Празен масив от зависимости, ако не се изисква повторно извикванe

return (
    <div>
      <h1>Поръчки</h1>
      <ul>
        {orders.map(order => (
          <li key={order._id.$oid}>
            <h3>User Table: {order.userTable}</h3>
            <p>Payment Type: {order.paymentType}</p>
            <p>Subtotal: {order.subtotal}</p>
            <p>Created At: {order.createdAt.$date}</p>
            <h4>Order Items:</h4>
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
                         <span className="text-muted">{item.quantity}</span>
                         x
                       </strong>
                    </p>
                   </div>
                 </div>

                 <hr className="bg-danger border-top my-4" />
               </div>  
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
)
}

export default AllOrder;