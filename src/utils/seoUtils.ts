// SEO utility functions for dynamic content

export const generateProductStructuredData = (product: {
  name: string;
  description: string;
  price: string;
  image: string;
  size: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Ručno rađeni portret ${product.size}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Pokloni Portret"
    },
    "category": "Umetnost i zanat",
    "image": product.image,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "RSD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Pokloni Portret"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "5"
    }
  };
};

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateReviewStructuredData = (reviews: Array<{
  author: string;
  rating: number;
  text: string;
  date: string;
}>) => {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5"
    },
    "reviewBody": review.text,
    "datePublished": review.date
  }));
};

export const updatePageTitle = (title: string) => {
  document.title = title;
};

export const updateMetaDescription = (description: string) => {
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
};

export const updateCanonicalUrl = (url: string) => {
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', url);
  }
};

export const addStructuredData = (data: object, id?: string) => {
  // Remove existing structured data with same ID if provided
  if (id) {
    const existing = document.querySelector(`script[data-structured-id="${id}"]`);
    if (existing) {
      existing.remove();
    }
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  if (id) {
    script.setAttribute('data-structured-id', id);
  }
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Generate meta tags for social sharing
export const generateSocialMetaTags = (data: {
  title: string;
  description: string;
  image: string;
  url: string;
}) => {
  // Open Graph
  const ogTags = [
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:image', content: data.image },
    { property: 'og:url', content: data.url },
    { property: 'og:type', content: 'website' }
  ];
  
  // Twitter Card
  const twitterTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.title },
    { name: 'twitter:description', content: data.description },
    { name: 'twitter:image', content: data.image }
  ];
  
  // Update existing tags
  [...ogTags, ...twitterTags].forEach(tag => {
    const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute('content', tag.content);
    }
  });
};