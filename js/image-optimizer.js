/**
 * 🖼️ SISTEMA DE OPTIMIZACIÓN DE IMÁGENES - OZONO VIDA
 * Optimiza automáticamente la carga de imágenes con WebP, srcset y lazy loading
 */

class ImageOptimizer {
  constructor() {
    this.supportsWebP = false;
    this.observer = null;
    this.init();
  }

  /**
   * Inicializa el sistema de optimización
   */
  async init() {
    await this.checkWebPSupport();
    this.setupLazyLoading();
    this.optimizeExistingImages();
    console.log("🖼️ Sistema de optimización de imágenes iniciado");
  }

  /**
   * Detecta soporte para WebP
   */
  checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        this.supportsWebP = webP.height === 2;
        console.log(`📊 Soporte WebP: ${this.supportsWebP ? "SÍ" : "NO"}`);
        resolve(this.supportsWebP);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    });
  }

  /**
   * Configura Intersection Observer para lazy loading
   */
  setupLazyLoading() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target);
              this.observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "50px 0px", // Cargar 50px antes de que sea visible
          threshold: 0.01,
        }
      );
    }
  }

  /**
   * Optimiza imágenes existentes en la página
   */
  optimizeExistingImages() {
    const images = document.querySelectorAll("img[src]");
    images.forEach((img) => this.optimizeLoadedImage(img));
    
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => this.processLazyImage(img));
  }

  /**
   * Procesa una imagen individual
   */
  processImage(img) {
    // Si ya tiene data-src, está configurada para lazy loading
    if (img.hasAttribute("data-src")) {
      this.processLazyImage(img);
    } else {
      // Optimizar imagen ya cargada
      this.optimizeLoadedImage(img);
    }
  }

  /**
   * Procesa imagen con lazy loading
   */
  processLazyImage(img) {
    if (this.observer) {
      this.observer.observe(img);
    } else {
      // Fallback si no hay soporte para IntersectionObserver
      this.loadImage(img);
    }
  }

  /**
   * Carga una imagen con lazy loading
   */
  loadImage(img) {
    const src = img.dataset.src || img.src;
    const optimizedSrc = this.getOptimizedSrc(src);

    // Crear imagen temporal para precargar
    const tempImg = new Image();

    tempImg.onload = () => {
      img.src = optimizedSrc;
      img.classList.add("loaded");
      img.removeAttribute("data-src");

      // Añadir efecto de fade in
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";
      setTimeout(() => (img.style.opacity = "1"), 10);
    };

    tempImg.onerror = () => {
      // Fallback a imagen original
      img.src = src;
      img.classList.add("loaded");
    };

    tempImg.src = optimizedSrc;
  }

  /**
   * Optimiza imagen ya cargada
   */
  optimizeLoadedImage(img) {
    const originalSrc = img.src;
    
    // Solo optimizar imágenes de Unsplash
    if (originalSrc.includes('images.unsplash.com')) {
      const optimizedSrc = this.getOptimizedSrc(originalSrc);
      if (originalSrc !== optimizedSrc) {
        img.src = optimizedSrc;
      }
    }

    // Añadir atributos de performance si no los tiene
    if (!img.hasAttribute("loading") && !img.classList.contains('critical-img')) {
      img.setAttribute("loading", "lazy");
    }

    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async");
    }

    // Marcar como optimizada
    img.classList.add('optimized');
  }

  /**
   * Genera URL optimizada para la imagen
   */
  getOptimizedSrc(src) {
    // Si es una imagen de Unsplash, optimizar parámetros
    if (src.includes("images.unsplash.com")) {
      const url = new URL(src);

      // Determinar tamaño según viewport
      const width = this.getOptimalWidth();
      url.searchParams.set("w", width.toString());
      url.searchParams.set("q", "80"); // Calidad optimizada
      url.searchParams.set("fm", this.supportsWebP ? "webp" : "jpg");
      url.searchParams.set("fit", "crop");

      return url.toString();
    }

    // Para imágenes locales, intentar versión WebP
    if (this.supportsWebP && src.includes("/assets/images/")) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      return webpSrc;
    }

    return src;
  }

  /**
   * Determina el ancho optimal según el viewport
   */
  getOptimalWidth() {
    const screenWidth = window.innerWidth;
    const devicePixelRatio = window.devicePixelRatio || 1;

    if (screenWidth <= 480) return Math.round(480 * devicePixelRatio);
    if (screenWidth <= 768) return Math.round(768 * devicePixelRatio);
    if (screenWidth <= 1024) return Math.round(1024 * devicePixelRatio);
    return Math.round(1200 * devicePixelRatio);
  }

  /**
   * Genera srcset para imágenes responsive
   */
  generateSrcSet(baseSrc) {
    const widths = [400, 600, 800, 1200, 1600];
    const format = this.supportsWebP ? "webp" : "jpg";

    if (baseSrc.includes("images.unsplash.com")) {
      const url = new URL(baseSrc);
      return widths
        .map((width) => {
          url.searchParams.set("w", width.toString());
          url.searchParams.set("fm", format);
          return `${url.toString()} ${width}w`;
        })
        .join(", ");
    }

    return null;
  }

  /**
   * Añade imagen optimizada al DOM
   */
  createOptimizedImage(src, alt, className = "", sizes = "100vw") {
    const img = document.createElement("img");
    const optimizedSrc = this.getOptimizedSrc(src);
    const srcSet = this.generateSrcSet(src);

    // Configurar lazy loading
    img.setAttribute("data-src", optimizedSrc);
    img.setAttribute("alt", alt);
    img.setAttribute("loading", "lazy");
    img.setAttribute("decoding", "async");
    img.className = className;

    if (srcSet) {
      img.setAttribute("data-srcset", srcSet);
      img.setAttribute("sizes", sizes);
    }

    // Placeholder mientras carga
    img.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2FyZ2FuZG8uLi48L3RleHQ+PC9zdmc+";

    // Procesar imagen
    this.processImage(img);

    return img;
  }

  /**
   * Optimiza todas las imágenes de una sección específica
   */
  optimizeSection(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (section) {
      const images = section.querySelectorAll("img");
      images.forEach((img) => this.processImage(img));
      console.log(
        `🖼️ Optimizadas ${images.length} imágenes en ${sectionSelector}`
      );
    }
  }

  /**
   * Reoptimiza imágenes cuando cambia el viewport
   */
  handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.optimizeExistingImages();
    }, 300);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.imageOptimizer = new ImageOptimizer();

  // Reoptimizar en resize
  window.addEventListener("resize", () => {
    if (window.imageOptimizer) {
      window.imageOptimizer.handleResize();
    }
  });
});

// Función global para crear imágenes optimizadas
window.createOptimizedImage = function (
  src,
  alt,
  className = "",
  sizes = "100vw"
) {
  if (window.imageOptimizer) {
    return window.imageOptimizer.createOptimizedImage(
      src,
      alt,
      className,
      sizes
    );
  }

  // Fallback básico
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.className = className;
  img.loading = "lazy";
  return img;
};

export default ImageOptimizer;
