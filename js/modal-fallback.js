// Modal Fallback - Carga directa del modal si el OptimizedComponentLoader falla
(function () {
  "use strict";

  console.log("🔄 MODAL FALLBACK INITIALIZING...");

  // Función para cargar el modal directamente
  async function loadModalDirectly() {
    console.log("🔧 Loading modal directly via fallback...");

    try {
      // Determinar la ruta base
      const basePath = window.location.pathname.includes("/servicios/")
        ? "../"
        : "";

      const response = await fetch(
        `${basePath}components/modal-reservas-unified.html`,
        {
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const modalContent = await response.text();

      // Insertar el modal
      document.body.insertAdjacentHTML("beforeend", modalContent);

      console.log("✅ MODAL LOADED VIA FALLBACK");

      // Configurar el modal para la página actual
      if (typeof configureModalForPage === "function") {
        configureModalForPage();
      }

      // Reinicializar botones
      if (typeof window.initModalButtons === "function") {
        window.initModalButtons();
      }

      return true;
    } catch (error) {
      console.error("❌ Error loading modal via fallback:", error);
      return false;
    }
  }

  // Función para verificar si el modal existe
  function modalExists() {
    return document.getElementById("citas") !== null;
  }

  // Función para configurar listeners de cierre del modal
  function setupModalCloseListeners(modal) {
    console.log("🔧 Setting up modal close listeners...");

    // Función para cerrar el modal
    function closeModal() {
      console.log("🔒 Closing modal...");
      modal.setAttribute("aria-hidden", "true");
      modal.setAttribute("aria-modal", "false");
      document.body.style.overflow = "";
    }

    // Cerrar con botón X
    const closeBtn = modal.querySelector("[data-close-modal]");
    if (closeBtn) {
      console.log("✅ Close button found, adding listener...");

      // Remover todos los listeners anteriores
      closeBtn.replaceWith(closeBtn.cloneNode(true));
      const newCloseBtn = modal.querySelector("[data-close-modal]");

      // Agregar listener simple y directo
      newCloseBtn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("🔒 Close button clicked!");
        closeModal();
      };

      console.log("✅ Close button listener added successfully");
    } else {
      console.log("❌ Close button not found");
    }

    // Cerrar con backdrop
    const backdrop = modal.querySelector(".modal__backdrop");
    if (backdrop) {
      backdrop.addEventListener("click", closeModal);
    }

    // Cerrar con ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        closeModal();
      }
    });

    // Cerrar haciendo clic fuera del modal
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Función para inicializar botones de modal
  function initModalButtonsFallback() {
    console.log("🔧 Initializing modal buttons via fallback...");

    const modalButtons = document.querySelectorAll("[data-open-modal]");
    console.log(`Found ${modalButtons.length} modal buttons`);

    modalButtons.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("🔘 Modal button clicked via fallback:", e.target);

        let modal = document.getElementById("citas");

        if (!modal) {
          console.log("🔧 Modal not found, loading via fallback...");
          const loaded = await loadModalDirectly();

          if (loaded) {
            modal = document.getElementById("citas");
          }
        }

        if (modal) {
          console.log("✅ Opening modal via fallback");
          modal.setAttribute("aria-hidden", "false");
          modal.setAttribute("aria-modal", "true");
          document.body.style.overflow = "hidden";

          // Focus en el primer input
          const firstInput = modal.querySelector("#nombre");
          if (firstInput) firstInput.focus();

          // Agregar event listeners para cerrar el modal
          setupModalCloseListeners(modal);
        } else {
          console.log("❌ Modal still not found, redirecting...");
          const href = e.target.getAttribute("href");
          if (href && href.includes("#citas")) {
            window.location.href = href;
          } else {
            window.location.href = "index.html#citas";
          }
        }
      });
    });
  }

  // Función principal
  function initializeModalFallback() {
    console.log("🚀 INITIALIZING MODAL FALLBACK...");

    // Esperar un poco para que otros scripts se ejecuten
    setTimeout(() => {
      if (!modalExists()) {
        console.log("🔧 Modal not found, attempting fallback load...");
        loadModalDirectly();
      }

      // Siempre inicializar botones
      initModalButtonsFallback();
    }, 1000);
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeModalFallback);
  } else {
    initializeModalFallback();
  }

  // Exportar para uso global
  window.loadModalDirectly = loadModalDirectly;
  window.initModalButtonsFallback = initModalButtonsFallback;
  window.setupModalCloseListeners = setupModalCloseListeners;
})();
