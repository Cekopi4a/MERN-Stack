import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url }) => {
  const [qrValue, setQrValue] = useState(url);

  const handleChange = (e) => {
    qrValue(e.target.value);
  };

  return (
    <div>
      <label>
        QR Code Value:
      </label>
      <br />
      <QRCode value={qrValue} />
    </div>
  );
};

export default QRCodeGenerator;
