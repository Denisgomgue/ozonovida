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

      // Inicializar funcionalidad de submenús móviles
      initMobileSubmenus();

      return true;
    } else {
      return false;
    }
  }

  // Función para inicializar submenús móviles
  function initMobileSubmenus() {
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
    if (window.innerWidth <= 1024) {
      e.preventDefault();
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
              }
            }
          );
        }
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

  // Close menu when clicking on links (but not submenu toggles)
  $$("#menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // No cerrar si es un link de submenu que tiene hijos
      const hasSubmenu = link.closest(".dropdown__item--has-submenu");
      if (hasSubmenu && window.innerWidth <= 1024) {
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
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  // Dropdown menu functionality
  const dropdown = $(".dropdown");
  const dropdownTrigger = $(".dropdown__trigger");
  const dropdownMenu = $(".dropdown__menu");

  if (dropdown && dropdownTrigger && dropdownMenu) {
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("is-open");
      }
    });

    // Toggle dropdown on trigger click (for mobile)
    dropdownTrigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 720) {
        e.preventDefault();
        dropdown.classList.toggle("is-open");

        // Close other dropdowns
        $$(".dropdown").forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("is-open");
          }
        });
      }
    });

    // Prevent dropdown from closing when clicking inside
    dropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Handle submenu functionality
    const submenuItems = $$(".dropdown__item--has-submenu");
    submenuItems.forEach((item) => {
      const submenu = $(".dropdown__submenu", item);
      const link = $(".dropdown__link", item);

      if (submenu && link) {
        // Prevent submenu from closing when clicking inside
        submenu.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        // Handle mobile submenu toggle
        link.addEventListener("click", (e) => {
          if (window.innerWidth <= 720) {
            e.preventDefault();
            const isOpen = item.classList.toggle("is-open");

            // Close other submenus at the same level
            const parentDropdown = item.closest(".dropdown");
            if (parentDropdown) {
              const siblings = parentDropdown.querySelectorAll(
                ".dropdown__item--has-submenu"
              );
              siblings.forEach((sibling) => {
                if (sibling !== item) {
                  sibling.classList.remove("is-open");
                }
              });
            }

            // Close nested submenus when closing parent
            if (!isOpen) {
              const nestedSubmenus = item.querySelectorAll(
                ".dropdown__item--has-submenu"
              );
              nestedSubmenus.forEach((nested) => {
                nested.classList.remove("is-open");
              });
            }
          }
        });
      }
    });

    // Funciones globales para manejar estados activos
    const activateParentChain = (targetItem) => {
      console.log("🔵 Activando elemento:", targetItem);
      // Activar el elemento actual
      targetItem.classList.add("active");

      // Activar todos los elementos padre en la cadena
      let parent = targetItem.closest(".dropdown__item--has-submenu");
      while (parent && parent !== targetItem) {
        console.log("🔵 Activando padre:", parent);
        parent.classList.add("active");
        parent = parent.closest(".dropdown__item--has-submenu");
      }
    };

    const deactivateParentChain = (targetItem) => {
      console.log("🔴 Desactivando elemento:", targetItem);
      // Solo desactivar si no hay submenús visibles en la cadena
      const hasVisibleSubmenus = targetItem.querySelector(
        ".dropdown__submenu[style*='opacity: 1'][style*='visibility: visible']"
      );
      if (!hasVisibleSubmenus) {
        targetItem.classList.remove("active");

        // Desactivar elementos padre solo si no tienen submenús visibles
        let parent = targetItem.closest(".dropdown__item--has-submenu");
        while (parent && parent !== targetItem) {
          const parentHasVisibleSubmenus = parent.querySelector(
            ".dropdown__submenu[style*='opacity: 1'][style*='visibility: visible']"
          );
          if (!parentHasVisibleSubmenus) {
            parent.classList.remove("active");
          }
          parent = parent.closest(".dropdown__item--has-submenu");
        }
      }
    };

    // Manejar estados activos para elementos padre cuando el submenú está visible
    submenuItems.forEach((item) => {
      const submenu = $(".dropdown__submenu", item);

      if (submenu) {
        // Agregar clase 'active' cuando el submenú está visible
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "style"
            ) {
              const isVisible =
                submenu.style.opacity === "1" &&
                submenu.style.visibility === "visible";
              if (isVisible) {
                activateParentChain(item);
              } else {
                deactivateParentChain(item);
              }
            }
          });
        });

        observer.observe(submenu, {
          attributes: true,
          attributeFilter: ["style"],
        });

        // También manejar con eventos de mouse para mayor compatibilidad
        item.addEventListener("mouseenter", () => {
          setTimeout(() => {
            const isVisible =
              submenu.style.opacity === "1" &&
              submenu.style.visibility === "visible";
            if (isVisible) {
              activateParentChain(item);
            }
          }, 50);
        });

        item.addEventListener("mouseleave", () => {
          setTimeout(() => {
            const isVisible =
              submenu.style.opacity === "1" &&
              submenu.style.visibility === "visible";
            if (!isVisible) {
              deactivateParentChain(item);
            }
          }, 50);
        });
      }
    });

    // Handle nested submenu functionality (submenus of submenus)
    const nestedSubmenuItems = $$(
      ".dropdown__submenu .dropdown__item--has-submenu"
    );
    nestedSubmenuItems.forEach((item) => {
      const submenu = $(".dropdown__submenu", item);
      const link = $(".dropdown__link", item);

      if (submenu && link) {
        // Prevent nested submenu from closing when clicking inside
        submenu.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        // Handle mobile nested submenu toggle
        link.addEventListener("click", (e) => {
          if (window.innerWidth <= 720) {
            e.preventDefault();
            const isOpen = item.classList.toggle("is-open");

            // Close other nested submenus at the same level
            const parentSubmenu = item.closest(".dropdown__submenu");
            if (parentSubmenu) {
              const siblings = parentSubmenu.querySelectorAll(
                ".dropdown__item--has-submenu"
              );
              siblings.forEach((sibling) => {
                if (sibling !== item) {
                  sibling.classList.remove("is-open");
                }
              });
            }
          }
        });
      }
    });

    // Manejar estados activos para submenús anidados cuando están visibles
    nestedSubmenuItems.forEach((item) => {
      const submenu = $(".dropdown__submenu", item);

      if (submenu) {
        // Agregar clase 'active' cuando el submenú anidado está visible
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "style"
            ) {
              const isVisible =
                submenu.style.opacity === "1" &&
                submenu.style.visibility === "visible";
              if (isVisible) {
                activateParentChain(item);
              } else {
                deactivateParentChain(item);
              }
            }
          });
        });

        observer.observe(submenu, {
          attributes: true,
          attributeFilter: ["style"],
        });

        // También manejar con eventos de mouse para mayor compatibilidad
        item.addEventListener("mouseenter", () => {
          setTimeout(() => {
            const isVisible =
              submenu.style.opacity === "1" &&
              submenu.style.visibility === "visible";
            if (isVisible) {
              activateParentChain(item);
            }
          }, 50);
        });

        item.addEventListener("mouseleave", () => {
          setTimeout(() => {
            const isVisible =
              submenu.style.opacity === "1" &&
              submenu.style.visibility === "visible";
            if (!isVisible) {
              deactivateParentChain(item);
            }
          }, 50);
        });
      }
    });

    // Add click handlers for all dropdown links
    $$(".dropdown__link").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 720) {
          const parentItem = link.closest(".dropdown__item--has-submenu");
          if (parentItem) {
            e.preventDefault();
            const isOpen = parentItem.classList.toggle("is-open");

            // Close other submenus at the same level
            const parentDropdown = parentItem.closest(".dropdown");
            if (parentDropdown) {
              const siblings = parentDropdown.querySelectorAll(
                ".dropdown__item--has-submenu"
              );
              siblings.forEach((sibling) => {
                if (sibling !== parentItem) {
                  sibling.classList.remove("is-open");
                }
              });
            }

            // Close nested submenus when closing parent
            if (!isOpen) {
              const nestedSubmenus = parentItem.querySelectorAll(
                ".dropdown__item--has-submenu"
              );
              nestedSubmenus.forEach((nested) => {
                nested.classList.remove("is-open");
              });
            }
          }
        }
      });
    });
  }

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
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18 }
  );
  revealEls.forEach((el) => io.observe(el));

  // Stats counter
  const statEls = $$(".stat__num");
  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-count") || "0");
    const duration = 1200;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const value = Math.floor(p * target);
      el.textContent = String(value);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const ioStats = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          ioStats.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.6 }
  );
  statEls.forEach((el) => ioStats.observe(el));

  // Carousel
  const track = $(".carousel__track");
  const btnPrev = $(".carousel__btn.prev");
  const btnNext = $(".carousel__btn.next");
  if (track && btnPrev && btnNext) {
    let index = 0;
    const total = $$(".testimonial", track).length;
    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };
    const next = () => {
      index = (index + 1) % total;
      update();
    };
    const prev = () => {
      index = (index - 1 + total) % total;
      update();
    };
    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);
    let timer = setInterval(next, 5000);
    track.addEventListener("pointerenter", () => clearInterval(timer));
    track.addEventListener(
      "pointerleave",
      () => (timer = setInterval(next, 5000))
    );
  }

  // Modal booking
  const modal = $("#citas");
  const openBtns = $$("[data-open-modal]");
  const closeBtns = $$("[data-close-modal]");
  const openModal = () => {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    document.body.style.overflow = "hidden";
    const firstInput = $("#nombre");
    if (firstInput) firstInput.focus();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-modal", "false");
    document.body.style.overflow = "";
  };
  openBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    })
  );
  closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));
  modal?.addEventListener("click", (e) => {
    if (e.target?.closest(".modal__dialog")) return;
    closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Booking form
  const form = $("#booking-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const missing = Object.entries(data).filter(([k, v]) => !String(v).trim());
    if (missing.length) {
      toast("Por favor completa todos los campos", "error");
      return;
    }
    // Simulate sending; here you can integrate with backend or WhatsApp
    const msg = `Nueva reserva%0A%0ANombre: ${encodeURIComponent(
      data.nombre
    )}%0ATeléfono: ${encodeURIComponent(
      data.telefono
    )}%0AServicio: ${encodeURIComponent(
      data.servicio
    )}%0AFecha: ${encodeURIComponent(data.fecha)}`;
    const wa = `https://wa.me/51999999999?text=${msg}`;
    window.open(wa, "_blank");
    closeModal();
    form.reset();
    toast("Solicitud enviada por WhatsApp");
  });

  // To top button
  const toTop = $("#to-top");
  const onScroll = () => {
    const show = window.scrollY > 600;
    toTop?.classList.toggle("is-visible", show);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  toTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  onScroll();

  // Theme toggle functionality
  const themeToggle = $("#theme-toggle");
  const themeIcon = $("#theme-icon");
  const html = document.documentElement;

  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);

  if (themeToggle && themeIcon) {
    // Update icon based on current theme
    const updateIcon = () => {
      const currentTheme = html.getAttribute("data-theme");
      if (currentTheme === "light") {
        themeIcon.className = "fa-solid fa-moon";
      } else {
        themeIcon.className = "fa-solid fa-sun";
      }
    };

    updateIcon();

    themeToggle.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateIcon();
    });
  }

  // Header scroll effect
  const header = $(".header");
  const headerInner = $(".header__inner");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header?.classList.add("header--scrolled");
      if (headerInner) {
        headerInner.style.padding = "0.4rem 0";
      }
    } else {
      header?.classList.remove("header--scrolled");
      if (headerInner) {
        headerInner.style.padding = "0.8rem 0";
      }
    }

    lastScrollY = currentScrollY;
  });

  // Smart social media links - usando SOCIAL_CONFIG
  const socialLinks = $$(".social-link");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Usar SOCIAL_CONFIG si está disponible, sino usar fallback
  let whatsappMessages = {};
  if (typeof SOCIAL_CONFIG !== "undefined" && SOCIAL_CONFIG.whatsappMessages) {
    whatsappMessages = SOCIAL_CONFIG.whatsappMessages;
  } else {
    // Fallback si SOCIAL_CONFIG no está disponible
    whatsappMessages = {
      "index.html":
        "Hola, me interesa conocer más sobre los servicios de OZONO VIDA",
      "tratamiento-dolor.html":
        "Hola, me interesa información sobre tratamientos de dolor en OZONO VIDA",
      "tratamiento-enfermedades.html":
        "Hola, me interesa información sobre tratamientos de enfermedades en OZONO VIDA",
      "estetica.html":
        "Hola, me interesa información sobre tratamientos estéticos en OZONO VIDA",
      "infecciones.html":
        "Hola, me interesa información sobre tratamientos de infecciones en OZONO VIDA",
      "ginecologia.html":
        "Hola, me interesa información sobre servicios ginecológicos en OZONO VIDA",
      "diabetes.html":
        "Hola, me interesa información sobre tratamiento de diabetes en OZONO VIDA",
      "hernias-discales.html":
        "Hola, me interesa información sobre tratamiento de hernias discales en OZONO VIDA",
      "rejuvenecimiento-facial.html":
        "Hola, me interesa información sobre rejuvenecimiento facial en OZONO VIDA",
      "lumbalgia.html":
        "Hola, me interesa información sobre tratamiento de lumbalgia en OZONO VIDA",
      "artrosis.html":
        "Hola, me interesa información sobre tratamiento de artrosis en OZONO VIDA",
      "artritis.html":
        "Hola, me interesa información sobre tratamiento de artritis en OZONO VIDA",
      "tendinitis.html":
        "Hola, me interesa información sobre tratamiento de tendinitis en OZONO VIDA",
      "fibromialgia.html":
        "Hola, me interesa información sobre tratamiento de fibromialgia en OZONO VIDA",
    };
  }

  // Update WhatsApp link with smart message
  const whatsappLink = $('.social-link[data-social="whatsapp"]');
  if (whatsappLink) {
    const message =
      whatsappMessages[currentPage] || whatsappMessages["index.html"];
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber =
      typeof SOCIAL_CONFIG !== "undefined" && SOCIAL_CONFIG.whatsappNumber
        ? SOCIAL_CONFIG.whatsappNumber
        : "51999999999"; // Fallback
    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  }

  // Add click tracking for analytics (optional)
  socialLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const platform = link.getAttribute("data-social");
      console.log(`Social media click: ${platform} from ${currentPage}`);
      // Here you can add analytics tracking if needed
    });
  });

  // Cargar redes sociales dinámicamente en el footer
  const loadSocialLinks = () => {
    const socialContainer = $("#social-links-container");
    if (socialContainer && typeof generateSocialHTML === "function") {
      socialContainer.innerHTML = generateSocialHTML();
      console.log("Social links loaded dynamically");

      // Re-aplicar event listeners a los nuevos enlaces
      const newSocialLinks = $$(".social-link");
      newSocialLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const platform = link.getAttribute("data-social");
          console.log(`Social media click: ${platform} from ${currentPage}`);
          // Here you can add analytics tracking if needed
        });
      });
    }
  };

  // Cargar redes sociales cuando esté disponible
  if (typeof generateSocialHTML === "function") {
    loadSocialLinks();
  } else {
    // Si no está disponible, esperar un poco y reintentar
    setTimeout(() => {
      if (typeof generateSocialHTML === "function") {
        loadSocialLinks();
      }
    }, 100);
  }

  // Reemplazar TODOS los enlaces hardcodeados usando el sistema centralizado
  if (typeof replaceAllSocialLinks === "function") {
    // Ejecutar inmediatamente
    replaceAllSocialLinks();

    // También ejecutar después de que se carguen los componentes
    setTimeout(() => {
      replaceAllSocialLinks();
    }, 500);
  }

  // Actualizar formulario de reserva con sistema centralizado
  if (typeof updateBookingForm === "function") {
    updateBookingForm();
  }

  // Simple Image Rotation
  function initImageRotation() {
    const mainImageContainer = $("#main-image-container");
    const mainImage = mainImageContainer?.querySelector("img");
    const mainOverlay = mainImageContainer?.querySelector(
      ".main-image-overlay span"
    );

    if (!mainImageContainer || !mainImage || !mainOverlay) return;

    let currentIndex = 0;
    let rotationInterval;

    // Array de imágenes disponibles para rotación (10 imágenes)
    const imagePool = [
      {
        url: "./assets/images/image1.png",
        title: "Ozonoterapia",
      },
      {
        url: "./assets/images/image2.png",
        title: "Plasma PRP",
      },
      {
        url: "./assets/images/image3.png",
        title: "Medicina Regenerativa",
      },
      {
        url: "./assets/images/image4.png",
        title: "Dolor de Columna",
      },
      {
        url: "./assets/images/image5.png",
        title: "Tratamiento de Rodilla",
      },
      {
        url: "./assets/images/image6.png",
        title: "Inyección Terapéutica",
      },
      {
        url: "./assets/images/image7.png",
        title: "Tratamiento de Espalda",
      },
      {
        url: "./assets/images/image8.png",
        title: "Aplicación de Gel",
      },
      {
        url: "./assets/images/image9.png",
        title: "Laboratorio Médico",
      },
      {
        url: "./assets/images/image10.png",
        title: "Tratamiento de Pie",
      },
    ];

    // Función para cambiar la imagen principal con desvanecimiento
    function changeMainImage(imageUrl, title) {
      if (!mainImage || !mainOverlay) return;

      // Crear efecto de transición más suave
      mainImageContainer.classList.add("transitioning");

      setTimeout(() => {
        mainImage.src = imageUrl;
        mainOverlay.textContent = title;
        mainImageContainer.classList.remove("transitioning");
        mainImageContainer.classList.add("active");

        // Remover la clase active después de un tiempo
        setTimeout(() => {
          mainImageContainer.classList.remove("active");
        }, 2000);
      }, 400);
    }

    // Función para obtener la siguiente imagen en la rotación
    function getNextImage() {
      currentMainImageIndex = (currentMainImageIndex + 1) % imagePool.length;
      return imagePool[currentMainImageIndex];
    }

    // Función para activar una ventana específica
    function activateWindow(index) {
      popupWindows.forEach((window, i) => {
        window.classList.toggle("active", i === index);

        // Si esta ventana se activa, cambiar la imagen principal
        if (i === index) {
          const imageUrl = window.dataset.image;
          const title = window.dataset.title;
          if (imageUrl && title) {
            changeMainImage(imageUrl, title);
          }
        }
      });
    }

    // Función para iniciar la animación continua con rotación circular
    function startContinuousAnimation() {
      if (isAnimating) return;
      isAnimating = true;

      // Activar todas las ventanas inmediatamente
      popupWindows.forEach((window) => {
        window.classList.add("active");
      });

      // Array para rastrear qué imagen está en cada popup
      const popupImages = [0, 1, 2, 3]; // Índices de las imágenes en cada popup
      let currentMainImage = 4; // Empezar con la imagen 4 para la principal

      // Función para actualizar las imágenes de los popups
      function updatePopupImages() {
        popupWindows.forEach((window, index) => {
          const imageIndex = popupImages[index];
          const imageData = imagePool[imageIndex];
          const img = window.querySelector("img");
          if (img && imageData) {
            img.src = imageData.url;
            img.alt = imageData.title;
          }
        });
      }

      // Función para rotar las imágenes en los popups (ascendente: Popup4 → Principal)
      function rotateImages() {
        if (!isAnimating) return;

        // Destacar el popup que va a pasar a la imagen principal (Popup4)
        const lastPopup = popupWindows[3]; // Popup4 (índice 3)
        lastPopup.style.opacity = "1";
        lastPopup.style.transform = "scale(1.05)";

        setTimeout(() => {
          // Mover la imagen del último popup a la imagen principal
          const imageToMain = popupImages[3]; // Imagen del Popup4
          const imageData = imagePool[imageToMain];

          // Cambiar imagen principal
          changeMainImage(imageData.url, imageData.title);

          // Rotar las imágenes en los popups (desplazar hacia la derecha)
          for (let i = popupImages.length - 1; i > 0; i--) {
            popupImages[i] = popupImages[i - 1];
          }

          // La primera posición recibe la siguiente imagen del pool
          currentMainImage = (currentMainImage + 1) % imagePool.length;
          popupImages[0] = currentMainImage;

          // Actualizar las imágenes visuales
          updatePopupImages();

          // Restaurar el estilo del último popup
          lastPopup.style.opacity = "0.7";
          lastPopup.style.transform = "scale(1)";

          // Programar la siguiente rotación
          setTimeout(() => {
            rotateImages();
          }, 2000); // Cada 2 segundos
        }, 500);
      }

      // Inicializar las imágenes en los popups
      updatePopupImages();

      // Iniciar la rotación
      setTimeout(() => {
        rotateImages();
      }, 1000);
    }

    // Función para animación aleatoria
    function startRandomAnimation() {
      if (isAnimating) return;
      isAnimating = true;

      const randomIndex = Math.floor(Math.random() * popupWindows.length);
      const window = popupWindows[randomIndex];

      window.classList.add("active");

      // Cambiar imagen principal
      const imageUrl = window.dataset.image;
      const title = window.dataset.title;
      if (imageUrl && title) {
        changeMainImage(imageUrl, title);
      }

      setTimeout(() => {
        window.classList.remove("active");
        isAnimating = false;

        // Continuar con la siguiente animación aleatoria
        setTimeout(() => {
          startRandomAnimation();
        }, Math.random() * 2000 + 1000); // Entre 1-3 segundos
      }, 2000);
    }

    // Función para animación en cascada
    function startCascadeAnimation() {
      if (isAnimating) return;
      isAnimating = true;

      // Activar ventanas en grupos de 2-3
      const groups = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7],
        [8, 9],
      ];

      let groupIndex = 0;

      function activateGroup() {
        if (groupIndex >= groups.length) {
          isAnimating = false;
          setTimeout(() => {
            startCascadeAnimation();
          }, 3000);
          return;
        }

        const currentGroup = groups[groupIndex];
        currentGroup.forEach((index) => {
          if (popupWindows[index]) {
            popupWindows[index].classList.add("active");

            // Cambiar imagen principal con la primera ventana del grupo
            if (index === currentGroup[0]) {
              const imageUrl = popupWindows[index].dataset.image;
              const title = popupWindows[index].dataset.title;
              if (imageUrl && title) {
                changeMainImage(imageUrl, title);
              }
            }
          }
        });

        setTimeout(() => {
          currentGroup.forEach((index) => {
            if (popupWindows[index]) {
              popupWindows[index].classList.remove("active");
            }
          });
          groupIndex++;
          setTimeout(activateGroup, 500);
        }, 2000);
      }

      activateGroup();
    }

    // Detectar cuando el elemento está visible en el viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Iniciar animación continua cuando sea visible
            setTimeout(() => {
              startContinuousAnimation();
            }, 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    const container = $(".popup-windows-container");
    if (container) {
      observer.observe(container);
    }

    // Pausar animación cuando no está visible
    const pauseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Pausar animaciones
            popupWindows.forEach((window) => {
              window.classList.remove("active");
            });
            isAnimating = false;
          }
        });
      },
      { threshold: 0 }
    );

    if (container) {
      pauseObserver.observe(container);
    }

    // Agregar interactividad con hover
    popupWindows.forEach((window) => {
      window.addEventListener("mouseenter", () => {
        if (!window.classList.contains("active")) {
          window.classList.add("active");

          // Cambiar imagen principal al hacer hover
          const imageUrl = window.dataset.image;
          const title = window.dataset.title;
          if (imageUrl && title) {
            changeMainImage(imageUrl, title);
          }
        }
      });

      window.addEventListener("mouseleave", () => {
        // Solo remover si no está en el ciclo de animación
        setTimeout(() => {
          if (!isAnimating) {
            window.classList.remove("active");
          }
        }, 100);
      });
    });

    return true;
  }

  // Simple Image Rotation - Sin indicador de carga
  function initImageRotationNew() {
    const mainImageContainer = $("#main-image-container");
    const mainImage = mainImageContainer?.querySelector("img");
    const mainOverlay = mainImageContainer?.querySelector(
      ".main-image-overlay span"
    );

    if (!mainImageContainer || !mainImage || !mainOverlay) return;

    let currentIndex = 0;
    let rotationInterval;
    const ROTATION_TIME = 2000; // 2 segundos exactos

    // Array de imágenes disponibles para rotación (10 imágenes)
    const imagePool = [
      {
        url: "./assets/images/image1.png",
        title: "Ozonoterapia",
      },
      {
        url: "./assets/images/image2.png",
        title: "Plasma PRP",
      },
      {
        url: "./assets/images/image3.png",
        title: "Medicina Regenerativa",
      },
      {
        url: "./assets/images/image4.png",
        title: "Dolor de Columna",
      },
      {
        url: "./assets/images/image5.png",
        title: "Tratamiento de Rodilla",
      },
      {
        url: "./assets/images/image6.png",
        title: "Inyección Terapéutica",
      },
      {
        url: "./assets/images/image7.png",
        title: "Tratamiento de Espalda",
      },
      {
        url: "./assets/images/image8.png",
        title: "Aplicación de Gel",
      },
      {
        url: "./assets/images/image9.png",
        title: "Laboratorio Médico",
      },
      {
        url: "./assets/images/image10.png",
        title: "Tratamiento de Pie",
      },
    ];

    // Función para cambiar la imagen con transición suave y efecto blur
    function changeImage(imageUrl, title) {
      if (!mainImage || !mainOverlay) return;

      // Crear efecto de transición con blur
      mainImageContainer.classList.add("transitioning");
      mainImage.style.filter = "blur(3px)";
      mainImage.style.opacity = "0.7";

      setTimeout(() => {
        mainImage.src = imageUrl;
        mainOverlay.textContent = title;

        // Remover blur y restaurar opacidad
        setTimeout(() => {
          mainImage.style.filter = "blur(0px)";
          mainImage.style.opacity = "1";
          mainImageContainer.classList.remove("transitioning");
        }, 100);
      }, 300);
    }

    // Función para iniciar la rotación automática
    function startRotation() {
      // Limpiar cualquier intervalo anterior
      if (rotationInterval) {
        clearInterval(rotationInterval);
      }

      rotationInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % imagePool.length;
        const currentImage = imagePool[currentIndex];
        changeImage(currentImage.url, currentImage.title);
      }, ROTATION_TIME);
    }

    // Función para detener la rotación
    function stopRotation() {
      if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
      }
    }

    // Iniciar la rotación automática
    startRotation();

    // Pausar rotación cuando la imagen no está visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startRotation();
          } else {
            stopRotation();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(mainImageContainer);

    return true;
  }

  // Inicializar rotación de imagen
  initImageRotationNew();

  // FAQ functionality
  function initFAQ() {
    const faqQuestions = $$(".faq-question");

    faqQuestions.forEach((button) => {
      button.addEventListener("click", () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains("active");

        // Close all FAQ items
        $$(".faq-item").forEach((item) => {
          item.classList.remove("active");
          const question = item.querySelector(".faq-question");
          if (question) {
            question.setAttribute("aria-expanded", "false");
          }
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          faqItem.classList.add("active");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // Initialize FAQ if present
  initFAQ();

  // Tiny toast
  let toastTimeout;
  const toast = (text, type = "success") => {
    clearTimeout(toastTimeout);
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.style.position = "fixed";
      el.style.right = "1rem";
      el.style.bottom = "1rem";
      el.style.padding = ".7rem 1rem";
      el.style.borderRadius = ".6rem";
      el.style.border = "1px solid var(--border)";
      el.style.background = "rgba(11,18,32,.92)";
      el.style.color = "var(--text)";
      el.style.boxShadow = "var(--shadow)";
      el.style.zIndex = "100";
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.style.background =
      type === "error" ? "rgba(239, 68, 68, .2)" : "rgba(11,18,32,.92)";
    el.style.borderColor =
      type === "error" ? "rgba(239, 68, 68, .5)" : "var(--border)";
    el.style.opacity = "1";
    toastTimeout = setTimeout(() => {
      el.style.opacity = "0";
    }, 2400);
  };
});
