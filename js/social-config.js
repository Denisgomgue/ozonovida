// Configuración de Redes Sociales para OZONO VIDA
// Actualiza estos datos con tus enlaces reales

const SOCIAL_CONFIG = {
  // Tu número de WhatsApp (formato internacional sin +)
  whatsappNumber: "51988126804", // Cambia por tu número real

  // Tus perfiles de redes sociales
  facebook: "https://www.facebook.com/profile.php?id=61577680236101", // Tu perfil real
  instagram: "https://instagram.com/stella_maris_medical", // Cambia por tu perfil real
  tiktok: "https://tiktok.com/@stella_maris_medical", // Cambia por tu perfil real

  // Mensajes predefinidos para WhatsApp según la página
  whatsappMessages: {
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
  },
};

// Función para generar el HTML de redes sociales
function generateSocialHTML() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const message =
    SOCIAL_CONFIG.whatsappMessages[currentPage] ||
    SOCIAL_CONFIG.whatsappMessages["index.html"];
  const encodedMessage = encodeURIComponent(message);

  return `
    <div class="socials">
      <a aria-label="WhatsApp" target="_blank" rel="noopener" href="https://wa.me/${SOCIAL_CONFIG.whatsappNumber}?text=${encodedMessage}" class="social-link" data-social="whatsapp">
        <i class="fa-brands fa-whatsapp"></i>
      </a>
      <a aria-label="Facebook" target="_blank" rel="noopener" href="${SOCIAL_CONFIG.facebook}" class="social-link" data-social="facebook">
        <i class="fa-brands fa-facebook"></i>
      </a>
      <a aria-label="Instagram" target="_blank" rel="noopener" href="${SOCIAL_CONFIG.instagram}" class="social-link" data-social="instagram">
        <i class="fa-brands fa-instagram"></i>
      </a>
      <a aria-label="TikTok" target="_blank" rel="noopener" href="${SOCIAL_CONFIG.tiktok}" class="social-link" data-social="tiktok">
        <i class="fa-brands fa-tiktok"></i>
      </a>
    </div>
  `;
}

// Función para generar enlace de WhatsApp con mensaje específico
function generateWhatsAppLink(message = null) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const defaultMessage =
    SOCIAL_CONFIG.whatsappMessages[currentPage] ||
    SOCIAL_CONFIG.whatsappMessages["index.html"];
  const finalMessage = message || defaultMessage;
  const encodedMessage = encodeURIComponent(finalMessage);

  return `https://wa.me/${SOCIAL_CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

// Función para reemplazar TODOS los enlaces hardcodeados en la página
function replaceAllSocialLinks() {
  console.log("Iniciando reemplazo de enlaces de redes sociales...");

  // Reemplazar placeholders de WhatsApp
  const whatsappPlaceholders = document.querySelectorAll(
    "[data-whatsapp-link]"
  );
  whatsappPlaceholders.forEach((element) => {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const message =
      SOCIAL_CONFIG.whatsappMessages[currentPage] ||
      SOCIAL_CONFIG.whatsappMessages["index.html"];
    element.href = generateWhatsAppLink(message);
    element.removeAttribute("data-whatsapp-link");
    console.log(`WhatsApp placeholder updated for page: ${currentPage}`);
  });

  // Reemplazar placeholders de TikTok
  const tiktokPlaceholders = document.querySelectorAll("[data-tiktok-link]");
  tiktokPlaceholders.forEach((element) => {
    element.href = SOCIAL_CONFIG.tiktok;
    element.removeAttribute("data-tiktok-link");
    console.log("TikTok placeholder updated");
  });

  // Reemplazar placeholders de redes sociales vacías
  const socialPlaceholders = document.querySelectorAll(
    "[data-social-placeholder]"
  );
  socialPlaceholders.forEach((element) => {
    const ariaLabel = element.getAttribute("aria-label");
    if (ariaLabel === "Facebook") {
      element.href = SOCIAL_CONFIG.facebook;
    } else if (ariaLabel === "Instagram") {
      element.href = SOCIAL_CONFIG.instagram;
    } else if (ariaLabel === "TikTok") {
      element.href = SOCIAL_CONFIG.tiktok;
    }
    element.removeAttribute("data-social-placeholder");
    console.log(`Social placeholder updated: ${ariaLabel}`);
  });

  // Reemplazar botones de WhatsApp (método original)
  const whatsappButtons = document.querySelectorAll(".btn--whatsapp");
  whatsappButtons.forEach((button) => {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const message =
      SOCIAL_CONFIG.whatsappMessages[currentPage] ||
      SOCIAL_CONFIG.whatsappMessages["index.html"];
    button.href = generateWhatsAppLink(message);
    console.log(`WhatsApp button updated for page: ${currentPage}`);
  });

  // Reemplazar enlaces de redes sociales en footer
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    const platform = link.getAttribute("data-social");
    if (platform === "whatsapp") {
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
      const message =
        SOCIAL_CONFIG.whatsappMessages[currentPage] ||
        SOCIAL_CONFIG.whatsappMessages["index.html"];
      link.href = generateWhatsAppLink(message);
    } else if (platform === "facebook") {
      link.href = SOCIAL_CONFIG.facebook;
    } else if (platform === "instagram") {
      link.href = SOCIAL_CONFIG.instagram;
    } else if (platform === "tiktok") {
      link.href = SOCIAL_CONFIG.tiktok;
    }
    console.log(`Social link updated: ${platform}`);
  });

  // Reemplazar enlaces de TikTok en embeds
  const tiktokLinks = document.querySelectorAll('a[href*="tiktok.com"]');
  tiktokLinks.forEach((link) => {
    if (link.href.includes("@stella_maris_medical")) {
      link.href = SOCIAL_CONFIG.tiktok;
      console.log("TikTok embed link updated");
    }
  });

  console.log("Reemplazo de enlaces completado");
}

// Función para actualizar formulario de reserva
function updateBookingForm() {
  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const missing = Object.entries(data).filter(
        ([k, v]) => !String(v).trim()
      );
      if (missing.length) {
        // Usar función toast si está disponible
        if (typeof toast === "function") {
          toast("Por favor completa todos los campos", "error");
        }
        return;
      }

      // Usar número de WhatsApp centralizado
      const msg = `Nueva reserva%0A%0ANombre: ${encodeURIComponent(
        data.nombre
      )}%0ATeléfono: ${encodeURIComponent(
        data.telefono
      )}%0AServicio: ${encodeURIComponent(
        data.servicio
      )}%0AFecha: ${encodeURIComponent(data.fecha)}`;
      const wa = `https://wa.me/${SOCIAL_CONFIG.whatsappNumber}?text=${msg}`;
      window.open(wa, "_blank");

      // Cerrar modal si existe
      const modal = document.getElementById("citas");
      if (modal) {
        modal.setAttribute("aria-hidden", "true");
        modal.setAttribute("aria-modal", "false");
        document.body.style.overflow = "";
      }

      form.reset();
      if (typeof toast === "function") {
        toast("Solicitud enviada por WhatsApp");
      }
    });
  }
}

// Exportar configuración para uso en otros archivos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SOCIAL_CONFIG,
    generateSocialHTML,
    generateWhatsAppLink,
    replaceAllSocialLinks,
    updateBookingForm,
  };
}
