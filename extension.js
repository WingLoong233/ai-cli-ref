const vscode = require('vscode');

function activate(context) {
  const cmd = vscode.commands.registerCommand('claude-ref.send', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('No active editor');
      return;
    }

    const relPath = vscode.workspace.asRelativePath(editor.document.uri);
    const sel = editor.selection;
    const ref = sel.isEmpty
      ? `@${relPath}`
      : `@${relPath}#${sel.start.line + 1}-${sel.end.line + 1}`;

    const claudeTerminals = vscode.window.terminals.filter(t => t.name === 'claude');
    if (claudeTerminals.length === 0) {
      vscode.window.showWarningMessage("Terminal 'claude' not found");
      return;
    }
    const active = vscode.window.activeTerminal;
    const terminal = (active?.name === 'claude' ? active : null)
      ?? claudeTerminals[claudeTerminals.length - 1];

    terminal.show();
    terminal.sendText(ref, false);
  });

  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
