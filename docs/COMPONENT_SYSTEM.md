# Sistema de Componentes Dinámicos - OZONO VIDA

## Descripción
Sistema modular para manejar componentes compartidos (header, footer, head) y metadata dinámica en todas las páginas del sitio web.

## Archivos del Sistema

### 1. Componentes (`components/`)
- **`head.html`**: Componente con metadata dinámica (título, descripción, Open Graph, etc.)
- **`header.html`**: Navegación principal del sitio
- **`footer.html`**: Pie de página con enlaces y redes sociales
- **`ui-components.html`**: Botones de acción globales (subir arriba, cambiar tema)
- **`page-template.html`**: Plantilla base para nuevas páginas

### 2. Scripts (`js/`)
- **`metadata-config.js`**: Configuración de metadata para cada página
- **`component-loader-independent.js`**: Sistema de carga dinámica de componentes (versión independiente)

## Cómo Usar el Sistema

### Crear una Nueva Página

1. **Copia la plantilla base**:
```html
<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <!-- Head Component será cargado dinámicamente -->
  <div id="head-placeholder"></div>
</head>
<body>
  <a href="#inicio" class="skip-link">Saltar al contenido</a>

  <!-- Header Component -->
  <div id="header-placeholder"></div>

  <main>
    <!-- Tu contenido aquí -->
  </main>

  <!-- UI Components (botones de acción) -->
  <div id="ui-components-placeholder"></div>

  <!-- Footer Component -->
  <div id="footer-placeholder"></div>

  <!-- Scripts del sistema de componentes -->
  <script src="../js/metadata-config.js"></script>
  <script src="../js/component-loader-independent.js"></script>
  <script src="../js/app.js"></script>
</body>
</html>
```

2. **Ajusta las rutas de los scripts** según la profundidad de tu página:
   - Página raíz (`/`): `./js/`
   - Una carpeta (`/pages/`): `../js/`
   - Dos carpetas (`/pages/tratamientos/`): `../../js/`
   - Tres carpetas (`/pages/tratamientos/dolor/`): `../../../js/`

### Configurar Metadata de la Página

Edita `js/metadata-config.js` y agrega tu página:

```javascript
const PAGE_METADATA = {
  // ... páginas existentes ...
  
  'mi-nueva-pagina': {
    title: 'Mi Nueva Página',
    description: 'Descripción de mi nueva página para SEO',
    url: 'https://stella-maris.example/pages/mi-nueva-pagina',
    image: 'https://images.unsplash.com/photo-xxxxx'
  }
};
```

### Identificación Automática de Páginas

El sistema identifica automáticamente la página basándose en la URL:

- `/` → `index`
- `/pages/tratamientos/dolor` → `tratamientos-dolor`
- `/pages/aplicaciones/intramuscular` → `aplicaciones-intramuscular`

## Estructura de Metadata

Cada página debe tener:

```javascript
{
  title: 'Título de la página',
  description: 'Descripción para SEO y redes sociales',
  url: 'URL completa de la página',
  image: 'URL de imagen para redes sociales'
}
```

## Placeholders Disponibles

En `components/head.html` puedes usar:

- `{{PAGE_TITLE}}` - Título de la página
- `{{PAGE_DESCRIPTION}}` - Descripción de la página
- `{{PAGE_URL}}` - URL de la página
- `{{PAGE_IMAGE}}` - Imagen de la página
- `{{BASE_PATH}}` - Ruta base según profundidad

## Ventajas del Sistema

1. **Consistencia**: Todos los componentes se mantienen sincronizados
2. **SEO Optimizado**: Metadata dinámica para cada página
3. **Mantenimiento Fácil**: Cambios en header/footer se aplican automáticamente
4. **Escalable**: Fácil agregar nuevas páginas
5. **Rutas Inteligentes**: Ajuste automático de rutas según profundidad
6. **UI Global**: Botones de acción (subir arriba, cambiar tema) disponibles en todas las páginas

## Ejemplos de Uso

### Página de Tratamiento
```html
<!-- pages/tratamientos/dolor/index.html -->
<main>
  <section class="hero">
    <h1>Tratamiento del Dolor</h1>
    <!-- contenido específico -->
  </section>
</main>
```

### Página de Aplicación
```html
<!-- pages/aplicaciones/intramuscular/index.html -->
<main>
  <section class="hero">
    <h1>Aplicación Intramuscular</h1>
    <!-- contenido específico -->
  </section>
</main>
```

## Troubleshooting

### Los componentes no se cargan
- Verifica que las rutas de los scripts sean correctas
- Asegúrate de que `metadata-config.js` esté cargado antes que `component-loader.js`

### Metadata incorrecta
- Verifica que la página esté configurada en `PAGE_METADATA`
- Revisa la lógica de identificación de páginas en `getPageMetadata()`

### Rutas rotas en navegación
- El sistema ajusta automáticamente las rutas según la profundidad
- Si hay problemas, revisa la función `processHeaderPaths()` y `processFooterPaths()`
