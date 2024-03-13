import "./style.scss"
import React, {useState} from "react";

export const Slider = () => {


    const images = ['/news/new001/001.jpg','/news/new001/002.jpg','/news/new001/003.jpg','/news/new001/004.jpg','/news/new001/005.jpg']

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };




    return (
        <div className="slider_block" style={{backgroundImage: `url(/slider/slider.jpg)`}}>
            <div className='gallery_app'>
                <div className='img' style={{backgroundImage: `url(${images[currentImageIndex]})`}} alt={`Image ${currentImageIndex + 1}`} />
                <div className='button_block'>
                    <div className='button' onClick={prevImage}><i className="fa-solid fa-caret-left"></i></div>
                    <div className='button' onClick={nextImage}><i className="fa-solid fa-caret-right"></i></div>
                </div>
            </div>
        </div>
    )
}