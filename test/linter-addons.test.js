import addonsLinter from 'addons-linter';

describe('linter-addons.test.js', () => {
  test('should pass addons-linter\'s lint tests for each file without any errors', async () => {
    const linter = addonsLinter.createInstance({
      config: {
        _: ['extension'],
        logLevel: 'fatal',
        output: 'none',
      },
      runAsBinary: false,
    });
    const results = await linter.run();
    let hasLinterPassed = false;
    if (results.summary.errors === 0) {
      hasLinterPassed = true;
    } else {
      console.log(results);
    }
    expect(hasLinterPassed).toBe(true);
  });
});
