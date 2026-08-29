const vscode = require('vscode');
const { matchesTerminalName } = require('./terminal-matcher');

const DEFAULT_TERMINAL_NAMES = ['claude', '✳ *', 'qodercli'];

async function isDirectory(uri) {
  try {
    const stat = await vscode.workspace.fs.stat(uri);
    return (stat.type & vscode.FileType.Directory) !== 0;
  } catch {
    return false;
  }
}

function resolvePath(uri, useAbsolute) {
  if (useAbsolute) {
    return uri.fsPath;
  }
  return vscode.workspace.asRelativePath(uri);
}

async function activate(context) {
  const cmd = vscode.commands.registerCommand('ai-cli-ref.send', async (uri) => {
    let ref;

    const config = vscode.workspace.getConfiguration('ai-cli-ref');
    const useAbsolute = config.get('pathMode', 'absolute') !== 'relative';

    if (uri) {
      // Invoked from explorer context menu
      const path = resolvePath(uri, useAbsolute);
      const isDir = await isDirectory(uri);
      // Absolute path: `/path/to/file`; relative path: `@path/to/file`
      const prefix = useAbsolute ? '' : '@';
      ref = isDir ? `\`${prefix}${path}/\`` : `\`${prefix}${path}\``;
    } else {
      // Invoked from keybinding (requires active editor)
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('No active editor');
        return;
      }
      const path = resolvePath(editor.document.uri, useAbsolute);
      const prefix = useAbsolute ? '' : '@';
      const sel = editor.selection;
      ref = sel.isEmpty
        ? `\`${prefix}${path}\``
        : `\`${prefix}${path}#${sel.start.line + 1}-${sel.end.line + 1}\``;
    }

    const terminalNames = config.get('terminalNames', DEFAULT_TERMINAL_NAMES);
    const matchedTerminals = vscode.window.terminals.filter(
      terminal => matchesTerminalName(terminal.name, terminalNames),
    );
    if (matchedTerminals.length === 0) {
      await vscode.env.clipboard.writeText(ref);
      vscode.window.showInformationMessage('No AI CLI terminal found — reference has been copied to clipboard');
      return;
    }

    const active = vscode.window.activeTerminal;
    const terminal = (active && matchesTerminalName(active.name, terminalNames) ? active : null)
      ?? matchedTerminals[matchedTerminals.length - 1];

    terminal.show();
    terminal.sendText(ref, false);
  });

  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
