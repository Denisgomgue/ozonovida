# Scripts de Automatización - OZONO VIDA

## 🚀 Scripts Disponibles

### 1. Generador de Páginas Optimizadas

**Archivo:** `scripts/generate-optimized-pages.js`

**Propósito:** Genera páginas HTML completas con CSS crítico inline y optimizaciones de rendimiento.

**Uso:**

```bash
cd scripts
node generate-optimized-pages.js
```

**Características:**

- CSS crítico embebido
- Preload de recursos
- Metadata dinámica
- Scripts optimizados con defer
- Rutas relativas automáticas

### 2. Actualizador Masivo de HTML

**Archivo:** `scripts/update-all-html-files.js`

**Propósito:** Aplica optimizaciones a todos los archivos HTML existentes del proyecto.

**Uso:**

```bash
cd scripts
node update-all-html-files.js
```

**Archivos que actualiza:**

- `index.html`
- `pages/tratamientos/index.html`
- `tratamientos/enfermedades/index.html`
- `tratamientos/ginecologia/index.html`
- `tratamientos/estetica/index.html`
- `tratamientos/estetica/rejuvenecimiento-facial.html`
- `tratamientos/infecciones/index.html`
- `aplicaciones/index.html`
- `aplicaciones/intramuscular/index.html`

## 📋 Configuración de Páginas

### Agregar Nueva Página al Generador

Editar `scripts/generate-optimized-pages.js`:

```javascript
const PAGES_CONFIG = [
  {
    id: "nueva-pagina",
    path: "nueva-carpeta/index.html",
    title: "Título de la Página",
    description: "Descripción para SEO",
    content: "contenido-pagina.html",
  },
];
```

### Agregar Archivo al Actualizador

Editar `scripts/update-all-html-files.js`:

```javascript
const HTML_FILES = [
  "index.html",
  "nueva-carpeta/index.html", // ← Agregar aquí
  // ... otros archivos
];
```

## 🔧 Personalización

### Modificar CSS Crítico

Los estilos críticos están definidos en las variables:

- `CRITICAL_CSS` (en ambos scripts)
- `css/critical.css` (archivo separado)

### Cambiar Metadata por Defecto

Editar las secciones de metadata en los scripts:

- Título por defecto
- Descripción por defecto
- URLs de imágenes
- Datos estructurados

## 🚨 Solución de Problemas

### Error: "Cannot find module"

```bash
# Asegúrate de estar en la carpeta correcta
cd scripts
node generate-optimized-pages.js
```

### Error: "File not found"

- Verificar que los archivos HTML existan
- Revisar las rutas en `HTML_FILES`

### Scripts no ejecutan

- Verificar que Node.js esté instalado
- Ejecutar desde la carpeta `scripts/`

## 📈 Optimizaciones Aplicadas

### CSS Crítico

- Variables CSS para temas
- Estilos de header y navegación
- Estilos de hero y botones
- Responsive design básico

### Preload de Recursos

- Google Fonts
- Font Awesome
- CSS principal
- Conexiones DNS

### Scripts Optimizados

- Carga con `defer`
- Script crítico inline
- Manejo de estados de carga

## 🎯 Mejores Prácticas

1. **Ejecutar scripts después de cambios importantes**
2. **Verificar que las rutas sean correctas**
3. **Probar en diferentes navegadores**
4. **Revisar el rendimiento con DevTools**

## 📞 Soporte

Para problemas con los scripts:

1. Revisar `docs/TROUBLESHOOTING.md`
2. Verificar `docs/SYSTEM_STATUS.md`
3. Consultar la documentación técnica en `docs/`
