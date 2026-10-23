import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./public/', import.meta.url));
const types = {
  '.html': 'text/html;charset=utf-8',
  '.css': 'text/css;charset=utf-8',
  '.js': 'text/javascript;charset=utf-8'
};

const server = http.createServer(async (request, response) => {
  try {
    const wanted = request.url === '/' ? 'index.html' : request.url.split('?')[0].slice(1);
    const path = normalize(join(root, wanted));
    if (!path.startsWith(root)) throw new Error('Invalid path');
    const data = await readFile(path);
    response.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

server.listen(process.env.PORT || 4203, '127.0.0.1', () => {
  console.log('BEES Health http://localhost:4203');
});

function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5_000).unref();
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
