import * as itemService from "../service/itemService";
import { useState,useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import ShopItem from "./ShopItem";


function Shop() {
    const [items, setItems] = useState([]);

    useEffect(() => {
       itemService.getAll()
       .then(result => setItems(result));
    },[]);

  return (
    <>
    <header className="bg-dark py-5">
    <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
        </div>
    </div>
</header>
<section className="py-5">

<div className="container text-center">
             <div className="btn-group" role="group" aria-label="Basic outlined example">

<div className="d-inline-flex gap-1 ">
<Link to={`/shop/alcohol`}> <button type="button" class="btn active" aria-pressed="true">Алкохол</button></Link>
<Link to={`/shop/noalcohol`}><button type="button" class="btn active" aria-pressed="true">Безалкохолно</button></Link>
  <button type="button" class="btn active" aria-pressed="true">Основни ястия</button>
  <button type="button" class="btn active" aria-pressed="true">Топли ястия</button>
  <button type="button" class="btn active" aria-pressed="true">Салати</button>
  <button type="button" class="btn active" aria-pressed="true">Супи</button>
  <button type="button" class="btn active" aria-pressed="true">Грил</button>
  <button type="button" class="btn active" aria-pressed="true">Десерти</button>
  <button type="button" class="btn active" aria-pressed="true">Хляб</button>
  <button type="button" class="btn active" >Добавки</button>
</div>

</div>
</div>

<div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                

                {items.map((item)=>(
				<ShopItem
                key={item._id}
                id={item._id}
				brand={item.brand}
				model={item.model}
				price={item.price}
				imageUrl={item.imageUrl}
                />))}
                </div>
            </div>
</section>
        </>
  );
}

export default Shop;