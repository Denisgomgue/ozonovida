// Script de conveniencia para ejecutar scripts de automatización
// Uso: node run-script.js [comando]

const { execSync } = require("child_process");

const commands = {
  generate: "scripts/generate-optimized-pages.js",
  update: "scripts/update-all-html-files.js",
};

function showHelp() {
  console.log("🚀 Scripts de Automatización - OZONO VIDA");
  console.log("");
  console.log("Comandos disponibles:");
  console.log("  node run-script.js generate    - Generar páginas optimizadas");
  console.log(
    "  node run-script.js update      - Actualizar archivos HTML existentes"
  );
  console.log("  node run-script.js help        - Mostrar esta ayuda");
  console.log("");
  console.log("Ejemplos:");
  console.log("  node run-script.js generate");
  console.log("  node run-script.js update");
}

function runScript(scriptPath) {
  try {
    console.log(`🚀 Ejecutando: ${scriptPath}`);
    execSync(`node ${scriptPath}`, { stdio: "inherit" });
    console.log("✅ Script ejecutado exitosamente");
  } catch (error) {
    console.error("❌ Error ejecutando script:", error.message);
    process.exit(1);
  }
}

// Obtener comando desde argumentos
const command = process.argv[2];

if (!command || command === "help") {
  showHelp();
} else if (commands[command]) {
  runScript(commands[command]);
} else {
  console.error(`❌ Comando desconocido: ${command}`);
  showHelp();
  process.exit(1);
}
