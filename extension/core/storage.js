/**
 * @module
 */

import {logger} from './logger.js';

logger('storage.js');

/**
 * Fetches extension storage content
 * @returns All "sync" storage content
 */
const getOptions = async () => {
  try {
    return await browser.storage.sync.get(null);
  } catch(error) {
    throw error;
  }
}

/**
 * Updates extension options
 * @param {object} options - Options to be updated
 */
const updateOptions = async (options) => {
  try {
    const result = await browser.storage.sync.set(options);
    const quest = await browser.runtime.sendMessage({ type: 'options-updated', payload: options });
    return result;
  } catch(error) {
    throw error;
  }
};

export {
  getOptions,
  updateOptions
};