import styles from './Login.module.css'
import { useState,useEffect } from "react"
import { useLogin } from "../hooks/useLogin"
import { useSearchParams } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Swal from 'sweetalert2';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const [queryParameters] = useSearchParams();


  useEffect(() => {
    async function loginWithDecryptedData() {
      const encryptedEmail = queryParameters.get('email');
      const encryptedPassword = queryParameters.get('password');
  
      if (encryptedEmail && encryptedPassword) {
        try {
          await login(encryptedEmail, encryptedPassword);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Грешни данни за вход!",
          });
          console.error('Error logging in:', error);
        }
      }
    }
  
    loginWithDecryptedData();
  }, []);
  



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
        extractParams(result); 
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  function extractParams(result) {
    if (isValidUrl(result)) {
      async function loginWithDecryptedData() {
        try {
          const urlParams = new URLSearchParams(new URL(result).search);
          const encryptedEmail = urlParams.get('email');
          const encryptedPassword = urlParams.get('password');
          
          await login(encryptedEmail, encryptedPassword);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Грешни данни за вход!",
          });
        }
      }
    
      loginWithDecryptedData();
    } else {
      console.error('Invalid URL:', result);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Грешни данни за вход!",
      });
      // Handle invalid URL, maybe display an error message to the user
    }
  }
  

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  function handleManualSerialNumberChange(event) {
    setManualSerialNumber(event.target.value);
  }

  
  return (
<div className='container'>
   <h1>Вход</h1>
   <div className="text-center">
  <img src="../img/qr.jpg" className="img-fluid" alt="..."></img>
</div>
 <h1>Сканирай QR кода</h1>
      {scanResult ? (
        <div>
          <p>Success: <a href={scanResult}></a></p>
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
