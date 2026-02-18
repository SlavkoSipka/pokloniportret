import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start fade out animation
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500); // Wait for fade out to complete
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-purple-500 via-sky-500 to-blue-600 flex items-center justify-center z-[9999] transition-opacity duration-500 ${
      progress >= 100 ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
      </div>
      
      <div className="text-center text-white relative z-10">
        {/* Logo container with animation */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Rotating ring */}
            <div className="absolute inset-0 border-4 border-white border-opacity-20 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"
              style={{ animationDuration: '1s' }}
            ></div>
            
            {/* Logo */}
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl transform transition-all duration-1000 hover:scale-110">
              <img 
                src="/images/Logo.png" 
                alt="Pokloni Portret Logo" 
                className="w-full h-full object-contain p-2 animate-pulse"
              />
            </div>
          </div>
          
          {/* Brand name with typewriter effect */}
          <h1 className="text-3xl font-bold mb-2 animate-pulse">
            Pokloni Portret
          </h1>
          <p className="text-lg opacity-90 animate-pulse">
            Učitavanje...
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-white to-yellow-300 h-full rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-3 opacity-75">
            {progress}%
          </p>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;