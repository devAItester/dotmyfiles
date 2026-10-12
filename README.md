# dotmyfiles

Tools and configuration files for managing dotfiles.

## Project status

- The existing `devAItester/dotfiles` repository remains **private** and serves as a working draft/reference while `dotmyfiles` is developed.
- Use the GitHub Wiki for project documentation instead of building a website or web UI for now.
- Automated tests are deferred. Their planned work is tracked in [TODO.md](TODO.md).

## Development approach

Keep the implementation small and focused. Prefer separate scripts with one clear responsibility; shared scripts belong in `scripts/`, and application-specific files belong under `apps/<app>/`.

Avoid filesystem-wide discovery unless it is necessary. Prefer known paths and explicit inputs.

## Documentation

Maintain user-facing instructions and project notes in the GitHub Wiki. Keep this README as a short entry point and status summary.
