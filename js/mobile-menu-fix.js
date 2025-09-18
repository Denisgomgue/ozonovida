// Fix para submenús móviles - OZONO VIDA
document.addEventListener("DOMContentLoaded", () => {
  console.log("🔧 Inicializando fix de submenús móviles...");

  // Funciones de utilidad
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Inicializar dropdowns principales móviles
  function initMobileDropdowns() {
    const dropdowns = $$(".dropdown");

    console.log(`📱 Encontrados ${dropdowns.length} dropdowns principales`);

    dropdowns.forEach((dropdown) => {
      const trigger = $(".dropdown__trigger", dropdown);

      if (trigger) {
        // Remover listeners anteriores
        const existingHandler = trigger._mobileDropdownHandler;
        if (existingHandler) {
          trigger.removeEventListener("click", existingHandler);
        }

        const newHandler = function (e) {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = dropdown.classList.toggle("is-open");
            console.log(
              `📂 Dropdown principal ${
                isOpen ? "abierto" : "cerrado"
              }: ${trigger.textContent.trim()}`
            );

            // Cerrar otros dropdowns principales
            $$(".dropdown").forEach((otherDropdown) => {
              if (
                otherDropdown !== dropdown &&
                otherDropdown.classList.contains("is-open")
              ) {
                otherDropdown.classList.remove("is-open");
                console.log(
                  `📁 Cerrado dropdown hermano: ${otherDropdown
                    .querySelector(".dropdown__trigger")
                    ?.textContent.trim()}`
                );
              }
            });
          }
        };

        trigger._mobileDropdownHandler = newHandler;
        trigger.addEventListener("click", newHandler);

        console.log(
          `✅ Handler de dropdown agregado a: ${trigger.textContent.trim()}`
        );
      }
    });
  }

  // Inicializar submenús móviles
  function initMobileSubmenus() {
    const submenuItems = $$(".dropdown__item--has-submenu");

    console.log(`📱 Encontrados ${submenuItems.length} items con submenú`);

    submenuItems.forEach((item, index) => {
      const link = $(".dropdown__link", item);

      if (link) {
        // Remover listeners anteriores para evitar duplicados
        const existingHandler = link._mobileSubmenuHandler;
        if (existingHandler) {
          link.removeEventListener("click", existingHandler);
        }

        // Crear nuevo handler
        const newHandler = function (e) {
          console.log(`🖱️ Click en submenu: ${link.textContent.trim()}`);

          if (window.innerWidth <= 1024) {
            e.preventDefault();
            e.stopPropagation();

            const item = e.currentTarget.closest(
              ".dropdown__item--has-submenu"
            );
            if (item) {
              const wasOpen = item.classList.contains("is-open");
              const isOpen = item.classList.toggle("is-open");

              console.log(
                `📂 Submenu ${
                  isOpen ? "abierto" : "cerrado"
                }: ${link.textContent.trim()}`
              );

              // Cerrar otros submenús del mismo nivel
              const parentDropdown = item.closest(
                ".dropdown__menu, .dropdown__submenu"
              );
              if (parentDropdown) {
                // Solo obtener hijos directos del mismo nivel
                const directChildren = Array.from(
                  parentDropdown.children
                ).filter(
                  (child) =>
                    child.classList.contains("dropdown__item") &&
                    child.classList.contains("dropdown__item--has-submenu")
                );

                directChildren.forEach((otherItem) => {
                  if (
                    otherItem !== item &&
                    otherItem.classList.contains("is-open")
                  ) {
                    otherItem.classList.remove("is-open");
                    // También cerrar todos los submenús anidados
                    const nestedSubmenus = otherItem.querySelectorAll(
                      ".dropdown__item--has-submenu.is-open"
                    );
                    nestedSubmenus.forEach((nested) => {
                      nested.classList.remove("is-open");
                      const nestedIcon = nested.querySelector(".submenu-icon");
                      if (nestedIcon) {
                        nestedIcon.style.transform = "rotate(0deg)";
                      }
                    });

                    console.log(
                      `📁 Cerrado submenu hermano: ${otherItem
                        .querySelector(".dropdown__link")
                        ?.textContent.trim()}`
                    );
                  }
                });
              }

              // Animar el icono
              const icon = $(".submenu-icon", link);
              if (icon) {
                icon.style.transform = isOpen
                  ? "rotate(45deg)"
                  : "rotate(0deg)";
              }
            }
          }
        };

        // Guardar referencia del handler y agregarlo
        link._mobileSubmenuHandler = newHandler;
        link.addEventListener("click", newHandler);

        console.log(`✅ Handler agregado a: ${link.textContent.trim()}`);
      }
    });
  }

  // Inicializar cuando el DOM esté listo
  function tryInitSubmenus() {
    const dropdowns = $$(".dropdown");
    const submenuItems = $$(".dropdown__item--has-submenu");

    if (dropdowns.length > 0 || submenuItems.length > 0) {
      initMobileDropdowns();
      initMobileSubmenus();
      console.log(
        "✅ Dropdowns y submenús móviles inicializados correctamente"
      );
    } else {
      console.log("⏳ Esperando que se carguen los menús...");
      setTimeout(tryInitSubmenus, 500);
    }
  }

  // Inicializar
  tryInitSubmenus();

  // Re-inicializar si se carga contenido dinámico
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const hasNewSubmenus = Array.from(mutation.addedNodes).some(
          (node) =>
            node.nodeType === 1 &&
            (node.classList?.contains("dropdown__item--has-submenu") ||
              node.querySelector?.(".dropdown__item--has-submenu"))
        );

        if (hasNewSubmenus) {
          console.log(
            "🔄 Detectado nuevo contenido, re-inicializando menús..."
          );
          setTimeout(() => {
            initMobileDropdowns();
            initMobileSubmenus();
          }, 100);
        }
      }
    });
  });

  // Observar cambios en el menú
  const menu = $("#menu");
  if (menu) {
    observer.observe(menu, { childList: true, subtree: true });
  }

  console.log("🎯 Fix de submenús móviles cargado");
});
