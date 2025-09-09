// Component Loader - Sistema de componentes dinámicos
class ComponentLoader {
  constructor() {
    this.basePath = this.getBasePath();
    this.metadata = getPageMetadata();
    this.init();
  }

  // Determinar la ruta base según la profundidad de la página
  getBasePath() {
    const currentPath = window.location.pathname;
    const depth = currentPath.split('/').filter(segment => segment).length;
    
    if (depth === 0) {
      return './';
    } else if (depth === 1) {
      return '../';
    } else if (depth === 2) {
      return '../../';
    } else {
      return '../../../';
    }
  }

  // Inicializar el sistema
  async init() {
    await this.loadHeadComponent();
    await this.loadHeaderComponent();
    await this.loadFooterComponent();
    await this.loadUIComponents();
    this.updatePageTitle();
  }

  // Cargar componente head con metadata dinámica
  async loadHeadComponent() {
    try {
      const response = await fetch(`${this.basePath}components/head.html`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const headContent = await response.text();
      
      // Reemplazar placeholders con datos reales
      const processedContent = this.processTemplate(headContent);
      
      // Insertar en el head del documento
      const headElement = document.head;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = processedContent;
      
      // Mover todos los elementos al head real
      while (tempDiv.firstChild) {
        headElement.appendChild(tempDiv.firstChild);
      }
      
      console.log('Head component loaded successfully');
    } catch (error) {
      console.error('Error cargando componente head:', error);
      console.error('Base path:', this.basePath);
      console.error('URL intentada:', `${this.basePath}components/head.html`);
    }
  }

  // Cargar componente header
  async loadHeaderComponent() {
    try {
      const response = await fetch(`${this.basePath}components/header.html`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const headerContent = await response.text();
      
      // Procesar rutas relativas en el header
      const processedContent = this.processHeaderPaths(headerContent);
      
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = processedContent;
        console.log('Header component loaded successfully');
        
        // Reinicializar funcionalidad del header después de cargar
        this.initializeHeaderComponents();
      } else {
        console.warn('Header placeholder not found');
      }
    } catch (error) {
      console.error('Error cargando componente header:', error);
      console.error('Base path:', this.basePath);
      console.error('URL intentada:', `${this.basePath}components/header.html`);
    }
  }

  // Inicializar funcionalidad del header
  initializeHeaderComponents() {
    // Mobile nav toggle
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.getElementById('menu');
    
    if (toggle && menu) {
      // Remover listeners anteriores si existen
      if (window.headerToggleHandler) {
        toggle.removeEventListener('click', window.headerToggleHandler);
      }
      
      const toggleHandler = (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        
        // Prevent body scroll when menu is open
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      };
      
      toggle.addEventListener('click', toggleHandler);
      window.headerToggleHandler = toggleHandler;
      
      console.log('Header navigation initialized');
    }
  }

  // Cargar componente footer
  async loadFooterComponent() {
    try {
      const response = await fetch(`${this.basePath}components/footer.html`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const footerContent = await response.text();
      
      // Procesar rutas relativas en el footer
      const processedContent = this.processFooterPaths(footerContent);
      
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = processedContent;
        console.log('Footer component loaded successfully');
      } else {
        console.warn('Footer placeholder not found');
      }
    } catch (error) {
      console.error('Error cargando componente footer:', error);
      console.error('Base path:', this.basePath);
      console.error('URL intentada:', `${this.basePath}components/footer.html`);
    }
  }

  // Procesar template con datos dinámicos
  processTemplate(template) {
    return template
      .replace(/\{\{PAGE_TITLE\}\}/g, this.metadata.title)
      .replace(/\{\{PAGE_DESCRIPTION\}\}/g, this.metadata.description)
      .replace(/\{\{PAGE_URL\}\}/g, this.metadata.url)
      .replace(/\{\{PAGE_IMAGE\}\}/g, this.metadata.image)
      .replace(/\{\{BASE_PATH\}\}/g, this.basePath);
  }

  // Procesar rutas en el header
  processHeaderPaths(content) {
    // Ajustar rutas según la profundidad de la página
    if (this.basePath === './') {
      // Página raíz - no cambiar nada
      return content;
    } else if (this.basePath === '../') {
      // Una carpeta de profundidad
      return content.replace(/href="\.\.\//g, 'href="../')
                   .replace(/src="\.\.\//g, 'src="../');
    } else if (this.basePath === '../../') {
      // Dos carpetas de profundidad
      return content.replace(/href="\.\.\//g, 'href="../../')
                   .replace(/src="\.\.\//g, 'src="../../');
    }
    return content;
  }

  // Procesar rutas en el footer
  processFooterPaths(content) {
    return this.processHeaderPaths(content);
  }

  // Cargar componentes de UI (botones de acción)
  async loadUIComponents() {
    try {
      const response = await fetch(`${this.basePath}components/ui-components.html`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const uiContent = await response.text();
      
      // Insertar los componentes de UI antes del footer
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.insertAdjacentHTML('beforebegin', uiContent);
        console.log('UI components loaded successfully');
        
        // Reinicializar funcionalidad de los botones después de cargar
        this.initializeUIComponents();
      } else {
        console.warn('Footer placeholder not found, inserting UI components at end of body');
        document.body.insertAdjacentHTML('beforeend', uiContent);
        this.initializeUIComponents();
      }
    } catch (error) {
      console.error('Error cargando componentes de UI:', error);
      console.error('Base path:', this.basePath);
      console.error('URL intentada:', `${this.basePath}components/ui-components.html`);
    }
  }

  // Inicializar funcionalidad de los componentes de UI
  initializeUIComponents() {
    // Botón de subir arriba
    const toTop = document.getElementById('to-top');
    if (toTop) {
      const onScroll = () => {
        const show = window.scrollY > 600;
        toTop.classList.toggle('is-visible', show);
      };
      
      // Remover listener anterior si existe
      if (window.toTopScrollHandler) {
        window.removeEventListener('scroll', window.toTopScrollHandler);
      }
      
      // Agregar nuevo listener
      window.addEventListener('scroll', onScroll, { passive: true });
      window.toTopScrollHandler = onScroll;
      
      // Click handler
      toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      
      // Ejecutar inmediatamente
      onScroll();
      
      console.log('To-top button initialized');
    }

    // Botón de cambiar tema - versión mejorada
    this.initializeThemeToggle();
  }

  // Inicializar funcionalidad del botón de tema de forma independiente
  initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;
    
    if (!themeToggle || !themeIcon) {
      console.warn('Theme toggle elements not found');
      return;
    }

    // Remover listeners anteriores si existen
    if (window.themeToggleHandler) {
      themeToggle.removeEventListener('click', window.themeToggleHandler);
    }

    // Obtener tema guardado o usar 'light' por defecto
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Actualizar icono basado en el tema actual
    const updateIcon = () => {
      const currentTheme = html.getAttribute('data-theme');
      console.log('Current theme:', currentTheme);
      
      if (currentTheme === 'light') {
        themeIcon.className = 'fa-solid fa-moon';
        console.log('Icon updated to moon (light theme)');
      } else {
        themeIcon.className = 'fa-solid fa-sun';
        console.log('Icon updated to sun (dark theme)');
      }
    };
    
    // Función para cambiar tema
    const toggleTheme = () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      console.log('Changing theme from', currentTheme, 'to', newTheme);
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon();
      
      // Disparar evento personalizado para notificar el cambio
      window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { theme: newTheme } 
      }));
    };
    
    // Configurar icono inicial
    updateIcon();
    
    // Agregar click handler
    themeToggle.addEventListener('click', toggleTheme);
    window.themeToggleHandler = toggleTheme;
    
    console.log('Theme toggle button initialized successfully');
    console.log('Initial theme:', savedTheme);
    console.log('Theme toggle element:', themeToggle);
    console.log('Theme icon element:', themeIcon);
  }

