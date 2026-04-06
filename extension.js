const vscode = require('vscode');

function activate(context) {
  const cmd = vscode.commands.registerCommand('ai-cli-ref.send', (uri) => {
    let ref;

    if (uri) {
      // Invoked from explorer context menu
      const relPath = vscode.workspace.asRelativePath(uri);
      ref = `\`@${relPath}\``;
    } else {
      // Invoked from keybinding (requires active editor)
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('No active editor');
        return;
      }
      const relPath = vscode.workspace.asRelativePath(editor.document.uri);
      const sel = editor.selection;
      ref = sel.isEmpty
        ? `\`@${relPath}\``
        : `\`@${relPath}#${sel.start.line + 1}-${sel.end.line + 1}\``;
    }

    const config = vscode.workspace.getConfiguration('ai-cli-ref');
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
