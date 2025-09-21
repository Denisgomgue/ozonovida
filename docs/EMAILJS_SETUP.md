# 📧 Configuración de EmailJS para OZONO VIDA

## 🎯 Objetivo

Configurar el formulario de reservas para que envíe emails directamente a `gomezggdenis@gmail.com`

## 📋 Pasos para Configurar EmailJS

### 1. Crear cuenta en EmailJS

- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Crea una cuenta gratuita (100 emails/mes gratis)
- Verifica tu email

### 2. Crear un Servicio de Email

- En el dashboard, ve a **"Email Services"**
- Click en **"Add New Service"**
- Selecciona **"Gmail"**
- Conecta tu cuenta de Gmail `gomezggdenis@gmail.com`
- Anota el **Service ID** (ej: `service_abc123`)

### 3. Crear un Template de Email

- Ve a **"Email Templates"**
- Click en **"Create New Template"**
- Usa este template:

**Subject:**

```
Nueva Reserva de Cita - {{from_name}}
```

**Content:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #215096;">🏥 Nueva Reserva de Cita - OZONO VIDA</h2>

      <p>Hola,</p>
      <p>Has recibido una nueva solicitud de reserva de cita:</p>

      <div
        style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"
      >
        <h3 style="margin-top: 0; color: #215096;">📋 Datos del Paciente</h3>
        <p><strong>👤 Nombre:</strong> {{from_name}}</p>
        <p><strong>📞 Teléfono:</strong> {{phone}}</p>
        <p><strong>📧 Email:</strong> {{from_email}}</p>
        <p><strong>🏥 Servicio solicitado:</strong> {{service}}</p>
        <p><strong>📅 Fecha preferida:</strong> {{date}}</p>
        <p><strong>💬 Mensaje adicional:</strong></p>
        <p
          style="background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #215096;"
        >
          {{message}}
        </p>
      </div>

      <div
        style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;"
      >
        <p style="margin: 0;">
          <strong>⏰ Acción requerida:</strong> Por favor contacta al paciente
          lo antes posible para confirmar la cita.
        </p>
      </div>

      <hr style="border: none; border-top: 2px solid #eee; margin: 30px 0;" />
      <p style="color: #666; font-size: 14px;">
        Este email fue enviado automáticamente desde el sistema de reservas de
        OZONO VIDA.<br />
        Si tienes problemas, contacta al administrador del sistema.
      </p>
    </div>
  </body>
</html>
```

- Guarda el template y anota el **Template ID** (ej: `template_xyz789`)

### 4. Obtener tu Public Key

- Ve a **"Account"** → **"General"**
- Copia tu **Public Key** (ej: `user_abc123def456`)

### 5. Configurar el código

Edita el archivo `js/emailjs-config.js` y reemplaza:

```javascript
const EMAILJS_CONFIG = {
  // Reemplaza con tu Public Key real
  PUBLIC_KEY: "user_abc123def456",

  // Reemplaza con tu Service ID real
  SERVICE_ID: "service_abc123",

  // Reemplaza con tu Template ID real
  TEMPLATE_ID: "template_xyz789",

  // Tu email de destino
  TO_EMAIL: "gomezggdenis@gmail.com",
};
```

### 6. Probar el formulario

- Ve a tu sitio web
- Abre el formulario de reservas
- Llena los campos y envía
- Revisa tu Gmail para ver si llega el email

## 🔧 Solución de Problemas

### Si no llegan los emails:

1. Verifica que el Service ID, Template ID y Public Key sean correctos
2. Revisa la carpeta de spam en Gmail
3. Verifica que el servicio de Gmail esté conectado correctamente en EmailJS

### Si hay errores en la consola:

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Busca errores relacionados con EmailJS
4. Verifica que todos los IDs sean correctos

### Si el formulario no se envía:

1. Verifica que todos los campos obligatorios estén llenos
2. Revisa que el archivo `js/emailjs-config.js` esté cargado
3. Verifica que EmailJS esté inicializado correctamente

## 📊 Límites de EmailJS Gratuito

- **200 emails/mes** (suficiente para la mayoría de casos)
- **2 servicios de email**
- **2 templates**
- **1,000 requests/mes**

## 💡 Funcionalidad de Backup

Si EmailJS falla, el formulario automáticamente:

1. Envía un mensaje por WhatsApp con los datos
2. Muestra un mensaje de confirmación al usuario
3. Registra el error en la consola para debugging

## ✅ Verificación Final

Una vez configurado correctamente, deberías ver:

- ✅ Emails llegando a `gomezggdenis@gmail.com`
- ✅ Mensaje de confirmación en el sitio web
- ✅ Sin errores en la consola del navegador
- ✅ Funcionamiento del backup de WhatsApp

¡Listo! Tu formulario de reservas ahora enviará emails directamente a tu Gmail. 🎉
