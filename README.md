# AI CLI Ref

Send file/selection references to your AI CLI terminals (Claude Code, Qoder CLI, etc.) with a keybinding.

## Install

Download `ai-cli-ref-0.0.1.vsix`, then follow the steps for your editor:

**VS Code**
```
code --install-extension ai-cli-ref-0.0.1.vsix
```
Or: **Extensions** panel → `...` menu → **Install from VSIX...**

**Cursor**
```
cursor --install-extension ai-cli-ref-0.0.1.vsix
```
Or: **Extensions** panel → `...` menu → **Install from VSIX...**

**Trae**

Extensions panel → `...` menu → **Install from VSIX...**

## Usage

1. Open a terminal running an AI CLI (e.g., `claude` or `qodercli`)
2. Focus on a file in the editor
3. Press `Ctrl+Alt+C` to send `@path/to/file` to the terminal
4. Or select lines first to send `@path/to/file#10-20`

## Configuration

By default, the extension looks for terminals named `claude` or `qodercli`. You can customize this in settings:

```json
{
  "ai-cli-ref.terminalNames": ["claude", "qodercli"]
}
```

## Custom Keybinding

Open **Keyboard Shortcuts** (`Ctrl+K Ctrl+S`), search for `ai-cli-ref.send`, and rebind to your preferred key.
