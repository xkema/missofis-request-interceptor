/**
 * @module
 */

/**
 * Extracts every line from a multiline string
 * @param {string} text - Raw text from any input element
 * @returns {array} An array of lines read from input text or and empty array if incoming text is not a string
 */
const getLines = (text) => {
  if(typeof text === 'string') {
    return text
      .split(/\r\n|\r|\n/g);
  }
  return [];
};

export {getLines};