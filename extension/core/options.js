/**
 * @module
 */

import {submitOptionsForm} from './options-utils.js';
import {getOptions} from './storage.js';
import {logger} from './logger.js';

logger('options.js');

// capture submit events from options form to uopdate options
const formOptions = document.querySelector('.form-options');
formOptions.addEventListener('submit', submitOptionsForm);

// a temporary debugger to debug initial storage status 
(async () => {
  try {
    const optionsSummary = document.querySelector('.options-summary');
    optionsSummary.textContent = JSON.stringify(await getOptions());
  } catch(error) {
    logger(error);
  }
})();