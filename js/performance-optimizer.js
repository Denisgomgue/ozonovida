/**
 * ⚡ SISTEMA DE OPTIMIZACIÓN DE PERFORMANCE - OZONO VIDA
 * Optimiza la carga de recursos para mejorar Core Web Vitals
 */

class PerformanceOptimizer {
  constructor() {
    this.criticalResources = new Set();
    this.deferredResources = new Set();
    this.loadedResources = new Set();
    this.init();
  }

  /**
   * Inicializa el sistema de optimización
   */
  init() {
    this.detectCriticalResources();
    this.setupResourceHints();
    this.optimizeScriptLoading();
    this.setupPerformanceMonitoring();
    console.log("⚡ Sistema de optimización de performance iniciado");
  }

  /**
   * Detecta recursos críticos above-the-fold
   */
  detectCriticalResources() {
    // Imágenes críticas (visibles inmediatamente)
    const heroImages = document.querySelectorAll(
      ".hero img, .main-image-container img"
    );
    heroImages.forEach((img) => {
      this.criticalResources.add(img.src || img.dataset.src);
      img.classList.add("critical-img");
      img.loading = "eager";
    });

    // CSS crítico ya está inline, pero podemos optimizar fonts
    this.preloadCriticalFonts();
  }

  /**
   * Precarga fuentes críticas
   */
  preloadCriticalFonts() {
    const criticalFonts = [
      "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2",
      "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
    ];

    criticalFonts.forEach((font) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = font;
      link.as = "font";
      link.type = "font/woff2";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }

  /**
   * Configura resource hints para mejor performance
   */
  setupResourceHints() {
    const resourceHints = [
      // DNS prefetch para dominios externos
      { rel: "dns-prefetch", href: "//images.unsplash.com" },
      { rel: "dns-prefetch", href: "//www.tiktok.com" },

      // Preconnect para recursos críticos
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      { rel: "preconnect", href: "https://cdnjs.cloudflare.com" },
    ];

    resourceHints.forEach((hint) => {
      if (!document.querySelector(`link[href="${hint.href}"]`)) {
        const link = document.createElement("link");
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossorigin) link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      }
    });
  }

  /**
   * Optimiza la carga de scripts
   */
  optimizeScriptLoading() {
    // Cargar scripts no críticos después del load
    window.addEventListener("load", () => {
      this.loadDeferredScripts();
    });

    // Precargar scripts para navegación futura
    this.preloadNextPageScripts();
  }

