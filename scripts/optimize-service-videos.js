#!/usr/bin/env node

/**
 * Script para optimizar videos de servicios - OZONO VIDA
 * Verifica tamaño, formato y genera versiones optimizadas
 */

const fs = require("fs");
const path = require("path");

class VideoOptimizer {
  constructor() {
    this.baseDir = path.join(__dirname, "..");
    this.videosDir = path.join(this.baseDir, "assets/movies");
    this.services = [
      "ozonoterapia",
      "plasma",
      "medicina-regenerativa",
      "coctel-vida",
    ];
  }

  // Verificar videos existentes
  checkExistingVideos() {
    console.log("🎬 VERIFICANDO VIDEOS DE SERVICIOS\n");
    console.log("=".repeat(50));

    this.services.forEach((service) => {
      const videoPath = path.join(
        this.videosDir,
        `${service}_movie_service.mp4`
      );

      if (fs.existsSync(videoPath)) {
        const stats = fs.statSync(videoPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`✅ ${service}_movie_service.mp4`);
        console.log(`   📏 Tamaño: ${sizeMB} MB`);
        console.log(`   📅 Modificado: ${stats.mtime.toLocaleDateString()}`);

        // Recomendaciones de optimización
        if (stats.size > 10 * 1024 * 1024) {
          // > 10MB
          console.log(
            `   ⚠️ RECOMENDACIÓN: Video grande (${sizeMB}MB). Considerar comprimir.`
          );
        } else if (stats.size > 5 * 1024 * 1024) {
          // > 5MB
          console.log(
            `   💡 SUGERENCIA: Video moderado (${sizeMB}MB). Opcional comprimir para web.`
          );
        } else {
          console.log(`   ✅ Tamaño óptimo para web (${sizeMB}MB)`);
        }

        console.log("");
      } else {
        console.log(`❌ ${service}_movie_service.mp4 - No existe`);
        console.log("   💡 Crear video o usar placeholder\n");
      }
    });
  }

  // Generar código HTML para videos
  generateVideoHTML() {
    console.log("📝 CÓDIGO HTML PARA VIDEOS\n");
    console.log("=".repeat(50));

    this.services.forEach((service) => {
      const videoPath = path.join(
        this.videosDir,
        `${service}_movie_service.mp4`
      );
      const videoExists = fs.existsSync(videoPath);

      console.log(`\n🎬 ${service.toUpperCase()}:`);

      if (videoExists) {
        console.log("```html");
        console.log(`<!-- Video real para ${service} -->`);
        console.log(`<div class="video-real-container">`);
        console.log(`  <video`);
        console.log(`    class="service-video"`);
        console.log(`    controls`);
        console.log(`    preload="metadata"`);
        console.log(
          `    poster="../assets/images/services/servicios-${
            service === "medicina-regenerativa"
              ? "medicinaRegenerativa"
              : service === "coctel-vida"
              ? "coctelVida"
              : service === "plasma"
              ? "plasmaRicoPlaquetas"
              : "ozonoterapia"
          }.png"`
        );
        console.log(`    aria-label="Video explicativo sobre ${service}">`);
        console.log(
          `    <source src="../assets/movies/${service}_movie_service.mp4" type="video/mp4">`
        );
        console.log(`    <p>Tu navegador no soporta videos HTML5.</p>`);
        console.log(`  </video>`);
        console.log(`  <div class="video-info">`);
        console.log(`    <h4>Video Explicativo - ${service}</h4>`);
        console.log(`    <p>Descubre cómo funciona ${service}</p>`);
        console.log(`  </div>`);
        console.log(`</div>`);
        console.log("```");
      } else {
        console.log("```html");
        console.log(
          `<!-- Placeholder para ${service} (video no disponible) -->`
        );
        console.log(`<div class="video-placeholder">`);
        console.log(`  <div class="video-play-button">`);
        console.log(`    <i class="fa-solid fa-play"></i>`);
        console.log(`  </div>`);
        console.log(`  <div class="video-content">`);
        console.log(`    <h4>Video Explicativo</h4>`);
        console.log(`    <p>Descubre cómo funciona ${service}</p>`);
        console.log(`  </div>`);
        console.log(`</div>`);
        console.log("```");
      }
    });
  }

  // Generar recomendaciones de optimización
  generateOptimizationTips() {
    console.log("\n💡 RECOMENDACIONES DE OPTIMIZACIÓN\n");
    console.log("=".repeat(50));

    console.log("📹 PARA VIDEOS EXISTENTES:");
    console.log("1. Resolución recomendada: 1280x720 (HD)");
    console.log("2. Formato: MP4 con H.264");
    console.log("3. Tamaño máximo: 5-8 MB para web");
    console.log("4. Duración recomendada: 1-3 minutos");
    console.log("5. Bitrate: 1000-2000 kbps");

    console.log("\n🎨 PARA POSTERS:");
    console.log("1. Usar la imagen del servicio como poster");
    console.log("2. Resolución: 1200x630 (ratio 16:9)");
    console.log("3. Formato: PNG o JPG optimizado");

    console.log("\n⚡ OPTIMIZACIÓN DE CARGA:");
    console.log('1. preload="metadata" - Solo carga metadatos');
    console.log("2. Lazy loading con Intersection Observer");
    console.log("3. Comprimir videos con FFmpeg");
    console.log("4. Generar múltiples resoluciones");

    console.log("\n🔧 COMANDOS FFMPEG ÚTILES:");
    console.log("# Comprimir video para web:");
    console.log(
      "ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 128k output.mp4"
    );
    console.log("\n# Generar poster desde video:");
    console.log("ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 poster.jpg");
  }

  // Ejecutar análisis completo
  analyze() {
    this.checkExistingVideos();
    this.generateVideoHTML();
    this.generateOptimizationTips();
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const optimizer = new VideoOptimizer();
  optimizer.analyze();
}

module.exports = VideoOptimizer;
