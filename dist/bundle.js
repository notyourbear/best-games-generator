(function () {
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var parseUrl = function parseUrl() {
  if (window.location.search === '') return [];

  var loc = window.location.search.split('/').slice(1);
  var showResults = validateInputs(loc);
  return showResults ? loc : [];
};

var setUrl = function setUrl(title, amount) {
  return window.location.assign('?/' + title + '/' + amount);
};

function validateInputs(inputs) {
  var initCheck = inputs.length === 2;
  if (initCheck === false) return false;

  var _inputs = _slicedToArray(inputs, 2),
      title = _inputs[0],
      num = _inputs[1];

  if (title.length === 0) return false;

  return parseInt(num, 10) > 0;
}

var urlFns = { parseUrl: parseUrl, setUrl: setUrl, validateInputs: validateInputs };

var homePageTemplate = function homePageTemplate() {
  return " <div class='form-container'>\n      <div class=\"background-logo\"></div>\n      <form class='form create-best-games'>\n        <input id='title-input' type='text' name='title' value='Not Polygon' autofocus>\n        <div>\n          <span> The </span>\n          <input id='amount-input' type='number' name='amount' value='50'>\n          <span> best games of all time</span>\n        </div>\n        <span> After weeks of voting and arguments, we\u2019re ready to present our choices </span>\n        <input id='submit-input' type='submit' name='submit' value='View Now'>\n     </form>\n     </div>";
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var paintHomePage = function paintHomePage(container) {
  container.innerHTML = '';
  container.innerHTML = homePageTemplate();

  var form = container.querySelector('.create-best-games');
  console.log({ form: form });
  form.addEventListener('submit', function (e) {
    console.log({ e: e, form: form });
    e.preventDefault();
    var inputs = ['title', 'amount'];
    var data = inputs.map(function (id, i) {
      var input = document.querySelector('#' + id + '-input');
      return i === 0 ? input.value : parseInt(input.value, 10);
    });

    if (urlFns.validateInputs(data)) {
      urlFns.setUrl.apply(urlFns, _toConsumableArray(data));
    }
  });
};

var itemTemplate = function itemTemplate(_ref) {
  var item = _ref.item;
  return "<li>\n    <h2>" + item.number + ". " + item.title + "</h2>\n    <p>(" + item.releaseDate + ", " + item.releases + ")</p>\n    <p>these are words. they are a lot of words. then there are more words. how amazing.</p>\n  </li>";
};

var listTemplate = function listTemplate(_ref) {
  var list = _ref.list;

  var ul = '<ul>';
  list.forEach(function (item) {
    return ul += itemTemplate({ item: item });
  });
  return ul += '</ul>';
};

var paintListPage = function paintListPage(container, list) {
  container.innerHTML = '';
  container.innerHTML = listTemplate({ list: list });
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var alea = createCommonjsModule(function (module) {
// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; };
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.alea = impl;
}

})(
  commonjsGlobal,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var xor128 = createCommonjsModule(function (module) {
// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor128 = impl;
}

})(
  commonjsGlobal,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var xorwow = createCommonjsModule(function (module) {
// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorwow = impl;
}

})(
  commonjsGlobal,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var xorshift7 = createCommonjsModule(function (module) {
// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xorshift7 = impl;
}

})(
  commonjsGlobal,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var xor4096 = createCommonjsModule(function (module) {
// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.xor4096 = impl;
}

})(
  commonjsGlobal,                                     // window object or global
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var tychei = createCommonjsModule(function (module) {
// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); };
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
} else {
  this.tychei = impl;
}

})(
  commonjsGlobal,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var empty = {};


var empty$1 = Object.freeze({
	default: empty
});

var require$$0 = ( empty$1 && empty ) || empty$1;

var seedrandom = createCommonjsModule(function (module) {
/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; };
  prng.quick = function() { return arc4.g(4) / 0x100000000; };
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); };
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if (('object') == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require$$0;
  } catch (ex) {}
} else if ((typeof undefined) == 'function' && undefined.amd) {
  undefined(function() { return seedrandom; });
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);
});

seedrandom.alea = alea;
seedrandom.xor128 = xor128;
seedrandom.xorwow = xorwow;
seedrandom.xorshift7 = xorshift7;
seedrandom.xor4096 = xor4096;
seedrandom.tychei = tychei;

var seedrandom$2 = seedrandom;

var sample = function sample(_ref) {
  var array = _ref.array,
      seed = _ref.seed;

  var rng = seed ? seedrandom$2(seed) : seedrandom$2();
  var index = Math.floor(rng() * array.length);
  return array[index];
};

var arrayMaker = function arrayMaker(_ref2) {
  var input = _ref2.input;
  return input.split(' ');
};

var addToState = function addToState(_ref3) {
  var array = _ref3.array,
      _ref3$state = _ref3.state,
      state = _ref3$state === undefined ? { entry: [], exit: [], node: {} } : _ref3$state;

  array.forEach(function (value, i) {
    var nexti = i + 1;
    var previ = i - 1;

    var node = {
      value: value,
      entry: false,
      exit: false
    };

    if (previ < 0) {
      node.entry = true;
      state.entry.push(value);
    }

    if (nexti >= array.length) {
      node.exit = true;
      state.exit.push(value);
    }

    if (state.node[value] === undefined) state.node[value] = [];
    state.node[value].push(node);
  });

  return state;
};

var getItem = function getItem(_ref4) {
  var state = _ref4.state,
      seed = _ref4.seed;

  var array = Array.isArray(state) ? sample({ array: state, seed: seed }) : sample({ array: Object.values(state), seed: seed });

  return sample({ array: array, seed: seed });
};

var switcher = function switcher(direction) {
  return direction === 'prev' ? 'next' : 'prev';
};

