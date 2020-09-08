/**
 * @module
 */

import { getOptions, updateOptions } from './storage.js';
import { parseRedirectionsRaw } from './modules/parse-redirections-raw.js';
import { parseMatchesRaw } from './modules/parse-matches-raw.js';
import { getRedirections } from './modules/get-redirections.js';
import { getMatches } from './modules/get-matches.js';
import { logger } from './logger.js';

/**
 * Application state to keep up with runtime changes to options
 */
const state = {
  redirectionsOn: false,
  matchesOn: false,
  redirections: [],
  matches: [],
};

/**
 * Updates internal extension state
 * It will update state only if incoming state key exists in initial "state" onject above
 * @param {object} options - Incoming options (partial or full) to be updated
 */
const updateState = (options) => {
  logger('state-update // previous state ::', Object.assign({}, state));
  logger('state-update // changes ::', options);
  Object.assign(state, options);
  logger('state-update // new state ::', state);
};

/**
 * Extracts ready-to-use state data from raw strings if they're defined.
 * Options data for redirections and matches are raw strings.
 * @param {object} options - Options passed from storage updates
 * @returns {object} A ready-to-update state data
 */
const extractStateDataFromOptions = (options) => {
  const extracts = {};
  Object.keys(options).forEach(option => {
    if(option === 'redirectionsRaw') {
      extracts['redirections'] = getRedirections(parseRedirectionsRaw(options[option]));
    } else if(option === 'matchesRaw') {
      extracts['matches'] = getMatches(parseMatchesRaw(options.matchesRaw));
    } else if(state.hasOwnProperty(option)) {
      extracts[option] = options[option];
    } else {
      logger(`Unknown or deprecated option key "${option}"!`);
    }
  });
  return extracts;
};

/**
 * Listens to internal extension messages categorized by "message.type". Message types are; "options-updated" for now.
 * Note: Always return a promise to properly fullfill sender
 * @param {object} message - Message object from "sendMessage" runtime informers
 * @param {string} message - Message object from "sendMessage" runtime informers
 * @returns A promise object to fullfill sender properly
 */
const messageListener = (message) => {
  logger(`incoming-message // ${message.type} ::`, message);
  switch (message.type) {
    case 'options-updated':
      updateState(extractStateDataFromOptions(message.payload));
      break;
    default:
      logger('Unknown "message.type", check sender message data!');
  }
  return Promise.resolve(`An internal "${message.type}" message handled by the background script!`);
};

// Listen to runtime messages
browser.runtime.onMessage.addListener(messageListener);

// set initial state from sync storage on extension load
(async () => {
  try {
    updateState(extractStateDataFromOptions(await getOptions()));
  } catch (error) {
    logger(error);
  }
})();

// Listen network requests to be intercepted
// call after initial state update
browser.webRequest.onBeforeRequest.addListener((details) => {
  logger('webRequest.onBeforeRequest >', details.type, details.url);
  // if(details.type === 'script') {
  //   return {
  //     cancel: true
  //   };
  // }
}, {
  urls: [
    'http://*/*',
    'https://*/*',
  ],
}, ['blocking']);
