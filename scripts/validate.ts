import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function object(value: unknown): Record<string, unknown> {
  assert.ok(value !== null && typeof value === 'object' && !Array.isArray(value), 'Expected a JSON object')
  return Object.fromEntries(Object.entries(value))
}

function readObject(path: string): Record<string, unknown> {
  const value: unknown = JSON.parse(readFileSync(path, 'utf8'))
  return object(value)
}

const expected = { type: 'http', url: 'https://www.telegram-finder.io/mcp' }
const config = readObject(resolve(root, '.mcp.json'))
const manifest = readObject(resolve(root, '.grok-plugin/plugin.json'))

assert.deepEqual(config, { mcpServers: { 'tg-finder': expected } }, 'Unexpected portable MCP configuration')
const servers = object(manifest.mcpServers)
assert.deepEqual(Object.keys(servers), ['tg-finder'], 'Unexpected Grok MCP server')
const server = object(servers['tg-finder'])
assert.deepEqual({ type: server.type, url: server.url }, expected, 'Grok and portable MCP configurations differ')
assert.equal(manifest.name, 'tg-finder', 'Unexpected plugin name')
assert.equal(manifest.license, 'MIT', 'Unexpected plugin license')

const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(Boolean)
for (const filename of tracked) {
  const parts = filename.split('/')
  const name = parts.at(-1) ?? ''
  const prohibited = name === '.env'
    || name.startsWith('.env.') && name !== '.env.example'
    || ['.pem', '.key', '.bak'].includes(extname(name))
    || parts.some(part => ['.audit', 'node_modules', 'dist', 'internal', 'private'].includes(part))
    || filename === 'docs/repository-comparison.md'
  assert.ok(!prohibited, `Private or generated file must not be tracked: ${filename}`)
}

if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
  const eventPath = process.env.GITHUB_EVENT_PATH
  assert.ok(eventPath, 'Missing pull request event path')
  const pullRequest = object(readObject(eventPath).pull_request)
  assert.equal(typeof pullRequest.title, 'string', 'Missing pull request title')
  assert.ok(typeof pullRequest.title === 'string'
    && /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([\w./-]+\))?!?: .+$/.test(pullRequest.title),
  'Use a Conventional Commit title, for example: fix: correct MCP configuration')
}

process.stdout.write('MCP configuration, manifest, tracked-file, and applicable PR title checks passed.\n')
