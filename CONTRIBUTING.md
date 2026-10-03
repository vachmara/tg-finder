# Contributing

Submit changes through a pull request targeting `main`. Use Conventional Commit titles, such as `fix: correct MCP configuration` or `docs: clarify authentication`. Squash merges use the pull request title as the commit message.

Run `python scripts/validate.py` before submitting. Keep the MCP endpoint and server name consistent with the Telegram Finder CLI. Do not add credentials, customer data, private server code, generated output, or environment files.

Changes require the validation check, resolved review conversations, and owner review. Workflow changes must use actions pinned to full commit SHAs. Pull request workflows must not receive secrets or write permissions.
