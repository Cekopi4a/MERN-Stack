import { CartContext } from '../context/CartContext'
import { useContext } from 'react'

export const useCartContext = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw Error('usecartContext must be used inside an cartContextProvider')
  }

  return context
}