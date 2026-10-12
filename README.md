# dotmyfiles

## Windows · Obsidian vault selector

Download [find-obsidian.js](https://raw.githubusercontent.com/devAItester/dotmyfiles/main/sh/find-obsidian.js) to list the vaults registered in Obsidian on Windows and choose one by number.

**Requirements:** Node.js. No npm packages or administrator rights are required.

**Run** from the folder where you saved the file:

```bash
node find-obsidian.js
```

The script reads `%APPDATA%\obsidian\obsidian.json`, prints the registered vault paths, and prompts for a number. Press Enter to choose the first vault. It prints the selected path; it does not modify Obsidian settings or open the vault.

---

## Project README

Tools and configuration files for managing dotfiles.

### Structure and scope

- `README.md` is the project front page and the entry point for downloads and usage instructions.
- `sh/` contains small scripts with one clear responsibility.
- `web/` is reserved for web-facing Markdown if a concrete need appears. A separate website or web UI is not planned without such a need.
- Automated tests are deferred; do not spend current development time building a test suite.

Keep the implementation small and focused. Prefer known paths and explicit inputs over filesystem-wide discovery.
