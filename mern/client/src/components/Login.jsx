import styles from './Login.module.css'
import useForm from '../hooks/useForm';
import { useContext, useEffect } from 'react';
import authContext from '../context/authContext';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoginFormKeys ={
  Email:'email',
  Password: 'password',
};

 export default function Login (){
 
  const [queryParameters] = useSearchParams();
  
  const {userForm,setUserForm} = useState({});
  const Email = queryParameters.get("email");
  const Password = queryParameters.get("password");

  
   const {loginSubmitHandler} = useContext(authContext);
  
     const {values, onChange, onSubmit} = useForm(loginSubmitHandler,{
       [LoginFormKeys.Email]:queryParameters.get("email"),
       [LoginFormKeys.Password]:queryParameters.get("password"),
     });
     
     return(
 <div className='container'>
   <h1>Login</h1>
 
 <img src='https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg' className={styles.snimka} alt='' />
 <form method="post" onSubmit={onSubmit}>
   <div className="container">
 
     <label htmlFor="username"><h4>Email</h4></label>
 
     <input type="text"
     placeholder="Enter Email"
     id='email'
      name={LoginFormKeys.Email} 
      onChange={onChange}
       value={values[LoginFormKeys.Email]} required />

    <label htmlFor="password"><h4>Password</h4></label>
    <input type="password" 
    id='password'
    placeholder="Enter Password"
     name={LoginFormKeys.Password}
      onChange={onChange} 
      value={values[LoginFormKeys.Password]} required />
        
    <button className={styles.login}  type="submit">Login</button>
  </div>
</form>

</div>

    );
};
