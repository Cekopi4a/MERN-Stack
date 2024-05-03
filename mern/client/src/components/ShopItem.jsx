import { Outlet, useNavigate,useLocation,Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState } from 'react';
import {useAuthContext} from '../hooks/useAuthContext';
import {useCartContext} from "../hooks/useCartContext";

const ShopItem = ({
    id,
    name,
    description,
    weight,
    volume,
    price,
    imageUrl,
    viewType,
}) => {

    const { user } = useAuthContext();
    const { cartItems, addToCart, removeFromCart } = useCartContext();

       const cart = {id,
        name,
        description,
        weight,
        volume,
        price,
        imageUrl};

      //  const navigate = useNavigate();
      //  const location = useLocation();

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
      //       setEmptyFields(json.emptyFields)
      //     }
      //     if (response.ok) {
      //       setItem('')
      //       setError(null)
      //       setEmptyFields([])
      //       dispatch({type: 'CREATE_CART', payload: json})
      //       Swal.fire({
      //         position: 'center',
      //         icon: 'success',
      //         title: 'Food added on the cart.',
      //         showConfirmButton: false,
      //         timer: 1500
      //       })
      //     }
          
      //   }
      
//    
return (
    <div className={`col mb-5 ${viewType === 'list' ? 'mt-3' : ''}`}>
        <div className={`card h-100 ${viewType === 'list' ? 'border' : ''}`}>
            <div className="row g-0">
                <div className={`col-md-${viewType === 'list' ? '4' : '12'}`}>
                    <img className="card-img-top" style={{height: "248px"}} src={imageUrl} alt="..." />
                </div>
                <div className={`col-md-${viewType === 'list' ? '8' : '12'}`}>
                    <div className="card-body p-4">
                        <div className={`text-${viewType === 'list' ? 'start' : 'center'}`}>
                            <h5 className="fw-bolder">{name}</h5>
                            {price}лв.- {weight} {volume}.
                            <p><br />{description}</p>
                        </div>
                    </div>
                    {!user && (
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="container text-center">
                                <Link to='/login'>
                                    <button type="button" className="btn btn-outline-primary">
                                        Login to make order!
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                    {user && (
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="container text-center">
                                <button onClick={() => addToCart(cart, Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Food added on the cart.',
                                    showConfirmButton: false,
                                    timer: 1500
                                }))} className="btn border border-secondary rounded-pill px-3 text-primary">
                                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
};


export default ShopItem;