import useItems from "../hooks/useItems";
import UsersItems from "./UsersItems";
import { Link } from "react-router-dom";
import ShopItem from "./ShopItem";
import { useState,useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import * as itemService from '../service/itemService'
import { useLogout } from '../hooks/useLogout';
import Swal from 'sweetalert2';
import Video from '../../img/Restaurant-Video.mp4';


const Home = () => {
  const [latItem, setLatItem] = useState([]);
  const {user} = useAuthContext();
  const { logout } = useLogout();
  const [message, setMessage] = useState('');
  const [locationValid, setLocationValid] = useState(false);

  useEffect(() => {
    itemService.getLatest()
        .then(result => setLatItem(result));
}, [])

const callWaiter = async () => {

  const userTable = user.table;
  console.log(userTable);
  console.log(user.token);
  const response = await fetch('http://localhost:5050/api/call/callClient', {
    method: 'POST',
    body: JSON.stringify(userTable),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    }
  })
  const json = await response.json()

  console.log(json);
  if (!response.ok) {
    console.log("Error");
  }
  if (response.ok) {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Your order has been placed successfully!",
      showConfirmButton: false,
      timer: 1850
    });
    console.log("Success") ;
}
}



  const isInBounds = (lat, long) => {
    // Примерни граници за София
    const minLat = 42.43;
    const maxLat = 42.75;
    const minLong = 25.18;
    const maxLong = 26.68;
    return lat >= minLat && lat <= maxLat && long >= minLong && long <= maxLong;
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const locationValid = await checkLocation();
      if (locationValid) {
        setLocationValid(true);
        setMessage('Вие сте в правилната локация.');
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "You are at the right place!",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          title: "Вие не сте в правилната локация!",
          text: "Мислите ли, че има проблем?",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Извикай сервитьор!"
        }).then((result) => {
          logout();
          if (result.isConfirmed) {
            Swal.fire({
              title: "Обработка на заявката!",
              text: "Сервитьорът идва!",
              icon: "success"
            }).then(() => {
              callWaiter();
              logout();
            });
          }
        });
      }
    } catch (error) {
      logout();
      console.error('Грешка при проверката на локацията:', error.message);
    }
  };

  fetchData();
}, [locationValid]);



  const checkLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              // Тук проверяваме локацията спрямо границите
              const locationValid = isInBounds(latitude, longitude);
              console.log(position.coords);
              resolve(locationValid);
          }, (error) => {
              reject(new Error(`Грешка при извличане на локацията: ${error.message}`));
          });
      } else {
          reject(new Error('Геолокацията не е поддържана от вашия браузър.'));
      }
  });
};

  return(
    <>
 
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="5000">
      <img src="https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg" style={{height: "780px"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="https://cdn.britannica.com/02/239402-050-ACC075DB/plates-of-vegan-foods-ready-serve-restaurant-London.jpg" style={{height: "780px"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/03/13/14/root-bristol-1.jpg" style={{height: "780px"}} className="d-block w-100" alt="..."/>
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
  
  <video src={Video} className="object-fit-cover" autoplay/>
  <source src={Video} type="video/mp4"/>
  <source src="movie.ogg" type="video/ogg"/>


    

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
    {/* {latItem.map(item => <ShopItem 
    key={item.id}
    id={item._id}
    {...item} />)} */}
    </div>
    </div>

</>
  );
};

export default Home;