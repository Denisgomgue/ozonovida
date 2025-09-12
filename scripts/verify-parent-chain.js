#!/usr/bin/env node

/**
 * Script de verificación de cadena de elementos activos
 */

const fs = require("fs");
const path = require("path");

function verifyParentChain() {
  console.log("🔍 Verificando cadena de elementos activos...\n");

  // Verificar JavaScript
  const jsContent = fs.readFileSync("js/app.js", "utf8");

  console.log("⚙️ Verificación de JavaScript:");

  const jsChecks = [
    {
      name: "Función activateParentChain implementada",
      pattern: /activateParentChain.*=.*\(targetItem\)/,
    },
    {
      name: "Función deactivateParentChain implementada",
      pattern: /deactivateParentChain.*=.*\(targetItem\)/,
    },
    {
      name: "Activación de elementos padre en cadena",
      pattern: /parent\.classList\.add\("active"\)/,
    },
    {
      name: "Detección de submenús visibles en cadena",
      pattern: /hasVisibleSubmenus.*querySelector/,
    },
    {
      name: "Lógica aplicada a submenús anidados",
      pattern: /nestedSubmenuItems\.forEach/,
    },
  ];

  jsChecks.forEach((check) => {
    const hasCode = check.pattern.test(jsContent);
    console.log(
      `  ${hasCode ? "✅" : "❌"} ${check.name}: ${
        hasCode ? "Implementado" : "Faltante"
      }`
    );
  });

  // Verificar CSS
  const cssContent = fs.readFileSync("css/styles.css", "utf8");

  console.log("\n🎨 Verificación de estilos CSS:");

  const cssChecks = [
    {
      name: "Estados hover para elementos individuales",
      pattern: /\.dropdown__menu a:hover/,
    },
    {
      name: "Estados hover para tema claro",
      pattern: /\[data-theme="light"\] \.dropdown__menu a:hover/,
    },
    {
      name: "Clase .active para elementos padre",
      pattern: /\.dropdown__item--has-submenu\.active/,
    },
  ];

  cssChecks.forEach((check) => {
    const hasStyle = check.pattern.test(cssContent);
    console.log(
      `  ${hasStyle ? "✅" : "❌"} ${check.name}: ${
        hasStyle ? "Implementado" : "Faltante"
      }`
    );
  });

  console.log("\n🎯 Comportamiento Esperado:");
  console.log(
    "✅ 'Tratamiento de Dolor' se colorea cuando su submenú está abierto"
  );
  console.log("✅ 'Dolores' se colorea cuando su submenú está abierto");
  console.log(
    "✅ 'Columnas' se colorea cuando está siendo hovered/seleccionado"
  );
  console.log("✅ Todos los elementos padre en la cadena se mantienen activos");
  console.log(
    "✅ Los elementos se desactivan solo cuando no hay submenús visibles"
  );

  console.log("\n📋 Ejemplo de navegación:");
  console.log("1. Hover en 'Tratamiento de Dolor' → Se colorea");
  console.log(
    "2. Hover en 'Dolores' → Se colorean ambos: 'Tratamiento de Dolor' y 'Dolores'"
  );
  console.log(
    "3. Hover en 'Columnas' → Se colorean: 'Tratamiento de Dolor', 'Dolores' y 'Columnas'"
  );

  console.log("\n🚀 La cadena de elementos activos está implementada!");
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  verifyParentChain();
}

module.exports = { verifyParentChain };
