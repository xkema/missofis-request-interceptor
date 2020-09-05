/**
 * @module
 * context: "popup.html"
 */

import {logger} from './logger.js';

logger('popup.js');

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