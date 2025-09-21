// Script para probar la configuración de EmailJS
// Ejecutar con: node scripts/test-email-config.js

const fs = require("fs");
const path = require("path");

console.log("🧪 Verificando configuración de EmailJS...\n");

// Leer archivo de configuración
const configPath = path.join(__dirname, "..", "js", "emailjs-config.js");
const content = fs.readFileSync(configPath, "utf8");

// Verificar que no hay valores por defecto
const hasDefaultValues =
  content.includes("YOUR_PUBLIC_KEY_HERE") ||
  content.includes("template_reservas");

if (hasDefaultValues) {
  console.log("❌ Configuración incompleta:");

  if (content.includes("YOUR_PUBLIC_KEY_HERE")) {
    console.log("   • Public Key no configurado");
  }

  if (content.includes("template_reservas")) {
    console.log("   • Template ID no configurado (usando valor por defecto)");
  }

  console.log("\n🔧 Para configurar, ejecuta:");
  console.log("   node scripts/setup-emailjs.js");

  console.log("\n📖 O sigue la guía:");
  console.log("   docs/EMAILJS_SETUP_GUIDE.md");
} else {
  console.log("✅ Configuración completa:");

  // Extraer valores de la configuración
  const publicKeyMatch = content.match(/PUBLIC_KEY:\s*"([^"]+)"/);
  const serviceIdMatch = content.match(/SERVICE_ID:\s*"([^"]+)"/);
  const templateIdMatch = content.match(/TEMPLATE_ID:\s*"([^"]+)"/);
  const toEmailMatch = content.match(/TO_EMAIL:\s*"([^"]+)"/);

  if (publicKeyMatch) {
    console.log(`   🔑 Public Key: ${publicKeyMatch[1]}`);
  }

  if (serviceIdMatch) {
    console.log(`   📧 Service ID: ${serviceIdMatch[1]}`);
  }

  if (templateIdMatch) {
    console.log(`   📝 Template ID: ${templateIdMatch[1]}`);
  }

  if (toEmailMatch) {
    console.log(`   📬 Email destino: ${toEmailMatch[1]}`);
  }

  console.log("\n🧪 Para probar:");
  console.log("1. Abre tu sitio web en el navegador");
  console.log("2. Abre las herramientas de desarrollador (F12)");
  console.log('3. Ve a la pestaña "Console"');
  console.log('4. Haz clic en "Reservar" y llena el formulario');
  console.log("5. Envía la solicitud");
  console.log("6. Revisa la consola para ver si hay errores");
  console.log("7. Revisa tu email para ver si llega el mensaje");

  console.log("\n📋 Logs que deberías ver en la consola:");
  console.log('   ✅ "EmailJS initialized with config: ..."');
  console.log('   ✅ "Email sent successfully: ..."');
  console.log(
    '   ✅ "¡Solicitud enviada exitosamente! Te contactaremos pronto."'
  );
}

console.log("\n📖 Para más información:");
console.log("   docs/EMAILJS_SETUP_GUIDE.md");
