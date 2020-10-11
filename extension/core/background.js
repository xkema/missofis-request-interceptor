/**
 * @module
 */

import { getOptions } from './modules/storage.js';
import { parseRedirectionsRaw } from './modules/parse-redirections-raw.js';
import { parseMatchesRaw } from './modules/parse-matches-raw.js';
import { getRedirections } from './modules/get-redirections.js';
import { getMatches } from './modules/get-matches.js';
import { interceptedTypes } from './modules/intercepted-types.js';
import { installUpdateController } from './modules/install-update-controller.js';
import { logger } from './modules/logger.js';
import { interceptorOnBeforeRequest } from './modules/interceptor-on-before-request.js';
import { interceptorHeadersReceived } from './modules/interceptor-on-headers-received.js';

/**
 * Application state to keep up with runtime changes to options
 */
const state = {
  redirectionsOn: false,
  matchesOn: false,
  redirections: [],
  matches: [],
  debugModeOn: false,
  removeCspOn: false,
};

/**
 * Updates internal extension state
 * It will update state only if incoming state key exists in initial "state" onject above
 * @param {object} options - Incoming options (partial or full) to be updated
 */
const updateState = (options) => {
  const previousState = { ...state };
  Object.assign(state, options);
  logger('state-update // previous state ::', previousState);
  logger('state-update // changes ::', options);
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
  Object.keys(options).forEach((option) => {
    if (option === 'redirectionsRaw') {
      extracts.redirections = getRedirections(parseRedirectionsRaw(options[option]));
    } else if (option === 'matchesRaw') {
      extracts.matches = getMatches(parseMatchesRaw(options.matchesRaw));
    } else if (Object.prototype.hasOwnProperty.call(state, option)) {
      extracts[option] = options[option];
    } else {
      logger(`Unknown or deprecated option key "${option}". Extension might need and update or reset!`);
    }
  });
  return extracts;
};

/**
 * Updates popup badge text based on state changes
 * Input parameters are "state" values not incoming state data
 * @param {*} redirectionsOn - Current redirections status
 * @param {*} matchesOn - Current matches status
 */
const updatePopupBadge = (redirectionsOn, matchesOn) => {
  browser.browserAction.setBadgeText({
    text: redirectionsOn === true || matchesOn === true ? 'on' : 'off',
  });
};

/**
 * Listens to internal extension messages categorized by "message.type".
 * Message types are; "options-updated" for now.
 * Note: Always return a promise to properly fullfill sender
 * @param {object} message - Message object from "sendMessage" runtime informers
 * @param {string} message - Message object from "sendMessage" runtime informers
 * @returns A promise object to fullfill sender properly
 */
const messageListener = (message) => {
  logger(`incoming-message // ${message.type} ::`, message);
  switch (message.type) {
    case 'options-updated': {
      const stateData = extractStateDataFromOptions(message.payload);
      updateState(stateData);
      updatePopupBadge(state.redirectionsOn, state.matchesOn);
      break;
    }
    case 'logger':
      logger(...message.payload);
      break;
    default:
      logger('Unknown "message.type", check sender message data!');
  }
  return Promise.resolve(`An internal "${message.type}" message handled by the background script!`);
};

// listen to runtime messages
browser.runtime.onMessage.addListener(messageListener);

// set initial state from storage on extension load
(async () => {
  try {
    const stateData = extractStateDataFromOptions(await getOptions());
    updateState(stateData);
    updatePopupBadge(state.redirectionsOn, state.matchesOn);
  } catch (error) {
    logger(error);
  }
})();

// main interceptor
browser.webRequest.onBeforeRequest.addListener((details) => (
  interceptorOnBeforeRequest(details, state)
), {
  urls: [
    'http://*/*',
    'https://*/*',
  ],
  types: interceptedTypes,
}, ['blocking']);

// csp headers removal interceptor
browser.webRequest.onHeadersReceived.addListener((details) => (
  interceptorHeadersReceived(details, state)
), {
  urls: [
    'http://*/*',
    'https://*/*',
  ],
  types: ['main_frame'],
}, [
  'blocking',
  'responseHeaders',
]);

// handle first install, update and uninstall events
browser.runtime.onInstalled.addListener(installUpdateController);
browser.runtime.setUninstallURL('https://github.com/xkema/missofis-request-interceptor/issues');
