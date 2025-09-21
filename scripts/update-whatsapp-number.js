// Script para actualizar el número de WhatsApp en todos los archivos
const fs = require("fs");
const path = require("path");

const oldNumber = "51999999999";
const newNumber = "51988126804";

// Archivos a actualizar
const filesToUpdate = [
  "tratamientos/dolor/index.html",
  "tratamientos/index.html",
  "tratamientos/tratamiento-de-dolor/index.html",
  "tratamientos/tratamiento-de-dolor/dolores/index.html",
  "tratamientos/tratamiento-de-dolor/artrosis/index.html",
  "aplicaciones/index.html",
  "tratamientos/ginecologia/index.html",
  "tratamientos/infecciones/index.html",
  "tratamientos/estetica/index.html",
  "tratamientos/enfermedades/index.html",
  "aplicaciones/intramuscular/index.html",
  "tratamientos/estetica/rejuvenecimiento-facial.html",
];

console.log(
  `🔄 Actualizando número de WhatsApp de ${oldNumber} a ${newNumber}...`
);

let updatedFiles = 0;

filesToUpdate.forEach((filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, "utf8");

      if (content.includes(oldNumber)) {
        content = content.replace(new RegExp(oldNumber, "g"), newNumber);
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`✅ Actualizado: ${filePath}`);
        updatedFiles++;
      } else {
        console.log(`⏭️  Sin cambios: ${filePath}`);
      }
    } else {
      console.log(`❌ No encontrado: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error actualizando ${filePath}:`, error.message);
  }
});

console.log(`\n🎉 Proceso completado: ${updatedFiles} archivos actualizados`);
