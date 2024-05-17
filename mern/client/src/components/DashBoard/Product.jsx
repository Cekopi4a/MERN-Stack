import { Outlet, useNavigate,useLocation,Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState } from 'react';
import {useAuthContext} from '../../hooks/useAuthContext';

const Product = ({
    id,
    name,
    description,
    weight,
    volume,
    price,
    imageUrl,
    viewType,
}) => {

    const { user } = useAuthContext();

       const cart = {id,
        name,
        description,
        weight,
        volume,
        price,
        imageUrl};
 
        const deleteProduct = async (id) => {
            const hasconfirm = confirm(`Сигурен ли сте че искате да изтриете продукт с ID-${id}`);
          
              if(hasconfirm){
                  try {
              const response = await fetch(`http://localhost:5050/api/product/delete/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
          },
        });
    
        const data = await response.json();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Успешно изтрихте продукт!",
          showConfirmButton: false,
          timer: 2500
        });
        if (!response.ok) {
          throw new Error(data.message || 'Failed to delete user');
        }
    
        // Можете да използвате реактивна логика за презареждане на данните или обновяване на UI
      } catch (error) {
        console.error('Error deleting user:', error.message);
        // Обработка на грешка и показване на съобщение към потребителя
      }
    };
            
              
            };


return (
    <div className={`col mb-5 ${viewType === 'list' ? 'mt-3' : ''}`}>
        <div className={`card h-100 ${viewType === 'list' ? 'border' : ''}`}>
            <div className="row g-0">
                <div className={`col-md-${viewType === 'list' ? '4' : '12'}`}>
                    <img className="card-img-top" style={{height: "248px"}} src={imageUrl} alt="..." />
                </div>
                <div className={`col-md-${viewType === 'list' ? '8' : '12'}`}>
                    <div className="card-body p-4">
                        <div className={`text-${viewType === 'list' ? 'start' : 'center'}`}>
                            <h5 className="fw-bolder">{name}</h5>
                            {price} лв.- {weight} {volume}.
                            <p><br />{description}</p>
                        </div>
                    </div>
                    {user && (
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="container text-center" >
                                    
<div class="btn-group" role="group" aria-label="Basic outlined example">
  <button type="button" class="btn btn-outline-primary">Редактирай</button>
  <button type="button" onClick={() => deleteProduct(id)} class="btn btn-outline-primary">Изтрий</button>
</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
};


export default Product;