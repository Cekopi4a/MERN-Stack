import useItems from "../hooks/useItems";
import UsersItems from "./UsersItems";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { useState,useEffect } from "react";
import * as itemService from '../service/itemService'



const Home = () => {
  const [latItem, setLatItem] = useState([]);

  useEffect(() => {
    itemService.getLatest()
        .then(result => setLatItem(result));
}, [])
  return(
    <>
  <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="5000">
      <img src="./assets/photo/car11.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="./assets/photo/car2.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="./assets/photo/car3.jpg" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


    

  <header className="bg-dark py-5">
    <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Latest car in shop</h1>
            <p className="lead fw-normal text-white-50 mb-0">This is last added products.</p>
        </div>
    </div>
</header>



<div className="container px-4 px-lg-5 mt-5">
<div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
    {latItem.map(item => <ShopItem 
    key={item.id}
    id={item._id}
    {...item} />)}
    </div>
    </div>

</>
  );
};

export default Home;