import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const server = spawn(process.execPath, ['server.mjs'], {
  cwd: root,
  env: { ...process.env, PORT: '4203' },
  stdio: ['ignore', 'pipe', 'pipe']
});

server.stdout.on('data', chunk => process.stdout.write(`[server] ${chunk}`));
server.stderr.on('data', chunk => process.stderr.write(`[server] ${chunk}`));

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`BEES server exited with code ${server.exitCode}`);
    try {
      const response = await fetch('http://127.0.0.1:4203/');
      if (response.ok) return;
    } catch {}
    await new Promise(resolveWait => setTimeout(resolveWait, 200));
  }
  throw new Error('Timed out waiting for the BEES server on port 4203');
}

let exitCode = 1;
try {
  await waitForServer();
  const playwrightCli = resolve(root, 'node_modules', '@playwright', 'test', 'cli.js');
  const testProcess = spawn(process.execPath, [playwrightCli, 'test', ...process.argv.slice(2)], {
    cwd: root,
    env: process.env,
    stdio: 'inherit'
  });
  const [code] = await once(testProcess, 'exit');
  exitCode = code ?? 1;
} finally {
  if (server.exitCode === null) {
    server.kill();
    await Promise.race([
      once(server, 'exit'),
      new Promise(resolveWait => setTimeout(resolveWait, 5_000))
    ]);
  }
}

process.exitCode = exitCode;
