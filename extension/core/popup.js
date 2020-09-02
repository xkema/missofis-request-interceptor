/**
 * @module
 * context: "popup.html"
 */

import {getNamespace} from './get-namespace.js';
import {logger} from './logger.js';

window.browser = getNamespace();

logger('popup.js');

//
document.querySelector('a').addEventListener('click', (event) => {
  event.preventDefault();

  browser.runtime.openOptionsPage();
});