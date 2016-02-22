// FIXME: Load plugins here

function defineRequireJSLoader(requirejs) {
  if (requirejs == undefined) requirejs = require;

  requirejs.config({
    baseUrl: module.paths[3]
    packages: Object.keys(plugins.plugin_packages).map(function (name) {
      return {
        name: name,
        location: plugins.plugin_packages[name].realPath
      }
    }),
    nodeRequire: require
  });

  var exports = {};

  exports.loadRequireJSModule = function(hook_name, args, cb) {
    requirejs([args.path], function (mod) {
      cb([mod]);
    }, function (error) {
      args.errors.loadRequireJSModule = error;
      cb([]);
    });
  };

  exports.clientScripts = function(hook_name, args) {
    args.content += '' +
      '<script type="text/javascript" src="/static/plugins/ep_express/static/js/jquery.js"></script>' +
      '<script type="text/javascript" src="/static/plugins/requirejs/static/require.js"></script>' +
      '<script type="text/javascript" src="/static/plugins/ep_requirejs/static/js/main.js"></script>';
  };

  return exports;
};

if (typeof(define) != 'undefined' && define.amd != undefined && typeof(exports) == 'undefined') {
  define([], defineRequireJSLoader);
} else {
  module.exports = defineRequireJSLoader(require('requirejs'));
}
