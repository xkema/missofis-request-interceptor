/**
 * @module
 * context: "options.html"
 */

// {
//   "redirects": [
//     {
//       "from": "some.domain.com/from.js",
//       "to": "localhost:3000/to.js",
//       "enabled": true
//     }
//   ],
//   "matches": [
//     {
//       "search": "some.cdn.com/images",
//       "enabled": true
//     }
//   ]
// }

import {getNamespace} from './get-namespace.js';
import {logger} from './logger.js';

window.browser = getNamespace();

logger('options.js');