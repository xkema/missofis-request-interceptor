const boxen = require('boxen');
const chalk = require('chalk');

const devinfo = `# Before the version update ${chalk.redBright('do not forget')} to:

---

  - Update ${chalk.bold('GHANGELOG.md')}
  - Update user docs ${chalk.bold('docs/user.md')}
  - Update extension ${chalk.bold('Options Page')} textual content (if necessary)
  
If those updates are good to go, run \`npm version patch|minor|major\`.`;

const devoutput = boxen(devinfo, {
  borderStyle: 'double',
  padding: 1,
  dimBorder: true,
  margin: { top: 0, bottom: 1 }
});

console.log(devoutput);