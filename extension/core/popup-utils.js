/**
 * @module
 */

import {getOptions} from './storage.js';
import {updateOptions} from './storage.js';
import {logger} from './logger.js';

logger('popup-utils.js');

/**
 * Updates storage on popup checkbox changes
 * @param {Event} event - Native JavaScript "change" event
 */
const submitChangesOnPopupForm = (event) => {
  updateOptions({
    [event.target.name]: event.target.checked
  });
};

export {submitChangesOnPopupForm};