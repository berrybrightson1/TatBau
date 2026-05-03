#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const cwdName = path.basename(process.cwd());
const ROOT = (cwdName === 'tatbau-hostinger-static') ? process.cwd() : path.resolve(process.cwd(), 'tatbau-hostinger-static');

function walk(dir, acc = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) walk(full, acc);
    else if (it.isFile() && full.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function checkCanonical(file) {
  const content = fs.readFileSync(file, 'utf8');
  const hasCanonical = /<link\s+rel=["']canonical["'][^>]*href=["']https?:\/\/tatbau\.de[^"']*["']/.test(content);
  return hasCanonical;
}

function ensureNoNextAssets(file) {
  const content = fs.readFileSync(file, 'utf8');
  // escape slash in regex
  return !(/_next|turbopack|__next|__Sreact|\/__not-found\//.test(content));
}

function main() {
  const htmlFiles = walk(ROOT);
  let ok = true;
  const missingCanonical = [];
  for (const f of htmlFiles) {
    if (!checkCanonical(f)) missingCanonical.push(f);
    if (!ensureNoNextAssets(f)) {
      console.error('Found Next.js asset references in:', f);
      ok = false;
    }
  }
  if (!fs.existsSync(path.join(ROOT, 'sitemap.xml'))) {
    console.error('Missing sitemap.xml in site root');
    ok = false;
  }
  if (!fs.existsSync(path.join(ROOT, '404.html'))) {
    console.error('Missing 404.html in site root');
    ok = false;
  }
  if (missingCanonical.length > 0) {
    ok = false;
    console.error('Pages missing canonical tags:', missingCanonical.length);
    missingCanonical.forEach(p => console.log(' -', p));
  }
  if (ok) {
    console.log('Static build validation: PASS');
  } else {
    console.error('Static build validation: FAIL');
    process.exit(1);
  }
}

main();
