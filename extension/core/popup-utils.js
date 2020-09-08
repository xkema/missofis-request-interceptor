/**
 * @module
 */

import {updateOptions} from './storage.js';
import {logger} from './logger.js';

/**
 * Updates storage on popup checkbox changes
 * @param {Event} event - Native JavaScript "change" event
 */
const submitChangesOnPopupForm = (event) => {
  updateOptions('local', {
    [event.target.name]: event.target.checked
  });
};

export {submitChangesOnPopupForm};