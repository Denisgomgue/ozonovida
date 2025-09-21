/**
 * ⚡ CONFIGURACIÓN DE PERFORMANCE - OZONO VIDA
 * Configuración centralizada para optimizaciones de rendimiento
 */

const PERFORMANCE_CONFIG = {
  // 🖼️ CONFIGURACIÓN DE IMÁGENES
  images: {
    // Formatos soportados por prioridad
    formats: ["webp", "jpg", "png"],

    // Calidades por tipo de conexión
    quality: {
      "4g": 85,
      "3g": 75,
      "2g": 60,
      "slow-2g": 50,
    },

    // Tamaños responsive
    breakpoints: [400, 600, 800, 1200, 1600],

    // Lazy loading configuración
    lazyLoading: {
      rootMargin: "50px 0px",
      threshold: 0.01,
      fadeInDuration: 300,
    },

    // Placeholder configuración
    placeholder: {
      blur: 5,
      shimmerDuration: 1500,
      backgroundColor: "rgba(33, 80, 150, 0.1)",
    },
  },

  // ⚡ CONFIGURACIÓN DE SCRIPTS
  scripts: {
    // Scripts críticos (cargar inmediatamente)
    critical: ["./js/critical-performance.js"],

    // Scripts diferidos (cargar después del load)
    deferred: ["./js/analytics.js", "./js/social-sharing.js"],

    // Scripts para precargar en hover
    preload: ["./js/service-pages.js", "./js/treatment-pages.js"],
  },

  // 🔗 CONFIGURACIÓN DE PRECARGA
  preloading: {
    // Recursos críticos para precargar
    critical: [
      "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2",
      "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
    ],

    // DNS prefetch
    dnsPrefetch: [
      "//images.unsplash.com",
      "//www.tiktok.com",
      "//cdnjs.cloudflare.com",
    ],

    // Preconnect
    preconnect: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://cdnjs.cloudflare.com",
    ],
  },

  // 📊 CONFIGURACIÓN DE WEB VITALS
  vitals: {
    // Umbrales de performance (en ms)
    thresholds: {
      lcp: 2500, // Largest Contentful Paint
      fid: 100, // First Input Delay
      cls: 0.1, // Cumulative Layout Shift
    },

    // Configuración de monitoreo
    monitoring: {
      enabled: true,
      sampleRate: 1.0, // 100% en desarrollo
      reportEndpoint: null, // Configurar si tienes analytics
    },
  },

  // 🎯 CONFIGURACIÓN DE CACHE
  cache: {
    // Estrategias de cache por tipo de recurso
    strategies: {
      images: {
        maxAge: 15552000, // 6 meses
        immutable: false,
      },
      css: {
        maxAge: 31536000, // 1 año
        immutable: true,
      },
      js: {
        maxAge: 31536000, // 1 año
        immutable: true,
      },
      html: {
        maxAge: 3600, // 1 hora
        immutable: false,
      },
    },
  },

  // 📱 CONFIGURACIÓN RESPONSIVE
  responsive: {
    // Breakpoints principales
    breakpoints: {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
      large: 1200,
    },

    // Configuraciones por dispositivo
    devices: {
      mobile: {
        imageQuality: 70,
        lazyLoadMargin: "25px",
        preloadNextPage: false,
      },
      tablet: {
        imageQuality: 80,
        lazyLoadMargin: "50px",
        preloadNextPage: true,
      },
      desktop: {
        imageQuality: 85,
        lazyLoadMargin: "100px",
        preloadNextPage: true,
      },
    },
  },

  // 🔧 CONFIGURACIÓN DE OPTIMIZACIONES
  optimizations: {
    // Minificación
    minify: {
      css: true,
      js: true,
      html: false, // Mantener legible para SEO
    },

    // Compresión
    compression: {
      gzip: true,
      brotli: true,
    },

    // Tree shaking
    treeShaking: true,

    // Code splitting
    codeSplitting: {
      enabled: true,
      chunkSize: 50000, // 50KB chunks
    },
  },

  // 🛡️ CONFIGURACIÓN DE SEGURIDAD
  security: {
    // Content Security Policy
    csp: {
      "default-src": ["'self'"],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com",
      ],
      "font-src": [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com",
      ],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "https://cdnjs.cloudflare.com",
      ],
      "img-src": [
        "'self'",
        "data:",
        "https://images.unsplash.com",
        "https://via.placeholder.com",
      ],
      "connect-src": [
        "'self'",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
      ],
      "frame-src": ["'self'", "https://www.tiktok.com"],
      "media-src": ["'self'"],
    },

    // Headers adicionales
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy":
        "geolocation=(self), microphone=(), camera=(), payment=(), usb=()",
    },
  },
};

// Función para obtener configuración por entorno
function getConfig(environment = "development") {
  const config = { ...PERFORMANCE_CONFIG };

  if (environment === "production") {
    // Ajustes para producción
    config.vitals.monitoring.sampleRate = 0.1; // 10% sampling
    config.images.quality["4g"] = 90; // Mayor calidad en producción
    config.optimizations.minify.html = true;
  }

  return config;
}

// Función para aplicar configuración
function applyConfig(config = PERFORMANCE_CONFIG) {
  // Configurar lazy loading
  if (window.imageOptimizer) {
    window.imageOptimizer.config = config.images;
  }

  // Configurar performance optimizer
  if (window.performanceOptimizer) {
    window.performanceOptimizer.config = config;
  }

  console.log("⚙️ Configuración de performance aplicada");
}

// Exportar para uso global
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PERFORMANCE_CONFIG, getConfig, applyConfig };
} else {
  window.PERFORMANCE_CONFIG = PERFORMANCE_CONFIG;
  window.getConfig = getConfig;
  window.applyConfig = applyConfig;
}
