/**
 * @module
 */

import {submitOptionsForm} from './options-utils.js';
import {getOptions} from './storage.js';
import {logger} from './logger.js';

logger('options.js');

// capture submit events from options form to update options
(async () => {
  try {
    const formTextareas = document.querySelectorAll('.form-options textarea');
    const options = await getOptions();
    formTextareas.forEach(formTextarea => {
      formTextarea.value = options[formTextarea.name];
    });
    document.querySelector('.form-options').addEventListener('submit', submitOptionsForm);
  } catch(error) {
    logger(error);
  }
})();

// a temporary debugger to debug initial storage status 
(async () => {
  try {
    logger('initial values:', await getOptions());
  } catch(error) {
    logger(error);
  }
})();