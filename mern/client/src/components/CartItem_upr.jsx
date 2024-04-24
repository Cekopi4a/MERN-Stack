import { Link, useParams } from "react-router-dom"
import { useSelector } from "react";
import {useCartContext} from "../hooks/useCartContext";
import {useAuthContext} from '../hooks/useAuthContext'


const CartItem_upr = ({item}) => {

       const { dispatch } = useCartContext()
       const { user } = useAuthContext()
     
       const handleClick = async () => {
         if (!user) {
           return
         }
     
         const response = await fetch('http://localhost:5050/api/cart/' + item._id, {
           method: 'DELETE',
           headers: {
             'Authorization': `Bearer ${user.token}`
           }
         })
         const json = await response.json()
     console.log(json);
         if (response.ok) {
           dispatch({type: 'DELETE_CART', payload: json})
         }
       }

       
      

       const EmptyCart = () => {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-5 bg-light text-center">
                <h4 className="p-3 display-5">Your Cart is Empty</h4>
                <Link to="/shop" className="btn  btn-outline-dark mx-4">
                  <i className="fa fa-arrow-left"></i> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        );
      };

      const ShowCheckout = () => {
        let subtotal = 0;
        let shipping = 30.0;
        let totalItems = 0;
        state.map((item) => {
          return (subtotal += item.price * item.qty);
        });
    
        state.map((item) => {
          return (totalItems += item.qty);
        });
        return (
          <>
            <div className="container py-5">
              <div className="row my-4">
                <div className="col-md-5 col-lg-4 order-md-last">
                  <div className="card mb-4">
                    <div className="card-header py-3 bg-light">
                      <h5 className="mb-0">Order Summary</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                          Products ({totalItems})<span>${Math.round(subtotal)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                          Shipping
                          <span>${shipping}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>Total amount</strong>
                          </div>
                          <span>
                            <strong>${Math.round(subtotal + shipping)}</strong>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-lg-8">
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h4 className="mb-0">Billing address</h4>
                    </div>
                    <div className="card-body">
                      <form className="needs-validation" novalidate>
                        <div className="row g-3">
                          <div className="col-sm-6 my-1">
                            <label for="firstName" className="form-label">
                              First name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder=""
                              required
                            />
                            <div className="invalid-feedback">
                              Valid first name is required.
                            </div>
                          </div>
    
                          <div className="col-sm-6 my-1">
                            <label for="lastName" className="form-label">
                              Last name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder=""
                              required
                            />
                            <div className="invalid-feedback">
                              Valid last name is required.
                            </div>
                          </div>
    
                          <div className="col-12 my-1">
                            <label for="email" className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="you@example.com"
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter a valid email address for shipping
                              updates.
                            </div>
                          </div>
    
                          <div className="col-12 my-1">
                            <label for="address" className="form-label">
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              placeholder="1234 Main St"
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter your shipping address.
                            </div>
                          </div>
    
                          <div className="col-12">
                            <label for="address2" className="form-label">
                              Address 2{" "}
                              <span className="text-muted">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address2"
                              placeholder="Apartment or suite"
                            />
                          </div>
    
                          <div className="col-md-5 my-1">
                            <label for="country" className="form-label">
                              Country
                            </label>
                            <br />
                            <select className="form-select" id="country" required>
                              <option value="">Choose...</option>
                              <option>India</option>
                            </select>
                            <div className="invalid-feedback">
                              Please select a valid country.
                            </div>
                          </div>
    
                          <div className="col-md-4 my-1">
                            <label for="state" className="form-label">
                              State
                            </label>
                            <br />
                            <select className="form-select" id="state" required>
                              <option value="">Choose...</option>
                              <option>Punjab</option>
                            </select>
                            <div className="invalid-feedback">
                              Please provide a valid state.
                            </div>
                          </div>
    
                          <div className="col-md-3 my-1">
                            <label for="zip" className="form-label">
                              Zip
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="zip"
                              placeholder=""
                              required
                            />
                            <div className="invalid-feedback">
                              Zip code required.
                            </div>
                          </div>
                        </div>
    
                        <hr className="my-4" />
    
                        <h4 className="mb-3">Payment</h4>
    
                        <div className="row gy-3">
                          <div className="col-md-6">
                            <label for="cc-name" className="form-label">
                              Name on card
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-name"
                              placeholder=""
                              required
                            />
                            <small className="text-muted">
                              Full name as displayed on card
                            </small>
                            <div className="invalid-feedback">
                              Name on card is required
                            </div>
                          </div>
    
                          <div className="col-md-6">
                            <label for="cc-number" className="form-label">
                              Credit card number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-number"
                              placeholder=""
                              required
                            />
                            <div className="invalid-feedback">
                              Credit card number is required
                            </div>
                          </div>
    
                          <div className="col-md-3">
                            <label for="cc-expiration" className="form-label">
                              Expiration
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-expiration"
                              placeholder=""
                              required
                            />
                            <div className="invalid-feedback">
                              Expiration date required
                            </div>
                          </div>
    
                          <div className="col-md-3">
                            <label for="cc-cvv" className="form-label">
                              CVV
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-cvv"
                              placeholder=""
                              required
                            />
                            <div className="invalid-feedback">
                              Security code required
                            </div>
                          </div>
                        </div>
    
                        <hr className="my-4" />
    
                        <button
                          className="w-100 btn btn-primary "
                          type="submit" disabled
                        >
                          Continue to checkout
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      };
      return(
        <>
        {dispatch.length < 0 ? <ShowCart /> : <EmptyCart />}
        </>
      )
  }


   
    
// return(
// <div className="col mb-4">
// <div className="card mb-3" style={{width: "540px"}}>
//   <div className="row no-gutters">
//     <div className="col-md-4">
//       <img src={item.imageUrl} className="card-img" alt="..."/>
//     </div>
//     <div className="col-md-8">
//       <div className="card-body">
//         <h5 className="card-title">{item.name}</h5>
//         <p className="card-text">{item.price}лв.-
//                     {item.weight}
//                     {item.volume}.</p>
//         <p className="card-text"><small className="text-muted">{item.description}</small></p>
//       </div>
//         <div className="btn-group" role="group" aria-label="Basic outlined example">
//              <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-plus-circle"></i></button>
//              <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-dash-circle"></i></button>
//                 <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-x-circle"></i></button>
//                </div>
//     </div>
//   </div>
// </div>
// </div>
// )
//     }
//       <div className="card h-100" style={{height: "50px"}}>
//             <img className="card-img-top" src={item.imageUrl}   alt="..." />
            
//             <div className="card-body p-4">
//                 <div className="text-center">
                    
//                     <h5 className="fw-bolder">{item.name} </h5>
                    
//                     {item.price}лв.-
//                     {item.weight}
//                     {item.volume}.

//                     <p><br />{item.description}</p>
                    
                    
//                 </div>
//             </div>
            
//             <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
//             <div className="container text-center">
//              <div className="btn-group" role="group" aria-label="Basic outlined example">
//              <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-plus-circle"></i></button>
//              <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-dash-circle"></i></button>
//                 <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-x-circle"></i></button>
//                </div>
//                </div>
//             </div>
//         </div>
  
//     </div>

          

export default CartItem_upr;