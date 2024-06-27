import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';
import { useCartContext } from "../hooks/useCartContext";
import Swal from 'sweetalert2';
import style from './Navbar.module.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { totalItems } = useCartContext();
  const { logout } = useLogout();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket връзката е установена.');
    };

    ws.onclose = () => {
      console.log('WebSocket връзката е затворена.');
    };

    ws.onerror = (error) => {
      console.error('WebSocket грешка:', error);
    };

    ws.onmessage = (event) => {
      console.log('Получено съобщение от сървъра:', event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleClick = () => {
    logout();
  };

  const callWaiter = () => {
    if (socket && user && user.table) {
      const message = JSON.stringify({ table: user.table, action: 'call_waiter' });
      try {
        socket.send(message);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Сервитьора идва към вас!',
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.log('Error:', error);
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Грешка при извикване на сервитьора',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to="/">Ресторант</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Начало</Link></li>
            {user && (
              <>
                {user.role === 'guest' && (
                  <>
                    <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/shop">Поръчай</Link></li>
                    <li className="nav-item"><Link className="nav-link active" aria-current="page" onClick={callWaiter}>Извикай сервитьор!</Link></li>
                  </>
                )}
                {(user.role === 'admin' || user.role === 'waiter') && (
                  <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/dashboard">Табло</Link></li>
                )}
              </>
            )}
          </ul>

          <div className="d-flex">
            {!user ? (
              <>
                <span className="nav-item"><Link className="nav-link" to="/login">Вход</Link></span>
              </>
            ) : (
              <>
                {user.role === 'guest' && (
                  <>
                    <span className={style.name}>
                      Вашата маса е: {user.table}
                    </span>
                    <Link to="/cart">
                      <button className="btn btn-outline-dark" type="submit">
                        <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"></div>
                        <i className="fa fa-shopping-bag me-2"></i>
                        Продукти
                        <span className="badge bg-dark text-white ms-1 rounded-pill">{totalItems}</span>
                      </button>
                    </Link>
                  </>
                )}
                <div className="nav-item m-2 m"><Link className="nav-link" onClick={handleClick}>Излез</Link></div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
