/**
 * @module
 * context: "background.html"
 */

import {getNamespace} from './get-namespace.js';

window.browser = getNamespace();

console.log(`%cdebug ::`, `color:green;font-weight:bold;`, 'background.js', window.browser);

// listen network requests
window.browser.webRequest.onBeforeRequest.addListener((details) => {
  console.log(`%cdebug ::`, `color:deeppink;font-weight:bold;`, details.type, details.url);
  // if(details.type === 'script') {
  //   return {
  //     cancel: true
  //   };
  // }
}, {
  urls: ['<all_urls>']
}, ['blocking']);