import { createContext, useReducer } from 'react'

export const CartContext = createContext()

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART': 
      return {
       carts: action.payload
      }
    case 'CREATE_CART':
      return {
       carts: [action.payload, state.carts]
      }
    case 'DELETE_CART':
      return {
        carts: state.carts.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    carts: null
  })

  return (
    <CartContext.Provider value={{...state, dispatch}}>
      { children }
    </CartContext.Provider>
  )
}