var createChain = function createChain(_ref5) {
  var state = _ref5.state,
      amount = _ref5.amount,
      seed = _ref5.seed;

  var haveStart = false;
  var haveEnd = false;
  var direction = 'prev';
  var i = 0;
  var item = getItem({ seed: seed, state: state.node });

  while (item.next === true && item.prev === true) {
    item = getItem({ seed: seed, state: state.node });
    haveStart = item.entry === true;
    haveEnd = item.exit === true;
  }

  var parts = [];

  while (i < amount) {
    direction = switcher(direction);
    if (haveStart === true && haveEnd === true) break;
    if (haveStart && direction === 'prev') continue;
    if (haveEnd && direction === 'next') continue;

    item = getItem({ seed: seed + i, state: state.node });
    if (parts.includes(item.value)) continue;

    if (direction === 'prev') parts.push(item.value);
    if (direction === 'next') parts.unshift(item.value);
    haveStart = item.entry === true;
    haveEnd = item.exit === true;

    i++;
  }

  if (haveStart === false) {
    var v = getPart({ array: parts, state: state.entry, seed: seed });
    parts.unshift(v);
  }

  if (haveEnd === false) {
    var _v = getPart({ array: parts, state: state.exit, seed: seed });
    parts.push(_v);
  }

  if (i < amount) {
    var _v2 = getPart({ array: parts, state: state.exit, seed: seed });
    parts.push(_v2);
  }

  return parts.join(' ');
};

var getPart = function getPart(_ref6) {
  var array = _ref6.array,
      state = _ref6.state,
      seed = _ref6.seed;

  var value = sample({ array: state, seed: seed });
  var i = 0;

  while (array.includes(value)) {
    value = sample({ array: state, seed: seed + i });
    i++;
  }

  return value;
};

var titleFns = {
  sample: sample,
  getPart: getPart,
  addToState: addToState,
  arrayMaker: arrayMaker,
  createChain: createChain,
  getItem: getItem,
  switcher: switcher
};

