const fs = require('fs');
const path = require('path');

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// Copy index.html
if (fs.existsSync('index.html')) {
  fs.copyFileSync('index.html', 'public/index.html');
  console.log('✓ Copied index.html to public/');
}

// Copy icons directory
if (fs.existsSync('icons')) {
  if (!fs.existsSync('public/icons')) {
    fs.mkdirSync('public/icons', { recursive: true });
  }
  
  function copyDir(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  copyDir('icons', 'public/icons');
  console.log('✓ Copied icons directory to public/');
  
  // Create favicon from an existing icon
  if (fs.existsSync('icons/747.png')) {
    fs.copyFileSync('icons/747.png', 'public/favicon.ico');
    console.log('✓ Created favicon.ico');
  }
}

console.log('Build completed successfully!'); 