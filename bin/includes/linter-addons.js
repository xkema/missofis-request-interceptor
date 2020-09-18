const addonsLinter = require('addons-linter');

/**
 * Lints target directory with "mozilla/addons-linter"
 * @param {string} extensionDir - Extension root directory
 * @returns {boolean} Linter result as passed or not
 */
module.exports = async (extensionDir) => {
  const linter = addonsLinter.createInstance({
    config: {
      _: [extensionDir],
      logLevel: 'fatal',
      output: 'none',
    },
    runAsBinary: false,
  });
  const results = await linter.run();
  let passed = false;
  if (results.summary.errors === 0) {
    passed = true;
  } else {
    console.log(results);
  }
  return passed;
};
