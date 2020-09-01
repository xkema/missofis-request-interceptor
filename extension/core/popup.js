// --- context: "popup.html"

console.log(`%cdebug ::`, `color:lime;font-weight:bold;`, 'popup.js');

window.browser = window.msBrowser || window.browser || window.chrome;

document.querySelector('a').addEventListener('click', (event) => {
  event.preventDefault();

  browser.runtime.openOptionsPage();
});