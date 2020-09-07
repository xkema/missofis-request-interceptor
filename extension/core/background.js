/**
 * @module
 */

import {logger} from './logger.js';

logger('background.js');

/**
 * Application state to keep up with runtime changes to options
 */
const state = {
  redirectionsOn: false,
  matchesOn: false,
  redirections: [],
  matches: []
};

/**
 * Updates internal extension state
 * @param {object} options - Incoming options to be updated
 */
const updateState = (options) => {
  Object.assign(state, options);
};

/**
 * Listens to internal extension messages categorized by "message.type". Message types are; "options-updated" for now.
 * Note: Always return a promise to properly fullfill sender
 * @param {object} message - Message object from "sendMessage" runtime informers
 * @param {string} message - Message object from "sendMessage" runtime informers
 * @param {runtime.MessageSender} sender - Internal runtime.MessageSender object from extensioon APIs @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/MessageSender|runtime.MessageSender}
 * @returns A promise object to fullfill sender properly
 */
const messageListener = (message, sender) => {
  switch (message.type) {
    case 'options-updated':
      updateState(message.payload);
      break;
    default:
      logger('Unknown "message.type", check sender message data!');
  }
  return Promise.resolve(`An internal "${message.type}" message handled by the background script!`);
};

// Listen to runtime messages
browser.runtime.onMessage.addListener(messageListener);

// Listen network requests to be intercepted
browser.webRequest.onBeforeRequest.addListener((details) => {
  logger('webRequest.onBeforeRequest >', details.type, details.url);
  // if(details.type === 'script') {
  //   return {
  //     cancel: true
  //   };
  // }
}, {
  urls: [
    "http://*/*",
    "https://*/*"
  ]
}, ['blocking']);