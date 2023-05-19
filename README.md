# :gear: `setup-op` ![](https://github.com/settlemint/setup-op/workflows/Tests/badge.svg)

## About
This action sets up the 1Password CLI, [`op`](https://1password.com/downloads/command-line/), on GitHub Actions runners.

This action will install and expose a specified version of the `gh` CLI on the runner environment and will setup the authentication using a Service Account.

## Why?

1Password provides a [load-secrets-action](https://github.com/1Password/load-secrets-action) which installs the op tool and can load environment secrets, but it has some flaws:

- It does not support a specific version of the `op` CLI
- It does not support the ARM version of the `op` CLI (made a PR for this, but it was not yet merged)
- It does not use the tool cache which slows down usage of the action
- It does not expose the `op` CLI to the runner environment so you cannot use it in a different way than designed
- Launching a dozen runners with a dozen secrets each will hit your rate limits very soon, this action allows you to use `op inject` to write env files bypassing this rate limit

## Usage

Setup the `op` CLI:

```yaml
steps:
- uses: settlemint/setup-op@v1
  with:
    service-account-token: ${{ secrets.OP_SERVICE_ACCOUNT_TOKEN }}
```

A specific version of the `op` CLI can be installed:

```yaml
steps:
- uses: settlemint/setup-op@v1
  with:
    version: 2.18.0
    service-account-token: ${{ secrets.OP_SERVICE_ACCOUNT_TOKEN }}
```

## Inputs
The actions supports the following inputs:

- `version`: The version of `op` to install, defaulting to `2.18.0`

## License

Based off [the example action by Github](https://github.com/github-developer/example-setup-gh) which is [MIT](LICENSE) licensed.
