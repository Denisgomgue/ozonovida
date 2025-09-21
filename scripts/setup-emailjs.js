// Script para configurar EmailJS fácilmente
// Ejecutar con: node scripts/setup-emailjs.js

const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🔧 Configuración de EmailJS para OZONO VIDA");
console.log("============================================\n");

console.log("📋 Necesitarás los siguientes datos de tu cuenta de EmailJS:");
console.log("1. Public Key (de Account → General)");
console.log("2. Service ID (del servicio de Gmail que creaste)");
console.log("3. Template ID (del template de email que creaste)\n");

console.log("🌐 Si no los tienes, ve a: https://www.emailjs.com/\n");

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEmailJS() {
  try {
    // Solicitar datos
    const publicKey = await askQuestion("🔑 Public Key: ");
    const serviceId = await askQuestion("📧 Service ID: ");
    const templateId = await askQuestion("📝 Template ID: ");

    // Validar que no estén vacíos
    if (!publicKey || !serviceId || !templateId) {
      console.log("❌ Error: Todos los campos son obligatorios");
      process.exit(1);
    }

    // Validar formato básico
    if (!publicKey.startsWith("user_")) {
      console.log('⚠️  Advertencia: El Public Key debería empezar con "user_"');
    }

    if (!serviceId.startsWith("service_")) {
      console.log(
        '⚠️  Advertencia: El Service ID debería empezar con "service_"'
      );
    }

    if (!templateId.startsWith("template_")) {
      console.log(
        '⚠️  Advertencia: El Template ID debería empezar con "template_"'
      );
    }

    // Leer archivo actual
    const configPath = path.join(__dirname, "..", "js", "emailjs-config.js");
    let content = fs.readFileSync(configPath, "utf8");

    // Reemplazar valores
    content = content.replace(
      'PUBLIC_KEY: "YOUR_PUBLIC_KEY_HERE"',
      `PUBLIC_KEY: "${publicKey}"`
    );

    content = content.replace(
      'SERVICE_ID: "service_6h1mn3b"',
      `SERVICE_ID: "${serviceId}"`
    );

    content = content.replace(
      'TEMPLATE_ID: "template_reservas"',
      `TEMPLATE_ID: "${templateId}"`
    );

    // Guardar archivo
    fs.writeFileSync(configPath, content, "utf8");

    console.log("\n✅ ¡Configuración completada!");
    console.log("📁 Archivo actualizado: js/emailjs-config.js");
    console.log("\n📋 Resumen de la configuración:");
    console.log(`🔑 Public Key: ${publicKey}`);
    console.log(`📧 Service ID: ${serviceId}`);
    console.log(`📝 Template ID: ${templateId}`);
    console.log(`📬 Email destino: gomezggdenis@gmail.com`);

    console.log("\n🧪 Para probar:");
    console.log("1. Abre tu sitio web");
    console.log('2. Haz clic en "Reservar"');
    console.log("3. Llena el formulario");
    console.log("4. Envía la solicitud");
    console.log("5. Revisa tu email: gomezggdenis@gmail.com");

    console.log(
      "\n📖 Para más detalles, consulta: docs/EMAILJS_SETUP_GUIDE.md"
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

// Ejecutar configuración
setupEmailJS();
