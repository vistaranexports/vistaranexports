import React, { useState, useRef, useEffect } from 'react';
import './Spice.css';
import turmeric from '../../assets/turmeric.png';
import s1 from '../../assets/s1.jpeg';
import s2 from '../../assets/s2.jpeg';
import s3 from '../../assets/s3.jpeg';
import s4 from '../../assets/s4.jpeg';
import s5 from '../../assets/s5.jpeg';
import s6 from '../../assets/s6.jpeg';
import s7 from '../../assets/s7.jpeg';

const Spice = () => {
  const products = [
    { id: 1, name: 'Turmeric', image: turmeric },
    { id: 2, name: 'Black Pepper', image: s1 },
    { id: 3, name: 'Cardamom', image: s3 },
    { id: 4, name: 'Cumin', image: s2},
    { id: 5, name: 'Coriander', image: s4 },
    { id: 6, name: 'Clove', image: s5 },
    { id: 7, name: 'Cinnamon', image: s6 },
    
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
    <div className="spice-page">
      <div className="container">
        <div className="page-header">
          <h1>Spices</h1>
          <p>Spices are flavorful, aromatic parts of various plants—such as seeds, roots, bark, fruits, or flowers—used primarily to season, color, and preserve foods.

Spices are derived from many parts of plants: seeds (cumin, coriander), bark (cinnamon), roots/rhizomes (ginger, turmeric), flowers (clove, saffron), fruits and berries (pepper, cardamom, chili), and even stigmas (saffron).</p>
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

export default Spice;