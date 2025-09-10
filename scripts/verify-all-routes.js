#!/usr/bin/env node

/**
 * Script de verificación final de rutas en todo el proyecto
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

function checkRoutesInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(process.cwd(), filePath);

    const issues = [];

    // Buscar rutas problemáticas
    if (content.includes("pages/tratamientos/")) {
      issues.push('❌ Contiene "pages/tratamientos/"');
    }
    if (content.includes("pages/aplicaciones/")) {
      issues.push('❌ Contiene "pages/aplicaciones/"');
    }
    if (content.includes('href="../pages/')) {
      issues.push('❌ Contiene "href="../pages/"');
    }
    if (content.includes('href="../../pages/')) {
      issues.push('❌ Contiene "href="../../pages/"');
    }
    if (content.includes('href="../../../pages/')) {
      issues.push('❌ Contiene "href="../../../pages/"');
    }

    // Verificar que tenga las rutas correctas
    const hasCorrectTratamientos =
      content.includes("tratamientos/") &&
      !content.includes("pages/tratamientos/");
    const hasCorrectAplicaciones =
      content.includes("aplicaciones/") &&
      !content.includes("pages/aplicaciones/");

    const status = issues.length === 0 ? "✅ CORRECTO" : "⚠️ PROBLEMAS";

    if (
      issues.length > 0 ||
      relativePath.includes("tratamientos") ||
      relativePath.includes("aplicaciones")
    ) {
      console.log(`\n📄 ${relativePath}:`);
      console.log(`   Status: ${status}`);

      if (issues.length > 0) {
        issues.forEach((issue) => console.log(`   ${issue}`));
      } else {
        console.log(`   ✅ Rutas correctas`);
      }

      if (hasCorrectTratamientos) {
        console.log(`   ✅ Tratamientos: OK`);
      }
      if (hasCorrectAplicaciones) {
        console.log(`   ✅ Aplicaciones: OK`);
      }
    }

    return issues.length === 0;
  } catch (error) {
    console.error(`❌ Error checking ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log("🔍 Verificación final de rutas en todo el proyecto...\n");

  const projectRoot = process.cwd();
  const htmlFiles = findHtmlFiles(projectRoot);

  console.log(`📁 Verificando ${htmlFiles.length} archivos HTML:\n`);

  let correctFiles = 0;
  let filesWithIssues = 0;

  htmlFiles.forEach((file) => {
    if (checkRoutesInFile(file)) {
      correctFiles++;
    } else {
      filesWithIssues++;
    }
  });

  console.log(`\n📊 RESUMEN FINAL:`);
  console.log(`✅ Archivos correctos: ${correctFiles}/${htmlFiles.length}`);
  console.log(
    `⚠️ Archivos con problemas: ${filesWithIssues}/${htmlFiles.length}`
  );
  console.log(
    `📈 Porcentaje de éxito: ${Math.round(
      (correctFiles / htmlFiles.length) * 100
    )}%`
  );

  if (filesWithIssues === 0) {
    console.log(`\n🎉 ¡TODAS LAS RUTAS CORREGIDAS!`);
    console.log(`🎯 El proyecto ahora usa:`);
    console.log(`   • tratamientos/ (no pages/tratamientos/)`);
    console.log(`   • aplicaciones/ (no pages/aplicaciones/)`);
    console.log(`\n🚀 ¡Listo para publicar en Netlify!`);
  } else {
    console.log(`\n⚠️ Algunos archivos aún tienen rutas problemáticas`);
    console.log(`🔧 Revisa los archivos marcados con ❌`);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { checkRoutesInFile, findHtmlFiles };
