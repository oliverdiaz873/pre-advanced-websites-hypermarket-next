/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

// Read current JSON files
const enProducts = JSON.parse(fs.readFileSync('./public/locales/en/products.json', 'utf8'));
const esProducts = JSON.parse(fs.readFileSync('./public/locales/es/products.json', 'utf8'));

// Add missing "fresas" translation
const fresasTranslation = {
  name: "Strawberry Pack",
  description: "Fresh strawberries packed with natural sweetness and juicy flavor. Perfect for desserts, smoothies, or fresh consumption.",
  specs: [
    "Type: Fresh Strawberries",
    "Weight: 500g",
    "Origin: Fresh picked",
    "Best for: Desserts and fresh eating",
    "Storage: Refrigerate for best results"
  ]
};

enProducts.fresas = fresasTranslation;

// Spanish version
const fresasTranslationES = {
  name: "Paquete de Fresas",
  description: "Fresas frescas llenas de sabor natural y jugosidad. Perfectas para postres, batidos o consumo directo.",
  specs: [
    "Tipo: Fresas Frescas",
    "Peso: 500g",
    "Origen: Recién cosechadas",
    "Ideal para: Postres y consumo fresco",
    "Almacenamiento: Refrigerar para mejor conservación"
  ]
};

esProducts.fresas = fresasTranslationES;

// Write updated files
fs.writeFileSync(
  './public/locales/en/products.json',
  JSON.stringify(enProducts, null, 2),
  'utf8'
);

fs.writeFileSync(
  './public/locales/es/products.json',
  JSON.stringify(esProducts, null, 2),
  'utf8'
);

console.log('✓ Added "fresas" translation to EN and ES');
console.log('\nRun "npm run validate" to verify clean status.\n');
