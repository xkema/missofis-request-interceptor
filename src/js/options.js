import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  redirectsInterceptor: [],
  redirectsInterceptorPlain: '',
  redirectsImageHinters: [],
  redirectsImageHintersPlain: ''
};

// update popup view with chrome sync data
document.addEventListener('DOMContentLoaded', function() {
  // get page elements
  let formElem = document.getElementById('ntrcptr-options-form'),
      formSubmitElem = document.getElementById('ntrcptr-options-submit-button'),
      formMessagesElem = document.getElementById('ntrcptr-options-form-errors'),
      redirectsTxtElem = document.getElementById('txt-intercepted-redirects'),
      hintersTxtElem = document.getElementById('txt-intercepted-images'),
      formErrorElemId = 'error-save-redirects',
      formSuccessElemId = 'success-save-redirects',
      formErrorMessageMarkup = `
        <div id="${formErrorElemId}">
          <span class="label label-danger">malformed input, can\'t save this :(</span>
        </div>
      `,
      formSuccessMessageMarkup = `
        <div id="${formSuccessElemId}">
          <span class="label label-success">options updated :)</span>
        </div>
      `;

  // boomie!
  Utils.readExtensionData(null, function(items) {
    Utils.updateLocalState(items, appState);
    // update options form with chrome sync data
    redirectsTxtElem.value = appState.redirectsInterceptorPlain;
    hintersTxtElem.value = appState.redirectsImageHintersPlain
    // show form after options is available
    formElem.style.display = 'block';
    // bind submit handlers to options form
    formElem.addEventListener('submit', function(e) {
      e.preventDefault();
      formSubmitElem.classList.add('loading');
      // get parser responses
      let parserResponseRedirects = Utils.parseRedirectUrls(redirectsTxtElem.value),
          parserResponseImageHinters = Utils.parseImageHinters(hintersTxtElem.value);
      // say something i'm giving up on you
      if(true === parserResponseRedirects || true === parserResponseImageHinters) {
        console.log('PARSER ERROR OCCURED :: SOME DETAILS MAYBE?', 'redirects:', parserResponseRedirects, 'image hinters:', parserResponseImageHinters);
        Utils.doSomeSillyUxStuffAfterFormSubmittingSmiley(formSubmitElem, formMessagesElem, formErrorMessageMarkup, formErrorElemId);
      } else if('object' === typeof parserResponseRedirects || 'object' === typeof parserResponseImageHinters) {
        let optionsUpdated = {
          redirectsInterceptor: parserResponseRedirects,
          redirectsInterceptorPlain: redirectsTxtElem.value,
          redirectsImageHinters: parserResponseImageHinters,
          redirectsImageHintersPlain: hintersTxtElem.value
        };
        Utils.updateExtensionOptions(optionsUpdated, function(updatedOptions) {
          Utils.sendOptionsMessage(optionsUpdated);
          Utils.doSomeSillyUxStuffAfterFormSubmittingSmiley(formSubmitElem, formMessagesElem, formSuccessMessageMarkup, formSuccessElemId);
        });
      }
    });
  });
});
