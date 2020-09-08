/**
 * @module
 */

import { getLines } from './get-lines.js';

/**
 * Categorizes lines from "matches" input
 * Map checking order might change results!
 * @param {string} matchesRaw - Raw input from "matches" input
 * @returns {array} An array of matches object strings
 */
const parseMatchesRaw = (matchesRaw = '') => getLines(matchesRaw)
  .map((line) => {
    const lineTrimmed = line.trim();
    if (/^#/.test(lineTrimmed)) {
      return {
        type: 'comment',
        line,
      };
    } if (lineTrimmed === '') {
      return {
        type: 'empty',
        line,
      };
    } if (lineTrimmed.search(/ /) === -1) {
      return {
        type: 'match',
        line,
        from: lineTrimmed,
      };
    }
    return {
      type: 'malformed',
      line,
    };
  });

export { parseMatchesRaw };
