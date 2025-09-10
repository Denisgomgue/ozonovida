#!/usr/bin/env node

/**
 * Script de verificación específico para páginas de aplicaciones
 */

const fs = require("fs");
const path = require("path");

function verifyAplicacionesPage(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(process.cwd(), filePath);

    const checks = {
      hasHeadPlaceholder: content.includes('id="head-placeholder"'),
      hasHeaderPlaceholder: content.includes('id="header-placeholder"'),
      hasFooterPlaceholder: content.includes('id="footer-placeholder"'),
      hasUIComponentsPlaceholder: content.includes(
        'id="ui-components-placeholder"'
      ),
      hasSocialConfig: content.includes("social-config.js"),
      hasMetadataConfig: content.includes("metadata-config.js"),
      hasOptimizedLoader: content.includes("optimized-component-loader.js"),
      hasAppJs: content.includes("app.js"),
      hasDeferAttribute: content.includes("defer"),
      hasDataTheme: content.includes('data-theme="light"'),
      hasSkipLink: content.includes('class="skip-link"'),
      hasMainTag: content.includes("<main>"),
    };

    const allPassed = Object.values(checks).every((check) => check);

    console.log(`\n📄 ${relativePath}:`);
    console.log(
      `  ✓ Head placeholder: ${checks.hasHeadPlaceholder ? "✅" : "❌"}`
    );
    console.log(
      `  ✓ Header placeholder: ${checks.hasHeaderPlaceholder ? "✅" : "❌"}`
    );
    console.log(
      `  ✓ Footer placeholder: ${checks.hasFooterPlaceholder ? "✅" : "❌"}`
    );
    console.log(
      `  ✓ UI Components placeholder: ${
        checks.hasUIComponentsPlaceholder ? "✅" : "❌"
      }`
    );
    console.log(`  ✓ Social config: ${checks.hasSocialConfig ? "✅" : "❌"}`);
    console.log(
      `  ✓ Metadata config: ${checks.hasMetadataConfig ? "✅" : "❌"}`
    );
    console.log(
      `  ✓ Optimized loader: ${checks.hasOptimizedLoader ? "✅" : "❌"}`
    );
    console.log(`  ✓ App.js: ${checks.hasAppJs ? "✅" : "❌"}`);
    console.log(
      `  ✓ Defer attribute: ${checks.hasDeferAttribute ? "✅" : "❌"}`
    );
    console.log(`  ✓ Data theme: ${checks.hasDataTheme ? "✅" : "❌"}`);
    console.log(`  ✓ Skip link: ${checks.hasSkipLink ? "✅" : "❌"}`);
    console.log(`  ✓ Main tag: ${checks.hasMainTag ? "✅" : "❌"}`);
    console.log(`  📊 Status: ${allPassed ? "✅ COMPLETE" : "⚠️ INCOMPLETE"}`);

    return allPassed;
  } catch (error) {
    console.error(`❌ Error verifying ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log("🔍 Verificación específica de páginas de aplicaciones...\n");

  const aplicacionesFiles = [
    "aplicaciones/index.html",
    "aplicaciones/intramuscular/index.html",
  ];

  let passedFiles = 0;

  aplicacionesFiles.forEach((file) => {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      console.log(`🔍 Verificando: ${file}`);
      if (verifyAplicacionesPage(fullPath)) {
        passedFiles++;
      }
    } else {
      console.log(`⚠ File not found: ${file}`);
    }
  });

  console.log(`\n📊 RESUMEN APLICACIONES:`);
  console.log(
    `✅ Archivos completos: ${passedFiles}/${aplicacionesFiles.length}`
  );
  console.log(
    `📈 Porcentaje de éxito: ${Math.round(
      (passedFiles / aplicacionesFiles.length) * 100
    )}%`
  );

  if (passedFiles === aplicacionesFiles.length) {
    console.log(`\n🎉 ¡PÁGINAS DE APLICACIONES COMPLETAMENTE FUNCIONALES!`);
    console.log(`🎯 Todas las páginas tienen:`);
    console.log(`   • Head dinámico (metadatos, CSS, etc.)`);
    console.log(`   • Header dinámico (navegación)`);
    console.log(`   • Footer dinámico (enlaces, redes sociales)`);
    console.log(`   • UI Components (botones de tema y subida)`);
    console.log(`   • Sistema de componentes optimizado`);
    console.log(`   • Enlaces de redes sociales centralizados`);
    console.log(`\n🚀 Las páginas de aplicaciones están listas!`);
  } else {
    console.log(`\n⚠️ Algunas páginas de aplicaciones necesitan atención`);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { verifyAplicacionesPage };

