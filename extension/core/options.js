/**
 * @module
 * context: "options.html"
 */

import {saveOptions} from './options-utils.js';
import {logger} from './logger.js';

logger('options.js');

// capture submit events from options form to save options
const formOptions = document.querySelector('.form-options');
formOptions.addEventListener('submit', saveOptions);