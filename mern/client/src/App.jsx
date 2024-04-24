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
import Admin from './components/Admin'
import UsersItems from './components/UsersItems'
import ShopItemDetails from './components/ShopItemDetails'
import ShopItem from './components/ShopItem'
import Register from './components/Register'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import NoFound from './components/NotFound'
import Logout from './components/Logout'
import EditItem from './components/EditItem'
import ErrorBoundary from './Error/ErrorBoundarys'
import RouteGuard from './routeguards/RouteGuard'
import DashBoard from "./components/DashBoard/DashBoard"



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

    window.addEventListener('beforeunload', handleBeforeUnload);

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
       <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
       <Route path='/shop' element={<Shop />} />
       <Route path='/shop/item' element={<ShopItem />} />
       
   
      
       {/*Need to be login!*/}
       <Route element={<RouteGuard />} >
       <Route path={Path.Logout} element={<Logout />} />
       <Route path='/dashboard' element={<DashBoard />} />
       <Route path='/admin' element={<Admin />} />
       <Route path="/shop/item/:id" element={<ShopItemDetails />} />
       <Route path='/myItem' element={<UsersItems/>} />
       <Route path='/edit/:id' element={<EditItem/>} />
       <Route path='/cart' element={<Cart/>} />
       <Route path='/checkout' element={<Checkout/>} />
       <Route path='/cart/:id' element={<Cart/>} />
       </Route>

</Routes>
<Footer />

    </div>
  )
}


export default App
