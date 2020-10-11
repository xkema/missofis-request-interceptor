/**
 * @module
 * Exports toggleable logger messager module
 */

let debugModeOn = false;

/**
 * Prints log message to the browser developer tools console
 * @param {...*} messages Objects to be logged
 */
const logger = async (...messages) => {
  if (debugModeOn) {
    // eslint-disable-next-line no-console
    console.log(
      '%c extension_debugger ',
      'border-width: 1px; border-style: solid; border-color: inherit;',
      ...(messages.length === 0 ? ['no-messages-passed-to-the-logger'] : messages),
    );
  }
};

// This wrapper is a one time options fetcher for the "debugModeOn" options.
// Calling "storage.getOptions()" method results a cyclic dependency because
// storage module has "logger" calls inside it.
(async () => {
  try {
    // update on initialload
    const items = await browser.storage.local.get('debugModeOn');
    debugModeOn = items.debugModeOn;
    // update on user changes
    browser.runtime.onMessage.addListener((message) => {
      if (message.type === 'options-updated' && message.payload.debugModeOn !== undefined) {
        debugModeOn = message.payload.debugModeOn;
        if (debugModeOn) {
          logger('Debug mode enabled, from now on you will see various log messages on your browser console!');
        }
      }
      return Promise.resolve(`An internal "${message.type}" message handled by the logger script!`);
    });
  } catch (error) {
    logger(error);
  }
})();

export { logger };
