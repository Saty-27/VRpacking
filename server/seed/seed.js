const { execSync } = require('child_process');
const path = require('path');

console.log('🌱 Starting VR Packaging Solutions seed process...\n');

const scripts = ['seedAdmin.js', 'seedProducts.js', 'seedContent.js', 'seedSections.js'];

for (const script of scripts) {
  console.log(`📦 Running ${script}...`);
  try {
    execSync(`node ${path.join(__dirname, script)}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Error in ${script}:`, error.message);
    process.exit(1);
  }
}

console.log('\n🎉 All seed scripts completed successfully!');
