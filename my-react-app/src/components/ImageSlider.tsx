import React, { useState, useEffect } from "react";

type Image = {
  id: number;
  url: string;
};

interface CarouselProps {
  images: Image[];
  autoSlideInterval?: number; // default 3000ms
}

const Carousel: React.FC<CarouselProps> = ({ images, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoSlideInterval);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isHovered, autoSlideInterval]);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-500">
        No images available
      </div>
    );
  }

  return (
    <div
      className="relative w-full  mx-auto overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Slide ${image.id}`}
            className="w-full shrink-0 object-cover h-64 md:h-96"
          />
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        &#10094;
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === idx ? "bg-[#feab11]" : "bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
