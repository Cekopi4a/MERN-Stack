import styles from './Login.module.css'
import { useState,useEffect } from "react"
import { useLogin } from "../hooks/useLogin"
import { useSearchParams } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';


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


  //Qr Code Scanner
  const [scanResult, setScanResult] = useState(null);
  const [manualSerialNumber, setManualSerialNumber] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false; // Set isScanning to false to stop further scanning
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  function handleManualSerialNumberChange(event) {
    setManualSerialNumber(event.target.value);
  }
  
  return (
<div className='container'>
   <h1>Login</h1>
 
 <img src='https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg' className={styles.snimka} alt='' />

 <h1>QR Scanning Code</h1>
      {scanResult ? (
        <div>
          <p>Success: <a href={scanResult}>{scanResult}</a></p>
          <p>Serial Number: {scanResult.slice(-16)}</p>
        </div>
      ) : (
        <div>
          <div id="reader"></div>
          {/* <p className="center-text">Or enter the serial number manually:</p>
          <div className="center-input">
            <input
              type="text"
              value={manualSerialNumber}
              onChange={handleManualSerialNumberChange}
            />
            {manualSerialNumber && (
              <p>Serial Number: {manualSerialNumber.slice(-16)}</p>
            )}
          </div> */}
        </div>
      )}

 {/*
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
*/}



</div> 
  )
}

export default Login
