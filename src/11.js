
//САМОЕ КОРОТКОЕ (но всё в одном компоненте App)


import React, { useState, useEffect } from 'react';
import './App.css';

/* сюда загружаем фотки и подписи - массив объектов*/
let images = [{
    url: "https://img.favcars.com/mini/hatch/mini_hatch_2010_wallpapers_14_1280x960.jpg",
    title: "Mini Cooper черный"
  }, {
    url: "https://img.favcars.com/mini/cabrio/mini_cabrio_2009_pictures_5_1280x960.jpg",
    title: "Mini Cooper красный"
  }, {
    url: "https://www.t-r-n.ru/files/modification-images/cb/a8/5c/f9/40061_tmb940.jpg",
    title: "Mini Cooper синий"
  }, {
    url: "https://a.d-cd.net/af41e8cs-960.jpg",
    title: "Mini Cooper бордовый"
  }, {
    url: "https://i1.7fon.org/thumb/m604508.jpg",
    title: "Mini Cooper белый"
}];

export default function App() {
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
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));  //показывает что мотать слева направо
    }, options.autoplayInterval);

    return ( () => clearInterval(intervalId) )  //необяз
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
        <section class="slider">
        
        <div class="slider__images">
        {images.map((image, index) => (
              <div
                key={index}
                className={`image n${index} ${index === currentIndex ? 'active' : ''}`}
                style={{ backgroundImage: `url(${image.url})` }} //вот тут фактически и происходит перемотка фото в зав-ти от state-индекса
               ></div>
            ))}
            <div className="slider__images-title">
              {images[currentIndex].title}
            </div>
        </div>


        <div class="slider__arrows">
          <div class="slider__arrow left" onClick={() => handleArrowClick('left')}>&#9668;</div>
          <div class="slider__arrow right" onClick={() => handleArrowClick('right')}>&#9658;</div>
        </div>


        <div className="slider__dots">
            {images.map((image, index) => (
              <div
                key={index}
                className={`slider__dots-item n${index} ${index === currentIndex ? 'active' : ''}`} //вот тут точка помечается в соответствии с текущей фоткой
                onClick={() => handleDotClick(index)} //а при нажатии на точку - запускается смена фотки
              ></div>
            ))}
          </div>

      </section>
    </main>
    )

}

