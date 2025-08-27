#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function mdToString(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const jsString = JSON.stringify(content);
    return jsString;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }
}

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node md-to-string.mjs <path-to-md-file>');
  process.exit(1);
}

const resolvedPath = resolve(__dirname, filePath);
const result = mdToString(resolvedPath);

console.log(result);
