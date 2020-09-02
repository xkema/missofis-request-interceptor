/**
 * @module
 * context: "background.html"
 */

import {getNamespace} from './get-namespace.js';
import {logger} from './logger.js';

window.browser = getNamespace();

logger('background.js', window.browser);

// listen network requests
window.browser.webRequest.onBeforeRequest.addListener((details) => {
  logger(details.type, details.url);
  // if(details.type === 'script') {
  //   return {
  //     cancel: true
  //   };
  // }
}, {
  urls: ['<all_urls>']
}, ['blocking']);