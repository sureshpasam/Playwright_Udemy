function reverseString(input) {
  if (input == null) return '';
  const s = String(input);
  return s.split('').reverse().join('');
}

// CLI demo: node interview-examples/reverseString.js "hello world"
if (require.main === module) {
  const arg = process.argv.slice(2).join(' ') || 'Playwright';
  console.log(reverseString(arg));
}

module.exports = reverseString;
