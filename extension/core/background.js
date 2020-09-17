/**
 * @module
 */

import { getOptions } from './modules/storage.js';
import { parseRedirectionsRaw } from './modules/parse-redirections-raw.js';
import { parseMatchesRaw } from './modules/parse-matches-raw.js';
import { getRedirections } from './modules/get-redirections.js';
import { getMatches } from './modules/get-matches.js';
import { logger } from './modules/logger.js';
import { interceptedTypes } from './modules/intercepted-types.js';
import { escapeRegexPattern } from './modules/escape-regex-pattern.js';

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
  logger('state-update // previous state ::', { ...state });
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
  Object.keys(options).forEach((option) => {
    if (option === 'redirectionsRaw') {
      extracts.redirections = getRedirections(parseRedirectionsRaw(options[option]));
    } else if (option === 'matchesRaw') {
      extracts.matches = getMatches(parseMatchesRaw(options.matchesRaw));
    } else if (Object.prototype.hasOwnProperty.call(state, option)) {
      extracts[option] = options[option];
    } else {
      logger(`Unknown or deprecated option key "${option}"!`);
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

// Listen requests to be intercepted
// call after initial state update
browser.webRequest.onBeforeRequest.addListener((details) => {
  let imgURLRedirected = false;
  if (state.redirectionsOn) {
    const capturedRedirections = (
      state.redirections.filter((redirection) => (
        details.url.search(escapeRegexPattern(redirection.from)) !== -1
      ))
    );
    if (capturedRedirections.length > 0) {
      if (capturedRedirections.length > 1) {
        logger(`There are multiple redirections for current URL "${details.url}". First item will be used for redirection!`, 'Here are all the redirections available:', capturedRedirections);
      }
      logger('Redirection Info', `URL: "${details.url}"`, `From: "${capturedRedirections[0].from}"`, `To: ${capturedRedirections[0].to}"`);
      if (details.type === 'image') {
        imgURLRedirected = true;
      }
      return {
        redirectUrl: details.url.replace(capturedRedirections[0].from, capturedRedirections[0].to),
      };
    }
  }
  // "imageset" doesn't work for all browsers, it is an auto added feature to extension packages
  if (state.matchesOn && !imgURLRedirected && (details.type === 'image' || details.type === 'imageset')) {
    const capturedMatches = (
      state.matches.filter((match) => details.url.search(escapeRegexPattern(match.from)) !== -1)
    );
    if (capturedMatches.length > 0) {
      if (capturedMatches.length > 1) {
        logger(`There are multiple matches for current URL "${details.url}". First item will be used for matching!`, 'Here are all the matches available:', capturedMatches);
      }
      logger('Match Info', `URL: "${details.url}"`, `From: "${capturedMatches[0].from}"`);
      return {
        cancel: true,
      };
    }
  }
  return {
    cancel: false,
  };
}, {
  urls: [
    'http://*/*',
    'https://*/*',
  ],
  types: interceptedTypes,
}, ['blocking']);
