document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Year in footer
  const year = new Date().getFullYear();
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(year);

  // Mobile nav toggle
  const toggle = $('.nav__toggle');
  const menu = $('#menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      
      // Close all dropdowns when opening mobile menu
      if (isOpen) {
        $$('.dropdown').forEach(dropdown => {
          dropdown.classList.remove('is-open');
        });
        $$('.dropdown__item--has-submenu').forEach(item => {
          item.classList.remove('is-open');
        });
      }
    });
    
    // Close menu when clicking on links
    $$('#menu a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdown menu functionality
  const dropdown = $('.dropdown');
  const dropdownTrigger = $('.dropdown__trigger');
  const dropdownMenu = $('.dropdown__menu');
  
  if (dropdown && dropdownTrigger && dropdownMenu) {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
      }
    });
    
    // Toggle dropdown on trigger click (for mobile)
    dropdownTrigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 720) {
        e.preventDefault();
        dropdown.classList.toggle('is-open');
        
        // Close other dropdowns
        $$('.dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('is-open');
          }
        });
      }
    });
    
    // Prevent dropdown from closing when clicking inside
    dropdownMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Handle submenu functionality
    const submenuItems = $$('.dropdown__item--has-submenu');
    submenuItems.forEach(item => {
      const submenu = $('.dropdown__submenu', item);
      const link = $('.dropdown__link', item);
      
      if (submenu && link) {
        // Prevent submenu from closing when clicking inside
        submenu.addEventListener('click', (e) => {
          e.stopPropagation();
        });
        
        // Handle mobile submenu toggle
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 720) {
            e.preventDefault();
            const isOpen = item.classList.toggle('is-open');
            
            // Close other submenus
            submenuItems.forEach(otherItem => {
              if (otherItem !== item) {
                otherItem.classList.remove('is-open');
              }
            });
          }
        });
      }
    });
  }

  // Smooth scroll
  $$('.nav__links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    });
  });

  // Reveal on scroll
  const revealEls = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));

  // Stats counter
  const statEls = $$('.stat__num');
  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-count') || '0');
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
  const ioStats = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        ioStats.unobserve(entry.target);
      }
    }
  }, { threshold: 0.6 });
  statEls.forEach(el => ioStats.observe(el));

  // Carousel
  const track = $('.carousel__track');
  const btnPrev = $('.carousel__btn.prev');
  const btnNext = $('.carousel__btn.next');
  if (track && btnPrev && btnNext) {
    let index = 0;
    const total = $$('.testimonial', track).length;
    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };
    const next = () => { index = (index + 1) % total; update(); };
    const prev = () => { index = (index - 1 + total) % total; update(); };
    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);
    let timer = setInterval(next, 5000);
    track.addEventListener('pointerenter', () => clearInterval(timer));
    track.addEventListener('pointerleave', () => timer = setInterval(next, 5000));
  }

  // Modal booking
  const modal = $('#citas');
  const openBtns = $$('[data-open-modal]');
  const closeBtns = $$('[data-close-modal]');
  const openModal = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
    const firstInput = $('#nombre');
    if (firstInput) firstInput.focus();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
  };
  openBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  modal?.addEventListener('click', (e) => {
    if ((e.target)?.closest('.modal__dialog')) return;
    closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Booking form
  const form = $('#booking-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const missing = Object.entries(data).filter(([k, v]) => !String(v).trim());
    if (missing.length) {
      toast('Por favor completa todos los campos', 'error');
      return;
    }
    // Simulate sending; here you can integrate with backend or WhatsApp
    const msg = `Nueva reserva%0A%0ANombre: ${encodeURIComponent(data.nombre)}%0ATeléfono: ${encodeURIComponent(data.telefono)}%0AServicio: ${encodeURIComponent(data.servicio)}%0AFecha: ${encodeURIComponent(data.fecha)}`;
    const wa = `https://wa.me/51999999999?text=${msg}`;
    window.open(wa, '_blank');
    closeModal();
    form.reset();
    toast('Solicitud enviada por WhatsApp');
  });

  // To top button
  const toTop = $('#to-top');
  const onScroll = () => {
    const show = window.scrollY > 600;
    toTop?.classList.toggle('is-visible', show);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();

  // Theme toggle functionality
  const themeToggle = $('#theme-toggle');
  const themeIcon = $('#theme-icon');
  const html = document.documentElement;
  
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  
  if (themeToggle && themeIcon) {
    // Update icon based on current theme
    const updateIcon = () => {
      const currentTheme = html.getAttribute('data-theme');
      if (currentTheme === 'light') {
        themeIcon.className = 'fa-solid fa-moon';
      } else {
        themeIcon.className = 'fa-solid fa-sun';
      }
    };
    
    updateIcon();
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon();
    });
  }

  // Header scroll effect
  const header = $('.header');
  const headerInner = $('.header__inner');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header?.classList.add('header--scrolled');
      if (headerInner) {
        headerInner.style.padding = '0.4rem 0';
      }
    } else {
      header?.classList.remove('header--scrolled');
      if (headerInner) {
        headerInner.style.padding = '0.8rem 0';
      }
    }
    
    lastScrollY = currentScrollY;
  });

  // Smart social media links
  const socialLinks = $$('.social-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Define messages for different pages
  const whatsappMessages = {
    'index.html': 'Hola, me interesa conocer más sobre los servicios de OZONO VIDA',
    'tratamiento-dolor.html': 'Hola, me interesa información sobre tratamientos de dolor en OZONO VIDA',
    'tratamiento-enfermedades.html': 'Hola, me interesa información sobre tratamientos de enfermedades en OZONO VIDA',
    'estetica.html': 'Hola, me interesa información sobre tratamientos estéticos en OZONO VIDA',
    'infecciones.html': 'Hola, me interesa información sobre tratamientos de infecciones en OZONO VIDA',
    'ginecologia.html': 'Hola, me interesa información sobre servicios ginecológicos en OZONO VIDA',
    'diabetes.html': 'Hola, me interesa información sobre tratamiento de diabetes en OZONO VIDA',
    'hernias-discales.html': 'Hola, me interesa información sobre tratamiento de hernias discales en OZONO VIDA',
    'rejuvenecimiento-facial.html': 'Hola, me interesa información sobre rejuvenecimiento facial en OZONO VIDA',
    'lumbalgia.html': 'Hola, me interesa información sobre tratamiento de lumbalgia en OZONO VIDA',
    'artrosis.html': 'Hola, me interesa información sobre tratamiento de artrosis en OZONO VIDA',
    'artritis.html': 'Hola, me interesa información sobre tratamiento de artritis en OZONO VIDA',
    'tendinitis.html': 'Hola, me interesa información sobre tratamiento de tendinitis en OZONO VIDA',
    'fibromialgia.html': 'Hola, me interesa información sobre tratamiento de fibromialgia en OZONO VIDA'
  };
  
  // Update WhatsApp link with smart message
  const whatsappLink = $('.social-link[data-social="whatsapp"]');
  if (whatsappLink) {
    const message = whatsappMessages[currentPage] || whatsappMessages['index.html'];
    const encodedMessage = encodeURIComponent(message);
    whatsappLink.href = `https://wa.me/51999999999?text=${encodedMessage}`;
  }
  
  // Add click tracking for analytics (optional)
  socialLinks.forEach(link => {
    link.addEventListener('click', () => {
      const platform = link.getAttribute('data-social');
      console.log(`Social media click: ${platform} from ${currentPage}`);
      // Here you can add analytics tracking if needed
    });
  });

  // Tiny toast
  let toastTimeout;
  const toast = (text, type = 'success') => {
    clearTimeout(toastTimeout);
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.style.position = 'fixed';
      el.style.right = '1rem';
      el.style.bottom = '1rem';
      el.style.padding = '.7rem 1rem';
      el.style.borderRadius = '.6rem';
      el.style.border = '1px solid var(--border)';
      el.style.background = 'rgba(11,18,32,.92)';
      el.style.color = 'var(--text)';
      el.style.boxShadow = 'var(--shadow)';
      el.style.zIndex = '100';
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.style.background = type === 'error' ? 'rgba(239, 68, 68, .2)' : 'rgba(11,18,32,.92)';
    el.style.borderColor = type === 'error' ? 'rgba(239, 68, 68, .5)' : 'var(--border)';
    el.style.opacity = '1';
    toastTimeout = setTimeout(() => { el.style.opacity = '0'; }, 2400);
  };
});
