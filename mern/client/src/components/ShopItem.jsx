import { Outlet, Link, useParams } from "react-router-dom";
import { useContext } from 'react';
import authContext from '../context/authContext';
import CartContext from "../context/cartContext";

const ShopItem = ({
    id,
    name,
    description,
    weight,
    volume,
    price,
    imageUrl,
}) => {
    const {
        isAuthenticated,
       } = useContext(authContext);
       const {userId } = useContext(authContext);
       const addUserId = userId;
       const {addCart} =useContext(CartContext);
    return(
     <div className="col mb-5">
        <div className="card h-100">
            <img className="card-img-top" src={imageUrl}  style={{height: "230px"}} alt="..." />
            
            <div className="card-body p-4">
                <div className="text-center">
                    
                    <h5 className="fw-bolder">{name} </h5>
                    
                    {price}лв.-
                    {weight}
                    {volume}.

                    <p><br />{description}</p>
                    
                    
                </div>
            </div>
           
            
           
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="container text-center">
            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
               </div>
            </div>
        </div>
    </div>
    );
};

export default ShopItem;