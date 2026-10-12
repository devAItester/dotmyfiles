# dotmyfiles

## Windows · Obsidian vault selector

Download [find-obsidian.js](https://raw.githubusercontent.com/devAItester/dotmyfiles/main/sh/find-obsidian.js) to list the vaults registered in Obsidian on Windows and choose one by number.

**Requirements:** Node.js; no npm packages or administrator rights required.

**Run** from the folder where you saved the file:

```bash
node find-obsidian.js
```

The script reads `%APPDATA%\obsidian\obsidian.json`, prints the registered vault paths, and prompts for a number. Press Enter to choose the first vault. It prints the selected path; it does not modify Obsidian settings or open the vault.

---

## Project README

Tools and configuration files for managing dotfiles.

### Project status

- The existing [`devAItester/dotfiles`](https://github.com/devAItester/dotfiles) repository remains **private** and serves as a working draft/reference while `dotmyfiles` is developed.
- The root README is the project front page and the entry point for service downloads and essential usage information.
- Put any future web-facing Markdown files in `web/`. Do not build a separate website or web UI unless a concrete need appears.
- Automated tests are deferred. Their planned work is tracked in [TODO.md](TODO.md).

### Development approach

Keep the implementation small and focused. Prefer separate scripts with one clear responsibility; shared scripts belong in `scripts/`, and application-specific files belong under `apps/<app>/`.

Avoid filesystem-wide discovery unless it is necessary. Prefer known paths and explicit inputs.

### Documentation

Use this README for the service front page and concise project-level information. Add Markdown under `web/` only when web-facing documentation is actually needed. Other documentation files are not planned unless a concrete need arises.
