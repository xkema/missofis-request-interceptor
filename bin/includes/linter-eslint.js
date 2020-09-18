const { ESLint } = require('eslint');

/**
 * Lints target directory with "eslint"
 * @param {string|string[]} patterns - Directory or pattern to be linted
 * @returns {boolean} Linter result as passed or not
 */
module.exports = async (patterns) => {
  const linter = new ESLint();
  const results = await linter.lintFiles(patterns);
  let passed = false;
  if (results.filter((result) => result.errorCount > 0).length === 0) {
    passed = true;
  } else {
    const formatter = await linter.loadFormatter('stylish');
    console.log(formatter.format(results));
  }
  return passed;
};