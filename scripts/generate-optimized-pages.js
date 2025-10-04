// Script para generar páginas HTML optimizadas
// Este script debe ejecutarse en Node.js para generar todas las páginas

const fs = require("fs");
const path = require("path");

// Configuración de páginas
const PAGES_CONFIG = [
  {
    id: "index",
    path: "index.html",
    title: "OZONO VIDA",
    description:
      "OZONO VIDA: Ozonoterapia, medicina regenerativa y tratamiento integral del dolor (columna, hernias, rodillas y más). Atención en Av. Villón, frente a la Dirección Víctor Ramos Guardia.",
    content: "index-content.html",
  },
  {
    id: "tratamientos-dolor",
    path: "tratamientos/index.html",
    title: "Tratamiento del Dolor",
    description:
      "Tratamiento especializado del dolor de columna, hernias discales, rodillas, hombros y más con ozonoterapia y medicina regenerativa.",
    content: "tratamientos-content.html",
  },
  {
    id: "tratamientos-enfermedades",
    path: "tratamientos/enfermedades/index.html",
    title: "Tratamiento de Enfermedades",
    description:
      "Tratamiento de diabetes, hepatitis, colitis, enfermedades autoinmunes y más con ozonoterapia y medicina regenerativa.",
    content: "enfermedades-content.html",
  },
  {
    id: "tratamientos-ginecologia",
    path: "tratamientos/ginecologia/index.html",
    title: "Tratamientos Ginecológicos",
    description:
      "Tratamiento de candidiasis, vaginitis, VPH, endometriosis y post cesárea con ozonoterapia.",
    content: "ginecologia-content.html",
  },
  {
    id: "aplicaciones",
    path: "aplicaciones/index.html",
    title: "Aplicaciones de Ozonoterapia",
    description:
      "Conoce las diferentes aplicaciones de ozonoterapia: intramuscular, intra articular, auto hemoterapia, sueros ozonizados y más.",
    content: "aplicaciones-content.html",
  },
];

