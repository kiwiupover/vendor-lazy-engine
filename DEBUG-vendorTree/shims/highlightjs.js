(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['hljs'] };
  }

  define('highlightjs', [], vendorModule);
})();
