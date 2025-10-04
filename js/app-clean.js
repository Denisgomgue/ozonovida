document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Year in footer
  const year = new Date().getFullYear();
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(year);

  // Función para inicializar el menú móvil
  function initMobileMenu() {
    const toggle = $(".nav__toggle");
    const menu = $("#menu");

    if (toggle && menu) {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));

        // Prevent body scroll when menu is open
        if (isOpen) {
          document.body.style.overflow = "hidden";
          // Close all dropdowns when opening mobile menu
          $$(".dropdown").forEach((dropdown) => {
            dropdown.classList.remove("is-open");
          });
          $$(".dropdown__item--has-submenu").forEach((item) => {
            item.classList.remove("is-open");
          });
          // Close all nested submenus
          $$(".dropdown__submenu .dropdown__item--has-submenu").forEach(
            (nestedItem) => {
              nestedItem.classList.remove("is-open");
            }
          );
        } else {
          document.body.style.overflow = "";
        }
      });

      // Inicializar funcionalidad de submenús
      initSubmenus();

      return true;
    } else {
      return false;
    }
  }

  // Función para inicializar submenús (todos los tamaños de pantalla)
  function initSubmenus() {
    const submenuItems = $$(".dropdown__item--has-submenu");

    submenuItems.forEach((item, index) => {
      const link = $(".dropdown__link", item);

      if (link) {
        // Remover event listeners anteriores si existen
        link.removeEventListener("click", handleSubmenuClick);

        // Agregar nuevo event listener
        link.addEventListener("click", handleSubmenuClick);
      }
    });
  }

  // Función para manejar clicks en submenús
  function handleSubmenuClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const item = e.currentTarget.closest(".dropdown__item--has-submenu");
    if (item) {
      const isOpen = item.classList.toggle("is-open");

      // Close other submenus at the same level
      const parentDropdown = item.closest(".dropdown__menu");
      if (parentDropdown) {
        $$(".dropdown__item--has-submenu", parentDropdown).forEach(
          (otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("is-open");
              // Close nested submenus in other items
              $$(".dropdown__item--has-submenu", otherItem).forEach(
                (nestedItem) => {
                  nestedItem.classList.remove("is-open");
                }
              );
            }
          }
        );
      }

      // Close nested submenus when closing this submenu
      if (!isOpen) {
        $$(".dropdown__item--has-submenu", item).forEach((nestedItem) => {
          nestedItem.classList.remove("is-open");
        });
      }
    }
  }

  // Intentar inicializar el menú móvil
  let attempts = 0;
  const maxAttempts = 50; // 5 segundos máximo

  function tryInitMobileMenu() {
    if (initMobileMenu()) {
      // Menú móvil inicializado exitosamente
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(tryInitMobileMenu, 100);
    }
  }

  // Iniciar intentos
  tryInitMobileMenu();

  // Inicializar submenús globalmente
  initSubmenus();

  // Close menu when clicking on links (but not submenu toggles)
  $$("#menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // No cerrar si es un link de submenu que tiene hijos
      const hasSubmenu = link.closest(".dropdown__item--has-submenu");
      const isDropdownTrigger = link.classList.contains("dropdown__trigger");

      if (hasSubmenu || isDropdownTrigger) {
        return; // Dejar que handleSubmenuClick maneje esto
      }

      const menu = $("#menu");
      const toggle = $(".nav__toggle");
      if (menu && toggle) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  });

  // Close menu when clicking outside or pressing escape
  document.addEventListener("click", (e) => {
    const menu = $("#menu");
    const toggle = $(".nav__toggle");
    if (
      menu &&
      toggle &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    const menu = $("#menu");
    const toggle = $(".nav__toggle");
    if (
      e.key === "Escape" &&
      menu &&
      toggle &&
      menu.classList.contains("is-open")
    ) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  // Dropdown menu functionality
  const dropdowns = $$(".dropdown");

  dropdowns.forEach((dropdown) => {
    const dropdownTrigger = $(".dropdown__trigger", dropdown);
    const dropdownMenu = $(".dropdown__menu", dropdown);

    if (dropdownTrigger && dropdownMenu) {
      // Toggle dropdown on trigger click (for all screen sizes)
      dropdownTrigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = dropdown.classList.toggle("is-open");

        // Close other dropdowns at the same level
        $$(".dropdown").forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("is-open");
            // Close all nested submenus in other dropdowns
            $$(".dropdown__item--has-submenu", otherDropdown).forEach(
              (item) => {
                item.classList.remove("is-open");
              }
            );
          }
        });

        // Close all nested submenus when closing main dropdown
        if (!isOpen) {
          $$(".dropdown__item--has-submenu", dropdown).forEach((item) => {
            item.classList.remove("is-open");
          });
        }
      });

      // Prevent dropdown from closing when clicking inside
      dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      $$(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("is-open");
        // Close all nested submenus
        $$(".dropdown__item--has-submenu", dropdown).forEach((item) => {
          item.classList.remove("is-open");
        });
      });
    }
  });

  // Smooth scroll
  $$('.nav__links a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", href);
      }
    });
  });

  // Reveal on scroll
  const revealEls = $$(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => {
    io.observe(el);
  });

  // Modal functionality
  const modal = $("#modal");
  const modalTriggers = $$("[data-open-modal]");
  const modalClose = $(".modal__close");

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  });

  // Theme toggle functionality
  const themeToggle = $("[data-theme-toggle]");
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Update icon
      const icon = themeToggle.querySelector("i");
      if (icon) {
        icon.className =
          newTheme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
      }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      body.setAttribute("data-theme", savedTheme);
      const icon = themeToggle.querySelector("i");
      if (icon) {
        icon.className =
          savedTheme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
      }
    }
  }

  // Form submission handling
  const forms = $$("form");
  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const submitButton = form.querySelector("button[type='submit']");
      const originalText = submitButton ? submitButton.textContent : "";

      // Show loading state
      if (submitButton) {
        submitButton.textContent = "Enviando...";
        submitButton.disabled = true;
      }

      try {
        // Simulate API call (replace with actual endpoint)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Show success message
        showToast("Mensaje enviado correctamente", "success");
        form.reset();
      } catch (error) {
        // Show error message
        showToast("Error al enviar el mensaje", "error");
      } finally {
        // Restore button state
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      }
    });
  });

  // Toast notification system
  let toastTimeout;
  const showToast = (message, type = "info") => {
    // Remove existing toast
    const existingToast = $(".toast");
    if (existingToast) {
      existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    // Add styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "error" ? "#ef4444" : "#10b981"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(0)";
    }, 100);

    // Clear existing timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    // Auto remove
    toastTimeout = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  };
});
