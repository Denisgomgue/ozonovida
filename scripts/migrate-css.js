#!/usr/bin/env node

/**
 * Script para migrar el CSS monolítico a arquitectura modular
 * OZONO VIDA - CSS Migration Tool
 */

const fs = require("fs");
const path = require("path");

class CSSMigrator {
  constructor() {
    this.currentCSS = "";
    this.extractedSections = {};
    this.baseDir = path.join(__dirname, "../css");
  }

  // Leer el archivo CSS actual
  readCurrentCSS() {
    const cssPath = path.join(this.baseDir, "styles.css");
    this.currentCSS = fs.readFileSync(cssPath, "utf8");
    console.log("✅ CSS actual leído correctamente");
  }

  // Extraer variables CSS
  extractVariables() {
    const variablesRegex = /:root\s*{[^}]*}/gs;
    const lightThemeRegex = /\[data-theme="light"\]\s*{[^}]*}/gs;

    const variables = this.currentCSS.match(variablesRegex) || [];
    const lightTheme = this.currentCSS.match(lightThemeRegex) || [];

    this.extractedSections.variables = [
      "/* ===== VARIABLES EXTRAÍDAS AUTOMÁTICAMENTE ===== */",
      ...variables,
      "",
      "/* ===== TEMA CLARO ===== */",
      ...lightTheme,
    ].join("\n");

    console.log("✅ Variables CSS extraídas");
  }

  // Extraer estilos de botones
  extractButtons() {
    const buttonRegex = /\.btn[^{]*{[^}]*}/gs;
    const buttons = this.currentCSS.match(buttonRegex) || [];

    this.extractedSections.buttons = [
      "/* ===== BOTONES EXTRAÍDOS AUTOMÁTICAMENTE ===== */",
      ...buttons,
    ].join("\n\n");

    console.log("✅ Estilos de botones extraídos");
  }

  // Extraer estilos específicos de servicios
  extractServicesStyles() {
    const servicesRegex =
      /\/\* ===== ESTILOS ESPECÍFICOS PARA PÁGINAS DE SERVICIOS ===== \*\/[\s\S]*$/;
    const servicesMatch = this.currentCSS.match(servicesRegex);

    if (servicesMatch) {
      this.extractedSections.services = servicesMatch[0];
      console.log("✅ Estilos de servicios extraídos");
    }
  }

  // Crear directorios si no existen
  createDirectories() {
    const dirs = [
      "css/base",
      "css/components",
      "css/layout",
      "css/pages",
      "css/themes",
    ];

    dirs.forEach((dir) => {
      const fullPath = path.join(__dirname, "..", dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`📁 Directorio creado: ${dir}`);
      }
    });
  }

  // Escribir archivos extraídos
  writeExtractedFiles() {
    // Escribir variables si fueron extraídas
    if (this.extractedSections.variables) {
      const variablesPath = path.join(
        this.baseDir,
        "base/variables-extracted.css"
      );
      fs.writeFileSync(variablesPath, this.extractedSections.variables);
      console.log("💾 Variables guardadas en base/variables-extracted.css");
    }

    // Escribir botones si fueron extraídos
    if (this.extractedSections.buttons) {
      const buttonsPath = path.join(
        this.baseDir,
        "components/buttons-extracted.css"
      );
      fs.writeFileSync(buttonsPath, this.extractedSections.buttons);
      console.log("💾 Botones guardados en components/buttons-extracted.css");
    }

    // Escribir servicios si fueron extraídos
    if (this.extractedSections.services) {
      const servicesPath = path.join(
        this.baseDir,
        "pages/services-extracted.css"
      );
      fs.writeFileSync(servicesPath, this.extractedSections.services);
      console.log("💾 Servicios guardados en pages/services-extracted.css");
    }
  }

  // Crear backup del CSS original
  createBackup() {
    const originalPath = path.join(this.baseDir, "styles.css");
    const backupPath = path.join(this.baseDir, "styles-backup.css");

    fs.copyFileSync(originalPath, backupPath);
    console.log("🔒 Backup creado: styles-backup.css");
  }

  // Generar reporte de migración
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      originalFileSize: this.currentCSS.length,
      extractedSections: Object.keys(this.extractedSections),
      recommendations: [
        "Revisar los archivos extraídos y ajustar según necesidades",
        "Actualizar las importaciones en HTML",
        "Probar en diferentes páginas",
        "Optimizar carga condicional de CSS",
      ],
    };

    const reportPath = path.join(this.baseDir, "migration-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log("📊 Reporte de migración generado: migration-report.json");
  }

  // Ejecutar migración completa
  migrate() {
    console.log("🚀 Iniciando migración CSS...\n");

    try {
      this.createBackup();
      this.readCurrentCSS();
      this.createDirectories();
      this.extractVariables();
      this.extractButtons();
      this.extractServicesStyles();
      this.writeExtractedFiles();
      this.generateReport();

      console.log("\n✅ Migración completada exitosamente!");
      console.log("\n📋 Próximos pasos:");
      console.log(
        "1. Revisar archivos en css/base/, css/components/, css/pages/"
      );
      console.log("2. Actualizar importaciones en HTML");
      console.log("3. Probar en navegador");
      console.log("4. Ajustar según necesidades específicas");
    } catch (error) {
      console.error("❌ Error durante la migración:", error.message);
      process.exit(1);
    }
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const migrator = new CSSMigrator();
  migrator.migrate();
}

module.exports = CSSMigrator;
