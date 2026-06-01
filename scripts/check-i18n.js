/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Helper to extract product IDs from TypeScript file
function extractProductIds(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/id:\s*["']([^"']+)["']/g)];
  return matches.map(m => m[1]);
}

// Get the directory where this script is located
const scriptDir = __dirname;

// Read data using absolute paths
const productIds = extractProductIds(path.join(scriptDir, '../src/services/catalog/products.ts'));
const enProducts = JSON.parse(fs.readFileSync(path.join(scriptDir, '../messages/en.json'), 'utf8')).products;
const esProducts = JSON.parse(fs.readFileSync(path.join(scriptDir, '../messages/es.json'), 'utf8')).products;

const enProductIds = Object.keys(enProducts).filter(k => k !== '_documentation').sort();
const esProductIds = Object.keys(esProducts).filter(k => k !== '_documentation').sort();

console.log('\n========== MISSING TRANSLATIONS ==========\n');

// Products missing EN translations
const missingEN = productIds.filter(id => !enProductIds.includes(id));
if (missingEN.length > 0) {
  console.log(`❌ Missing EN (${missingEN.length}):`);
  missingEN.forEach(id => console.log(`   - ${id}`));
}

// Products missing ES translations
const missingES = productIds.filter(id => !esProductIds.includes(id));
if (missingES.length > 0) {
  console.log(`\n❌ Missing ES (${missingES.length}):`);
  missingES.forEach(id => console.log(`   - ${id}`));
}

console.log('\n========== INVENTED PRODUCTS ==========\n');

// Invented in EN
const extraEN = enProductIds.filter(id => !productIds.includes(id));
if (extraEN.length > 0) {
  console.log(`⚠️  Invented in EN (${extraEN.length}):`);
  extraEN.forEach(id => console.log(`   - ${id}`));
}

// Invented in ES
const extraES = esProductIds.filter(id => !productIds.includes(id));
if (extraES.length > 0) {
  console.log(`\n⚠️  Invented in ES (${extraES.length}):`);
  extraES.forEach(id => console.log(`   - ${id}`));
}

console.log('\n========== SUMMARY ==========');
console.log(`Products in data: ${productIds.length}`);
console.log(`EN translations: ${enProductIds.length} (missing: ${missingEN.length})`);
console.log(`ES translations: ${esProductIds.length} (missing: ${missingES.length})`);
console.log(`Invented EN: ${extraEN.length}, Invented ES: ${extraES.length}`);

const status = missingEN.length === 0 && missingES.length === 0 && extraEN.length === 0 && extraES.length === 0;
console.log(`\nStatus: ${status ? '✓ CLEAN' : '❌ NEEDS FIX'}\n`);

process.exit(status ? 0 : 1);
