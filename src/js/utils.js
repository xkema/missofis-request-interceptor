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
      console.log('DATA RESPONSE FROM UTILS.JS ::', response);
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