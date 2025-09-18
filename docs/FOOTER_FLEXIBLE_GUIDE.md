# Guía del Footer Flexible - OZONO VIDA

## Configuraciones Disponibles

### 1. Footer Completo (3 secciones)

**Uso:** `<div class="container footer__grid">`

- ✅ Logo + Descripción
- ✅ Enlaces
- ✅ Redes Sociales

### 2. Footer Compacto (2 secciones)

**Uso:** `<div class="container footer__grid footer__grid--compact">`

- ❌ Logo oculto
- ✅ Enlaces
- ✅ Redes Sociales
- ✅ Centrado automáticamente

## Ejemplos de HTML

### Footer Completo

```html
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <a class="brand brand--footer" href="{{BASE_PATH}}index.html#inicio">
        <img
          src="{{BASE_PATH}}assets/images/ozono-vida.png"
          alt="OZONO VIDA Logo"
          class="brand__logo-img"
        />
        <span class="brand__text">OZONO VIDA</span>
      </a>
      <p>Ozonoterapia y medicina regenerativa para una vida sin dolor.</p>
    </div>
    <div class="footer__links-section">
      <h4>Enlaces</h4>
      <ul class="footer__links">
        <li><a href="{{BASE_PATH}}index.html#servicios">Servicios</a></li>
        <li><a href="{{BASE_PATH}}index.html#tratamientos">Tratamientos</a></li>
        <li><a href="{{BASE_PATH}}index.html#nosotros">Nosotros</a></li>
        <li><a href="{{BASE_PATH}}index.html#contacto">Contacto</a></li>
      </ul>
    </div>
    <div class="footer__social-section">
      <h4>Redes Sociales</h4>
      <div id="social-links-container">
        <!-- Las redes sociales se cargarán dinámicamente aquí -->
      </div>
    </div>
  </div>
  <div class="container footer__copy">
    <small
      >© <span id="year"></span> OZONO VIDA. Todos los derechos
      reservados.</small
    >
  </div>
</footer>
```

### Footer Compacto

```html
<footer class="footer">
  <div class="container footer__grid footer__grid--compact">
    <div class="footer__brand">
      <!-- Esta sección se oculta automáticamente -->
    </div>
    <div class="footer__links-section">
      <h4>Enlaces</h4>
      <ul class="footer__links">
        <li><a href="{{BASE_PATH}}index.html#servicios">Servicios</a></li>
        <li><a href="{{BASE_PATH}}index.html#tratamientos">Tratamientos</a></li>
        <li><a href="{{BASE_PATH}}index.html#nosotros">Nosotros</a></li>
        <li><a href="{{BASE_PATH}}index.html#contacto">Contacto</a></li>
      </ul>
    </div>
    <div class="footer__social-section">
      <h4>Redes Sociales</h4>
      <div id="social-links-container">
        <!-- Las redes sociales se cargarán dinámicamente aquí -->
      </div>
    </div>
  </div>
  <div class="container footer__copy">
    <small
      >© <span id="year"></span> OZONO VIDA. Todos los derechos
      reservados.</small
    >
  </div>
</footer>
```

## Responsive Behavior

### Desktop (>1024px)

- **Completo:** `1fr auto auto` (logo expansivo, secciones ajustadas)
- **Compacto:** `auto auto` centrado con gap de 4rem

### Tablet (768px)

- **Ambos:** Columna única, todo centrado

### Móvil (≤480px)

- **Ambos:** Columna única, elementos centrados, iconos táctiles

## Logo

- **Imagen:** `assets/images/ozono-vida.png`
- **Tamaño Desktop:** 40px x 40px
- **Tamaño Móvil:** 35px x 35px
- **Formato:** object-fit: contain

## Cuándo usar cada versión

- **Footer Completo:** Páginas principales (index.html)
- **Footer Compacto:** Páginas internas, servicios, tratamientos
