// PaymentForm.js

import React, { useState } from 'react';

const PaymentForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
    cardHolder: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Изпрати данните за плащане към сървъра или Stripe за обработка
    console.log(formData);
    onClose(); // Затвори модалния прозорец след успешно плащане
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="cardNumber" className="form-label">Card Number</label>
        <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="expDate" className="form-label">Expiration Date</label>
          <input type="text" className="form-control" id="expDate" name="expDate" value={formData.expDate} onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input type="text" className="form-control" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="cardHolder" className="form-label">Card Holder Name</label>
        <input type="text" className="form-control" id="cardHolder" name="cardHolder" value={formData.cardHolder} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
