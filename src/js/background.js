import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  interceptorStatus: false,
  placeholdersStatus: false
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
  // console.log('CHROME REQUEST DETAILS :: ', details);
  console.log('IN REQUEST :: ', appState);  
}, {
  urls: ['<all_urls>']
}, ['blocking']);

/*
if(utils.interceptorState.interceptorEnabled) {
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
