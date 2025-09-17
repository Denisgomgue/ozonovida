/**
 * Sistema de Protección de Videos - OZONO VIDA
 * Protección global contra descarga y uso no autorizado de videos
 */

class VideoSecurity {
  constructor() {
    this.protectedVideos = new Set();
    this.init();
  }

  // Inicializar protección global
  init() {
    // Proteger videos existentes
    this.protectExistingVideos();

    // Observar nuevos videos añadidos dinámicamente
    this.observeNewVideos();

    // Deshabilitar atajos de teclado
    this.disableKeyboardShortcuts();

    // Proteger contra DevTools
    this.addDevToolsProtection();

    console.log("🔒 Sistema de protección de videos activado");
  }

  // Proteger videos existentes
  protectExistingVideos() {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => this.protectVideo(video));
  }

  // Observar nuevos videos
  observeNewVideos() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Element node
            const videos = node.querySelectorAll
              ? node.querySelectorAll("video")
              : [];
            videos.forEach((video) => this.protectVideo(video));

            if (node.tagName === "VIDEO") {
              this.protectVideo(node);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Proteger un video específico
  protectVideo(video) {
    if (this.protectedVideos.has(video)) return;

    // Marcar como protegido
    this.protectedVideos.add(video);
    video.setAttribute("data-protected", "true");

    // Deshabilitar descarga
    video.removeAttribute("download");
    video.setAttribute("controlsList", "nodownload noremoteplayback");
    video.setAttribute("disablePictureInPicture", "true");

    // Eventos de protección
    this.addVideoProtectionEvents(video);

    // Agregar overlay de protección si no existe
    this.addProtectionOverlay(video);

    console.log("🔒 Video protegido:", video.src || "video element");
  }

  // Agregar eventos de protección
  addVideoProtectionEvents(video) {
    // Prevenir menú contextual
    video.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.showProtectionMessage();
      return false;
    });

    // Prevenir arrastrar
    video.addEventListener("dragstart", (e) => {
      e.preventDefault();
      return false;
    });

    // Prevenir selección
    video.addEventListener("selectstart", (e) => {
      e.preventDefault();
      return false;
    });

    // Monitorear intentos de descarga
    video.addEventListener("loadstart", () => {
      this.logVideoAccess(video);
    });

    // Proteger contra inspección
    video.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        // Clic derecho
        e.preventDefault();
        this.showProtectionMessage();
        return false;
      }
    });
  }

  // Agregar overlay de protección invisible
  addProtectionOverlay(video) {
    const container = video.parentElement;
    if (!container.classList.contains("protected-video-container")) {
      container.classList.add("protected-video-container");

      // Agregar watermark
      const watermark = document.createElement("div");
      watermark.className = "video-watermark";
      watermark.textContent = "OZONO VIDA";
      container.appendChild(watermark);

      // Agregar notice de protección
      const notice = document.createElement("div");
      notice.className = "video-protection-notice";
      notice.textContent = "© OZONO VIDA - Contenido protegido";
      container.appendChild(notice);
    }
  }

  // Deshabilitar atajos de teclado peligrosos
  disableKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Prevenir F12, Ctrl+Shift+I, Ctrl+U, etc.
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "s") // Prevenir guardar página
      ) {
        // Solo prevenir si hay videos en la página
        if (document.querySelectorAll("video").length > 0) {
          e.preventDefault();
          this.showProtectionMessage();
          return false;
        }
      }
    });
  }

  // Protección básica contra DevTools
  addDevToolsProtection() {
    // Detectar DevTools abierto (método básico)
    let devtools = {
      open: false,
      orientation: null,
    };

    const threshold = 160;

    setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          console.warn("🔒 DevTools detectado - Videos protegidos");
          this.hideAllVideos();
        }
      } else {
        if (devtools.open) {
          devtools.open = false;
          this.showAllVideos();
        }
      }
    }, 500);
  }

  // Ocultar videos cuando DevTools está abierto
  hideAllVideos() {
    document
      .querySelectorAll('video[data-protected="true"]')
      .forEach((video) => {
        video.style.opacity = "0.1";
        video.style.filter = "blur(10px)";
        video.pause();
      });
  }

  // Mostrar videos cuando DevTools se cierra
  showAllVideos() {
    document
      .querySelectorAll('video[data-protected="true"]')
      .forEach((video) => {
        video.style.opacity = "1";
        video.style.filter = "none";
      });
  }

  // Mostrar mensaje de protección
  showProtectionMessage() {
    // Crear toast de protección
    let toast = document.getElementById("protection-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "protection-toast";
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--corporate-red), #dc2626);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(229, 57, 53, 0.4);
        z-index: 9999;
        font-weight: 600;
        font-size: 0.9rem;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      `;
      toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-shield-halved"></i>
          <span>Contenido protegido por OZONO VIDA</span>
        </div>
      `;
      document.body.appendChild(toast);
    }

    // Mostrar toast
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(0)";
    }, 100);

    // Ocultar después de 3 segundos
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
    }, 3000);
  }

  // Log de acceso a videos (para analytics)
  logVideoAccess(video) {
    const videoSrc =
      video.src || video.querySelector("source")?.src || "unknown";
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;

    console.log("📊 Video Access Log:", {
      video: videoSrc,
      timestamp: timestamp,
      userAgent: userAgent.substring(0, 50) + "...",
      page: window.location.pathname,
    });

    // Aquí puedes enviar los datos a tu sistema de analytics
    // this.sendToAnalytics({ video: videoSrc, timestamp, page: window.location.pathname });
  }

  // Método para enviar a analytics (implementar según tu sistema)
  sendToAnalytics(data) {
    // Ejemplo para Google Analytics
    if (typeof gtag !== "undefined") {
      gtag("event", "video_access", {
        custom_parameter_1: data.video,
        custom_parameter_2: data.page,
      });
    }

    // Ejemplo para enviar a tu propio servidor
    /*
    fetch('/api/video-analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.warn('Analytics error:', err));
    */
  }

  // Método público para proteger videos manualmente
  protectVideoById(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
      this.protectVideo(video);
    }
  }

  // Método público para proteger todos los videos en un contenedor
  protectVideosInContainer(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container) {
      const videos = container.querySelectorAll("video");
      videos.forEach((video) => this.protectVideo(video));
    }
  }
}

// Inicializar protección cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.videoSecurity = new VideoSecurity();
});

// Protección adicional contra consola
(function () {
  "use strict";

  // Redefinir console.log para videos
  const originalLog = console.log;
  console.log = function (...args) {
    const message = args.join(" ");
    if (message.includes("video") || message.includes(".mp4")) {
      return; // No mostrar logs relacionados con videos
    }
    originalLog.apply(console, args);
  };
})();

// Exportar para uso manual
if (typeof module !== "undefined" && module.exports) {
  module.exports = VideoSecurity;
}
