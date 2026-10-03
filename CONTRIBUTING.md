# Contributing

Submit changes through a pull request targeting `main`. Use Conventional Commit titles, such as `fix: correct MCP configuration` or `docs: clarify authentication`. Squash merges use the pull request title as the commit message.

Use Node.js 24 or newer and run `npm run check` before submitting. The TypeScript validator runs directly in Node without installing dependencies. Keep the MCP endpoint and server name consistent with the Telegram Finder CLI. Do not add credentials, customer data, private server code, generated output, or environment files.

Keep internal comparisons and audit reports outside tracked files. Never publish private repository identifiers, commit references, source details, or findings without explicit approval for publication.

Changes require the validation check, resolved review conversations, and owner review. Workflow changes must use actions pinned to full commit SHAs. Pull request workflows must not receive secrets or write permissions.
