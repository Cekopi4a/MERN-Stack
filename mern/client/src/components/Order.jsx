import { useParams,Link } from "react-router-dom"; 
import { useContext } from "react";
import { useState,useEffect } from "react";
import CartItem from '../components/CartItem'
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import * as itemService from '../service/itemService'

const Order = () => {
    const {carts, dispatch} = useCartContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch('http://localhost:5050/api/order', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CART', payload: json})
      }
    }

    if (user) {
      fetchCart()
    }
  }, [dispatch, user])
    
    return(
        <>
        <h1>Cart Page</h1>
        <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
             {/*{itemCart.map((item)=>(
             <CartItem 
             addUserId={item.addUserId}
             key={item._id}
             id={item.id}
             brand={item.brand}
             model={item.model}
             price={item.price}
             imageUrl={item.imageUrl}
             />
             ))}*/}

{carts && carts.map((item) => (
          <CartItem   key={item._id} item={item} />
        ))}
         
               </div>
            </div>
                    <div>
                    <button  type="button" className="btn btn-outline-primary"><i className="bi bi-cart-check">Finish Order</i></button>
                    </div>
        </>
    );
};

export default Order;