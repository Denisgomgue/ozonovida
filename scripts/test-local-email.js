// Script para probar el envío de emails localmente
// Esto simula el envío de email mientras configuras EmailJS

const fs = require("fs");
const path = require("path");

console.log("🧪 Simulando envío de email...\n");

// Datos de prueba
const testData = {
  nombre: "Juan Pérez",
  telefono: "+51 999 999 999",
  email: "juan@email.com",
  servicio: "ozonoterapia",
  fecha: "2024-01-15",
  mensaje: "Me interesa la ozonoterapia para dolor de rodilla.",
};

// Crear contenido del email
const emailContent = `
===============================================
📧 EMAIL DE PRUEBA - OZONO VIDA
===============================================

🏥 Nueva Reserva de Cita

👤 Nombre: ${testData.nombre}
📞 Teléfono: ${testData.telefono}
📧 Email: ${testData.email}
🏥 Servicio solicitado: ${testData.servicio}
📅 Fecha preferida: ${testData.fecha}
💬 Mensaje adicional: ${testData.mensaje}

===============================================
📬 Este email llegaría a: gomezggdenis@gmail.com
===============================================

Fecha: ${new Date().toLocaleString()}
`;

// Guardar en archivo de prueba
const testFilePath = path.join(__dirname, "..", "test-email.txt");
fs.writeFileSync(testFilePath, emailContent, "utf8");

console.log("✅ Email de prueba creado:");
console.log(`📁 Archivo: ${testFilePath}\n`);

console.log("📧 Contenido del email:");
console.log(emailContent);

console.log("\n🔧 Para configurar EmailJS real:");
console.log("1. Ejecuta: node scripts/setup-emailjs.js");
console.log("2. O sigue la guía: docs/EMAILJS_SETUP_GUIDE.md");
console.log(
  "3. Una vez configurado, los emails llegarán a gomezggdenis@gmail.com"
);

console.log("\n🧪 Para probar en el navegador:");
console.log("1. Abre tu sitio web");
console.log("2. Abre la consola del navegador (F12)");
console.log('3. Haz clic en "Reservar"');
console.log("4. Llena el formulario");
console.log("5. Envía la solicitud");
console.log("6. Revisa la consola para ver si hay errores");

console.log("\n📋 Logs esperados en la consola:");
console.log('   ✅ "EmailJS initialized with config: ..."');
console.log('   ✅ "Email sent successfully: ..."');
console.log(
  '   ✅ "¡Solicitud enviada exitosamente! Te contactaremos pronto."'
);
