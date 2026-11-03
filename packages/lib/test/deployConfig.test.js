import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, '../../..');

const DOCKER_COMPOSE_PATH = resolve(ROOT_DIR, 'docker-compose.yml');
const SERVICE_UNIT_PATH = resolve(ROOT_DIR, 'scripts/deploy/fuconsa.service');
const DEPLOY_SCRIPT_PATH = resolve(ROOT_DIR, 'scripts/deploy/deploy-vps.sh');

test('docker-compose.yml defines robust high-availability and healthchecks', () => {
  assert.ok(existsSync(DOCKER_COMPOSE_PATH), 'docker-compose.yml must exist');
  const content = readFileSync(DOCKER_COMPOSE_PATH, 'utf-8');

  // Verify restart policies
  const restartMatches = content.match(/restart:\s*always/g) || [];
  assert.ok(restartMatches.length >= 2, 'Both api and web must specify restart: always');

  // Verify healthchecks for both api and web
  const healthMatches = content.match(/healthcheck:/g) || [];
  assert.ok(healthMatches.length >= 2, 'Both api and web must define healthcheck');
  assert.ok(content.includes('/api/health'), 'API healthcheck must probe /api/health');
  assert.ok(content.includes('http://localhost:80/'), 'Web healthcheck must probe port 80');

  // Verify dependency and logging
  assert.ok(content.includes('condition: service_healthy'), 'Web must depend on healthy API');
  assert.ok(content.includes('max-size: "10m"'), 'Log rotation max-size must be 10m');
  assert.ok(content.includes('max-file: "3"'), 'Log rotation max-file must be 3');
});

test('scripts/deploy/fuconsa.service defines standard systemd auto-restart unit', () => {
  assert.ok(existsSync(SERVICE_UNIT_PATH), 'fuconsa.service must exist');
  const service = readFileSync(SERVICE_UNIT_PATH, 'utf-8');

  assert.ok(service.includes('After=network-online.target docker.service'), 'Must start after docker');
  assert.ok(service.includes('Requires=docker.service'), 'Must require docker.service');
  assert.ok(service.includes('Restart=always'), 'Must configure Restart=always');
  assert.ok(service.includes('RestartSec=10'), 'Must configure RestartSec=10');
  assert.ok(service.includes('WantedBy=multi-user.target'), 'Must enable on multi-user.target');
  assert.ok(service.includes('docker compose up -d --build'), 'Must run docker compose up');
});

test('scripts/deploy/deploy-vps.sh contains idempotent deployment steps', () => {
  assert.ok(existsSync(DEPLOY_SCRIPT_PATH), 'deploy-vps.sh must exist');
  const script = readFileSync(DEPLOY_SCRIPT_PATH, 'utf-8');

  assert.ok(script.includes('git pull origin main'), 'Must sync with main branch');
  assert.ok(script.includes('docker compose up -d --build --remove-orphans'), 'Must build containers');
  assert.ok(script.includes('systemctl enable fuconsa.service'), 'Must enable systemd unit');
  assert.ok(script.includes('/api/health'), 'Must verify API healthcheck');
});
