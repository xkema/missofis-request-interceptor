/**
 * @module
 */

import { updateOptions } from './storage.js';

/**
 * Updates storage on options page checkbox changes
 * @param {Event} event - Native JavaScript "change" event
 */
const submitChangesOnOptionsForm = (event) => {
  updateOptions({
    [event.target.name]: event.target.checked,
  });
};

export { submitChangesOnOptionsForm };
