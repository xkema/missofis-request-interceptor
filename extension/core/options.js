/**
 * @module
 */

import { submitOptionsForm } from './options-utils.js';
import { getOptions } from './storage.js';
import { logger } from './logger.js';

// capture submit events from options form to update options
(async () => {
  try {
    const formOptions = document.querySelector('.form-options');
    const options = await getOptions();
    formOptions.elements.redirectionsRaw.value = options.redirectionsRaw || '';
    formOptions.elements.matchesRaw.value = options.matchesRaw || '';
    formOptions.addEventListener('submit', submitOptionsForm);
  } catch (error) {
    logger(error);
  }
})();
