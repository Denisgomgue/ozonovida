/**
 * Fullscreen Slider para OZONO VIDA
 * Slider de pantalla completa con navegación automática y manual
 */

class FullscreenSlider {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.sliderTrack = this.container.querySelector(".slider-track");
    this.slides = this.container.querySelectorAll(".slide");
    this.prevBtn = this.container.querySelector(".slider-btn--prev");
    this.nextBtn = this.container.querySelector(".slider-btn--next");
    this.indicators = this.container.querySelectorAll(".indicator");

    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 4000; // 4 segundos para 12 slides

    this.init();
  }

  init() {
    if (this.totalSlides === 0) return;

    // Configurar eventos
    this.setupEventListeners();

    // Iniciar reproducción automática
    this.startAutoPlay();

    // Pausar reproducción automática al hacer hover
    this.container.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.container.addEventListener("mouseleave", () => this.startAutoPlay());

    // Pausar reproducción automática cuando la pestaña no está visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    });

    // Configurar navegación por teclado
    document.addEventListener("keydown", (e) => this.handleKeyboard(e));

    // Configurar navegación táctil para móviles
    this.setupTouchEvents();
  }

  setupEventListeners() {
    // Botones de navegación
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    // Indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });
  }

  setupTouchEvents() {
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    this.container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.stopAutoPlay();
    });

    this.container.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    this.container.addEventListener("touchend", (e) => {
      if (!isDragging) return;

      endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      // Si el deslizamiento es mayor a 50px, cambiar slide
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }

      isDragging = false;
      this.startAutoPlay();
    });
  }

  handleKeyboard(e) {
    if (
      !this.container.matches(":hover") &&
      !document.activeElement.closest(".fullscreen-slider")
    ) {
      return;
    }

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        this.prevSlide();
        break;
      case "ArrowRight":
        e.preventDefault();
        this.nextSlide();
        break;
      case " ":
        e.preventDefault();
        this.toggleAutoPlay();
        break;
    }
  }

  nextSlide() {
    const nextSlide = (this.currentSlide + 1) % this.totalSlides;
    this.goToSlideWithTransition(nextSlide, true);
  }

  prevSlide() {
    const prevSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlideWithTransition(prevSlide, false);
  }

  goToSlideWithTransition(index, isNext) {
    if (index < 0 || index >= this.totalSlides || index === this.currentSlide) {
      return;
    }

    // Para transición circular suave
    if (
      (isNext && index === 0 && this.currentSlide === this.totalSlides - 1) ||
      (!isNext && index === this.totalSlides - 1 && this.currentSlide === 0)
    ) {
      this.handleCircularTransition(index, isNext);
      return;
    }

    this.goToSlide(index);
  }

  handleCircularTransition(index, isNext) {
    // Pausar auto-play temporalmente
    this.stopAutoPlay();

    // Actualizar clases
    this.slides[this.currentSlide].classList.remove("active");
    this.indicators[this.currentSlide]?.classList.remove("active");

    // Crear slide fantasma para transición suave
    if (isNext) {
      // Del último al primero: mover el track más allá y luego resetear
      this.sliderTrack.style.transition = "none";
      this.sliderTrack.style.transform = `translateX(-${
        this.totalSlides * 8.333
      }%)`;

      setTimeout(() => {
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add("active");
        this.indicators[this.currentSlide]?.classList.add("active");

        this.sliderTrack.style.transition =
          "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        this.sliderTrack.style.transform = `translateX(-${index * 8.333}%)`;

        setTimeout(() => {
          this.startAutoPlay();
        }, 800);
      }, 50);
    } else {
      // Del primero al último: mover el track hacia atrás y luego resetear
      this.sliderTrack.style.transition = "none";
      this.sliderTrack.style.transform = `translateX(8.333%)`;

      setTimeout(() => {
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add("active");
        this.indicators[this.currentSlide]?.classList.add("active");

        this.sliderTrack.style.transition =
          "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        this.sliderTrack.style.transform = `translateX(-${index * 8.333}%)`;

        setTimeout(() => {
          this.startAutoPlay();
        }, 800);
      }, 50);
    }
  }

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides || index === this.currentSlide) {
      return;
    }

    // Actualizar slide actual
    this.slides[this.currentSlide].classList.remove("active");
    this.indicators[this.currentSlide]?.classList.remove("active");

    // Mostrar nuevo slide
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add("active");
    this.indicators[this.currentSlide]?.classList.add("active");

    // Actualizar posición del track
    const translateX = -this.currentSlide * 8.333;
    this.sliderTrack.style.transform = `translateX(${translateX}%)`;

    // Reiniciar reproducción automática
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  toggleAutoPlay() {
    if (this.autoPlayInterval) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  // Método público para pausar/reanudar desde fuera
  pause() {
    this.stopAutoPlay();
  }

  resume() {
    this.startAutoPlay();
  }

  // Método para cambiar el delay de reproducción automática
  setAutoPlayDelay(delay) {
    this.autoPlayDelay = delay;
    if (this.autoPlayInterval) {
      this.startAutoPlay();
    }
  }
}

// Inicializar el slider cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const slider = new FullscreenSlider("fullscreen-slider");

  // Hacer el slider accesible globalmente para debugging
  window.fullscreenSlider = slider;

  // Animación de texto comentada - ahora es texto estático
  // initTextAnimation();
});

// Función para la animación de texto - COMENTADA (ahora es texto estático)
/*
function initTextAnimation() {
  const textElement = document.getElementById("animated-text");
  if (!textElement) return;

  const messages = [
    "Dile adiós al dolor con ozonoterapia y plasma rico en plaquetas",
    "Medicina regenerativa ozonoterapia, aliviamos el dolor",
  ];

  let currentIndex = 0;
  let isAnimating = false;
  let currentText = "";
  let isDeleting = false;

  function typeWriter() {
    if (isAnimating) return;
    
    const fullText = messages[currentIndex];
    
    if (isDeleting) {
      // Borrar texto
      currentText = fullText.substring(0, currentText.length - 1);
      textElement.textContent = currentText;
      
      if (currentText === "") {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % messages.length;
        setTimeout(typeWriter, 500); // Pausa antes de escribir el siguiente
        return;
      }
    } else {
      // Escribir texto
      currentText = fullText.substring(0, currentText.length + 1);
      textElement.textContent = currentText;
      
      if (currentText === fullText) {
        setTimeout(() => {
          isDeleting = true;
          typeWriter();
        }, 2000); // Pausa antes de borrar
        return;
      }
    }
    
    // Velocidad de escritura/borrado
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
  }

  // Iniciar la animación
  typeWriter();
}
*/

// Optimización de rendimiento: preload de imágenes
function preloadSliderImages() {
  const slider = document.getElementById("fullscreen-slider");
  if (!slider) return;

  const images = slider.querySelectorAll(".slide-image");
  images.forEach((img) => {
    if (img.src) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.src;
      document.head.appendChild(link);
    }
  });
}

// Ejecutar preload cuando sea seguro
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", preloadSliderImages);
} else {
  preloadSliderImages();
}
