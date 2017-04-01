/* eslint-env node */
const path = require('path');
const Funnel = require('broccoli-funnel');
const EngineAddon = require('ember-engines/lib/engine-addon');
const MergeTrees = require('ember-cli/lib/broccoli/merge-trees');

const debug = require('broccoli-stew').debug;

module.exports = EngineAddon.extend({
  name: 'vendor-lazy-engine',
  lazyLoading: true,

  included: function(app) {
    this._super.included(app);

    this.import('vendor/highlight.pack.js', {
      exports: {
        'highlight.js': [
          'default',
          'highlight',
          'highlightAuto',
          'highlightBlock'
        ]
      }
    });

    this.import('vendor/shims/highlightjs.js');
  },

  treeForVendor() {
    var tree = this._super.treeForVendor.apply(this, arguments);

    let highlightTree = new Funnel(path.join(this.project.root, 'node_modules', 'highlightjs'), {
      files: ['highlight.pack.js'],
    });

    let vendorTree = MergeTrees([tree, highlightTree]);
    let debuggedTrees = debug(vendorTree, { name: 'vendorTree' });

    return debuggedTrees
  }
});
