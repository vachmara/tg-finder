# TG Finder

CLI, MCP and agent integrations for [TG Finder](https://www.telegram-finder.io).

Find Telegram accounts from authorized phone numbers or usernames and discover related public Telegram channels through the hosted TG Finder MCP server.

## Connect an MCP client

The root `.mcp.json` configures the hosted server:

```json
{
  "mcpServers": {
    "tg-finder": {
      "type": "http",
      "url": "https://www.telegram-finder.io/mcp"
    }
  }
}
```

Use this configuration in a client that supports HTTP MCP servers and OAuth. If the client does not load `.mcp.json` automatically, add the server URL through its MCP settings. Complete the client's OAuth flow when prompted.

## Grok plugin

The Grok plugin manifest is at `.grok-plugin/plugin.json`. It declares the hosted MCP server and repository metadata. The plugin uses the same endpoint as `.mcp.json`.

## Repository contents

- `.mcp.json`: configuration for compatible MCP clients.
- `.grok-plugin/plugin.json`: Grok plugin manifest.
- `LICENSE`: MIT license for the files in this repository.

## License

This repository is licensed under the [MIT License](LICENSE). The hosted service has its own access and authentication requirements.