// Template optimizado
const OPTIMIZED_TEMPLATE = `<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- CSS Crítico -->
  <link rel="stylesheet" href="{{BASE_PATH}}css/critical.css" />
  <style>
    /* CSS Crítico - Carga inmediata para evitar FOUC */
    :root {
      /* Dark mode colors */
      --bg: #0b1220;
      --bg-alt: #0e1630;
      --text: #eaf2ff;
      --muted: #a8b4d4;
      --primary: #34d399;
      --primary-700: #19966b;
      --accent: #60a5fa;
      --danger: #ef4444;
      --glass: rgba(255, 255, 255, 0.06);
      --border: rgba(255, 255, 255, 0.12);
      --shadow: 0 10px 30px rgba(0,0,0,0.35);
      
      /* Corporate colors */
      --corporate-blue: #215096;
      --corporate-blue-light: #64b2e7;
      --corporate-red: #E53935;
      --corporate-white: #ffffff;
      --corporate-gray-light: #f8fafc;
      --corporate-gray-medium: #e2e8f0;
      --corporate-gray-dark: #475569;
      --corporate-text-dark: #1e293b;
      --corporate-text-muted: #64748b;
    }

    /* Light mode */
    [data-theme="light"] {
      --bg: var(--corporate-white);
      --bg-alt: var(--corporate-gray-light);
      --text: var(--corporate-text-dark);
      --muted: var(--corporate-text-muted);
      --primary: var(--corporate-blue);
      --primary-700: var(--corporate-blue);
      --accent: var(--corporate-blue-light);
      --danger: var(--corporate-red);
      --glass: rgba(33, 80, 150, 0.08);
      --border: var(--corporate-gray-medium);
      --shadow: 0 10px 30px rgba(33, 80, 150, 0.15);
    }

    /* Reset básico */
    * { box-sizing: border-box; }
    html, body { 
      height: 100%; 
      margin: 0;
      padding: 0;
    }

    body {
      padding-top: 80px; /* Compensar header fijo */
      font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      color: var(--text);
      background: radial-gradient(1200px 800px at 80% -10%, #19315a, transparent 60%), linear-gradient(180deg, #070b13 0%, #0b1220 100%);
      overflow-x: hidden;
      transition: background 0.3s ease, color 0.3s ease;
    }

    [data-theme="light"] body {
      background: linear-gradient(135deg, var(--corporate-gray-light) 0%, var(--corporate-white) 100%);
    }

    /* Header crítico */
    .header {
      position: fixed; 
      top: 0; 
      left: 0; 
      right: 0; 
      z-index: 1000; 
      backdrop-filter: blur(10px);
      background: linear-gradient(180deg, rgba(11,18,32,0.95) 0%, rgba(11,18,32,0.85) 100%);
      border-bottom: 1px solid var(--border);
      transition: all 0.3s ease;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }

    [data-theme="light"] .header {
      background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--corporate-gray-medium);
      box-shadow: 0 2px 20px rgba(33, 80, 150, 0.1);
    }

    .header__inner { 
      // display: flex; 
      align-items: center; 
      justify-content: space-between; 
      padding: .8rem 0; 
      transition: padding 0.3s ease; 
    }

    /* Brand crítico */
    .brand { 
      display: inline-flex; 
      align-items: center; 
      gap: .6rem; 
      font-weight: 700; 
      letter-spacing: .5px; 
    }

    .brand__logo { 
      width: 28px; 
      height: 28px; 
      display: grid; 
      place-items: center; 
      background: linear-gradient(135deg, var(--corporate-blue-light), var(--corporate-blue)); 
      color: white; 
      border-radius: 8px; 
    }

    .brand__text { 
      font-weight: 700; 
      color: var(--text);
    }

    [data-theme="light"] .brand__text {
      color: var(--corporate-blue);
    }

    /* Container crítico */
    .container {
      width: min(1120px, 90vw);
      margin: 0 auto;
    }

    /* Hero crítico */
    .hero { 
      position: relative; 
      padding: 5rem 0 4rem; 
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .hero__grid { 
      display: grid; 
      grid-template-columns: 1.1fr .9fr; 
      gap: 2rem; 
      align-items: center; 
    }

    .hero__content h1 { 
      font-size: clamp(1.8rem, 2.4vw + 1rem, 3rem); 
      margin: 0 0 1rem; 
      line-height: 1.15; 
      color: var(--text);
    }

    [data-theme="light"] .hero__content h1 {
      background: linear-gradient(90deg, #64b2e7, #a2d0f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero__content p { 
      color: var(--muted); 
      margin-bottom: 1.25rem; 
    }

    /* Botones críticos */
    .btn { 
      display: inline-flex; 
      align-items: center; 
      gap: .5rem; 
      padding: .7rem 1rem; 
      border-radius: .8rem; 
      font-weight: 600; 
      border: 1px solid transparent; 
      transition: all 0.3s ease; 
      text-decoration: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .btn--primary { 
      background: linear-gradient(135deg, var(--corporate-blue-light), var(--corporate-blue)); 
      color: white; 
      box-shadow: 0 8px 24px rgba(100, 178, 231, 0.4); 
      border: 1px solid rgba(100, 178, 231, 0.3);
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .btn--ghost { 
      background: transparent; 
      color: var(--text); 
      border-color: var(--border); 
    }

    /* Skip link crítico */
    .skip-link {
      position: absolute; 
      left: -9999px; 
      top: auto; 
      width: 1px; 
      height: 1px; 
      overflow: hidden;
    }

    .skip-link:focus { 
      left: 1rem; 
      top: 1rem; 
      width: auto; 
      height: auto; 
      padding: .5rem .75rem; 
      background: var(--bg-alt); 
      border: 1px solid var(--border); 
      border-radius: .5rem; 
    }

    /* Placeholders críticos */
    #head-placeholder,
    #header-placeholder,
    #footer-placeholder,
    #ui-components-placeholder {
      display: block;
    }

    /* Responsive crítico */
    @media (max-width: 980px) {
      .hero__grid { 
        grid-template-columns: 1fr; 
        text-align: center;
      }
      
      .hero__content h1 {
        font-size: 1.8rem;
        line-height: 1.2;
      }
    }

    /* Loading state */
    .loading {
      opacity: 0.7;
      pointer-events: none;
    }
  </style>

  <!-- Preload de recursos críticos -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
  
  <!-- Preload del CSS principal -->
  <link rel="preload" href="{{BASE_PATH}}css/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="{{BASE_PATH}}css/styles.css" /></noscript>
  
  <!-- Preload de Font Awesome -->
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /></noscript>
  
  <!-- Preload de Google Fonts -->
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" /></noscript>

  <!-- Metadata dinámica -->
  <title data-page-title>{{PAGE_TITLE}} • OZONO VIDA</title>
  <meta name="description" content="{{PAGE_DESCRIPTION}}" />

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="{{PAGE_TITLE}} • OZONO VIDA" />
  <meta property="og:description" content="{{PAGE_DESCRIPTION}}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{{PAGE_URL}}" />
  <meta property="og:image" content="{{PAGE_IMAGE}}" />

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{PAGE_TITLE}} • OZONO VIDA" />
  <meta name="twitter:description" content="{{PAGE_DESCRIPTION}}" />
  <meta name="twitter:image" content="{{PAGE_IMAGE}}" />

  <!-- Canonical URL -->
  <link rel="canonical" href="{{PAGE_URL}}" />

  <!-- Favicon -->
  <link rel="icon" href="{{BASE_PATH}}assets/favicon.ico" type="image/x-icon" />
  <link rel="shortcut icon" href="{{BASE_PATH}}assets/favicon.ico" type="image/x-icon" />

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "OZONO VIDA Centro Médico",
    "description": "{{PAGE_DESCRIPTION}}",
    "image": "{{PAGE_IMAGE}}",
    "url": "{{PAGE_URL}}",
    "telephone": "+51 999 999 999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Villón, frente a la Dirección Víctor Ramos Guardia",
      "addressLocality": "Huaraz",
      "addressRegion": "Ancash",
      "addressCountry": "PE"
    },
    "medicalSpecialty": ["PainManagement", "RegenerativeMedicine"],
    "openingHours": "Mo-Fr 09:00-19:00, Sa 09:00-13:00",
    "priceRange": "$$"
  }
  </script>
</head>
<body>
  <a href="#inicio" class="skip-link">Saltar al contenido</a>

  <!-- Header Component -->
  <div id="header-placeholder"></div>

  <main>
    {{MAIN_CONTENT}}
  </main>

  <!-- UI Components (botones de acción) -->
  <div id="ui-components-placeholder"></div>

  <!-- Footer Component -->
  <div id="footer-placeholder"></div>

  <!-- Scripts del sistema de componentes - Carga optimizada -->
  <script>
    // Script crítico inline para evitar bloqueo
    window.addEventListener('DOMContentLoaded', function() {
      // Marcar como cargado para evitar FOUC
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    });
  </script>
  
  <!-- Scripts principales con defer para no bloquear -->
  <script src="{{BASE_PATH}}js/metadata-config.js" defer></script>
  <script src="{{BASE_PATH}}js/optimized-component-loader.js" defer></script>
  <script src="{{BASE_PATH}}js/app.js" defer></script>
</body>
</html>`;

