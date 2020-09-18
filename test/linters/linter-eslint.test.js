const linterEslint = require('../../bin/includes/linter-eslint.js');

describe('linter-eslint.test.js', () => {
  test('should pass eslint\'s lint tests for each file without any errors', async () => {
    expect(await linterEslint('extension/**/*.js')).toBe(true);
  });
});
