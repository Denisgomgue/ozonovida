/**
 * CSS Loader Dinámico - OZONO VIDA
 * Carga CSS específico según la página actual
 */

class CSSLoader {
  constructor() {
    this.loadedStyles = new Set();
    this.basePath = "./css/";
  }

  // Detectar página actual
  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split("/").pop().replace(".html", "") || "home";
    return page;
  }

  // Cargar archivo CSS
  loadCSS(filename, priority = "normal") {
    return new Promise((resolve, reject) => {
      if (this.loadedStyles.has(filename)) {
        resolve(`${filename} ya está cargado`);
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = this.basePath + filename;

      // Manejar prioridad
      if (priority === "critical") {
        link.setAttribute("data-critical", "true");
      } else {
        link.setAttribute("data-lazy", "true");
      }

      link.onload = () => {
        this.loadedStyles.add(filename);
        console.log(`✅ CSS cargado: ${filename}`);
        resolve(filename);
      };

      link.onerror = () => {
        console.error(`❌ Error cargando CSS: ${filename}`);
        reject(new Error(`No se pudo cargar ${filename}`));
      };

      // Insertar en el head
      const head = document.head;
      const criticalStyles = head.querySelector("[data-critical]");

      if (priority === "critical" || !criticalStyles) {
        head.appendChild(link);
      } else {
        head.insertBefore(link, criticalStyles.nextSibling);
      }
    });
  }

  // Cargar estilos según la página
  async loadPageStyles() {
    const page = this.getCurrentPage();

    try {
      // Estilos base (siempre se cargan)
      await this.loadCSS("base/variables.css", "critical");
      await this.loadCSS("components/buttons.css", "critical");

      // Estilos específicos según la página
      switch (page) {
        case "ozonoterapia":
          await Promise.all([
            this.loadCSS("pages/services-base.css"),
            this.loadCSS("pages/ozonoterapia.css"),
          ]);
          break;

        case "plasma":
          await Promise.all([
            this.loadCSS("pages/services-base.css"),
            this.loadCSS("pages/plasma.css"),
          ]);
          break;

        case "medicina-regenerativa":
          await Promise.all([
            this.loadCSS("pages/services-base.css"),
            this.loadCSS("pages/medicina-regenerativa.css"),
          ]);
          break;

        case "coctel-vida":
          await Promise.all([
            this.loadCSS("pages/services-base.css"),
            this.loadCSS("pages/coctel-vida.css"),
          ]);
          break;

        case "home":
        default:
          await this.loadCSS("pages/home.css");
          break;
      }

      console.log(`🎨 Estilos cargados para página: ${page}`);
    } catch (error) {
      console.error("Error cargando estilos:", error);
      // Fallback al CSS principal si hay error
      this.loadCSS("../styles.css");
    }
  }

  // Precargar estilos para navegación rápida
  preloadPageStyles(pages = []) {
    pages.forEach((page) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = `${this.basePath}pages/${page}.css`;
      document.head.appendChild(link);
    });
  }

  // Remover estilos no utilizados
  unloadUnusedStyles() {
    const currentPage = this.getCurrentPage();
    const allStylesheets = document.querySelectorAll(
      'link[rel="stylesheet"][data-lazy]'
    );

    allStylesheets.forEach((link) => {
      const href = link.href;
      const isPageSpecific = href.includes("/pages/");
      const isCurrentPage = href.includes(currentPage);

      if (isPageSpecific && !isCurrentPage) {
        link.remove();
        const filename = href.split("/").pop();
        this.loadedStyles.delete(filename);
        console.log(`🗑️ CSS removido: ${filename}`);
      }
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const cssLoader = new CSSLoader();

  // Cargar estilos de la página actual
  cssLoader.loadPageStyles();

  // Precargar estilos de páginas relacionadas
  const currentPage = cssLoader.getCurrentPage();
  if (currentPage.includes("servicio") || currentPage === "ozonoterapia") {
    cssLoader.preloadPageStyles([
      "plasma",
      "medicina-regenerativa",
      "coctel-vida",
    ]);
  }

  // Exponer globalmente para uso manual
  window.cssLoader = cssLoader;
});

export default CSSLoader;
