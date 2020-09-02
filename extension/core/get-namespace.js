/**
 * @module
 * context: "module"
 */

/**
 * Finds current browser's extension API namespace
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities
 * @returns CUrrent available namespace global
 */
const getNamespace = () => {
  return window.browser || window.chrome;
};

export {getNamespace};