// CardPaymentForm.jsx
import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2';

const CardPaymentForm = ({ onComplete }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Изпращане на данните на сървъра или друга логика за обработка
    // Например: fetch или axios заявка към http://localhost
    // ...
if(cvv == cvv.length == '3'){
    // Извикване на onComplete функцията за продължение
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Payment Successfully!",
      showConfirmButton: false,
      timer: 1500
    });
  }else
    onComplete();
  };

  useEffect(() => {
    setIsFormValid(cardNumber.trim() !== '' && expiryDate.trim() !== '' && cvv.trim() !== '');
  }, [cardNumber, expiryDate, cvv]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Номер на карта:
        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
      </label>
      <label>
        Дата на валидност:
        <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
      </label>
      <label>
        CVV код:
        <input type="text" value={cvv} onChange={(e) => setCVV(e.target.value)} />
      </label>
      <hr />
      <button type="submit"  disabled={!isFormValid}>Плащане</button>
    </form>
  );
};

export default CardPaymentForm;
