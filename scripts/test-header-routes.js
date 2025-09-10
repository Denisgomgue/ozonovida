#!/usr/bin/env node

/**
 * Script de prueba para verificar rutas del header
 */

const fs = require("fs");
const path = require("path");

// Simular la función processHeaderPaths
function processHeaderPaths(content, basePath) {
  // Reemplazar placeholders con rutas correctas según la profundidad
  let processedContent = content.replace(/\{\{BASE_PATH\}\}/g, basePath);

  // Ajustar rutas específicas según la profundidad de la página
  if (basePath === "./") {
    // Página raíz - las rutas ya están correctas
    return processedContent;
  } else if (basePath === "../") {
    // Una carpeta de profundidad - ajustar rutas relativas
    return processedContent
      .replace(/href="\.\.\/tratamientos\//g, 'href="../tratamientos/')
      .replace(/href="\.\.\/aplicaciones\//g, 'href="../aplicaciones/')
      .replace(/href="\.\.\/index\.html/g, 'href="../index.html');
  } else if (basePath === "../../") {
    // Dos carpetas de profundidad
    return processedContent
      .replace(/href="\.\.\/tratamientos\//g, 'href="../../tratamientos/')
      .replace(/href="\.\.\/aplicaciones\//g, 'href="../../aplicaciones/')
      .replace(/href="\.\.\/index\.html/g, 'href="../../index.html');
  } else if (basePath === "../../../") {
    // Tres carpetas de profundidad
    return processedContent
      .replace(/href="\.\.\/tratamientos\//g, 'href="../../../tratamientos/')
      .replace(/href="\.\.\/aplicaciones\//g, 'href="../../../aplicaciones/')
      .replace(/href="\.\.\/index\.html/g, 'href="../../../index.html');
  }

  return processedContent;
}

function testRoutes() {
  console.log("🔍 Probando rutas del header...\n");

  // Leer el header.html
  const headerContent = fs.readFileSync("components/header.html", "utf8");

  // Probar diferentes niveles de profundidad
  const testCases = [
    { basePath: "./", description: "Página raíz (index.html)" },
    {
      basePath: "../",
      description: "Una carpeta de profundidad (tratamientos/index.html)",
    },
    {
      basePath: "../../",
      description:
        "Dos carpetas de profundidad (tratamientos/enfermedades/index.html)",
    },
    {
      basePath: "../../../",
      description:
        "Tres carpetas de profundidad (tratamientos/enfermedades/diabetes.html)",
    },
  ];

  testCases.forEach((testCase, index) => {
    console.log(`\n📄 ${testCase.description}:`);
    console.log(`   BASE_PATH: "${testCase.basePath}"`);

    const processedContent = processHeaderPaths(
      headerContent,
      testCase.basePath
    );

    // Extraer algunas rutas de ejemplo para verificar
    const tratamientosMatch = processedContent.match(
      /href="([^"]*tratamientos\/[^"]*)"/
    );
    const aplicacionesMatch = processedContent.match(
      /href="([^"]*aplicaciones\/[^"]*)"/
    );
    const indexMatch = processedContent.match(/href="([^"]*index\.html[^"]*)"/);

    if (tratamientosMatch) {
      console.log(`   ✅ Tratamientos: ${tratamientosMatch[1]}`);
    }
    if (aplicacionesMatch) {
      console.log(`   ✅ Aplicaciones: ${aplicacionesMatch[1]}`);
    }
    if (indexMatch) {
      console.log(`   ✅ Index: ${indexMatch[1]}`);
    }
  });

  console.log(`\n🎯 Verificación completada!`);
  console.log(`📝 Las rutas ahora deberían apuntar correctamente a:`);
  console.log(`   • tratamientos/ (no pages/tratamientos/)`);
  console.log(`   • aplicaciones/ (no pages/aplicaciones/)`);
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  testRoutes();
}

module.exports = { processHeaderPaths, testRoutes };
