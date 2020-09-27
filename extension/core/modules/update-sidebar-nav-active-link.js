/**
 * @module
 */

/**
 * Updates navigation link active class
 * @param {string} hash - Hash portion from window.Location object
 * @param {NodeList} links - Node list from querySelectorAll method
 */
const updateSidebarNavActiveLink = (hash, links) => {
  const targetSidebarNavbarLink = document.querySelector(`.sidebar nav > a[href=\\${hash}]`);
  if (targetSidebarNavbarLink !== null) {
    links.forEach((link) => link.classList.remove('active'));
    targetSidebarNavbarLink.classList.add('active');
  }
};

export { updateSidebarNavActiveLink };
