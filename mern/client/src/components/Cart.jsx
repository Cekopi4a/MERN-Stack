import { useParams,Link } from "react-router-dom"; 
import { useContext } from "react";
import { useState,useEffect } from "react";
import CartItem_upr from "./CartItem_upr";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import * as itemService from '../service/itemService'


const Cart = () => {
  // const {carts, dispatch} = useCartContext()
  const {user} = useAuthContext()
  const { cartItems, addToCart, removeFromCart } = useCartContext();

  const [item, setItem] = useState({})
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const response = await fetch('http://localhost:5050/api/cart', {
  //       headers: {'Authorization': `Bearer ${user.token}`},
  //     })
  //     const json = await response.json()

  //     if (response.ok) {
  //       dispatch({type: 'SET_CART', payload: json})
  //     }
  //   }

  //   if (user) {
  //     fetchCart()
  //   }
  // }, [dispatch, user])

  
  // const Checkout = ({ carts, handleCheckout }) => {
  //   const totalPrice = carts.reduce((total, item) => total + carts.price, 0);
  // };


//   const handleClick = async () => {
//     if (!user) {
//       return
//     }

//     const response = await fetch('http://localhost:5050/api/cart/' + item._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     })
//     const json = await response.json()
// console.log(json);
//     if (response.ok) {
//       dispatch({type: 'DELETE_CART', payload: json})
//     }
//   }

  // const handleSubmit = async () => {

  //   if (!user) {
  //       setError('You must be logged in')
  //       return
  //     }
  
  //     const cart = {id,
  //       name,
  //       description,
  //       weight,
  //       volume,
  //       price,
  //       imageUrl}
  //       console.log(cart);
  //       console.log(user.token);
  //     const response = await fetch('http://localhost:5050/api/cart', {
  //       method: 'POST',
  //       body: JSON.stringify(cart),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${user.token}`
  //       }
  //     })
  //     const json = await response.json()

  //     console.log(json);
  //     if (!response.ok) {
  //       setError(json.error)
  //     }
  //     if (response.ok) {
  //       setItem('')
  //       setError(null)
  //       dispatch({type: 'CREATE_CART', payload: json})
  //     }

  //  }

  
 

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



const ShowCart = () => {
  let subtotal = 0;
  let totalItems = 0;
  cartItems.map((item) => {
    return (subtotal += item.price * item.quantity);
  });

  cartItems.map((item) => {
    return (totalItems += item.quantity);
  });
  console.log(cartItems);

    return(
        <>
        <h1>Cart Page</h1>
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
                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    removeFromCart(item.id);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5">{item.quantity}</p>

                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    addToCart(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted"></span>{" "}
                                  x{item.price}
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

                    <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
                  
        </>
    );
};
return(
  <>
  {cartItems != null && cartItems.length > 0 ? <ShowCart /> : <EmptyCart />}
  </>
)
}

export default Cart;