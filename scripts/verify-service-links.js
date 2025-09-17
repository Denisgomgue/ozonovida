#!/usr/bin/env node

/**
 * Script para verificar enlaces de servicios - OZONO VIDA
 * Verifica que todas las páginas de servicios estén correctamente vinculadas
 */

const fs = require("fs");
const path = require("path");

class ServiceLinksVerifier {
  constructor() {
    this.baseDir = path.join(__dirname, "..");
    this.services = [
      "ozonoterapia",
      "plasma",
      "medicina-regenerativa",
      "coctel-vida",
    ];
    this.results = {
      existing: [],
      missing: [],
      linkedCorrectly: [],
      linkErrors: [],
    };
  }

  // Verificar si existen las páginas de servicios
  checkServicePages() {
    console.log("🔍 Verificando páginas de servicios...\n");

    this.services.forEach((service) => {
      const servicePath = path.join(
        this.baseDir,
        "servicios",
        `${service}.html`
      );

      if (fs.existsSync(servicePath)) {
        this.results.existing.push(service);
        console.log(`✅ ${service}.html - Existe`);
      } else {
        this.results.missing.push(service);
        console.log(`❌ ${service}.html - No existe`);
      }
    });
  }

  // Verificar enlaces en index.html
  checkIndexLinks() {
    console.log("\n🔗 Verificando enlaces en index.html...\n");

    const indexPath = path.join(this.baseDir, "index.html");
    const indexContent = fs.readFileSync(indexPath, "utf8");

    this.services.forEach((service) => {
      const linkPattern = new RegExp(`href="servicios/${service}\\.html"`, "g");
      const matches = indexContent.match(linkPattern);

      if (matches) {
        this.results.linkedCorrectly.push(service);
        console.log(
          `✅ ${service} - Vinculado correctamente (${matches.length} enlaces)`
        );
      } else {
        this.results.linkErrors.push(service);
        console.log(`❌ ${service} - No está vinculado en index.html`);
      }
    });
  }

  // Verificar que las imágenes de servicios existan
  checkServiceImages() {
    console.log("\n🖼️ Verificando imágenes de servicios...\n");

    const imageMap = {
      ozonoterapia: "servicios-ozonoterapia.png",
      plasma: "servicios-plasmaRicoPlaquetas.png",
      "medicina-regenerativa": "servicios-medicinaRegenerativa.png",
      "coctel-vida": "servicios-coctelVida.png",
    };

    Object.entries(imageMap).forEach(([service, imageName]) => {
      const imagePath = path.join(
        this.baseDir,
        "assets/images/services",
        imageName
      );

      if (fs.existsSync(imagePath)) {
        console.log(`✅ ${service} - Imagen existe: ${imageName}`);
      } else {
        console.log(`❌ ${service} - Imagen falta: ${imageName}`);
      }
    });
  }

  // Generar reporte
  generateReport() {
    console.log("\n📊 REPORTE DE VERIFICACIÓN\n");
    console.log("=".repeat(50));

    console.log(`\n✅ Páginas existentes (${this.results.existing.length}):`);
    this.results.existing.forEach((service) =>
      console.log(`   - ${service}.html`)
    );

    console.log(`\n❌ Páginas faltantes (${this.results.missing.length}):`);
    this.results.missing.forEach((service) =>
      console.log(`   - ${service}.html`)
    );

    console.log(
      `\n🔗 Enlaces correctos (${this.results.linkedCorrectly.length}):`
    );
    this.results.linkedCorrectly.forEach((service) =>
      console.log(`   - ${service}`)
    );

    console.log(
      `\n⚠️ Enlaces con errores (${this.results.linkErrors.length}):`
    );
    this.results.linkErrors.forEach((service) =>
      console.log(`   - ${service}`)
    );

    // Generar recomendaciones
    console.log("\n💡 RECOMENDACIONES:\n");

    if (this.results.missing.length > 0) {
      console.log("📝 Crear páginas faltantes:");
      this.results.missing.forEach((service) => {
        console.log(
          `   - Copiar components/service-page-template.html → servicios/${service}.html`
        );
      });
    }

    if (this.results.linkErrors.length > 0) {
      console.log("🔗 Corregir enlaces en index.html:");
      this.results.linkErrors.forEach((service) => {
        console.log(
          `   - Agregar href="servicios/${service}.html" a la card de ${service}`
        );
      });
    }

    if (
      this.results.existing.length === this.services.length &&
      this.results.linkedCorrectly.length === this.services.length
    ) {
      console.log("🎉 ¡Todos los servicios están correctamente configurados!");
    }

    console.log("\n=".repeat(50));
  }

  // Ejecutar verificación completa
  verify() {
    console.log("🚀 VERIFICADOR DE ENLACES DE SERVICIOS - OZONO VIDA\n");

    this.checkServicePages();
    this.checkIndexLinks();
    this.checkServiceImages();
    this.generateReport();
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const verifier = new ServiceLinksVerifier();
  verifier.verify();
}

module.exports = ServiceLinksVerifier;
