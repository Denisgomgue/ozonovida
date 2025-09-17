# 📋 Guía del Sistema de Head Optimizado - OZONO VIDA

## 🎯 **Problema Resuelto**

Antes teníamos metadatos duplicados, inconsistencias entre páginas y elementos que se repetían innecesariamente. Ahora tenemos un sistema limpio y organizado.

## 🏗️ **Nueva Arquitectura**

### **1. Elementos Base (Nunca Cambian)**

```html
<!-- Estos elementos son IGUALES en todas las páginas -->
- charset, viewport - CSS crítico y preloads - Favicons - Preconnects - Meta
tags básicos (author, robots, etc.) - Idioma y región - Theme color - Datos
estructurados base
```

### **2. Elementos Dinámicos (Cambian por Página)**

```html
<!-- Estos elementos son ESPECÍFICOS de cada página -->
- Title - Meta description - Meta keywords - Open Graph tags - Twitter Cards -
Canonical URL - Structured data específico
```

## 📁 **Archivos del Sistema**

### **components/head-base.html**

Elementos que nunca cambian. Usar para crear nuevas páginas.

### **components/head-dynamic.html**

Template para elementos que cambian. Usar como referencia.

### **js/metadata-pages.js**

Configuración centralizada de metadatos por página.

## 🔧 **Cómo Usar el Sistema**

### **Para Crear una Nueva Página:**

1. **Copiar estructura base:**

```html
<!DOCTYPE html>
<html lang="es" data-theme="light">
  <head>
    <!-- Head Base - Elementos que nunca cambian -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- CSS Crítico (siempre primero) -->
    <link rel="stylesheet" href="./css/critical.css" />

    <!-- [Resto de elementos base] -->

    <!-- Head Dinámico - Específico de esta página -->
    <title>TU_TÍTULO • OZONO VIDA</title>
    <meta name="description" content="TU_DESCRIPCIÓN" />
    <meta name="keywords" content="TUS_KEYWORDS" />

    <!-- [Resto de elementos dinámicos] -->
  </head>
</html>
```

2. **Personalizar elementos dinámicos:**

   - Cambiar título específico
   - Actualizar description
   - Ajustar keywords
   - Modificar imagen OG
   - Actualizar URL canonical
   - Personalizar structured data si es necesario

3. **Agregar configuración en metadata-pages.js:**

```javascript
'nueva-pagina': {
  title: 'Tu Página • OZONO VIDA',
  description: 'Descripción específica...',
  keywords: 'keyword1, keyword2, keyword3',
  image: 'https://imagen-especifica.jpg',
  url: 'https://ozonovida.netlify.app/nueva-pagina.html'
}
```

## ✅ **Cambios Implementados**

### **✅ Limpieza Realizada:**

- ❌ Eliminadas referencias a "stella_maris_medical"
- ✅ Cambiadas por "@ozonovida"
- ✅ URLs actualizadas correctamente
- ✅ Datos de contacto unificados (+51 988 126 804)
- ✅ Email actualizado (contacto@ozonovida.pe)

### **✅ Estandarización:**

- ✅ Theme color unificado (#215096)
- ✅ Favicons estandarizados
- ✅ Structured data mejorado
- ✅ Meta tags optimizados

### **✅ Archivos Actualizados:**

- ✅ `index.html` - Página principal
- ✅ `servicios/ozonoterapia.html` - Página de servicio
- ✅ Nuevos archivos de sistema creados

## 🚀 **Próximos Pasos**

### **1. Aplicar a Páginas Restantes:**

- [ ] `tratamientos/index.html`
- [ ] Otras páginas de servicios
- [ ] Páginas de tratamientos específicos

### **2. Validación:**

- [ ] Probar metadatos en Facebook Debugger
- [ ] Validar Twitter Cards
- [ ] Verificar structured data con Google

### **3. Optimización:**

- [ ] Implementar carga condicional de CSS
- [ ] Optimizar imágenes OG específicas
- [ ] Agregar más páginas al metadata-pages.js

## 📊 **Beneficios del Nuevo Sistema**

| Aspecto           | Antes                   | Después               |
| ----------------- | ----------------------- | --------------------- |
| **Consistencia**  | Metadatos diferentes    | Estructura unificada  |
| **Mantenimiento** | Cambiar en cada archivo | Cambiar en un lugar   |
| **SEO**           | Metadatos básicos       | Metadatos optimizados |
| **Performance**   | CSS duplicado           | CSS optimizado        |
| **Escalabilidad** | Difícil agregar páginas | Sistema escalable     |

## 🔍 **Verificación Rápida**

Para verificar que todo funciona:

1. **Abrir página en navegador**
2. **Ver código fuente**
3. **Verificar:**
   - ✅ Title correcto
   - ✅ Meta description presente
   - ✅ No duplicados
   - ✅ URLs correctas
   - ✅ No referencias a stella_maris

## 📞 **Datos Actualizados**

- **Teléfono:** +51 988 126 804
- **Email:** contacto@ozonovida.pe
- **Social:** @ozonovida
- **URL:** https://ozonovida.netlify.app
- **Dirección:** Av. Villón, frente a la Dirección Víctor Ramos Guardia
