# 📧 Guía Completa para Configurar EmailJS

## 🎯 Objetivo

Configurar el envío de emails desde el formulario de reservas a tu correo: **gomezggdenis@gmail.com**

## 📋 Pasos para Configurar EmailJS

### 1. Crear Cuenta en EmailJS

1. Ve a: https://www.emailjs.com/
2. Haz clic en **"Sign Up"**
3. Crea una cuenta con tu email: **gomezggdenis@gmail.com**
4. Confirma tu email

### 2. Crear un Servicio de Email

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Conecta tu cuenta de Gmail: **gomezggdenis@gmail.com**
5. Autoriza el acceso
6. **Anota el Service ID** (ejemplo: `service_abc123`)

### 3. Crear un Template de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa este template:

**Subject:**

```
Nueva Reserva de Cita - {{from_name}}
```

**Body (HTML):**

```html
<!DOCTYPE html>
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
</html>
```

4. **Anota el Template ID** (ejemplo: `template_xyz789`)

### 4. Obtener tu Public Key

1. Ve a **"Account"** → **"General"**
2. Busca **"Public Key"**
3. **Copia tu Public Key** (ejemplo: `user_abc123def456`)

### 5. Configurar el Código

Edita el archivo `js/emailjs-config.js` y reemplaza estos valores:

```javascript
const EMAILJS_CONFIG = {
  // Reemplaza con tu Public Key real
  PUBLIC_KEY: "eCOV2v8D0D97snkyp",

  // Reemplaza con tu Service ID real
  SERVICE_ID: "service_6h1mn3b",

  // Reemplaza con tu Template ID real
  TEMPLATE_ID: "template_290w9ms",

  // Tu email de destino
  TO_EMAIL: "gomezggdenis@gmail.com",
};
```

## ✅ Verificación Final

Una vez configurado correctamente, deberías ver:

- ✅ Emails llegando a **gomezggdenis@gmail.com**
- ✅ Mensaje de confirmación en el sitio web
- ✅ Sin errores en la consola del navegador
- ✅ Funcionamiento del backup de WhatsApp

## 🔧 Ejemplo de Configuración Completa

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "user_abc123def456",
  SERVICE_ID: "service_gmail123",
  TEMPLATE_ID: "template_reservas456",
  TO_EMAIL: "gomezggdenis@gmail.com",
};
```

## 🚨 Solución de Problemas

### Error: "EmailJS not configured"

- Verifica que hayas reemplazado `YOUR_PUBLIC_KEY_HERE` con tu Public Key real

### Error: "Service not found"

- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo en EmailJS

### Error: "Template not found"

- Verifica que el Template ID sea correcto
- Asegúrate de que el template esté guardado

### No llegan emails

- Revisa la carpeta de spam
- Verifica que el template tenga el formato correcto
- Revisa los logs en la consola del navegador

¡Listo! Tu formulario de reservas ahora enviará emails directamente a tu Gmail. 🎉
