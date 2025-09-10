#!/usr/bin/env node

/**
 * Script para convertir páginas con header/footer hardcodeados al sistema de componentes
 */

const fs = require("fs");
const path = require("path");

function convertPageToComponentSystem(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    // Buscar el header hardcodeado y reemplazarlo con placeholder
    const headerPattern = /<header[^>]*>[\s\S]*?<\/header>/;
    if (headerPattern.test(content)) {
      content = content.replace(
        headerPattern,
        '<div id="header-placeholder"></div>'
      );
      modified = true;
      console.log(
        `✓ Replaced hardcoded header with placeholder in ${path.relative(
          process.cwd(),
          filePath
        )}`
      );
    }

    // Buscar el footer hardcodeado y reemplazarlo con placeholder
    const footerPattern = /<footer[^>]*>[\s\S]*?<\/footer>/;
    if (footerPattern.test(content)) {
      content = content.replace(
        footerPattern,
        '<div id="footer-placeholder"></div>'
      );
      modified = true;
      console.log(
        `✓ Replaced hardcoded footer with placeholder in ${path.relative(
          process.cwd(),
          filePath
        )}`
      );
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`📝 Updated: ${path.relative(process.cwd(), filePath)}`);
    }

    return modified;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log("🚀 Converting hardcoded pages to component system...\n");

  const filesToConvert = [
    "tratamientos/enfermedades/diabetes.html",
    "tratamientos/estetica/rejuvenecimiento-facial.html",
  ];

  let updatedFiles = 0;

  filesToConvert.forEach((file) => {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      console.log(`🔍 Processing: ${file}`);
      if (convertPageToComponentSystem(fullPath)) {
        updatedFiles++;
      }
    } else {
      console.log(`⚠ File not found: ${file}`);
    }
  });

  console.log(`\n✅ Process completed!`);
  console.log(`📊 Files updated: ${updatedFiles}/${filesToConvert.length}`);

  if (updatedFiles > 0) {
    console.log(`\n🎯 Next steps:`);
    console.log(`1. Pages now use component system`);
    console.log(`2. Header and footer will load dynamically`);
    console.log(`3. Social links will work on all pages`);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { convertPageToComponentSystem };

