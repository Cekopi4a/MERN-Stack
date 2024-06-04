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
  const [items, setItems] = useState([]);
  const {user} = useAuthContext();
  const { logout } = useLogout();
  const [message, setMessage] = useState('');
  const [locationValid, setLocationValid] = useState(false);

  useEffect(() => {
    itemService.getHot()
    .then(result => setItems(result));
} ,[])

function handleHot() {
  itemService.getHot()
  .then(result => setItems(result));
}    

function handleMain() {
  itemService.getMain()
  .then(result => setItems(result));
}    

function handleDess() {
  itemService.getDess()
  .then(result => setItems(result));
}    

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
<>
<section id="hero" className="hero d-flex align-items-center section-bg">
    <div className="container">
        <div className="row justify-content-between gy-5">
            <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
                <h2 data-aos="fade-up">
                    Насладете се на вашата здравословна и
                    <br />
                    вкусна храна
                </h2>
                <p data-aos="fade-up" data-aos-delay={100}>
                    Насладете се на храна по ваш вкус и се почерпете с приятели!
                </p>
                <div className="d-flex" data-aos="fade-up" data-aos-delay={200}>
                    <a href="#book-a-table" className="btn-book-a-table">
                        Резервирайте маса
                    </a>
                    <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video d-flex align-items-center">
                        <i className="bi bi-play-circle" />
                        <span>Гледайте видео</span>
                    </a>
                </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
                <img src="assets/img/hero-img.png" className="img-fluid" alt="" data-aos="zoom-out" data-aos-delay={300} />
            </div>
        </div>
    </div>
</section>

