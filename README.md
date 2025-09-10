# OZONO VIDA - Sitio Web Médico

Sitio web profesional para OZONO VIDA, centro médico especializado en ozonoterapia y medicina regenerativa.

## 🚀 Inicio Rápido

### Requisitos

- Node.js (para scripts de automatización)
- Servidor web local (Python, Node.js, etc.)

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd ozonovida

# Servir localmente
python -m http.server 8000
# o
npx serve .
```

## 📁 Estructura del Proyecto

```
ozonovida/
├── 📁 css/                    # Estilos CSS
│   ├── styles.css            # Estilos principales
│   └── critical.css          # CSS crítico
├── 📁 js/                     # Scripts JavaScript
│   ├── app.js                # Aplicación principal
│   ├── metadata-config.js    # Configuración de metadata
│   ├── component-loader.js   # Cargador de componentes
│   └── optimized-component-loader.js # Cargador optimizado
├── 📁 components/             # Componentes reutilizables
│   ├── head.html             # Head dinámico
│   ├── header.html           # Navegación
│   ├── footer.html           # Pie de página
│   └── ui-components.html    # Botones de acción
├── 📁 pages/                  # Páginas principales
│   └── tratamientos/         # Páginas de tratamientos
├── 📁 tratamientos/          # Páginas específicas de tratamientos
├── 📁 aplicaciones/          # Páginas de aplicaciones
├── 📁 assets/                # Recursos estáticos
├── 📁 scripts/               # Scripts de automatización
│   ├── README.md             # Documentación de scripts
│   ├── generate-optimized-pages.js    # Generador de páginas
│   └── update-all-html-files.js       # Actualizador masivo
├── 📁 docs/                  # Documentación técnica
│   ├── README.md             # Documentación principal
│   ├── SYSTEM_STATUS.md      # Estado del sistema
│   ├── TROUBLESHOOTING.md    # Solución de problemas
│   ├── COMPONENT_SYSTEM.md   # Sistema de componentes
│   └── *.md                  # Otra documentación
├── run-script.js             # Script de conveniencia
└── index.html                # Página principal
```

## 🛠️ Scripts de Automatización

### Opción 1: Script de Conveniencia (Recomendado)

```bash
# Generar páginas optimizadas
node run-script.js generate

# Actualizar archivos HTML existentes
node run-script.js update

# Ver ayuda
node run-script.js help
```

### Opción 2: Ejecución Directa

```bash
# Generar páginas optimizadas
cd scripts
node generate-optimized-pages.js

# Actualizar archivos HTML existentes
cd scripts
node update-all-html-files.js
```

### Documentación de Scripts

Ver `scripts/README.md` para documentación detallada de los scripts.

## 🎯 Características Principales

- ✅ **CSS Crítico Inline** - Elimina FOUC (Flash of Unstyled Content)
- ✅ **Carga Paralela** - Componentes cargan simultáneamente
- ✅ **Preload Optimizado** - Recursos críticos precargados
- ✅ **Sistema de Componentes** - Arquitectura modular
- ✅ **Responsive Design** - Adaptable a todos los dispositivos
- ✅ **SEO Optimizado** - Metadata dinámica y structured data
- ✅ **Tema Claro/Oscuro** - Cambio de tema persistente

## 📱 Páginas Disponibles

- **Inicio** (`index.html`) - Página principal
- **Tratamientos** (`pages/tratamientos/`) - Tratamientos médicos
- **Ginecología** (`tratamientos/ginecologia/`) - Tratamientos ginecológicos
- **Aplicaciones** (`aplicaciones/`) - Aplicaciones de ozonoterapia

## 🔧 Desarrollo

### Agregar Nueva Página

1. Crear archivo HTML en la carpeta correspondiente
2. Usar el template de componentes:
   ```html
   <div id="header-placeholder"></div>
   <div id="footer-placeholder"></div>
   <div id="ui-components-placeholder"></div>
   ```
3. Ejecutar script de actualización

### Modificar Componentes

- **Header:** `components/header.html`
- **Footer:** `components/footer.html`
- **UI Components:** `components/ui-components.html`

## 📚 Documentación

Ver carpeta `docs/` para documentación técnica detallada:

- `SYSTEM_STATUS.md` - Estado actual del sistema
- `TROUBLESHOOTING.md` - Guía de solución de problemas
- `COMPONENT_SYSTEM.md` - Sistema de componentes
- `RESPONSIVE_IMPROVEMENTS.md` - Mejoras responsivas

## 🌐 Despliegue

El sitio es estático y puede desplegarse en cualquier servidor web:

- GitHub Pages
- Netlify
- Vercel
- Servidor tradicional

## 📞 Contacto

**OZONO VIDA Centro Médico**

- 📍 Av. Villón, frente a la Dirección Víctor Ramos Guardia
- 📱 +51 999 999 999
- 🌐 [Sitio Web](https://stella-maris.example)

---

_Desarrollado con tecnologías web modernas para una experiencia óptima del usuario._
