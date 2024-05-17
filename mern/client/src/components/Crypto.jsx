import React, { useState, useRef } from 'react';
import CryptoJS from 'crypto-js';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';

const EncryptDecryptComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedEmail, setEncryptedEmail] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [readyUrl, setReadyUrl] = useState('');
  const [qrValue, setQrValue] = useState('');

  const secretKey = 'MySecretKey123'; // Ключ за криптиране

  function encryptData(data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  const handleEncrypt = () => {
    const encryptedEmail = encryptData(email);
    const encryptedPassword = encryptData(password);
    setEncryptedEmail(encryptedEmail);
    setEncryptedPassword(encryptedPassword);

    // Генериране на URL адрес с криптирани данни
    const queryParams = `email=${encodeURIComponent(encryptedEmail)}&password=${encodeURIComponent(encryptedPassword)}`;
    const url = `http://localhost:5173/login?${queryParams}`;
    
    setQrValue(url);
    setReadyUrl(url);
  };
  
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code');
    canvas.toBlob((blob) => {
      saveAs(blob, `${email}-qr.png`);
    });
  };

  return (
    <div>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleEncrypt} className="btn btn-info">Encrypt Data</button>
      <br />
      <input type="Url" value={readyUrl} style={{width:"500px",height: "30px"}}/>
      <br />
      <h1>Generate QR Code</h1>
      <QRCode id="qr-code" value={qrValue} />
      <br />
      <button type="button" onClick={downloadQRCode} className="btn btn-info">
        Save QR Code
      </button>
    </div>
  );
};

export default EncryptDecryptComponent;

