// Component Loader Optimizado - Sistema de componentes dinámicos (Versión Optimizada)
class OptimizedComponentLoader {
  constructor() {
    this.basePath = this.getBasePath();
    this.metadata = getPageMetadata();
    this.loadedComponents = new Set();
    this.init();
  }

  // Determinar la ruta base según la profundidad de la página
  getBasePath() {
    const currentPath = window.location.pathname;
    const depth = currentPath.split("/").filter((segment) => segment).length;

    console.log("🔍 Current path:", currentPath);
    console.log("📊 Path depth:", depth);

    let basePath;
    if (depth === 0) {
      basePath = "./";
    } else if (depth === 1) {
      basePath = "../";
    } else if (depth === 2) {
      basePath = "../../";
    } else {
      basePath = "../../../";
    }

    console.log("📍 Base path:", basePath);
    return basePath;
  }

  // Inicializar el sistema con carga paralela
  async init() {
    // Marcar página como cargando
    document.body.classList.add("loading");

    try {
      // Cargar componentes en paralelo para mejor rendimiento
      const componentPromises = [
        this.loadHeadComponent(),
        this.loadHeaderComponent(),
        this.loadFooterComponent(),
        this.loadUIComponents(),
        this.loadModalComponent(),
      ];

      // Esperar a que todos los componentes se carguen
      await Promise.all(componentPromises);

      // Actualizar título después de cargar todo
      this.updatePageTitle();

      // Ejecutar reemplazo de enlaces de redes sociales
      this.executeSocialLinksReplacement();

      // Reinicializar botones del modal después de cargar componentes
      this.reinitializeModalButtons();

      // Asegurar que el modal esté disponible en todas las páginas
      this.ensureModalAvailability();

      // Marcar como cargado
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");

      console.log("All components loaded successfully");
    } catch (error) {
      console.error("Error loading components:", error);
      // Aún así marcar como cargado para evitar bloqueo
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
    }
  }

