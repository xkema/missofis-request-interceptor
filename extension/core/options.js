/**
 * @module
 */

import { submitOptionsForm } from './modules/submit-options-form.js';
import { updateSidebarNavActiveLink } from './modules/update-sidebar-nav-active-link.js';
import { getOptions } from './modules/storage.js';
import { fillAboutPageDetails } from './modules/fill-about-page-details.js';
import { logger } from './modules/logger.js';

// update sidebar active nav item class
window.addEventListener('hashchange', () => {
  updateSidebarNavActiveLink(window.location.hash, document.querySelectorAll('.sidebar nav > a'));
});
updateSidebarNavActiveLink(window.location.hash, document.querySelectorAll('.sidebar nav > a'));

// fill about page details
fillAboutPageDetails(browser.runtime.getManifest());

// capture submit events from options form to update options
(async () => {
  try {
    const formOptions = document.querySelector('.form-options');
    const options = await getOptions();
    formOptions.elements.redirectionsRaw.value = options.redirectionsRaw || '';
    formOptions.elements.matchesRaw.value = options.matchesRaw || '';
    formOptions.addEventListener('submit', submitOptionsForm);
  } catch (error) {
    logger(error);
  }
})();
