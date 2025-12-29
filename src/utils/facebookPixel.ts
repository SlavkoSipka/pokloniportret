// Facebook Meta Pixel utility functions
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const initFacebookPixel = (pixelId: string) => {
  // Check if pixel is already loaded
  if (window.fbq) {
    return;
  }

  // Facebook Pixel Code
  (function(f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  // Initialize pixel with your ID
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');

  // Add noscript fallback
  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.head.appendChild(noscript);
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Track custom conversions
export const trackCustomEvent = (eventName: string, parameters?: any) => {
  if (window.fbq) {
    window.fbq('trackCustom', eventName, parameters);
  }
};

// Predefined events for your portrait business
export const trackPortraitEvents = {
  // When user views pricing
  viewPricing: () => {
    trackEvent('ViewContent', {
      content_type: 'product_group',
      content_category: 'Portrait Services'
    });
  },

  // When user clicks on a specific portrait size
  viewPortraitSize: (size: string, price: string) => {
    trackEvent('ViewContent', {
      content_type: 'product',
      content_name: `Portrait ${size}`,
      value: parseFloat(price.replace(/[^\d]/g, '')),
      currency: 'RSD'
    });
  },

  // When user initiates contact (clicks Viber button)
  initiateContact: () => {
    // Track as a conversion event
    trackEvent('Lead', {
      content_name: 'Viber Contact',
      content_category: 'Contact',
      value: 1,
      currency: 'RSD'
    });
    
    // Custom event specifically for Viber clicks from website
    trackCustomEvent('ViberContactFromWebsite', {
      source: 'website',
      button_location: 'main_cta',
      timestamp: new Date().toISOString()
    });
  },

  // When user requests free preview
  requestPreview: () => {
    trackEvent('AddToCart', {
      content_name: 'Free Preview Request',
      content_category: 'Preview',
      value: 0,
      currency: 'RSD'
    });
    
    // Track preview request via Viber
    trackCustomEvent('ViberPreviewRequest', {
      source: 'website',
      service: 'free_preview',
      timestamp: new Date().toISOString()
    });
  },

  // When user views example images
  viewExample: (size: string) => {
    trackCustomEvent('ExampleViewed', {
      portrait_size: size
    });
  },

  // When user scrolls to reviews section
  viewReviews: () => {
    trackCustomEvent('ReviewsViewed');
  },

  // When user visits Instagram
  visitInstagram: () => {
    trackCustomEvent('SocialMediaClick', {
      platform: 'instagram'
    });
  },

  // Track floating contact button clicks
  floatingViberClick: () => {
    trackEvent('Lead', {
      content_name: 'Viber Contact Floating',
      content_category: 'Contact',
      value: 1,
      currency: 'RSD'
    });
    
    trackCustomEvent('ViberContactFromWebsite', {
      source: 'website',
      button_location: 'floating_button',
      timestamp: new Date().toISOString()
    });
  },

  // Track navbar Viber clicks
  navbarViberClick: () => {
    trackEvent('Lead', {
      content_name: 'Viber Contact Navbar',
      content_category: 'Contact',
      value: 1,
      currency: 'RSD'
    });
    
    trackCustomEvent('ViberContactFromWebsite', {
      source: 'website',
      button_location: 'navbar',
      timestamp: new Date().toISOString()
    });
  }
};