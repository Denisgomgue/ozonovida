# Arquitectura CSS - OZONO VIDA

## 📁 Estructura Propuesta

```
css/
├── main.css              # Archivo principal que importa todo
├── base/
│   ├── reset.css         # Reset/normalize
│   ├── variables.css     # Variables CSS (colores, fuentes, etc.)
│   ├── typography.css    # Tipografía base
│   └── utilities.css     # Clases utilitarias
├── components/
│   ├── header.css        # Estilos del header
│   ├── footer.css        # Estilos del footer
│   ├── buttons.css       # Todos los botones
│   ├── cards.css         # Componente card
│   ├── modals.css        # Modales
│   ├── forms.css         # Formularios
│   └── navigation.css    # Navegación y menús
├── layout/
│   ├── grid.css          # Sistema de grid
│   ├── containers.css    # Contenedores
│   └── sections.css      # Secciones generales
├── pages/
│   ├── home.css          # Estilos específicos del home
│   ├── services.css      # Estilos base para páginas de servicios
│   ├── ozonoterapia.css  # Estilos específicos de ozonoterapia
│   ├── plasma.css        # Estilos específicos de plasma
│   └── medicina-regenerativa.css
└── themes/
    ├── light.css         # Tema claro
    └── dark.css          # Tema oscuro
```

## 🔧 Ventajas de esta Estructura

1. **Mantenibilidad**: Cada archivo tiene un propósito específico
2. **Escalabilidad**: Fácil agregar nuevos componentes/páginas
3. **Reutilización**: Componentes reutilizables entre páginas
4. **Colaboración**: Múltiples desarrolladores pueden trabajar sin conflictos
5. **Performance**: Carga solo los estilos necesarios por página

## 📋 Plan de Migración

### Fase 1: Extraer Variables y Base

- Mover todas las variables CSS a `base/variables.css`
- Extraer reset y estilos base

### Fase 2: Componentizar

- Separar componentes reutilizables (header, footer, buttons, etc.)

### Fase 3: Páginas Específicas

- Crear archivos CSS específicos para cada servicio
- Mantener solo estilos únicos en cada archivo

### Fase 4: Optimización

- Implementar carga condicional de CSS por página
- Minimizar y comprimir archivos para producción
