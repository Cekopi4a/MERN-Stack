import { BrowserRouter, Routes,Route, Navigate} from 'react-router-dom'

import { useContext } from 'react';
import {AddCartContext} from './context/cartContext'
import { useAuthContext } from './hooks/useAuthContext';
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
import NoFound from './components/NotFound'
import Logout from './components/Logout'
import EditItem from './components/EditItem'
import ErrorBoundary from './Error/ErrorBoundarys'
import RouteGuard from './routeguards/RouteGuard'



function App() {

  const {user} = useAuthContext()

  return (
    
    <div>
  
        <AddCartContext>
               <Navbar />
    <Routes>
      <Route path='*' element={<NoFound />} />
       <Route path={Path.Home} element={<Home />} />
       <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
       <Route path='/login/:queryParameters' element={<Login />} />
       <Route path='/register' element={<Register />} />
       <Route path='/shop' element={<Shop />} />
       <Route path='/shop/item' element={<ShopItem />} />
       <Route path='/shop/alcohol' element={<Shop />} />
       <Route path='/shop/noalcohol' element={<Shop />} />
       
   
       

       {/*Need to be login!*/}
       
       <Route element={<RouteGuard />} >
       <Route path={Path.Logout} element={<Logout />} />
       <Route path='/admin' element={<Admin />} />
       <Route path="/shop/item/:id" element={<ShopItemDetails />} />
       <Route path='/myItem' element={<UsersItems/>} />
       <Route path='/edit/:id' element={<EditItem/>} />
       <Route path='/cart' element={<Cart/>} />
       <Route path='/cart/:id' element={<Cart/>} />
       </Route>

</Routes>
<Footer />
</AddCartContext>

    </div>
  )
}


export default App
