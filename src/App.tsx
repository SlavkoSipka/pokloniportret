import React, { useState, useEffect } from 'react';
import { Star, Heart, MessageCircle, Camera, Palette, Gift, ChevronLeft, ChevronRight, Phone, Brush, Image, ShoppingCart, X, Instagram } from 'lucide-react';
import LazyImage from './components/LazyImage';
import OptimizedCarousel from './components/OptimizedCarousel';
import PricingModal from './components/PricingModal';
import LoadingScreen from './components/LoadingScreen';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useOptimizedScroll } from './hooks/useOptimizedScroll';
import { initFacebookPixel, trackPortraitEvents } from './utils/facebookPixel';

// Preload critical images
const preloadImages = [
  "https://aislike.rs/portret/Logo.png",
  "http://aislike.rs/portret/horiz.jpg"
];

// Preload images on component mount
const preloadCriticalImages = () => {
  preloadImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

const reviewImages = [
  "http://aislike.rs/portret/1.png",
  "http://aislike.rs/portret/2.png",
  "http://aislike.rs/portret/3.png",
  "http://aislike.rs/portret/4.png",
  "http://aislike.rs/portret/5.png",
  "http://aislike.rs/portret/6.png",
  "http://aislike.rs/portret/7.png",
  "http://aislike.rs/portret/8.png"
];

function App() {
  const { scrollY, isScrolled } = useOptimizedScroll();
  const [isLoading, setIsLoading] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  
  // Intersection observers for animations
  const [setSectionRef, isSectionVisible] = useIntersectionObserver();
  const [setTitleRef, isTitleVisible] = useIntersectionObserver();
  const [setCard1Ref, isCard1Visible] = useIntersectionObserver();
  const [setCard2Ref, isCard2Visible] = useIntersectionObserver();
  const [setCard3Ref, isCard3Visible] = useIntersectionObserver();
  const [setCard4Ref, isCard4Visible] = useIntersectionObserver();
  const [setButtonRef, isButtonVisible] = useIntersectionObserver();
  
  // Pricing section animations
  const [setPricingTitleRef, isPricingTitleVisible] = useIntersectionObserver();
  const [setPricingCardsRef, isPricingCardsVisible] = useIntersectionObserver();
  const [setAdditionalServicesRef, isAdditionalServicesVisible] = useIntersectionObserver();
  const [setDeliveryInfoRef, isDeliveryInfoVisible] = useIntersectionObserver();
  const [setPricingButtonRef, isPricingButtonVisible] = useIntersectionObserver();

  const handleViberClick = () => {
    window.open('viber://chat?number=+381604184190', '_blank');
    trackPortraitEvents.navbarViberClick();
  };

  const handleFreeDemoViberClick = () => {
    // Direktno otvori Viber chat
    window.open('viber://chat?number=+381604184190', '_blank');
    trackPortraitEvents.requestPreview();
  };

  const handleShowModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setShowImageModal(true);
    // Extract size from image URL for tracking
    const sizeMatch = imageUrl.match(/(\d+x\d+)/);
    if (sizeMatch) {
      trackPortraitEvents.viewExample(sizeMatch[1]);
    }
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
  };

  const handleShowPricingModal = () => {
    setShowPricingModal(true);
    trackPortraitEvents.viewPricing();
  };

  const handleClosePricingModal = () => {
    setShowPricingModal(false);
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/pokloni_portret/', '_blank');
    trackPortraitEvents.visitInstagram();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Preload critical images after loading screen
    preloadCriticalImages();
    // Initialize Facebook Pixel
    initFacebookPixel('1902518277248042');
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50" style={{ colorScheme: 'light only' }}>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg transition-all duration-500 ease-in-out ${
        isScrolled ? 'py-2' : 'py-4'
      }`} style={{ colorScheme: 'light only' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
            isScrolled ? 'h-12 sm:h-14' : 'h-16 sm:h-20'
          }`}>
            {/* Logo */}
            <div className="flex items-center">
              <div className={`logo-container transition-all duration-500 ease-in-out ${
                isScrolled ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-24 h-24 sm:w-28 sm:h-28'
              }`}>
                <img 
                  src="https://aislike.rs/portret/Logo.png" 
                  alt="Pokloni Portret - Ručno rađeni portreti kao poklon" 
                  className="w-full h-full object-contain"
                  style={{ colorScheme: 'light only' }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            
            {/* Viber dugme */}
            <button
              onClick={handleViberClick}
              className={`bg-purple-500 rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-110 flex items-center space-x-2 ${
                isScrolled ? 'p-1.5 sm:p-2' : 'p-2 sm:p-3'
              }`}
              title="Kontaktirajte nas na Viber"
              style={{ colorScheme: 'light only' }}
            >
              <Phone className={`text-white transition-all duration-300 ${
                isScrolled ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6'
              }`} />
              <span className={`hidden sm:inline text-white font-medium transition-all duration-300 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}>Viber</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden text-white flex items-center h-screen bg-white" style={{ colorScheme: 'light only' }}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 hero-bg"
          style={{
            backgroundImage: window.innerWidth <= 768 ? 'url(http://aislike.rs/portret/homepage.jpg)' : 'url(http://aislike.rs/portret/horiz.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-15"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full"
             style={{ transform: `translate3d(0, ${scrollY * 0.5}px, 0)` }}>
          <div className="text-center"
               style={{ transform: `translate3d(0, ${scrollY * 0.3}px, 0)` }}>
            <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 text-white text-shadow-xl will-change-transform gpu-accelerated"
                style={{ 
                  transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(${Math.max(0.8, 1 - scrollY * 0.0005)})`,
                  opacity: Math.max(0, 1 - scrollY * 0.002),
                  colorScheme: 'light only'
                }}>
              <span itemProp="name">Pretvorite Vaše Najdraže Uspomene U Umetnost</span>
            </h1>
            
            {/* Besplatni Prikaz Viber button below title */}
            <div className="mb-8 will-change-transform gpu-accelerated"
                 style={{ 
                   transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
                   opacity: Math.max(0, 1 - scrollY * 0.0025)
                 }}>
              <button
                onClick={handleFreeDemoViberClick}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-semibold md:text-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto will-change-transform"
              >
                <MessageCircle className="w-5 h-5 md:w-7 md:h-7" />
                <span>Posalji sliku za besplatni prikaz </span>
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 px-4 will-change-transform gpu-accelerated"
                 style={{ 
                   transform: `translate3d(0, ${scrollY * 0.25}px, 0)`,
                   opacity: Math.max(0, 1 - scrollY * 0.003)
                 }}>
              <button
                onClick={handleShowPricingModal}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-semibold md:text-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 will-change-transform"
              >
                <Heart className="w-5 h-5 md:w-7 md:h-7" />
                <span>Koje su cene i dimenzije?</span>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"
             style={{ opacity: Math.min(1, scrollY * 0.01) }} className="will-change-opacity"></div>
      </section>

      {/* Kako funkcioniše proces */}
      <section 
        ref={setSectionRef}
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={setTitleRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              isTitleVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            <h2 className="process-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-3 sm:mb-6 px-4 transform transition-all duration-1000 delay-200">
              Šta dobijaš?
            </h2>
            <p className="process-subtitle text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 max-w-3xl mx-auto px-4 transform transition-all duration-1000 delay-400">
              Proces se sastoji iz dva brza koraka
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Korak 1 */}
            <div 
              ref={setCard2Ref}
              className={`group transition-all duration-1000 delay-400 ${
                isCard2Visible 
                  ? 'opacity-100 transform translate-y-0 scale-100' 
                  : 'opacity-0 transform translate-y-12 scale-95'
              }`}
            >
              {/* Slika */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-3 mb-3 sm:mb-4 aspect-[3/4] flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-xl overflow-hidden hover:shadow-2xl hover:-rotate-1 relative">
                {/* Pre label */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10 transform transition-all duration-300 hover:scale-110">
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    <span>PRE</span>
                  </span>
                </div>
                <LazyImage 
                  src="http://aislike.rs/portret/before.jpg" 
                  alt="Originalna fotografija pre pravljenja portreta" 
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Kartica sa informacijama */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 h-64 sm:h-80 flex flex-col justify-center text-center group-hover:-translate-y-2">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg font-bold mx-auto mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                  1
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-blue-600">
                  Slanje Slike  
                </h4>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg transition-colors duration-300 group-hover:text-gray-700 px-2">
                  Pošaljite nam vašu omiljenu fotografiju u visokoj rezoluciji. Mi ćemo je pretvoriti u umetničko delo.
                </p>
              </div>
            </div>
            
            {/* Korak 2 */}
            <div 
              ref={setCard3Ref}
              className={`group transition-all duration-1000 delay-600 ${
                isCard3Visible 
                  ? 'opacity-100 transform translate-y-0 scale-100' 
                  : 'opacity-0 transform translate-y-12 scale-95'
              }`}
            >
              {/* Slika */}
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-3 mb-3 sm:mb-4 aspect-[3/4] flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-xl overflow-hidden hover:shadow-2xl hover:rotate-1 relative">
                {/* Posle label */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10 transform transition-all duration-300 hover:scale-110">
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    <span>PRIKAZ</span>
                  </span>
                </div>
                <LazyImage 
                  src="http://aislike.rs/portret/probniprikaz.jpg
" 
                  alt="Besplatni prikaz portreta pre finalizacije" 
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Kartica sa informacijama */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-green-100 h-64 sm:h-80 flex flex-col justify-center text-center group-hover:-translate-y-2">
                <div className="bg-green-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg font-bold mx-auto mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  2
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-green-600">
                  Besplatni Prikaz
                </h4>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg transition-colors duration-300 group-hover:text-gray-700 px-2">
                  Besplatno ćemo vam izraditi online prikaz da vidite kako portret izgleda!
                </p>
              </div>
            </div>
            
            {/* Korak 3 */}
            <div 
              ref={setCard4Ref}
              className={`group transition-all duration-1000 delay-800 ${
                isCard4Visible 
                  ? 'opacity-100 transform translate-y-0 scale-100' 
                  : 'opacity-0 transform translate-y-12 scale-95'
              }`}
            >
              {/* Slika */}
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-3 mb-3 sm:mb-4 aspect-[3/4] flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-xl overflow-hidden hover:shadow-2xl hover:-rotate-1 relative">
                {/* Finalno label */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10 transform transition-all duration-300 hover:scale-110">
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    <span>POSLE</span>
                  </span>
                </div>
                <LazyImage 
                  src="http://aislike.rs/portret/after.jpg" 
                  alt="Finalni ručno rađeni portret kao poklon" 
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Kartica sa informacijama */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-100 h-64 sm:h-80 flex flex-col justify-center text-center group-hover:-translate-y-2">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-base sm:text-lg font-bold mx-auto mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                  3
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-purple-600">
                  Porudžbina
                </h4>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg transition-colors duration-300 group-hover:text-gray-700 px-2">
                  Finalizujte porudžbinu, odaberite dimenzije i dodatne opcije. Vaš portret stiže za 4 radna dana!
                </p>
              </div>
            </div>
          </div>
          
          <div 
            ref={setButtonRef}
            className={`text-center mt-12 transition-all duration-1000 delay-1000 ${
              isButtonVisible 
                ? 'opacity-100 transform translate-y-0 scale-100' 
                : 'opacity-0 transform translate-y-8 scale-95'
            }`}
          >
            <button
              onClick={handleViberClick}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Započnite Vaš Portret
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={setPricingTitleRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              isPricingTitleVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            <h2 className="pricing-title text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6 px-4 transition-all duration-1000 delay-200">Dimenzije i Cene</h2>
            <p className="pricing-subtitle text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto px-4 transition-all duration-1000 delay-600">Cene zavise od dimenzija portreta</p>
          </div>
          
          {/* Dimenzije i cene */}
          <div 
            ref={setPricingCardsRef}
            className={`relative mb-16 transition-all duration-1000 delay-300 ${
              isPricingCardsVisible 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-12'
            }`}
          >
            {/* Scroll indicators - only show on mobile */}
            <div className="flex items-center justify-center mb-4 text-gray-500 text-sm animate-pulse md:hidden">
              <ChevronLeft className="w-4 h-4" />
              <span className="mx-2">Pomerite levo-desno za sve cene</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            
            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="md:hidden flex overflow-x-auto scrollbar-hide space-x-6 pb-4 px-4">
            {/* 20x30cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 flex-shrink-0 w-72 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-4 mb-4 mx-auto w-20 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-sky-600 font-bold text-sm">20×30</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">20 × 30 cm</h3>
                <div className="text-3xl font-bold text-sky-600 mb-2 transition-all duration-300 group-hover:scale-105">
                  2.999<span className="text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/30x20.jpg')}
                  className="w-full bg-sky-500 text-white py-3 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 30x40cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 flex-shrink-0 w-72 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-4 mb-4 mx-auto w-20 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <span className="text-sky-600 font-bold text-sm">30×40</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">30 × 40 cm</h3>
                <div className="text-3xl font-bold text-sky-600 mb-2 transition-all duration-300 group-hover:scale-105">
                  3.399<span className="text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/40x30cm.jpg')}
                  className="w-full bg-sky-500 text-white py-3 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 35x45cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 flex-shrink-0 w-72 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-4 mb-4 mx-auto w-20 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-sky-600 font-bold text-sm">35×45</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">35 × 45 cm</h3>
                <div className="text-3xl font-bold text-sky-600 mb-2 transition-all duration-300 group-hover:scale-105">
                  3.999<span className="text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/45x35cm.jpg')}
                  className="w-full bg-sky-500 text-white py-3 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 45x60cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 flex-shrink-0 w-72 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-4 mb-4 mx-auto w-20 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <span className="text-sky-600 font-bold text-sm">45×60</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">45 × 60 cm</h3>
                <div className="text-3xl font-bold text-sky-600 mb-2 transition-all duration-300 group-hover:scale-105">
                  4.999<span className="text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/60x45cm.jpg')}
                  className="w-full bg-sky-500 text-white py-3 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 50x75cm */}
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 text-white transform scale-105 hover:scale-110 hover:-translate-y-3 relative flex-shrink-0 w-72 group">
              <div className="absolute top-4 right-4 bg-white text-sky-600 px-3 py-1 rounded-full text-sm font-semibold">
                Najpopularniji
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-4 mx-auto w-20 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-white font-bold text-sm">50×75</span>
                </div>
                <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:scale-105">50 × 75 cm</h3>
                <div className="text-3xl font-bold mb-2 transition-all duration-300 group-hover:scale-105">
                  6.199<span className="text-lg font-normal opacity-80"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/75x50cm.jpg')}
                  className="w-full bg-white text-sky-600 py-3 rounded-full font-semibold hover:bg-sky-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 70x100cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 flex-shrink-0 w-72 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-4 mb-4 mx-auto w-20 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <span className="text-sky-600 font-bold text-sm">70×100</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">70 × 100 cm</h3>
                <div className="text-3xl font-bold text-sky-600 mb-2 transition-all duration-300 group-hover:scale-105">
                  9.899<span className="text-lg font-normal text-gray-600"> RSD</span>
                </div>
              </div>
            </div>
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {/* 20x30cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 lg:p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-3 lg:p-4 mb-3 lg:mb-4 mx-auto w-16 h-12 lg:w-20 lg:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-sky-600 font-bold text-sm">20×30</span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">20 × 30 cm</h3>
                <div className="text-2xl lg:text-3xl font-bold text-sky-600 mb-3 lg:mb-4 transition-all duration-300 group-hover:scale-105">
                  2.999<span className="text-sm lg:text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/30x20.jpg')}
                  className="w-full bg-sky-500 text-white py-2 lg:py-3 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm lg:text-base"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 30x40cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 lg:p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-3 lg:p-4 mb-3 lg:mb-4 mx-auto w-16 h-12 lg:w-20 lg:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <span className="text-sky-600 font-bold text-sm">30×40</span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">30 × 40 cm</h3>
                <div className="text-2xl lg:text-3xl font-bold text-sky-600 mb-3 lg:mb-4 transition-all duration-300 group-hover:scale-105">
                  3.399<span className="text-sm lg:text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/40x30cm.jpg')}
                  className="w-full bg-sky-500 text-white py-2 lg:py-3 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm lg:text-base"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 35x45cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 lg:p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-3 lg:p-4 mb-3 lg:mb-4 mx-auto w-16 h-12 lg:w-20 lg:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-sky-600 font-bold text-sm">35×45</span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">35 × 45 cm</h3>
                <div className="text-2xl lg:text-3xl font-bold text-sky-600 mb-3 lg:mb-4 transition-all duration-300 group-hover:scale-105">
                  3.999<span className="text-sm lg:text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/45x35cm.jpg')}
                  className="w-full bg-sky-500 text-white py-2 lg:py-3 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm lg:text-base"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 45x60cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 lg:p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-3 lg:p-4 mb-3 lg:mb-4 mx-auto w-16 h-12 lg:w-20 lg:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <span className="text-sky-600 font-bold text-sm">45×60</span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">45 × 60 cm</h3>
                <div className="text-2xl lg:text-3xl font-bold text-sky-600 mb-3 lg:mb-4 transition-all duration-300 group-hover:scale-105">
                  4.999<span className="text-sm lg:text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/60x45cm.jpg')}
                  className="w-full bg-sky-500 text-white py-2 lg:py-3 rounded-full font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm lg:text-base"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 50x75cm */}
            <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-4 lg:p-6 text-white transform scale-105 hover:scale-110 hover:-translate-y-3 relative group">
              <div className="absolute top-2 lg:top-4 right-2 lg:right-4 bg-white text-sky-600 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                Najpopularniji
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-2xl p-3 lg:p-4 mb-3 lg:mb-4 mx-auto w-16 h-12 lg:w-20 lg:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-white font-bold text-sm">50×75</span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold mb-2 transition-all duration-300 group-hover:scale-105">50 × 75 cm</h3>
                <div className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 transition-all duration-300 group-hover:scale-105">
                  6.199<span className="text-sm lg:text-lg font-normal opacity-80"> RSD</span>
                </div>
                <button
                  onClick={() => handleShowModal('http://aislike.rs/portret/75x50cm.jpg')}
                  className="w-full bg-white text-sky-600 py-2 lg:py-3 rounded-full font-semibold hover:bg-sky-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm lg:text-base"
                >
                  Primer
                </button>
              </div>
            </div>

            {/* 70x100cm */}
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 lg:p-6 border border-gray-100 hover:border-sky-200 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="text-center">
                <div className="bg-sky-100 rounded-2xl p-3 lg:p-4 mb-3 lg:mb-4 mx-auto w-16 h-12 lg:w-20 lg:h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <span className="text-sky-600 font-bold text-sm">70×100</span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-sky-600">70 × 100 cm</h3>
                <div className="text-2xl lg:text-3xl font-bold text-sky-600 mb-3 lg:mb-4 transition-all duration-300 group-hover:scale-105">
                  9.899<span className="text-sm lg:text-lg font-normal text-gray-600"> RSD</span>
                </div>
                <div className="py-2 lg:py-3"></div>
              </div>
            </div>
            </div>
          </div>

          {/* Dodatne usluge */}
          <div 
            ref={setAdditionalServicesRef}
            className={`bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 mb-12 transition-all duration-1000 delay-500 ${
              isAdditionalServicesVisible 
                ? 'opacity-100 transform translate-y-0 scale-100' 
                : 'opacity-0 transform translate-y-12 scale-95'
            }`}
          >
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8 transition-all duration-1000 delay-700">Dodatne Usluge</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3 mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">Natpis sa Posvetom</h4>
                    <p className="text-purple-600 font-semibold">+199 RSD (1.5€)</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Dodajte personalizovanu poruku na vaš portret.</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 rounded-full p-3 mr-4 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12">
                    <Palette className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-pink-600">Spajanje Osoba</h4>
                    <p className="text-pink-600 font-semibold">+799 RSD (7€)</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Spajamo osobe sa različitih slika u jedan portret.</p>
              </div>
            </div>
          </div>

          {/* Informacije o dostavi */}
          <div 
            ref={setDeliveryInfoRef}
            className={`bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 text-center transition-all duration-1000 delay-700 ${
              isDeliveryInfoVisible 
                ? 'opacity-100 transform translate-y-0 scale-100' 
                : 'opacity-0 transform translate-y-12 scale-95'
            }`}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4 mr-4 transition-all duration-500 delay-900 transform hover:scale-110 hover:rotate-12">
                <Gift className="w-8 h-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 transition-all duration-500 delay-1000">Dostava i Isporuka</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 delay-1100 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl group">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">📍 Šaljemo iz Niša</h4>
                <p className="text-sm sm:text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Portreti se prave u našem ateljeu u Nišu.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 delay-1200 transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl group">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">⏱️ Brza Isporuka</h4>
                <p className="text-sm sm:text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Isporuka za 4 radna dana na vašu adresu.</p>
              </div>
            </div>
            
            {/* Instagram Button */}
            <div 
              ref={setPricingButtonRef}
              className={`mt-8 transition-all duration-1000 delay-1300 ${
                isPricingButtonVisible 
                  ? 'opacity-100 transform translate-y-0 scale-100' 
                  : 'opacity-0 transform translate-y-8 scale-95'
              }`}
            >
              <div className="text-center">
                <button
                  onClick={handleInstagramClick}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                >
                  <Instagram className="w-5 h-5 inline mr-2" />
                  Nazad Na Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="process-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-6 px-4 transform transition-all duration-1000 delay-200">Šta kažu naši kupci</h2>
            <p className="process-subtitle text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-600 max-w-4xl mx-auto px-4 transform transition-all duration-1000 delay-400">Zadovoljstvo naših kupaca je naša najveća nagrada</p>
            <div className="mt-8 flex justify-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-6 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-white fill-current" />
                  ))}
                  <span className="text-white font-bold text-lg ml-2">5.0</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced carousel with more space */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
            <OptimizedCarousel images={reviewImages} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-500 to-sky-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Spremni za vaš jedinstveni portret?
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Kontaktirajte nas danas i pretvorite vaše najdraže fotografije u nezaboravne portrete na platnu 
          </p>
          <button
            onClick={() => {
              window.open('viber://chat?number=+381604184190', '_blank');
              trackPortraitEvents.initiateContact();
            }}
            className="bg-white text-purple-600 px-8 py-4 sm:px-12 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl w-full max-w-sm sm:w-auto"
          >
            <MessageCircle className="w-6 h-6 inline mr-3" />
            Pošaljite nam poruku
          </button>
          <p className="mt-6 text-sky-100 text-sm sm:text-base px-4">
            Odgovaramo u roku od 30 minuta • Besplatna konsultacija
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="https://aislike.rs/portret/Logo.png" 
                alt="Pokloni Portret - Ručno rađeni portreti" 
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain mr-4"
                loading="lazy"
              />
              <h3 className="text-xl sm:text-2xl font-bold">Pokloni Portret</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
              Stvaramo umetnost koja govori iz srca. Svaki ručno rađeni portret je priča vredna pamćenja.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm mb-6 sm:mb-4">
              <span>© 2024 Pokloni Portret</span>
              <span className="hidden sm:inline">•</span>
              <span>Sva prava zadržana</span>
            </div>
            
            {/* AiSajt.com credit */}
            <div className="text-center sm:text-right text-xs text-gray-500 hover:text-gray-300 transition-colors duration-300">
              <a href="https://aisajt.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Web dizajn: AiSajt.com
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={showPricingModal}
        onClose={handleClosePricingModal}
        onViberClick={handleViberClick}
      />

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-4 -right-4 bg-white hover:bg-gray-100 rounded-full p-2 transition-all duration-300 z-10 shadow-lg"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Just the image */}
            <LazyImage 
              src={modalImage}
              alt="Primer ručno rađenog portreta u odabranoj dimenziji"
              className="w-full h-auto rounded-lg shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            window.open('viber://chat?number=+381604184190', '_blank');
            trackPortraitEvents.floatingViberClick();
          }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-full text-base font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-2 animate-pulse hover:animate-none"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Kontaktirajte nas na Viber</span>
          <span className="sm:hidden" aria-label="Kontakt">Viber</span>
        </button>
      </div>
    </div>
  );
}


export default App