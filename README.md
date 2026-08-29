# AI CLI Ref

Send file/selection references to your AI CLI terminals (Claude Code, Qoder CLI, etc.) with a keybinding.

## Install

Download the latest `.vsix`, then follow the steps for your editor:

**VS Code**

```
code --install-extension ai-cli-ref-0.0.3.vsix
```
Or: **Extensions** panel → `...` menu → **Install from VSIX...**

**Cursor**
```
cursor --install-extension ai-cli-ref-0.0.3.vsix
```
Or: **Extensions** panel → `...` menu → **Install from VSIX...**

## Usage

1. Open a terminal running an AI CLI (e.g., `claude` or `qodercli`)
2. Use one of these methods to insert a file reference:
   - **Keybinding**: Press `Ctrl+Alt+C` to send the active file path
   - **Explorer context menu**: Right-click a file or folder → "Insert File Reference"
3. Select lines first to append a line range such as `#10-20`

## Custom Keybinding

Open **Keyboard Shortcuts** (`Ctrl+K Ctrl+S`), search for `ai-cli-ref.send`, and rebind to your preferred key.

## Configuration

| Setting | Type | Default | Description |
|---|---|---|---|
| `ai-cli-ref.terminalNames` | `string[]` | `["claude", "✳ *", "qodercli"]` | Terminal name patterns to target |
| `ai-cli-ref.pathMode` | `"absolute"` \| `"relative"` | `"absolute"` | Path style for file references |

**Example `settings.json`:**

```json
{
  "ai-cli-ref.pathMode": "absolute",
  "ai-cli-ref.terminalNames": ["claude", "✳ *", "qodercli"]
}
```

Terminal name matching is case-insensitive. Use `*` to match any number of
characters and `?` to match exactly one character. For example, `✳ *` matches
the terminal name `✳ Claude Code`.

By default, references use absolute paths (e.g., `` `/home/user/project/src/foo.ts` ``).
Set `pathMode` to `"relative"` to use workspace-relative paths (e.g., `` `@src/foo.ts` ``).
