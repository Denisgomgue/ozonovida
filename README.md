# OZONO VIDA - Estructura del Proyecto

## 📁 Nueva Estructura Jerárquica Basada en Menú

```
STELLA MARIS/
├── index.html                    # Página principal
├── components/                   # Componentes reutilizables
│   ├── header.html              # Header completo reutilizable
│   ├── footer.html              # Footer completo reutilizable
│   └── page-template.html       # Template base para páginas
├── css/
│   └── styles.css              # Estilos principales
├── js/
│   ├── app.js                  # JavaScript principal
│   └── social-config.js        # Configuración de redes sociales
├── assets/                      # Recursos estáticos
│   └── README.txt
└── pages/                       # Páginas organizadas por niveles de menú
    ├── tratamientos/            # Nivel 1: Tratamientos
    │   ├── dolor/              # Nivel 2: Tratamiento de Dolor
    │   │   ├── index.html      # Página principal de dolor
    │   │   ├── hernias-discales.html
    │   │   ├── lumbalgia.html
    │   │   ├── cervicalgia.html
    │   │   ├── artrosis.html
    │   │   ├── artritis.html
    │   │   ├── tendinitis.html
    │   │   └── fibromialgia.html
    │   ├── enfermedades/        # Nivel 2: Tratamiento de Enfermedades
    │   │   ├── index.html      # Página principal de enfermedades
    │   │   ├── diabetes.html
    │   │   ├── hepatitis.html
    │   │   ├── colitis.html
    │   │   └── ...
    │   ├── estetica/           # Nivel 2: Estética
    │   │   ├── index.html      # Página principal de estética
    │   │   ├── rejuvenecimiento-facial.html
    │   │   ├── celulitis.html
    │   │   └── ...
    │   ├── infecciones/        # Nivel 2: Infecciones
    │   │   ├── index.html      # Página principal de infecciones
    │   │   ├── heridas-infectadas.html
    │   │   └── ...
    │   └── ginecologia/        # Nivel 2: Ginecología
    │       ├── index.html      # Página principal de ginecología
    │       ├── candidiasis.html
    │       └── ...
    └── aplicaciones/           # Nivel 1: Aplicaciones
        ├── index.html          # Página principal de aplicaciones
        ├── intramuscular/       # Nivel 2: Intramuscular
        │   └── index.html
        ├── intra-articular/     # Nivel 2: Intra articular
        │   └── index.html
        ├── auto-hemoterapia-menor/  # Nivel 2: Auto hemoterapia menor
        │   └── index.html
        ├── auto-hemoterapia-mayor/  # Nivel 2: Auto hemoterapia mayor
        │   └── index.html
        ├── sueros-ozonizados/   # Nivel 2: Sueros ozonizados
        │   └── index.html
        ├── bolsa-ozonisada/     # Nivel 2: Bolsa ozonisada
        │   └── index.html
        ├── insuflacion-rectal/  # Nivel 2: Insuflación rectal
        │   └── index.html
        └── embolsados/          # Nivel 2: Embolsados
            └── index.html
```

## 🎯 Beneficios de la Nueva Estructura

### ✅ **Organización Jerárquica**
- **Estructura basada en menú**: Cada nivel del menú tiene su propia carpeta
- **Navegación intuitiva**: URLs que reflejan la estructura del menú
- **Escalabilidad**: Fácil adición de nuevos niveles y subcategorías

### ✅ **Componentes Reutilizables**
- **Header unificado**: Un solo archivo `components/header.html` para todas las páginas
- **Footer consistente**: Un solo archivo `components/footer.html` para todas las páginas
- **Template base**: `components/page-template.html` para crear nuevas páginas
- **Mantenimiento simplificado**: Cambios en un solo lugar se aplican a todas las páginas

### ✅ **URLs Descriptivas**
- **Estructura clara**: `/pages/tratamientos/dolor/index.html`
- **SEO mejorado**: URLs que describen el contenido
- **Navegación lógica**: Fácil de entender para usuarios y motores de búsqueda

### ✅ **Desarrollo Eficiente**
- **Menos duplicación**: Componentes compartidos reducen código repetitivo
- **Mantenimiento centralizado**: Cambios de navegación en un solo archivo
- **Estructura predecible**: Patrón consistente para todas las páginas

## 🔗 Sistema de Enlaces

### **Rutas Relativas**
- **Profundidad 2**: `../../` para acceder a recursos desde subcarpetas
- **Navegación interna**: Enlaces relativos entre páginas del mismo nivel
- **Consistencia**: Mismo patrón de enlaces en toda la estructura

### **Componentes Dinámicos**
- **Carga automática**: JavaScript carga header y footer automáticamente
- **Actualización centralizada**: Cambios en componentes se reflejan en todas las páginas
- **Mantenimiento simplificado**: Un solo lugar para actualizar navegación

## 📋 Próximos Pasos

1. **Crear páginas faltantes**: Completar todas las páginas de aplicaciones
2. **Implementar componentes**: Usar el sistema de componentes en todas las páginas
3. **Optimizar enlaces**: Asegurar que todos los enlaces funcionen correctamente
4. **Testing**: Probar navegación en todas las páginas

## 🚀 Deployment

Esta estructura es compatible con:
- **Servidores web estáticos** (Apache, Nginx)
- **CDNs** y servicios de hosting
- **Plataformas de deployment** (Netlify, Vercel, GitHub Pages)
- **Sistemas de componentes** (para futuras migraciones)

---

*Estructura creada siguiendo principios de organización jerárquica y componentes reutilizables para máxima eficiencia de desarrollo y mantenimiento.*