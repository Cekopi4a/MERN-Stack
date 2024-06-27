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
 
return (
    <div className={`col mb-5 ${viewType === 'list' ? 'mt-6' : ''}`}>
    <div className={`card h-100 ${viewType === 'list' ? 'border' : ''}`}>
        <div className="row g-0">
            <div className={`col-md-${viewType === 'list' ? '4' : '12'}`}>
                <img
                    className="card-img-top"
                    style={{
                        height: viewType === 'list' ? '287px' : '248px', 
                    }}
                    src={imageUrl}
                    alt="..."
                />
            </div>
            <div className={`col-md-${viewType === 'list' ? '8' : '12'}`}>
                <div className="card-body p-4">
                    <div className={`text-${viewType === 'list' ? 'start' : 'center'}`}>
                        <h5 className="fw-bolder" style={{ height: "76px",position: "static" }}>{name}</h5>
                        <p>
                        {price.toFixed(2)} лв.- {weight} {volume}.
                        </p>
                        <div style={{
                        height: viewType === 'list' ? '45px' : '180px',
                    }}><br />{description}</div>
                    </div>
                </div>
           
                {!user && (
                    <div className="p-4 pt-0 border-top-0 bg-transparent d-flex justify-content-center">
                        <Link to='/login'>
                            <button type="button" className="btn btn-outline-primary">
                                Влез и поръчай!
                            </button>
                        </Link>
                    </div>
                )}

                    {user && (
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="container text-center" >
                                <button onClick={() => addToCart(cart, Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Продукта е добавен успешно!',
                                    showConfirmButton: false,
                                    timer: 1500
                                }))} className="btn border border-secondary rounded-pill px-3 text-primary">
                                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Добави в количката
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