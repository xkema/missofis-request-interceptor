/**
 * @module
 */

/**
 * Escapes incoming strings to be a proper input for regexes
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
 * @param {string} patternRaw - Raw text from user inputs; matches or redirections arrays
 * @returns {string} Escaped string ready to be used on regex constructors
 */
const escapeRegexPattern = (patternRaw) => patternRaw.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

export { escapeRegexPattern };
