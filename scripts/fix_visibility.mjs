import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== '_next' && file !== 'node_modules') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function fixVisibility(filePath) {
  console.log(`Fixing visibility for ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove opacity:0 and transform styles that rely on JS hydration
  const newContent = content
    .replace(/style="opacity:0;transform:translateY\(15px\)"/g, '')
    .replace(/style="opacity:0"/g, '')
    .replace(/<div hidden="">/g, '<div>'); // Remove 'hidden' from divs that might be important

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`  Fixed visibility in ${filePath}`);
  } else {
    console.log(`  No visibility issues found in ${filePath}`);
  }
}

const allHtmlFiles = getAllHtmlFiles(rootDir);
allHtmlFiles.forEach(fixVisibility);

console.log('Visibility fix complete!');
