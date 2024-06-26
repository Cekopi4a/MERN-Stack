import Swal from 'sweetalert2';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const Product = ({
    id,
    name,
    description,
    weight,
    volume,
    price,
    imageUrl,
    viewType,
    collection,
}) => {
    const { user } = useAuthContext();
    const [currentProduct, setCurrentProduct] = useState({
        id: '',
        name: '',
        volume: '',
        weight: '',
        price: '',
        description: '',
        imageUrl: '',
        collection: '',
    });

    console.log(collection); // Лог за проверка на collection

    const deleteProduct = async (id,name,collection) => {
        const hasConfirm = confirm(`Сигурен ли сте че искате да изтриете-${name}.`);
        console.log(collection);
        if (hasConfirm) {
            try {
                const response = await fetch(`http://localhost:5050/api/product/delete/${collection}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to delete product');
                }

                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Успешно изтрихте продукт!",
                    showConfirmButton: false,
                    timer: 2500,
                });

                // Можете да използвате реактивна логика за презареждане на данните или обновяване на UI
            } catch (error) {
                console.error('Error deleting product:', error.message);
                // Обработка на грешка и показване на съобщение към потребителя
            }
        }
    };

    // const editProductHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`http://localhost:5050/api/product/${currentProduct.collection}/${id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${user.token}`,
    //             },
    //             body: JSON.stringify(currentProduct),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Неуспешна заявка за редактиране!');
    //         }

    //         const result = await response.json();

    //         // Обновете UI с новите данни, ако е необходимо

    //         Swal.fire({
    //             position: "top",
    //             icon: "success",
    //             title: "Успешно редактирахте продукт!",
    //             showConfirmButton: false,
    //             timer: 2500,
    //         });

    //     } catch (error) {
    //         console.error('Грешка при редактиране на продукт:', error);
    //         alert('Грешка при редактиране на продукт. Моля, опитайте отново.');
    //     }
    // };

    // const onChange = (e) => {
    //     setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
    // };

    // const handleEditButtonClick = async (id) => {
    //     try {
    //         const response = await fetch(`http://localhost:5050/api/product/getOne/${currentProduct.collection}/${id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${user.token}`,
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error('Неуспешна заявка за редактиране!');
    //         }

    //         const result = await response.json();

    //         setCurrentProduct({
    //             id,
    //             name,
    //             volume,
    //             weight,
    //             price,
    //             description,
    //             imageUrl,
    //             collection,
    //         });
    //         Swal.fire({
    //             position: "top",
    //             icon: "success",
    //             title: "Успешно редактирахте продукт!",
    //             showConfirmButton: false,
    //             timer: 2500,
    //         });

    //     } catch (error) {
    //         console.error('Грешка при редактиране на продукт:', error);
    //         alert('Грешка при редактиране на продукт. Моля, опитайте отново.');
    //     }

       
    // };


    return (
        <div className={`col mb-5 ${viewType === 'list' ? 'mt-3' : ''}`}>
            <div className={`card h-100 ${viewType === 'list' ? 'border' : ''}`}>
                <div className="row g-0">
                    <div className={`col-md-${viewType === 'list' ? '4' : '12'}`}>
                        <img className="card-img-top" style={{ height: "248px" }} src={imageUrl} alt="..." />
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
                                <div className="container text-center">
                                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                        >
                                        <Link to={`/editProduct/${collection}/${id}`} className="edit" data-toggle="modal">Редактирай</Link>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteProduct(id,name,collection)}
                                            className="btn btn-outline-primary"
                                        >
                                            Изтрий
                                        </button>
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

