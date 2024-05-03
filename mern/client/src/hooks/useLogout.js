import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'; // Remove cookie
    localStorage.removeItem('cartItems')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}