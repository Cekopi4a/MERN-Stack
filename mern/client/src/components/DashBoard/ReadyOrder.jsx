// import { Outlet, useNavigate,useLocation,Link, useParams } from "react-router-dom";
// import Swal from 'sweetalert2';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
// import { useState,useEffect } from 'react';
// import {useAuthContext} from '../../hooks/useAuthContext';

// const ReadyOrder = () => {
//     const [orders,setOrders] = useState([]);
//     const { user } = useAuthContext();
//     const [receipt, setReceipt] = useState(null);
    
//     useEffect(() => {
//         const fetchOrders = async () => {
//           try {
//             const response = await fetch(`http://localhost:5050/api/order/getReadyOrders`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.token}`
//               },
//             });
//             if (!response.ok) {
//               throw new Error('Неуспешна заявка за поръчки');
//             }
//             const json = await response.json();
      
//             if (Array.isArray(json)) {
//               setOrders(json); // ако json е върнат като масив
//             } else {
//               // ако поръчките са в друг формат, конвертирайте ги в масив
//               const ordersArray = Object.values(json.ordersByClient).flat();
//               setOrders(ordersArray);
//             }
//           } catch (error) {
//             console.error('Възникна грешка при извличане на поръчки:', error.message);
//             // Тук можете да добавите логика за обработка на грешката, като показване на съобщение за потребителя
//           }
//         };

      
//         fetchOrders();
//     }, [orders]); // Празен масив от зависимости, ако не се изисква повторно извикванe


//     const finnishOrder = async (orderId) => {
    
//         try {
//           const response = await fetch(`http://localhost:5050/api/order/finnishOrder/${orderId}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${user.token}`
//             },
//           });
//           if (!response.ok) {
//             throw new Error('Неуспешна заявка за поръчки');
//           }

//           const result = await response.json();

//           Swal.fire({
//             position: "top",
//             icon: "success",
//             title: "Поръчката е завършена!",
//             showConfirmButton: false,
//             timer: 1500
//           });
//         alert('Order finnish successfully!');
//       } catch (error) {
//         console.error('Error approving order:', error);
//         alert('Error approving order. Please try again.');
//       }
//     };



// return (
//     <div>
//       <h1>Готови Поръчки</h1>
//       <ul>
//         {orders.map(order => (
//           <li key={order._id.$oid}>
//             <h2>User Table: {order.userTable}</h2>
//             <h4>Status: {order.status}</h4>
//             <p>Payment Type: {order.paymentType}</p>
//             <p>Subtotal: {order.subtotal}</p>
//             <p>Created At: {order.createdAt.$date}</p>
//             <h4>Order Items:</h4>
//             <ul>
//               {order.orderItems.map(item => (
//                  <div key={item._id}>
//                  <div className="row d-flex align-items-center">
//                    <div className="col-lg-3 col-md-12">
//                      <div
//                        className="bg-image rounded"
//                        data-mdb-ripple-color="light"
//                      >
//                        <img
//                          src={item.imageUrl}
//                          // className="w-100"
//                          alt={item.name}
//                          width={100}
//                          height={75}
//                        />
//                      </div>
//                    </div>

//                    <div className="col-lg-5 col-md-6">
//                      <p>
//                        <strong>{item.name}</strong>
//                        </p>
//                        <p>
//                        <strong>{item.weight}</strong>
//                        <strong>{item.volume}</strong>
//                      </p>
//                      {/* <p>Color: blue</p>
//                      <p>Size: M</p> */}
//                    </div>

//                    <div className="col-lg-4 col-md-6">
//                      <div
//                        className="d-flex mb-4"
//                        style={{ maxWidth: "300px" }}
//                      >
             

                       
//                      </div>

//                      <p className="text-start text-md-center">
//                        <strong>
//                          <h5 className="text-muted"  >{item.quantity}x</h5>
                         
//                        </strong>
//                     </p>
//                    </div>
//                  </div>

//                  <hr className="bg-danger border-top my-4" />
//                </div>  
//               ))}
//             </ul>
//             <button className="btn btn-success" onClick={setReceipt(generateReceipt(order))}>Finish Order</button>
//           </li>
//         ))}
//       </ul>
//       {receipt && (
//         <div>
//           <h2>Generated Receipt</h2>
//           <pre>{JSON.stringify(receipt, null, 2)}</pre>
//         </div>
//       )}
//     </div>
// )
// }

// export default ReadyOrder;
import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTranslation } from 'react-i18next';

const ReadyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();
  const { t, i18n } = useTranslation(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/order/getReadyOrders`, {
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
        console.error('Возникла ошибка при извлечении заказов:', error.message);
      }
    };

    fetchOrders();
  }, [user.token]);

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      margin: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
      textDecoration: 'underline',
      color: '#333',
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    itemName: {
      flexGrow: 1,
      fontSize: 14,
      color: '#444',
    },
  });

  const generateReceipt = (order) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{t('orderDetails')}</Text>
          <Text>Маса: {order.userTable}</Text>
          <Text>Статус: {order.status}</Text>
          <Text>Начин на плащане: {order.paymentType}</Text>
          <Text>Общо: {order.subtotal} BGN</Text>
          <Text>Създадена на: {new Date(order.createdAt).toLocaleString()}</Text>
          <Text style={styles.header}>Продукти</Text>
          {order.orderItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>{item.quantity} x {item.price.toFixed(2)} BGN</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <div>
        <h1>Готови Поръчки</h1>
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
                        <div className="bg-image rounded">
                          <img src={item.imageUrl} alt={item.name} width={100} height={75} />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6">
                        <p><strong>{item.name}</strong></p>
                        <p><strong>{item.weight}</strong><strong>{item.volume}</strong></p>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <p className="text-start text-md-center">
                          <strong><h5 className="text-muted">{item.quantity}x</h5></strong>
                        </p>
                      </div>
                    </div>
                    <hr className="bg-danger border-top my-4" />
                  </div>
                ))}
              </ul>
              <button className="btn btn-success" onClick={() => { setSelectedOrder(order); setShowModal(true); }}>Приключи поръчка</button>
            </li>
          ))}
        </ul>
      </div>

      {showModal && selectedOrder && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('orderReceipt')}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <PDFViewer style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
                  {generateReceipt(selectedOrder)}
                </PDFViewer>
              </div>
              <div className="modal-footer">
                <PDFDownloadLink document={generateReceipt(selectedOrder)} fileName={`order_receipt_${selectedOrder._id.$oid}.pdf`}>
                  {({ blob, url, loading, error }) => (loading ? t('loadingDocument') : t('printReceipt'))}
                </PDFDownloadLink>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>{t('close')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadyOrder;

