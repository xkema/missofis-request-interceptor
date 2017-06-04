import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  interceptorStatus: false,
  placeholdersStatus: false
};

// get page elements
let chkToggleInt = document.getElementById('chk-toggle-interceptor'),
    chkUsePlh    = document.getElementById('chk-use-placeholders'),
    btnOpenOpt   = document.getElementById('btn-open-options-page'),
    frmInt       = document.getElementById('ntrcptr-form');

// options page initializer
const initPopupPage = () => {
  Utils.readExtensionData(null, (items) => {
    Utils.updateLocalState(items, appState);
    // update togglers
    chkToggleInt.checked = appState.interceptorStatus;      
    chkUsePlh.checked = appState.placeholdersStatus;
    // show form after popup data ready
    frmInt.style.display = 'block';
  });
};

// bind listener to toggle interceptor button
chkToggleInt.addEventListener('change', (event) => {
  Utils.sendTogglerMessage({interceptorStatus: event.target.checked});
});

// bind listener to toggle placeholders button
chkUsePlh.addEventListener('change', (event) => {
  Utils.sendTogglerMessage({placeholdersStatus: event.target.checked});
});

// open options page button listener
btnOpenOpt.addEventListener('click', (event) => {
  event.preventDefault();
  chrome.runtime.openOptionsPage();
});

// update popup view with chrome sync data
document.addEventListener('DOMContentLoaded', initPopupPage);