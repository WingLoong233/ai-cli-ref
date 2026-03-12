# Claude Ref

Send file/selection references to your Claude Code terminal with a keybinding.

## Install

Download `claude-ref-0.0.1.vsix`, then follow the steps for your editor:

**VS Code**
```
code --install-extension claude-ref-0.0.1.vsix
```
Or: **Extensions** panel → `...` menu → **Install from VSIX...**

**Cursor**
```
cursor --install-extension claude-ref-0.0.1.vsix
```
Or: **Extensions** panel → `...` menu → **Install from VSIX...**

**Trae**

Extensions panel → `...` menu → **Install from VSIX...**

## Usage

1. Open a terminal named exactly `claude` (i.e. run `claude` in a terminal)
2. Focus on a file in the editor
3. Press `Ctrl+Alt+C` to send `@path/to/file` to the terminal
4. Or select lines first to send `@path/to/file#10-20`

## Custom Keybinding

Open **Keyboard Shortcuts** (`Ctrl+K Ctrl+S`), search for `claude-ref.send`, and rebind to your preferred key.
