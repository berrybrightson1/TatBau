#!/usr/bin/env node
// Repo-wide cleanup: remove Next.js client assets from static HTML pages
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'tatbau-hostinger-static');

function walk(dir, acc = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) walk(full, acc);
    else if (it.isFile() && full.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function stripNextJs(content) {
  let c = content;
  // remove link tags and hrefs that reference Next.js assets
  c = c.replace(/<link[^>]*\s+href="\/__next__[^\"]*"[^>]*>/gi, '');
  c = c.replace(/<link[^>]*href="\/_next\/[^"]+"[^>]*>/gi, '');
  c = c.replace(/<link[^>]*\bhref=\"\/_next[^\"]+\"[^>]*>/gi, '');
  // remove script tags that reference Next.js assets
  c = c.replace(/<script[^>]*src=\".*?_next[^\"]*.*?\"[^>]*><\/script>/gi, '');
  c = c.replace(/<script[^>]*src=\".*?turbopack[^\"]*\"[^>]*><\/script>/gi, '');
  c = c.replace(/<script[^>]*src=\".*?_next[^\"]*\"[^>]*><\/script>/gi, '');
  // remove any blocks that reference Next.js runtime inlined (common patterns)
  // Also aggressively strip all <script> blocks to guarantee a pure static HTML
  c = c.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  c = c.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  c = c.replace(/<script[\s\S]*?\/?>/gi, '');
  c = c.replace(/<script[^>]*>\s*$/gi, '');
// end of stray block cleanup adjustments; actual scripted removal handled above
  // remove Next.js-specific meta/attributes if present
  c = c.replace(/<meta[^>]*name=\"next-size-adjust\"[^>]*>/gi, '');
  return c;
}

function ensureCanonicalPreserved(html) {
  // If no canonical tag, leave as is (we'll rely on existing content)
  return html;
}

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const newContent = stripNextJs(content);
  const final = ensureCanonicalPreserved(newContent);
  if (final !== content) {
    fs.writeFileSync(file, final, 'utf8');
    console.log('Cleaned Next.js assets in', file);
  }
}

function main() {
  const files = walk(ROOT);
  if (!files.length) {
    console.log('No HTML files found under', ROOT);
    return;
  }
  files.forEach(processFile);
  console.log('Static HTML cleanup complete. Files processed:', files.length);
}

main();
