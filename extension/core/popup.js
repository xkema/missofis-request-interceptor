/**
 * @module
 */

import { submitChangesOnPopupForm } from './modules/submit-changes-on-popup-form.js';
import { getOptions } from './modules/storage.js';
import { logger } from './modules/logger.js';

/**
 * Opens extension options panel
 * @param {Event} event Native click event
 */
const openOptions = (event) => {
  event.preventDefault();
  browser.runtime.openOptionsPage();
};

// listen open potions button
document.querySelector('#btn-open-options').addEventListener('click', openOptions);

// set initial view status of the plugin and bind event listeners after initial settings
// note: a toggler's name attribute and corresponding option names are shared
(async () => {
  try {
    const formStatusTogglers = document.querySelectorAll('[name="redirectionsOn"], [name="matchesOn"]');
    const options = await getOptions();
    formStatusTogglers.forEach((toggler) => {
      if (options[toggler.name] === true) {
        toggler.setAttribute('checked', '');
      } else {
        toggler.removeAttribute('checked');
      }
      toggler.addEventListener('change', submitChangesOnPopupForm);
    });
  } catch (error) {
    logger(error);
  }
})();
