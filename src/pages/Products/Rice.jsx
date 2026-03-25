import React, { useState, useRef, useEffect } from 'react';
import './Rice.css';
import rice1 from '../../assets/rice1.jpg';
import rice2 from '../../assets/rice2.jpg';
import rice3 from '../../assets/rice3.jpg';
import rice4 from '../../assets/rice4.jpg';
import rice5 from '../../assets/rice5.jpg';
// import rice6 from '../../assets/rice6.jpg'; // if you have a sixth, otherwise just duplicate

const Rice = () => {
  // Array of image objects (just the image src)
  const images = [
    { id: 1, src: rice1, alt: 'Rice 1' },
    { id: 2, src: rice2, alt: 'Rice 2' },
    { id: 3, src: rice3, alt: 'Rice 3' },
    { id: 4, src: rice4, alt: 'Rice 4' },
    { id: 5, src: rice5, alt: 'Rice 5' },
    { id: 6, src: rice1, alt: 'Rice 6' }, // repeat or add more
    { id: 7, src: rice2, alt: 'Rice 7' },
    { id: 8, src: rice3, alt: 'Rice 8' },
  ];

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(images.length / itemsPerSlide);

  // Group images into slides
  const slides = [];
  for (let i = 0; i < images.length; i += itemsPerSlide) {
    slides.push(images.slice(i, i + itemsPerSlide));
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, nextSlide]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  return (
    <div className="rice-page">
      <div className="container">
        <div className="page-header">
          <h1>Rice</h1>
          <p>Premium Basmati & More</p>
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
                    {slide.map((image) => (
                      <div key={image.id} className="grid-item">
                        <img src={image.src} alt={image.alt} className="grid-image" />
                      </div>
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

export default Rice;