/**
 * @module
 */

import {getLines} from './get-lines.js';

/**
 * Categorizes lines from "matches" input
 * Map checking order might change results!
 * @param {string} matchesRaw - Raw input from "matches" input
 * @returns {array} An array of matches object strings
 */
const parseMatchesRaw = (matchesRaw='') => {
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

export {parseMatchesRaw};