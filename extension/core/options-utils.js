/**
 * @module
 */

import {updateOptions} from './storage.js';
import {logger} from './logger.js';

logger('options-utils.js');

/**
 * Extracts every line from a multiline string
 * @param {string} text - Raw text from any input element
 * @returns {array} All non-empty and well-formed lines
 */
const getLines = (text) => {
  return text
    .split(/\r\n|\r|\n/g);
};

/**
 * Categorizes lines from "redirections" input
 * Map checking order might change results!
 * @param {string} redirectionsRaw - Raw input from "redirections" input
 * @returns {array} An array of redirection objects with the form of {from: '', to: ''}
 */
const getCategorizedRedirectionLines = (redirectionsRaw) => {
  return getLines(redirectionsRaw)
    .map(line => {
      const lineTrimmed = line.trim();
      if(/^#/.test(lineTrimmed)) {
        return {
          type: 'comment',
          line: line
        };
      } else if('' === lineTrimmed) {
        return {
          type: 'empty',
          line: line
        };
      } else if(/^\S+(?:\ )+\S+$/.test(lineTrimmed)) {
        const linePartials = lineTrimmed.split(/\ +/);
        return {
          type: 'redirection',
          line: line,
          to: linePartials[0],
          from: linePartials[1]
        };
      } else {
        return {
          type: 'malformed',
          line: line
        };
      }
    });
};

/**
 * Categorizes lines from "matches" input
 * Map checking order might change results!
 * @param {string} matchesRaw - Raw input from "matches" input
 * @returns {array} An array of matches object strings
 */
const getCategorizedMatchLines = (matchesRaw) => {
  return getLines(matchesRaw)
    .map(line => {
      const lineTrimmed = line.trim();
      if(/^#/.test(lineTrimmed)) {
        return {
          type: 'comment',
          line: line
        };
      } else if('' === lineTrimmed) {
        return {
          type: 'empty',
          line: line
        };
      } else if(-1 === lineTrimmed.search(/\ /)) {
        return {
          type: 'match',
          line: line,
          from: lineTrimmed
        };
      } else {
        return {
          type: 'malformed',
          line: line
        };
      }
    });
};

/**
 * Collects option data from options form
 * @param {FormData} formData - FormData object created for the options form
 * @returns {object} Unprocessed form input texts
 */
const collectOptionsFormData = (formData) => {
  let rawOptionsFormData = {};
  for(const [name, value] of formData.entries()) {
    rawOptionsFormData[name] = value;
  }
  return rawOptionsFormData;
};

/**
 * Validates options form
 * @param {Object} optionsFormData - Processed options form data collected from form inputs
 * @returns Detailed validation result object
 */
const getValidationResult = (optionsFormData) => {
  const malformedRedirectionLines = optionsFormData.redirectionLines.filter(redirection => 'malformed' === redirection.type);
  const malformedMatchLines = optionsFormData.matchLines.filter(match => 'malformed' === match.type);
  return {
    numMalformedRedirectionLines: malformedRedirectionLines.length,
    numMalformedMatchLines: malformedMatchLines.length,
  };
}

/**
 * Adds/removes validation status classes used for styling
 * @param {object} validationResult - Validation result object
 * @param {*} eventTarget - Options form element
 */
const updateOptionsFormElementValidationStatus = (validationResult, eventTarget) => {
  if(validationResult.numMalformedRedirectionLines > 0) {
    eventTarget.classList.add('has-invalid-redirection-lines');
  } else {
    eventTarget.classList.remove('has-invalid-redirection-lines');
  }
  if(validationResult.numMalformedMatchLines > 0) {
    eventTarget.classList.add('has-invalid-match-lines');
  } else {
    eventTarget.classList.remove('has-invalid-match-lines');
  }
};

/**
 * Parses and filters options form data and updates storage
 * @param {	SubmitEvent} event - Native JavaScript "submit" event
 */
const submitOptionsForm = (event) => {
  event.preventDefault();
  const rawOptionsFormData = collectOptionsFormData(new FormData(event.target));
  const redirectionLines = getCategorizedRedirectionLines(rawOptionsFormData['redirectionsRaw']);
  const matchLines = getCategorizedMatchLines(rawOptionsFormData['matchesRaw']);
  const optionsFormData = Object.assign({}, rawOptionsFormData, {redirectionLines, matchLines});
  // form validation
  const validationResult = getValidationResult(optionsFormData); 
  updateOptionsFormElementValidationStatus(validationResult, event.target);
  if(validationResult.numMalformedRedirectionLines + validationResult.numMalformedMatchLines > 0) {
    logger(`Can't save options, there are "${validationResult.numMalformedRedirectionLines + validationResult.numMalformedMatchLines}" malformed lines in the options form.`);
  } else {
    updateOptions(optionsFormData);
  }
};

export {
  submitOptionsForm
};