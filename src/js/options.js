import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  redirectsInterceptor: [],
  redirectsInterceptorPlain: '',
  redirectsImageHinters: [],
  redirectsImageHintersPlain: ''
};

// get page elements, markups
let formElem = document.getElementById('ntrcptr-options-form'),
    formSubmitElem = document.getElementById('ntrcptr-options-submit-button'),
    formMessagesElem = document.getElementById('ntrcptr-options-form-errors'),
    txtRedirects = document.getElementById('txt-intercepted-redirects'),
    txtHinters = document.getElementById('txt-intercepted-images'),
    btnTxtSizeToggler = document.getElementById('ntrcptr-options-long-textareas'),
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

// form submit handler
const optionsFormSubmitHandler = (e) => {
  e.preventDefault();
  formSubmitElem.classList.add('loading');
  // get parser responses
  let parserResponseRedirects = Utils.parseRedirectUrls(txtRedirects.value),
      parserResponseImageHinters = Utils.parseImageHinters(txtHinters.value);
  // say something i'm giving up on you
  if(true === parserResponseRedirects || true === parserResponseImageHinters) {
    console.log('PARSER ERROR OCCURED :: SOME DETAILS MAYBE?', 'redirects:', parserResponseRedirects, 'image hinters:', parserResponseImageHinters);
    Utils.doSomeSillyUxStuffAfterFormSubmittingSmiley(formSubmitElem, formMessagesElem, formErrorMessageMarkup, formErrorElemId);
  } else if('object' === typeof parserResponseRedirects || 'object' === typeof parserResponseImageHinters) {
    let optionsUpdated = {
      redirectsInterceptor: parserResponseRedirects,
      redirectsInterceptorPlain: txtRedirects.value,
      redirectsImageHinters: parserResponseImageHinters,
      redirectsImageHintersPlain: txtHinters.value
    };
    Utils.updateExtensionOptions(optionsUpdated, (updatedOptions) => {
      Utils.sendOptionsMessage(optionsUpdated);
      Utils.doSomeSillyUxStuffAfterFormSubmittingSmiley(formSubmitElem, formMessagesElem, formSuccessMessageMarkup, formSuccessElemId);
    });
  }
};

// options page initializer
const initOptionsPage = () => {
  // boomie!
  Utils.readExtensionData(null, (items) => {
    Utils.updateLocalState(items, appState);
    // update options form with chrome sync data
    txtRedirects.value = appState.redirectsInterceptorPlain;
    txtHinters.value = appState.redirectsImageHintersPlain
    // show form after options is available
    formElem.style.display = 'block';
    // bind submit handlers to options form
    formElem.addEventListener('submit', optionsFormSubmitHandler);
    // bind textarea sice toggler listeners
    btnTxtSizeToggler.addEventListener('click', (e) => {
      txtRedirects.classList.toggle('ntrcptr-textarea-wider');
      txtHinters.classList.toggle('ntrcptr-textarea-wider');
    });
  });
};

// update popup view with chrome sync data
document.addEventListener('DOMContentLoaded', initOptionsPage);