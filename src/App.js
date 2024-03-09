import React, { useState, useEffect } from 'react';
import './App.css';
import images from './imagesData'; // загружаем фотки типа как с сервера (mock-заглушки)


//КОМОПНЕНТ СМЕНЫ ФОТОК:
const SliderImages = ({ images, currentIndex, options }) => {

    return (
    <div className="slider__images">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image n${index} ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image.url})` }} //вот тут фактически и происходит перемотка фото в зав-ти от state-индекса
        ></div>
      ))}
      {options.titles && <div className="slider__images-title">
          {images[currentIndex].title}
        </div> }
      
    </div>
    )
};
  
  
    
//КОМОПНЕНТ СМЕНЫ ТОЧЕК:
  const SliderDots = ({ images, currentIndex, handleDotClick }) => (
    <div className="slider__dots">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slider__dots-item n${index} ${index === currentIndex ? 'active' : ''}`}  //вот тут точка помечается в соответствии с текущей фоткой
          onClick={() => handleDotClick(index)}//а при нажатии на точку - запускается смена фотки
        ></div>
      ))}
    </div>
  );



export default function App() {
 //меню ручной настройки вида слайдера:
  let options = {   
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 5000
  };

//общий стейт изменения индекса фото и точечки:
 const [currentIndex, setCurrentIndex] = useState(0);

//автоперемотка:
useEffect(() => {
    if (options.autoplay) {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));  //показывает что мотать слева направо
    }, options.autoplayInterval);

    return ( () => clearInterval(intervalId) )  //необяз
    }
}, []);


//обработчик стрелок:
const handleArrowClick = (direction) => {
    if (direction === 'left') {
        const newIndex = (currentIndex === 0 ? images.length - 1 : currentIndex - 1);
        setCurrentIndex(newIndex);
      } else {
        const newIndex = (currentIndex === images.length - 1 ? 0 : currentIndex + 1);
        setCurrentIndex(newIndex);
      }
}

//обработчик точек:
    const handleDotClick  = (index) => {
    setCurrentIndex(index);
}




return (
    <main>
      <section className="slider">
        <SliderImages images={images} currentIndex={currentIndex} />
        <div className="slider__arrows">
          <div className="slider__arrow left" onClick={() => handleArrowClick('left')}>&#9668;</div>
          <div className="slider__arrow right" onClick={() => handleArrowClick('right')}>&#9658;</div>
        </div>
        {options.dots && <SliderDots images={images} currentIndex={currentIndex} handleDotClick={handleDotClick} />}
      </section>
    </main>
  );
}