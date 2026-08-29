function wildcardToRegExp(pattern) {
  const source = [...pattern].map((character) => {
    if (character === '*') {
      return '.*';
    }
    if (character === '?') {
      return '.';
    }
    return character.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
  }).join('');

  return new RegExp(`^${source}$`, 'iu');
}

function matchesTerminalName(terminalName, patterns) {
  return patterns.some(pattern => wildcardToRegExp(pattern).test(terminalName));
}

module.exports = { matchesTerminalName, wildcardToRegExp };
