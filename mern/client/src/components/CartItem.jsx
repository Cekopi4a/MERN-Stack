import { Link, useParams } from "react-router-dom"
import { useContext } from "react";
import {useCartContext} from "../hooks/useCartContext";
import {useAuthContext} from '../hooks/useAuthContext'


const CartItem = ({item}) => {

      { const { dispatch } = useCartContext()
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
                <Link to="/" className="btn  btn-outline-dark mx-4">
                  <i className="fa fa-arrow-left"></i> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        );
      };


    
    return(
<>
<section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item) => {
                      return (
                        <div key={item.id}>
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
                                  onClick={() => handleClick()
                                  }
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5">{item.qty}</p>

                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.qty}</span>{" "}
                                  x ${item.price}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
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
  

{/*<div className="col mb-4">
<div className="card mb-3" style={{width: "540px"}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src={item.imageUrl} className="card-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.price}лв.-
                    {item.weight}
                    {item.volume}.</p>
        <p className="card-text"><small className="text-muted">{item.description}</small></p>
      </div>
        <div className="btn-group" role="group" aria-label="Basic outlined example">
             <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-plus-circle"></i></button>
             <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-dash-circle"></i></button>
                <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-x-circle"></i></button>
               </div>
    </div>
  </div>
</div>
    */}
  {/*      <div className="card h-100" style={{height: "50px"}}>
            <img className="card-img-top" src={item.imageUrl}   alt="..." />
            
            <div className="card-body p-4">
                <div className="text-center">
                    
                    <h5 className="fw-bolder">{item.name} </h5>
                    
                    {item.price}лв.-
                    {item.weight}
                    {item.volume}.

                    <p><br />{item.description}</p>
                    
                    
                </div>
            </div>
            
            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="container text-center">
             <div className="btn-group" role="group" aria-label="Basic outlined example">
             <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-plus-circle"></i></button>
             <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-dash-circle"></i></button>
                <button onClick={() => handleClick()} type="button" className="btn btn-outline-primary"><i className="bi bi-x-circle"></i></button>
               </div>
               </div>
            </div>
        </div>
  
    </div>

          */}
        return(
          <>
          {state.length > 0 ? <ShowCart /> : <EmptyCart />}
          </>
        )

      }
export default CartItem;