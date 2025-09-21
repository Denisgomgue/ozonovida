// Script para crear el template de email en EmailJS
// Ejecutar con: node scripts/create-email-template.js

console.log("📧 Creando Template de Email para EmailJS");
console.log("==========================================\n");

console.log("🔧 Pasos para crear el template:");
console.log("1. Ve a: https://www.emailjs.com/");
console.log("2. Inicia sesión con tu cuenta");
console.log('3. Ve a "Email Templates"');
console.log('4. Haz clic en "Create New Template"');
console.log("5. Copia y pega el contenido de abajo\n");

console.log("📝 CONFIGURACIÓN DEL TEMPLATE:");
console.log("================================\n");

console.log("📋 Template ID sugerido: template_reservas_ozono");
console.log("📋 Subject: Nueva Reserva de Cita - {{from_name}}\n");

console.log("📄 Contenido HTML del template:");
console.log("================================\n");

const templateHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Nueva Reserva de Cita</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2
        style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;"
      >
        🏥 Nueva Reserva de Cita - OZONO VIDA
      </h2>

      <p>Hola,</p>

      <p>Has recibido una nueva solicitud de reserva de cita:</p>

      <div
        style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"
      >
        <h3 style="color: #2c5aa0; margin-top: 0;">
          📋 Información del Paciente
        </h3>

        <p><strong>👤 Nombre:</strong> {{from_name}}</p>
        <p><strong>📞 Teléfono:</strong> {{phone}}</p>
        <p><strong>📧 Email:</strong> {{from_email}}</p>
        <p><strong>🏥 Servicio solicitado:</strong> {{service}}</p>
        <p><strong>📅 Fecha preferida:</strong> {{date}}</p>

        {{#message}}
        <p><strong>💬 Mensaje adicional:</strong></p>
        <div
          style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2c5aa0;"
        >
          {{message}}
        </div>
        {{/message}}
      </div>

      <div
        style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;"
      >
        <p><strong>📞 Contactar al paciente:</strong></p>
        <p>• Teléfono: <a href="tel:{{phone}}">{{phone}}</a></p>
        <p>• Email: <a href="mailto:{{from_email}}">{{from_email}}</a></p>
      </div>

      <p style="margin-top: 30px;">
        <strong>Por favor contacta al paciente lo antes posible.</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

      <p style="font-size: 12px; color: #666;">
        Este email fue enviado automáticamente desde el sistema de reservas de
        OZONO VIDA.<br />
        Fecha: {{#date}}{{date}}{{/date}}
      </p>
    </div>
  </body>
</html>`;

console.log(templateHTML);

console.log("\n📋 INSTRUCCIONES PASO A PASO:");
console.log("==============================\n");

console.log("1. 📧 Ve a tu cuenta de EmailJS:");
console.log("   https://www.emailjs.com/\n");

console.log('2. 📝 Ve a "Email Templates"');
console.log("   (En el menú lateral izquierdo)\n");

console.log('3. ➕ Haz clic en "Create New Template"');
console.log("   (Botón azul en la parte superior)\n");

console.log("4. 📝 Configura el template:");
console.log('   • Template Name: "Reservas OZONO VIDA"');
console.log('   • Subject: "Nueva Reserva de Cita - {{from_name}}"');
console.log("   • Content: Copia el HTML de arriba\n");

console.log("5. 💾 Guarda el template");
console.log('   (Botón "Save" en la parte superior)\n');

console.log("6. 🔑 Copia el Template ID");
console.log("   (Aparece en la lista de templates)\n");

console.log("7. 🔧 Actualiza la configuración:");
console.log("   Edita js/emailjs-config.js y reemplaza:");
console.log('   TEMPLATE_ID: "template_reservas"');
console.log("   Por tu Template ID real\n");

console.log("8. 🧪 Prueba el sistema:");
console.log("   node scripts/test-email-config.js\n");

console.log("📞 Si necesitas ayuda:");
console.log('   • Template ID suele empezar con "template_"');
console.log('   • Ejemplo: "template_abc123def456"');
console.log(
  "   • Una vez configurado, los emails llegarán a gomezggdenis@gmail.com\n"
);

console.log("✅ ¡Una vez completado, tu sistema de emails estará listo!");
