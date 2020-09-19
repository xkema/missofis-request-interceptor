const boxen = require('boxen');
const browsers = require('./browsers.js');

const name = process.argv.slice(2)[0].split('=')[1];
const version = process.argv.slice(2)[1].split('=')[1];

const bundleList = browsers.map(browser => `   - dist/${name}-${browser.name}-${version}.zip`).join('\n');

const info = `# You need to take some extra actions manually to finish version update:

- - -

1. Run \`git push && git push --tags\` to push recent changes to the repository
2. Upload created zip bundles to the GitHub release as binaries

${bundleList}

3. Continue to do whatever you were doing before deployment :)`;

const output = boxen(info, {
  padding: 1,
  dimBorder: true,
  margin: { bottom: 1 }
});

console.log(output);