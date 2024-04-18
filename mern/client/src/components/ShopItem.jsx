import { Outlet, Link, useParams } from "react-router-dom";
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
}) => {

    const { user } = useAuthContext();
       const {dispatch} = useCartContext();
       const [item, setItem] = useState({})
       const [error, setError] = useState(null)
       const [emptyFields, setEmptyFields] = useState([])

       const handleSubmit = async () => {

        if (!user) {
            setError('You must be logged in')
            return
          }
      
          const cart = {id,
            name,
            description,
            weight,
            volume,
            price,
            imageUrl}
            console.log(cart);
            console.log(user.token);
          const response = await fetch('http://localhost:5050/api/cart', {
            method: 'POST',
            body: JSON.stringify(cart),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })
          const json = await response.json()

          console.log(json);
          if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
          }
          if (response.ok) {
            setItem('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_CART', payload: json})
          }

       }

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
            <button  onClick={() => handleSubmit(id,
    name,
    description,
    weight,
    volume,
    price,
    imageUrl)} className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
               </div>
            </div>
        </div>
    </div>
    );
};

export default ShopItem;