/** Utilities for Interceptor */
class Utils {

  /**
   * Updates extension storage data
   * @param {object} items - Data collection 
   */
  static updateExtensionData(items) {
    self = this;
    chrome.storage.sync.set(items, function() {
      if('undefined' !== typeof items.interceptorStatus) {
        self._updateBadgeStatus(items.interceptorStatus);        
      }
    });
  }

  /**
   * Updates extension options
   * @param {object} items - Data collection
   * @param {function} optionsUpdatedCallback - Calback after options update
   */
  static updateExtensionOptions(items, optionsUpdatedCallback) {
    chrome.storage.sync.set(items, function() {
      // console.log('OPTIONS UPDATED ::', 'items', optionsUpdatedCallback);
      if(typeof optionsUpdatedCallback !== 'undefined' && typeof optionsUpdatedCallback === 'function') {
        optionsUpdatedCallback.call(this, items);
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
   * @param {object} data - Toggle button status data
   */
  static sendTogglerMessage(data) {
    chrome.runtime.sendMessage(data, function(response) {
      // console.log('DATA RESPONSE FROM UTILS.JS ::', response);
    });
  }

  /**
   * Send single message to extension with options data
   * @param {object} data - Options data
   */
  static sendOptionsMessage(data) {
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
    if('undefined' !== typeof items.redirectsInterceptor) {
      currentState.redirectsInterceptor = items.redirectsInterceptor;
    }
    if('undefined' !== typeof items.redirectsInterceptorPlain) {
      currentState.redirectsInterceptorPlain = items.redirectsInterceptorPlain;
    }
    if('undefined' !== typeof items.redirectsImageHinters) {
      currentState.redirectsImageHinters = items.redirectsImageHinters;
    }
    if('undefined' !== typeof items.redirectsImageHintersPlain) {
      currentState.redirectsImageHintersPlain = items.redirectsImageHintersPlain;
    }
  }

  /**
   * Parses user input for redirection options
   * @param {string} redirects - All data from textarea option
   * @return 
   */
  static parseRedirectUrls(redirects) {
    let hasParserError = false,
        lines = this._findLineBreaks(redirects);
    // return request/redirect pairs for url intercepting
    let interceptedUrls = lines.map((redirect) => {
      let redirectPartials = redirect.split(/\s+/g);
      if(2 !== redirectPartials.length) {
        // console.log('PARSER ERROR :: MALFORMED REDIRECTION INPUT');
        hasParserError = true;
      }
      return {
        redirectUrl: redirectPartials[0],   // string to be replaced with `requestUrl`
        requestUrl: redirectPartials[1]     // url to be requested
      };
    });
    if(hasParserError) {
      return hasParserError; // return error object instead
    } else {
      return interceptedUrls;
    }
  }

  /**
   * Parses user input for redirection options
   * @param {string} hinters - All data from textarea option for image hinters
   * @return 
   */
  static parseImageHinters(hinters) {
    let hasParserError = false,
        lines = this._findLineBreaks(hinters);
    lines.forEach(function(line) {
      if(-1 !== line.indexOf(' ')) {
        // console.log('PARSER ERROR :: MALFORMED IMAGE HINTERS INPUT');
        hasParserError = true;
      }
    });
    if(hasParserError) {
      return hasParserError; // return error object instead
    } else {
      return lines;
    }
  }

  /**
   * Chrome sync is really fast, slow down the user
   * @param {Element} formElem - All data from textarea option for image hinters
   * @param {Element} messagesElem - 
   * @param {String} messageMarkup - 
   * @param {String} messageElemId - 
   */
  static doSomeSillyUxStuffAfterFormSubmittingSmiley(formElem, messagesElem, messageMarkup, messageElemId) {
    let loaderTimerId = window.setTimeout(function() {
      formElem.classList.remove('loading');
      messagesElem.insertAdjacentHTML('afterbegin', messageMarkup);
      let messageRemoverTimerId = window.setTimeout(function() {
        document.getElementById(`${messageElemId}`).remove();
        window.clearTimeout(messageRemoverTimerId);
      }, 3000);
      window.clearTimeout(loaderTimerId);
    }, 500);
  }

  /**
   * Update browser action bagde status text
   * @param {boolean} isInterceptorEnabled - Interceptor's current status 
   */
  static _updateBadgeStatus(isInterceptorEnabled) {
    let badgeText = isInterceptorEnabled ? 'on' : 'off';
    chrome.browserAction.setBadgeText({text: badgeText});
  }

  /**
   * Finds line breaks and return splitted array from textarea input string
   * @param {string} text - Text to be parsed
   * @return {array} Splitted and trimmed lines array
   */
  static _findLineBreaks(text) {
    let lines = text.split(/\r|\n|\r\n/g);
    lines = lines.filter((line) => {
      return '' !== line.trim() && !/^(?:\s+)?#/g.test(line)
    }).map((line) => line.trim());
    return lines;
  }

}

export {Utils}