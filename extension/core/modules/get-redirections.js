/**
 * @module
 */

/**
 * Filters and maps well-formed redirections and matches into a simpler array format
 * @param {object} redirectonLines - Parsed lines from options form textareas
 * @returns {array}
 */
const getRedirections = (redirectonLines) => {
  return redirectonLines
    .filter(redirection => redirection.type === 'redirection')
    .map(redirection => ({ from: redirection.from, to: redirection.to }))
};

export {getRedirections};