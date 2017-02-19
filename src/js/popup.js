import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  interceptorStatus: false,
  placeholdersStatus: false
};

// update popup view with chrome sync data
document.addEventListener('DOMContentLoaded', function() {
  Utils.readExtensionData(null, function(items) {
    Utils.updateLocalState(items, appState);
    // update togglers
    document.querySelector('#chk-toggle-interceptor').checked = appState.interceptorStatus;      
    document.querySelector('#chk-use-placeholders').checked = appState.placeholdersStatus;
    // show form after popup data ready
    document.querySelector('#ntrcptr-wrapper').style.display = 'block';
  });
});

// bind listener to toggle interceptor button
document.querySelector('#chk-toggle-interceptor').addEventListener('change', function(event) {
  Utils.sendTogglerMessage({interceptorStatus: event.target.checked});
});

// bind listener to toggle placeholders button
document.querySelector('#chk-use-placeholders').addEventListener('change', function(event) {
  Utils.sendTogglerMessage({placeholdersStatus: event.target.checked});
});

// open options page button listener
document.querySelector('#btn-open-options-page').addEventListener('click', function(event) {
  event.preventDefault();
  chrome.runtime.openOptionsPage();
});