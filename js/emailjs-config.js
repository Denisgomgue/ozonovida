// Configuración de EmailJS para OZONO VIDA
// ================================================

// PASOS PARA CONFIGURAR EMAILJS:
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta gratuita
// 3. Crea un servicio de email (Gmail)
// 4. Crea un template de email
// 5. Obtén tu Public Key
// 6. Reemplaza los valores abajo con tus datos reales

const EMAILJS_CONFIG = {
  // Tu Public Key de EmailJS
  PUBLIC_KEY: "eCOV2v8D0D97snkyp",

  // Tu Service ID (ya configurado)
  SERVICE_ID: "service_6h1mn3b",

  // Tu Template ID
  TEMPLATE_ID: "template_m8t4yjf",

  // Email de destino
  TO_EMAIL: "gomezggdenis@gmail.com",
};

// Template de email sugerido para EmailJS:
/*
Subject: Nueva Reserva de Cita - {{from_name}}

Hola,

Has recibido una nueva solicitud de reserva de cita:

👤 Nombre: {{from_name}}
📞 Teléfono: {{phone}}
📧 Email: {{from_email}}
🏥 Servicio solicitado: {{service}}
📅 Fecha preferida: {{date}}
💬 Mensaje adicional: {{message}}

Por favor contacta al paciente lo antes posible.

Saludos,
Sistema de Reservas OZONO VIDA
*/

// Inicializar EmailJS cuando esté disponible
if (typeof emailjs !== "undefined") {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  console.log("EmailJS initialized with config:", EMAILJS_CONFIG);
} else {
  console.warn("EmailJS not loaded yet");
}

// Función para enviar email usando la configuración
window.sendReservationEmail = async function (formData) {
  if (typeof emailjs === "undefined") {
    throw new Error("EmailJS not available");
  }

  const templateParams = {
    from_name: formData.nombre,
    from_email: formData.email || "No proporcionado",
    phone: formData.telefono,
    service: formData.servicio,
    date: formData.fecha,
    message: formData.mensaje || "Sin mensaje adicional",
    to_email: EMAILJS_CONFIG.TO_EMAIL,
  };

  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Exportar configuración para uso en otros archivos
window.EMAILJS_CONFIG = EMAILJS_CONFIG;
