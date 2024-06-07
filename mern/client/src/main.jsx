import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrderProvider} from './context/OrderContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
     <AuthContextProvider>
        <CartProvider>
            <OrderProvider>
     <App />
     </OrderProvider>
     </CartProvider>
     </AuthContextProvider>
    </BrowserRouter>
    
)