import { useContext } from 'react';
import { Link } from 'react-router-dom' 
import {AuthContext} from '../context/AuthContext';
import style from './Navbar.module.css'
import { useLogout } from '../hooks/useLogout'
import { CartContext } from '../context/CartContext';
import { useCartContext } from "../hooks/useCartContext";

const Navbar = () => {
   const {
    user,email } = useContext(AuthContext);
    const { totalItems } = useCartContext();


   
   const { logout } = useLogout()

   const handleClick = () => {
    logout()
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="/">Restaurant</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/shop">Shop</Link></li>
                {user && (
                  <>
                {user.role == "admin" && (
                <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/dashboard">DashBoard</Link></li>
              )}
              </>
             )}
              
            </ul>


            <div className="d-flex">
            {!user && (
                    <>
                <span className="nav-item"><Link className="nav-link" to="/login">Login</Link></span>
            <span className="nav-item"><Link className="nav-link" to="/register">Register</Link></span>
            </>
                )}

            
      
      {user && (
        <>
        <span className={style.name}>
        You are on {user.table}
      </span>
                <Link to="/cart">
                <button className="btn btn-outline-dark" type="submit">
                <div
                className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"></div>
                    <i className="fa fa-shopping-bag me-2"></i>
                    Cart
                    <span className="badge bg-dark text-white ms-1 rounded-pill">{totalItems}</span>
                </button>
                </Link>
                 <div className="nav-item"><Link className="nav-link" onClick={handleClick}>Logout</Link></div>
                 </>
      )}
            </div>
        </div>
    </div>
</nav>
  );
};

export default Navbar;