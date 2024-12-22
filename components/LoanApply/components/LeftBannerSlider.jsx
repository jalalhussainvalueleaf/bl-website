import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const LeftBannerSlider = () => {
  const images = [
    { id: 1, src: "/images/slide1.jpg", alt: "Slide 1" },
    { id: 2, src: "/images/slide2.jpg", alt: "Slide 2" },
    { id: 3, src: "/images/slide3.jpg", alt: "Slide 3" },
    { id: 4, src: "/images/slide4.jpg", alt: "Slide 4" },
    { id: 5, src: "/images/slide5.jpg", alt: "Slide 5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative hidden h-72 w-full overflow-hidden md:h-full md:w-1/2 xl:block">
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftBannerSlider;