var titles = ["Sea of Thieves", "R.B.I Baseball 18", "Attack on Titan 2", "Assault Gunners HD Edition", "Assassin's Creed Rogue: Remastered", "Kirby Star Allies", "Burnout Paradise Remastered", "Surviving Mars", "Gal Gunvolt Burst", "Q.U.B.E. 2", "Devil May Cry HD Collection", "Flinthook", "Warhammer: Vermintide 2", "Chuchel", "Damascus Gear: Operation Osaka", "Scribblenauts Showdown", "Frantics", "Final Fantasy XV", "Fear Effect Sedna", "DJMax Respect", "Bravo Team", "Pit People", "H1Z1", "Darkest Dungeon", "Payday 2", "Moss", "Heroine Anthem Zero", "Gravel", "Girls and Panzer: Dream Tank Match", "De Blob 2 Remastered", "Part Time UFO", "Yume Nikki: Dream Diary", "Sword Art Online: Fatal Bullet", "Past Cure", "Pac-Man Championship Edition 2 Plus", "Metal Gear Survive", "Armored Warfare", "Age of Empires: Definitive Edition", "Fe", "Bayonetta", "Bayonetta 2", "Secret of Mana", "A Certain Magical Virtual-On", "The Legend of Heroes: Trails of Cold Steel II", "The Legend of Heroes: Trails of Cold Steel", "The Longest 5 Minutes", "Radiant Historia: Perfect Chronology", "Owlboy", "Monster Energy Supercross: The Official", "Kingdom Come: Deliverance", "Dynasty Warriors 9", "Under Night In-Birth Exe: Late[st]", "The Seven Deadly Sins: Knights of Britannia", "Dragon Quest Builders", "Rust", "Octogeddon", "Civilization VI: Rise and Fall", "Shadow of the Colossus", "Marooners", "We Were Here Too", "Gundemoniums", "EA Sports UFC 3", "SteamWorld Dig", "Sky Force Reloaded", "Night in the Woods", "Dissidia Final Fantasy NT", "Monster Hunter: World", "Dragon Ball FighterZ", "Celeste", "The Inpatient", "Subnautica", "Lost Sphear", "Iconoclasts", "Kirby Battle Royale", "World to the West", "Gintama Rumble", "Darkest Dungeon", "Street Fighter V Arcade Edition", "Kerbal Space Program: Enhanced Edition", "InnerSpace", "The Escapists 2", "The Escapists", "Valkyria Chronicles 4", "A Way Out", "Detective Pikachu", "Atelier Lydie & Suelle: The Alchemists and the Mysterious Paintings", "Far Cry 5", "Far Cry 4", "Far Cry 3", "MLB The Show 18", "Long Gone Days", "Shining Resonance Refrain", "Shining Force", "Shining in the Dark", "Super Robot Wars X", "Dark Rose Valkyrie", "Extinction", "God of War", "Nintendo Labo Variety Kit", "Nintendo Labo Robot Kit", "Adventure Time: Pirates of the Enchiridion", "Frostpunk", "South Park: The Fractured but Whole", "BattleTech", "Donkey Kong Country: Tropical Freeze", "Pillars of Eternity II: Deadfire", "Conan Exiles", "Hyrule Warriors: Definitive Edition", "State of Decay 2", "Dark Souls Remastered", "Detroit: Become Human", "Vampyr", "Street Fighter 30th Anniversary Collection", "Full Metal Panic! Fight: Who Dares Wins", "Sushi Striker: The Way of Sushido", "Jurassic World Evolution", "Mario Tennis Aces", "The Crew 2", "Captain Toad: Treasure Tracker", "Octopath Traveler", "WarioWare Gold", "Shadow of the Tomb Raider", "Call of Duty: Black Ops 4", "Red Dead Redemption 2", "Red Dead Redemption", "Anno 1800", "Call of Cthulhu", "Catherine: Full Body", "Concrete Genie", "Pony Island", "Amplitude", "Hardware: Rivals", "Volume", "Punch Club", "Lovely Planet", "Assassin's Creed Chronicles: India", "Gemini: Heroes Reborn", "Gone Home: Console Edition", "The Banner Saga", "That Dragon, Cancer", "Dragon's Dogma: Dark Arisen", "A Boy and His Blob", "Darkest Dungeon", "Oddworld: New 'n' Tasty!", "Resident Evil Zero HD Remaster", "The Deadly Tower of Monsters", "World of Tanks", "Homeworld: Deserts of Kharak", "Minecraft: Story Mode: Episode 1 — The Order of the Stone", "The Westport Independent", "Mario & Luigi: Paper Jam", "Lego Marvel's Avengers", "The Witness", "Rise of the Tomb Raider", "Bombshell", "This War of Mine: The Little Ones", "American Truck Simulator", "Digimon Story: Cyber Sleuth", "Megadimension Neptunia VII", "Tales of Symphonia HD", "Agatha Christie: The ABC Murders", "Assassin's Creed Chronicles: Russia", "XCOM 2", "Final Fantasy IX", "Lovers in a Dangerous Spacetime", "Naruto Shippuden: Ultimate Ninja Storm 4", "Grand Theft Auto: Liberty City Stories Mobile", "Pillars of Eternity: The White March Part 2", "Project X Zone 2", "The Escapists: The Walking Dead", "Rocket League", "Danganronpa: Trigger Happy Havoc", "Far Cry Primal", "Plants vs. Zombies: Garden Warfare 2", "The Flame in the Flood", "Gears of War: Ultimate Edition", "The Witch and the Hundred Knight: Revival Edition", "Heavy Rain", "BlazBlue: Chrono Phantasma Extend", "Black Desert Online", "The Legend of Zelda: Twilight Princess HD", "Tom Clancy's The Division", "Shadow Complex Remastered", "XCOM: Enemy Unknown", "Adventure Time: Magic Man's Head Games", "Keep Talking and Nobody Explodes", "Minecraft: Story Mode Episode 5 — Order Up!", "Ashes of the Singularity", "Sleeping Dogs: Definitive Edition", "1979 Revolution: Black Friday", "Sorcery! Part 3: The Seven Serpents", "Skullgirls 2nd Encore", "Everybody's Gone to the Rapture", "Dark Souls III", "Loud on Planet X", "The Banner Saga 2", "The Banner Saga", "Hyperdevotion Noire: Goddess Black Heart", "Stranger of Sword City", "Offworld Trading Company", "Uncharted 4: A Thief's End", "Shadow of the Beast", "Total War: Warhammer", "Dead Island: Definitive Edition", "Hearts of Iron IV", "Guilty Gear Xrd -Revelator-", "Sherlock Holmes: The Devil's Daughter", "Deadlight: Director’s Cut", "Mario & Sonic at the Rio 2016 Olympic Games", "Lost Sea", "Crypt of the Necrodancer Pocket Edition", "Crypt of the Necrodancer", "Romance of the Three Kingdoms XIII", "Assault Suit Leynos", "Mobile Suit Gundam: Extreme VS Force", "Kerbal Space Program", "Batman: Arkham Underworld", "Earth Defense Force 4.1: The Shadow of New Despair", "Kentucky Route Zero Act 4", "Fairy Fencer F: Advent Dark Force", "Stardew Valley", "Xblaze: Lost Memories", "The Girl and the Robot", "Master of Orion: Conquer the Stars", "Star Trek Online", "Pro Evolution Soccer 2017", "The Witness", "NBA 2K17", "NBA 2K14", "NBA 2K12", "NBA 2K9", "NBA 2K10", "FIFA 17", "FIFA 2007", "FIFA 08", "FIFA 15", "FIFA 12", "FIFA 98", "NFL Blitz", "Call of Cthulhu: The Wasted Land", "Double Fine Happy Action Theater", "Kingdoms of Amalur: Reckoning", "Shank 2", "Shank", "Jagged Alliance: Back in Action", "Tales of the Abyss", "Grand Slam Tennis 2", "Crusader Kings II", "Dear Esther", "Little Deviants", "Metal Gear Solid: Snake Eater 3D", "Dynasty Warriors Next", "Hot Shots Golf: World International", "Lumines: Electronic Symphony", "Wipeout 2048", "Shin Megami Tensei: Devil Survivor 2", "Vessel", "MLB 12: The Show", "Street Fighter X Tekken", "Mario Party 9", "Dungeon Defenders", "Total War: Shogun 2 – Fall of the Samurai", "Rayman Origins", "BioShock 2", "BioShock", "BioShock Infinite", "The House of the Dead 4", "Insanely Twisted Shadow Planet", "The Witcher 2: Assassins of Kings Enhanced Edition", "Port Royale 3: Pirates & Merchants", "Diablo III", "Diablo 2", "Diablo", "Mario Tennis Open", "Resident Evil: Operation Raccoon City", "Metal Gear Solid HD Collection", "Pokémon Conquest", "Civilization V: Gods & Kings", "Tom Clancy's Ghost Recon: Future Soldier", "Final Fantasy III", "The Amazing Spider-Man", "Tony Hawk's Pro Skater HD", "Growlanser Wayfarer of Time", "Persona 4 Arena", "Persona 4", "The Last Story", "Madden NFL 13", "Rock Band Blitz", "Anomaly: Warzone Earth", "Tekken Tag Tournament 2", "Torchlight II", "Torchlight", "Tokyo Jungle", "Marvel vs. Capcom Origins", "Dishonored", "RollerCoaster Tycoon 3D", "Carmageddon", "The Witcher 2: Assassins of Kings", "Medal of Honor: Warfighter", "Assassin's Creed III", "Ragnarok Tactics", "Paper Mario: Sticker Star", "Thomas Was Alone", "Epic Mickey: Power of Illusion", "Virtua Fighter 2", "Legacy of Kain: Soul Reaver", "Grand Theft Auto: San Andreas", "Final Fantasy IV", "Oddworld: Munch's Oddysee", "Divinity II: Ego Draconis", "Bayonetta", "Vandal Hearts: Flames of Judgment", "Mass Effect 2", "No More Heroes 2: Desperate Struggle", "S.T.A.L.K.E.R.: Call of Pripyat", "Deadly Premonition", "Risen", "Napoleon: Total War", "MLB 2K10", "Final Fantasy XIII", "God of War III", "Dead or Alive Paradise", "Mega Man 10", "Flotilla", "Monster Hunter Tri", "Alan Wake", "UFC 2010", "River City Soccer Hooligans", "Prince of Persia: The Forgotten Sands", "Ninety-Nine Nights II", "Singularity", "StarCraft II: Wings of Liberty", "Madden NFL 11", "Victoria 2", "Victoria", "Mafia II", "Mafia 3", "Phantasy Star II", "Phantasy Star IV", "Spider-Man: Shattered Dimensions", "Lost Horizon", "Front Mission Evolved", "Final Fantasy XIV", "Quantum Theory", "Castlevania: Lords of Shadow", "NBA Jam", "Lost Planet 2", "Sonic the Hedgehog 4: Episode 1", "Naruto Shippuden: Ultimate Ninja Storm 2", "Fallout: New Vegas", "Vanquish", "Fable III", "FIFA Manager 11", "God of War: Ghost of Sparta", "The Penguins of Madagascar", "Football Manager 2011", "Assassin's Creed: Brotherhood", "Pac-Man Party", "Tom Clancy's Ghost Recon", "Need for Speed: Hot Pursuit", "Gran Turismo 5", "Golden Sun: Dark Dawn", "Super Meat Boy", "World of Warcraft: Cataclysm", "Secret of Mana", "Saints Row 2", "Street Fighter IV", "Star Ocean: The Last Hope", "Warhammer 40,000: Dawn of War II", "Empire: Total War", "The Maw", "Resident Evil 5", "Valkyrie Profile: Covenant of the Plume", "Suikoden Tierkreis", "The Last Remnant", "Ninja Blade", "Dynasty Warriors: Gundam 2", "inFamous", "Gunstar Heroes", "Anno 1404", "Overlord: Dark Legend", "Overlord II", "Call of Juarez: Bound in Blood", "BlazBlue: Calamity Trigger", "Tales of Monkey Island", "Resident Evil 4", "Rez", "Mobile Suit Gundam: Zeonic Front", "Medal of Honor: Allied Assault", "MotoGP 2", "PaRappa the Rapper 2", "Grandia II", "Sonic Advance", "Super Mario Advance 2: Super Mario World", "Star Wars: Racer Revenge", "Zone of the Enders: The Fist of Mars", "Tony Hawk's Pro Skater 3", "Dungeon Siege", "The Elder Scrolls III: Morrowind", "Tactics Ogre: The Knight of Lodis", "Dragon Ball Z: The Legacy of Goku", "Looney Tunes: Space Race", "The House of the Dead III", "Digimon World 3", "Neverwinter Nights", "Shantae", "Warcraft III: Reign of Chaos", "Duke Nukem Advance", "Medieval: Total War", "Armored Core 3", "Armored Core", "Battlefield 1942", "Mega Man Zero", "Kingdom Hearts", "Dynasty Tactics", "Divine Divinity", "Super Mario Advance 3: Yoshi's Island", "Spyro 2: Season of Flame", "Hitman 2: Silent Assassin", "Virtua Tennis", "Mario Party 4", "Suikoden III", "NHL 2K3", "MechAssault", "Tom Clancy's Splinter Cell", "Ninja Assault", "Star Wars Jedi Knight II: Jedi Outcast", "Steel Battalion", "Gauntlet: Dark Legacy", "Final Fantasy Tactics", "Xenogears", "Yoshi's Story", "SaGa Frontier", "Panzer Dragoon Saga", "Star Ocean: The Second Story", "Commandos: Behind Enemy Lines", "Heart of Darkness", "Parasite Eve", "Caesar III", "Pokémon Blue", "Pokémon Red", "Pokémon Yellow", "Half-Life", "The Legend of Zelda: Ocarina of Time", "Star Wars: Rogue Squadron", "Baldur's Gate", "Falcon 4.0", "Civilization II", "Super Mario 64", "Star Ocean", "Tekken 2", "Madden NFL 97", "Master of Orion II", "Command & Conquer: Red Alert", "Dead or Alive", "Dragon Force", "Bust-a-Move", "Battle Arena Toshinden", "Chrono Trigger", "Super Bomberman 3", "Bomberman", "Twisted Metal", "Warcraft II: Tides of Darkness", "Tales of Phantasia", "World of Warcraft: The Burning Crusade", "Europa Universalis III", "Sonic the Hedgehog", "Jade Empire", "Theme Park", "S.T.A.L.K.E.R.: Shadow of Chernobyl", "Medal of Honor: Vanguard", "Command & Conquer 3: Tiberium Wars", "Guitar Hero II", "Guitar Hero", "Pokémon Pearl", "Pokémon Diamond", "Odin Sphere", "Mario Party 8", "Overlord", "Pokémon Battle Revolution", "Super Stardust HD", "Dynasty Warriors DS: Fighter's Battle", "Shin Megami Tensei: Persona 3", "The Settlers II", "Medieval II: Total War: Kingdoms", "Warhawk", "Medal of Honor: Airborne", "Skate", "Neverwinter Nights 2: Mask of the Betrayer", "Project Gotham Racing 4", "The Legend of Spyro: The Eternal Night", "Syphon Filter: Logan's Shadow", "Final Fantasy Tactics: The War of the Lions", "FIFA Soccer 08", "Half-Life 2", "Team Fortress 2", "Team Fortress", "Age of Empires III: The Asian Dynasties", "The Eye of Judgment", "Hellgate: London", "The Witcher", "Viva Piñata: Party Animals", "Fire Emblem: Radiant Dawn", "Call of Duty 4: Modern Warfare", "Silent Hill: Origins", "Super Mario Galaxy", "Enchanted", "Medal of Honor: Heroes 2", "WWE SmackDown vs. Raw 2008", "Kane & Lynch: Dead Men", "Orcs & Elves", "SimCity Societies", "Assassin's Creed", "Unreal Tournament 3", "Mass Effect", "Psychonauts", "Nights: Journey of Dreams", "SimCity 4", "Devil May Cry 2", "Dead or Alive Xtreme Beach Volleyball", "Capcom vs. SNK EO", "Tom Clancy's Splinter Cell", "Dark Cloud 2", "Dark Cloud", "Freelancer", "Pokémon Ruby and Sapphire", "Amplitude", "Batman: Dark Tomorrow", "Dragon Ball Z: Ultimate Battle 22", "Midnight Club II", "Burnout 2: Point of Impact", "Golden Sun: The Lost Age", "Ikaruga", "Castlevania: Aria of Sorrow", "Rise of Nations", "Midnight Club II", "Wario World", "Arc the Lad: Twilight of the Spirits", "Warcraft III: The Frozen Throne", "WWE Wrestlemania XIX", "Anarchy Online: The Shadowlands", "Homeworld 2", "Homeworld", "Freedom Fighters", "Viewtiful Joe", "Time Crisis 3", "Tony Hawk's Underground", "Fire Emblem", "Onimusha Tactics", "Monster Rancher 4", "Monster Rancher 3", "Counter-Strike", "Prince of Persia: The Sands of Time", "Victoria: An Empire Under the Sun", "Beyond Good & Evil", "1080° Avalanche", "Silent Hill 3", "Saints Row 2", "Mirror's Edge", "Moon", "Skate 2", "Flower", "Halo Wars", "Killzone 2", "Killzone", "Tomb Raider: Underworld", "Let's Golf", "Resident Evil 5", "Mega Man 2", "Worms", "Sacred 2: Fallen Angel", "Punch-Out", "inFamous", "Red Faction: Guerrilla", "Anno 1404", "Blood Bowl", "NCAA Football 10", "Battlefield 1943", "Shatter", "Fat Princess", "Trials HD", "Madden NFL 10", "Metroid Prime", "Tomb Raider II", "Fate/unlimited codes", "IL-2 Sturmovik: Birds of Prey", "Mario & Luigi: Bowser's Inside Story", "Streets of Rage", "Scribblenauts", "Marvel: Ultimate Alliance", "Marvel: Ultimate Alliance 2", "Professor Layton and the Diabolical Box", "Kingdom Hearts 358/2 Days", "Canabalt", "Fieldrunners", "UmJammer Lammy", "Half-Minute Hero", "Brütal Legend", "Machinarium", "Tropico 3", "Trine", "Oddworld: Abe's Exoddus", "Borderlands", "Forza Motorsport 3", "Tekken 6", "Bayonetta", "Ninja Blade", "Dragon Age: Origins", "Jak and Daxter: The Lost Frontier", "Call of Duty: Modern Warfare", "Assassin's Creed: Bloodlines", "Angry Birds", "Uncharted 2: Among Thieves", "Minecraft", "Batman: Arkham Asylum", "Forza Motorsport 3", "Forza Motorsport 2", "Retro City Rampage", "The Cave", "Wrath of the White Witch", "Skulls of the Shogun", "Fire Emblem Awakening", "Sly Cooper: Thieves in Time", "Crysis 3", "Crysis 2", "Crysis", "Metal Gear Rising: Revengeance", "Super Hexagon", "SimCity", "Hotline Miami", "Terraria", "Canabalt HD", "Wizorb", "Ninja Gaiden 3: Razor's Edge", "Age of Empires II: HD Edition", "Motocross Madness", "Gemini Rue", "Surgeon Simulator 2013", "Dragon's Dogma: Dark Arisen", "Carmageddon", "Dragon's Lair", "Ratchet & Clank: Full Frontal Assault", "Limbo", "Neverwinter", "TowerFall", "Rogue Legacy", "Crazy Taxi", "Dynasty Warriors 8", "Dropchord", "Dragon's Crown", "Tales of Xillia", "Mario & Luigi: Dream Team", "Gone Home", "Plants vs. Zombies 2: It's About Time", "Final Fantasy XIV: A Realm Reborn", "Valhalla Knights 3", "Battlefield 4", "Crimson Dragon", "Dead Rising 3", "Madden NFL 25", "Peggle 2", "Peggle", "The Stanley Parable", "Dr. Luigi", "Dota 2", "Rayman Legends", "Army of Two: The 40th Day", "Chronos Twins DX", "Dark Void", "Silent Hill: Shattered Memories", "White Knight Chronicles", "Shiren the Wanderer", "Dynasty Warriors: Strikeforce", "Risen", "Rayman 2", "Lunar: Silver Star Harmony", "Infinite Space", "Dragon Age: Origins - Awakening", "Perfect Dark", "Cave Story", "Just Cause 2", "Flotilla", "Dark Void Zero", "Lost Planet 2", "Split Second: Velocity", "Blue Dragon: Awakened Shadow", "Phoenix Wright: Ace Attorney", "Super Mario Galaxy 2", "Blur", "Alpha Protocol", "Dune II", "Mega Man 4", "Ultima Underworld: The Stygian Abyss", "Kirby's Dream Land", "Super Mario Kart", "Virtua Racing", "Mortal Kombat", "Star Control II", "Star Control", "Sonic the Hedgehog 2", "Alone in the Dark", "The Legend of Zelda: A Link to the Past", "Metroid II: Return of Samus", "F-Zero", "Alien Breed", "Lemmings", "Another World", "Snake's Revenge", "Smash TV", "Ultima VI: The False Prophet", "Metal Gear 2: Solid Snake", "Dr. Mario", "Wing Commander", "Super Mario World", "Commander Keen", "Railroad Tycoon", "DuckTales", "Teenage Mutant Ninja Turtles", "Mother", "Castlevania III: Dracula's Curse", "Tetris", "Minesweeper", "Shadow of the Beast", "Altered Beast", "Ninja Gaiden", "Ghouls 'n Ghosts", "Double Dragon II: The Revenge", "Mario Kart 64", "Vandal Hearts", "The Last Express", "Harvest Moon", "Breath of Fire III", "Fallout", "Panzer General II", "Total Annihilation", "Crash Bandicoot 2: Cortex Strikes Back", "Diddy Kong Racing", "Bomberman 64", "Wing Commander: Prophecy", "Cyberpunk 2077", "Death Stranding", "Evil Genius 2", "Evil Genius", "Metroid Prime 4", "Ori and the Will of the Wisps", "Unreal Tournament", "The Talos Principle 2", "The Talos Principle", "System Shock 3", "Spelunky 2", "Spelunky", "Serious Sam 4", "Serious Sam 2", "Mount & Blade II: Bannerlord", "Mount & Blade", "Quake Champions", "Quake", "Total War: Arena", "The Sinking City", "Terraria: Otherworld", "Gintama Rumble", "SteamWorld Dig", "Rust", "Pac-Man Championship Edition 2 Plus", "Conan Exiles", "Donkey Kong Country: Tropical Freeze", "State of Decay 2", "State of Decay", "Call of Duty: Black Ops 4", "Concrete Genie", "Crackdown 3", "Crackdown 2", "Crackdown", "DayZ", "Fortnite", "Metro Exodus", "Ōkami HD", "Ōkami", "Shenmue III", "Shenmue II", "Shenmue", "Soulcalibur VI", "Soulcalibur", "Soulcalibur 4", "Sunless Skies", "Total War Saga: Thrones of Britannia", "We Happy Few", "Xenonauts 2", "World of Warcraft: Battle for Azeroth", "Wolfenstein II: The New Colossus", "Wolfenstein", "Wargroove", "Rampage", "Gravity Rush 2", "Dragon Quest VIII: Journey of the Cursed King", "Pokémon Duel", "Resident Evil 7: Biohazard", "Fire Emblem Heroes", "Poochy & Yoshi's Woolly World", "Husk", "Nioh", "WWE 2K17", "For Honor", "Sniper Elite 4", "Halo Wars 2", "Psychonauts in the Rhombus of Ruin", "Torment: Tides of Numenera", "Little Inferno", "Snipperclips", "The Binding of Isaac: Afterbirth+", "The Legend of Zelda: Breath of the Wild", "World of Goo", "Nier: Automata", "Tom Clancy's Ghost Recon Wildlands", "Ultimate Marvel vs. Capcom 3", "Mass Effect: Andromeda", "Rain World", "Thimbleweed Park", "Drawn to Death", "Persona 5", "Cosmic Star Heroine", "Full Throttle Remastered", "Full Throttle", "Cities: Skylines", "Syberia III", "What Remains of Edith Finch", "Expeditions: Vikings", "Mario Kart 8 Deluxe", "The Legend of Heroes: Trails in the Sky the 3rd", "To the Moon", "Injustice 2", "Phantom Dust Remaster", "Phantom Dust", "Thumper", "Chroma Squad", "Fire Emblem Echoes: Shadows of Valentia", "Shadow Warrior 2", "Vanquish", "Rime", "Guilty Gear Xrd Rev.2", "Star Trek: Bridge Crew", "Tokyo 42", "Dirt 4", "Dirt 3", "Farming Simulator 18", "Arms", "Valkyria Revolution", "Final Fantasy XII: The Zodiac Age", "Splatoon 2", "Splatoon", "Fable Fortune", "Pyre", "Tacoma", "Hellblade: Senua's Sacrifice", "LawBreakers", "Nidhogg 2", "Sonic Mania", "Undertale", "Uncharted: The Lost Legacy", "Absolver", "Ark: Survival Evolved", "ReCore Definitive Edition", "Windjammers", "Destiny 2", "Destiny", "Divinity: Original Sin II", "Divinity: Original Sin", "NHL 18", "NBA Live 18", "Dishonored: Death of the Outsider", "Dishonored", "NBA 2K18", "Guild Wars 2: Path of Fire", "Hob", "Total War: Warhammer II", "Cuphead", "Star Fox 2", "Star Fox", "Layton's Mystery Journey", "Oxenfree", "Megaton Rainfall", "The Mummy Demastered", "Assassin's Creed: Origins", "Super Mario Odyssey", "Hand of Fate 2", "Doom", "Batman: The Telltale Series", "L.A. Noire", "Rocket League", "Pokémon Ultra Sun and Ultra Moon", "Xenoblade Chronicles 2", "Xenoblade Chronicles", "Never Stop Sneakin'", "Romancing SaGa 2", "Oddworld: Soulstorm", "Way of the Passive Fist", "Punch Club 2: Fast Forward", "Death’s Gambit", "Warhammer Quest", "WWE Immortals", "Blackguards 2", "Ironclad Tactics", "Resident Evil HD Remaster", "Heroes of Might and Magic III: HD Edition", "Grow Home", "Evolve", "Monster Hunter 4 Ultimate", "Dead or Alive 5 Last Round", "The Sims 4", "The Book of Unwritten Tales 2", "The Book of Unwritten Tales", "The Order: 1886", "Homeworld Remastered Collection", "Homeworld", "DmC: Definitive Edition", "Ori and the Blind Forest", "Sid Meier's Starships", "Code Name: S.T.E.A.M.", "Jamestown+", "Mario Party 10", "Bloodborne", "Metal Slug 3", "Dark Souls II: Scholar of the First Sin", "Bastion", "Mortal Kombat X", "Titan Souls", "EA Sports UFC", "Monument Valley", "Invisible, Inc.", "Geometry Wars 3: Dimensions", "Heroes of the Storm", "Transistor", "Fallout Shelter", "PlanetSide 2", "Dragon Quest VI: Realms of Revelation", "Infinifactory", "Samurai Warriors Chronicles 3", "Skullgirls 2nd Encore", "The Fall", "Lost Dimension", "Brothers: A Tale of Two Sons", "Armello", "Year Walk", "80 Days", "Might & Magic Heroes VII", "Lost Horizon 2", "Rebel Galaxy", "Guitar Hero Live", "PixelJunk Shooter Ultimate", "Tales of Zestiria", "Galak-Z: The Dimensional", "Anno 2205", "Assassin's Creed Syndicate", "Helldivers", "SteamWorld Heist", "Metal Gear Solid V: The Phantom Pain", "The Witcher 3: Wild Hunt", "Journey", "Shovel Knight", "Fallout 4", "Star Wars Battlefront", "Ballblazer", "Arkanoid", "Advance Wars 2: Black Hole Rising", "Dragon Age: Inquisition", "Super Meat Boy", "F-Zero", "Wipeout", "Bully", "Alone in the Dark", "Spider-Man 2", "Space Channel 5", "Cave Story", "Ori and the Blind Forest", "Fable 2", "Star Fox 64", "Company of Heroes", "Batman: Arkham Asylum", "Marble Madness", "Nine Hours, Nine Persons, Nine Doors", "Gravity Rush", "Firewatch", "Aladdin", "Ninja Gaiden", "TimeSplitters 2", "GoldenEye 007", "Railroad Tycoon", "The Chronicles of Riddick: Escape From Butcher Bay", "Donkey Kong Jr.", "River City Ransom", "Picross 3D", "Electroplankton", "Plants vs. Zombies", "Boulder Dash", "The Witcher 2: Assassins of Kings", "Professor Layton and the Unwound Future", "Hitman Go", "Final Fantasy X", "Sonic Colors", "Wolfenstein: The New Order", "Psi-Ops: The Mindgate Conspiracy", "Jetpack Joyride", "Super Castlevania 4", "Need for Speed: Most Wanted", "WWF No Mercy", "Devil May Cry", "Indiana Jones And The Fate Of Atlantis", "Galaxian", "Space Invaders", "Bejeweled", "Snatcher", "Qix", "Power Stone 2", "Gran Turismo", "Missile Command", "Military Madness", "Metro 2033", "Fire Emblem Fates", "Sid Meier's Alpha Centauri", "Grim Fandango", "The Elder Scrolls IV: Oblivion", "Rhythm Heaven", "Drop7", "Kingdom Rush", "Power Stone", "Legacy of Kain: Soul Reaver", "Deus Ex Machina", "Thief: The Dark Project", "Star Wars Knights of the Old Republic 2: The Sith Lords", "Tiger Woods PGA Tour 12", "LittleBigPlanet", "Mirror's Edge", "Braid", "Frogger", "Wizardry: Proving Grounds of the Mad Overlord", "Silent Hill", "Jumpman Junior", "International Karate +", "Fire Emblem Awakening", "Devil's Crush", "Beatmania", "Ant Attack", "Lumines", "Metal Gear Solid 4: Guns of the Patriots", "Paper Mario: The Thousand Year Door", "Daytona USA", "FTL: Faster Than Light", "Star Wars: X-Wing", "Super Mario Land 2: Six Golden Coins", "Castle Crashers", "Joust", "Contra 3: The Alien Wars", "Fantastic Contraption", "Balance of Power", "Stunt Car Racer", "Return to Castle Wolfenstein", "Max Payne 2", "Dungeons and Dragons: Pool of Radiance", "Yakuza 0", "Threes", "Quadrilateral Cowboy", "Populous", "Hot Shots Golf", "Deus Ex", "The Legend of Zelda: Majora's Mask", "Samurai Shodown", "Marvel vs. Capcom: Clash of Super Heroes", "Lunar Lander", "Gunpoint", "Dungeon Keeper", "Descent", "Battlezone", "Ikaruga", "Breakout", "Super Smash Bros. Brawl", "Towerfall", "Chrono Cross", "Age of Empires", "Tempest", "Tempest 2000", "Day of the Tentacle", "The Legend of Zelda: A Link Between Worlds", "Thief: Deadly Shadows", "The World Ends With You", "Sonic CD", "Proteus", "God Hand", "Assassin's Creed 4: Black Flag", "Kirby's Dreamland", "Gauntlet", "Super Mario Sunshine", "Mario 64", "Max Payne", "Ico", "Wasteland", "Ultima 7: The Black Gate", "Tenchu: Stealth Assassins", "Shadow Hearts: Covenant", "Quake 3: Arena", "Phoenix Wright: Ace Attorney", "Marvel vs. Capcom 2: New Age of Heroes", "Heroes of Might and Magic 3", "Fatal Frame 2", "Sonic The Hedgehog 2", "Fez", "Demon's Souls", "Donkey Kong Country", "King's Quest", "Maniac Mansion", "Secret of Monkey Island", "Castlevania 3: Dracula's Curse", "The Jackbox Party Pack", "Castlevania", "X-COM: UFO Defense", "Monster Hunter Generations", "Flashback", "Soulcalibur", "Tomb Raider", "Jet Grind Radio", "Warcraft 2: Tides of Darkness", "Burnout Revenge", "Zero Escape: Virtue's Last Reward", "WarioWare: Twisted!", "Street Fighter Alpha 3", "Mini Metro", "Metal Gear Solid V: The Phantom Pain", "Mega Man X", "WarioWare, Inc.: Mega Microgames!", "Metal Gear Solid 3: Snake Eater", "Bushido Blade 2", "Animal Crossing", "30 Flights of Loving", "Overwatch", "Mario Kart 64", "Dragon's Dogma", "Myst", "P.T.", "City of Heroes", "StarCraft 2: Wings of Liberty", "Vagrant Story", "System Shock 2", "Superhot VR", "Streets of Rage 2", "Planescape Torment", "Monster Hunter Ultimate 4", "Giants: Citizen Kabuto", "Galaga", "Dragon Quest 8: Journey of the Cursed King", "Defender", "Castlevania: Aria of Sorrow", "Geometry Wars", "Wolfenstein 3D", "The Legend of Zelda: Link's Awakening", "No One Lives Forever", "Super Smash Bros.", "EverQuest", "The Oregon Trail", "Phantasy Star Online", "Kirby's Adventure", "Hearthstone", "Kirby: Canvas Curse", "Vampire the Masquerade - Redemption", "Rock Band", "Uncharted 2: Among Thieves", "Mike Tyson's Punch Out!!", "Diablo", "Device 6", "Hitman: Blood Money", "Super Mario Maker", "Papers, Please", "Burnout Paradise", "Elite", "Warlords", "The Sentinel", "Manic Miner", "Robotron: 2084", "Dragon Warrior", "Eve Online", "Metroid", "NetHack", "Doom 2", "Katamari Damacy", "Portal", "Portal 2", "Adventure", "Star Wars: Knights of the Old Republic", "Guild Wars 2", "Space Invaders", "Secret of Mana", "M.U.L.E.", "Habitat", "Ultima Online", "The Elder Scrolls 5: Skyrim", "Burnout 3: Takedown", "Harvest Moon", "League of Legends", "Splinter Cell: Chaos Theory", "Madden NFL 2005", "ESPN NFL 2K5", "Pong", "NHL '94", "Elite Beat Agents", "SimCity 2000", "Dance Dance Revolution", "Half-Life", "Football Manager", "Quest for Glory: So You Want to Be a Hero", "The Sims", "Halo: Combat Evolved", "Wii Sports", "The Legend of Zelda: Ocarina of Time", "Zork", "Gone Home", "Spelunky", "EarthBound", "NBA Jam", "Metal Gear Solid", "Dwarf Fortress", "Rogue", "FIFA 12", "Castlevania: Symphony of the Night", "SimCity", "StarCraft", "Final Fantasy 6", "Super Metroid", "Street Fighter 2", "Ms. Pac-Man"];

