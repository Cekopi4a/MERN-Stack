import { BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'
import { useEffect } from 'react';

import { useContext } from 'react';
import { useAuthContext } from './hooks/useAuthContext';
import { useLogout } from './hooks/useLogout';
import Path from './path'


import Navbar from './components/Navbar'
import Shop from './components/Shop'
import Home from './components/Home'
import Login from './components/Login'
import Footer from './components/Footer'
import UsersItems from './components/UsersItems'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import NoFound from './components/NotFound'
import Logout from './components/Logout'
import ErrorBoundary from './Error/ErrorBoundarys'
import RouteGuard from './routeguards/RouteGuard'
import DashBoard from "./components/DashBoard/DashBoard"
import AllOrder from "./components/DashBoard/AllOrder"
import CardPaymentForm from './components/Payment/CardPaymentForm'
import Crypto from './components/Crypto';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';



i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          greeting: 'Hello World!',
          buttonLabel: 'Switch to Bulgarian'
        }
      },
      bg: {
        translation: {
          greeting: 'Здравей свят!',
          buttonLabel: 'Превключи към английски'
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  });


function App() {

  const {user} = useAuthContext()

  useEffect(() => {
    const logoutUser = () => {
      // Clear user data from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
      useLogout(); // Update login state or clear session
      console.log('User data cleared due to window/tab close without logout.');
    };

    const handleBeforeUnload = (event) => {
      // Cancel the event to show a prompt (not recommended due to browser restrictions)
      event.preventDefault();
      // Set a message (not recommended due to browser restrictions)
      event.returnValue = '';
      logoutUser(); // Clear data when window/tab is closed
    };

    

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    
    <div>
  
               <Navbar />
    <Routes>
      <Route path='*' element={<NoFound />} />
       <Route path={Path.Home} element={<Home />} />
       <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
       <Route path='/login/:queryParameters' element={!user ? <Login /> : <Navigate to="/" />} />
       <Route path='/shop' element={<Shop />} />
       
   
      
       {/*Need to be login!*/}
       <Route element={<RouteGuard />} >
       <Route path='/crypto' element={<Crypto />} />
       <Route path={Path.Logout} element={<Logout />} />
       <Route path='/dashboard' element={<DashBoard />} />
       <Route path='/dashboard/allOrder' element={<AllOrder />} />
       <Route path='/myItem' element={<UsersItems/>} />
       <Route path='/cart' element={<Cart/>} />
       <Route path='/card' element={<CardPaymentForm/>} />
       <Route path='/checkout' element={<Checkout/>} />
       <Route path='/cart/:id' element={<Cart/>} />
       </Route>

</Routes>
<Footer />

    </div>
  )
}


export default App
