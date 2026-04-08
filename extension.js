const vscode = require('vscode');

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
      // Folders end with / in the reference
      ref = isDir ? `\`@${path}/\`` : `\`@${path}\``;
    } else {
      // Invoked from keybinding (requires active editor)
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('No active editor');
        return;
      }
      const path = resolvePath(editor.document.uri, useAbsolute);
      const sel = editor.selection;
      ref = sel.isEmpty
        ? `\`@${path}\``
        : `\`@${path}#${sel.start.line + 1}-${sel.end.line + 1}\``;
    }
    const terminalNames = config.get('terminalNames', ['claude', 'qodercli']);

    const matchedTerminals = vscode.window.terminals.filter(t => terminalNames.includes(t.name));
    if (matchedTerminals.length === 0) {
      vscode.window.showWarningMessage(`No AI CLI terminal found (looking for: ${terminalNames.join(', ')})`);
      return;
    }

    const active = vscode.window.activeTerminal;
    const terminal = (active && terminalNames.includes(active.name) ? active : null)
      ?? matchedTerminals[matchedTerminals.length - 1];

    terminal.show();
    terminal.sendText(ref, false);
  });

  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
