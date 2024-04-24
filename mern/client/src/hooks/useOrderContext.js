import { OrderContext } from '../context/OrderContext'
import { useContext } from 'react'

export const useOrderContext = () => {
  const context = useContext(OrderContext)

  if (!context) {
    throw Error('usecartContext must be used inside an cartContextProvider')
  }

  return context
}