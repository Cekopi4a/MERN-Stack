import { useParams,Link } from "react-router-dom"; 
import { useContext } from "react";
import { useState,useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import * as itemService from '../service/itemService'
import {useOrderContext} from "../hooks/useOrderContext";

const Checkout = (subtotal) => {
  const { cartItems, removeFromCart } = useCartContext();
  const {orderItems,addOrder} = useOrderContext();
  const {user} = useAuthContext()

 

  const Checkout = async () => {

    const response = await fetch('http://localhost:5050/api/order/addOrder', {
          method: 'POST',
          body: JSON.stringify(orderItems),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()

        console.log(json);
        if (!response.ok) {
          console.log("Error");
        }
        if (response.ok) {
          console.log("Success") ;
   }
}
            

// let storedObject = JSON.parse(localStorage.getItem('cartItems'));

// // Проверка дали има такъв обект
// if (storedObject) {
//     // Добавяне на нов параметър към обекта
//     storedObject.paymentType = "Cash";

//     // Запазване на обновения обект в localStorage
//     localStorage.setItem('myObject', JSON.stringify(storedObject));

//     console.log('Обектът беше успешно актуализиран в localStorage.');
// } else {
//     console.log('Не може да се намери съществуващ обект в localStorage.');
// }

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
                    Products ({totalItems})<span>{subtotal}лв.</span>
                  </li>
                 
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>{subtotal}лв.</strong>
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
            <input type="radio" name="radioButton" className="ms-2" aria-label="Radio button for following text input"/>
          </label>

          {/* Radio Button 2 */}
          <label className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>Cart</span>
            <input type="radio" name="radioButton" className="ms-2" aria-label="Radio button for following text input"/>
          </label>

          {/* Radio Button 3 */}
          <label className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>With cart on spot</span>
            <input type="radio" name="radioButton" className="ms-2" aria-label="Radio button for following text input"/>
          </label>
        </div>
      </div>
    </div>

    <button
                  to="/checkout"
                  className="btn btn-dark btn-lg btn-block"
                  onClick={() => addOrder('card',subtotal)}
                >
                  Add to Local
                </button>

                <button
                  to="/checkout"
                  className="btn btn-dark btn-lg btn-block"
                  onClick={() => Checkout()}
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