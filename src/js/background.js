import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  interceptorStatus: false,
  placeholdersStatus: false,
  redirects: []
};

// read data at extension startup
Utils.readExtensionData(null, function(items) {
  Utils.updateLocalState(items, appState);
});

// listen to toggler button changes
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  sendResponse({message: 'Interceptor status updated!', data: message});
  Utils.updateLocalState(message, appState);
  Utils.updateExtensionData(message);
});

// listen network requests
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  if(appState.interceptorStatus) {
    // console.log('__INTERCEPTOR_ON__', details.url.substr(0, 40)+'..', appState.redirects);
    let capturedInterception = appState.redirects.filter((redirect) => {
      return -1 !== details.url.search(redirect.redirectUrl)
    });
    if(0 !== capturedInterception.length) {
      let blockingResponse = {
        redirectUrl: details.url.replace(capturedInterception[0].redirectUrl, capturedInterception[0].requestUrl)
      };
      console.log('INTERCEPTED REQUEST ::', details.url + ' ==> ', blockingResponse.redirectUrl);
      return blockingResponse;
    }
  } else {
    // console.log('__INTERCEPTOR_OFF__', details.url.substr(0, 40)+'..');
  }
}, {
  urls: ['<all_urls>']
}, ['blocking']);

/*
// old static implementation
if(utils.interceptorStatus.interceptorEnabled) {
  let blockingResponse = {};
  if (-1 !== details.url.search(/dygassets\.dygdigital\.com|img-dygassets\.mncdn\.com|dygassets\.akamaized\.net/g)) {
    blockingResponse.redirectUrl = details.url.replace(/dygassets\.dygdigital\.com|img-dygassets\.mncdn\.com|dygassets\.akamaized\.net/g, 'localhost:3000');
    return blockingResponse;
  } else if (-1 !== details.url.search(/http:\/\/cdn1\.ntv\.com\.tr\/gorsel\/.+\&width=(\d+)\&height=(\d+).+|http:\/\/cdn\.ntvspor\.net\/.+\&w=(\d+)\&h=(\d+).+/g) && utils.interceptorState.placeholdersEnabled) {
    details.url.replace(/http:\/\/cdn1\.ntv\.com\.tr\/gorsel\/.+\&width=(\d+)\&height=(\d+).+|http:\/\/cdn\.ntvspor\.net\/.+\&w=(\d+)\&h=(\d+).+/g, function(match, p1, p2, p3, p4) {
      if(p1&&p2) {
        blockingResponse.redirectUrl = 'http://placehold.it/' + p1 + 'x' + p2;
      } else if(p3&&p4) {
        blockingResponse.redirectUrl = 'http://placehold.it/' + p3 + 'x' + p4;
      }
    });
    return blockingResponse;
  }
}
*/

