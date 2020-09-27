/**
 * @module
 */

/**
 * Controls extension version update and first install responses
 * @param {Event} event - Native JavaScript "change" event
 */
const installUpdateController = (details) => {
  if (details.reason === 'install') {
    browser.tabs.create({ url: 'https://github.com/xkema/missofis-request-interceptor/blob/master/docs/user.md' });
  } else if (details.reason === 'update') {
    const manifest = browser.runtime.getManifest();
    if (details.previousVersion !== manifest.version) {
      browser.tabs.create({ url: 'https://github.com/xkema/missofis-request-interceptor/blob/master/CHANGELOG.md' });
    }
  }
};

export { installUpdateController };
