/**
 * @module
 */

/**
 * Fills about page content with details
 * @param {object} manifest - Manifest file from `browser.runtime.getManifest()` method
 */
const fillAboutPageDetails = (manifest) => {
  const aboutDetails = document.querySelector('.about-details');
  aboutDetails.insertAdjacentHTML('afterBegin', `
    <dt>Name</dt>
    <dd>${manifest.name}</dd>
    <dt>Description</dt>
    <dd>${manifest.description}</dd>
    <dt>Version</dt>
    <dd><span class="pill">${manifest.version}</span></dd>
    <dt>Author</dt>
    <dd>${manifest.author}</dd>
    <dt>Permissions</dt>
    <dd>${manifest.permissions.map((permission) => `<span class="pill">${permission}</span>`).join(' ')}</dd>
    <dt>Optional Permissions</dt>
    <dd>${manifest.optional_permissions.map((permission) => `<span class="pill">${permission}</span>`).join(' ')}</dd>
  `);
};

export { fillAboutPageDetails };
