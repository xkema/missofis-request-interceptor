/**
 * @module
 */

import { logger } from './logger.js';

/**
 * Main interceptor for redirections and matches
 * @param {*} details - Details object from JavaScript APIs
 * @param {*} state - Extension's dynamic state object from background js
 */
const interceptorHeadersReceived = (details, state) => {
  if (state.removeCspOn) {
    const responseHeadersWithoutCsp = details.responseHeaders.filter((header) => header.name !== 'content-security-policy');
    if (responseHeadersWithoutCsp.length !== details.responseHeaders.length) {
      logger('Removed CSP Headers', details.responseHeaders.filter((header) => header.name === 'content-security-policy'));
    }
    return {
      responseHeaders: responseHeadersWithoutCsp,
    };
  }
  return {
    cancel: false,
  };
};

export { interceptorHeadersReceived };
