module.exports = [
  {
    name: 'firefox',
    manifest_keys: {
      browser_specific_settings: {
        gecko: {
          id: 'request-interceptor@missofis.com',
        },
      },
      developer: {
        name: 'Kemal Yılmaz',
        url: 'https://xkema.github.io/about'
      }
    },
    intercepted_resource_types: [
      'imageset'
    ]
  },
  {
    name: 'chrome',
    manifest_keys: {
      options_ui: {
        open_in_tab: true
      }
    }
  }
];