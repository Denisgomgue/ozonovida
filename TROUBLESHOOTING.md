# Guía de Solución de Problemas - Sistema de Componentes

## Problemas Comunes y Soluciones

### 1. Los componentes no se cargan

**Síntomas:**
- La página se ve sin header/footer
- El título no cambia dinámicamente
- Errores en la consola del navegador

**Soluciones:**

#### Verificar rutas de scripts
Asegúrate de que las rutas de los scripts sean correctas según la profundidad de la página:

```html
<!-- Página raíz (/) -->
<script src="./js/metadata-config.js"></script>
<script src="./js/component-loader.js"></script>

<!-- Una carpeta (/pages/) -->
<script src="../js/metadata-config.js"></script>
<script src="../js/component-loader.js"></script>

<!-- Dos carpetas (/pages/tratamientos/) -->
<script src="../../js/metadata-config.js"></script>
<script src="../../js/component-loader.js"></script>

<!-- Tres carpetas (/pages/tratamientos/dolor/) -->
<script src="../../../js/metadata-config.js"></script>
<script src="../../../js/component-loader.js"></script>
```

#### Verificar archivos existentes
Asegúrate de que estos archivos existan:
- `js/metadata-config.js`
- `js/component-loader.js`
- `components/head.html`
- `components/header.html`
- `components/footer.html`

#### Usar la página de prueba
Abre `test-components.html` en tu navegador para verificar el estado del sistema.

### 2. Metadata incorrecta

**Síntomas:**
- El título de la página no es el correcto
- La descripción en redes sociales es incorrecta

**Soluciones:**

#### Verificar configuración en metadata-config.js
Asegúrate de que tu página esté configurada:

```javascript
const PAGE_METADATA = {
  'mi-pagina': {
    title: 'Mi Página',
    description: 'Descripción de mi página',
    url: 'https://stella-maris.example/pages/mi-pagina',
    image: 'https://images.unsplash.com/photo-xxxxx'
  }
};
```

#### Verificar lógica de identificación
El sistema identifica páginas por la URL. Revisa la función `getPageMetadata()` en `metadata-config.js`.

### 3. Rutas rotas en navegación

**Síntomas:**
- Los enlaces del menú no funcionan
- Las imágenes no se cargan
- Los estilos CSS no se aplican

**Soluciones:**

#### Verificar procesamiento de rutas
El sistema ajusta automáticamente las rutas. Si hay problemas, revisa:
- `processHeaderPaths()` en `component-loader.js`
- `processFooterPaths()` en `component-loader.js`

#### Verificar rutas en componentes
Asegúrate de que las rutas en `header.html` y `footer.html` sean relativas:

```html
<!-- Correcto -->
<link rel="stylesheet" href="../css/styles.css" />
<img src="../assets/logo.png" />

<!-- Incorrecto -->
<link rel="stylesheet" href="/css/styles.css" />
<img src="/assets/logo.png" />
```

### 4. Problemas de CORS

**Síntomas:**
- Errores de CORS en la consola
- Los componentes no se cargan desde archivos locales

**Soluciones:**

#### Usar un servidor local
No abras los archivos directamente en el navegador. Usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con Live Server (VS Code extension)
# Instala la extensión "Live Server" y haz clic derecho en el archivo HTML
```

#### Verificar URLs de fetch
El sistema usa `fetch()` para cargar componentes. Asegúrate de que las URLs sean correctas.

### 5. Debugging

**Herramientas de debugging:**

#### Consola del navegador
Abre las herramientas de desarrollador (F12) y revisa la consola para errores.

#### Verificar estado del sistema
Usa la página `test-components.html` para verificar el estado de los componentes.

#### Logs del sistema
El sistema ahora incluye logs detallados:
- "Initializing components..."
- "Metadata functions available, creating ComponentLoader"
- "Head component loaded successfully"
- "Header component loaded successfully"
- "Footer component loaded successfully"

### 6. Estructura de archivos correcta

```
STELLA MARIS/
├── components/
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── page-template.html
├── js/
│   ├── metadata-config.js
│   ├── component-loader.js
│   └── app.js
├── pages/
│   ├── aplicaciones/
│   │   └── index.html
│   └── tratamientos/
│       ├── dolor/
│       │   └── index.html
│       └── enfermedades/
│           └── index.html
├── test-components.html
└── index.html
```

### 7. Comandos de verificación

#### Verificar que los archivos existen
```bash
# En la raíz del proyecto
ls -la js/
ls -la components/
ls -la pages/
```

#### Verificar contenido de archivos
```bash
# Verificar que los scripts tienen contenido
head -5 js/metadata-config.js
head -5 js/component-loader.js
head -5 components/head.html
```

### 8. Contacto para soporte

Si sigues teniendo problemas:
1. Revisa la consola del navegador para errores específicos
2. Usa `test-components.html` para diagnosticar el problema
3. Verifica que todos los archivos estén en su lugar
4. Asegúrate de usar un servidor local, no archivos locales
