/**
 * @module
 */

/**
 * Extracts every line from a multiline string
 * @param {string} text - Raw text from any input element
 * @returns {array} An array of lines from input textareas or an empty array if text is not a string
 */
const getLines = (text) => {
  if (typeof text === 'string') {
    return text
      .split(/\r\n|\r|\n/g);
  }
  return [];
};

export { getLines };
