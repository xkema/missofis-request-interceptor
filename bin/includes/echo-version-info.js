const boxen = require('boxen');
const chalk = require('chalk');
const browsers = require('./browsers.js');

const name = process.argv.slice(2)[0].split('=')[1];
const version = process.argv.slice(2)[1].split('=')[1];

const bundleList = browsers.map(browser => `   - dist/${name}-${browser.name}-${version}.zip`).join('\n');

const info = `# You need to take some extra actions manually to finish version update

---

You've just run ${chalk.green('npm version patch|minor|major')} on development branch, this did:

  - Update ${chalk.bold('package.json')} and ${chalk.bold('package-lock.json')} versions
  - Update ${chalk.bold('manifest.json')} version
  - Run unit tests for ${chalk.bold('extension')} directory
  - Create bundle zip files and run bundle linters for ${chalk.bold('dist')} directory
  - Commit ${chalk.bold('package.json')} and ${chalk.bold('package-lock.json')} changes

... and you should:

1. Switch to the ${chalk.bold('master')} branch, merge these version changes onto it
2. Tag ${chalk.bold('master')} branch manually with ${chalk.green('git tag -a v' + version + ' -m "Version update"')}

   - ${chalk.bold('npm')}'s auto tagging feature is disabled by ${chalk.dim('git-tag-version = false')} config in ${chalk.bold('.npmrc')}

3. Run ${chalk.green('git push && git push --tags')} to push version changes to the origin
4. Upload created zip bundles created under ${chalk.bold('dist/*')} directory to the ${chalk.bold('GitHub')} as release binaries

${bundleList}

5. Update all extension store items with new bundles
6. Continue to do whatever you were doing before deployment :)`;

const output = boxen(info, {
  padding: 1,
  dimBorder: true,
  margin: { top: 0, bottom: 1 }
});

console.log(output);