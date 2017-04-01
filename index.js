/* eslint-env node */
const EngineAddon = require('ember-engines/lib/engine-addon');

module.exports = EngineAddon.extend({
  name: 'vendor-lazy-engine',
  lazyLoading: true
});
