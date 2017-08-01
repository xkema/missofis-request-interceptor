import {Utils} from './utils.js';

// set a local state object for toggler button statuses (local to this file)
let appState = {
  redirectsInterceptor: [],
  redirectsInterceptorPlain: '',
  redirectsImageHinters: [],
  redirectsImageHintersPlain: ''
};

// get page elements, markups
let formElem          = document.getElementById('ntrcptr-options-form'),
    formSubmitElem    = document.getElementById('ntrcptr-options-submit-button'),
    formExportElem    = document.getElementById('ntrcptr-options-export'),
    formImportElem    = document.getElementById('ntrcptr-options-import'),
    formMessagesElem  = document.getElementById('ntrcptr-options-form-errors'),
    txtRedirects      = document.getElementById('txt-intercepted-redirects'),
    txtHinters        = document.getElementById('txt-intercepted-images'),
    txtImportExport   = document.getElementById('txt-import-export'),
    btnTxtSizeToggler = document.getElementById('ntrcptr-options-long-textareas'),
    formErrorElemId   = 'error-save-redirects',
    formSuccessElemId = 'success-save-redirects',
    formErrorMessageMarkup = `
      <div id="${formErrorElemId}" class="form-message">
        <span class="label label-danger">malformed input, can\'t save/import this! <br /><span class="emoji-indicator">😱</span></span>
      </div>
    `,
    formSuccessMessageMarkup = `
      <div id="${formSuccessElemId}" class="form-message">
        <span class="label label-success">options updated! <br /><span class="emoji-indicator">😉</span></span>
      </div>
    `,
    formImportMessageMarkup = `
      <div id="${formSuccessElemId}" class="form-message">
        <span class="label label-success">options imported! <br /><span class="emoji-indicator">😉</span></span>
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
    // console.log('PARSER ERROR OCCURED :: SOME DETAILS MAYBE?', 'redirects:', parserResponseRedirects, 'image hinters:', parserResponseImageHinters);
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
    // bind textarea size toggler listeners
    btnTxtSizeToggler.addEventListener('click', (e) => {
      txtRedirects.classList.toggle('ntrcptr-textarea-wider');
      btnTxtSizeToggler.classList.toggle('status-wide');
      txtHinters.classList.toggle('ntrcptr-textarea-wider');
    });
    // bind export listener
    formExportElem.addEventListener('click', (event) => {
      Utils.readExtensionData(null, (items) => {
        // trim unnecessary data
        let itemsTrimmed = Object.assign({}, items);
        delete itemsTrimmed.interceptorStatus;
        delete itemsTrimmed.placeholdersStatus;
        txtImportExport.value = JSON.stringify(itemsTrimmed);
        txtImportExport.select();
      });
    });
    // bind import listener
    formImportElem.addEventListener('click', (event) => {
      let optionsImported = null;
      try {
        optionsImported = JSON.parse(txtImportExport.value);
        Utils.updateExtensionOptions(optionsImported, (importedOptions) => {
          Utils.doSomeSillyUxStuffAfterFormSubmittingSmiley(formSubmitElem, formMessagesElem, formImportMessageMarkup, formSuccessElemId);
          // update text inputs with updated data (updates only view not a state update)
          txtRedirects.value = importedOptions.redirectsInterceptorPlain;
          txtHinters.value = importedOptions.redirectsImageHintersPlain;
        });
      } catch(error) {
        Utils.doSomeSillyUxStuffAfterFormSubmittingSmiley(formSubmitElem, formMessagesElem, formErrorMessageMarkup, formErrorElemId);
        txtImportExport.select();
      }
    });
  });
};

// update popup view with chrome sync data
document.addEventListener('DOMContentLoaded', initOptionsPage);