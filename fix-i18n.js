/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

// Get all EN products
const enProducts = JSON.parse(fs.readFileSync('./public/locales/en/products.json', 'utf8'));
const esProducts = JSON.parse(fs.readFileSync('./public/locales/es/products.json', 'utf8'));

// Lista de productos faltantes en ES
const missingInES = [
  'sopita_dona_gallina', 'vinagre_baldom', 'gandules_verdes_goya', 'habichuelas_negras_goya',
  'maiz_la_famosa', 'salchichas_jaja', 'sardinas_gord', 'tomates_pelados_la_famosa',
  'ajies_morrones', 'cebollas_rojas', 'fresas', 'mandarinas', 'manzanas_amarillas',
  'manzanas_rojas', 'pepinos', 'tomates_de_ensalada', 'uvas_moradas', 'zanahorias',
  'leche_entera_rica', 'queso_gorgonzola', 'queso_gouda', 'yogurt_fresa_yoka',
  'yogurt_natural_rica', 'traje_2_piezas', 'traje_azul', 'traje_completo',
  'traje_elegante', 'traje_negro', 'tablet_apple', 'tablet_rted', 'tablet_samsung',
  'tablet_tcl', 'tablet_tecnomaster'
];

console.log('=== GENERATING ES TRANSLATIONS ===\n');

const newTranslations = {};

missingInES.forEach(id => {
  if (enProducts[id]) {
    newTranslations[id] = {
      name: enProducts[id].name,
      description: enProducts[id].description,
      specs: enProducts[id].specs
    };
    console.log(`✓ ${id}`);
  } else {
    console.log(`✗ ${id} - NOT FOUND IN EN`);
  }
});

// Write updated ES file
esProducts._documentation = esProducts._documentation || enProducts._documentation;
Object.assign(esProducts, newTranslations);

fs.writeFileSync(
  './public/locales/es/products.json',
  JSON.stringify(esProducts, null, 2),
  'utf8'
);

console.log(`\n✓ Updated ES translations (${Object.keys(newTranslations).length} new entries)`);

// Fix EN: remove invented product
const invEntries = Object.keys(enProducts).filter(k => !['_documentation', 'paquete_de_fresas'].includes(k) || k === '_documentation');
const cleanedEN = { _documentation: enProducts._documentation };
Object.keys(enProducts)
  .filter(k => k !== '_documentation' && k !== 'paquete_de_fresas')
  .sort()
  .forEach(k => { cleanedEN[k] = enProducts[k]; });

fs.writeFileSync(
  './public/locales/en/products.json',
  JSON.stringify(cleanedEN, null, 2),
  'utf8'
);

console.log('✓ Removed invented product: paquete_de_fresas from EN');
console.log('\nDone! Run "npm run validate" to verify.\n');
