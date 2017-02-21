untitled-chrome-interceptor
====

Chrome extension to intercept chrome network requests.

Development Env.
----

`npm start` or `npm run start` starts development environment with `rm -rf dist/* && webpack --watch --colors --progress` command. See **package.json** and **webpack.config.js**.

Webpack watch mode creates a dist folder for each save.

Add **dist** folder as an unpacked extension to Chrome.

Other
----

Extension uses spectre.css framework for styling.

todo
----

- https://developer.chrome.com/extensions/tut_migration_to_manifest_v2
- http://codepen.io/mallendeo/pen/eLIiG
- http://callmenick.com/post/css-toggle-switch-examples
- adblocker checker
- change <all_urls> permission form onBeforeRequest handler
- add # comment support to redirect inputs form input
- update syntax with: https://en.wikipedia.org/wiki/Hosts_(file)#File_content