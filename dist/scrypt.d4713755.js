// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../usr/lib/node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"assets/scrypt/index.js":[function(require,module,exports) {
//inputData()
var fs = require('fs');

function inputData() {
  var cards = [{
    value: document.forms["form"].elements["card-1"].value,
    in: document.forms["form"].elements["type-1"].value
  }, {
    value: document.forms["form"].elements["card-2"].value,
    in: document.forms["form"].elements["type-2"].value
  }, {
    value: document.forms["form"].elements["card-3"].value,
    in: document.forms["form"].elements["type-3"].value
  }, {
    value: document.forms["form"].elements["card-4"].value,
    in: document.forms["form"].elements["type-4"].value
  }, {
    value: document.forms["form"].elements["card-5"].value,
    in: document.forms["form"].elements["type-5"].value
  }];
  var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  cards.sort(function (a, b) {
    if (values.indexOf(a.value) < values.indexOf(b.value)) {
      return -1;
    }

    if (values.indexOf(a.value) > values.indexOf(b.value)) {
      return 1;
    }

    if (values.indexOf(a.value) == values.indexOf(b.value)) {
      return 0;
    }
  });

  if (cards[0].value == "" || cards[1].value == "" || cards[2].value == "" || cards[3].value == "" || cards[4].value == "") {
    console.log("empty");
    console.log(cards);
    document.querySelector("p.status").innerHTML = "";
    document.querySelector("p.status").innerHTML = "Введите комбинацию полностью";
  } else {
    for (j = 0; j != cards.length; j++) {
      for (i = 0; i != values.length; i++) {
        if (cards[j].value == values[i]) {
          cards[j].legit = 1;
          break;
        }
      }
    }
  }

  console.log(cards, values);

  if (cards[0].legit == 1 && cards[1].legit == 1 && cards[2].legit == 1 && cards[3].legit == 1 && cards[4].legit == 1) {
    check(cards);
  } else {
    document.querySelector("p.status").innerHTML = "В комбинации допущены ошибки";
  }
}

function check(cards, values) {
  var combo = [{
    pair: 0,
    dpair: 0,
    set: 0,
    street: 0,
    flash: 0,
    fullHouse: 0,
    kare: 0,
    streetFlash: 0,
    flashRoyal: 0
  }];
  values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  console.log("check"); //Pair

  for (i = 0; i < cards.length; i++) {
    for (v = i + 1; v < cards.length; v++) {
      if (cards[i].value == cards[v].value) {
        combo[0].pair = 1;
      }
    }
  } //Double-pair


  if (cards[0].value == cards[1].value && cards[2].value == cards[3].value || cards[1].value == cards[2].value && cards[3].value == cards[4].value || cards[0].value == cards[1].value && cards[3].value == cards[4].value) {
    combo[0].dpair = 1;
  } //Set


  if (cards[0].value == cards[1].value && cards[1].value == cards[2].value || cards[1].value == cards[2].value && cards[2].value == cards[3].value || cards[2].value == cards[3].value && cards[3].value == cards[4].value) {
    combo[0].set = 1;
  } //Street


  if (values.indexOf(cards[0].value) + 1 == values.indexOf(cards[1].value) && values.indexOf(cards[1].value) + 1 == values.indexOf(cards[2].value) && values.indexOf(cards[2].value) + 1 == values.indexOf(cards[3].value) && values.indexOf(cards[3].value) + 1 == values.indexOf(cards[4].value)) {
    combo[0].street = 1;
  } //Flash


  j = 1;

  for (i = 0; i < cards.length; i++) {
    if (i + 1 < cards.length) {
      if (cards[i].in == cards[i + 1].in) {
        j++;

        if (j == 5) {
          combo[0].flash = 1;
        }
      }
    }
  } //FullHouse


  if (combo[0].pair == 1 && combo[0].set == 1) {
    combo[0].fullHouse = 1;
  } //Kare


  if (cards[0].value == cards[1].value && cards[1].value == cards[2].value && cards[2].value == cards[3].value || cards[1].value == cards[2].value && cards[2].value == cards[3].value && cards[3].value == cards[4].value) {
    combo[0].kare = 1;
  } //StreetFlash


  if (combo[0].street == 1 && combo[0].flash == 1) {
    combo[0].streetFlash = 1;
  } //FlashRoyal


  if (combo[0].flash == 1 && cards[0].value == "10" && cards[1].value == "J" && cards[2].value == "Q" && cards[3].value == "K" && cards[4].value == "A") {
    combo[0].flashRoyal = 1;
  }

  var currentDate = new Date();

  if (combo[0].flashRoyal == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Флеш Рояль";
    fs.appendFile("./log/log-file.txt", "\n" + currentDate + " Флеш Рояль");
  } else if (combo[0].streetFlash == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Стрит Флеш";
  } else if (combo[0].kare == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Каре";
  } else if (combo[0].fullHouse == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Фулл Хаус";
  } else if (combo[0].flash == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Флеш";
  } else if (combo[0].street == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Стрит";
  } else if (combo[0].set == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Сет";
  } else if (combo[0].dpair == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Две пары";
  } else if (combo[0].pair == 1) {
    document.querySelector("p.status").innerHTML = "Старшая комбинация: Пара";
  } else {
    document.querySelector("p.status").innerHTML = "Комбинаций нет";
  }
}

window.inputData = inputData;
console.log("Вимкнено");
},{"fs":"../../../../usr/lib/node_modules/parcel-bundler/src/builtins/_empty.js"}],"../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39305" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/scrypt/index.js"], null)
//# sourceMappingURL=/scrypt.d4713755.js.map