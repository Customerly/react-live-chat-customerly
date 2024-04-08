//@ts-nocheck
import { MESSENGER_BETA_DOMAIN, MESSENGER_DOMAIN } from "./constants";

const initialize = ({ beta }: { beta?: boolean }) => {
  var w = window,
    d = document,
    name_key = "customerly",
    queue_key = "queue",
    load_key = "load",
    settings_key = "settings",
    c = (w[name_key] = w[name_key] || []);

  if (c.initialized) {
    return void c.throw(
      "[customerly] SDK already initialized. Snippet included twice."
    );
  }

  c.initialized = !0;
  c.loaded = !1;
  c.methods = ["event", "attribute", "update", "show", "hide", "open", "close"];
  c[queue_key] = [];

  c.throw = function(message) {
    w.console && !c.debug && console.error && console.error(message);
  };

  c.factory = function(e) {
    return function() {
      var n = Array.prototype.slice.call(arguments);

      // eslint-disable-next-line no-sequences
      return n.unshift(e), c[queue_key].push(n), c;
    };
  };

  c[load_key] = function(settings) {
    c[settings_key] = settings || {};

    if (c.loaded) {
      return void c.throw(
        "[customerly] SDK already loaded. Use `customerly.update` to change settings."
      );
    }
    c.loaded = !0;
    var s = d.createElement("script");
    s.type = "text/javascript";
    s.async = !0;
    s.src = beta ? MESSENGER_BETA_DOMAIN : MESSENGER_DOMAIN;
    var e = d.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(s, e);
  };

  c.methods.forEach(function(e) {
    c[e] = c.factory(e);
  });
};

export default initialize;
