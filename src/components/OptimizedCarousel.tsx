import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import LazyImage from './LazyImage';

interface OptimizedCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const OptimizedCarousel: React.FC<OptimizedCarouselProps> = ({ 
  images, 
  autoPlay = true, 
  interval = 4000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsAnimating(false);
    }, 300);
  }, [images.length, isAnimating]);

  const prevImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsAnimating(false);
    }, 300);
  }, [images.length, isAnimating]);

  const goToImage = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    if (!autoPlay) return;
    
    const intervalId = setInterval(nextImage, interval);
    return () => clearInterval(intervalId);
  }, [autoPlay, interval, nextImage]);

  const currentImage = useMemo(() => images[currentIndex], [images, currentIndex]);

  return (
    <div className="relative">
      {/* Mobile View */}
      <div className="block md:hidden relative">
        <div className="relative overflow-hidden mx-4">
          <div className={`transition-all duration-500 ${
            isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
          }`}>
            <LazyImage 
              src={currentImage}
              alt={`Zadovoljan kupac - recenzija portreta ${currentIndex + 1}`}
              className="w-full h-auto bg-transparent"
              loading="lazy"
            />
            <div className="flex justify-center mt-4 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current mx-0.5" />
              ))}
            </div>
          </div>
          
          <button
            onClick={prevImage}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 shadow-lg rounded-full p-3 hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 shadow-lg rounded-full p-3 hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-sky-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-center"
              onClick={() => goToImage(index)}
            >
              <div className="transition-all duration-500 overflow-hidden">
                <LazyImage 
                  src={image}
                  alt={`Zadovoljan kupac - recenzija portreta ${index + 1}`}
                  className="w-full h-auto bg-transparent transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="flex justify-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current mx-0.5" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptimizedCarousel;