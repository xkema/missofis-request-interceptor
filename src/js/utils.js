/** Utilities for Interceptor */
class Utils {

  /**
   * Updates extension storage data
   * @param {object} items - Data collection 
   */
  static updateExtensionData(items) {
    self = this;
    chrome.storage.sync.set(items, function() {
      self._updateBadgeStatus(items.interceptorStatus);
    });
  }

  /**
   * Updates extension options
   * @param {object} items - Data collection
   * @param {function} optionsUpdatedCallback - Calback after options update
   */
  static updateExtensionOptions(items, optionsUpdatedCallback) {
    chrome.storage.sync.set(items, function() {
      console.log('OPTIONS UPDATED ::', items);
      if(typeof optionsUpdatedCallback !== 'undefined' && typeof optionsUpdatedCallback === 'function') {
        optionsUpdatedCallback.call(items);
      }
    });
  }

  /**
   * Get extension storage data
   * @param {mixed} keys - Data keys to be fetched (pass null to retrieve all extension data)
   * @param {function} dataReadyCallback - Calback after data retrival. 
   */
  static readExtensionData(keys, dataReadyCallback) {
    self = this;
    chrome.storage.sync.get(keys, function(items) {
      if(typeof dataReadyCallback !== 'undefined' && typeof dataReadyCallback === 'function') {
        dataReadyCallback.call(this, items);
      }
      self._updateBadgeStatus(items.interceptorStatus);
    });
  }

  /**
   * Send single message to extension with toggle button status data
   * @param {object} data - Data Toggle button status data
   */
  static sendTogglerMessage(data) {
    chrome.runtime.sendMessage(data, function(response) {
      // console.log('DATA RESPONSE FROM UTILS.JS ::', response);
    });
  }

  /**
   * Updates background app local state object
   * @param {object} items - Updated items
   * @param {object} currentState - Current state
   */
  static updateLocalState(items, currentState) {
    if('undefined' !== typeof items.interceptorStatus) {
      currentState.interceptorStatus = items.interceptorStatus;
    }
    if('undefined' !== typeof items.placeholdersStatus) {
      currentState.placeholdersStatus = items.placeholdersStatus;
    }
    if('undefined' !== typeof items.redirects) {
      currentState.redirects = items.redirects;
    }
    if('undefined' !== typeof items.redirectsPlain) {
      currentState.redirectsPlain = items.redirectsPlain;
    }
  }

  /**
   * Parses user input for redirection options
   * @param {string} redirects - All data from textarea option
   */
  static parseRedirectUrls(redirects) {
    let hasParserError = false;
    let lines = redirects.split(/\r|\n|\r\n/g);
    lines = lines.filter((redirect) => {
      return '' !== redirect.trim()
    });
    let interceptedUrls = lines.map((redirect) => {
      let redirectPartials = redirect.trim().split(/\s+/g);
      if(2 !== redirectPartials.length) {
        console.log('PARSER ERROR :: MALFORMED REDIRECTION INPUT');
        hasParserError = true;
      }
      return {
        redirectUrl: redirectPartials[0],   // string to be replaced with `requestUrl`
        requestUrl: redirectPartials[1]     // url to be requested
      };
    });
    if(hasParserError) {
      return hasParserError;
    } else {
      return interceptedUrls;
    }
  }

  /**
   * Update browser action bagde status text
   * @param {boolean} isInterceptorEnabled - Interceptor's current status 
   */
  static _updateBadgeStatus(isInterceptorEnabled) {
    let badgeText = isInterceptorEnabled ? 'on' : 'off';
    chrome.browserAction.setBadgeText({text: badgeText});
  }

}

export {Utils}