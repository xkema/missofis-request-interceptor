/**
 * @module
 */

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
const categorizeRedirectionLines = (redirectionsRaw) => {
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
const categorizeMatchLines = (matchesRaw) => {
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
 * @returns {object} Unprocessed form input texts with `*Raw` keys
 */
const collectOptionsFormData = (formData) => {
  let rawOptionsFormData = {};
  for(const [name, value] of formData.entries()) {
    rawOptionsFormData[`${name}Raw`] = value;
  }
  return rawOptionsFormData;
};

/**
 * Parses and saves options form data
 * @param {*} event 
 */
const saveOptions = (event) => {
  event.preventDefault();
  const rawOptionsFormData = collectOptionsFormData(new FormData(event.target));
  const redirectionLines = categorizeRedirectionLines(rawOptionsFormData['redirectionsRaw']);
  const matchLines = categorizeMatchLines(rawOptionsFormData['matchesRaw']);
  const optionsFormData = Object.assign({}, rawOptionsFormData, {redirectionLines, matchLines});
  // const malformedRedirectionLines = optionsFormData.redirectionLines.filter(redirection => 'malformed' === redirection.type);
  // const malformedMatchLines = optionsFormData.matchLines.filter(match => 'malformed' === match.type);
  // if(malformedMatchLines.length > 0 || malformedRedirectionLines.length > 0) {
    // logger(`There are "${malformedRedirectionLines.length + malformedMatchLines.length}" malformed lines in the forms. Would you like me to convert malformed inputs to comments and continue to save options?`);
    // logger('malformedMatchLines', malformedMatchLines);
    // logger('malformedRedirectionLines', malformedRedirectionLines);
    // const c = 
    // redirectionLines.map(redirection => redirection.type === 'malformed' ? `# (auto-corrected-line) ${redirection.line}` : redirection.line).join('\r\n');
    // logger('corrected', c);    
  // } else {
  // }
  logger('optionsFormData', optionsFormData);
};

export {
  saveOptions
};