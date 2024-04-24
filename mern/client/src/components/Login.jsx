import styles from './Login.module.css'
import { useState,useEffect } from "react"
import { useLogin } from "../hooks/useLogin"
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        await login(queryParameters.get("email"), queryParameters.get("password"));
      } catch (error) {
        console.error('Error logging in:', error);
      }
    })();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault()
  
    await login(queryParameters.get("email"), queryParameters.get("password"))
  }

  return (
<div className='container'>
   <h1>Login</h1>
 
 <img src='https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg' className={styles.snimka} alt='' />
 <form method="post" onSubmit={handleSubmit}>
   <div className="container">
 
     <label htmlFor="username"><h4>Email</h4></label>
 
     <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

    <label htmlFor="password"><h4>Password</h4></label>
    <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
        
        <button className={styles.login} disabled={isLoading}>Log in</button>
      {error && <div className={styles.error}>{error}</div>}
  </div>
</form>

</div> 
  )
}

export default Login
