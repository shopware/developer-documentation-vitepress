# Tests

CLI tests make sure all features in CLI works as intended. They are configured in `package.json:scripts`:
- `test:cli` - runs CLI vitest tests in `./__tests__/cli/` using pre-built `./docs-cli` (`./packages/cli/dist/docs-cli.js`)
  and `sandbox` directory as a working directory
- `test:cli:coverage` - runs coverage for CLI