const { ESLint } = require("eslint");

describe('linter-eslint.test.js', () => {
  test('should pass linter tests for each file without any errors', async () => {
    const linter = new ESLint();
    const results = await linter.lintFiles('extension/**/*.js');
    let hasLinterPassed = false;
    if (results.filter((result) => result.errorCount > 0).length === 0) {
      hasLinterPassed = true;
    } else {
      const formatter = await linter.loadFormatter('stylish');
      console.log(formatter.format(results));
    }
    expect(hasLinterPassed).toBe(true);
  });
});
