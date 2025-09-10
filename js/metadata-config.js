// Configuración de metadata para cada página
const PAGE_METADATA = {
  // Página principal
  index: {
    title: "OZONO VIDA",
    description:
      "OZONO VIDA: Ozonoterapia, medicina regenerativa y tratamiento integral del dolor (columna, hernias, rodillas y más). Atención en Av. Villón, frente a la Dirección Víctor Ramos Guardia.",
    url: "https://ozonovida.netlify.app",
    image:
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80",
  },

  // Tratamientos
  "tratamientos-dolor": {
    title: "Tratamiento del Dolor",
    description:
      "Tratamiento especializado del dolor de columna, hernias discales, rodillas, hombros y más con ozonoterapia y medicina regenerativa.",
    url: "https://ozonovida.netlify.app/tratamientos/dolor",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
  },

  "tratamientos-enfermedades": {
    title: "Tratamiento de Enfermedades",
    description:
      "Tratamiento de diabetes, hepatitis, colitis, enfermedades autoinmunes y más con ozonoterapia y medicina regenerativa.",
    url: "https://ozonovida.netlify.app/tratamientos/enfermedades",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
  },

  "tratamientos-estetica": {
    title: "Tratamientos Estéticos",
    description:
      "Rejuvenecimiento facial, tratamiento de celulitis, úlceras crónicas y acné con ozonoterapia.",
    url: "https://ozonovida.netlify.app/tratamientos/estetica",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
  },

  "tratamientos-ginecologia": {
    title: "Tratamientos Ginecológicos",
    description:
      "Tratamiento de candidiasis, vaginitis, VPH, endometriosis y post cesárea con ozonoterapia.",
    url: "https://ozonovida.netlify.app/tratamientos/ginecologia",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
  },

  "tratamientos-infecciones": {
    title: "Tratamiento de Infecciones",
    description:
      "Tratamiento de heridas infectadas, pie diabético y úlceras varicosas con ozonoterapia.",
    url: "https://ozonovida.netlify.app/tratamientos/infecciones",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80",
  },

  // Aplicaciones
  aplicaciones: {
    title: "Aplicaciones de Ozonoterapia",
    description:
      "Conoce las diferentes aplicaciones de ozonoterapia: intramuscular, intra articular, auto hemoterapia, sueros ozonizados y más.",
    url: "https://ozonovida.netlify.app/aplicaciones",
    image:
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80",
  },

  "aplicaciones-intramuscular": {
    title: "Aplicación Intramuscular",
    description:
      "Aplicación intramuscular de ozono para el tratamiento del dolor y la regeneración tisular.",
    url: "https://ozonovida.netlify.app/aplicaciones/intramuscular",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
  },

  "aplicaciones-intra-articular": {
    title: "Aplicación Intra Articular",
    description:
      "Aplicación intra articular de ozono para el tratamiento de artrosis, artritis y lesiones articulares.",
    url: "https://ozonovida.netlify.app/aplicaciones/intra-articular",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
  },

  "aplicaciones-auto-hemoterapia": {
    title: "Auto Hemoterapia",
    description:
      "Auto hemoterapia mayor y menor con ozono para el tratamiento de enfermedades crónicas y regeneración.",
    url: "https://ozonovida.netlify.app/aplicaciones/auto-hemoterapia",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
  },

  // Páginas específicas
  "hernias-discales": {
    title: "Tratamiento de Hernias Discales",
    description:
      "Tratamiento efectivo de hernias discales sin cirugía usando ozonoterapia y medicina regenerativa.",
    url: "https://ozonovida.netlify.app/tratamientos/dolor/hernias-discales",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
  },

  diabetes: {
    title: "Tratamiento de Diabetes",
    description:
      "Control y tratamiento de diabetes mellitus con ozonoterapia y medicina regenerativa.",
    url: "https://ozonovida.netlify.app/tratamientos/enfermedades/diabetes",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80",
  },

  "rejuvenecimiento-facial": {
    title: "Rejuvenecimiento Facial",
    description:
      "Tratamiento de rejuvenecimiento facial con ozonoterapia para una piel más joven y saludable.",
    url: "https://ozonovida.netlify.app/tratamientos/estetica/rejuvenecimiento-facial",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
  },
};

// Función para obtener metadata de la página actual
function getPageMetadata() {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split("/").filter((segment) => segment);

  // Determinar el identificador de la página
  let pageId = "index"; // Por defecto

  if (pathSegments.length === 0) {
    pageId = "index";
  } else if (pathSegments.includes("tratamientos")) {
    if (pathSegments.includes("dolor")) {
      pageId = "tratamientos-dolor";
    } else if (pathSegments.includes("enfermedades")) {
      pageId = "tratamientos-enfermedades";
    } else if (pathSegments.includes("estetica")) {
      pageId = "tratamientos-estetica";
    } else if (pathSegments.includes("ginecologia")) {
      pageId = "tratamientos-ginecologia";
    } else if (pathSegments.includes("infecciones")) {
      pageId = "tratamientos-infecciones";
    }
  } else if (pathSegments.includes("aplicaciones")) {
    if (pathSegments.includes("intramuscular")) {
      pageId = "aplicaciones-intramuscular";
    } else if (pathSegments.includes("intra-articular")) {
      pageId = "aplicaciones-intra-articular";
    } else if (pathSegments.includes("auto-hemoterapia")) {
      pageId = "aplicaciones-auto-hemoterapia";
    } else {
      pageId = "aplicaciones";
    }
  } else if (pathSegments.includes("hernias-discales")) {
    pageId = "hernias-discales";
  } else if (pathSegments.includes("diabetes")) {
    pageId = "diabetes";
  } else if (pathSegments.includes("rejuvenecimiento-facial")) {
    pageId = "rejuvenecimiento-facial";
  }

  return PAGE_METADATA[pageId] || PAGE_METADATA["index"];
}

// Función para determinar la ruta base según la profundidad de la página
function getBasePath() {
  const currentPath = window.location.pathname;
  const depth = currentPath.split("/").filter((segment) => segment).length;

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
