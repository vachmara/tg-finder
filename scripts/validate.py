import json
import pathlib
import subprocess

root = pathlib.Path(__file__).resolve().parent.parent
config = json.loads((root / '.mcp.json').read_text(encoding='utf-8'))
manifest = json.loads((root / '.grok-plugin/plugin.json').read_text(encoding='utf-8'))
expected = {'type': 'http', 'url': 'https://www.telegram-finder.io/mcp'}
if config != {'mcpServers': {'telegram-finder': expected}}:
    raise SystemExit('Portable MCP configuration differs from the canonical endpoint or server name')
server = manifest['mcpServers']['telegram-finder']
if {key: server[key] for key in expected} != expected:
    raise SystemExit('Grok MCP configuration differs from the portable configuration')
if set(manifest['mcpServers']) != {'telegram-finder'}:
    raise SystemExit('Unexpected Grok MCP server')
if manifest['name'] != 'tg-finder' or manifest['license'] != 'MIT':
    raise SystemExit('Unexpected plugin metadata')
tracked = subprocess.check_output(['git', 'ls-files', '-z'], cwd=root).decode().split('\0')
for filename in filter(None, tracked):
    path = pathlib.PurePosixPath(filename)
    if (path.name == '.env' or path.name.startswith('.env.') and path.name != '.env.example'
            or path.suffix in {'.pem', '.key', '.bak'}
            or any(part in {'.audit', 'node_modules', 'dist'} for part in path.parts)):
        raise SystemExit(f'Private or generated file must not be tracked: {filename}')
print('MCP configuration, manifest, and tracked-file checks passed.')
