/**
 * @module
 */

import { logger } from './logger.js';

/**
 * Fetches extension storage content from both local and sync storage areas
 * - "local" storage content has the popup panel togglers data
 * - "sync" on the other hand holds the original raw textare inputs from options page
 * @returns All "sync" storage content
 */
const getOptions = async () => {
  let options = {};
  try {
    options = { ...await browser.storage.local.get(null), ...await browser.storage.sync.get(null) };
  } catch (error) {
    logger(error);
  }
  return options;
};

/**
 * Updates extension options
 * @param {storage.StorageArea} - Type of storage area to be used, "local" or "sync"
 * @param {object} options - Options to be updated
 */
const updateOptions = async (storageArea, options) => {
  let result = {};
  try {
    result = await browser.storage[storageArea].set(options);
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
