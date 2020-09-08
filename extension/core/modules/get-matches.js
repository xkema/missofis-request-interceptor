/**
 * @module
 */

/**
 * Filters and maps well-formed redirections and matches into a simpler array format
 * @param {object} matchLines - Parsed lines from options form textareas
 * @returns {array}
 */
const getMatches = (matchLines) => matchLines
  .filter((match) => match.type === 'match')
  .map((match) => ({ from: match.from }));

export { getMatches };
