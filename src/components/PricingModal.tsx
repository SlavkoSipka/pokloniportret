import React from 'react';
import { X, MessageCircle, ChevronLeft } from 'lucide-react';
import LazyImage from './LazyImage';
import { trackPortraitEvents } from '../utils/facebookPixel';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViberClick: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onViberClick }) => {
  const [showImageOverlay, setShowImageOverlay] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [selectedSize, setSelectedSize] = React.useState('');

  // Prevent body scroll when image overlay is open
  React.useEffect(() => {
    if (showImageOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showImageOverlay]);

  if (!isOpen) return null;

  const pricingData = [
    { size: "20 × 30 cm", priceRSD: "2.999", priceKM: "50" },
    { size: "30 × 40 cm", priceRSD: "3.399", priceKM: "56" },
    { size: "35 × 45 cm", priceRSD: "3.999", priceKM: "66" },
    { size: "45 × 60 cm", priceRSD: "4.999", priceKM: "83" },
    { size: "50 × 75 cm", priceRSD: "6.199", priceKM: "103", popular: true },
    { size: "70 × 100 cm", priceRSD: "9.899", priceKM: "164" }
  ];

  const imageMap: { [key: string]: string } = {
    "20 × 30 cm": "/images/dimenzije/30x20.jpg",
    "30 × 40 cm": "/images/dimenzije/40x30cm.jpg",
    "35 × 45 cm": "/images/dimenzije/45x35cm.jpg",
    "45 × 60 cm": "/images/dimenzije/60x45cm.jpg",
    "50 × 75 cm": "/images/dimenzije/75x50cm.jpg",
    "70 × 100 cm": "/images/dimenzije/100x70cm.jpg"
  };

  const handleShowImage = (size: string) => {
    const imageUrl = imageMap[size];
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setSelectedSize(size);
      setShowImageOverlay(true);
      // Track viewing specific portrait size
      const priceData = pricingData.find(item => item.size === size);
      if (priceData) {
        trackPortraitEvents.viewPortraitSize(size, priceData.priceRSD);
      }
    }
  };

  const handleCloseImageOverlay = () => {
    setShowImageOverlay(false);
    setSelectedImage('');
    setSelectedSize('');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto"
      onClick={onClose}
      style={{ 
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div className="min-h-full flex items-start sm:items-center justify-center p-4 pt-8 sm:pt-4">
        <div 
          className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-4xl my-4 sm:my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 sm:p-6 relative rounded-t-2xl sm:rounded-t-3xl">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white hover:bg-gray-100 rounded-full p-3 sm:p-4 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
              title="Zatvorite prozor"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 stroke-2" />
            </button>
            
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                <div className="block">POKLONI PORTRET</div>
                <div className="block text-sm sm:text-base md:text-lg lg:text-xl font-semibold opacity-95">Dimenzije i Cene</div>
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {/* Unified Compact Layout */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-4 sm:p-6 mb-6">
              {/* Mobile: Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {pricingData.map((item, index) => (
                  <div 
                    key={index}
                    className={`bg-white rounded-xl p-3 sm:p-4 shadow-lg border-2 transition-all duration-300 ${
                      item.popular 
                        ? 'border-sky-300 bg-gradient-to-r from-sky-50 to-blue-50' 
                        : 'border-gray-100 hover:border-sky-200'
                    }`}
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <span className="font-bold text-gray-900 text-base sm:text-lg">{item.size}</span>
                        {item.popular && (
                          <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            TOP
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-sky-600 text-base sm:text-lg">{item.priceRSD} RSD</div>
                        <div className="font-bold text-sky-600 text-base sm:text-lg">{item.priceKM} KM</div>
                      </div>
                      {item.size !== "70 × 100 cm" && (
                        <button
                          onClick={() => handleShowImage(item.size)}
                          className="w-full bg-sky-500 text-white py-2 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm mt-2"
                        >
                          Primer
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={onViberClick}
                className="w-full sm:w-auto bg-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Kontaktirajte nas na Viber
              </button>
              <p className="mt-3 text-gray-600 text-xs sm:text-sm px-2">
                Odgovaramo u roku od 30 minuta • Besplatna konsultacija
              </p>
            </div>
          </div>
        </div>

        {/* Image Overlay */}
        {showImageOverlay && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[60] p-4"
            onClick={handleCloseImageOverlay}
          >
            <div 
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Back button */}
              <button
                onClick={handleCloseImageOverlay}
                className="absolute top-4 left-4 bg-white hover:bg-gray-100 rounded-full p-3 transition-all duration-300 z-10 shadow-lg flex items-center space-x-2"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700 font-medium text-sm">Nazad</span>
              </button>
              
              {/* Size label */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Primer {selectedSize}
              </div>
              
              {/* Image */}
              <div className="w-full h-full flex items-center justify-center">
                <LazyImage 
                  src={selectedImage}
                  alt={`Primer ručno rađenog portreta u dimenziji ${selectedSize}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingModal;