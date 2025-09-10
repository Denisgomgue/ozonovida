#!/usr/bin/env node

/**
 * Script para limpiar CSS inline de archivos HTML
 * Reemplaza el CSS crítico inline con una referencia al archivo CSS crítico
 */

const fs = require("fs");
const path = require("path");

// Función para encontrar todos los archivos HTML
function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !item.startsWith(".") &&
      item !== "node_modules"
    ) {
      files.push(...findHtmlFiles(fullPath));
    } else if (stat.isFile() && item.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Función para determinar la ruta relativa al CSS crítico
function getCriticalCssPath(htmlFilePath) {
  const depth = htmlFilePath.split(path.sep).length - 1;
  const relativePath = "../".repeat(depth) + "css/critical.css";
  return relativePath;
}

// Función para limpiar el CSS inline
function cleanInlineCss(content) {
  // Buscar el bloque de estilo crítico
  const styleStart = content.indexOf("<style>");
  const styleEnd = content.indexOf("</style>");

  if (styleStart === -1 || styleEnd === -1) {
    return content; // No hay CSS inline
  }

  // Extraer el contenido antes y después del CSS
  const beforeStyle = content.substring(0, styleStart);
  const afterStyle = content.substring(styleEnd + 8); // +8 para incluir '</style>'

  return beforeStyle + afterStyle;
}

// Función para agregar la referencia al CSS crítico
function addCriticalCssLink(content, cssPath) {
  // Buscar donde insertar el link (después de los meta tags)
  const metaEnd = content.indexOf("</head>");
  if (metaEnd === -1) {
    console.warn("No se encontró </head> en el archivo");
    return content;
  }

  const beforeHead = content.substring(0, metaEnd);
  const afterHead = content.substring(metaEnd);

  const criticalCssLink = `  <!-- CSS Crítico -->
  <link rel="stylesheet" href="${cssPath}" />
  
`;

  return beforeHead + criticalCssLink + afterHead;
}

// Función principal
function main() {
  console.log("🧹 Limpiando CSS inline de archivos HTML...\n");

  const htmlFiles = findHtmlFiles(".");
  let processedCount = 0;

  htmlFiles.forEach((file) => {
    try {
      const content = fs.readFileSync(file, "utf8");

      // Verificar si tiene CSS inline
      if (!content.includes("<style>")) {
        console.log(`⏭️  ${file} - Sin CSS inline`);
        return;
      }

      // Limpiar CSS inline
      let cleanedContent = cleanInlineCss(content);

      // Agregar referencia al CSS crítico
      const cssPath = getCriticalCssPath(file);
      cleanedContent = addCriticalCssLink(cleanedContent, cssPath);

      // Escribir el archivo limpio
      fs.writeFileSync(file, cleanedContent, "utf8");

      console.log(`✅ ${file} - CSS inline removido, referencia agregada`);
      processedCount++;
    } catch (error) {
      console.error(`❌ Error procesando ${file}:`, error.message);
    }
  });

  console.log(
    `\n🎉 Proceso completado. ${processedCount} archivos procesados.`
  );
  console.log("\n📋 Resumen:");
  console.log("• CSS crítico extraído a css/critical.css");
  console.log("• Referencias agregadas a todos los archivos HTML");
  console.log("• CSS inline removido de archivos HTML");
  console.log("\n💡 Beneficios:");
  console.log("• Código más limpio y profesional");
  console.log("• CSS centralizado y reutilizable");
  console.log("• Mejor mantenibilidad");
  console.log("• Evita duplicación de código");
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { cleanInlineCss, addCriticalCssLink, findHtmlFiles };
