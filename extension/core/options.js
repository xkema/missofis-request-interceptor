/**
 * @module
 */

import { submitOptionsForm } from './modules/submit-options-form.js';
import { getOptions } from './modules/storage.js';
import { logger } from './modules/logger.js';

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