  // Cargar componente head con caché
  async loadHeadComponent() {
    if (this.loadedComponents.has("head")) {
      return;
    }

    try {
      const response = await fetch(`${this.basePath}components/head.html`, {
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const headContent = await response.text();
      const processedContent = this.processHeadPaths(headContent);

      const headPlaceholder = document.getElementById("head-placeholder");
      if (headPlaceholder) {
        headPlaceholder.innerHTML = processedContent;
        this.loadedComponents.add("head");
        console.log("Head component loaded successfully");
      }
    } catch (error) {
      console.error("Error loading head component:", error);
    }
  }

  // Cargar componente header con caché
  async loadHeaderComponent() {
    if (this.loadedComponents.has("header")) {
      console.log("Header already loaded, skipping...");
      return;
    }

    console.log("🔄 Loading header component...");
    console.log("📁 Header path:", `${this.basePath}components/header.html`);

    try {
      const response = await fetch(`${this.basePath}components/header.html`, {
        cache: "force-cache",
      });

      console.log(
        "📡 Header fetch response:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const headerContent = await response.text();
      console.log("📄 Header content length:", headerContent.length);

      const processedContent = this.processHeaderPaths(headerContent);
      console.log("🔧 Header content processed");

      const headerPlaceholder = document.getElementById("header-placeholder");
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = processedContent;
        this.loadedComponents.add("header");
        console.log("✅ Header component loaded successfully");
      } else {
        console.error("❌ Header placeholder not found in DOM");
      }
    } catch (error) {
      console.error("❌ Error cargando componente header:", error);
    }
  }

  // Cargar componente footer con caché
  async loadFooterComponent() {
    if (this.loadedComponents.has("footer")) {
      return;
    }

    try {
      const response = await fetch(`${this.basePath}components/footer.html`, {
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const footerContent = await response.text();
      const processedContent = this.processFooterPaths(footerContent);

      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = processedContent;
        this.loadedComponents.add("footer");
        console.log("Footer component loaded successfully");

        // Cargar redes sociales después de cargar el footer
        this.loadSocialLinksInFooter();
      } else {
        console.warn("Footer placeholder not found");
      }
    } catch (error) {
      console.error("Error cargando componente footer:", error);
    }
  }

  // Cargar componentes de UI con caché
  async loadUIComponents() {
    if (this.loadedComponents.has("ui-components")) {
      return;
    }

    try {
      const response = await fetch(
        `${this.basePath}components/ui-components.html`,
        {
          cache: "force-cache",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const uiContent = await response.text();

      // Insertar los componentes de UI antes del footer
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.insertAdjacentHTML("beforebegin", uiContent);
        this.loadedComponents.add("ui-components");
        console.log("UI components loaded successfully");

        // Inicializar funcionalidad de los botones después de cargar
        this.initializeUIComponents();
      } else {
        console.warn(
          "Footer placeholder not found, inserting UI components at end of body"
        );
        document.body.insertAdjacentHTML("beforeend", uiContent);
        this.initializeUIComponents();
      }
    } catch (error) {
      console.error("Error cargando componentes de UI:", error);
    }
  }

  // Cargar modal de reservas
  async loadModalComponent() {
    if (this.loadedComponents.has("modal")) {
      console.log("Modal already loaded, skipping");
      return;
    }

    const existingModal = document.getElementById("citas");
    if (!existingModal) {
      console.log(
        "🔧 LOADING MODAL FROM:",
        `${this.basePath}components/modal-reservas-unified.html`
      );

      try {
        const response = await fetch(
          `${this.basePath}components/modal-reservas-unified.html`,
          {
            cache: "no-cache", // Cambiar a no-cache para asegurar que se carga
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const modalContent = await response.text();
        const processedContent = this.processModalPaths(modalContent);

        // Insertar el modal antes del cierre del body
        document.body.insertAdjacentHTML("beforeend", processedContent);
        this.loadedComponents.add("modal");

        // Verificar que el modal se insertó correctamente
        const insertedModal = document.getElementById("citas");
        if (insertedModal) {
          console.log("✅ MODAL COMPONENT LOADED AND INSERTED SUCCESSFULLY");
        } else {
          console.error("❌ MODAL WAS NOT INSERTED CORRECTLY");
        }
      } catch (error) {
        console.error("Error loading modal component:", error);
      }
    } else {
      console.log("Modal already exists, skipping load");
      this.loadedComponents.add("modal");
    }
  }

  // Inicializar funcionalidad de los componentes de UI
  initializeUIComponents() {
    // Botón de subir arriba
    this.initializeToTopButton();

    // Botón de cambiar tema
    this.initializeThemeToggle();
  }

  // Cargar redes sociales en el footer
  loadSocialLinksInFooter() {
    const socialContainer = document.getElementById("social-links-container");
    if (socialContainer && typeof generateSocialHTML === "function") {
      socialContainer.innerHTML = generateSocialHTML();
      console.log("Social links loaded in footer");

      // Re-aplicar event listeners a los nuevos enlaces
      const newSocialLinks = document.querySelectorAll(".social-link");
      newSocialLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const platform = link.getAttribute("data-social");
          const currentPage =
            window.location.pathname.split("/").pop() || "index.html";
          console.log(`Social media click: ${platform} from ${currentPage}`);
        });
      });
    } else {
      console.warn(
        "Social container not found or generateSocialHTML not available"
      );
    }
  }

  // Ejecutar reemplazo de enlaces de redes sociales
  executeSocialLinksReplacement() {
    if (typeof replaceAllSocialLinks === "function") {
      // Ejecutar inmediatamente
      replaceAllSocialLinks();

      // También ejecutar después de un pequeño delay para asegurar que todo esté cargado
      setTimeout(() => {
        replaceAllSocialLinks();
      }, 100);
    } else {
      console.warn("replaceAllSocialLinks function not available");
    }
  }

  // Inicializar botón de subir arriba
  initializeToTopButton() {
    const toTop = document.getElementById("to-top");
    if (!toTop) {
      console.warn("To-top button not found");
      return;
    }

    const onScroll = () => {
      const show = window.scrollY > 600;
      toTop.classList.toggle("is-visible", show);
    };

    // Remover listener anterior si existe
    if (window.toTopScrollHandler) {
      window.removeEventListener("scroll", window.toTopScrollHandler);
    }

    // Agregar nuevo listener
    window.addEventListener("scroll", onScroll, { passive: true });
    window.toTopScrollHandler = onScroll;

    // Click handler
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Ejecutar inmediatamente
    onScroll();

    console.log("To-top button initialized");
  }

  // Inicializar botón de cambiar tema (versión optimizada)
  initializeThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const html = document.documentElement;

    if (!themeToggle || !themeIcon) {
      console.warn("Theme toggle elements not found");
      return;
    }

    // Remover listeners anteriores si existen
    if (window.themeToggleHandler) {
      themeToggle.removeEventListener("click", window.themeToggleHandler);
    }

    // Obtener tema guardado o usar 'light' por defecto
    const savedTheme = localStorage.getItem("theme") || "light";
    html.setAttribute("data-theme", savedTheme);

    // Actualizar icono basado en el tema actual
    const updateIcon = () => {
      const currentTheme = html.getAttribute("data-theme");

      if (currentTheme === "light") {
        themeIcon.className = "fa-solid fa-moon";
      } else {
        themeIcon.className = "fa-solid fa-sun";
      }
    };

    // Función para cambiar tema
    const toggleTheme = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const currentTheme = html.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateIcon();

      // Disparar evento personalizado para notificar el cambio
      window.dispatchEvent(
        new CustomEvent("themeChanged", {
          detail: { theme: newTheme },
        })
      );
    };

    // Configurar icono inicial
    updateIcon();

    // Agregar click handler
    themeToggle.addEventListener("click", toggleTheme);
    window.themeToggleHandler = toggleTheme;

    console.log("Theme toggle button initialized successfully");
  }

