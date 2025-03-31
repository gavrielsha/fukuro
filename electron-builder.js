// electron-builder.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the output directory exists
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Run the build script first to ensure the HTML is generated
console.log('Running build script to generate HTML...');
execSync('npm run build', { stdio: 'inherit' });

// The standard electron-builder config is in package.json
