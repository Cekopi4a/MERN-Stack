// import React, { useState, useEffect } from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import { useTranslation } from 'react-i18next';

// const ReadyOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const { user } = useAuthContext();
//   const { t, i18n } = useTranslation(); 

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(`http://localhost:5050/api/order/getReadyOrders`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${user.token}`
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Неуспешна заявка за поръчки');
//         }
//         const json = await response.json();

//         if (Array.isArray(json)) {
//           setOrders(json); 
//         } else {
//           const ordersArray = Object.values(json.ordersByClient).flat();
//           setOrders(ordersArray);
//         }
//       } catch (error) {
//         console.error('Возникла ошибка при извлечении заказов:', error.message);
//       }
//     };

//     fetchOrders();
//   }, [user.token]);

//   const styles = StyleSheet.create({
//     page: {
//       flexDirection: 'column',
//       margin: 10,
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1,
//     },
//     header: {
//       fontSize: 18,
//       marginBottom: 10,
//       fontWeight: 'bold',
//       textDecoration: 'underline',
//       color: '#333',
//     },
//     itemRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 5,
//     },
//     itemName: {
//       flexGrow: 1,
//       fontSize: 14,
//       color: '#444',
//     },
//   });

//   const generateReceipt = (order) => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <div style={styles.header}>{t('Поръчка')}</div>
//           <Text>Маса: {order.userTable}</Text>
//           <Text>Статус: {order.status}</Text>
//           <Text>Начин на плащане: {order.paymentType}</Text>
//           <Text>Общо: {order.subtotal} BGN</Text>
//           <Text>Създадена на: {new Date(order.createdAt).toLocaleString()}</Text>
//           <Text style={styles.header}>Продукти</Text>
//           {order.orderItems.map((item, index) => (
//             <View key={index} style={styles.itemRow}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text>{item.quantity} x {item.price.toFixed(2)} BGN</Text>
//             </View>
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );

//   return (
//     <div>
//     <div className="container mt-4">
//       <h1 className="mb-4">Нови Поръчки</h1>
//       <ul className="list-group">
//         {orders.map(order => (
//           <li key={order._id.$oid} className="list-group-item mb-3">
//             <h2>Маса: {order.userTable}</h2>
//             <h3>Статус: {order.status}</h3>
//             <h5>Начин на плащане: {order.paymentType}</h5>
//             <h5>Общо: {order.subtotal} лв.</h5>
//             <h5>Създадена на: {new Date(order.createdAt).toLocaleString()}</h5>
//             <h4>Продукти:</h4>
//             <ul className="list-group">
//               {order.orderItems.map(item => (
//                 <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
//                   <div className="d-flex align-items-center">
//                     <div className="me-3">
//                       <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.quantity}x</span>
//                     </div>
//                     <img src={item.imageUrl} alt={item.name} className="img-thumbnail" style={{ width: '100px', height: '75px', marginRight: '15px' }} />
//                     <div>
//                       <p><strong>{item.name}</strong></p>
//                       <p>{item.weight} {item.volume}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//               <button className="btn btn-success" onClick={() => { setSelectedOrder(order); setShowModal(true); }}>Приключи поръчка</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {showModal && selectedOrder && (
//   <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//     <div className="modal-dialog" role="document">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">{t('orderReceipt')}</h5>
//           <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <div className="modal-body">
//           <PDFViewer style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
//             {generateReceipt(selectedOrder)}
//           </PDFViewer>
//         </div>
//         <div className="modal-footer">
//           <PDFDownloadLink document={generateReceipt(selectedOrder)} fileName={`order_receipt_${selectedOrder._id.$oid}.pdf`}>
//             {({ blob, url, loading, error }) => (loading ? t('loadingDocument') : t('Изпринтирай'))}
//           </PDFDownloadLink>
//           <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>{t('close')}</button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default ReadyOrder;





import React, { useState, useEffect } from 'react';
import ReactToPrint from 'react-to-print';
import { useAuthContext } from '../../hooks/useAuthContext';

// Компонент за касова бележка
const Invoice = ({ order }) => (
  <div>
    <h2>Касова бележка</h2>
    <p>Маса: {order.userTable}</p>
    <p>Статус: {order.status}</p>
    <p>Начин на плащане: {order.paymentType}</p>
    <p>Общо: {order.subtotal} BGN</p>
    <p>Създадена на: {new Date(order.createdAt).toLocaleString()}</p>
    <h4>Продукти:</h4>
    <ul>
      {order.orderItems.map((item, index) => (
        <li key={index}>
          <p>{item.name} - {item.quantity} x {item.price.toFixed(2)} BGN</p>
        </li>
      ))}
    </ul>
  </div>
);

// Главен компонент
const ReadyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();

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

  return (
    <div>
        <div className="container mt-4">
       <h1 className="mb-4">Готови Поръчки</h1>
       <ul className="list-group">
         {orders.map(order => (
           <li key={order._id.$oid} className="list-group-item mb-3">
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
               <button className="btn btn-success" onClick={() => { setSelectedOrder(order); setShowModal(true); }}>Приключи поръчка</button>
             </li>
           ))}
         </ul>
       </div>
      {showModal && (
        <div>
          <Invoice order={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default ReadyOrders;

