# 🗺️ MAPEO COMPLETO DEL MENÚ DE NAVEGACIÓN - OZONO VIDA

## 📋 Índice

- [Estructura General](#estructura-general)
- [Nivel 1 - Menú Principal](#nivel-1---menú-principal)
- [Nivel 2 - Dropdowns](#nivel-2---dropdowns)
- [Nivel 3 - Submenús](#nivel-3---submenús)
- [Nivel 4 - Sub-submenús](#nivel-4---sub-submenús)
- [Enlaces Directos](#enlaces-directos)
- [Estados y Comportamientos](#estados-y-comportamientos)

---

## 🏗️ Estructura General

El menú de navegación está organizado en **4 niveles jerárquicos**:

```
Nivel 1: Enlaces principales del header
    ↓
Nivel 2: Dropdowns principales (Tratamientos, Aplicaciones)
    ↓
Nivel 3: Submenús dentro de cada dropdown
    ↓
Nivel 4: Sub-submenús (solo en "Tratamiento de Dolor")
```

---

## 🎯 Nivel 1 - Menú Principal

| Enlace           | Tipo             | Ruta           | Descripción                  |
| ---------------- | ---------------- | -------------- | ---------------------------- |
| **Servicios**    | Enlace directo   | `#servicios`   | Scroll a sección servicios   |
| **Tratamientos** | Dropdown trigger | `#`            | Desplegable con submenús     |
| **Aplicaciones** | Dropdown trigger | `#`            | Desplegable con submenús     |
| **Testimonios**  | Enlace directo   | `#testimonios` | Scroll a sección testimonios |
| **Contacto**     | Enlace directo   | `#contacto`    | Scroll a sección contacto    |
| **Nosotros**     | Enlace directo   | `#nosotros`    | Scroll a sección nosotros    |
| **Reservar**     | Botón CTA        | `#citas`       | Abre modal de reservas       |

---

## 🎯 Nivel 2 - Dropdowns

### 📋 Dropdown: **Tratamientos**

- **Trigger**: Botón con icono chevron-down
- **ID**: `submenu-tratamientos`
- **Comportamiento**: Click para expandir/colapsar
- **Submenús**: 5 categorías principales

### 📋 Dropdown: **Aplicaciones**

- **Trigger**: Botón con icono chevron-down
- **ID**: `submenu-aplicaciones`
- **Comportamiento**: Click para expandir/colapsar
- **Submenús**: 8 métodos de aplicación

---

## 🎯 Nivel 3 - Submenús

### 🏥 **Tratamiento de Dolor**

- **ID**: `submenu-dolor`
- **Tipo**: Submenú con sub-submenús
- **Icono**: Plus (+)
- **Sub-submenús**: 2 categorías
- **Enlaces directos**: 11 condiciones

#### Sub-submenús:

1. **Dolores** (`submenu-dolores`) - 13 tipos de dolor
2. **Artrosis** (`submenu-artrosis`) - 3 articulaciones

#### Enlaces directos:

- Hernias Discales
- Lumbalgia
- Cervicalgia
- Artritis
- Tendinitis
- Fibromialgia
- Ciatalgia
- Túnel carpiano
- Escoliosis
- Espolón calcáneo
- Fascitis plantar

### 🦠 **Tratamiento de Enfermedades**

- **ID**: `submenu-enfermedades`
- **Tipo**: Solo enlaces directos
- **Icono**: Plus (+)
- **Enlaces**: 11 enfermedades

#### Enlaces:

- Diabetes Mellitus
- Insuficiencia Vascular
- Hepatitis Crónica
- Colitis Ulcerosa
- Enfermedad de Crohn
- Varices
- Prostatitis
- Gota
- Gastritis
- Cefaleas y Migrañas
- Lupus eritematoso

### 💅 **Estética**

- **ID**: `submenu-estetica`
- **Tipo**: Solo enlaces directos
- **Icono**: Plus (+)
- **Enlaces**: 4 tratamientos

#### Enlaces:

- Rejuvenecimiento Facial
- Celulitis
- Úlceras Crónicas y Varicosas
- Acné

### 🦠 **Infecciones**

- **ID**: `submenu-infecciones`
- **Tipo**: Solo enlaces directos
- **Icono**: Plus (+)
- **Enlaces**: 3 tipos

#### Enlaces:

- Heridas Infectadas
- Pie Diabético
- Úlceras Varicosas

### 👩 **Ginecología**

- **ID**: `submenu-ginecologia`
- **Tipo**: Solo enlaces directos
- **Icono**: Plus (+)
- **Enlaces**: 5 condiciones

#### Enlaces:

- Candidiasis
- Vaginitis
- Virus de Papiloma Humano
- Endometriosis
- Post Cesárea

---

## 🎯 Nivel 4 - Sub-submenús

### 🎯 **Dolores** (`submenu-dolores`)

- **ID**: `submenu-dolores`
- **Tipo**: Solo enlaces directos
- **Icono**: Plus (+)
- **Enlaces**: 13 partes del cuerpo

#### Enlaces:

- Cabeza
- Cuello
- Hombros
- Espalda
- Codo
- Columnas
- Manos
- Cadera
- Muslo
- Rodillas
- Tobillos
- Pies
- Planta de los pies

### 🎯 **Artrosis** (`submenu-artrosis`)

- **ID**: `submenu-artrosis`
- **Tipo**: Solo enlaces directos
- **Icono**: Plus (+)
- **Enlaces**: 3 articulaciones

#### Enlaces:

- Hombro
- Cadera
- Rodilla

---

## 🎯 Aplicaciones (Nivel 3)

### 💉 **Métodos de Aplicación**

- **ID**: `submenu-aplicaciones`
- **Tipo**: Solo enlaces directos
- **Enlaces**: 8 métodos

#### Enlaces:

- Intramuscular
- Intraarticular
- Auto hemoterapia menor
- Auto hemoterapia mayor
- Sueros ozonizados
- Bolsa ozonisada
- Insuflación rectal
- Embolsados

---

## 🎯 Enlaces Directos

### 📍 **Secciones de la Página Principal**

| Enlace      | Anchor         | Descripción            |
| ----------- | -------------- | ---------------------- |
| Servicios   | `#servicios`   | Sección de servicios   |
| Testimonios | `#testimonios` | Sección de testimonios |
| Contacto    | `#contacto`    | Sección de contacto    |
| Nosotros    | `#nosotros`    | Sección nosotros       |

### 📍 **Páginas de Tratamiento**

| Enlace           | Ruta                                                            | Descripción                |
| ---------------- | --------------------------------------------------------------- | -------------------------- |
| Hernias Discales | `tratamientos/tratamiento-de-dolor/index.html#hernias-discales` | Página de hernia discal    |
| Lumbalgia        | `tratamientos/tratamiento-de-dolor/index.html#lumbalgia`        | Página de lumbalgia        |
| Cervicalgia      | `tratamientos/tratamiento-de-dolor/index.html#cervicalgia`      | Página de cervicalgia      |
| Artritis         | `tratamientos/tratamiento-de-dolor/index.html#artritis`         | Página de artritis         |
| Tendinitis       | `tratamientos/tratamiento-de-dolor/index.html#tendinitis`       | Página de tendinitis       |
| Fibromialgia     | `tratamientos/tratamiento-de-dolor/index.html#fibromialgia`     | Página de fibromialgia     |
| Ciatalgia        | `tratamientos/tratamiento-de-dolor/index.html#ciatalgia`        | Página de ciatalgia        |
| Túnel carpiano   | `tratamientos/tratamiento-de-dolor/index.html#tunel-carpiano`   | Página de túnel carpiano   |
| Escoliosis       | `tratamientos/tratamiento-de-dolor/index.html#escoliosis`       | Página de escoliosis       |
| Espolón calcáneo | `tratamientos/tratamiento-de-dolor/index.html#espolon-calcaneo` | Página de espolón calcáneo |
| Fascitis plantar | `tratamientos/tratamiento-de-dolor/index.html#fascitis-plantar` | Página de fascitis plantar |

### 📍 **Páginas de Enfermedades**

| Enlace                 | Ruta                                                          | Descripción                      |
| ---------------------- | ------------------------------------------------------------- | -------------------------------- |
| Diabetes Mellitus      | `tratamientos/enfermedades/index.html#diabetes`               | Página de diabetes               |
| Insuficiencia Vascular | `tratamientos/enfermedades/index.html#insuficiencia-vascular` | Página de insuficiencia vascular |
| Hepatitis Crónica      | `tratamientos/enfermedades/index.html#hepatitis`              | Página de hepatitis              |
| Colitis Ulcerosa       | `tratamientos/enfermedades/index.html#colitis`                | Página de colitis                |
| Enfermedad de Crohn    | `tratamientos/enfermedades/index.html#enfermedad-de-crohn`    | Página de enfermedad de Crohn    |
| Varices                | `tratamientos/enfermedades/index.html#varices`                | Página de varices                |
| Prostatitis            | `tratamientos/enfermedades/index.html#prostatitis`            | Página de prostatitis            |
| Gota                   | `tratamientos/enfermedades/index.html#gota`                   | Página de gota                   |
| Gastritis              | `tratamientos/enfermedades/index.html#gastritis`              | Página de gastritis              |
| Cefaleas y Migrañas    | `tratamientos/enfermedades/index.html#cefaleas-migranas`      | Página de cefaleas               |
| Lupus eritematoso      | `tratamientos/enfermedades/index.html#lupus-eritematoso`      | Página de lupus                  |

### 📍 **Páginas de Estética**

| Enlace                       | Ruta                                                       | Descripción                |
| ---------------------------- | ---------------------------------------------------------- | -------------------------- |
| Rejuvenecimiento Facial      | `tratamientos/estetica/index.html#rejuvenecimiento-facial` | Página de rejuvenecimiento |
| Celulitis                    | `tratamientos/estetica/index.html#celulitis`               | Página de celulitis        |
| Úlceras Crónicas y Varicosas | `tratamientos/estetica/index.html#ulceras-cronicas`        | Página de úlceras          |
| Acné                         | `tratamientos/estetica/index.html#acne`                    | Página de acné             |

### 📍 **Páginas de Infecciones**

| Enlace             | Ruta                                                     | Descripción                 |
| ------------------ | -------------------------------------------------------- | --------------------------- |
| Heridas Infectadas | `tratamientos/infecciones/index.html#heridas-infectadas` | Página de heridas           |
| Pie Diabético      | `tratamientos/infecciones/index.html#pie-diabetico`      | Página de pie diabético     |
| Úlceras Varicosas  | `tratamientos/infecciones/index.html#ulceras-varicosas`  | Página de úlceras varicosas |

### 📍 **Páginas de Ginecología**

| Enlace                   | Ruta                                                | Descripción             |
| ------------------------ | --------------------------------------------------- | ----------------------- |
| Candidiasis              | `tratamientos/ginecologia/index.html#candidiasis`   | Página de candidiasis   |
| Vaginitis                | `tratamientos/ginecologia/index.html#vaginitis`     | Página de vaginitis     |
| Virus de Papiloma Humano | `tratamientos/ginecologia/index.html#vph`           | Página de VPH           |
| Endometriosis            | `tratamientos/ginecologia/index.html#endometriosis` | Página de endometriosis |
| Post Cesárea             | `tratamientos/ginecologia/index.html#post-cesarea`  | Página post cesárea     |

### 📍 **Páginas de Dolores (Nivel 4)**

| Enlace             | Ruta                                                                       | Descripción             |
| ------------------ | -------------------------------------------------------------------------- | ----------------------- |
| Cabeza             | `tratamientos/tratamiento-de-dolor/dolores/index.html#cabeza`              | Dolor de cabeza         |
| Cuello             | `tratamientos/tratamiento-de-dolor/dolores/index.html#cuello`              | Dolor de cuello         |
| Hombros            | `tratamientos/tratamiento-de-dolor/dolores/index.html#hombros`             | Dolor de hombros        |
| Espalda            | `tratamientos/tratamiento-de-dolor/dolores/index.html#espalda`             | Dolor de espalda        |
| Codo               | `tratamientos/tratamiento-de-dolor/dolores/index.html#codo`                | Dolor de codo           |
| Columnas           | `tratamientos/tratamiento-de-dolor/dolores/index.html#columna`             | Dolor de columna        |
| Manos              | `tratamientos/tratamiento-de-dolor/dolores/index.html#manos`               | Dolor de manos          |
| Cadera             | `tratamientos/tratamiento-de-dolor/dolores/index.html#cadera`              | Dolor de cadera         |
| Muslo              | `tratamientos/tratamiento-de-dolor/dolores/index.html#muslo`               | Dolor de muslo          |
| Rodillas           | `tratamientos/tratamiento-de-dolor/dolores/index.html#rodilla`             | Dolor de rodillas       |
| Tobillos           | `tratamientos/tratamiento-de-dolor/dolores/index.html#tobillos`            | Dolor de tobillos       |
| Pies               | `tratamientos/tratamiento-de-dolor/dolores/index.html#pies`                | Dolor de pies           |
| Planta de los pies | `tratamientos/tratamiento-de-dolor/dolores/index.html#plantas-de-los-pies` | Dolor en planta de pies |

### 📍 **Páginas de Artrosis (Nivel 4)**

| Enlace  | Ruta                                                                     | Descripción         |
| ------- | ------------------------------------------------------------------------ | ------------------- |
| Hombro  | `tratamientos/tratamiento-de-dolor/artrosis/index.html#artrosis-hombro`  | Artrosis de hombro  |
| Cadera  | `tratamientos/tratamiento-de-dolor/artrosis/index.html#artrosis-cadera`  | Artrosis de cadera  |
| Rodilla | `tratamientos/tratamiento-de-dolor/artrosis/index.html#artrosis-rodilla` | Artrosis de rodilla |

### 📍 **Páginas de Aplicaciones**

| Enlace                 | Ruta                                             | Descripción               |
| ---------------------- | ------------------------------------------------ | ------------------------- |
| Intramuscular          | `aplicaciones/index.html#intramuscular`          | Aplicación intramuscular  |
| Intraarticular         | `aplicaciones/index.html#intra-articular`        | Aplicación intraarticular |
| Auto hemoterapia menor | `aplicaciones/index.html#auto-hemoterapia-menor` | Auto hemoterapia menor    |
| Auto hemoterapia mayor | `aplicaciones/index.html#auto-hemoterapia-mayor` | Auto hemoterapia mayor    |
| Sueros ozonizados      | `aplicaciones/index.html#suero-ozonizado`        | Sueros ozonizados         |
| Bolsa ozonisada        | `aplicaciones/index.html#bolsa-ozonisada`        | Bolsa ozonisada           |
| Insuflación rectal     | `aplicaciones/index.html#insuflacion-rectal`     | Insuflación rectal        |
| Embolsados             | `aplicaciones/index.html#embolsados`             | Embolsados                |

---

## 🎯 Estados y Comportamientos

### 🔄 **Comportamiento de Expansión**

1. **Nivel 1 → Nivel 2**: Click en trigger expande dropdown
2. **Nivel 2 → Nivel 3**: Click en item con submenú expande submenú
3. **Nivel 3 → Nivel 4**: Click en item con sub-submenú expande sub-submenú

### 🎯 **Reglas de Cierre**

- Al abrir un dropdown, se cierran todos los otros dropdowns
- Al abrir un submenú, se cierran todos los submenús hermanos
- Al abrir un sub-submenú, se cierran todos los sub-submenús hermanos
- Solo UN elemento puede estar abierto por nivel

### 🎨 **Estados Visuales**

- **Cerrado**: Solo texto visible
- **Abierto**: Fondo azul corporativo, texto blanco
- **Hover**: Fondo sutil
- **Focus**: Outline azul para accesibilidad

### 📱 **Responsive**

- **Desktop**: Hover para expandir, click para mantener
- **Mobile**: Click para expandir/colapsar
- **Tablet**: Tratado como mobile (≤1024px)

---

## 📊 Estadísticas del Menú

| Nivel               | Cantidad       | Descripción                          |
| ------------------- | -------------- | ------------------------------------ |
| **Nivel 1**         | 7 elementos    | Enlaces principales                  |
| **Nivel 2**         | 2 dropdowns    | Tratamientos, Aplicaciones           |
| **Nivel 3**         | 7 submenús     | 5 en Tratamientos, 1 en Aplicaciones |
| **Nivel 4**         | 2 sub-submenús | Solo en "Tratamiento de Dolor"       |
| **Enlaces totales** | 65+ enlaces    | Incluyendo todos los niveles         |

---

## 🛠️ Clases CSS Utilizadas

### 🎯 **Estructura Principal**

- `.nav__links` - Contenedor principal del menú
- `.dropdown` - Contenedor de dropdown
- `.dropdown__trigger` - Botón que activa dropdown
- `.dropdown__menu` - Menú desplegable
- `.dropdown__item` - Item individual del menú
- `.dropdown__item--has-submenu` - Item que tiene submenú
- `.dropdown__link` - Enlace dentro del dropdown
- `.dropdown__submenu` - Submenú anidado

### 🎯 **Estados**

- `.is-open` - Elemento expandido
- `.is-visible` - Elemento visible (animaciones)

### 🎯 **Iconos**

- `.fa-chevron-down` - Icono de dropdown principal
- `.fa-plus` - Icono de submenú
- `.submenu-icon` - Clase adicional para iconos de submenú

---

## 🎯 Consideraciones Técnicas

### 🔧 **Accesibilidad**

- Atributos `aria-expanded` para estado de expansión
- Atributos `aria-controls` para referenciar contenido controlado
- Navegación por teclado completa
- Focus management apropiado

### 📱 **Responsive Design**

- Breakpoint único: 1024px
- Desktop: >1024px
- Mobile: ≤1024px (incluye tablets)

### ⚡ **Performance**

- Event delegation para mejor rendimiento
- Transiciones CSS optimizadas
- Lazy loading de contenido si es necesario

---

_Documento generado automáticamente - Última actualización: $(date)_
