import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  interceptorStatus: false,
  placeholdersStatus: false,
  redirectsInterceptor: [],
  redirectsImageHinters: []
};

// read data at extension startup
Utils.readExtensionData(null, (items) => {
  Utils.updateLocalState(items, appState);
  // console.log('APP STATE ::', appState);
});

// listen to toggler button changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log('MESSAGE RECEIVED BY BACKGROUND :: ', message);
  sendResponse({message: 'Interceptor status updated!', data: message});
  Utils.updateLocalState(message, appState);
  Utils.updateExtensionData(message);
});

// interceptor dirty work
const interceptNetworkRequestHandler = (details) => {
  if(appState.interceptorStatus) {
    // console.log('__INTERCEPTOR_ON__', details.url.substr(0, 40)+'..', appState.redirectsInterceptor, appState.redirectsImageHinters);
    // get captured interceptable urls
    let capturedInterception = appState.redirectsInterceptor.filter((redirect) => {
      return -1 !== details.url.search(redirect.requestUrl)
    });
    if(0 !== capturedInterception.length) {
      let blockingResponse = {
        redirectUrl: details.url.replace(capturedInterception[0].requestUrl, capturedInterception[0].redirectUrl)
      };
      // console.log('__INTERCEPTED_REQUEST__', details.url + ' ==> ', blockingResponse.redirectUrl);
      return blockingResponse;
    } else if(appState.placeholdersStatus) {
      // get captured image hinter urls if requested type is image
      if('image' === details.type) {
        let capturedHinter = appState.redirectsImageHinters.filter((hinter) => {
          return -1 !== details.url.search(hinter)
        });
        if(0 !== capturedHinter.length) {
          let blockingResponse = {
            redirectUrl: 'https://placeholdit.imgix.net/~text?txtsize=5&txt=+&w=16&h=9&txttrack=0&txtpad=1'
          };
          // console.log('__INTERCEPTED_IMAGE_REQUEST__', details.url + ' ==> ', capturedHinter);
          return blockingResponse;
        }
      }
    }
  }
  // console.log('__INTERCEPTOR_OFF__', details.url.substr(0, 40)+'..');
};

// listen network requests
chrome.webRequest.onBeforeRequest.addListener(interceptNetworkRequestHandler, {
  urls: ['<all_urls>']
}, ['blocking']);
