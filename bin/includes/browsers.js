module.exports = [{
  name: 'firefox',
  custom_manifest_keys: {
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
  custom_resource_types: [
    'imageset'
  ]
}, {
  name: 'chrome',
  custom_manifest_keys: {
    options_ui: {
      open_in_tab: true
    }
  }
}];