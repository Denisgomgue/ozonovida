# 🎨 Sistema de Diseño para Páginas de Servicios - OZONO VIDA

## 🎯 **Diseño Visual Estandarizado**

Todas las páginas de servicios siguen exactamente el mismo patrón visual para mantener consistencia y profesionalismo.

## 📐 **Componentes Estándar**

### **1. 📋 Sección de Introducción**

```
┌─────────────────────────────────────────────────────────┐
│                ¿Qué es la [Servicio]?                  │
├─────────────────────────┬───────────────────────────────┤
│ [Subtítulo]             │                               │
│                         │     ┌─────────────────────┐   │
│ [Descripción párrafo 1] │     │                     │   │
│                         │     │    ▶ Video         │   │
│ [Descripción párrafo 2] │     │    Explicativo     │   │
│                         │     │                     │   │
│ ✓ Beneficio 1           │     │ Descubre cómo       │   │
│ ✓ Beneficio 2           │     │ funciona...         │   │
│ ✓ Beneficio 3           │     │                     │   │
│ ✓ Beneficio 4           │     └─────────────────────┘   │
│ ✓ Beneficio 5           │                               │
└─────────────────────────┴───────────────────────────────┘
```

**Características:**

- ✅ Layout de 2 columnas (60% texto, 40% video)
- ✅ Checkmarks azules en círculos
- ✅ Video placeholder con gradiente azul
- ✅ Botón de play circular con borde blanco

### **2. 🔧 Sección de Métodos de Aplicación**

```
┌─────────────────────────────────────────────────────────┐
│                Métodos de Aplicación                   │
├─────────────┬─────────────┬─────────────┬─────────────┤
│     🔵      │     🔵      │     🔵      │     🔵      │
│   Método 1  │   Método 2  │   Método 3  │   Método 4  │
│             │             │             │             │
│ Descripción │ Descripción │ Descripción │ Descripción │
├─────────────┼─────────────┼─────────────┼─────────────┤
│     🔵      │     🔵      │             │             │
│   Método 5  │   Método 6  │             │             │
│             │             │             │             │
│ Descripción │ Descripción │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Características:**

- ✅ Grid responsive (3-4 columnas en desktop, 1 en móvil)
- ✅ Iconos circulares azules (80px)
- ✅ Cards blancas con sombra sutil
- ✅ Línea azul superior que aparece en hover
- ✅ Efectos de hover suaves

## 🎨 **Especificaciones de Diseño**

### **Colores:**

- **Azul Principal:** `#215096` (var(--corporate-blue))
- **Azul Claro:** `#64b2e7` (var(--corporate-blue-light))
- **Fondo Cards:** `#ffffff` (white)
- **Texto Principal:** `#1e293b` (var(--corporate-text-dark))
- **Texto Secundario:** `#64748b` (var(--corporate-text-muted))

### **Espaciado:**

- **Gap entre cards:** `1.5rem`
- **Padding cards:** `2rem`
- **Margen iconos:** `1.5rem bottom`
- **Gap beneficios:** `1rem`

### **Tipografía:**

- **Títulos sección:** `2.5rem`, peso 700
- **Títulos cards:** `1.2rem`, peso 600
- **Descripciones:** `0.95rem`, línea 1.5
- **Beneficios:** `0.95rem`, peso 500

### **Efectos:**

- **Hover cards:** `translateY(-5px)`
- **Hover iconos:** `scale(1.1)`
- **Transiciones:** `0.3s ease`
- **Sombras:** Progresivas de sutil a prominente

## 📁 **Archivos del Sistema**

### **CSS:**

- `css/service-pages.css` - Estilos específicos para servicios
- `css/styles.css` - Estilos generales (ya incluye los nuevos)

### **Templates:**

- `components/service-page-template.html` - Template base
- `docs/SERVICE_PAGES_VARIABLES.md` - Variables por servicio

## 🔧 **Implementación**

### **Para usar en una página de servicio:**

1. **Incluir CSS específico:**

```html
<link rel="stylesheet" href="../css/service-pages.css" />
```

2. **Usar las clases correctas:**

```html
<!-- Introducción -->
<div class="intro-grid">
  <div class="intro-content">
    <!-- Texto y beneficios -->
  </div>
  <div class="video-section">
    <!-- Video placeholder -->
  </div>
</div>

<!-- Métodos -->
<div class="service-methods-grid">
  <article class="service-method-card">
    <div class="service-method-icon">
      <i class="fa-solid fa-syringe"></i>
    </div>
    <h3>Método</h3>
    <p>Descripción</p>
  </article>
</div>
```

## ✅ **Estado de Implementación**

### **✅ Completado:**

- ✅ **Ozonoterapia:** Diseño estándar implementado
- ✅ **CSS Base:** Estilos reutilizables creados
- ✅ **Template:** Base para nuevas páginas
- ✅ **Documentación:** Guías y variables

### **⏳ Pendiente:**

- ⏳ **Plasma Rico en Plaquetas:** Crear página
- ⏳ **Medicina Regenerativa:** Crear página
- ⏳ **Cóctel de Vida:** Crear página

## 🚀 **Beneficios del Sistema**

- **Consistencia Visual:** Todas las páginas se ven profesionales e iguales
- **Mantenibilidad:** Un solo CSS para todas las páginas de servicios
- **Responsive:** Se adapta perfectamente a todos los dispositivos
- **Escalabilidad:** Fácil agregar nuevos servicios
- **Performance:** CSS optimizado y reutilizable

## 📱 **Responsive Breakpoints**

- **Desktop:** `1200px+` - Grid de 3-4 columnas
- **Tablet:** `768px-1199px` - Grid de 2 columnas
- **Móvil:** `<768px` - Grid de 1 columna
- **Móvil pequeño:** `<480px` - Iconos y texto más pequeños
