/**
 * 🖼️ OPTIMIZADOR DE IMÁGENES SIMPLE - OZONO VIDA
 * Sistema simplificado que funciona correctamente
 */

class SimpleImageOptimizer {
  constructor() {
    this.supportsWebP = false;
    this.init();
  }

  /**
   * Inicializa el optimizador
   */
  async init() {
    await this.checkWebPSupport();
    this.optimizeAllImages();
    console.log('🖼️ Optimizador de imágenes simple iniciado');
  }

  /**
   * Detecta soporte para WebP
   */
  checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        this.supportsWebP = webP.height === 2;
        console.log(`📊 Soporte WebP: ${this.supportsWebP ? 'SÍ' : 'NO'}`);
        resolve(this.supportsWebP);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Optimiza todas las imágenes de la página
   */
  optimizeAllImages() {
    const images = document.querySelectorAll('img');
    console.log(`🖼️ Optimizando ${images.length} imágenes...`);
    
    images.forEach((img, index) => {
      this.optimizeImage(img);
      console.log(`✅ Imagen ${index + 1} optimizada: ${img.alt || 'Sin alt'}`);
    });
  }

  /**
   * Optimiza una imagen individual
   */
  optimizeImage(img) {
    // Solo optimizar imágenes de Unsplash
    if (img.src && img.src.includes('images.unsplash.com')) {
      const optimizedSrc = this.getOptimizedUnsplashUrl(img.src);
      if (optimizedSrc !== img.src) {
        img.src = optimizedSrc;
      }
    }

    // Añadir atributos de performance
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }

    // Añadir dimensiones si no las tiene para evitar CLS
    if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
      this.addDimensions(img);
    }

    // Marcar como optimizada
    img.classList.add('img-optimized');
  }

  /**
   * Optimiza URLs de Unsplash
   */
  getOptimizedUnsplashUrl(src) {
    try {
      const url = new URL(src);
      
      // Determinar tamaño según viewport
      const width = this.getOptimalWidth();
      
      // Configurar parámetros optimizados
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', '80'); // Calidad optimizada
      url.searchParams.set('fm', this.supportsWebP ? 'webp' : 'jpg');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('auto', 'format'); // Formato automático
      
      return url.toString();
    } catch (error) {
      console.warn('⚠️ Error optimizando URL de Unsplash:', error);
      return src;
    }
  }

  /**
   * Determina el ancho optimal según viewport
   */
  getOptimalWidth() {
    const screenWidth = window.innerWidth;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    if (screenWidth <= 480) return Math.min(600, Math.round(480 * devicePixelRatio));
    if (screenWidth <= 768) return Math.min(800, Math.round(768 * devicePixelRatio));
    if (screenWidth <= 1024) return Math.min(1200, Math.round(1024 * devicePixelRatio));
    return Math.min(1600, Math.round(1200 * devicePixelRatio));
  }

  /**
   * Añade dimensiones para evitar CLS
   */
  addDimensions(img) {
    // Dimensiones por defecto según contexto
    if (img.closest('.card__image')) {
      img.setAttribute('width', '400');
      img.setAttribute('height', '300');
    } else if (img.closest('.hero')) {
      img.setAttribute('width', '600');
      img.setAttribute('height', '400');
    } else if (img.closest('.testimonial__avatar')) {
      img.setAttribute('width', '80');
      img.setAttribute('height', '80');
    } else {
      img.setAttribute('width', '400');
      img.setAttribute('height', '300');
    }
  }

  /**
   * Reoptimiza cuando cambia el viewport
   */
  handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Solo reoptimizar imágenes de Unsplash
      const unsplashImages = document.querySelectorAll('img[src*="unsplash.com"]');
      unsplashImages.forEach(img => {
        const newSrc = this.getOptimizedUnsplashUrl(img.src);
        if (newSrc !== img.src) {
          img.src = newSrc;
        }
      });
      console.log(`🔄 ${unsplashImages.length} imágenes reoptimizadas para nuevo viewport`);
    }, 500);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.simpleImageOptimizer = new SimpleImageOptimizer();
  
  // Reoptimizar en resize
  window.addEventListener('resize', () => {
    if (window.simpleImageOptimizer) {
      window.simpleImageOptimizer.handleResize();
    }
  });
});

// Función para optimizar nuevas imágenes dinámicas
window.optimizeNewImage = function(img) {
  if (window.simpleImageOptimizer) {
    window.simpleImageOptimizer.optimizeImage(img);
  }
};

export default SimpleImageOptimizer;
