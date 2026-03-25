import React, { useState, useRef, useEffect } from 'react';
import './SparePart.css';
import oem1 from '../../assets/oem1.jpeg';
import oem2 from '../../assets/oem2.jpeg';
import oem3 from '../../assets/oem3.jpeg';
import oem4 from '../../assets/oem4.jpeg';

const SparePart = () => {
  const products = [
    { id: 1, name: 'Bearing A', image: oem1 },
    { id: 2, name: 'Bearing B', image: oem2 },
    { id: 3, name: 'Bearing C', image: oem3},
    { id: 4, name: 'Bearing D', image: oem4 },
    
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
    <div className="sparepart-page">
      <div className="container">
        <div className="page-header">
          <h1>Spare Part</h1>
          <p>Industrial Components</p>
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

export default SparePart;