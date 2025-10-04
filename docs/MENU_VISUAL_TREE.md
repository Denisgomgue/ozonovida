# 🌳 DIAGRAMA VISUAL DEL MENÚ - OZONO VIDA

## 📋 Estructura Jerárquica Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                        HEADER NAVIGATION                        │
└─────────────────────────────────────────────────────────────────┘
│
├── 📄 Servicios
│
├── 🏥 Tratamientos
│   │
│   ├── 🔴 Tratamiento de Dolor
│   │   │
│   │   ├── 🎯 Dolores
│   │   │   │
│   │   │   ├── 🧠 Cabeza
│   │   │   ├── 🦴 Cuello
│   │   │   ├── 💪 Hombros
│   │   │   ├── 🦴 Espalda
│   │   │   ├── 🦴 Codo
│   │   │   ├── 🦴 Columnas
│   │   │   ├── ✋ Manos
│   │   │   ├── 🦴 Cadera
│   │   │   ├── 🦵 Muslo
│   │   │   ├── 🦵 Rodillas
│   │   │   ├── 🦶 Tobillos
│   │   │   ├── 🦶 Pies
│   │   │   └── 🦶 Planta de los pies
│   │   │
│   │   ├── 🦴 Artrosis
│   │   │   │
│   │   │   ├── 💪 Hombro
│   │   │   ├── 🦴 Cadera
│   │   │   └── 🦵 Rodilla
│   │   │
│   │   ├── 🦴 Hernias Discales
│   │   ├── 🦴 Lumbalgia
│   │   ├── 🦴 Cervicalgia
│   │   ├── 🦴 Artritis
│   │   ├── 🦴 Tendinitis
│   │   ├── 🦴 Fibromialgia
│   │   ├── 🦴 Ciatalgia
│   │   ├── ✋ Túnel carpiano
│   │   ├── 🦴 Escoliosis
│   │   ├── 🦶 Espolón calcáneo
│   │   └── 🦶 Fascitis plantar
│   │
│   ├── 🦠 Tratamiento de Enfermedades
│   │   │
│   │   ├── 🩸 Diabetes Mellitus
│   │   ├── 🫀 Insuficiencia Vascular
│   │   ├── 🫀 Hepatitis Crónica
│   │   ├── 🫀 Colitis Ulcerosa
│   │   ├── 🫀 Enfermedad de Crohn
│   │   ├── 🫀 Varices
│   │   ├── 🫀 Prostatitis
│   │   ├── 🫀 Gota
│   │   ├── 🫀 Gastritis
│   │   ├── 🧠 Cefaleas y Migrañas
│   │   └── 🫀 Lupus eritematoso
│   │
│   ├── 💅 Estética
│   │   │
│   │   ├── ✨ Rejuvenecimiento Facial
│   │   ├── ✨ Celulitis
│   │   ├── ✨ Úlceras Crónicas y Varicosas
│   │   └── ✨ Acné
│   │
│   ├── 🦠 Infecciones
│   │   │
│   │   ├── 🩹 Heridas Infectadas
│   │   ├── 🦶 Pie Diabético
│   │   └── 🩹 Úlceras Varicosas
│   │
│   └── 👩 Ginecología
│       │
│       ├── 🦠 Candidiasis
│       ├── 🦠 Vaginitis
│       ├── 🦠 Virus de Papiloma Humano
│       ├── 🦠 Endometriosis
│       └── 🦠 Post Cesárea
│
├── 💉 Aplicaciones
│   │
│   ├── 💉 Intramuscular
│   ├── 💉 Intraarticular
│   ├── 💉 Auto hemoterapia menor
│   ├── 💉 Auto hemoterapia mayor
│   ├── 💉 Sueros ozonizados
│   ├── 💉 Bolsa ozonisada
│   ├── 💉 Insuflación rectal
│   └── 💉 Embolsados
│
├── 💬 Testimonios
├── 📞 Contacto
├── 👥 Nosotros
└── 🎯 Reservar
```

---

## 🎯 Diagrama de Flujo de Navegación

```
                    ┌─────────────────┐
                    │   USUARIO       │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Click en        │
                    │ "Tratamientos"  │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Se abre         │
                    │ Dropdown        │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Click en        │
                    │ "Tratamiento    │
                    │ de Dolor"       │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Se abre         │
                    │ Submenú         │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Click en        │
                    │ "Artrosis"      │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Se abre         │
                    │ Sub-submenú     │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Click en        │
                    │ "Rodilla"       │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Navega a        │
                    │ Página de       │
                    │ Artrosis        │
                    │ Rodilla         │
                    └─────────────────┘
