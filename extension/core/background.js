/**
 * @module
 * context: "background.html"
 */

import {logger} from './logger.js';

logger('background.js');

// listen network requests
browser.webRequest.onBeforeRequest.addListener((details) => {
  logger(details.type, details.url);
  // if(details.type === 'script') {
  //   return {
  //     cancel: true
  //   };
  // }
}, {
  urls: ['<all_urls>']
}, ['blocking']);