  /**
   * Carga scripts diferidos después del load inicial
   */
  loadDeferredScripts() {
    const deferredScripts = [
      // Scripts de analytics (si los tienes)
      // { src: '/js/analytics.js', async: true },
      // Scripts de terceros no críticos
      // { src: '/js/social-sharing.js', defer: true }
    ];

    deferredScripts.forEach((script) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = script.src;

      if (script.async) scriptElement.async = true;
      if (script.defer) scriptElement.defer = true;

      scriptElement.onload = () => {
        console.log(`📦 Script diferido cargado: ${script.src}`);
      };

      document.head.appendChild(scriptElement);
    });
  }

  /**
   * Precarga scripts para páginas que el usuario probablemente visitará
   */
  preloadNextPageScripts() {
    // Detectar enlaces importantes y precargar sus recursos
    const importantLinks = document.querySelectorAll(
      'a[href*="servicios/"], a[href*="tratamientos/"]'
    );

    importantLinks.forEach((link) => {
      link.addEventListener(
        "mouseenter",
        () => {
          this.preloadPage(link.href);
        },
        { once: true }
      );
    });
  }

  /**
   * Precarga una página específica
   */
  preloadPage(href) {
    if (this.loadedResources.has(href)) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);

    this.loadedResources.add(href);
    console.log(`🔮 Página precargada: ${href}`);
  }

  /**
   * Configura monitoreo de performance
   */
  setupPerformanceMonitoring() {
    // Web Vitals monitoring
    if ("PerformanceObserver" in window) {
      this.monitorLCP();
      this.monitorFID();
      this.monitorCLS();
    }

    // Resource timing
    this.monitorResourceLoading();
  }

  /**
   * Monitorea Largest Contentful Paint
   */
  monitorLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      console.log(`📊 LCP: ${Math.round(lastEntry.startTime)}ms`);

      // Si LCP es mayor a 2.5s, optimizar
      if (lastEntry.startTime > 2500) {
        this.optimizeLCP();
      }
    });

    observer.observe({ entryTypes: ["largest-contentful-paint"] });
  }

  /**
   * Monitorea First Input Delay
   */
  monitorFID() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log(
          `📊 FID: ${Math.round(entry.processingStart - entry.startTime)}ms`
        );
      });
    });

    observer.observe({ entryTypes: ["first-input"] });
  }

  /**
   * Monitorea Cumulative Layout Shift
   */
  monitorCLS() {
    let clsValue = 0;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      console.log(`📊 CLS: ${clsValue.toFixed(4)}`);
    });

    observer.observe({ entryTypes: ["layout-shift"] });
  }

  /**
   * Monitorea carga de recursos
   */
  monitorResourceLoading() {
    window.addEventListener("load", () => {
      const resources = performance.getEntriesByType("resource");

      // Identificar recursos lentos
      const slowResources = resources.filter(
        (resource) => resource.duration > 1000
      );

      if (slowResources.length > 0) {
        console.warn("⚠️ Recursos lentos detectados:", slowResources);
      }

      // Estadísticas generales
      const totalLoadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`📊 Tiempo total de carga: ${totalLoadTime}ms`);
    });
  }

  /**
   * Optimiza LCP si es necesario
   */
  optimizeLCP() {
    // Precargar imagen LCP si no está precargada
    const lcpElement = document.querySelector(
      ".hero img, .main-image-container img"
    );

    if (lcpElement && !lcpElement.classList.contains("preloaded")) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = lcpElement.src;
      link.as = "image";
      document.head.appendChild(link);

      lcpElement.classList.add("preloaded");
      console.log("🎯 Imagen LCP precargada");
    }
  }

  /**
   * Optimiza recursos según la conexión del usuario
   */
  adaptToConnection() {
    if ("connection" in navigator) {
      const connection = navigator.connection;

      // Reducir calidad en conexiones lentas
      if (
        connection.effectiveType === "2g" ||
        connection.effectiveType === "slow-2g"
      ) {
        this.enableDataSaverMode();
      }

      // Precargar más agresivamente en conexiones rápidas
      if (connection.effectiveType === "4g") {
        this.enableAggressivePreloading();
      }
    }
  }

  /**
   * Activa modo ahorro de datos
   */
  enableDataSaverMode() {
    document.documentElement.classList.add("data-saver-mode");

    // Reducir calidad de imágenes
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.src.includes("unsplash.com")) {
        const url = new URL(img.src);
        url.searchParams.set("q", "60"); // Reducir calidad
        img.src = url.toString();
      }
    });

    console.log("📱 Modo ahorro de datos activado");
  }

  /**
   * Activa precarga agresiva
   */
  enableAggressivePreloading() {
    // Precargar más páginas
    const allLinks = document.querySelectorAll(
      'a[href^="/"], a[href*="ozonovida"]'
    );
    allLinks.forEach((link) => {
      link.addEventListener(
        "mouseenter",
        () => {
          this.preloadPage(link.href);
        },
        { once: true }
      );
    });

    console.log("🚀 Precarga agresiva activada");
  }

  /**
   * Limpia recursos no utilizados
   */
  cleanup() {
    // Limpiar preloads no utilizados después de 30 segundos
    setTimeout(() => {
      const preloadLinks = document.querySelectorAll(
        'link[rel="preload"], link[rel="prefetch"]'
      );
      preloadLinks.forEach((link) => {
        if (!this.loadedResources.has(link.href)) {
          link.remove();
        }
      });
    }, 30000);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.performanceOptimizer = new PerformanceOptimizer();

  // Adaptar a la conexión del usuario
  if (window.performanceOptimizer.adaptToConnection) {
    window.performanceOptimizer.adaptToConnection();
  }
});

// Limpiar recursos cuando la página se descarga
window.addEventListener("beforeunload", () => {
  if (window.performanceOptimizer) {
    window.performanceOptimizer.cleanup();
  }
});

export default PerformanceOptimizer;
