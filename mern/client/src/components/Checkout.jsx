import { useParams,Link } from "react-router-dom"; 
import { useContext } from "react";
import { useState,useEffect } from "react";
import Swal from 'sweetalert2';
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import * as itemService from '../service/itemService'
import {useOrderContext} from "../hooks/useOrderContext";
import CardPaymentForm from "./Payment/CardPaymentForm"
import { createRoot } from 'react-dom/client';
import { useLogout } from '../hooks/useLogout'

const Checkout = () => {
  const { cartItems, removeFromCart } = useCartContext();
  const {user} = useAuthContext()
  const { logout } = useLogout()
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);


  const handleRadioChange = (e) => {
  
    const selectedValue = e.target.value;
    setSelectedPaymentType(selectedValue);

    if (selectedValue === 'Card') {
      setShowCardForm(true);
      Swal.fire({
        title: 'Enter Card Details',
        html: '<div id="cardPaymentForm"></div>',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Close',
        didOpen: () => {
          renderCardPaymentForm();
        },
        willClose: () => {
          setShowCardForm(false);
        }
      });
    } else {
      setShowCardForm(false);
    }
  };

  const renderCardPaymentForm = () => {
    const cardPaymentContainer = document.getElementById('cardPaymentForm');
    if (cardPaymentContainer) {
      createRoot(cardPaymentContainer).render(<CardPaymentForm onComplete={handleCardPaymentComplete} />);
    }
  };

  const handleCardPaymentComplete = () => {
    Swal.close();
    // Допълнителна логика след успешно плащане
  };

  const handleCheckout = async (paymentType,subtotal) => {

    let orderItems = JSON.parse(localStorage.getItem('cartItems'));

console.log(orderItems);
  const orderData ={
    orderItems: orderItems,
    paymentType: selectedPaymentType,
    subtotal: subtotal,
    userTable: user.table,
  };
    
console.log(orderData);
    const response = await fetch('http://localhost:5050/api/order/addOrder', {
          method: 'POST',
          body: JSON.stringify(orderData),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        console.log(json);
        if (!response.ok) {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Your time is up. Sign in again.",
            showConfirmButton: false,
            timer: 3000
          });
          logout();
          console.log("Error");
        }
        if (response.ok) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Your order has been placed successfully!",
            showConfirmButton: false,
            timer: 5000
          });
          console.log("Success") ;
          logout();
   }
}



  const ShowCart = () => {
    let subtotal = 0;
    let totalItems = 0;
    cartItems.map((item) => {
      return (subtotal += item.price * item.quantity);
    });
  
    cartItems.map((item) => {
      return (totalItems += item.quantity);
    });

  return(
    <>
    <h1>Checkout</h1>
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Product List</h5>
              </div>
              <div className="card-body">
              {cartItems.map((item) => {
                  return (
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
                              x {item.price}
                            </strong>
                          лв.</p>
                        </div>
                      </div>

                      <hr className="bg-danger border-top my-4" />
                    </div>  )
})} 
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems})<span>{subtotal.toFixed(2)}лв.</span>
                  </li>
                 
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>{subtotal.toFixed(2)}лв.</strong>
                    </span>
                  </li>
                </ul>

                <span>
                      <strong>Payment Method</strong>
                    </span>
    <div className="row">
      <div className="col text-end">
        <div className="list-group">
          {/* Radio Button 1 */}
          <label className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>Cash</span>
            <input type="radio" onChange={handleRadioChange} checked={selectedPaymentType === "Cash"} value={"Cash"} name="radioButton" className="ms-2" aria-label="Radio button for following text input"/>
          </label>

          {/* Radio Button 2 */}
          <label className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>Card</span>
            <input type="radio" onChange={handleRadioChange} checked={selectedPaymentType === "Card"}  value={"Card"} name="radioButton" className="ms-2" aria-label="Radio button for following text input"/>
          </label>

          {/* Radio Button 3 */}
          <label className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>With card on spot</span>
            <input type="radio" onChange={handleRadioChange} checked={selectedPaymentType === "Card on spot"}  value={"Card on spot"} name="radioButton" className="ms-2" aria-label="Radio button for following text input"/>
          </label>
        </div>
      </div>
    </div>


                <button
                  to="/checkout"
                  className="btn btn-dark btn-lg btn-block"
                  disabled={!selectedPaymentType}
                  onClick={() => handleCheckout(selectedPaymentType,subtotal)}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
)
}

return(
  <>
<ShowCart /> 
  </>
)
}

export default Checkout;