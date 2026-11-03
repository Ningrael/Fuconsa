import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, '..');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

function startProcess(name, cmd, args, cwd) {
  const proc = spawn(cmd, args, {
    cwd,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, PORT: name === 'API' ? '4000' : '5173' }
  });

  proc.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error(`[${name}] Error al iniciar:`, err.message);
  });

  return proc;
}

const apiProcess = startProcess('API', npmCmd, ['run', 'start'], resolve(ROOT_DIR, 'apps/api'));
const webProcess = startProcess('WEB', npmCmd, ['run', 'dev', '--', '--port', '5173'], resolve(ROOT_DIR, 'apps/web'));

function cleanup() {
  // eslint-disable-next-line no-console
  console.log('\n[Fuconsa] Deteniendo servidores locales...');
  try {
    if (apiProcess.pid) process.kill(apiProcess.pid);
  } catch {}
  try {
    if (webProcess.pid) process.kill(webProcess.pid);
  } catch {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
