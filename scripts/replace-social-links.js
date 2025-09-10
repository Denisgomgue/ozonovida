#!/usr/bin/env node

/**
 * Script para reemplazar automáticamente todos los enlaces de redes sociales hardcodeados
 * con placeholders que serán reemplazados dinámicamente por el sistema centralizado
 */

const fs = require("fs");
const path = require("path");

// Configuración de reemplazos
const REPLACEMENTS = {
  // WhatsApp - diferentes números encontrados
  "https://wa.me/51999999999": "data-whatsapp-link",
  "https://wa.me/51982070151": "data-whatsapp-link",
  "https://wa.me/982070151": "data-whatsapp-link",
  "https://wa.me/+51982070151": "data-whatsapp-link",

  // TikTok
  "https://tiktok.com/@stella_maris_medical": "data-tiktok-link",
  "https://www.tiktok.com/@stella_maris_medical": "data-tiktok-link",

  // Enlaces vacíos que deben ser reemplazados
  'href="#"': "data-social-placeholder",
};

// Patrones de mensajes de WhatsApp para reemplazar
const WHATSAPP_MESSAGE_PATTERNS = [
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20tratamientos\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20tratamiento%20del%20dolor\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20tratamientos%20estéticos\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20tratamiento%20de%20infecciones\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20consulta%20ginecológica\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20tratamiento%20de%20enfermedades%20crónicas\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20rejuvenecimiento%20facial\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20aplicaciones%20de%20ozonoterapia\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20aplicación%20intramuscular\./g,
  /text=Hola%20STELLA%20MARIS%2C%20quisiera%20información%20sobre%20tratamiento%20de%20diabetes\./g,
];

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    // Reemplazar enlaces de WhatsApp
    Object.keys(REPLACEMENTS).forEach((oldLink) => {
      if (content.includes(oldLink)) {
        // Reemplazar el href completo
        const hrefPattern = new RegExp(
          `href="${oldLink.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
          "g"
        );
        content = content.replace(
          hrefPattern,
          `href="${REPLACEMENTS[oldLink]}"`
        );
        modified = true;
        console.log(`✓ Replaced ${oldLink} in ${filePath}`);
      }
    });

    // Reemplazar mensajes de WhatsApp específicos
    WHATSAPP_MESSAGE_PATTERNS.forEach((pattern) => {
      if (pattern.test(content)) {
        content = content.replace(pattern, "data-whatsapp-message");
        modified = true;
        console.log(`✓ Replaced WhatsApp message pattern in ${filePath}`);
      }
    });

    // Reemplazar enlaces vacíos de redes sociales
    const emptySocialPattern =
      /href="#".*aria-label="(Facebook|Instagram|TikTok)"/g;
    if (emptySocialPattern.test(content)) {
      content = content.replace(
        emptySocialPattern,
        'data-social-placeholder aria-label="$1"'
      );
      modified = true;
      console.log(`✓ Replaced empty social links in ${filePath}`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`📝 Updated: ${filePath}`);
    }

    return modified;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findHtmlFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (
        stat.isDirectory() &&
        !item.startsWith(".") &&
        item !== "node_modules"
      ) {
        traverse(fullPath);
      } else if (stat.isFile() && item.endsWith(".html")) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

function main() {
  console.log("🚀 Iniciando reemplazo de enlaces de redes sociales...\n");

  const projectRoot = path.join(__dirname, "..");
  const htmlFiles = findHtmlFiles(projectRoot);

  console.log(`📁 Encontrados ${htmlFiles.length} archivos HTML:\n`);

  let updatedFiles = 0;

  htmlFiles.forEach((file) => {
    const relativePath = path.relative(projectRoot, file);
    console.log(`🔍 Procesando: ${relativePath}`);

    if (replaceInFile(file)) {
      updatedFiles++;
    }
  });

  console.log(`\n✅ Proceso completado!`);
  console.log(`📊 Archivos actualizados: ${updatedFiles}/${htmlFiles.length}`);

  if (updatedFiles > 0) {
    console.log(`\n🎯 Próximos pasos:`);
    console.log(`1. Los enlaces ahora usan placeholders dinámicos`);
    console.log(`2. El sistema centralizado los reemplazará automáticamente`);
    console.log(
      `3. Actualiza SOCIAL_CONFIG en js/social-config.js con tus enlaces reales`
    );
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { replaceInFile, findHtmlFiles };

