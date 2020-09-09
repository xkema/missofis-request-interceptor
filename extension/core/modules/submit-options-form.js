/**
 * @module
 */

import { updateOptions } from './storage.js';
import { parseRedirectionsRaw } from './parse-redirections-raw.js';
import { parseMatchesRaw } from './parse-matches-raw.js';
import { logger } from './logger.js';

/**
 * Collects option data from options form
 * @param {FormData} formData - FormData object created for the options form
 * @returns {object} Unprocessed form input texts
 */
const collectOptionsFormData = (formData) => {
  const rawOptionsFormData = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [name, value] of formData.entries()) {
    rawOptionsFormData[name] = value;
  }
  return rawOptionsFormData;
};

/**
 * Validates options form
 * @param {Object} redirectionLines - Redirection lines collected from form input
 * @param {Object} matchLines - Match lines collected from form input
 * @returns Detailed validation result object
 */
const getValidationResult = (redirectionLines, matchLines) => {
  const malformedRedirectionLines = redirectionLines.filter((redirection) => redirection.type === 'malformed');
  const malformedMatchLines = matchLines.filter((match) => match.type === 'malformed');
  return {
    numMalformedRedirectionLines: malformedRedirectionLines.length,
    numMalformedMatchLines: malformedMatchLines.length,
  };
};

/**
 * Adds/removes validation status classes used for styling
 * @param {object} validationResult - Validation result object
 * @param {*} eventTarget - Options form element
 */
const updateOptionsFormElementValidationStatus = (validationResult, eventTarget) => {
  if (validationResult.numMalformedRedirectionLines > 0) {
    eventTarget.classList.add('has-invalid-redirection-lines');
  } else {
    eventTarget.classList.remove('has-invalid-redirection-lines');
  }
  if (validationResult.numMalformedMatchLines > 0) {
    eventTarget.classList.add('has-invalid-match-lines');
  } else {
    eventTarget.classList.remove('has-invalid-match-lines');
  }
};

/**
 * Parses and filters options form data and updates storage
 * @param {SubmitEvent} event - Native JavaScript "submit" event
 */
const submitOptionsForm = (event) => {
  event.preventDefault();
  const rawOptionsFormData = collectOptionsFormData(new FormData(event.target));
  const redirectionLines = parseRedirectionsRaw(rawOptionsFormData.redirectionsRaw);
  const matchLines = parseMatchesRaw(rawOptionsFormData.matchesRaw);
  // form validation
  const validationResult = getValidationResult(redirectionLines, matchLines);
  updateOptionsFormElementValidationStatus(validationResult, event.target);
  if (validationResult.numMalformedRedirectionLines + validationResult.numMalformedMatchLines > 0) {
    logger(`Can't save options, there are "${validationResult.numMalformedRedirectionLines + validationResult.numMalformedMatchLines}" malformed lines in the options form.`);
  } else {
    updateOptions('sync', {
      redirectionsRaw: rawOptionsFormData.redirectionsRaw,
      matchesRaw: rawOptionsFormData.matchesRaw,
    });
  }
};

export {
  submitOptionsForm,
};
