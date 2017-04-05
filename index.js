/* eslint-env node */
const path = require('path');
const Funnel = require('broccoli-funnel');
const EngineAddon = require('ember-engines/lib/engine-addon');
const MergeTrees = require('ember-cli/lib/broccoli/merge-trees');

const debug = require('broccoli-stew').debug;
const log = require('broccoli-stew').log;

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

  treeForVendor(tree) {
    let treeForVendorTree = log(tree, { output: 'tree', label: 'treeForVendorTree' });

    let hljsPath = path.parse(require.resolve('highlightjs'));
    
    let highlightTree = new Funnel(hljsPath.dir, {
      files: [hljsPath.base],
    });

    let vendorTree = MergeTrees([treeForVendorTree, highlightTree], {
      overwrite: true
    });

    let vendorTreeLog = log(vendorTree, { output: 'tree', label: 'treeForVendorMergedTree' });

    return vendorTreeLog
  }
});
