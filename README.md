# My Global Rules — DSH Global Hook Plugin

A Host-only DeepSeek Harness bundle. It registers one global `systemPrompt` section so every agent receives the rules from [`AGENTS.md`](AGENTS.md) on every model step, in every workspace.

## Files

| File | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Single source of truth for the rules. Edit this to change what agents receive. |
| [`index.js`](index.js) | Host plugin. Loads `AGENTS.md` and registers it via `ctx.systemPrompt.section`. |
| [`cordis.patch.yml`](cordis.patch.yml) | Loader patch inserting the plugin row. |
| [`package.json`](package.json) | Bundle manifest (`dsh.bundle.patch`). |
| [`locale/en.json`](locale/en.json) | Plugin Manager title and description. |
| [`icon.svg`](icon.svg) | Plugin Manager icon. |

## Edit the rules

Edit [`AGENTS.md`](AGENTS.md), then reinstall or restart DSH so the Host reloads the bundle. The prompt text is read from `AGENTS.md` at activation, so no code changes are needed.

## Push to GitHub

No git repo exists here yet. Run from this directory:

```powershell
git init
git add .
git commit -m "Add global rules hook plugin"
gh repo create myglobalrules --public --source=. --push
```

Or create the repo on github.com first, then:

```powershell
git init
git add .
git commit -m "Add global rules hook plugin"
git remote add origin https://github.com/<you>/myglobalrules.git
git branch -M main
git push -u origin main
```

## Install in DSH

In DeepSeek Harness, install this bundle from your Git URL (Plugin Manager → Install from URL):

```text
https://github.com/<you>/myglobalrules.git
```

Or install the local directory (Plugin Manager → Install from directory), or with the agent tool:

```text
install_bundle with target set to the directory or Git URL
```

Verify: open Plugin Manager and confirm the `myglobalrules` row is active. Then start a new session — the global rules section applies to new agents.
