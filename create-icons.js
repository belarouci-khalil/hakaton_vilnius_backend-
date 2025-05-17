const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const svgPath = path.join(__dirname, 'public', 'shopping-cart.svg');
const favicon = path.join(__dirname, 'public', 'favicon.ico');
const logo192 = path.join(__dirname, 'public', 'logo192.png');
const logo512 = path.join(__dirname, 'public', 'logo512.png');

// Verify SVG exists
if (!fs.existsSync(svgPath)) {
  console.error('SVG file not found!');
  process.exit(1);
}

try {
  // Create PNG versions
  console.log('Creating PNG files...');
  execSync(`npx svg2png ${svgPath} ${logo512} --width=512 --height=512`);
  execSync(`npx svg2png ${svgPath} ${logo192} --width=192 --height=192`);
  
  // Create favicon.ico
  console.log('Creating favicon.ico...');
  execSync(`npx svg-to-ico ${svgPath} > ${favicon}`);
  
  console.log('Icons created successfully!');
} catch (error) {
  console.error('Error creating icons:', error);
} 