// Función para determinar la ruta base según la profundidad
function getBasePath(filePath) {
  const depth = filePath.split("/").length - 1;

  if (depth === 0) {
    return "./";
  } else if (depth === 1) {
    return "../";
  } else if (depth === 2) {
    return "../../";
  } else {
    return "../../../";
  }
}

// Función para generar una página
function generatePage(pageConfig) {
  const basePath = getBasePath(pageConfig.path);

  // Leer el contenido específico de la página
  let mainContent = "";
  try {
    const contentPath = path.join(__dirname, "content", pageConfig.content);
    if (fs.existsSync(contentPath)) {
      mainContent = fs.readFileSync(contentPath, "utf8");
    } else {
      console.warn(`Content file not found: ${contentPath}`);
      mainContent = `<section class="hero"><div class="container"><h1>${pageConfig.title}</h1><p>${pageConfig.description}</p></div></section>`;
    }
  } catch (error) {
    console.error(`Error reading content for ${pageConfig.id}:`, error);
    mainContent = `<section class="hero"><div class="container"><h1>${pageConfig.title}</h1><p>${pageConfig.description}</p></div></section>`;
  }

  // Generar el HTML
  const html = OPTIMIZED_TEMPLATE.replace(/\{\{BASE_PATH\}\}/g, basePath)
    .replace(/\{\{PAGE_TITLE\}\}/g, pageConfig.title)
    .replace(/\{\{PAGE_DESCRIPTION\}\}/g, pageConfig.description)
    .replace(
      /\{\{PAGE_URL\}\}/g,
      `https://stella-maris.example/${pageConfig.path}`
    )
    .replace(
      /\{\{PAGE_IMAGE\}\}/g,
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80"
    )
    .replace(/\{\{MAIN_CONTENT\}\}/g, mainContent);

  // Crear directorio si no existe
  const outputPath = path.join(__dirname, pageConfig.path);
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Escribir archivo
  fs.writeFileSync(outputPath, html, "utf8");
  console.log(`Generated: ${pageConfig.path}`);
}

// Generar todas las páginas
console.log("Generating optimized HTML pages...");
PAGES_CONFIG.forEach(generatePage);
console.log("All pages generated successfully!");
