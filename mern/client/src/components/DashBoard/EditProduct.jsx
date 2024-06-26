import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const { id,collection } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
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
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(collection);
                const response = await fetch(`http://localhost:5050/api/product/getOne/${collection}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                const result = await response.json();
                setCurrentProduct(result);
                console.log(result);

            } catch (error) {
                console.error('Грешка при зареждане на продукт:', error);
                alert('Грешка при зареждане на продукт. Моля, опитайте отново.');
            }
        };

        fetchProduct();
    }, [collection, id, user.token]);
    
    const editProductHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            const response = await fetch(`http://localhost:5050/api/product/updateProduct/${collection}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (response.ok) {
                setCurrentProduct(result);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Успешно редактирахте продукт!",
                    showConfirmButton: false,
                    timer: 2500,
                });
                navigate('/dashboard');
            } else {
                throw new Error(result.message || 'Неуспешна заявка за редактиране!');
            }
        } catch (error) {
            console.error('Грешка при редактиране на продукт:', error);
            alert('Грешка при редактиране на продукт. Моля, опитайте отново.');
        }
    };

    const onChange = (e) => {
        setCurrentProduct(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };


return (
    <div className="container">
            <form onSubmit={editProductHandler}>
                <div className="modal-header">
                    <h4 className="modal-title">Редактирай</h4>
                </div>
                <div className="modal-body">
                    <label>Категория</label>
                    <div className="input-group mb-3">
                        <select
                            className="form-select"
                            name="collection"
                            onChange={onChange}
                            id="inputGroupSelect02"
                            value={currentProduct.collection}>
                            <option value="Alcohol">Алкохол</option>
                            <option value="Alcohol-free">Безалкохолно</option>
                            <option value="Grill">Грил</option>
                            <option value="Hot-dishes">Топли ястия</option>
                            <option value="Main-dishes">Основни ястия</option>
                            <option value="Salad">Салати</option>
                            <option value="Soup">Супи</option>
                            <option value="Bread">Хляб</option>
                            <option value="Dessert">Десерти</option>
                            <option value="Toppings and side dishes">Добавки</option>
                        </select>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Опция</label>
                    </div>
                    <div className="form-group">
                        <label>Име</label>
                        <input
                            type="text"
                            name="name"
                            value={currentProduct.name}
                            onChange={onChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Количество</label>
                        <input
                            type="text"
                            name="volume"
                            value={currentProduct.volume}
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Грамаж</label>
                        <input
                            type="text"
                            name="weight"
                            value={currentProduct.weight}
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>
                    <label>Цена</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            name="price"
                            value={currentProduct.price}
                            onChange={onChange}
                            aria-label="Dollar amount (with dot and two decimal places)"
                        />
                        <span className="input-group-text">лв</span>
                        <span className="input-group-text">0.00</span>
                    </div>
                    <label>Описание</label>
                    <div className="input-group">
                        <span className="input-group-text">Описание</span>
                        <textarea
                            className="form-control"
                            name="description"
                            value={currentProduct.description}
                            onChange={onChange}
                            aria-label="With textarea"
                        />
                    </div>
                    <div className="form-group">
                        <label>Изображение</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={currentProduct.imageUrl}
                            onChange={onChange}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="modal-footer">
                <input type="button" onClick={() => (navigate('/dashboard'))} className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                    <input type="submit" className="btn btn-success" value="Редактирай" />
                </div>
            </form>
        </div>
)}


export default EditProduct;