var populateState = function populateState(_ref) {
  var array = _ref.array,
      state = _ref.state;

  array.forEach(function (input) {
    var a = titleFns.arrayMaker({ input: input });
    titleFns.addToState({ array: a, state: state });
  });
};

var create = function create(_ref2) {
  var state = _ref2.state;
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { amount: 2 };
    var amount = options.amount,
        seed = options.seed;

    return titleFns.createChain({ state: state, amount: amount, seed: seed });
  };
};

var Markov = function Markov() {
  var state = {
    entry: [],
    exit: [],
    node: {}
  };

  populateState({ array: titles, state: state });
  return { create: create({ state: state }) };
};

var systems = {
  portable: [{
    releaseDates: ['1989', '1995'],
    systems: ['Game Boy', 'Game Gear', 'Atari Lynx', 'TurboExpress']
  }, {
    releaseDates: ['1995', '2002'],
    systems: ['NOMAD', 'Game Boy Color', 'Neo Geo Pocket', 'WonderSwan']
  }, {
    releaseDates: ['2001', '2005'],
    systems: ['Game Boy Advance', 'N-Gage']
  }, {
    releaseDates: ['2004', '2012'],
    systems: ['Nintendo DS', 'PSP']
  }, {
    releaseDates: ['2011', '2018'],
    systems: ['Nintendo 3DS', 'Vita']
  }, {
    releaseDates: ['2017', '2018'],
    systems: ['Switch']
  }],
  console: [{
    systems: ['NES', 'Master System', 'Atari 7800', 'Atari XEGS'],
    releaseDates: ['1985', '1990']
  }, {
    systems: ['TurboGrafx-16', 'Genesis', 'Neo Geo', 'Super NES', 'Sega CD', 'LaserActive'],
    releaseDates: ['1989', '1995']
  }, {
    systems: ['3DO', 'Jaguar', 'Saturn', 'PlayStation', 'N64'],
    releaseDates: ['1993', '1998']
  }, {
    systems: ['Dreamcast', 'Playstation 2', 'GameCube', 'Xbox'],
    releaseDates: ['1998', '2007']
  }, {
    systems: ['Xbox 360', 'Playstation 3', 'Wii'],
    releaseDates: ['2005', '2014']
  }, {
    systems: ['Wii U', 'Playstation 4', 'Xbox One', 'Nintendo Switch'],
    releaseDates: ['2014', '2018']
  }],
  mobile: [{
    systems: ['iOS', 'Android'],
    releaseDates: ['2008', '2018']
  }],
  pc: [{
    systems: ['PC', 'Mac'],
    releaseDates: ['1980', '2018']
  }]
};

