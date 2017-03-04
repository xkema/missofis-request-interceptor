# Missofis Chrome Interceptor

Chrome extension to intercept network requests.

## Development Environment

`npm start` or `npm run start` starts development environment with `rm -rf dist/* && webpack --watch --colors --progress` command. See **package.json** and **webpack.config.js**.

- Run `npm start` command
- Webpack watch mode creates a **dist** folder which holds unpacked extension content on save
- Add **dist** folder as an unpacked extension to Chrome  

## Others

too many redirects?

> avoid generic string matcher strings, ie. use `localhost:3000/path/to/scripts your-cdn.com/path/to/scripts` instead of `localhost:3000 your-cdn.com`  

## Todo

- [x] add long text input button
- [ ] icon attribution http://identicon.org/ Missofis Chrome Interceptor
- [ ] export options feature
- [ ] https://developer.chrome.com/extensions/tut_migration_to_manifest_v2
- [ ] http://codepen.io/mallendeo/pen/eLIiG
- [ ] http://callmenick.com/post/css-toggle-switch-examples
- [ ] adblocker checker
- [ ] change `<all_urls>` permission form onBeforeRequest handler
- [x] add # comment support to redirect inputs form input

## Credits

Extension uses [spectre.css](https://picturepan2.github.io/spectre/) framework for styling.