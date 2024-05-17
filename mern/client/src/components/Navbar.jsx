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

  const socket = new WebSocket('ws://localhost:8080');

// При натискане на копче "Извикай сервитьор"
function callWaiter() {
  const message = (user.table);
  try{
  socket.send(message); // Променете съобщението според вашите нужди
Swal.fire({
  position: "top",
  icon: "success",
  title: "Сервитьора идва към вас!",
  showConfirmButton: false,
  timer: 2000
})
  }catch{
    console.log("Error");
  }
}

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" href="/">Ресторант</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Начало</Link></li>
                {user && (
                  <>
                   {user.role == "guest" && (
                    <>
                  <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/shop">Поръчай</Link></li>
                 <li className="nav-item"><Link className="nav-link active" aria-current="page" onClick={callWaiter} >Call Waiter!</Link></li>
                   </>
                   )}
                {(user.role == "admin" || user.role == "waiter") && (
                <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/dashboard">Табло</Link></li>
              )}
              </>
             )}
              
            </ul>


            <div className="d-flex">
            {!user && (
                    <>
                <span className="nav-item"><Link className="nav-link" to="/login">Вход</Link></span>
        
            </>
                )}

            
      
      {user && (
        <>
          {user.role == "guest" && (
            <>
          <span className={style.name}>
        Твоята маса е:{user.table}
      </span>
      
                <Link to="/cart">
                <button className="btn btn-outline-dark" type="submit">
                <div
                className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"></div>
                    <i className="fa fa-shopping-bag me-2"></i>
                    Продукти
                    <span className="badge bg-dark text-white ms-1 rounded-pill">{totalItems}</span>
                </button>
                </Link>
          </>
          )}
          
                 <div className="nav-item"><Link className="nav-link" onClick={handleClick}>Излез</Link></div>  
                 </>  
      )}
            </div>
        </div>
    </div>
</nav>
  );
};

export default Navbar;