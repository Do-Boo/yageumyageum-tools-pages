import { readFile } from 'node:fs/promises';

const host = 'yageumyageum-tools-pages.vercel.app';
const key = 'bf695f251fd5a6f47bd9e627cba4b424';
const keyLocation = `https://${host}/${key}.txt`;
const endpoint = 'https://api.indexnow.org/indexnow';

const sitemap = await readFile('public/sitemap.xml', 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList,
  }),
});

const body = await response.text();
console.log(`${response.status} ${response.statusText}`);
if (body) console.log(body);
if (!response.ok) process.exitCode = 1;
