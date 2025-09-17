/**
 * Configuración de Metadatos por Página - OZONO VIDA
 * Define los metadatos específicos para cada página
 */

const pageMetadata = {
  // Página Principal
  index: {
    title: "OZONO VIDA • Medicina Regenerativa",
    description:
      "OZONO VIDA: Ozonoterapia, medicina regenerativa y tratamiento integral del dolor (columna, hernias, rodillas y más). Atención en Av. Villón, frente a la Dirección Víctor Ramos Guardia.",
    keywords:
      "ozonoterapia, medicina regenerativa, tratamiento dolor, plasma rico plaquetas, Huaraz, Ancash, Peru",
    image:
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80",
    url: "https://ozonovida.netlify.app",
    structuredData: {
      "@type": "MedicalClinic",
      description:
        "OZONO VIDA: Ozonoterapia, medicina regenerativa y tratamiento integral del dolor (columna, hernias, rodillas y más). Atención en Av. Villón, frente a la Dirección Víctor Ramos Guardia.",
    },
  },

  // Servicios - Ozonoterapia
  ozonoterapia: {
    title: "Ozonoterapia - Medicina Regenerativa Natural",
    description:
      "Descubre los beneficios de la ozonoterapia en OZONO VIDA. Tratamiento natural y efectivo para dolor, inflamación y regeneración celular. Especialistas en Huaraz.",
    keywords:
      "ozonoterapia, ozono medicinal, tratamiento natural, dolor crónico, medicina regenerativa, Huaraz",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    url: "https://ozonovida.netlify.app/servicios/ozonoterapia.html",
    structuredData: {
      "@type": "MedicalProcedure",
      name: "Ozonoterapia",
      description:
        "Tratamiento médico que utiliza ozono medicinal para estimular el sistema inmunológico, mejorar la oxigenación celular y promover la regeneración de tejidos.",
      bodyLocation: ["Músculo", "Articulación", "Sistema circulatorio"],
    },
  },

  // Servicios - Plasma Rico en Plaquetas
  plasma: {
    title: "Plasma Rico en Plaquetas - Medicina Regenerativa",
    description:
      "Tratamiento con Plasma Rico en Plaquetas (PRP) para regeneración de tejidos, articulaciones y cicatrización. Medicina regenerativa avanzada en Huaraz.",
    keywords:
      "plasma rico plaquetas, PRP, medicina regenerativa, regeneración tejidos, articulaciones, Huaraz",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
    url: "https://ozonovida.netlify.app/servicios/plasma.html",
    structuredData: {
      "@type": "MedicalProcedure",
      name: "Plasma Rico en Plaquetas",
      description:
        "Regeneración tisular mediante factores de crecimiento derivados de tu propia sangre.",
      bodyLocation: ["Articulación", "Tendón", "Músculo"],
    },
  },

  // Servicios - Medicina Regenerativa
  "medicina-regenerativa": {
    title: "Medicina Regenerativa - Tratamientos Avanzados",
    description:
      "Medicina regenerativa con células madre, factores de crecimiento y biotecnología para regenerar tejidos dañados. Centro especializado en Huaraz.",
    keywords:
      "medicina regenerativa, células madre, factores crecimiento, biotecnología médica, regeneración, Huaraz",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
    url: "https://ozonovida.netlify.app/servicios/medicina-regenerativa.html",
    structuredData: {
      "@type": "MedicalProcedure",
      name: "Medicina Regenerativa",
      description:
        "Terapias para restaurar tejidos y recuperar la funcionalidad articular.",
      bodyLocation: ["Tejido", "Articulación", "Hueso"],
    },
  },

  // Servicios - Cóctel de Vida
  "coctel-vida": {
    title: "Cóctel de Vida - Revitalización Integral",
    description:
      "Cóctel de Vida: combinación terapéutica de vitaminas, minerales y antioxidantes para revitalizar el organismo. Medicina preventiva en Huaraz.",
    keywords:
      "cóctel vida, vitaminas, minerales, antioxidantes, revitalización, medicina preventiva, Huaraz",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
    url: "https://ozonovida.netlify.app/servicios/coctel-vida.html",
    structuredData: {
      "@type": "MedicalProcedure",
      name: "Cóctel de Vida",
      description:
        "Combinación terapéutica de vitaminas, minerales y antioxidantes para revitalizar el organismo.",
      bodyLocation: ["Sistema inmunológico", "Sistema circulatorio"],
    },
  },

  // Tratamientos
  tratamientos: {
    title: "Tratamientos Especializados del Dolor",
    description:
      "Tratamiento especializado del dolor, enfermedades crónicas, ginecología, estética e infecciones con ozonoterapia y medicina regenerativa.",
    keywords:
      "tratamiento dolor, dolor crónico, hernias discales, artrosis, artritis, fibromialgia, Huaraz",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
    url: "https://ozonovida.netlify.app/tratamientos",
    structuredData: {
      "@type": "MedicalClinic",
      description:
        "Tratamiento especializado del dolor, enfermedades crónicas, ginecología, estética e infecciones con ozonoterapia y medicina regenerativa.",
    },
  },
};

/**
 * Obtener metadatos para una página específica
 * @param {string} pageName - Nombre de la página
 * @param {string} basePath - Ruta base para recursos
 * @returns {object} Metadatos de la página
 */
function getPageMetadata(pageName, basePath = "") {
  const metadata = pageMetadata[pageName] || pageMetadata["index"];

  return {
    ...metadata,
    basePath: basePath,
  };
}

/**
 * Aplicar metadatos a la página actual
 * @param {string} pageName - Nombre de la página
 * @param {string} basePath - Ruta base para recursos
 */
function applyPageMetadata(pageName, basePath = "") {
  const metadata = getPageMetadata(pageName, basePath);

  // Actualizar título
  document.title = metadata.title;

  // Actualizar meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", metadata.description);
  }

  // Actualizar meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute("content", metadata.keywords);
  }

  // Actualizar Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", metadata.title);

  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  if (ogDescription)
    ogDescription.setAttribute("content", metadata.description);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute("content", metadata.image);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", metadata.url);

  // Actualizar Twitter Cards
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", metadata.title);

  const twitterDescription = document.querySelector(
    'meta[name="twitter:description"]'
  );
  if (twitterDescription)
    twitterDescription.setAttribute("content", metadata.description);

  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute("content", metadata.image);

  // Actualizar canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", metadata.url);

  console.log(`✅ Metadatos aplicados para página: ${pageName}`);
}

// Detectar página actual automáticamente
function detectCurrentPage() {
  const path = window.location.pathname;
  const fileName = path.split("/").pop().replace(".html", "") || "index";

  // Mapear nombres de archivo a nombres de página
  const pageMap = {
    index: "index",
    "": "index",
    ozonoterapia: "ozonoterapia",
    plasma: "plasma",
    "medicina-regenerativa": "medicina-regenerativa",
    "coctel-vida": "coctel-vida",
    tratamientos: "tratamientos",
  };

  return pageMap[fileName] || "index";
}

// Auto-inicializar cuando el DOM esté listo
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const currentPage = detectCurrentPage();
    const basePath =
      window.location.pathname.includes("/servicios/") ||
      window.location.pathname.includes("/tratamientos/")
        ? "../"
        : "";

    applyPageMetadata(currentPage, basePath);
  });
}

// Exportar para uso en Node.js o módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = { pageMetadata, getPageMetadata, applyPageMetadata };
}
