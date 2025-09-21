/**
 * 📱 MENÚ MÓVIL SIMPLE - OZONO VIDA
 * JavaScript simplificado para manejo del menú móvil
 */

class SimpleMobileMenu {
  constructor() {
    this.menuToggle = null;
    this.menuLinks = null;
    this.isOpen = false;
    this.init();
  }

  /**
   * Inicializa el menú móvil simple
   */
  init() {
    this.menuToggle = document.querySelector(".nav__toggle");
    this.menuLinks = document.querySelector(".nav__links");

    if (this.menuToggle && this.menuLinks) {
      this.setupEventListeners();
      console.log("📱 Menú móvil simple iniciado");
    } else {
      console.warn("⚠️ No se encontraron elementos del menú móvil");
    }
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    // Toggle del menú principal
    this.menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleMenu();
    });

    // Manejar dropdowns y submenús
    this.setupDropdownHandlers();

    // Cerrar con Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    });

    // Cerrar al hacer clic en enlaces normales (no dropdowns)
    this.menuLinks.addEventListener("click", (e) => {
      if (
        e.target.tagName === "A" &&
        !e.target.classList.contains("dropdown__trigger") &&
        !e.target.classList.contains("dropdown__link")
      ) {
        setTimeout(() => this.closeMenu(), 300);
      }
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", (e) => {
      if (
        this.isOpen &&
        !this.menuLinks.contains(e.target) &&
        !this.menuToggle.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Cerrar al cambiar tamaño de ventana
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024 && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  /**
   * Configura manejadores para dropdowns anidados
   */
  setupDropdownHandlers() {
    // Manejar dropdowns principales
    const dropdownTriggers =
      this.menuLinks.querySelectorAll(".dropdown__trigger");
    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const dropdown = trigger.closest(".dropdown");
        this.toggleDropdown(dropdown);
      });
    });

    // Manejar submenús anidados
    const submenuTriggers = this.menuLinks.querySelectorAll(
      ".dropdown__item--has-submenu > .dropdown__link"
    );
    submenuTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const submenuItem = trigger.closest(".dropdown__item--has-submenu");
        this.toggleSubmenu(submenuItem);
      });
    });
  }

  /**
   * Alterna un dropdown principal
   */
  toggleDropdown(dropdown) {
    const isOpen = dropdown.classList.contains("is-open");

    // Cerrar otros dropdowns
    const allDropdowns = this.menuLinks.querySelectorAll(".dropdown");
    allDropdowns.forEach((d) => {
      if (d !== dropdown) {
        d.classList.remove("is-open");
      }
    });

    // Toggle del dropdown actual
    if (isOpen) {
      dropdown.classList.remove("is-open");
    } else {
      dropdown.classList.add("is-open");
    }

    console.log(`📋 Dropdown ${isOpen ? "cerrado" : "abierto"}`);
  }

  /**
   * Alterna un submenú anidado
   */
  toggleSubmenu(submenuItem) {
    const isOpen = submenuItem.classList.contains("is-open");

    // Cerrar otros submenús del mismo nivel
    const parentMenu = submenuItem.closest(".dropdown__menu");
    const siblingSubmenus = parentMenu.querySelectorAll(
      ".dropdown__item--has-submenu"
    );
    siblingSubmenus.forEach((item) => {
      if (item !== submenuItem) {
        item.classList.remove("is-open");
      }
    });

    // Toggle del submenú actual
    if (isOpen) {
      submenuItem.classList.remove("is-open");
    } else {
      submenuItem.classList.add("is-open");
    }

    console.log(`📋 Submenú ${isOpen ? "cerrado" : "abierto"}`);
  }

  /**
   * Alterna el estado del menú
   */
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /**
   * Abre el menú
   */
  openMenu() {
    this.menuLinks.classList.add("is-open");
    this.menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Prevenir scroll
    this.isOpen = true;
    console.log("📱 Menú móvil abierto");
  }

  /**
   * Cierra el menú
   */
  closeMenu() {
    this.menuLinks.classList.remove("is-open");
    this.menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = ""; // Restaurar scroll
    this.isOpen = false;
    console.log("📱 Menú móvil cerrado");
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.simpleMobileMenu = new SimpleMobileMenu();
});

// Función global para controlar el menú
window.toggleMobileMenu = function () {
  if (window.simpleMobileMenu) {
    window.simpleMobileMenu.toggleMenu();
  }
};

export default SimpleMobileMenu;
