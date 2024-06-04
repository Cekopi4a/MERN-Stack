import Swal from 'sweetalert2';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

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
        name: '',
        volume: '',
        weight: '',
        price: '',
        description: '',
        imageUrl: '',
        collection: '',
    });

    const deleteProduct = async (id) => {
        const hasConfirm = confirm(`Сигурен ли сте че искате да изтриете продукт с ID-${id}`);
        if (hasConfirm) {
            try {
                const response = await fetch(`http://localhost:5050/api/product/${collection}/${id}`, {
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

    const editProductHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5050/api/product/${currentProduct.collection}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(currentProduct),
            });

            if (!response.ok) {
                throw new Error('Неуспешна заявка за редактиране!');
            }

            const result = await response.json();

            // Обновете UI с новите данни, ако е необходимо

            Swal.fire({
                position: "top",
                icon: "success",
                title: "Успешно редактирахте продукт!",
                showConfirmButton: false,
                timer: 2500,
            });

        } catch (error) {
            console.error('Грешка при редактиране на продукт:', error);
            alert('Грешка при редактиране на продукт. Моля, опитайте отново.');
        }
    };

    const onChange = (e) => {
        setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
    };

    const handleEditButtonClick = () => {
        setCurrentProduct({
            name,
            volume,
            weight,
            price,
            description,
            imageUrl,
            collection,
        });
    };

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
                                            data-toggle="modal"
                                            data-target="#editProductModal"
                                            className="btn btn-outline-primary"
                                            onClick={handleEditButtonClick}
                                        >
                                            Редактирай
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteProduct(id)}
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

            <div id="editProductModal" className="modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={editProductHandler}>
                            <div className="modal-header">
                                <h4 className="modal-title">Редактирай</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <label>Категория</label>
                                <div className="input-group mb-3">
                                    <select
                                        className="form-select"
                                        name="collection"
                                        onChange={onChange}
                                        id="inputGroupSelect02"
                                        value={currentProduct.collection}
                                    >
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
                                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-success" value="Редактирай" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;