  // Actualizar título de la página dinámicamente
  updatePageTitle() {
    const titleElement = document.querySelector('[data-page-title]');
    if (titleElement) {
      titleElement.textContent = `${this.metadata.title} • OZONO VIDA`;
    } else {
      // Fallback: actualizar el título directamente
      document.title = `${this.metadata.title} • OZONO VIDA`;
    }
  }

  // Método para recargar componentes (útil para SPA)
  async reloadComponents() {
    this.metadata = getPageMetadata();
    await this.loadHeadComponent();
    await this.loadHeaderComponent();
    await this.loadFooterComponent();
    await this.loadUIComponents();
    this.updatePageTitle();
  }
}

// Función para inicializar cuando el DOM esté listo
function initializeComponents() {
  console.log('Initializing components...');
  
  // Verificar que las funciones de metadata estén disponibles
  if (typeof getPageMetadata === 'function') {
    console.log('Metadata functions available, creating ComponentLoader');
    new ComponentLoader();
  } else {
    console.log('Metadata functions not available, retrying in 100ms...');
    // Si no está disponible, esperar un poco y reintentar
    setTimeout(initializeComponents, 100);
  }
}

// Función para reinicializar componentes después de que app.js se ejecute
function reinitializeComponents() {
  console.log('Reinitializing components after app.js...');
  
  // Esperar un poco para que app.js termine de ejecutarse
  setTimeout(() => {
    if (window.ComponentLoader) {
      // Si ya existe una instancia, reinicializar solo los componentes de UI
      const loader = new ComponentLoader();
      loader.initializeUIComponents();
    } else {
      // Si no existe, crear una nueva instancia completa
      initializeComponents();
    }
  }, 500);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  console.log('DOM still loading, waiting for DOMContentLoaded');
  document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
  console.log('DOM already loaded, initializing immediately');
  initializeComponents();
}

// También reinicializar después de que app.js se ejecute
window.addEventListener('load', reinitializeComponents);

// Exportar para uso global
window.ComponentLoader = ComponentLoader;
