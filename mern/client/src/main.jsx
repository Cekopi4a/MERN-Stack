import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './аuthContext.jsx'
import { CartProvider } from './cartContext.jsx'
import { OrderProvider} from './OrderContext.jsx'
import './i18n'; // Инициализация на i18n
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
     <I18nextProvider i18n={i18n}>
     <AuthContextProvider>
        <CartProvider>
        <OrderProvider>
     <App />
     </OrderProvider>
     </CartProvider>
     </AuthContextProvider>
     </I18nextProvider>
    </BrowserRouter>   
)
