import React, { useState, useRef, useEffect } from 'react';
import './Garments.css';
import sarees from '../../assets/sarees.png';
import garments1 from '../../assets/garments1.png';
import garments2 from '../../assets/garments2.png';
import garments3 from '../../assets/garments3.png';
import garments4 from '../../assets/garmnents4.png';

const Garments = () => {
  const products = [
    { id: 1, name: 'Garment 1', image: garments1 },
    { id: 2, name: 'Garment 2', image: garments2 },
    { id: 3, name: 'Garment 3', image: garments3 },
    { id: 4, name: 'Garment 4', image: garments4 }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const slides = [];
  for (let i = 0; i < products.length; i += itemsPerSlide) {
    slides.push(products.slice(i, i + itemsPerSlide));
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto‑play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, totalSlides]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  return (
    <div className="garments-page">
      <div className="container">
        <div className="page-header">
          <h1>Garments</h1>
          <p>Textile & Apparel</p>
        </div>

        <div
          className="carousel-wrapper"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <div className="carousel-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="carousel-slide">
                  <div className="image-grid">
                    {slide.map((product, idx) => (
                      <div key={product.id} className="image-card">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image-only"
                        />
                      </div>
                    ))}
                    {/* Fill empty slots with empty cards */}
                    {slide.length < itemsPerSlide &&
                      Array(itemsPerSlide - slide.length)
                        .fill(null)
                        .map((_, i) => (
                          <div key={`empty-${i}`} className="image-card empty-card" />
                        ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-arrow prev" onClick={prevSlide}>‹</button>
          <button className="carousel-arrow next" onClick={nextSlide}>›</button>

          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Garments;