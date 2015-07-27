(function () {
  requirejs.config({
    baseUrl: "/static/plugins",
    paths: {
      'underscore': "/static/plugins/underscore/static/underscore",
      'async': "/static/plugins/async/static/lib/async",
      'jquery': "/static/plugins/ep_express/static/js/rjquery"
    },
  });

  requirejs(
    [
      'ep_express/static/js/rjquery',
      'ep_carabiner/static/js/client_plugins',
      'ep_carabiner/static/js/hooks',
      'ep_express/static/js/browser',
      'async'
    ], function ($, plugins, hooks, browser, async) {
      window.$ = $; // Expose jQuery #HACK
      window.jQuery = $;

      window.loadRequireJSModule = function(hook_name, args, cb) {
        requirejs([args.path], function (mod) {
          cb([mod]);
        }, function (error) {
          args.errors.loadRequireJSModule = error;
          cb([]);
        });
      }

      if ((!browser.msie) && (!(browser.mozilla && browser.version.indexOf("1.8.") == 0))) {
        document.domain = document.domain; // for comet
      }

      plugins.ensure(function () {
        hooks.plugins = plugins;

        // Call documentReady hook
        $(function() {
          plugins.callPageLoaded();
        });
      });
    }
  );
}());