<main id="main">
    <section id="about" className="about">
        <div className="container" data-aos="fade-up">
            <div className="section-header">
                <h2>За нас</h2>
                <p>
                    Научете повече <span>За нас</span>
                </p>
            </div>
            <div className="row gy-4">
                <div className="col-lg-7 position-relative about-img" style={{ backgroundImage: "url(assets/img/about.jpg)" }} data-aos="fade-up" data-aos-delay={150}>
                    <div className="call-us position-absolute">
                        <h4>Резервирайте маса</h4>
                        <p>+1 5589 55488 55</p>
                    </div>
                </div>
                <div className="col-lg-5 d-flex align-items-end" data-aos="fade-up" data-aos-delay={300}>
                    <div className="content ps-0 ps-lg-5">
                        <p className="fst-italic">
                        Добре дошли в ресторант – вашето място за изискана кулинарна наслада в сърцето на Казанлък! Нашият екип от талантливи готвачи използва само най-свежите и качествени съставки, за да създаде незабравими вкусови преживявания. В уютна и елегантна обстановка, вие можете да се насладите на разнообразие от ястия, вдъхновени от традиционната Българска кухня, с модерен и креативен привкус.
                        </p>
                        <ul>
                            <li>
                                <i className="bi bi-check2-all" /> Независимо дали търсите място за романтична вечеря, семейно събиране или бизнес обяд, Ресторанта е идеалното място за вас.
                            </li>
                            <li>
                                <i className="bi bi-check2-all" /> Нашият любезен персонал ще се погрижи за всеки детайл, за да се чувствате специални и добре дошли.
                            </li>
                      
                        </ul>
                        <p>
                        Заповядайте при нас и открийте магията на истинската гастрономия. Резервирайте своята маса днес и позволете на нашите изискани ястия да ви очароват!
                        </p>
                        <div className="position-relative mt-4">
                            <img src="assets/img/about-2.jpg" className="img-fluid" alt="" />
                            <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox play-btn" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section id="why-us" className="why-us section-bg">
        <div className="container" data-aos="fade-up">
            <div className="row gy-4">
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
                    <div className="why-box">
                        <h3>Защо да изберете Yummy?</h3>
                        <p>
                        Изберете Ресторанта, защото ние предлагаме уникално съчетание от качества, които правят всяко посещение при нас незабравимо изживяване. Ето защо нашият ресторант е вашият най-добър избор:
                        </p>
                        <div className="text-center">
                            <a href="#" className="more-btn">
                                Научете повече <i className="bx bx-chevron-right" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 d-flex align-items-center">
                    <div className="row gy-4">
                        <div className="col-xl-4" data-aos="fade-up" data-aos-delay={200}>
                            <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                                <i className="bi bi-clipboard-data" />
                                <h4>Изискана кухня</h4>
                                <p>
                                 Нашият главен готвач и екипът му създават шедьоври, използвайки само най-свежите и качествени съставки. Менюто ни предлага разнообразие от иновативни ястия, вдъхновени от Българската кухня .
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-4" data-aos="fade-up" data-aos-delay={300}>
                            <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                                <i className="bi bi-gem" />
                                <h4>Специални събития</h4>
                                <p>
                                Редовно организираме специални събития, тематични вечери и ексклузивни предложения, които добавят разнообразие и вълнение към вашите посещения.
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-4" data-aos="fade-up" data-aos-delay={400}>
                            <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                                <i className="bi bi-inboxes" />
                                <h4>Отлично обслужване</h4>
                                <p>
                                Нашият персонал е обучен да предоставя безупречно обслужване, като се грижи за всеки детайл и създава приятелска и гостоприемна атмосфера. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* End Why Us Section */}
    {/* ======= Stats Counter Section ======= */}
    <section id="stats-counter" className="stats-counter">
      <div className="container" data-aos="zoom-out">
        <div className="row gy-4">
        {/* Тук няма конкретни текстове за превод */}
        </div>
      </div>
    </section>
  {/* Край на секцията за брояча на статистики */}
  {/* ======= Секция Меню ======= */}
    <section id="menu" className="menu">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Нашето Меню</h2>
          <p>
            Вижте нашето <span>вкусно меню</span>
          </p>
        </div>
        <ul
          className="nav nav-tabs d-flex justify-content-center"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <li className="nav-item">
            <a
              className="nav-link active show"
              data-bs-toggle="tab"
              data-bs-target="#menu-starters"
              onClick={handleHot}
            >
              <h4>Топли ястия</h4>
            </a>
          </li>
        {/* Край на таб нав елемент */}
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#menu-breakfast"
              onClick={handleMain}
            >
              <h4>Основни ястия</h4>
            </a>
          {/* Край на таб нав елемент */}
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#menu-lunch"
              onClick={handleDess}
            >
              <h4>Десерти</h4>
            </a>
          </li>
        {/* Край на таб нав елемент */}
        
        </ul>
        <div className="tab-content" data-aos="fade-up" data-aos-delay={300}>
          <div className="tab-pane fade active show" id="menu-starters">
            <div className="tab-header text-center">
              <p>Меню</p>
              <h3>Предястия</h3>
            </div>
            <div className="row gy-5">
            {items.map((item) => (
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                  <img
                    src={item.imageUrl}
                    className="menu-img img-fluid"
                    alt=""
                    style={{height: "200px"}}
                  />
                </a>
                <h4>{item.name}</h4>
                <p className="ingredients">
                 {item.description}
                </p>
                <p className="price">{item.price.toFixed(2)} лв.</p>
              </div>
           
          ))}
            </div>
          </div>
        {/* Край на съдържанието за предястията */}







        <div className="tab-pane fade" id="menu-breakfast">
            <div className="tab-header text-center">
              <p>Меню</p>
              <h3>Основни</h3>
            </div>
            <div className="row gy-5">
            {items.map((item) => (
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                  <img
                    src={item.imageUrl}
                    className="menu-img img-fluid"
                    alt=""
                    style={{height: "200px"}}
                  />
                </a>
                <h4>{item.name}</h4>
                <p className="ingredients">
                 {item.description}
                </p>
                <p className="price">{item.price.toFixed(2)} лв.</p>
              </div>
           
          ))}
            </div>
          </div>
          {/* End Breakfast Menu Content */}







          <div className="tab-pane fade" id="menu-lunch">
            <div className="tab-header text-center">
              <p>Меню</p>
              <h3>Десерти</h3>
            </div>
            <div className="row gy-5">
            {items.map((item) => (
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                  <img
                    src={item.imageUrl}
                    className="menu-img img-fluid"
                    alt=""
                    style={{height: "200px"}}
                  />
                </a>
                <h4>{item.name}</h4>
                <p className="ingredients">
                 {item.description}
                </p>
                <p className="price">{item.price.toFixed(2)} лв.</p>
              </div>
           
          ))}
            </div>
          </div>
          {/* End Lunch Menu Content */}






          <div className="tab-pane fade" id="menu-dinner">
            <div className="tab-header text-center">
              <p>Menu</p>
              <h3>Dinner</h3>
            </div>
            <div className="row gy-5">
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-1.png" className="glightbox">
                  <img
                    src="assets/img/menu/menu-item-1.png"
                    className="menu-img img-fluid"
                    alt=""
                  />
                </a>
                <h4>Magnam Tiste</h4>
                <p className="ingredients">
                  Lorem, deren, trataro, filede, nerada
                </p>
                <p className="price">$5.95</p>
              </div>
              {/* Menu Item */}
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-2.png" className="glightbox">
                  <img
                    src="assets/img/menu/menu-item-2.png"
                    className="menu-img img-fluid"
                    alt=""
                  />
                </a>
                <h4>Aut Luia</h4>
                <p className="ingredients">
                  Lorem, deren, trataro, filede, nerada
                </p>
                <p className="price">$14.95</p>
              </div>
              {/* Menu Item */}
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-3.png" className="glightbox">
                  <img
                    src="assets/img/menu/menu-item-3.png"
                    className="menu-img img-fluid"
                    alt=""
                  />
                </a>
                <h4>Est Eligendi</h4>
                <p className="ingredients">
                  Lorem, deren, trataro, filede, nerada
                </p>
                <p className="price">$8.95</p>
              </div>
              {/* Menu Item */}
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-4.png" className="glightbox">
                  <img
                    src="assets/img/menu/menu-item-4.png"
                    className="menu-img img-fluid"
                    alt=""
                  />
                </a>
                <h4>Eos Luibusdam</h4>
                <p className="ingredients">
                  Lorem, deren, trataro, filede, nerada
                </p>
                <p className="price">$12.95</p>
              </div>
              {/* Menu Item */}
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-5.png" className="glightbox">
                  <img
                    src="assets/img/menu/menu-item-5.png"
                    className="menu-img img-fluid"
                    alt=""
                  />
                </a>
                <h4>Eos Luibusdam</h4>
                <p className="ingredients">
                  Lorem, deren, trataro, filede, nerada
                </p>
                <p className="price">$12.95</p>
              </div>
              {/* Menu Item */}
              <div className="col-lg-4 menu-item">
                <a href="assets/img/menu/menu-item-6.png" className="glightbox">
                  <img
                    src="assets/img/menu/menu-item-6.png"
                    className="menu-img img-fluid"
                    alt=""
                  />
                </a>
                <h4>Laboriosam Direva</h4>
                <p className="ingredients">
                  Lorem, deren, trataro, filede, nerada
                </p>
                <p className="price">$9.95</p>
              </div>
              {/* Menu Item */}
            </div>
          </div>
          {/* End Dinner Menu Content */}






          
        </div>
      </div>
    </section>
    {/* End Menu Section */}
    {/* ======= Testimonials Section ======= */}
    <section id="testimonials" className="testimonials section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Отзиви</h2>
          <p>
            Какво <span>казват те за нас</span>
          </p>
        </div>
        <div
          className="slides-1 swiper"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="testimonial-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="testimonial-content">
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        „Най-добрият ресторант в Казанлък! Всичко, което опитахме, беше приготвено до съвършенство. Персоналът беше изключително любезен и внимателен. Препоръчвам го на всички!“
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                      <h3>Иван Тодоров</h3>
                      <h4>Собственик и CEO</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img
                      src="assets/img/testimonials/testimonials-1.jpg"
                      className="img-fluid testimonial-img"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Край на отзив */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="testimonial-content">
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        Export tempor illum tamen malis malis eram quae irure
                        esse labore quem cillum quid cillum eram malis quorum
                        velit fore eram velit sunt aliqua noster fugiat irure
                        amet legam anim culpa.
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                      <h3>Sara Wilsson</h3>
                      <h4>Дизайнер</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img
                      src="assets/img/testimonials/testimonials-2.jpg"
                      className="img-fluid testimonial-img"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* End testimonial item */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="testimonial-content">
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        Enim nisi quem export duis labore cillum quae magna enim
                        sint quorum nulla quem veniam duis minim tempor labore
                        quem eram duis noster aute amet eram fore quis sint
                        minim.
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                      <h3>Jena Karlis</h3>
                      <h4>Store Owner</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img
                      src="assets/img/testimonials/testimonials-3.jpg"
                      className="img-fluid testimonial-img"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* End testimonial item */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="testimonial-content">
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        Quis quorum aliqua sint quem legam fore sunt eram irure
                        aliqua veniam tempor noster veniam enim culpa labore
                        duis sunt culpa nulla illum cillum fugiat legam esse
                        veniam culpa fore nisi cillum quid.
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                      <h3>John Larson</h3>
                      <h4>Entrepreneur</h4>
                      <div className="stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img
                      src="assets/img/testimonials/testimonials-4.jpg"
                      className="img-fluid testimonial-img"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* End testimonial item */}
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
    {/* End Testimonials Section */}
    {/* ======= Events Section ======= */}
    <section id="events" className="events">
      <div className="container-fluid" data-aos="fade-up">
        <div className="section-header">
          <h2>Събития</h2>
          <p>
            Споделете <span>Вашите Моменти</span> В Нашия Ресторант
          </p>
        </div>
        <div
          className="slides-3 swiper"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="swiper-wrapper">
            <div
              className="swiper-slide event-item d-flex flex-column justify-content-end"
              style={{ backgroundImage: "url(assets/img/events-1.jpg)" }}
            >
              <h3>Персонализирани Парти</h3>
              <div className="price align-self-start">$99</div>
              <p className="description">
                Насладете се на невероятни партита с колеги и приятели!
              </p>
            </div>
            {/* Край на Събитие */}
            <div
              className="swiper-slide event-item d-flex flex-column justify-content-end"
              style={{ backgroundImage: "url(assets/img/events-2.jpg)" }}
            >
              <h3>Частни Парти</h3>
              <div className="price align-self-start">$289</div>
              <p className="description">
                In delectus sint qui et enim. Et ab repudiandae inventore
                quaerat doloribus. Facere nemo vero est ut dolores ea assumenda
                et. Delectus saepe accusamus aspernatur.
              </p>
            </div>
            {/* Край на Събитие */}
            <div
              className="swiper-slide event-item d-flex flex-column justify-content-end"
              style={{ backgroundImage: "url(assets/img/events-3.jpg)" }}
            >
              <h3>Рожденни Парти</h3>
              <div className="price align-self-start">$499</div>
              <p className="description">
                Laborum aperiam atque omnis minus omnis est qui assumenda quos.
                Quis id sit quibusdam. Esse quisquam ducimus officia ipsum ut
                quibusdam maxime. Non enim perspiciatis.
              </p>
            </div>
            {/* Край на Събитие */}
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>

    {/* End Events Section */}
    {/* ======= Chefs Section ======= */}
    <section id="chefs" className="chefs section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Готвачи</h2>
          <p>
            Нашите <span>Професионални</span> Готвачи
          </p>
        </div>
        <div className="row gy-4">
          <div
            className="col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <div className="chef-member">
              <div className="member-img">
                <img
                  src="assets/img/chefs/chefs-1.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h4>Петър Иванов</h4>
                <span>Главен Готвач</span>
                <p>
                 Занимава се от 20г с традиционна българска кухня.Също така има опит с чуждестранни кухни и голям опит в сферата като е работил с най-добите по света.
                </p>
              </div>
            </div>
          </div>
          {/* Край на Член на Готвачите */}
          <div
            className="col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <div className="chef-member">
              <div className="member-img">
                <img
                  src="assets/img/chefs/chefs-2.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h4>Сара Петрова</h4>
                <span>Патиcтьор</span>
                <p>
                  Човек с огромен опит в кулинарията.В ранните си години готви с известни готвачи и има собствено предаване което се излъчва по най-гледаните телевизии.
                </p>
              </div>
            </div>
          </div>
          {/* Край на Член на Готвачите */}
          <div
            className="col-lg-4 col-md-6 d-flex align-items-stretch"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            <div className="chef-member">
              <div className="member-img">
                <img
                  src="assets/img/chefs/chefs-3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h4>Христо Георгиев</h4>
                <span>Готвач</span>
                <p>
                  Готвач със силно желание за развитие.Кариерата му започва от много малък като печели няколко формата и е управлявал някой от най-елитните заведения в Америка.
                </p>
              </div>
            </div>
          </div>
          {/* Край на Член на Готвачите */}
        </div>
      </div>
    </section>

    {/* End Chefs Section */}
    {/* ======= Book A Table Section ======= */}
    <section id="book-a-table" className="book-a-table">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Запазете Маса</h2>
          <p>
            Запазете <span>Вашето пребиваване</span> с нас
          </p>
        </div>
        <div className="row g-0">
          <div
            className="col-lg-4 reservation-img"
            style={{ backgroundImage: "url(assets/img/reservation.jpg)" }}
            data-aos="zoom-out"
            data-aos-delay={200}
          />
          <div className="col-lg-8 d-flex align-items-center reservation-form-bg">
            <form
              action="forms/book-a-table.php"
              method="post"
              role="form"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row gy-4">
                <div className="col-lg-4 col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Вашето Име"
                    data-rule="minlen:4"
                    data-msg="Моля, въведете поне 4 символа"
                  />
                  <div className="validate" />
                </div>
                <div className="col-lg-4 col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Вашият Имейл"
                    data-rule="email"
                    data-msg="Моля, въведете валиден имейл"
                  />
                  <div className="validate" />
                </div>
                <div className="col-lg-4 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    placeholder="Вашият Телефон"
                    data-rule="minlen:4"
                    data-msg="Моля, въведете поне 4 символа"
                  />
                  <div className="validate" />
                </div>
                <div className="col-lg-4 col-md-6">
                  <input
                    type="text"
                    name="date"
                    className="form-control"
                    id="date"
                    placeholder="Дата"
                    data-rule="minlen:4"
                    data-msg="Моля, въведете поне 4 символа"
                  />
                  <div className="validate" />
                </div>
                <div className="col-lg-4 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="time"
                    id="time"
                    placeholder="Час"
                    data-rule="minlen:4"
                    data-msg="Моля, въведете поне 4 символа"
                  />
                  <div className="validate" />
                </div>
                <div className="col-lg-4 col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    name="people"
                    id="people"
                    placeholder="# на хора"
                    data-rule="minlen:1"
                    data-msg="Моля, въведете поне 1 символ"
                  />
                  <div className="validate" />
                </div>
              </div>
              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows={5}
                  placeholder="Съобщение"
                  defaultValue={""}
                />
                <div className="validate" />
              </div>
              <div className="mb-3">
                <div className="loading">Зареждане</div>
                <div className="error-message" />
                <div className="sent-message">
                  Вашата заявка за резервация беше изпратена. Ще се свържем с вас или ще изпратим имейл, за да потвърдим вашата резервация. Благодарим ви!
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Запази маса</button>
              </div>
            </form>
          </div>
          {/* Край на Формата за Резервация */}
        </div>
      </div>
    </section>

    {/* End Book A Table Section */}
    {/* ======= Gallery Section ======= */}
    <section id="gallery" className="gallery section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Галерия</h2>
          <p>
            Разгледайте <span>нашата галерия</span>
          </p>
        </div>
        <div className="gallery-slider swiper">
          <div className="swiper-wrapper align-items-center">
            <div className="swiper-slide">
              <a
                className="glightbox"
                data-gallery="images-gallery"
                href="assets/img/gallery/gallery-1.jpg"
              >
                <img
                  src="assets/img/gallery/gallery-1.jpg"
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
            <div className="swiper-slide">
              <a
                className="glightbox"
                data-gallery="images-gallery"
                href="assets/img/gallery/gallery-2.jpg"
              >
                <img
                  src="assets/img/gallery/gallery-2.jpg"
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
            <div className="swiper-slide">
              <a
                className="glightbox"
                data-gallery="images-gallery"
                href="assets/img/gallery/gallery-3.jpg"
              >
                <img
                  src="assets/img/gallery/gallery-3.jpg"
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
            <div className="swiper-slide">
              <a
                className="glightbox"
                data-gallery="images-gallery"
                href="assets/img/gallery/gallery-4.jpg"
              >
                <img
                  src="assets/img/gallery/gallery-4.jpg"
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
            <div className="swiper-slide">
              <a
                className="glightbox"
                data-gallery="images-gallery"
                href="assets/img/gallery/gallery-5.jpg"
              >
                <img
                  src="assets/img/gallery/gallery-5.jpg"
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
            <div className="swiper-slide">
              <a
                className="glightbox"
                data-gallery="images-gallery"
                href="assets/img/gallery/gallery-6.jpg"
              >
                <img
                  src="assets/img/gallery/gallery-6.jpg"
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
            <div className="swiper-slide">
              <a
                className="glightbox"
                data-gallery="images-gallery"
                href="assets/img/gallery/gallery-7.jpg"
              >
                <img
                  src="assets/img/gallery/gallery-7.jpg"
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
            <div className="swiper-slide">
              <a
                className="glightbox"
                data-gallery="images-gallery"
                href="assets/img/gallery/gallery-8.jpg"
              >
                <img
                  src="assets/img/gallery/gallery-8.jpg"
                  className="img-fluid"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="swiper-pagination" />
        </div>
      </div>
    </section>
    {/* Край на Секцията за Галерия */}
    {/* ======= Секция за Контакти ======= */}
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Контакти</h2>
          <p>
            Нужда от помощ? <span>Свържете се с нас</span>
          </p>
        </div>
        <div className="mb-3">
          <iframe
            style={{ border: 0, width: "100%", height: 350 }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
            frameBorder={0}
            allowFullScreen=""
          />
        </div>
        {/* Край на Google Maps */}
        <div className="row gy-4">
          <div className="col-md-6">
            <div className="info-item  d-flex align-items-center">
              <i className="icon bi bi-map flex-shrink-0" />
              <div>
                <h3>Наш Адрес</h3>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
            </div>
          </div>
          {/* Край на Информацията */}
          <div className="col-md-6">
            <div className="info-item d-flex align-items-center">
              <i className="icon bi bi-envelope flex-shrink-0" />
              <div>
                <h3>Имейл</h3>
                <p>contact@example.com</p>
              </div>
            </div>
          </div>
          {/* Край на Информацията */}
          <div className="col-md-6">
            <div className="info-item  d-flex align-items-center">
              <i className="icon bi bi-telephone flex-shrink-0" />
              <div>
                <h3>Телефон</h3>
                <p>+1 5589 55488 55</p>
              </div>
            </div>
          </div>
          {/* Край на Информацията */}
          <div className="col-md-6">
            <div className="info-item  d-flex align-items-center">
              <i className="icon bi bi-share flex-shrink-0" />
              <div>
                <h3>Работно Време</h3>
                <div>
                  <strong>Пон-Съб:</strong> 11:00 - 23:00;
                  <strong>Неделя:</strong> Затворено
                </div>
              </div>
            </div>
          </div>
          {/* Край на Информацията */}
        </div>
        <form
          action="forms/contact.php"
          method="post"
          role="form"
          className="php-email-form p-3 p-md-4"
        >
          <div className="row">
            <div className="col-xl-6 form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Вашето име"
                required=""
              />
            </div>
            <div className="col-xl-6 form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Вашият имейл"
                required=""
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="subject"
              id="subject"
              placeholder="Относно"
              required=""
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="message"
              rows={5}
              placeholder="Съобщение"
              required=""
              defaultValue={""}
            />
          </div>
          <div className="my-3">
            <div className="loading">Зареждане</div>
            <div className="error-message" />
            <div className="sent-message">
              Вашето съобщение беше изпратено. Благодарим ви!
            </div>
          </div>
          <div className="text-center">
            <button type="submit">Изпрати съобщение</button>
          </div>
        </form>
        {/* Край на Формата за Контакт */}
      </div>
    </section>
    {/* Край на Секцията за Контакти */}
  </main>

  {/* End #main */}


  {/* ======= Footer ======= */}
</>




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