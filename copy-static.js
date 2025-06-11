const fs = require('fs');
const path = require('path');

// Files to copy from public to dist
const staticFiles = [
  '.nojekyll',
  'robots.txt',
  'favicon.ico',
  'fallback-data.json'
];

// Ensure the dist directory exists
const distDir = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log(`Created dist directory at ${distDir}`);
}

// Copy each file
let copiedCount = 0;
staticFiles.forEach(file => {
  const srcPath = path.resolve(__dirname, 'public', file);
  const destPath = path.resolve(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    copiedCount++;
    console.log(`Copied ${file} to dist folder`);
  } else {
    console.warn(`Warning: ${file} not found in public folder at ${srcPath}`);
  }
});

console.log(`Static file copy complete. Copied ${copiedCount} of ${staticFiles.length} files.`);
