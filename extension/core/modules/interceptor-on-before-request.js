/**
 * @module
 */

import { escapeRegexPattern } from './escape-regex-pattern.js';
import { logger } from './logger.js';

/**
 * Main interceptor for redirections and matches
 * @param {*} details - Details object from JavaScript APIs
 * @param {*} state - Extension's dynamic state object from background js
 */
const interceptorOnBeforeRequest = (details, state) => {
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
};

export { interceptorOnBeforeRequest };
