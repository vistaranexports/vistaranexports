import React, { useState, useRef, useEffect } from 'react';
import './Pulses.css';
import dal from '../../assets/dal.png';
import p1 from '../../assets/p1.jpeg';
import p2 from '../../assets/p2.jpeg';
import p3 from '../../assets/p3.jpeg';

import p5 from '../../assets/p5.jpeg';
import p6 from '../../assets/p6.jpeg';

const Pulses = () => {
  const products = [
    { id: 1, name: 'Toor Dal', image: dal },
    { id: 2, name: 'Chana Dal', image: p1 },
    { id: 3, name: 'Urad Dal', image: p2 },
    { id: 4, name: 'Moong Dal', image: p3 },
    
    { id: 6, name: 'Rajma', image: p5 },
    { id: 7, name: 'Kabuli Chana', image: p6 },
    
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const itemsPerSlide = 3; // 3 images per row
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

  // Auto-play
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
    <div className="pulses-page">
      <div className="container">
        <div className="page-header">
          <h1>Pulses</h1>
          <p>Protein-Rich Legumes</p>
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
                    {/* Fill empty slots with empty cards to maintain grid layout */}
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

export default Pulses;