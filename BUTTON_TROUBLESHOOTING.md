# Guía de Solución de Problemas - Botones de Acción

## Problemas Comunes con los Botones

### 1. Botón "Subir Arriba" no aparece

**Síntomas:**
- El botón de cambiar tema aparece pero el de subir arriba no
- No hay botón visible en la esquina inferior derecha

**Soluciones:**

#### Verificar que el componente se cargó
```javascript
// En la consola del navegador
console.log(document.getElementById('to-top'));
```

#### Verificar estilos CSS
El botón necesita la clase `is-visible` para mostrarse:
```css
.to-top.is-visible { 
  opacity: 1; 
  visibility: visible; 
  transform: translateY(0); 
}
```

#### Verificar scroll
El botón solo aparece cuando `window.scrollY > 600`. Haz scroll hacia abajo para verlo.

### 2. Botón "Cambiar Tema" no funciona

**Síntomas:**
- El botón aparece pero no cambia el tema al hacer clic
- El icono no cambia entre sol y luna

**Soluciones:**

#### Verificar que el evento se registró
```javascript
// En la consola del navegador
const themeButton = document.getElementById('theme-toggle');
console.log(themeButton);
```

#### Verificar localStorage
```javascript
// Verificar tema guardado
console.log(localStorage.getItem('theme'));
```

#### Verificar atributo data-theme
```javascript
// Verificar tema actual del HTML
console.log(document.documentElement.getAttribute('data-theme'));
```

### 3. Los botones no se cargan

**Síntomas:**
- No aparecen los botones en ninguna página
- Errores en la consola sobre fetch

**Soluciones:**

#### Verificar archivo ui-components.html
Asegúrate de que existe: `components/ui-components.html`

#### Verificar rutas de scripts
Las rutas deben ser correctas según la profundidad de la página:
- Página raíz: `./js/`
- Una carpeta: `../js/`
- Dos carpetas: `../../js/`
- Tres carpetas: `../../../js/`

#### Usar página de prueba
Abre `test-buttons.html` para diagnosticar problemas específicos.

### 4. Conflictos con app.js

**Síntomas:**
- Los botones aparecen pero no funcionan
- Errores de "Cannot read property of null"

**Soluciones:**

#### Verificar orden de scripts
```html
<script src="../js/metadata-config.js"></script>
<script src="../js/component-loader.js"></script>
<script src="../js/app.js"></script>
```

#### Verificar logs de consola
Busca estos mensajes:
- "UI components loaded successfully"
- "To-top button initialized"
- "Theme toggle button initialized"

### 5. Debugging Avanzado

#### Verificar estado completo del sistema
```javascript
// En la consola del navegador
console.log('=== Estado del Sistema de Componentes ===');
console.log('To-top button:', document.getElementById('to-top'));
console.log('Theme toggle:', document.getElementById('theme-toggle'));
console.log('Theme icon:', document.getElementById('theme-icon'));
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('Saved theme:', localStorage.getItem('theme'));
console.log('Scroll position:', window.scrollY);
```

#### Forzar reinicialización
```javascript
// Si los botones no funcionan, fuerza la reinicialización
if (window.ComponentLoader) {
  const loader = new ComponentLoader();
  loader.initializeUIComponents();
}
```

### 6. Soluciones por Página

#### Página raíz (index.html)
```html
<!-- Scripts -->
<script src="./js/metadata-config.js"></script>
<script src="./js/component-loader.js"></script>
<script src="./js/app.js"></script>
```

#### Páginas en /pages/
```html
<!-- Scripts -->
<script src="../js/metadata-config.js"></script>
<script src="../js/component-loader.js"></script>
<script src="../js/app.js"></script>
```

#### Páginas en /pages/tratamientos/
```html
<!-- Scripts -->
<script src="../../js/metadata-config.js"></script>
<script src="../../js/component-loader.js"></script>
<script src="../../js/app.js"></script>
```

#### Páginas en /pages/tratamientos/dolor/
```html
<!-- Scripts -->
<script src="../../../js/metadata-config.js"></script>
<script src="../../../js/component-loader.js"></script>
<script src="../../../js/app.js"></script>
```

### 7. Verificación Final

Para verificar que todo funciona:

1. **Abre la consola del navegador** (F12)
2. **Busca estos mensajes:**
   - "UI components loaded successfully"
   - "To-top button initialized"
   - "Theme toggle button initialized"
3. **Haz scroll hacia abajo** - el botón de subir arriba debe aparecer
4. **Haz clic en el botón de tema** - debe cambiar entre sol y luna
5. **Verifica que el tema se guarda** - recarga la página y debe mantener el tema

### 8. Contacto para Soporte

Si sigues teniendo problemas:
1. Usa `test-buttons.html` para diagnóstico específico
2. Revisa la consola para errores específicos
3. Verifica que todos los archivos estén en su lugar
4. Asegúrate de usar un servidor local (no archivos locales)
