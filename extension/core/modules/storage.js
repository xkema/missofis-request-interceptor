/**
 * @module
 */

import { logger } from './logger.js';

/**
 * Fetches extension storage content from local storage area
 * @returns All storage content
 */
const getOptions = async () => {
  let options = {};
  try {
    options = await browser.storage.local.get(null);
  } catch (error) {
    logger(error);
  }
  return options;
};

/**
 * Updates extension options
 * @param {object} options - Options to be updated
 */
const updateOptions = async (options) => {
  let result = {};
  try {
    result = await browser.storage.local.set(options);
    await browser.runtime.sendMessage({ type: 'options-updated', payload: options });
  } catch (error) {
    logger(error);
  }
  return result;
};

export {
  getOptions,
  updateOptions,
};
