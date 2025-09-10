#!/usr/bin/env node

/**
 * Script mejorado para agregar referencias al CSS crítico
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

// Función para agregar la referencia al CSS crítico
function addCriticalCssLink(content, cssPath) {
  // Verificar si ya tiene la referencia
  if (content.includes("css/critical.css")) {
    return content;
  }

  // Buscar donde insertar el link (después de los meta tags básicos)
  const metaEnd = content.indexOf('<meta name="viewport"');
  if (metaEnd === -1) {
    console.warn("No se encontró meta viewport en el archivo");
    return content;
  }

  const viewportEnd = content.indexOf(">", metaEnd) + 1;
  const beforeViewport = content.substring(0, viewportEnd);
  const afterViewport = content.substring(viewportEnd);

  const criticalCssLink = `\n  <!-- CSS Crítico -->
  <link rel="stylesheet" href="${cssPath}" />`;

  return beforeViewport + criticalCssLink + afterViewport;
}

// Función principal
function main() {
  console.log("🔧 Agregando referencias al CSS crítico...\n");

  const htmlFiles = findHtmlFiles(".");
  let processedCount = 0;

  htmlFiles.forEach((file) => {
    try {
      const content = fs.readFileSync(file, "utf8");

      // Verificar si ya tiene la referencia
      if (content.includes("css/critical.css")) {
        console.log(`⏭️  ${file} - Ya tiene referencia al CSS crítico`);
        return;
      }

      // Agregar referencia al CSS crítico
      const cssPath = getCriticalCssPath(file);
      const updatedContent = addCriticalCssLink(content, cssPath);

      // Escribir el archivo actualizado
      fs.writeFileSync(file, updatedContent, "utf8");

      console.log(`✅ ${file} - Referencia agregada: ${cssPath}`);
      processedCount++;
    } catch (error) {
      console.error(`❌ Error procesando ${file}:`, error.message);
    }
  });

  console.log(
    `\n🎉 Proceso completado. ${processedCount} archivos actualizados.`
  );
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { addCriticalCssLink, findHtmlFiles };