  // Procesar rutas en el header
  processHeaderPaths(content) {
    // Reemplazar placeholders con rutas correctas según la profundidad
    let processedContent = content.replace(/\{\{BASE_PATH\}\}/g, this.basePath);

    // Ajustar rutas específicas según la profundidad de la página
    if (this.basePath === "./") {
      // Página raíz - las rutas ya están correctas
      return processedContent;
    } else if (this.basePath === "../") {
      // Una carpeta de profundidad - ajustar rutas relativas
      return processedContent
        .replace(/href="\.\.\/tratamientos\//g, 'href="../tratamientos/')
        .replace(/href="\.\.\/aplicaciones\//g, 'href="../aplicaciones/')
        .replace(/href="\.\.\/index\.html/g, 'href="../index.html');
    } else if (this.basePath === "../../") {
      // Dos carpetas de profundidad
      return processedContent
        .replace(/href="\.\.\/tratamientos\//g, 'href="../../tratamientos/')
        .replace(/href="\.\.\/aplicaciones\//g, 'href="../../aplicaciones/')
        .replace(/href="\.\.\/index\.html/g, 'href="../../index.html');
    } else if (this.basePath === "../../../") {
      // Tres carpetas de profundidad
      return processedContent
        .replace(/href="\.\.\/tratamientos\//g, 'href="../../../tratamientos/')
        .replace(/href="\.\.\/aplicaciones\//g, 'href="../../../aplicaciones/')
        .replace(/href="\.\.\/index\.html/g, 'href="../../../index.html');
    }

    return processedContent;
  }

  // Procesar rutas en el head
  processHeadPaths(content) {
    // Reemplazar placeholders con rutas correctas según la profundidad
    let processedContent = content.replace(/\{\{BASE_PATH\}\}/g, this.basePath);

    // Ajustar rutas específicas según la profundidad de la página
    if (this.basePath === "./") {
      // Página raíz - las rutas ya están correctas
      return processedContent;
    } else if (this.basePath === "../") {
      // Una carpeta de profundidad - ajustar rutas relativas
      return processedContent
        .replace(/href="\.\.\/css\//g, 'href="../css/')
        .replace(/href="\.\.\/js\//g, 'href="../js/')
        .replace(/href="\.\.\/assets\//g, 'href="../assets/');
    } else if (this.basePath === "../../") {
      // Dos carpetas de profundidad
      return processedContent
        .replace(/href="\.\.\/css\//g, 'href="../../css/')
        .replace(/href="\.\.\/js\//g, 'href="../../js/')
        .replace(/href="\.\.\/assets\//g, 'href="../../assets/');
    } else if (this.basePath === "../../../") {
      // Tres carpetas de profundidad
      return processedContent
        .replace(/href="\.\.\/css\//g, 'href="../../../css/')
        .replace(/href="\.\.\/js\//g, 'href="../../../js/')
        .replace(/href="\.\.\/assets\//g, 'href="../../../assets/');
    }

    return processedContent;
  }

  // Procesar rutas en el footer
  processFooterPaths(content) {
    return this.processHeaderPaths(content);
  }

  // Procesar rutas en el modal
  processModalPaths(content) {
    // El modal no necesita procesamiento especial de rutas ya que es contenido estático
    return content;
  }

  // Actualizar título de la página dinámicamente
  updatePageTitle() {
    const titleElement = document.querySelector("[data-page-title]");
    if (titleElement) {
      titleElement.textContent = `${this.metadata.title} • OZONO VIDA`;
    } else {
      // Fallback: actualizar el título directamente
      document.title = `${this.metadata.title} • OZONO VIDA`;
    }
  }

  // Reinicializar botones del modal después de cargar componentes
  reinitializeModalButtons() {
    console.log("Reinitializing modal buttons after component load");

    // Esperar un poco para que el modal se cargue completamente
    setTimeout(() => {
      // Si la función initModalButtons está disponible globalmente, llamarla
      if (typeof initModalButtons === "function") {
        console.log("Calling global initModalButtons function");
        initModalButtons();
      } else {
        console.log("Global initModalButtons not available, using fallback");
        // Fallback: buscar y agregar listeners manualmente
        const modalButtons = document.querySelectorAll("[data-open-modal]");
        console.log(`Found ${modalButtons.length} modal buttons to initialize`);

        modalButtons.forEach((btn) => {
          // Remover listeners anteriores
          btn.removeEventListener("click", this.handleModalClick);
          // Agregar nuevo listener
          btn.addEventListener("click", this.handleModalClick);
        });
      }

      // Verificar que el modal existe
      const modal = document.getElementById("citas");
      if (modal) {
        console.log("Modal found and ready for use");
      } else {
        console.error(
          "Modal not found after component loading - trying to load manually"
        );
        // Intentar cargar el modal manualmente si no existe
        this.loadModalComponent();
      }
    }, 100);
  }

  // Asegurar que el modal esté disponible en todas las páginas
  ensureModalAvailability() {
    console.log("🔧 Ensuring modal availability...");

    // Verificar si hay botones de modal en la página
    const modalButtons = document.querySelectorAll("[data-open-modal]");

    if (modalButtons.length > 0) {
      console.log(
        `Found ${modalButtons.length} modal buttons, ensuring modal is loaded...`
      );

      // Si no existe el modal, cargarlo
      const existingModal = document.getElementById("citas");
      if (!existingModal) {
        console.log("Modal not found, loading automatically...");
        this.loadModalComponent();
      } else {
        console.log("Modal already exists");
      }
    }
  }

  // Manejar clicks en botones de modal
  handleModalClick(e) {
    e.preventDefault();
    console.log("Modal button clicked from component loader:", e.target);

    const modal = document.getElementById("citas");
    console.log("Modal found:", !!modal);

    if (modal) {
      // Si el modal existe, abrirlo directamente
      console.log("Opening modal directly (from component loader)");
      modal.setAttribute("aria-hidden", "false");
      modal.setAttribute("aria-modal", "true");
      document.body.style.overflow = "hidden";
      const firstInput = modal.querySelector("#nombre");
      if (firstInput) firstInput.focus();
    } else {
      console.log("Modal not found, trying to load it first...");
      // Intentar cargar el modal primero
      this.loadModalComponent();

      // Esperar un poco y reintentar
      setTimeout(() => {
        const modalRetry = document.getElementById("citas");
        if (modalRetry) {
          console.log("Modal found after loading, opening...");
          modalRetry.setAttribute("aria-hidden", "false");
          modalRetry.setAttribute("aria-modal", "true");
          document.body.style.overflow = "hidden";
          const firstInput = modalRetry.querySelector("#nombre");
          if (firstInput) firstInput.focus();
        } else {
          console.log(
            "Modal still not found after loading, redirecting to index.html"
          );
          const targetUrl = e.target.getAttribute("href");
          if (targetUrl) {
            window.location.href = targetUrl;
          } else {
            window.location.href = "index.html#citas";
          }
        }
      }, 1000);
    }
  }
}

// Función para inicializar cuando el DOM esté listo
function initializeOptimizedComponents() {
  console.log("🚀 INITIALIZING OPTIMIZED COMPONENTS...");
  console.log("🌐 Current URL:", window.location.href);
  console.log("📄 Current path:", window.location.pathname);

  // Verificar que las funciones de metadata y social estén disponibles
  if (
    typeof getPageMetadata === "function" &&
    typeof SOCIAL_CONFIG !== "undefined"
  ) {
    console.log(
      "✅ Metadata and social functions available, creating OptimizedComponentLoader"
    );
    new OptimizedComponentLoader();
  } else {
    console.log("⏳ Functions not available, retrying in 100ms...");
    console.log("🔍 getPageMetadata:", typeof getPageMetadata);
    console.log("🔍 SOCIAL_CONFIG:", typeof SOCIAL_CONFIG);
    console.log("🔍 getPageMetadata function:", getPageMetadata);
    console.log("🔍 SOCIAL_CONFIG object:", SOCIAL_CONFIG);
    // Si no está disponible, esperar un poco y reintentar
    setTimeout(initializeOptimizedComponents, 100);
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  console.log("DOM still loading, waiting for DOMContentLoaded");
  document.addEventListener("DOMContentLoaded", initializeOptimizedComponents);
} else {
  console.log("DOM already loaded, initializing immediately");
  initializeOptimizedComponents();
}

// Exportar para uso global
window.OptimizedComponentLoader = OptimizedComponentLoader;
