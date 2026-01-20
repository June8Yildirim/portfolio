import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [images]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-80 md:h-96 rounded-lg bg-gray-100 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Swiper
        // Core settings - REMOVED effect="fade" for now
        spaceBetween={30}
        slidesPerView={1}
        // Responsive breakpoints
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        // Navigation & Pagination
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        // Autoplay
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        // Loop
        loop={images.length > 1}
        // Modules - REMOVED EffectFade
        modules={[Navigation, Pagination, Autoplay]}
        className="rounded-xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <img
                src={image}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  console.error(`Failed to load: ${image}`);
                  e.currentTarget.src = `https://via.placeholder.com/400x300/cccccc/666666?text=Image+${index + 1}+Not+Found`;
                }}
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}/{images.length}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button className="swiper-button-prev bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
          ←
        </button>
        <button className="swiper-button-next bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
          →
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
