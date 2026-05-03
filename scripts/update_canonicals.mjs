#!/usr/bin/env node
// Bulk update: add canonical tag to all static HTML pages under the repo
// Canonical URL format: https://tatbau.de/<path-from-root>/
// Example: en/index.html -> https://tatbau.de/en/
//          en/product/index.html -> https://tatbau.de/en/product/

import fs from 'fs';
import path from 'path';

// If currently inside the static root, use CWD; otherwise append the folder name
const maybeRoot = path.resolve(process.cwd(), 'tatbau-hostinger-static');
const ROOT = path.basename(process.cwd()) === 'tatbau-hostinger-static' ? process.cwd() : maybeRoot;
const DOMAIN = 'https://tatbau.de';

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (full.endsWith('.html')) files.push(full);
  }
  return files;
}

function relativeUrl(file) {
  // file path relative to ROOT, convert to URL with trailing slash for index.html
  let rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (rel.endsWith('index.html')) {
    rel = rel.substring(0, rel.length - 'index.html'.length);
  } else {
    rel = rel.endsWith('/') ? rel : rel + '/';
  }
  if (rel === '') rel = '/';
  return DOMAIN + '/' + rel;
}

function ensureCanonical(content, url) {
  if (content.includes('<link rel="canonical"')) {
    return content.replace(/<link\s+rel=\"canonical\"[^>]*>/i, `<link rel="canonical" href="${url}" />`);
  }
  return content.replace(/<head(.*?)>/i, `<head$1>\n  <link rel="canonical" href="${url}" />`);
}

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const url = relativeUrl(file);
  const newContent = ensureCanonical(content, url);
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated canonical in', file);
  } else {
    console.log('No change for', file);
  }
}

function main() {
  const files = walk(ROOT);
  if (!files.length) {
    console.log('No HTML files found under', ROOT);
    return;
  }
  files.forEach(processFile);
  console.log('Canonical update complete. Files processed:', files.length);
}

main();
