/**
 * @module
 * context: "module"
 */

console.log(`%cdebug ::`, `color:gold;font-weight:bold;`, 'namespace.js', 'window.msBrowser:', window.msBrowser, 'window.browser:', window.browser, 'window.chrome:', window.chrome);

/**
 * Finds current browser's extension API namespace
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities
 * @returns CUrrent available namespace global
 */
const getNamespace = () => {
  return window.browser || window.chrome;
};

export {getNamespace};