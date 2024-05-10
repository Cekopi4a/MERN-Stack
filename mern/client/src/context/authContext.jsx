import { createContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })


  useEffect(() => {
    const user = Cookies.get('user');

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

};
