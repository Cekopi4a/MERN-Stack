import styles from './Login.module.css'
import useForm from '../hooks/useForm';
import { useContext, useEffect } from 'react';
import authContext from '../context/authContext';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoginFormKeys ={
  email:'email',
  password: 'password',
};
  
 
 export default function Login (){
 
   const {loginSubmitHandler} = useContext(authContext);
  
   const [formData, setFormData] = useState({
    email: '',
    password: ''
});

const location = useLocation();

useEffect(() => {
    // Function to extract data from URL and update form data
    const extractDataFromURL = () => {
        // Get the search parameters from the URL
        const searchParams = new URLSearchParams(location.search);
        // Extract data from search parameters and update form data
        setFormData({
            email: searchParams.get('email') || '',
            password: searchParams.get('password') || ''
        });
    };

    // Call the function when the component mounts
    extractDataFromURL();
}, [location.search]); // Re-run effect when the search parameter changes
 
     const {values, onChange, onSubmit} = useForm(loginSubmitHandler,{
       [LoginFormKeys.email]:'',
       [LoginFormKeys.password]:'',
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
       name={LoginFormKeys.email} 
       onChange={onChange}
        value={formData.values} required />
 
     <label htmlFor="password"><h4>Password</h4></label>
     <input type="password" 
     id='password'
     placeholder="Enter Password"
      name={LoginFormKeys.password}
       onChange={onChange} 
       value={values[LoginFormKeys.password]} readOnly required />
        
    <button className={styles.login}  type="submit">Login</button>
  </div>
</form>


</div>
    );
};
