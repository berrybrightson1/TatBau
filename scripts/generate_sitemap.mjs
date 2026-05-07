#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// ROOT is the repository root for static site (tatbau-hostinger-static directory)
const ROOT = path.resolve(process.cwd());
const DOMAIN = 'https://tatbau.de';

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of list) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) results.push(...walk(full));
    else if (ent.isFile() && ent.name.endsWith('.html')) results.push(full);
  }
  return results;
}

function urlFrom(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (!rel.endsWith('index.html')) return null;
  const base = rel.slice(0, -'index.html'.length);
  if (base === '' || base === '/') return `${DOMAIN}/`;
  return `${DOMAIN}/${base}`;
}

function lastMod(file) {
  const stat = fs.statSync(file);
  const dt = new Date(stat.mtime);
  return dt.toISOString().split('T')[0];
}

function main() {
  const files = walk(ROOT);
  const urls = [];
  for (const f of files) {
    const rel = urlFrom(f);
    if (!rel) continue;
    if (rel.includes('/404') || rel.includes('/_not-found')) continue;
    urls.push({ loc: rel, lastmod: lastMod(f) });
  }

  const header = '<?xml version="1.0" encoding="UTF-8"?>';
  const open = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const items = urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n');
  const close = '</urlset>';
  const sitemap = [header, open, items, close].filter(Boolean).join('\n');
  const sitemapPath = path.join(ROOT, 'sitemap_V1.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('sitemap_V1.xml generated with', urls.length, 'URLs at', sitemapPath);
}

main();
