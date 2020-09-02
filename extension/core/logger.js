/**
 * @module
 * Exports toggleable logger module
 */

/**
 * Logger for the extension
 * @param {...*} messages Objects to be logged
 */
const logger = (...messages) => {
  console.log(
    `%c extension_debugger `,
    `border-width: 1px; border-style: solid; border-color: inherit;`,
    ...(messages.length === 0 ? ['no-messages-passed-to-the-logger'] : messages)
  );
};


export {logger};