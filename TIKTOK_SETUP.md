# TikTok Gallery - Guía de Configuración

## 📱 Cómo Actualizar los Videos de TikTok

### 1. Obtener el Código de Embed de TikTok

1. Ve a tu perfil de TikTok: `https://tiktok.com/@stella_maris_medical`
2. Selecciona el video que quieres mostrar
3. Haz clic en el botón "Compartir" (flecha hacia la derecha)
4. Selecciona "Insertar"
5. Copia el código HTML generado

### 2. Reemplazar los Videos en el HTML

En el archivo `index.html`, busca la sección `<!-- TikTok Gallery Section -->` y reemplaza los bloques `blockquote` con tus videos reales.

**Ejemplo de código real de TikTok:**
```html
<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@stella_maris_medical/video/VIDEO_ID_REAL" data-video-id="VIDEO_ID_REAL" style="max-width: 325px;min-width: 325px;">
  <section>
    <a target="_blank" title="@stella_maris_medical" href="https://www.tiktok.com/@stella_maris_medical">@stella_maris_medical</a>
    <p>Descripción real del video</p>
    <a target="_blank" title="♬ sonido original - OZONO VIDA" href="https://www.tiktok.com/music/sonido-original-STELLA-MARIS-VIDEO_ID_REAL">♬ sonido original - OZONO VIDA</a>
  </section>
</blockquote>
```

### 3. Actualizar la Información de los Videos

Para cada video, actualiza:

- **Título**: Cambia el `<h3>` con el título real del video
- **Descripción**: Actualiza el `<p>` con la descripción real
- **Estadísticas**: Actualiza los números de likes, comentarios y shares

### 4. Videos Sugeridos para OZONO VIDA

**Video 1: Introducción a la Ozonoterapia**
- Título: "¿Qué es la Ozonoterapia?"
- Descripción: "Explicación simple de cómo funciona la ozonoterapia para el dolor"

**Video 2: Ejercicios Preventivos**
- Título: "Ejercicios para Prevenir Dolor de Espalda"
- Descripción: "Rutina de 5 minutos para mantener tu espalda saludable"

**Video 3: Testimonio de Paciente**
- Título: "Paciente Recuperado de Hernia Discal"
- Descripción: "Historia real de recuperación sin cirugía"

**Video 4: Medicina Regenerativa**
- Título: "PRP: Tu Propia Sangre como Medicina"
- Descripción: "Cómo el Plasma Rico en Plaquetas acelera la curación"

### 5. Actualización Automática (Opcional)

Para actualizar automáticamente con los videos más recientes, puedes usar la API de TikTok:

```javascript
// Ejemplo de integración con API de TikTok
async function loadLatestTikTokVideos() {
  try {
    const response = await fetch('https://api.tiktok.com/v1/user/videos/@stella_maris_medical');
    const videos = await response.json();
    
    // Actualizar la galería con los videos más recientes
    updateTikTokGallery(videos.data);
  } catch (error) {
    console.log('Error cargando videos de TikTok:', error);
  }
}
```

### 6. Configuración del Perfil

**URL del Perfil**: `https://tiktok.com/@stella_maris_medical`

**Contenido Sugerido**:
- Consejos de salud diarios
- Ejercicios preventivos
- Testimonios de pacientes
- Explicaciones médicas simples
- Behind the scenes del centro médico

### 7. Beneficios de la Galería TikTok

✅ **Engagement**: Contenido dinámico y atractivo
✅ **Credibilidad**: Testimonios reales de pacientes
✅ **Educación**: Información médica accesible
✅ **Marketing**: Atrae audiencia más joven
✅ **SEO**: Contenido fresco y actualizado

### 8. Mantenimiento

- **Frecuencia**: Actualizar videos cada 2-4 semanas
- **Calidad**: Mantener videos profesionales y educativos
- **Consistencia**: Publicar regularmente en TikTok
- **Interacción**: Responder comentarios y mensajes

## 🎯 Próximos Pasos

1. Crear cuenta de TikTok profesional
2. Subir videos de calidad sobre tratamientos
3. Reemplazar videos de ejemplo con contenido real
4. Configurar actualización automática (opcional)
5. Monitorear engagement y ajustar estrategia
