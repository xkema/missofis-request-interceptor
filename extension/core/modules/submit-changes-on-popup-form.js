/**
 * @module
 */

import { updateOptions } from './storage.js';

/**
 * Updates storage on popup checkbox changes
 * @param {Event} event - Native JavaScript "change" event
 */
const submitChangesOnPopupForm = (event) => {
  updateOptions({
    [event.target.name]: event.target.checked,
  });
};

export { submitChangesOnPopupForm };
