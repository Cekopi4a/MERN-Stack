import * as itemService from "../service/itemService";
import { useState,useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import ShopItem from "./ShopItem";


function Shop() {
    const [items, setItems] = useState([]);
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
    }    

    function handleAlcFree() {
        itemService.getAlcFree()
        .then(result => setItems(result));
}    

function handleDess() {
    itemService.getDess()
    .then(result => setItems(result));
}    

function handleGrill() {
    itemService.getGrill()
    .then(result => setItems(result));
}    

function handleHlqb() {
    itemService.getHlqb()
    .then(result => setItems(result));
}    

function handleHot() {
    itemService.getHot()
    .then(result => setItems(result));
}    

function handleMain() {
    itemService.getMain()
    .then(result => setItems(result));
}    

function handleSal() {
    itemService.getSal()
    .then(result => setItems(result));
}    

function handleSoup() {
    itemService.getSoup()
    .then(result => setItems(result));
}    

function handleTopping() {
    itemService.getTop()
    .then(result => setItems(result));
}    

  return (
    <>
    <section id="stats-counter" className="stats-counter ">
      <div className="container" data-aos="zoom-out">
        <div className="row gy-4">
          
        
        </div>
      </div>
    </section>

<section className="py-5">
                <div className="container text-center">
             <div className="btn-group" role="group" aria-label="Basic outlined example">


  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="d-inline-flex gap-1 ">
    <div className="container px-4 px-lg-5">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar1SupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
           <div className="collapse navbar-collapse" id="navbar1SupportedContent">
             <ul className="navbar-nav me-auto ms-lg-8">
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
                        <button type="button" className={`btn ${viewType === 'grid' ? 'active' : ''} m-6`} onClick={() => handleToggleView('grid')}>
                           <i className="bi bi-grid-fill"></i>
                        </button>
                        <button type="button" className={`btn ${viewType === 'list' ? 'active' : ''} m-6`} onClick={() => handleToggleView('list')}>
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
                            <ShopItem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                weight={item.weight}
                                volume={item.volume}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                viewType={viewType} // Подаваме типа на изгледа на компонента ShopItem
                            />
                        ))}
                    </div>
                </div>
            </section>

        </>
  );
}

export default Shop;