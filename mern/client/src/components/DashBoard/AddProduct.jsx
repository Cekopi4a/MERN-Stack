import * as itemService from "../../service/itemService";
import { useState,useEffect,useContext } from "react";
import {AuthContext} from './../../context/AuthContext';
import { Outlet, Link, useParams } from "react-router-dom";
import Product from './Product';
import Swal from 'sweetalert2';


function AddProduct() {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [collection, setCollection] = useState('');
    const [viewType, setViewType] = useState('grid'); // По подразбиране сетваме грид изглед

    const handleToggleView = (type) => {
        setViewType(type);
    };

    useEffect(() => {
       itemService.getAlc()
       .then(result => setItems(result));
    },[]);

    function handleAlc() {
            itemService.getAlc()
            .then(result => setItems(result));
            setCollection('alcohol');
            console.log(collection);
    }    

    function handleAlcFree() {
        itemService.getAlcFree()
        .then(result => setItems(result));
        setCollection('alcfree');
        console.log(collection);
}    

function handleDess() {
    itemService.getDess()
    .then(result => setItems(result));
    setCollection('dessert');
}    

function handleGrill() {
    itemService.getGrill()
    .then(result => setItems(result));
    setCollection('grill');
}    

function handleHlqb() {
    itemService.getHlqb()
    .then(result => setItems(result));
    setCollection('bread');
}    

function handleHot() {
    itemService.getHot()
    .then(result => setItems(result));
    setCollection('hotdish');
}    

function handleMain() {
    itemService.getMain()
    .then(result => setItems(result));
    setCollection('maindish');
}    

function handleSal() {
    itemService.getSal()
    .then(result => setItems(result));
    setCollection('salad');
    console.log(collection);
}    

function handleSoup() {
    itemService.getSoup()
    .then(result => setItems(result));
    setCollection('soup');
}    

function handleTopping() {
    itemService.getTop()
    .then(result => setItems(result));
    setCollection('topping');
}    


const AddItemHandler = async (e) => {
    e.preventDefault();

    const itemData = Object.fromEntries(new FormData(e.currentTarget))
  console.log(itemData);
        try {
      const response = await fetch(`http://localhost:5050/api/product/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(itemData)
    });
    const result = await response.json();

    Swal.fire({
      position: "top",
      icon: "success",
      title: "Успешно регистирахте нов потребител!",
      showConfirmButton: false,
      timer: 2500
    });
    if (!response.ok) {
      throw new Error('Неуспешна заявка за добавяне!');
    }
    alert('Потребителя беше успешно добавен!');
    
  } catch (error) {
    console.error('Грешка при одобряване на поръчка:', error);
    alert('Грешка при одобряване на поръчка. Моля, опитайте отново.');
  }
};

  return (
    <>
<section className="py-5">
                <div className="container text-center">
             <div className="btn-group" role="group" aria-label="Basic outlined example">


  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="d-inline-flex gap-1 ">
    <div className="container px-4 px-lg-5">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar1SupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
           <div className="collapse navbar-collapse" id="navbar1SupportedContent">
             <ul className="navbar-nav me-auto ms-lg-4">
 <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleAlc}>Алкохол</button>
 <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleAlcFree}>Безалкохолно</button>
  <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleMain}>Основни ястия</button>
  <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleHot}>Топли ястия</button>
  <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleSal}>Салати</button>
  <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleSoup}>Супи</button>
  <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleGrill}>Грил</button>
  <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleDess}>Десерти</button>
  <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleHlqb}>Хляб</button>
  <button type="button" className="btn active m-1" aria-pressed="true" onClick={handleTopping}>Добавки</button>
  </ul>
</div>
</div>
</div>

                <div className="container text-end">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        {/* Добавяме бутони за превключване на изглед */}
                        <button type="button" className={`btn ${viewType === 'grid' ? 'active' : ''} m-1`} onClick={() => handleToggleView('grid')}>
                           <i className="bi bi-grid-fill"></i>
                        </button>
                        <button type="button" className={`btn ${viewType === 'list' ? 'active' : ''} m-1`} onClick={() => handleToggleView('list')}>
                           <i className="bi bi-list-ul"></i>
                        </button>
                    </div>
                </div>
                </nav>


</div>
</div>

                <div className="container px-4 px-lg-5 mt-5">
                    <div className={`row gx-4 gx-lg-5 row-cols-1  ${viewType === 'list' ? 'row-cols-1' : 'row-cols-md-2 row-cols-xl-4'} justify-content-center`}>
                        {/* Проверяваме типа на изгледа и показваме съдържанието според него */}
                        {items.map((item) => (
                            <Product
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                weight={item.weight}
                                volume={item.volume}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                viewType={viewType} // Подаваме типа на изгледа на компонента ShopItem
                                collection={collection}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-sm-6">
						<a href="#addItemModal" className="btn btn-success" data-toggle="modal"><i className="bi bi-person-plus"></i> <span>Добави потребител</span></a>						
					</div>
            </section>
            
            <div id="addItemModal" className="modal fade">
	<div className="modal-dialog">
		<div className="modal-content">
			<form onSubmit={AddItemHandler}>
				<div className="modal-header">						
					<h4 className="modal-title">Добави</h4>
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div className="modal-body">	
                <label>Категория</label>
    <div className="input-group mb-3">
  <select className="form-select" name="collectionName" id="inputGroupSelect02">
    <option selected>Избери...</option>
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
						<input type="text" name="name" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Количество</label>
						<input type="text" name="volume" className="form-control" />
					</div>
                    <div className="form-group">
						<label>Грамаж</label>
						<input type="text" name="weight" className="form-control" />
					</div>
                    <label>Цена</label>
        <div class="input-group">
  <input type="text" class="form-control" name="price" aria-label="Dollar amount (with dot and two decimal places)"/>
  <span class="input-group-text">лв</span>
  <span class="input-group-text">0.00</span>
</div>
<label>Описание</label>
<div class="input-group">
  <span class="input-group-text">Описание</span>
  <textarea class="form-control" name="description" aria-label="With textarea"></textarea>
</div>

<div className="form-group">
						<label>Изображение</label>
						<input type="text" name="imageUrl" className="form-control" required/>
					</div>
				</div>
				<div className="modal-footer">
					<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
					<input type="submit" className="btn btn-success" value="Добави" />
				</div>
			</form>
		</div>
	</div>
</div>
        </>
  );
}

export default AddProduct;