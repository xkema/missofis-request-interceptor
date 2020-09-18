const linterAddons = require('../../bin/includes/linter-addons.js');

describe('linter-addons.test.js', () => {
  test('should pass addons-linter\'s lint tests for each file without any errors', async () => {
    expect(await linterAddons('extension')).toBe(true);
  });
});
