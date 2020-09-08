/**
 * @module
 */

import {getLines} from './get-lines.js';

/**
 * Categorizes lines from "redirections" input
 * Map checking order might change results!
 * @param {string} redirectionsRaw - Raw input from "redirections" input
 * @returns {array} An array of redirection objects with the form of {from: '', to: ''}
 */
const parseRedirectionsRaw = (redirectionsRaw) => {
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

export {parseRedirectionsRaw};