var _slicedToArray$1 = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var between = function between(_ref) {
  var array = _ref.array,
      seed = _ref.seed;

  var _array = _slicedToArray$1(array, 2),
      start = _array[0],
      end = _array[1];

  var opts = [];
  for (var i = start; i < end; i++) {
    opts.push(i);
  }

  return titleFns.sample({ array: opts, seed: seed });
};

var platformCentric = function platformCentric(_ref2) {
  var title = _ref2.title;

  switch (true) {
    case title.includes('64'):
      return ['N64'];
    case title.includes('Super'):
      return ['SNES'];
    case title.includes(' U'):
      return ['Wii U'];
    default:
      return false;
  }
};

var fns = {
  between: between,
  platformCentric: platformCentric,
  sample: titleFns.sample
};

var generator = function generator() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var amount = obj.amount,
      seed = obj.seed,
      title = obj.title;


  var consoleTypes = ['portable', 'console', 'mobile', 'pc'];
  var consoleType = fns.sample({ array: consoleTypes, seed: seed });

  var platformOptions = fns.sample({ array: systems[consoleType], seed: seed });
  var systems$$1 = platformOptions.systems,
      releaseDates = platformOptions.releaseDates;


  var result = {
    consoleType: consoleType,
    releaseDate: fns.between({ array: releaseDates, seed: seed })
  };

  if (title) {
    var singlePlatform = fns.platformCentric({ title: title });
    if (singlePlatform !== false) {
      result.systems = singlePlatform;
      return result;
    }
  }

  // --------platform gen assuming its title agnostic--------
  if (amount === undefined) {
    var amountArray = [1, systems$$1.length];
    amount = fns.between({ array: amountArray, seed: seed });
  }

  var plats = [];
  var list = systems$$1.slice();

  for (var i = 0; i < amount; i++) {
    var plat = fns.sample({ array: list, seed: seed });
    var platIndex = list.indexOf(plat);
    plats.push(plat);
    list.splice(platIndex, 1);
  }

  result.systems = plats;
  return result;
};

var _slicedToArray$2 = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var parsedUrl = urlFns.parseUrl();
var isHomePage = parsedUrl.length === 0;
var container = document.querySelector('.container');

console.log({ parsedUrl: parsedUrl });

if (isHomePage) {
  paintHomePage(container);
} else {
  var _parsedUrl = _slicedToArray$2(parsedUrl, 2),
      title = _parsedUrl[0],
      number = _parsedUrl[1];

  var Title = Markov();

  var list = [];
  for (var i = number; i > 0; i--) {
    var seed = _title + i;
    var _title = Title.create({ seed: seed, amount: 2 });

    var _systemsGenerator = generator({ seed: seed, title: _title }),
        systems$1 = _systemsGenerator.systems,
        releaseDate = _systemsGenerator.releaseDate;

    var item = {
      title: _title,
      releases: systems$1.reduce(function (str, console, i) {
        return i === 0 ? '' + console : str + ', ' + console;
      }, ''),
      releaseDate: releaseDate,
      number: i
    };

    list.push(item);
  }
  paintListPage(container, list);
}

}());