```

---

## 🎯 Diagrama de Estados

```
ESTADO CERRADO:
┌─────────────────┐
│ Tratamientos ▼  │
└─────────────────┘

ESTADO ABIERTO (Nivel 2):
┌─────────────────┐
│ Tratamientos ▲  │
├─────────────────┤
│ • Tratamiento   │
│   de Dolor +    │
│ • Tratamiento   │
│   de Enfermed. +│
│ • Estética +    │
│ • Infecciones + │
│ • Ginecología + │
└─────────────────┘

ESTADO ABIERTO (Nivel 3):
┌─────────────────┐
│ Tratamientos ▲  │
├─────────────────┤
│ • Tratamiento   │
│   de Dolor ▲    │
│   ├ Dolores +   │
│   ├ Artrosis +  │
│   ├ Hernias...  │
│   └ ...         │
│ • Tratamiento   │
│   de Enfermed. +│
│ • Estética +    │
│ • Infecciones + │
│ • Ginecología + │
└─────────────────┘

ESTADO ABIERTO (Nivel 4):
┌─────────────────┐
│ Tratamientos ▲  │
├─────────────────┤
│ • Tratamiento   │
│   de Dolor ▲    │
│   ├ Dolores +   │
│   ├ Artrosis ▲  │
│   │  ├ Hombro   │
│   │  ├ Cadera   │
│   │  └ Rodilla  │
│   ├ Hernias...  │
│   └ ...         │
│ • Tratamiento   │
│   de Enfermed. +│
│ • Estética +    │
│ • Infecciones + │
│ • Ginecología + │
└─────────────────┘
```

---

## 🎯 Diagrama de Responsabilidad

```
DESKTOP (>1024px):
┌─────────────────┐
│ Hover → Expand  │
│ Click → Mantener│
└─────────────────┘

MOBILE (≤1024px):
┌─────────────────┐
│ Click → Toggle  │
│ (Expand/Close)  │
└─────────────────┘
```

---

## 🎯 Diagrama de CSS Classes

```
.nav__links
├── .dropdown
│   ├── .dropdown__trigger
│   └── .dropdown__menu
│       ├── .dropdown__item
│       │   ├── .dropdown__link
│       │   └── .dropdown__submenu
│       │       ├── .dropdown__item
│       │       │   ├── .dropdown__link
│       │       │   └── .dropdown__submenu
│       │       │       └── .dropdown__item
│       │       └── .dropdown__item
│       └── .dropdown__item
└── .dropdown
    ├── .dropdown__trigger
    └── .dropdown__menu
        └── .dropdown__item
```

---

## 🎯 Diagrama de IDs

```
IDs únicos:
├── submenu-tratamientos
├── submenu-aplicaciones
├── submenu-dolor
├── submenu-enfermedades
├── submenu-estetica
├── submenu-infecciones
├── submenu-ginecologia
├── submenu-dolores
└── submenu-artrosis
```

---

## 🎯 Diagrama de Iconos

```
Iconos utilizados:
├── fa-chevron-down (▼)
│   └── Dropdowns principales
├── fa-plus (+)
│   └── Submenús
└── .submenu-icon
    └── Clase adicional para estilos
```

---

_Diagrama visual generado desde header.html - Última actualización: $(date)_
