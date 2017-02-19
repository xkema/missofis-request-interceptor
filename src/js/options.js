import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  redirects: [],
  redirectsPlain: ''
};

// update popup view with chrome sync data
document.addEventListener('DOMContentLoaded', function() {
  Utils.readExtensionData(null, function(items) {
    Utils.updateLocalState(items, appState);
    // update options form with chrome sync data
    document.querySelector('#txt-intercepted-redirects').value = appState.redirectsPlain;
    // show form after options data ready
    document.querySelector('#ntrcptr-options-form').style.display = 'block';
    // bind submit handlers to options form
    document.querySelector('#ntrcptr-options-form').addEventListener('submit', function(e) {
      e.preventDefault();
      let btnSubmit = document.querySelector('#ntrcptr-options-submit-button');
      let txtRedirects = document.querySelector('#txt-intercepted-redirects');
      btnSubmit.classList.add('loading');
      let parserResponse = Utils.parseRedirectUrls(txtRedirects.value);
      if('boolean' === typeof parserResponse) {
        console.log('PARSER ERROR OCCURED :: SOME DETAILS MAYBE?', parserResponse);
        // chrome sync is really fast, slow down user
        let loaderTimerId = window.setTimeout(function() {
          btnSubmit.classList.remove('loading');
          let messageHolder = document.querySelector('#ntrcptr-options-form-errors');
          messageHolder.insertAdjacentHTML('afterbegin', '<div id="error-save-redirects"><span class="label label-danger">malformed input, can\'t save this :(</span></div>');
          let messageRemoverTimerId = window.setTimeout(function() {
            document.querySelector('#error-save-redirects').remove();
            window.clearTimeout(messageRemoverTimerId);
          }, 3000);
          window.clearTimeout(loaderTimerId);
        }, 500);
      } else if('object' === typeof parserResponse) {
        Utils.updateExtensionOptions({redirects: parserResponse, redirectsPlain: txtRedirects.value}, function(updatedOptions) {
          // chrome sync is really fast, slow down user
          let loaderTimerId = window.setTimeout(function() {
            btnSubmit.classList.remove('loading');
            let messageHolder = document.querySelector('#ntrcptr-options-form-errors');
            messageHolder.insertAdjacentHTML('afterbegin', '<div id="success-save-redirects"><span class="label label-success">options updated :)</span></div>');
            let messageRemoverTimerId = window.setTimeout(function() {
              document.querySelector('#success-save-redirects').remove();
              window.clearTimeout(messageRemoverTimerId);
            }, 3000);
            window.clearTimeout(loaderTimerId);
          }, 500);
        });
      }
    });
  });
});
