{/*import { createContext } from "react";
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Path from '../path'

import usePersistedState from '../hooks/usePersistedState';
import * as authService from '../service/authService'
const AuthContext = createContext();


AuthContext.displayName = 'authContext';

export const AuthProvider = ({
    children,
    value
}) => {


const navigate = useNavigate();
const[auth,setAuth] = usePersistedState('auth', {});


const loginSubmitHandler = async (values) => {
   const result = await authService.login(values.email, values.password);

   setAuth(result);
   localStorage.setItem('token', result.token);
   navigate(Path.Home);
}

const registerSubmitHandler = async (values) => {
 const result = await authService.register(values.email,values.password,values.firstName);

 setAuth(result);
 localStorage.setItem(token,result.token);
   navigate(Path.Home);
}

const logoutHandler = () => {
  setAuth({});
  localStorage.removeItem(token);
}

const values = {
  logoutHandler,
  loginSubmitHandler,
  registerSubmitHandler,
  userId: auth._id,
  email: auth.email,
  role: auth.role,
  isAuthenticated: !!auth.token,
}

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
*/}