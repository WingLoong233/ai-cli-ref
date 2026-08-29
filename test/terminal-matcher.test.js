const test = require('node:test');
const assert = require('node:assert/strict');
const { matchesTerminalName, wildcardToRegExp } = require('../terminal-matcher');

test('matches the Claude Code terminal with the default wildcard', () => {
  assert.equal(matchesTerminalName('✳ Claude Code', ['claude', '✳ *', 'qodercli']), true);
});

test('keeps exact terminal names working', () => {
  assert.equal(matchesTerminalName('claude', ['claude']), true);
  assert.equal(matchesTerminalName('qodercli', ['qodercli']), true);
});

test('matches names case-insensitively', () => {
  assert.equal(matchesTerminalName('Claude', ['claude']), true);
});

test('supports question marks as a single-character wildcard', () => {
  assert.equal(matchesTerminalName('tool-1', ['tool-?']), true);
  assert.equal(matchesTerminalName('tool-12', ['tool-?']), false);
});

test('treats regular-expression characters as literals', () => {
  const pattern = wildcardToRegExp('cli (dev).*');
  assert.equal(pattern.test('cli (dev).server'), true);
  assert.equal(pattern.test('cli dev.server'), false);
});
