#!/usr/bin/env node
// Save in golangexpert root, then run: node find-broken-mdx.mjs ./docs

import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';

function getAllFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllFiles(full));
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

const docsDir = process.argv[2] || './docs';
if (!fs.existsSync(docsDir)) {
  console.error(`Not found: ${docsDir}\nUsage: node find-broken-mdx.mjs ./docs`);
  process.exit(1);
}

const files = getAllFiles(docsDir);
console.log(`Testing ${files.length} files...\n`);

let passed = 0, failed = 0;

for (const file of files) {
  try {
    const source = fs.readFileSync(file, 'utf-8');
    await serialize(source, { parseFrontmatter: true, mdxOptions: { development: false } });
    passed++;
  } catch (err) {
    failed++;
    console.error(`FAIL: ${path.relative(docsDir, file)}`);
    console.error(`  ${(err.message || '').slice(0, 200)}\n`);
  }
}

console.log(`\n${passed} passed, ${failed} failed out of ${files.length}`);
