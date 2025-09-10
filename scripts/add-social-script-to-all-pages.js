#!/usr/bin/env node

/**
 * Script para agregar social-config.js a todas las páginas HTML que no lo tengan
 */

const fs = require("fs");
const path = require("path");

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
        item !== "node_modules" &&
        item !== "components"
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

function addSocialConfigScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Verificar si ya tiene social-config.js
    if (content.includes("social-config.js")) {
      console.log(
        `✓ ${path.relative(
          process.cwd(),
          filePath
        )} already has social-config.js`
      );
      return false;
    }

    // Encontrar la línea donde están los otros scripts
    const scriptPattern =
      /<script src="[^"]*metadata-config\.js"[^>]*><\/script>/;
    const match = content.match(scriptPattern);

    if (match) {
      // Calcular la ruta relativa correcta
      const relativePath = path.relative(
        path.dirname(filePath),
        path.join(process.cwd(), "js")
      );
      const scriptPath = relativePath.replace(/\\/g, "/");

      // Agregar el script de social-config después de metadata-config
      const newScript = `<script src="${scriptPath}/social-config.js" defer></script>`;
      content = content.replace(match[0], match[0] + "\n  " + newScript);

      fs.writeFileSync(filePath, content, "utf8");
      console.log(
        `✓ Added social-config.js to ${path.relative(process.cwd(), filePath)}`
      );
      return true;
    } else {
      console.log(
        `⚠ No metadata-config.js found in ${path.relative(
          process.cwd(),
          filePath
        )}`
      );
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log("🚀 Adding social-config.js to all HTML pages...\n");

  const projectRoot = process.cwd();
  const htmlFiles = findHtmlFiles(projectRoot);

  console.log(`📁 Found ${htmlFiles.length} HTML files:\n`);

  let updatedFiles = 0;

  htmlFiles.forEach((file) => {
    const relativePath = path.relative(projectRoot, file);
    console.log(`🔍 Processing: ${relativePath}`);

    if (addSocialConfigScript(file)) {
      updatedFiles++;
    }
  });

  console.log(`\n✅ Process completed!`);
  console.log(`📊 Files updated: ${updatedFiles}/${htmlFiles.length}`);

  if (updatedFiles > 0) {
    console.log(`\n🎯 Next steps:`);
    console.log(`1. All pages now have social-config.js`);
    console.log(`2. Header and footer should load on all pages`);
    console.log(`3. Social links should work everywhere`);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { addSocialConfigScript, findHtmlFiles };

