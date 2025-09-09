// Configuración de Redes Sociales para OZONO VIDA
// Actualiza estos datos con tus enlaces reales

const SOCIAL_CONFIG = {
  // Tu número de WhatsApp (formato internacional sin +)
  whatsappNumber: '51988126804', // Cambia por tu número real
  
  // Tus perfiles de redes sociales
  facebook: 'https://facebook.com/stella-maris-medical', // Cambia por tu perfil real
  instagram: 'https://instagram.com/stella_maris_medical', // Cambia por tu perfil real
  tiktok: 'https://tiktok.com/@stella_maris_medical', // Cambia por tu perfil real
  
  // Mensajes predefinidos para WhatsApp según la página
  whatsappMessages: {
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
  }
};

// Función para generar el HTML de redes sociales
function generateSocialHTML() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const message = SOCIAL_CONFIG.whatsappMessages[currentPage] || SOCIAL_CONFIG.whatsappMessages['index.html'];
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

// Exportar configuración para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SOCIAL_CONFIG, generateSocialHTML };
}
