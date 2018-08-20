(function () {
'use strict';

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

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

  var _inputs = slicedToArray(inputs, 2),
      title = _inputs[0],
      num = _inputs[1];

  if (title.length === 0) return false;

  return parseInt(num, 10) > 0;
}

var urlFns = { parseUrl: parseUrl, setUrl: setUrl, validateInputs: validateInputs };

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

// Detect the global object, even if operating in strict mode.
// http://stackoverflow.com/a/14387057/265298
var global = (eval)('this'),
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
      seed = _ref.seed,
      amount = _ref.amount;

  var rng = seed ? seedrandom$2(seed) : seedrandom$2();
  var amountLeft = amount || 1;
  var results = [];
  var options = array.slice();
  while (amountLeft > 0) {
    amountLeft--;
    var index = Math.floor(rng() * options.length);
    var option = options.splice(index, 1);
    results = results.concat(option);
  }

  return results.length === 1 ? results[0] : results;
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
  var newSeed = 0;

  while (item.entry === true && item.exit === true) {
    item = getItem({ seed: seed + newSeed, state: state.node });
    newSeed++;
    haveStart = item.entry === true;
    haveEnd = item.exit === true;
  }

  var parts = [];
  while (i < amount) {
    direction = switcher(direction);
    i++;
    if (haveStart === true && haveEnd === true) break;
    if (haveStart && direction === 'prev') break;
    if (haveEnd && direction === 'next') break;

    item = getItem({ seed: seed + i, state: state.node });
    if (parts.includes(item.value)) continue;

    if (direction === 'prev') parts.push(item.value);
    if (direction === 'next') parts.unshift(item.value);
    haveStart = item.entry && direction === 'prev' === true;
    haveEnd = item.exit && direction === 'next' === true;
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

var between = function between(_ref7) {
  var array = _ref7.array,
      seed = _ref7.seed;

  var _array = slicedToArray(array, 2),
      start = _array[0],
      end = _array[1];

  var opts = [];
  for (var i = start; i <= end; i++) {
    opts.push(i);
  }

  return sample({ array: opts, seed: seed });
};

var platformCentric = function platformCentric(_ref8) {
  var title = _ref8.title;

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
  sample: sample,
  getPart: getPart,
  addToState: addToState,
  arrayMaker: arrayMaker,
  createChain: createChain,
  getItem: getItem,
  switcher: switcher,
  between: between,
  platformCentric: platformCentric
};

var homePageTemplate = function homePageTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var title = data.title || 'Polygonal';
  var number = data.number || 50;

  document.title = 'The ' + number + ' best games of all time - ' + title;

  return '\n    <div class=\'about offscreen\'>\n      <div>\xD7</div>\n      <h3>What Even Is This?</h3>\n      <p>To celebrate their fifth birthday, the website Polygon decided to rank the 500 best games of all time.</p>\n      <p>To pay homage, I thought it would be a fun project to create a generative version. </p>\n      <p>The generator uses the title of the site as the seed for randomization; this makes a list easy to share, should you find a made up list that you think is worth sharing.</p>\n    </div>\n    <div class=\'form-container\'>\n      <div class=\'about-callout\'>What even is this?</div>\n      <div class="background-logo"></div>\n      <form class=\'form create-best-games\'>\n        <input id=\'title-input\' type=\'text\' name=\'title\' value=\'' + title + '\' autofocus>\n        <div>\n          <span> The </span>\n          <input id=\'amount-input\' type=\'number\' name=\'amount\' value=' + number + '>\n          <span> best games of all time</span>\n        </div>\n        <span> After weeks of voting and arguments, we\u2019re ready to present our choices </span>\n        <input id=\'submit-input\' type=\'submit\' name=\'submit\' value=\'View Now\'>\n     </form>\n    </div>';
};

var paintHomePage = function paintHomePage(container) {
  container.innerHTML = '';
  container.innerHTML = homePageTemplate();
};

var itemTemplate = function itemTemplate(_ref) {
  var item = _ref.item;
  return "<li>\n    <h2>" + item.number + ". " + item.title + "</h2>\n    <p>(" + item.releaseDate + ", " + item.releases + ")</p>\n    <p>" + item.text + "</p>\n  </li>";
};

var listTemplate = function listTemplate(_ref) {
  var list = _ref.list,
      title = _ref.title,
      number = _ref.number;

  var template = homePageTemplate({ title: title, number: number });
  var ul = '<ul>';
  list.forEach(function (item) {
    return ul += itemTemplate({ item: item });
  });
  ul += '</ul>';
  return template + ul;
};

var paintListPage = function paintListPage(_ref) {
  var container = _ref.container,
      list = _ref.list,
      title = _ref.title,
      number = _ref.number;

  container.innerHTML = '';

  container.innerHTML = listTemplate({ list: list, title: title, number: number });
};

var formEvent = function formEvent() {
  var form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var inputs = ['title', 'amount'];
    var data = inputs.map(function (id, i) {
      var input = document.querySelector('#' + id + '-input');
      return i === 0 ? input.value : parseInt(input.value, 10);
    });

    if (urlFns.validateInputs(data)) {
      urlFns.setUrl.apply(urlFns, toConsumableArray(data));
    }
  });
};

var aboutEvent = function aboutEvent() {
  var callout = document.querySelector('.about-callout');
  var about = document.querySelector('.about');

  callout.addEventListener('click', function (e) {
    e.preventDefault();
    about.classList.remove('offscreen');
  });

  about.addEventListener('click', function (e) {
    e.preventDefault();
    about.classList.add('offscreen');
  });
};

var titles = ["Sea of Thieves", "R.B.I Baseball 18", "Attack on Titan 2", "Assault Gunners HD Edition", "Assassin's Creed Rogue: Remastered", "Kirby Star Allies", "Burnout Paradise Remastered", "Surviving Mars", "Gal Gunvolt Burst", "Q.U.B.E. 2", "Devil May Cry HD Collection", "Flinthook", "Warhammer: Vermintide 2", "Chuchel", "Damascus Gear: Operation Osaka", "Scribblenauts Showdown", "Frantics", "Final Fantasy XV", "Fear Effect Sedna", "DJMax Respect", "Bravo Team", "Pit People", "H1Z1", "Darkest Dungeon", "Payday 2", "Moss", "Heroine Anthem Zero", "Gravel", "Girls and Panzer: Dream Tank Match", "De Blob 2 Remastered", "Part Time UFO", "Yume Nikki: Dream Diary", "Sword Art Online: Fatal Bullet", "Past Cure", "Pac-Man Championship Edition 2 Plus", "Metal Gear Survive", "Armored Warfare", "Age of Empires: Definitive Edition", "Fe", "Bayonetta", "Bayonetta 2", "Secret of Mana", "A Certain Magical Virtual-On", "The Legend of Heroes: Trails of Cold Steel II", "The Legend of Heroes: Trails of Cold Steel", "The Longest 5 Minutes", "Radiant Historia: Perfect Chronology", "Owlboy", "Monster Energy Supercross: The Official", "Kingdom Come: Deliverance", "Dynasty Warriors 9", "Under Night In-Birth Exe: Late[st]", "The Seven Deadly Sins: Knights of Britannia", "Dragon Quest Builders", "Rust", "Octogeddon", "Civilization VI: Rise and Fall", "Shadow of the Colossus", "Marooners", "We Were Here Too", "Gundemoniums", "EA Sports UFC 3", "SteamWorld Dig", "Sky Force Reloaded", "Night in the Woods", "Dissidia Final Fantasy NT", "Monster Hunter: World", "Dragon Ball FighterZ", "Celeste", "The Inpatient", "Subnautica", "Lost Sphear", "Iconoclasts", "Kirby Battle Royale", "World to the West", "Gintama Rumble", "Darkest Dungeon", "Street Fighter V Arcade Edition", "Kerbal Space Program: Enhanced Edition", "InnerSpace", "The Escapists 2", "The Escapists", "Valkyria Chronicles 4", "A Way Out", "Detective Pikachu", "Atelier Lydie & Suelle: The Alchemists and the Mysterious Paintings", "Far Cry 5", "Far Cry 4", "Far Cry 3", "MLB The Show 18", "Long Gone Days", "Shining Resonance Refrain", "Shining Force", "Shining in the Dark", "Super Robot Wars X", "Dark Rose Valkyrie", "Extinction", "God of War", "Nintendo Labo Variety Kit", "Nintendo Labo Robot Kit", "Adventure Time: Pirates of the Enchiridion", "Frostpunk", "South Park: The Fractured but Whole", "BattleTech", "Donkey Kong Country: Tropical Freeze", "Pillars of Eternity II: Deadfire", "Conan Exiles", "Hyrule Warriors: Definitive Edition", "State of Decay 2", "Dark Souls Remastered", "Detroit: Become Human", "Vampyr", "Street Fighter 30th Anniversary Collection", "Full Metal Panic! Fight: Who Dares Wins", "Sushi Striker: The Way of Sushido", "Jurassic World Evolution", "The Crew 2", "Captain Toad: Treasure Tracker", "Octopath Traveler", "WarioWare Gold", "Shadow of the Tomb Raider", "Call of Duty: Black Ops 4", "Red Dead Redemption 2", "Red Dead Redemption", "Anno 1800", "Call of Cthulhu", "Catherine: Full Body", "Concrete Genie", "Pony Island", "Amplitude", "Hardware: Rivals", "Volume", "Punch Club", "Lovely Planet", "Assassin's Creed Chronicles: India", "Gemini: Heroes Reborn", "Gone Home: Console Edition", "The Banner Saga", "That Dragon, Cancer", "Dragon's Dogma: Dark Arisen", "A Boy and His Blob", "Darkest Dungeon", "Oddworld: New 'n' Tasty!", "Resident Evil Zero HD Remaster", "The Deadly Tower of Monsters", "World of Tanks", "Homeworld: Deserts of Kharak", "Minecraft: Story Mode: Episode 1 — The Order of the Stone", "The Westport Independent", "Mario & Luigi: Paper Jam", "Lego Marvel's Avengers", "The Witness", "Rise of the Tomb Raider", "Bombshell", "This War of Mine: The Little Ones", "American Truck Simulator", "Digimon Story: Cyber Sleuth", "Megadimension Neptunia VII", "Tales of Symphonia HD", "Agatha Christie: The ABC Murders", "Assassin's Creed Chronicles: Russia", "XCOM 2", "Final Fantasy IX", "Lovers in a Dangerous Spacetime", "Naruto Shippuden: Ultimate Ninja Storm 4", "Grand Theft Auto: Liberty City Stories Mobile", "Pillars of Eternity: The White March Part 2", "Project X Zone 2", "The Escapists: The Walking Dead", "Rocket League", "Danganronpa: Trigger Happy Havoc", "Far Cry Primal", "Plants vs. Zombies: Garden Warfare 2", "The Flame in the Flood", "Gears of War: Ultimate Edition", "The Witch and the Hundred Knight: Revival Edition", "Heavy Rain", "BlazBlue: Chrono Phantasma Extend", "Black Desert Online", "The Legend of Zelda: Twilight Princess HD", "Tom Clancy's The Division", "Shadow Complex Remastered", "XCOM: Enemy Unknown", "Adventure Time: Magic Man's Head Games", "Keep Talking and Nobody Explodes", "Minecraft: Story Mode Episode 5 — Order Up!", "Ashes of the Singularity", "Sleeping Dogs: Definitive Edition", "1979 Revolution: Black Friday", "Sorcery! Part 3: The Seven Serpents", "Skullgirls 2nd Encore", "Everybody's Gone to the Rapture", "Dark Souls III", "Loud on Planet X", "The Banner Saga 2", "The Banner Saga", "Hyperdevotion Noire: Goddess Black Heart", "Stranger of Sword City", "Offworld Trading Company", "Uncharted 4: A Thief's End", "Shadow of the Beast", "Total War: Warhammer", "Dead Island: Definitive Edition", "Hearts of Iron IV", "Guilty Gear Xrd -Revelator-", "Sherlock Holmes: The Devil's Daughter", "Deadlight: Director’s Cut", "Mario & Sonic at the Rio 2016 Olympic Games", "Lost Sea", "Crypt of the Necrodancer Pocket Edition", "Crypt of the Necrodancer", "Romance of the Three Kingdoms XIII", "Assault Suit Leynos", "Mobile Suit Gundam: Extreme VS Force", "Kerbal Space Program", "Batman: Arkham Underworld", "Earth Defense Force 4.1: The Shadow of New Despair", "Kentucky Route Zero Act 4", "Fairy Fencer F: Advent Dark Force", "Stardew Valley", "Xblaze: Lost Memories", "The Girl and the Robot", "Master of Orion: Conquer the Stars", "Star Trek Online", "Pro Evolution Soccer 2017", "The Witness", "NBA 2K17", "NBA 2K14", "NBA 2K12", "NBA 2K9", "NBA 2K10", "FIFA 17", "FIFA 2007", "FIFA 08", "FIFA 15", "FIFA 12", "FIFA 98", "NFL Blitz", "Call of Cthulhu: The Wasted Land", "Double Fine Happy Action Theater", "Kingdoms of Amalur: Reckoning", "Shank 2", "Shank", "Jagged Alliance: Back in Action", "Tales of the Abyss", "Grand Slam Tennis 2", "Crusader Kings II", "Dear Esther", "Little Deviants", "Metal Gear Solid: Snake Eater 3D", "Dynasty Warriors Next", "Hot Shots Golf: World International", "Lumines: Electronic Symphony", "Wipeout 2048", "Shin Megami Tensei: Devil Survivor 2", "Vessel", "MLB 12: The Show", "Street Fighter X Tekken", "Mario Party 9", "Dungeon Defenders", "Total War: Shogun 2 – Fall of the Samurai", "Rayman Origins", "BioShock 2", "BioShock", "BioShock Infinite", "The House of the Dead 4", "Insanely Twisted Shadow Planet", "The Witcher 2: Assassins of Kings Enhanced Edition", "Port Royale 3: Pirates & Merchants", "Diablo III", "Diablo 2", "Diablo", "Mario Tennis Open", "Resident Evil: Operation Raccoon City", "Metal Gear Solid HD Collection", "Pokémon Conquest", "Civilization V: Gods & Kings", "Tom Clancy's Ghost Recon: Future Soldier", "Final Fantasy III", "The Amazing Spider-Man", "Tony Hawk's Pro Skater HD", "Growlanser Wayfarer of Time", "Persona 4 Arena", "Persona 4", "The Last Story", "Madden NFL 13", "Rock Band Blitz", "Anomaly: Warzone Earth", "Tekken Tag Tournament 2", "Torchlight II", "Torchlight", "Tokyo Jungle", "Marvel vs. Capcom Origins", "Dishonored", "RollerCoaster Tycoon 3D", "Carmageddon", "The Witcher 2: Assassins of Kings", "Medal of Honor: Warfighter", "Assassin's Creed III", "Ragnarok Tactics", "Paper Mario: Sticker Star", "Thomas Was Alone", "Epic Mickey: Power of Illusion", "Virtua Fighter 2", "Legacy of Kain: Soul Reaver", "Grand Theft Auto: San Andreas", "Final Fantasy IV", "Oddworld: Munch's Oddysee", "Divinity II: Ego Draconis", "Bayonetta", "Vandal Hearts: Flames of Judgment", "Mass Effect 2", "No More Heroes 2: Desperate Struggle", "S.T.A.L.K.E.R.: Call of Pripyat", "Deadly Premonition", "Risen", "Napoleon: Total War", "MLB 2K10", "Final Fantasy XIII", "God of War III", "Dead or Alive Paradise", "Mega Man 10", "Flotilla", "Monster Hunter Tri", "Alan Wake", "UFC 2010", "River City Soccer Hooligans", "Prince of Persia: The Forgotten Sands", "Ninety-Nine Nights II", "Singularity", "StarCraft II: Wings of Liberty", "Madden NFL 11", "Victoria 2", "Victoria", "Mafia II", "Mafia 3", "Phantasy Star II", "Phantasy Star IV", "Spider-Man: Shattered Dimensions", "Lost Horizon", "Front Mission Evolved", "Final Fantasy XIV", "Quantum Theory", "Castlevania: Lords of Shadow", "NBA Jam", "Lost Planet 2", "Sonic the Hedgehog 4: Episode 1", "Naruto Shippuden: Ultimate Ninja Storm 2", "Fallout: New Vegas", "Vanquish", "Fable III", "FIFA Manager 11", "God of War: Ghost of Sparta", "The Penguins of Madagascar", "Football Manager 2011", "Assassin's Creed: Brotherhood", "Pac-Man Party", "Tom Clancy's Ghost Recon", "Need for Speed: Hot Pursuit", "Gran Turismo 5", "Golden Sun: Dark Dawn", "Super Meat Boy", "World of Warcraft: Cataclysm", "Secret of Mana", "Saints Row 2", "Street Fighter IV", "Star Ocean: The Last Hope", "Warhammer 40,000: Dawn of War II", "Empire: Total War", "The Maw", "Resident Evil 5", "Valkyrie Profile: Covenant of the Plume", "Suikoden Tierkreis", "The Last Remnant", "Ninja Blade", "Dynasty Warriors: Gundam 2", "inFamous", "Gunstar Heroes", "Anno 1404", "Overlord: Dark Legend", "Overlord II", "Call of Juarez: Bound in Blood", "BlazBlue: Calamity Trigger", "Tales of Monkey Island", "Resident Evil 4", "Rez", "Mobile Suit Gundam: Zeonic Front", "Medal of Honor: Allied Assault", "MotoGP 2", "PaRappa the Rapper 2", "Grandia II", "Sonic Advance", "Super Mario Advance 2: Super Mario World", "Star Wars: Racer Revenge", "Zone of the Enders: The Fist of Mars", "Tony Hawk's Pro Skater 3", "Dungeon Siege", "The Elder Scrolls III: Morrowind", "Tactics Ogre: The Knight of Lodis", "Dragon Ball Z: The Legacy of Goku", "Looney Tunes: Space Race", "The House of the Dead III", "Digimon World 3", "Neverwinter Nights", "Shantae", "Warcraft III: Reign of Chaos", "Duke Nukem Advance", "Medieval: Total War", "Armored Core 3", "Armored Core", "Battlefield 1942", "Mega Man Zero", "Kingdom Hearts", "Dynasty Tactics", "Divine Divinity", "Super Mario Advance 3: Yoshi's Island", "Spyro 2: Season of Flame", "Hitman 2: Silent Assassin", "Virtua Tennis", "Mario Party 4", "Suikoden III", "NHL 2K3", "MechAssault", "Tom Clancy's Splinter Cell", "Ninja Assault", "Star Wars Jedi Knight II: Jedi Outcast", "Steel Battalion", "Gauntlet: Dark Legacy", "Final Fantasy Tactics", "Xenogears", "Yoshi's Story", "SaGa Frontier", "Panzer Dragoon Saga", "Star Ocean: The Second Story", "Commandos: Behind Enemy Lines", "Heart of Darkness", "Parasite Eve", "Caesar III", "Pokémon Blue", "Pokémon Red", "Pokémon Yellow", "Half-Life", "The Legend of Zelda: Ocarina of Time", "Star Wars: Rogue Squadron", "Baldur's Gate", "Falcon 4.0", "Civilization II", "Super Mario 64", "Star Ocean", "Tekken 2", "Madden NFL 97", "Master of Orion II", "Command & Conquer: Red Alert", "Dead or Alive", "Dragon Force", "Bust-a-Move", "Battle Arena Toshinden", "Chrono Trigger", "Super Bomberman 3", "Bomberman", "Twisted Metal", "Warcraft II: Tides of Darkness", "Tales of Phantasia", "World of Warcraft: The Burning Crusade", "Europa Universalis III", "Sonic the Hedgehog", "Jade Empire", "Theme Park", "S.T.A.L.K.E.R.: Shadow of Chernobyl", "Medal of Honor: Vanguard", "Command & Conquer 3: Tiberium Wars", "Guitar Hero II", "Guitar Hero", "Pokémon Pearl", "Pokémon Diamond", "Odin Sphere", "Mario Party 8", "Overlord", "Pokémon Battle Revolution", "Super Stardust HD", "Dynasty Warriors DS: Fighter's Battle", "Shin Megami Tensei: Persona 3", "The Settlers II", "Medieval II: Total War: Kingdoms", "Warhawk", "Medal of Honor: Airborne", "Skate", "Neverwinter Nights 2: Mask of the Betrayer", "Project Gotham Racing 4", "The Legend of Spyro: The Eternal Night", "Syphon Filter: Logan's Shadow", "Final Fantasy Tactics: The War of the Lions", "FIFA Soccer 08", "Half-Life 2", "Team Fortress 2", "Team Fortress", "Age of Empires III: The Asian Dynasties", "The Eye of Judgment", "Hellgate: London", "The Witcher", "Viva Piñata: Party Animals", "Fire Emblem: Radiant Dawn", "Call of Duty 4: Modern Warfare", "Silent Hill: Origins", "Super Mario Galaxy", "Enchanted", "Medal of Honor: Heroes 2", "WWE SmackDown vs. Raw 2008", "Kane & Lynch: Dead Men", "Orcs & Elves", "SimCity Societies", "Assassin's Creed", "Unreal Tournament 3", "Mass Effect", "Psychonauts", "Nights: Journey of Dreams", "SimCity 4", "Devil May Cry 2", "Dead or Alive Xtreme Beach Volleyball", "Capcom vs. SNK EO", "Tom Clancy's Splinter Cell", "Dark Cloud 2", "Dark Cloud", "Freelancer", "Pokémon Ruby and Sapphire", "Amplitude", "Batman: Dark Tomorrow", "Dragon Ball Z: Ultimate Battle 22", "Midnight Club II", "Burnout 2: Point of Impact", "Golden Sun: The Lost Age", "Ikaruga", "Castlevania: Aria of Sorrow", "Rise of Nations", "Midnight Club II", "Wario World", "Arc the Lad: Twilight of the Spirits", "Warcraft III: The Frozen Throne", "WWE Wrestlemania XIX", "Anarchy Online: The Shadowlands", "Homeworld 2", "Homeworld", "Freedom Fighters", "Viewtiful Joe", "Time Crisis 3", "Tony Hawk's Underground", "Fire Emblem", "Onimusha Tactics", "Monster Rancher 4", "Monster Rancher 3", "Counter-Strike", "Prince of Persia: The Sands of Time", "Victoria: An Empire Under the Sun", "Beyond Good & Evil", "1080° Avalanche", "Silent Hill 3", "Saints Row 2", "Mirror's Edge", "Moon", "Skate 2", "Flower", "Halo Wars", "Killzone 2", "Killzone", "Tomb Raider: Underworld", "Let's Golf", "Resident Evil 5", "Mega Man 2", "Worms", "Sacred 2: Fallen Angel", "Punch-Out", "inFamous", "Red Faction: Guerrilla", "Anno 1404", "Blood Bowl", "NCAA Football 10", "Battlefield 1943", "Shatter", "Fat Princess", "Trials HD", "Madden NFL 10", "Metroid Prime", "Tomb Raider II", "Fate/unlimited codes", "IL-2 Sturmovik: Birds of Prey", "Mario & Luigi: Bowser's Inside Story", "Streets of Rage", "Scribblenauts", "Marvel: Ultimate Alliance", "Marvel: Ultimate Alliance 2", "Professor Layton and the Diabolical Box", "Kingdom Hearts 358/2 Days", "Canabalt", "Fieldrunners", "UmJammer Lammy", "Half-Minute Hero", "Brütal Legend", "Machinarium", "Tropico 3", "Trine", "Oddworld: Abe's Exoddus", "Borderlands", "Forza Motorsport 3", "Tekken 6", "Bayonetta", "Ninja Blade", "Dragon Age: Origins", "Jak and Daxter: The Lost Frontier", "Call of Duty: Modern Warfare", "Assassin's Creed: Bloodlines", "Angry Birds", "Uncharted 2: Among Thieves", "Minecraft", "Batman: Arkham Asylum", "Forza Motorsport 3", "Forza Motorsport 2", "Retro City Rampage", "The Cave", "Wrath of the White Witch", "Skulls of the Shogun", "Fire Emblem Awakening", "Sly Cooper: Thieves in Time", "Crysis 3", "Crysis 2", "Crysis", "Metal Gear Rising: Revengeance", "Super Hexagon", "SimCity", "Hotline Miami", "Terraria", "Canabalt HD", "Wizorb", "Ninja Gaiden 3: Razor's Edge", "Age of Empires II: HD Edition", "Motocross Madness", "Gemini Rue", "Surgeon Simulator 2013", "Dragon's Dogma: Dark Arisen", "Carmageddon", "Dragon's Lair", "Ratchet & Clank: Full Frontal Assault", "Limbo", "Neverwinter", "TowerFall", "Rogue Legacy", "Crazy Taxi", "Dynasty Warriors 8", "Dropchord", "Dragon's Crown", "Tales of Xillia", "Mario & Luigi: Dream Team", "Gone Home", "Plants vs. Zombies 2: It's About Time", "Final Fantasy XIV: A Realm Reborn", "Valhalla Knights 3", "Battlefield 4", "Crimson Dragon", "Dead Rising 3", "Madden NFL 25", "Peggle 2", "Peggle", "The Stanley Parable", "Dr. Luigi", "Dota 2", "Rayman Legends", "Army of Two: The 40th Day", "Chronos Twins DX", "Dark Void", "Silent Hill: Shattered Memories", "White Knight Chronicles", "Shiren the Wanderer", "Dynasty Warriors: Strikeforce", "Risen", "Rayman 2", "Lunar: Silver Star Harmony", "Infinite Space", "Dragon Age: Origins - Awakening", "Perfect Dark", "Cave Story", "Just Cause 2", "Flotilla", "Dark Void Zero", "Lost Planet 2", "Split Second: Velocity", "Blue Dragon: Awakened Shadow", "Phoenix Wright: Ace Attorney", "Super Mario Galaxy 2", "Blur", "Alpha Protocol", "Dune II", "Mega Man 4", "Ultima Underworld: The Stygian Abyss", "Kirby's Dream Land", "Super Mario Kart", "Virtua Racing", "Mortal Kombat", "Star Control II", "Star Control", "Sonic the Hedgehog 2", "Alone in the Dark", "The Legend of Zelda: A Link to the Past", "Metroid II: Return of Samus", "F-Zero", "Alien Breed", "Lemmings", "Another World", "Snake's Revenge", "Smash TV", "Ultima VI: The False Prophet", "Metal Gear 2: Solid Snake", "Dr. Mario", "Wing Commander", "Super Mario World", "Commander Keen", "Railroad Tycoon", "DuckTales", "Teenage Mutant Ninja Turtles", "Mother", "Castlevania III: Dracula's Curse", "Tetris", "Minesweeper", "Shadow of the Beast", "Altered Beast", "Ninja Gaiden", "Ghouls 'n Ghosts", "Double Dragon II: The Revenge", "Mario Kart 64", "Vandal Hearts", "The Last Express", "Harvest Moon", "Breath of Fire III", "Fallout", "Panzer General II", "Total Annihilation", "Crash Bandicoot 2: Cortex Strikes Back", "Diddy Kong Racing", "Bomberman 64", "Wing Commander: Prophecy", "Cyberpunk 2077", "Death Stranding", "Evil Genius 2", "Evil Genius", "Metroid Prime 4", "Ori and the Will of the Wisps", "Unreal Tournament", "The Talos Principle 2", "The Talos Principle", "System Shock 3", "Spelunky 2", "Spelunky", "Serious Sam 4", "Serious Sam 2", "Mount & Blade II: Bannerlord", "Mount & Blade", "Quake Champions", "Quake", "Total War: Arena", "The Sinking City", "Terraria: Otherworld", "Gintama Rumble", "SteamWorld Dig 2", "Rust", "Pac-Man Championship Edition 2 Plus", "Conan Exiles", "Donkey Kong Country: Tropical Freeze", "State of Decay 2", "State of Decay", "Call of Duty: Black Ops 4", "Concrete Genie", "Crackdown 3", "Crackdown 2", "Crackdown", "DayZ", "Fortnite", "Metro Exodus", "Ōkami HD", "Ōkami", "Shenmue III", "Shenmue II", "Shenmue", "Soulcalibur VI", "Soulcalibur", "Soulcalibur 4", "Sunless Skies", "Total War Saga: Thrones of Britannia", "We Happy Few", "Xenonauts 2", "World of Warcraft: Battle for Azeroth", "Wolfenstein II: The New Colossus", "Wolfenstein", "Wargroove", "Rampage", "Gravity Rush 2", "Dragon Quest VIII: Journey of the Cursed King", "Pokémon Duel", "Resident Evil 7: Biohazard", "Fire Emblem Heroes", "Poochy & Yoshi's Woolly World", "Husk", "Nioh", "WWE 2K17", "For Honor", "Sniper Elite 4", "Halo Wars 2", "Psychonauts in the Rhombus of Ruin", "Torment: Tides of Numenera", "Little Inferno", "Snipperclips", "The Binding of Isaac: Afterbirth+", "The Legend of Zelda: Breath of the Wild", "World of Goo", "NieR: Automata", "Tom Clancy's Ghost Recon Wildlands", "Ultimate Marvel vs. Capcom 3", "Mass Effect: Andromeda", "Rain World", "Thimbleweed Park", "Drawn to Death", "Persona 5", "Cosmic Star Heroine", "Full Throttle Remastered", "Full Throttle", "Cities: Skylines", "Syberia III", "What Remains of Edith Finch", "Expeditions: Vikings", "Mario Kart 8 Deluxe", "The Legend of Heroes: Trails in the Sky the 3rd", "To the Moon", "Injustice 2", "Phantom Dust Remaster", "Phantom Dust", "Thumper", "Chroma Squad", "Fire Emblem Echoes: Shadows of Valentia", "Shadow Warrior 2", "Vanquish", "Rime", "Guilty Gear Xrd Rev.2", "Star Trek: Bridge Crew", "Tokyo 42", "Dirt 4", "Dirt 3", "Farming Simulator 18", "Arms", "Valkyria Revolution", "Final Fantasy XII: The Zodiac Age", "Splatoon 2", "Splatoon", "Fable Fortune", "Pyre", "Tacoma", "Hellblade: Senua's Sacrifice", "LawBreakers", "Nidhogg 2", "Sonic Mania", "Undertale", "Uncharted: The Lost Legacy", "Absolver", "Ark: Survival Evolved", "ReCore Definitive Edition", "Windjammers", "Destiny 2", "Destiny", "Divinity: Original Sin II", "Divinity: Original Sin", "NHL 18", "NBA Live 18", "Dishonored: Death of the Outsider", "Dishonored", "NBA 2K18", "Guild Wars 2: Path of Fire", "Hob", "Total War: Warhammer II", "Cuphead", "Star Fox 2", "Star Fox", "Layton's Mystery Journey", "Oxenfree", "Megaton Rainfall", "The Mummy Demastered", "Assassin's Creed: Origins", "Super Mario Odyssey", "Hand of Fate 2", "Doom", "Batman: The Telltale Series", "L.A. Noire", "Rocket League", "Pokémon Ultra Sun and Ultra Moon", "Xenoblade Chronicles 2", "Xenoblade Chronicles", "Never Stop Sneakin'", "Romancing SaGa 2", "Oddworld: Soulstorm", "Way of the Passive Fist", "Punch Club 2: Fast Forward", "Death’s Gambit", "Warhammer Quest", "WWE Immortals", "Blackguards 2", "Ironclad Tactics", "Resident Evil HD Remaster", "Heroes of Might and Magic III: HD Edition", "Grow Home", "Evolve", "Monster Hunter 4 Ultimate", "Dead or Alive 5 Last Round", "The Sims 4", "The Book of Unwritten Tales 2", "The Book of Unwritten Tales", "The Order: 1886", "Homeworld Remastered Collection", "Homeworld", "DmC: Definitive Edition", "Ori and the Blind Forest", "Sid Meier's Starships", "Code Name: S.T.E.A.M.", "Jamestown+", "Mario Party 10", "Bloodborne", "Metal Slug 3", "Dark Souls II: Scholar of the First Sin", "Bastion", "Mortal Kombat X", "Titan Souls", "EA Sports UFC", "Monument Valley", "Invisible, Inc.", "Geometry Wars 3: Dimensions", "Heroes of the Storm", "Transistor", "Fallout Shelter", "PlanetSide 2", "Dragon Quest VI: Realms of Revelation", "Infinifactory", "Samurai Warriors Chronicles 3", "Skullgirls 2nd Encore", "The Fall", "Lost Dimension", "Brothers: A Tale of Two Sons", "Armello", "Year Walk", "80 Days", "Might & Magic Heroes VII", "Lost Horizon 2", "Rebel Galaxy", "Guitar Hero Live", "PixelJunk Shooter Ultimate", "Tales of Zestiria", "Galak-Z: The Dimensional", "Anno 2205", "Assassin's Creed Syndicate", "Helldivers", "SteamWorld Heist", "Metal Gear Solid V: The Phantom Pain", "The Witcher 3: Wild Hunt", "Journey", "Shovel Knight: Treasure Trove", "Fallout 4", "Star Wars Battlefront", "Ballblazer", "Arkanoid", "Advance Wars 2: Black Hole Rising", "Dragon Age: Inquisition", "Super Meat Boy", "F-Zero", "Wipeout", "Bully", "Alone in the Dark", "Spider-Man 2", "Space Channel 5", "Cave Story", "Ori and the Blind Forest", "Fable 2", "Star Fox 64", "Company of Heroes", "Batman: Arkham Asylum", "Marble Madness", "Nine Hours, Nine Persons, Nine Doors", "Gravity Rush", "Firewatch", "Aladdin", "Ninja Gaiden", "TimeSplitters 2", "GoldenEye 007", "Railroad Tycoon", "The Chronicles of Riddick: Escape From Butcher Bay", "Donkey Kong Jr.", "River City Ransom", "Picross 3D", "Electroplankton", "Plants vs. Zombies", "Boulder Dash", "The Witcher 2: Assassins of Kings", "Professor Layton and the Unwound Future", "Hitman Go", "Final Fantasy X", "Sonic Colors", "Wolfenstein: The New Order", "Psi-Ops: The Mindgate Conspiracy", "Jetpack Joyride", "Super Castlevania 4", "Need for Speed: Most Wanted", "WWF No Mercy", "Devil May Cry", "Indiana Jones And The Fate Of Atlantis", "Galaxian", "Space Invaders", "Bejeweled", "Snatcher", "Qix", "Power Stone 2", "Gran Turismo", "Missile Command", "Military Madness", "Metro 2033", "Fire Emblem Fates", "Sid Meier's Alpha Centauri", "Grim Fandango", "The Elder Scrolls IV: Oblivion", "Rhythm Heaven", "Drop7", "Kingdom Rush", "Power Stone", "Legacy of Kain: Soul Reaver", "Deus Ex Machina", "Thief: The Dark Project", "Star Wars Knights of the Old Republic 2: The Sith Lords", "Tiger Woods PGA Tour 12", "LittleBigPlanet", "Mirror's Edge", "Braid", "Frogger", "Wizardry: Proving Grounds of the Mad Overlord", "Silent Hill", "Jumpman Junior", "International Karate +", "Fire Emblem Awakening", "Devil's Crush", "Beatmania", "Ant Attack", "Lumines", "Metal Gear Solid 4: Guns of the Patriots", "Paper Mario: The Thousand Year Door", "Daytona USA", "FTL: Faster Than Light", "Star Wars: X-Wing", "Super Mario Land 2: Six Golden Coins", "Castle Crashers", "Joust", "Contra 3: The Alien Wars", "Fantastic Contraption", "Balance of Power", "Stunt Car Racer", "Return to Castle Wolfenstein", "Max Payne 2", "Dungeons and Dragons: Pool of Radiance", "Yakuza 0", "Threes", "Quadrilateral Cowboy", "Populous", "Hot Shots Golf", "Deus Ex", "The Legend of Zelda: Majora's Mask", "Samurai Shodown", "Marvel vs. Capcom: Clash of Super Heroes", "Lunar Lander", "Gunpoint", "Dungeon Keeper", "Descent", "Battlezone", "Ikaruga", "Breakout", "Super Smash Bros. Brawl", "Towerfall", "Chrono Cross", "Age of Empires", "Tempest", "Tempest 2000", "Day of the Tentacle", "The Legend of Zelda: A Link Between Worlds", "Thief: Deadly Shadows", "The World Ends With You", "Sonic CD", "Proteus", "God Hand", "Assassin's Creed 4: Black Flag", "Kirby's Dreamland", "Gauntlet", "Super Mario Sunshine", "Mario 64", "Max Payne", "Ico", "Wasteland", "Ultima 7: The Black Gate", "Tenchu: Stealth Assassins", "Shadow Hearts: Covenant", "Quake 3: Arena", "Phoenix Wright: Ace Attorney", "Marvel vs. Capcom 2: New Age of Heroes", "Heroes of Might and Magic 3", "Fatal Frame 2", "Sonic The Hedgehog 2", "Fez", "Demon's Souls", "Donkey Kong Country", "King's Quest", "Maniac Mansion", "Secret of Monkey Island", "Castlevania 3: Dracula's Curse", "The Jackbox Party Pack", "Castlevania", "X-COM: UFO Defense", "Monster Hunter Generations", "Flashback", "Soulcalibur", "Tomb Raider", "Jet Grind Radio", "Warcraft 2: Tides of Darkness", "Burnout Revenge", "Zero Escape: Virtue's Last Reward", "WarioWare: Twisted!", "Street Fighter Alpha 3", "Mini Metro", "Metal Gear Solid V: The Phantom Pain", "Mega Man X", "WarioWare, Inc.: Mega Microgames!", "Metal Gear Solid 3: Snake Eater", "Bushido Blade 2", "Animal Crossing", "30 Flights of Loving", "Overwatch", "Mario Kart 64", "Dragon's Dogma", "Myst", "P.T.", "City of Heroes", "StarCraft 2: Wings of Liberty", "Vagrant Story", "System Shock 2", "Superhot VR", "Streets of Rage 2", "Planescape Torment", "Monster Hunter Ultimate 4", "Giants: Citizen Kabuto", "Galaga", "Dragon Quest 8: Journey of the Cursed King", "Defender", "Castlevania: Aria of Sorrow", "Geometry Wars", "Wolfenstein 3D", "The Legend of Zelda: Link's Awakening", "No One Lives Forever", "Super Smash Bros.", "EverQuest", "The Oregon Trail", "Phantasy Star Online", "Kirby's Adventure", "Hearthstone", "Kirby: Canvas Curse", "Vampire the Masquerade - Redemption", "Rock Band", "Uncharted 2: Among Thieves", "Mike Tyson's Punch Out!!", "Diablo", "Device 6", "Hitman: Blood Money", "Super Mario Maker", "Papers, Please", "Burnout Paradise", "Elite", "Warlords", "The Sentinel", "Manic Miner", "Robotron: 2084", "Dragon Warrior", "Eve Online", "Metroid", "NetHack", "Doom 2", "Katamari Damacy", "Portal", "Portal 2", "Adventure", "Star Wars: Knights of the Old Republic", "Guild Wars 2", "Space Invaders", "Secret of Mana", "M.U.L.E.", "Habitat", "Ultima Online", "The Elder Scrolls 5: Skyrim", "Burnout 3: Takedown", "Harvest Moon", "League of Legends", "Splinter Cell: Chaos Theory", "Madden NFL 2005", "ESPN NFL 2K5", "Pong", "NHL '94", "Elite Beat Agents", "SimCity 2000", "Dance Dance Revolution", "Half-Life", "Football Manager", "Quest for Glory: So You Want to Be a Hero", "The Sims", "Halo: Combat Evolved", "Wii Sports", "The Legend of Zelda: Ocarina of Time", "Zork", "Gone Home", "Spelunky", "EarthBound", "NBA Jam", "Metal Gear Solid", "Dwarf Fortress", "Rogue", "FIFA 12", "Castlevania: Symphony of the Night", "SimCity", "StarCraft", "Final Fantasy 6", "Super Metroid", "Street Fighter 2", "Ms. Pac-Man", "Yakuza 6: The Song of Life", "Rogue Aces", "Time Carnage", "Bombslinger", "Masters of Anima", "The Bunker", "Empires Apart", "Minit", "Dead in Vineland", "Kirby Battle Royale", "Umiro", "Shadowgun Legends", "Death Coming", "The Bonfire: Forsaken Lands", "The Sims Mobile", "Read Only Memories: Type-M", "Alto's Odyssey", "Evoland 2", "The Room: Old Sins", "Hero Academy 2", "Slime Pizza", "World of Warships Blitz", "Thumper: Pocket Edition", "Dissembler", "Vandals", "Fat Dragons", "Machine Knight", "Impact Winter", "World of Tanks: War Stories", "Tempest 4000", "Revenant Kingdom", "Titan Quest", "The Council - Episode 1: The Mad Ones", "Way of the Passive Fist", "Life is Strange: Before the Storm - Farewell", "Pirates: All Aboard!", "Eternal Edge", "Shelter Generations", "Spartan", "Outlast 2", "Tesla vs Lovecraft", "Scribblenauts Showdown", "Subsurface Circular", "To Leave", "Dead Secret", "Runbow", "Gal*Gun 2", "Death Road to Canada", "Runestone Keeper", "Fast Food Rampage", "Unalive", "Devious Dungeon", "WarioWare: Gold", "39 Days to Mars", "Endless Crusade", "Disco Elsyium", "Heat Signature", "PlayerUnknown's Battlegrounds", "Lode Runner Legacy", "Getting Over It with Bennett Foddy", "Polybius", "The Vanishing of Ethan Carter", "Fire Pro Wrestling World", "The Unfinished Swan", "Battle Chef Brigade", "Opus Magnum", "Butterfly Soup", "2064: Read Only Memories", "Golf Story", "The Evil Within 2", "The Evil Within", "Danganronpa V3: Killing Harmony", "Yakuza Kiwami", "Mighty Gunvolt Burst", "Horizon Zero Dawn", "Dream Daddy: A Dad Dating Simulator", "Blaster Master Zero", "Shovel Knight: Specter of Torment", "Fire Emblem Warriors", "Ys VIII: Lacrimosa of Dana", "Tetris Effect", "Cyberpunk 2077", "Metro Exodus", "Spider-Man", "Sekiro: Shadows Die Twice", "Rage 2", "Kingdom Hearts 3", "Resident Evil 2", "Ghost of Tsushima", "Anthem", "Neo Cab", "Assassin’s Creed Odyssey", "Forza Horizon 4", "Mario Tennis Aces", "Quarantine Circular", "Subsurface Circular", "Super Mega Baseball", "Super Mega Baseball 2", "Pool Panic", "Code of Princess EX", "WarioWare Gold", "Overcooked 2", "Strange Brigade", "Dragon Quest XI: Echoes of an Elusive Age", "NBA Live 19", "Immortal: Unchained", "NBA 2K19", "Shadow of the Tomb Raider", "Xenoblade Chronicles 2: Torna The Golden Country", "Dark Souls Remastered", "Dead Cells", "Earthfall", "20XX", "Warhammer 40,000: Inquisitor", "Psychedelica of the Ashen Hawk", "Inside", "New Gundam Breaker", "The Awesome Adventures of Captain Spirit", "Lumines Remastered", "Yakuza Kiwami 2", "Destiny 2: Forsaken", "Unravel 2", "Unravel", "Prey: Mooncrash", "Wreckfest", "Dragon Ball Legends", "Hollow Knight", "Jurrasic WWorld Evolution", "Halo Infinite", "Might & Magic: Elemental Guardians", "BlazBlue: CrossTag Battle", "Yoku's Island Express", "Pokémon Quest", "Mega Man Legacy", "Generation Zero", "Mario + Rabbids Donkey Kong Adventure", "Starlink: Battle For Atlas", "The King’s Bird", "Bad North", "Echochrome", "Moonligher", "Shape of the World", "Rainbow Skies", "Rainbow Moon", "No Heroes Here"];

var populateState = function populateState(_ref) {
  var array = _ref.array,
      state = _ref.state;

  array.forEach(function (input) {
    var a = fns.arrayMaker({ input: input });
    fns.addToState({ array: a, state: state });
  });
};

var create = function create(_ref2) {
  var state = _ref2.state;
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { amount: 2 };
    var amount = options.amount,
        seed = options.seed;

    return fns.createChain({ state: state, amount: amount, seed: seed });
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

var deutung = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	factory();
}(commonjsGlobal, (function () { var commonjsGlobal$$1 = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

function commonjsRequire$$1 () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var alea = createCommonjsModule$$1(function (module) {
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
  commonjsGlobal$$1,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var xor128 = createCommonjsModule$$1(function (module) {
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
  commonjsGlobal$$1,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var xorwow = createCommonjsModule$$1(function (module) {
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
  commonjsGlobal$$1,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var xorshift7 = createCommonjsModule$$1(function (module) {
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
  commonjsGlobal$$1,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var xor4096 = createCommonjsModule$$1(function (module) {
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
  commonjsGlobal$$1,                                     // window object or global
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var tychei = createCommonjsModule$$1(function (module) {
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
  commonjsGlobal$$1,
  ('object') == 'object' && module,    // present in node.js
  (typeof undefined) == 'function' && undefined   // present with an AMD loader
);
});

var empty = {};


var empty$1 = Object.freeze({
	default: empty
});

var require$$0 = ( empty$1 && empty ) || empty$1;

var seedrandom = createCommonjsModule$$1(function (module) {
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

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.


// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.


// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.


// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.


// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.


// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.


// The original ARC4-based prng included in this library.
// Period: ~2^1600


seedrandom.alea = alea;
seedrandom.xor128 = xor128;
seedrandom.xorwow = xorwow;
seedrandom.xorshift7 = xorshift7;
seedrandom.xor4096 = xor4096;
seedrandom.tychei = tychei;

var seedrandom$2 = seedrandom;

var pluralize = createCommonjsModule$$1(function (module, exports) {
/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof commonjsRequire$$1 === 'function' && 'object' === 'object' && 'object' === 'object') {
    // Node.
    module.exports = pluralize();
  } else if (typeof undefined === 'function' && undefined.amd) {
    // AMD, registers as an anonymous module.
    undefined(function () {
      return pluralize();
    });
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(commonjsGlobal$$1, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word
   * @param  {number}  count
   * @param  {boolean} inclusive
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'manga',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transporation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});
});

var Articles = createCommonjsModule$$1(function (module) {
// Generated by CoffeeScript 1.10.0
(function() {
  var a, articlize, arts, find, n,
    slice = [].slice;

  a = 'a';

  n = 'an';

  arts = {
    0: {
      8: {
        _: n
      },
      9: {
        _: n
      },
      "-": {
        1: {
          1: {
            _: n
          }
        },
        4: {
          " ": {
            _: a
          },
          _: n
        },
        6: {
          "-": {
            _: n
          }
        },
        8: {
          _: n
        }
      }
    },
    1: {
      1: {
        0: {
          _: a
        },
        1: {
          _: a
        },
        2: {
          _: a
        },
        3: {
          _: a
        },
        4: {
          _: a
        },
        5: {
          _: a
        },
        6: {
          _: a
        },
        7: {
          _: a
        },
        8: {
          _: a
        },
        9: {
          _: a
        },
        _: n,
        ".": {
          4: {
            _: a
          }
        }
      },
      8: {
        0: {
          0: {
            _: n
          },
          1: {
            _: n
          },
          2: {
            _: n
          },
          3: {
            _: n
          },
          4: {
            _: n
          },
          5: {
            _: n
          },
          6: {
            _: n
          },
          7: {
            _: n
          },
          8: {
            _: n
          },
          9: {
            _: n
          },
          _: a
        },
        1: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        2: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        3: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        4: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        5: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        6: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        7: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        8: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        9: {
          "-": {
            _: a
          },
          " ": {
            _: a
          }
        },
        _: n
      }
    },
    8: {
      0: {
        0: {
          x: {
            _: a
          }
        }
      },
      9: {
        0: {
          _: a
        }
      },
      _: n,
      ",": {
        1: {
          _: a
        }
      }
    },
    "`": {
      a: {
        _: n
      }
    },
    "£": {
      8: {
        _: n
      }
    },
    "∞": {
      _: n
    },
    a: {
      " ": {
        _: a
      },
      b: {
        o: {
          u: {
            t: {
              "-": {
                _: n
              }
            },
            _: a
          }
        }
      },
      g: {
        a: {
          i: {
            _: a
          }
        }
      },
      l: {
        "-": {
          I: {
            _: a
          }
        },
        g: {
          u: {
            _: a
          }
        },
        t: {
          h: {
            _: a
          }
        }
      },
      m: {
        o: {
          n: {
            _: a
          }
        }
      },
      n: {
        " ": {
          _: a
        },
        d: {
          a: {
            _: n
          },
          e: {
            _: n
          },
          r: {
            _: n
          },
          _: a
        },
        o: {
          t: {
            _: a
          }
        },
        y: {
          w: {
            _: a
          }
        }
      },
      p: {
        r: {
          e: {
            _: a
          }
        }
      },
      r: {
        e: {
          " ": {
            _: a
          },
          ":": {
            _: a
          }
        },
        t: {
          "í": {
            _: a
          }
        }
      },
      _: n
    },
    A: {
      $: {
        _: a
      },
      A: {
        A: {
          _: a
        }
      },
      n: {
        d: {
          a: {
            l: {
              u: {
                c: {
                  _: a
                }
              }
            }
          }
        }
      },
      r: {
        m: {
          a: {
            t: {
              _: a
            }
          }
        }
      },
      s: {
        t: {
          u: {
            r: {
              i: {
                a: {
                  s: {
                    _: a
                  }
                }
              }
            }
          }
        }
      },
      t: {
        h: {
          l: {
            e: {
              t: {
                i: {
                  _: n
                }
              }
            },
            o: {
              _: n
            },
            _: a
          }
        }
      },
      U: {
        $: {
          _: a
        },
        D: {
          _: a
        },
        S: {
          C: {
            _: a
          }
        }
      },
      _: n
    },
    "Á": {
      _: n
    },
    "á": {
      ";": {
        _: n
      }
    },
    "à": {
      _: n
    },
    "Ä": {
      _: n
    },
    "ā": {
      _: n
    },
    "Å": {
      _: n
    },
    "æ": {
      _: n
    },
    "Æ": {
      n: {
        _: a
      },
      _: n
    },
    D: {
      "ú": {
        n: {
          _: a
        }
      }
    },
    e: {
      ".": {
        g: {
          _: a
        }
      },
      a: {
        c: {
          h: {
            " ": {
              _: a
            }
          }
        }
      },
      i: {
        t: {
          h: {
            e: {
              r: {
                " ": {
                  _: a
                },
                ".": {
                  _: a
                }
              }
            }
          }
        }
      },
      l: {
        "-": {
          _: a
        },
        l: {
          a: {
            _: a
          }
        }
      },
      m: {
        p: {
          e: {
            z: {
              _: a
            }
          }
        }
      },
      n: {
        o: {
          u: {
            g: {
              _: a
            }
          }
        }
      },
      u: {
        p: {
          " ": {
            _: n
          }
        },
        _: a
      },
      w: {
        _: a
      },
      x: {
        i: {
          s: {
            t: {
              s: {
                _: a
              }
            }
          }
        }
      },
      _: n
    },
    E: {
      m: {
        p: {
          e: {
            z: {
              _: a
            }
          }
        }
      },
      n: {
        a: {
          m: {
            _: a
          }
        }
      },
      s: {
        p: {
          a: {
            d: {
              _: n
            }
          },
          e: {
            _: n
          },
          o: {
            _: n
          },
          _: a
        }
      },
      u: {
        l: {
          _: n
        },
        _: a
      },
      U: {
        R: {
          _: a
        }
      },
      _: n
    },
    "é": {
      g: {
        _: a
      },
      t: {
        a: {
          _: n
        },
        u: {
          _: n
        },
        _: a
      },
      _: n
    },
    "É": {
      _: n
    },
    f: {
      "-": {
        _: n
      },
      " ": {
        _: n
      },
      "/": {
        _: n
      },
      M: {
        _: n
      },
      p: {
        _: n
      },
      t: {
        _: n
      }
    },
    F: {
      0: {
        _: n
      },
      1: {
        _: n
      },
      2: {
        _: n
      },
      3: {
        _: n
      },
      4: {
        _: n
      },
      5: {
        _: n
      },
      6: {
        _: n
      },
      9: {
        _: n
      },
      "'": {
        _: n
      },
      "-": {
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "#": {
        _: n
      },
      ",": {
        _: n
      },
      ".": {
        _: n
      },
      "/": {
        _: n
      },
      "”": {
        _: n
      },
      A: {
        C: {
          _: a
        },
        D: {
          _: a
        },
        I: {
          R: {
            _: a
          }
        },
        L: {
          _: a
        },
        M: {
          _: a
        },
        N: {
          _: a
        },
        P: {
          _: a
        },
        Q: {
          _: a
        },
        R: {
          _: a
        },
        S: {
          _: a
        },
        T: {
          _: a
        },
        _: n
      },
      B: {
        _: n
      },
      C: {
        _: n
      },
      c: {
        _: n
      },
      D: {
        _: n
      },
      E: {
        C: {
          _: n
        },
        I: {
          _: n
        }
      },
      F: {
        " ": {
          _: a
        },
        _: n
      },
      f: {
        _: n
      },
      h: {
        _: n
      },
      H: {
        _: n
      },
      I: {
        A: {
          T: {
            _: a
          },
          _: n
        },
        D: {
          " ": {
            _: n
          }
        },
        R: {
          " ": {
            _: n
          }
        },
        S: {
          " ": {
            _: n
          }
        }
      },
      K: {
        _: n
      },
      L: {
        C: {
          _: n
        },
        N: {
          _: n
        },
        P: {
          _: n
        }
      },
      M: {
        R: {
          _: a
        },
        _: n
      },
      O: {
        " ": {
          _: n
        },
        I: {
          " ": {
            _: n
          }
        }
      },
      P: {
        ".": {
          _: a
        },
        "?": {
          _: a
        },
        C: {
          "?": {
            _: a
          }
        },
        _: n
      },
      R: {
        C: {
          _: n
        },
        S: {
          _: n
        }
      },
      S: {
        _: n
      },
      T: {
        S: {
          _: a
        },
        T: {
          _: a
        },
        _: n
      },
      U: {
        " ": {
          _: n
        },
        ",": {
          _: n
        },
        ".": {
          _: n
        }
      },
      V: {
        _: n
      },
      W: {
        D: {
          _: a
        },
        _: n
      },
      X: {
        _: n
      },
      Y: {
        _: n
      },
      "σ": {
        _: n
      }
    },
    G: {
      h: {
        a: {
          e: {
            _: n
          },
          i: {
            _: n
          }
        }
      }
    },
    h: {
      "'": {
        _: n
      },
      "-": {
        U: {
          _: a
        },
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      ",": {
        _: n
      },
      C: {
        _: n
      },
      e: {
        i: {
          r: {
            a: {
              _: a
            },
            _: n
          }
        }
      },
      i: {
        m: {
          s: {
            _: n
          }
        },
        s: {
          t: {
            o: {
              r: {
                i: {
                  c: {
                    _: a
                  }
                }
              }
            }
          }
        }
      },
      o: {
        m: {
          a: {
            _: n
          },
          m: {
            _: n
          }
        },
        n: {
          e: {
            y: {
              _: a
            }
          },
          k: {
            _: a
          },
          v: {
            _: a
          },
          _: n
        },
        r: {
          s: {
            " ": {
              _: n
            }
          }
        },
        u: {
          r: {
            _: n
          }
        }
      },
      t: {
        t: {
          p: {
            " ": {
              _: n
            }
          },
          _: a
        },
        _: n
      }
    },
    H: {
      1: {
        _: n
      },
      2: {
        _: n
      },
      3: {
        _: n
      },
      4: {
        _: n
      },
      5: {
        _: n
      },
      "'": {
        _: n
      },
      "-": {
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "&": {
        _: n
      },
      ",": {
        _: n
      },
      ".": {
        A: {
          _: a
        },
        _: n
      },
      "+": {
        _: n
      },
      a: {
        b: {
          i: {
            l: {
              i: {
                t: {
                  a: {
                    t: {
                      i: {
                        o: {
                          n: {
                            s: {
                              _: n
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      B: {
        _: n
      },
      C: {
        _: n
      },
      D: {
        B: {
          _: a
        },
        _: n
      },
      e: {
        i: {
          r: {
            _: n
          }
        }
      },
      F: {
        _: n
      },
      G: {
        _: n
      },
      H: {
        _: n
      },
      I: {
        D: {
          _: a
        },
        G: {
          _: a
        },
        M: {
          _: a
        },
        P: {
          _: a
        },
        _: n
      },
      L: {
        A: {
          "-": {
            D: {
              _: a
            }
          }
        },
        _: n
      },
      M: {
        _: n
      },
      N: {
        _: n
      },
      o: {
        n: {
          d: {
            _: a
          },
          e: {
            s: {
              _: n
            },
            _: a
          },
          g: {
            _: a
          },
          k: {
            _: a
          },
          o: {
            l: {
              _: a
            }
          },
          _: n
        },
        u: {
          r: {
            _: n
          }
        }
      },
      O: {
        " ": {
          _: n
        },
        V: {
          _: n
        }
      },
      P: {
        _: n
      },
      Q: {
        _: n
      },
      R: {
        T: {
          _: a
        },
        _: n
      },
      S: {
        " ": {
          _: a
        },
        R: {
          _: a
        },
        T: {
          _: a
        },
        _: n
      },
      T: {
        P: {
          _: a
        },
        _: n
      },
      V: {
        _: n
      },
      W: {
        T: {
          _: n
        }
      }
    },
    i: {
      ".": {
        e: {
          _: a
        }
      },
      b: {
        n: {
          _: a
        }
      },
      f: {
        " ": {
          _: a
        }
      },
      i: {
        _: a
      },
      n: {
        c: {
          l: {
            u: {
              d: {
                i: {
                  _: a
                }
              }
            }
          }
        },
        d: {
          i: {
            c: {
              a: {
                t: {
                  e: {
                    s: {
                      _: a
                    }
                  }
                }
              }
            }
          }
        },
        s: {
          t: {
            e: {
              a: {
                d: {
                  "?": {
                    _: n
                  }
                },
                _: a
              }
            }
          }
        }
      },
      s: {
        " ": {
          _: a
        },
        ".": {
          _: a
        }
      },
      t: {
        " ": {
          _: a
        }
      },
      u: {
        _: a
      },
      _: n
    },
    I: {
      "-": {
        A: {
          _: a
        },
        I: {
          _: a
        }
      },
      I: {
        I: {
          _: a
        }
      },
      l: {
        b: {
          _: a
        }
      },
      M: {
        H: {
          _: a
        }
      },
      m: {
        a: {
          m: {
            s: {
              _: a
            }
          }
        }
      },
      R: {
        "£": {
          _: a
        }
      },
      s: {
        l: {
          a: {
            m: {
              " ": {
                _: a
              },
              ",": {
                _: a
              },
              ".": {
                _: a
              }
            },
            n: {
              d: {
                s: {
                  _: a
                }
              }
            }
          }
        }
      },
      _: n
    },
    "İ": {
      _: n
    },
    J: {
      i: {
        a: {
          n: {
            _: a
          },
          _: n
        }
      }
    },
    k: {
      u: {
        " ": {
          _: n
        }
      }
    },
    l: {
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      p: {
        _: n
      }
    },
    L: {
      1: {
        _: n
      },
      2: {
        _: n
      },
      3: {
        _: n
      },
      5: {
        _: n
      },
      "'": {
        A: {
          _: a
        },
        _: n
      },
      "-": {
        a: {
          _: a
        },
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "&": {
        _: n
      },
      ",": {
        _: n
      },
      ".": {
        _: n
      },
      "/": {
        _: n
      },
      a: {
        e: {
          _: n
        },
        o: {
          i: {
            g: {
              _: n
            }
          }
        }
      },
      A: {
        " ": {
          _: n
        },
        L: {
          _: n
        },
        P: {
          _: n
        }
      },
      B: {
        _: n
      },
      C: {
        _: n
      },
      D: {
        _: n
      },
      E: {
        A: {
          _: a
        },
        E: {
          _: a
        },
        G: {
          _: a
        },
        O: {
          _: a
        },
        P: {
          _: a
        },
        T: {
          _: a
        },
        _: n
      },
      F: {
        _: n
      },
      G: {
        _: n
      },
      H: {
        _: n
      },
      I: {
        R: {
          _: n
        }
      },
      L: {
        _: n
      },
      M: {
        X: {
          _: a
        },
        _: n
      },
      N: {
        _: n
      },
      o: {
        c: {
          h: {
            a: {
              _: n
            }
          }
        }
      },
      O: {
        E: {
          _: n
        }
      },
      P: {
        _: n
      },
      R: {
        _: n
      },
      S: {
        _: n
      },
      T: {
        _: n
      },
      U: {
        " ": {
          _: n
        }
      },
      V: {
        _: n
      },
      X: {
        _: n
      },
      Z: {
        _: n
      }
    },
    m: {
      "-": {
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "&": {
        _: n
      },
      a: {
        k: {
          e: {
            s: {
              " ": {
                _: n
              }
            }
          }
        }
      },
      b: {
        _: n
      },
      e: {
        i: {
          n: {
            _: n
          }
        },
        n: {
          t: {
            i: {
              o: {
                n: {
                  s: {
                    _: n
                  }
                }
              }
            }
          }
        }
      },
      f: {
        _: n
      },
      p: {
        _: n
      },
      R: {
        _: n
      },
      t: {
        _: n
      }
    },
    M: {
      1: {
        9: {
          0: {
            _: n
          },
          _: a
        },
        _: n
      },
      2: {
        _: n
      },
      3: {
        _: n
      },
      4: {
        _: n
      },
      5: {
        _: n
      },
      6: {
        _: n
      },
      7: {
        _: n
      },
      8: {
        _: n
      },
      9: {
        _: n
      },
      "'": {
        _: n
      },
      "-": {
        t: {
          _: a
        },
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "&": {
        _: n
      },
      ",": {
        _: n
      },
      ".": {
        A: {
          ".": {
            S: {
              _: a
            }
          }
        },
        _: n
      },
      "/": {
        _: n
      },
      A: {
        C: {
          _: a
        },
        D: {
          _: a
        },
        F: {
          _: a
        },
        G: {
          _: a
        },
        J: {
          _: a
        },
        L: {
          _: a
        },
        M: {
          _: a
        },
        N: {
          _: a
        },
        P: {
          _: a
        },
        R: {
          _: a
        },
        S: {
          _: a
        },
        T: {
          _: a
        },
        X: {
          _: a
        },
        Y: {
          _: a
        },
        _: n
      },
      B: {
        _: n
      },
      C: {
        _: n
      },
      D: {
        _: n
      },
      e: {
        "-": {
          _: n
        }
      },
      E: {
        d: {
          _: n
        },
        n: {
          _: n
        },
        P: {
          _: n
        }
      },
      F: {
        _: n
      },
      f: {
        _: n
      },
      G: {
        _: n
      },
      H: {
        _: n
      },
      h: {
        _: n
      },
      i: {
        e: {
          _: n
        }
      },
      I: {
        5: {
          _: n
        },
        6: {
          _: n
        },
        " ": {
          _: n
        },
        A: {
          _: n
        },
        T: {
          _: n
        }
      },
      K: {
        _: n
      },
      L: {
        _: n
      },
      M: {
        T: {
          _: a
        },
        _: n
      },
      N: {
        _: n
      },
      o: {
        U: {
          _: n
        }
      },
      O: {
        " ": {
          _: n
        },
        T: {
          " ": {
            _: n
          }
        },
        U: {
          _: n
        }
      },
      P: {
        _: n
      },
      R: {
        _: n
      },
      S: {
        _: n
      },
      s: {
        c: {
          _: n
        }
      },
      T: {
        R: {
          _: a
        },
        _: n
      },
      U: {
        V: {
          _: n
        }
      },
      V: {
        _: n
      },
      X: {
        _: n
      }
    },
    N: {
      4: {
        _: n
      },
      6: {
        _: n
      },
      "'": {
        _: n
      },
      "-": {
        a: {
          _: a
        },
        S: {
          _: a
        },
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      ",": {
        _: n
      },
      ".": {
        Y: {
          _: a
        },
        _: n
      },
      "=": {
        _: n
      },
      "²": {
        _: n
      },
      a: {
        o: {
          _: n
        }
      },
      A: {
        " ": {
          _: n
        },
        A: {
          F: {
            _: a
          },
          _: n
        },
        I: {
          _: n
        },
        S: {
          L: {
            _: n
          }
        }
      },
      B: {
        _: n
      },
      C: {
        _: n
      },
      D: {
        _: n
      },
      E: {
        A: {
          _: n
        },
        H: {
          _: n
        },
        S: {
          " ": {
            _: n
          }
        }
      },
      F: {
        _: n
      },
      G: {
        _: n
      },
      H: {
        _: n
      },
      I: {
        C: {
          _: a
        },
        L: {
          _: a
        },
        M: {
          H: {
            _: n
          },
          _: a
        },
        N: {
          _: a
        },
        S: {
          _: a
        },
        _: n
      },
      J: {
        C: {
          _: n
        }
      },
      K: {
        _: n
      },
      L: {
        S: {
          _: a
        },
        _: n
      },
      M: {
        _: n
      },
      N: {
        R: {
          _: n
        },
        T: {
          _: n
        }
      },
      P: {
        O: {
          V: {
            "-": {
              _: n
            }
          },
          _: a
        },
        _: n
      },
      R: {
        J: {
          _: a
        },
        T: {
          _: a
        },
        _: n
      },
      S: {
        W: {
          _: a
        },
        _: n
      },
      T: {
        $: {
          _: a
        },
        _: n
      },
      U: {
        S: {
          _: n
        }
      },
      V: {
        _: n
      },
      v: {
        _: n
      },
      W: {
        A: {
          _: n
        }
      },
      X: {
        _: n
      },
      Y: {
        P: {
          _: n
        },
        U: {
          _: n
        }
      }
    },
    n: {
      "-": {
        _: n
      },
      "−": {
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "&": {
        _: n
      },
      ",": {
        _: n
      },
      "+": {
        _: n
      },
      "×": {
        _: n
      },
      d: {
        a: {
          _: n
        }
      },
      p: {
        a: {
          _: n
        }
      },
      t: {
        _: n
      },
      V: {
        _: n
      },
      W: {
        _: n
      }
    },
    o: {
      b: {
        r: {
          _: a
        }
      },
      c: {
        c: {
          u: {
            r: {
              s: {
                _: a
              }
            }
          }
        },
        h: {
          o: {
            _: a
          }
        }
      },
      f: {
        " ": {
          _: a
        }
      },
      n: {
        "-": {
          _: n
        },
        "/": {
          _: n
        },
        b: {
          _: n
        },
        c: {
          o: {
            _: n
          }
        },
        d: {
          _: n
        },
        e: {
          r: {
            _: n
          }
        },
        g: {
          _: n
        },
        i: {
          _: n
        },
        l: {
          _: n
        },
        m: {
          _: n
        },
        o: {
          _: n
        },
        r: {
          _: n
        },
        s: {
          _: n
        },
        t: {
          _: n
        },
        u: {
          _: n
        },
        w: {
          _: n
        },
        y: {
          _: n
        },
        _: a
      },
      r: {
        " ": {
          _: a
        },
        ",": {
          _: a
        }
      },
      u: {
        i: {
          _: a
        }
      },
      _: n
    },
    O: {
      b: {
        e: {
          r: {
            s: {
              t: {
                " ": {
                  _: n
                },
                l: {
                  _: n
                }
              },
              _: a
            }
          }
        }
      },
      l: {
        v: {
          _: a
        }
      },
      n: {
        e: {
          i: {
            _: n
          },
          _: a
        }
      },
      N: {
        E: {
          _: a
        }
      },
      o: {
        p: {
          _: a
        }
      },
      u: {
        i: {
          _: a
        }
      },
      _: n
    },
    "Ó": {
      _: n
    },
    "Ö": {
      _: n
    },
    "ö": {
      _: n
    },
    "Ō": {
      _: n
    },
    "ō": {
      _: n
    },
    P: {
      h: {
        o: {
          b: {
            _: n
          },
          i: {
            _: n
          }
        }
      }
    },
    r: {
      "'": {
        _: n
      },
      "-": {
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "&": {
        _: n
      },
      ".": {
        _: n
      },
      e: {
        f: {
          e: {
            r: {
              s: {
                _: n
              }
            }
          }
        }
      },
      f: {
        _: n
      },
      m: {
        _: n
      },
      s: {
        _: n
      }
    },
    R: {
      1: {
        0: {
          _: a
        },
        _: n
      },
      2: {
        _: n
      },
      3: {
        _: n
      },
      4: {
        _: n
      },
      5: {
        _: n
      },
      6: {
        _: n
      },
      "'": {
        _: n
      },
      "-": {
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "&": {
        _: n
      },
      ",": {
        _: n
      },
      ".": {
        C: {
          _: a
        },
        _: n
      },
      "/": {
        _: n
      },
      A: {
        " ": {
          _: n
        },
        F: {
          _: n
        }
      },
      B: {
        _: n
      },
      C: {
        _: n
      },
      D: {
        _: n
      },
      E: {
        " ": {
          _: n
        },
        R: {
          _: n
        }
      },
      F: {
        _: n
      },
      f: {
        _: n
      },
      G: {
        _: n
      },
      H: {
        S: {
          _: n
        }
      },
      I: {
        A: {
          _: n
        },
        C: {
          " ": {
            _: n
          }
        }
      },
      J: {
        _: n
      },
      K: {
        _: n
      },
      L: {
        " ": {
          _: a
        },
        _: n
      },
      M: {
        1: {
          _: a
        },
        _: n
      },
      N: {
        G: {
          _: a
        },
        _: n
      },
      O: {
        T: {
          _: n
        }
      },
      P: {
        _: n
      },
      Q: {
        _: n
      },
      R: {
        _: n
      },
      S: {
        " ": {
          _: a
        },
        ")": {
          _: a
        },
        ",": {
          _: a
        },
        ".": {
          _: a
        },
        "?": {
          _: a
        },
        T: {
          _: a
        },
        _: n
      },
      T: {
        _: n
      },
      U: {
        _: n
      },
      V: {
        _: n
      },
      X: {
        _: n
      }
    },
    s: {
      "-": {
        _: n
      },
      "\"": {
        _: n
      },
      ")": {
        _: n
      },
      ",": {
        _: n
      },
      ".": {
        _: n
      },
      a: {
        y: {
          s: {
            _: n
          }
        }
      },
      i: {
        c: {
          h: {
            _: n
          }
        }
      },
      p: {
        3: {
          _: n
        },
        r: {
          o: {
            t: {
              _: n
            }
          }
        }
      },
      s: {
        h: {
          _: n
        }
      },
      t: {
        a: {
          t: {
            e: {
              s: {
                " ": {
                  _: n
                },
                ":": {
                  _: n
                }
              }
            }
          }
        }
      },
      v: {
        a: {
          _: a
        },
        e: {
          _: a
        },
        _: n
      }
    },
    S: {
      1: {
        _: n
      },
      2: {
        _: n
      },
      3: {
        _: n
      },
      4: {
        _: n
      },
      5: {
        _: n
      },
      6: {
        _: n
      },
      "'": {
        _: n
      },
      "-": {
        _: n
      },
      " ": {
        _: n
      },
      "\"": {
        _: n
      },
      "&": {
        W: {
          _: a
        },
        _: n
      },
      ",": {
        _: n
      },
      ".": {
        B: {
          _: n
        },
        M: {
          _: n
        },
        O: {
          _: n
        }
      },
      "”": {
        _: n
      },
      A: {
        "-": {
          1: {
            _: a
          },
          _: n
        },
        " ": {
          _: n
        },
        C: {
          D: {
            _: n
          }
        },
        E: {
          _: n
        },
        S: {
          E: {
            _: a
          },
          _: n
        },
        T: {
          " ": {
            _: n
          },
          B: {
            _: n
          }
        }
      },
      B: {
        _: n
      },
      C: {
        A: {
          " ": {
            _: n
          }
        },
        C: {
          _: n
        },
        M: {
          _: n
        },
        O: {
          " ": {
            _: n
          }
        },
        R: {
          A: {
            _: a
          },
          _: n
        },
        T: {
          _: n
        }
      },
      D: {
        _: n
      },
      E: {
        " ": {
          _: n
        },
        C: {
          O: {
            _: a
          },
          R: {
            _: a
          },
          _: n
        },
        I: {
          _: n
        },
        O: {
          _: n
        }
      },
      F: {
        _: n
      },
      G: {
        _: n
      },
      H: {
        2: {
          _: n
        },
        3: {
          _: n
        },
        "-": {
          _: n
        }
      },
      I: {
        " ": {
          _: n
        }
      },
      J: {
        _: n
      },
      K: {
        _: n
      },
      L: {
        A: {
          _: a
        },
        I: {
          _: a
        },
        O: {
          _: a
        },
        _: n
      },
      M: {
        A: {
          _: a
        },
        E: {
          " ": {
            _: n
          },
          _: a
        },
        I: {
          _: a
        },
        _: n
      },
      N: {
        A: {
          _: a
        },
        E: {
          _: a
        },
        O: {
          _: a
        },
        _: n
      },
      O: {
        "(": {
          _: n
        },
        A: {
          " ": {
            _: n
          },
          I: {
            _: n
          }
        },
        E: {
          _: n
        },
        I: {
          _: n
        },
        S: {
          _: n
        },
        V: {
          _: n
        }
      },
      P: {
        A: {
          C: {
            _: a
          },
          D: {
            _: a
          },
          M: {
            _: a
          },
          N: {
            _: a
          },
          R: {
            _: a
          }
        },
        E: {
          " ": {
            _: n
          },
          _: a
        },
        I: {
          C: {
            _: a
          }
        },
        O: {
          _: a
        },
        U: {
          _: a
        },
        _: n
      },
      R: {
        _: n
      },
      S: {
        _: n
      },
      T: {
        "-": {
          _: n
        },
        A: {
          " ": {
            _: n
          }
        },
        B: {
          _: n
        },
        C: {
          _: n
        },
        D: {
          _: n
        },
        F: {
          _: n
        },
        L: {
          _: n
        },
        M: {
          _: n
        },
        S: {
          _: n
        },
        V: {
          _: n
        }
      },
      u: {
        r: {
          a: {
            " ": {
              _: n
            }
          }
        }
      },
      U: {
        B: {
          _: a
        },
        L: {
          _: a
        },
        N: {
          _: a
        },
        P: {
          _: a
        },
        S: {
          _: a
        },
        _: n
      },
      V: {
        _: n
      },
      W: {
        F: {
          _: n
        },
        P: {
          _: n
        },
        R: {
          _: n
        }
      },
      X: {
        S: {
          _: a
        },
        _: n
      }
    },
    t: {
      "-": {
        S: {
          _: n
        }
      },
      S: {
        _: n
      }
    },
    T: {
      a: {
        v: {
          e: {
            s: {
              _: n
            }
          }
        }
      },
      "à": {
        _: n
      }
    },
    u: {
      "-": {
        _: a
      },
      " ": {
        _: a
      },
      "\"": {
        _: a
      },
      ".": {
        _: a
      },
      b: {
        e: {
          _: n
        },
        _: a
      },
      f: {
        _: a
      },
      k: {
        a: {
          _: n
        },
        _: a
      },
      l: {
        u: {
          _: a
        }
      },
      m: {
        " ": {
          _: a
        }
      },
      n: {
        " ": {
          _: a
        },
        a: {
          " ": {
            _: a
          },
          n: {
            a: {
              _: n
            },
            n: {
              _: n
            },
            s: {
              _: n
            },
            t: {
              _: n
            },
            _: a
          },
          r: {
            y: {
              _: a
            }
          }
        },
        e: {
          " ": {
            _: a
          }
        },
        i: {
          c: {
            o: {
              r: {
                p: {
                  _: n
                }
              }
            }
          },
          d: {
            i: {
              _: a
            },
            _: n
          },
          m: {
            o: {
              _: a
            },
            _: n
          },
          n: {
            _: n
          },
          v: {
            o: {
              _: n
            }
          },
          _: a
        },
        l: {
          e: {
            s: {
              _: a
            }
          }
        }
      },
      p: {
        o: {
          _: a
        }
      },
      r: {
        a: {
          _: a
        },
        e: {
          _: a
        },
        i: {
          _: a
        },
        l: {
          _: a
        },
        o: {
          _: a
        }
      },
      s: {
        "-": {
          _: n
        },
        " ": {
          _: n
        },
        h: {
          _: n
        },
        _: a
      },
      t: {
        m: {
          _: n
        },
        t: {
          _: n
        },
        _: a
      },
      v: {
        _: a
      },
      w: {
        _: a
      },
      _: n
    },
    U: {
      1: {
        _: n
      },
      "-": {
        B: {
          o: {
            _: a
          },
          _: n
        }
      },
      a: {
        _: n
      },
      b: {
        i: {
          _: a
        },
        _: n
      },
      D: {
        P: {
          "-": {
            _: n
          }
        }
      },
      d: {
        _: n
      },
      g: {
        l: {
          _: n
        }
      },
      h: {
        _: n
      },
      i: {
        _: n
      },
      l: {
        i: {
          _: a
        },
        _: n
      },
      m: {
        _: n
      },
      M: {
        N: {
          _: n
        }
      },
      n: {
        "-": {
          _: n
        },
        a: {
          n: {
            _: a
          },
          _: n
        },
        b: {
          _: n
        },
        c: {
          _: n
        },
        d: {
          _: n
        },
        e: {
          s: {
            _: a
          },
          _: n
        },
        f: {
          _: n
        },
        g: {
          _: n
        },
        h: {
          _: n
        },
        i: {
          d: {
            _: n
          },
          n: {
            _: n
          }
        },
        k: {
          _: n
        },
        l: {
          _: n
        },
        m: {
          _: n
        },
        n: {
          _: n
        },
        o: {
          _: n
        },
        p: {
          _: n
        },
        r: {
          _: n
        },
        s: {
          _: n
        },
        t: {
          e: {
            r: {
              s: {
                _: a
              }
            }
          },
          _: n
        },
        u: {
          _: n
        },
        w: {
          _: n
        }
      },
      p: {
        _: n
      },
      r: {
        a: {
          _: a
        },
        i: {
          _: a
        },
        u: {
          g: {
            u: {
              a: {
                y: {
                  a: {
                    n: {
                      "-": {
                        _: n
                      }
                    }
                  }
                }
              }
            }
          },
          k: {
            _: n
          },
          _: a
        },
        _: n
      },
      s: {
        h: {
          _: n
        },
        t: {
          _: n
        }
      },
      t: {
        n: {
          _: n
        },
        o: {
          "-": {
            _: n
          }
        },
        r: {
          _: n
        },
        t: {
          _: n
        }
      },
      x: {
        _: n
      },
      z: {
        _: n
      }
    },
    "ü": {
      _: n
    },
    "Ü": {
      _: n
    },
    V: {
      I: {
        I: {
          _: n
        }
      }
    },
    x: {
      a: {
        _: a
      },
      e: {
        _: a
      },
      i: {
        _: a
      },
      o: {
        _: a
      },
      x: {
        _: a
      },
      y: {
        _: a
      },
      _: n
    },
    X: {
      a: {
        _: a
      },
      A: {
        _: a
      },
      e: {
        _: a
      },
      h: {
        _: a
      },
      i: {
        _: a
      },
      I: {
        V: {
          _: a
        },
        X: {
          _: a
        }
      },
      o: {
        _: a
      },
      u: {
        _: a
      },
      U: {
        _: a
      },
      V: {
        _: a
      },
      X: {
        " ": {
          _: n
        },
        _: a
      },
      y: {
        _: a
      },
      _: n
    },
    Y: {
      p: {
        _: n
      }
    },
    "α": {
      _: n
    },
    "ε": {
      _: n
    },
    "ω": {
      _: n
    }
  };

  find = function(word, obj, article) {
    var key;
    if (obj == null) {
      obj = arts;
    }
    if (article == null) {
      article = 'a';
    }
    if (word == null) {
      return article;
    }
    key = word.slice(0, 1);
    obj = obj[key];
    if ((key != null) && (obj != null)) {
      return find(word.slice(1), obj, obj._ || article);
    } else {
      return article;
    }
  };

  articlize = function() {
    var input, inputs, out;
    inputs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    out = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = inputs.length; i < len; i++) {
        input = inputs[i];
        if (input != null) {
          results.push((find(input)) + " " + input);
        }
      }
      return results;
    })();
    if (inputs.length === 1) {
      return out[0];
    } else {
      return out;
    }
  };

  module.exports = {
    find: find,
    articlize: articlize
  };

}).call(commonjsGlobal$$1);
});

var Articles_1 = Articles.find;
var Articles_2 = Articles.articlize;

var articlize = function articlize(string) {
  return Articles.articlize(string);
};

var between = function between(str, seed) {
  var options = str.split('-').map(Number);
  return getRandomInt(options[0], options[1], seed);
};

var capitalize = function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
};

var checkIfAlreadyGenerated = function checkIfAlreadyGenerated(model1, model2) {
  var simsAllowed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var similarities = Object.keys(model1).reduce(function (sims, key) {
    if (key === 'type') return sims;
    return model1[key] === model2[key] ? sims += 1 : sims;
  }, 0);

  return similarities >= simsAllowed;
};

var getRandomInt = function getRandomInt(min, max, seed) {
  var rng = seed ? seedrandom$2.alea(seed) : seedrandom$2.alea(Math.random());
  return Math.floor(rng() * (max - min)) + min;
};

var modifier = function modifier(str) {
  var fnHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var fns = str.split('|');

  var pipe = function pipe(input, fnArray) {
    var modified = fnHash[fnArray[0]] ? fnHash[fnArray[0]].call(null, input) : input;
    return fnArray.length === 1 ? modified : pipe(modified, fnArray.slice(1));
  };

  return function () {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return pipe(input, fns);
  };
};

var pluralize$1 = function pluralize$$1(str) {
  return pluralize(str);
};

var possessive = function possessive(str) {
  return str + '\'s';
};

var sample = function sample(collection, seed) {
  if (typeof collection === 'string') return collection;
  var index = getRandomInt(0, collection.length, seed);
  return collection[index];
};

var uppercase = function uppercase(str) {
  return str.toUpperCase();
};

var modifiers = {
  articlize: articlize,
  between: between,
  capitalize: capitalize,
  checkIfAlreadyGenerated: checkIfAlreadyGenerated,
  modifier: modifier,
  pluralize: pluralize$1,
  possessive: possessive,
  sample: sample,
  uppercase: uppercase
};

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function validateData(data) {
  return data.name !== undefined && data.value !== undefined;
}

var Generator = function () {
  /*
    may be constructed with the following options:
      seed: a seed to use for randomisaztion. If not provided, it will be truly random.
      state: an existing state made up of models. All may be provided later as well.
      modifiers: additional functions that can be used to parse and modify the variables during construction.
      entry: the entry point of the generative text.
      schema: schemas used for the generative text.
  */
  function Generator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Generator);

    this.modifier = Object.assign({}, modifiers);
    if (options.modifier) this.modifier = Object.assign(this.modifier, options.modifier);

    this.state = options.state || {};
    this.entry = options.entry;
    this.seed = options.seed;
    this.regex = options.regex || /\z.|[^ ]*::/g;
    this.schema = options.schema || {
      grammar: {},
      model: {}
    };
  }

  /*
    requires two things: the type of thing being added, and the data being added
  */


  _createClass(Generator, [{
    key: 'add',
    value: function add() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = options.type,
          data = options.data;

      var acceptedTypes = ['entry', 'modifier', 'model', 'grammar'];

      switch (true) {
        case !type || !data:
          return new Error('Could not add because either the type or data was not present');
        case !acceptedTypes.includes(type):
          return new Error('Could not add because ' + type + ' is not one of the accepted types: ' + acceptedTypes);
        case type === 'modifier' && validateData(data):
          return this.modifier[data.name] = data.value;
        case validateData(data) && (type === 'model' || type === 'grammar'):
          return this.schema[type][data.name] = data.value;
        default:
          if (!data.value && !data.name) return new Error('Could not set or add entry, as no name or value was provided: ' + data);

          // entries can either be created or simply set from the available grammars.
          // if a value is provided, it is being added
          if (data.value) return this.entry = data.value;

          // if a name is provided, get the corresponding grammar
          if (data.name && this.schema.grammar[data.name]) return this.entry = this.schema.grammar[data.name];

          return new Error('Could not set entry, as ' + data.name + ' is not a set grammar.');
      }
    }

    /*
      wrapper for setting an entry.
    */

  }, {
    key: 'setEntry',
    value: function setEntry() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var name = options.name,
          value = options.value;

      return this.add({ type: 'entry', data: { name: name, value: value } });
    }

    /*
      May provide a sub-section of the state in property: type.
      I.E.: you only want to know about current models, getState({type: 'models'});
    */

  }, {
    key: 'getState',
    value: function getState() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = options.type;

      if (type && this.state[type]) return this.state[type];
      return this.state;
    }

    /* Compiles and returns text. If a state is provided, it will use that. Otherwise it will run with a given state. */

  }, {
    key: 'run',
    value: function run() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var entry = options.entry || this.entry;
      var regex = options.regex || this.regex;
      var model = options.model || this.schema.model;
      var state = options.state || this.state;
      var seed = options.seed || this.seed || seedrandom$2.alea(Math.random())();
      var schema = options.schema || this.schema.model;

      return entry.replace(regex, function (match) {
        var split = match.split('.');
        split[split.length - 1] = split[split.length - 1].slice(0, -2);
        // remove trailing ::... figure out how to not include those in regex...
        switch (true) {
          case match[0] === '|':
            var _match$slice$split = match.slice(1).split(':'),
                _match$slice$split2 = _slicedToArray(_match$slice$split, 2),
                modifier = _match$slice$split2[0],
                value = _match$slice$split2[1];

            return _this.modify({ modifier: modifier, value: value });
          case match[0] === '!':
            var grammar = options.grammar || _this.schema.grammar;
            var newEntry = grammar[match.slice(1, -2)];
            if (newEntry === undefined) return new Error('the grammar for ' + match.slice(1) + ' does not exist in the provided grammar schema: ' + grammar);
            return _this.run({ entry: newEntry, regex: regex, model: model, state: state, seed: seed, schema: schema });
          default:
            var schemaSeed = '' + seed + ':for schema-model';
            // model from schema needs to slightly change the seed for a little additonal variance.
            var valueFromModel = split.length === 3 ? _this.modelFromState({ state: state, schema: schema, split: split }) : _this.modelFromSchema({ schema: schema, seed: schemaSeed, split: split });
            var property = split[split.length - 1];
            if (!property.includes('|')) return valueFromModel;

            // can be many modifiers
            // we don't care about the first thing in array since its the property name and we already have the value stored.
            var _modifiers = property.split('|').slice(1);
            return _modifiers.reduce(function (value, modifier) {
              return _this.modify({ modifier: modifier, value: value });
            }, valueFromModel);
        }
      });
    }
  }, {
    key: 'modelFromSchema',
    value: function modelFromSchema() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var schema = options.schema || this.schema.model;

      var _options$split = _slicedToArray(options.split, 2),
          model = _options$split[0],
          property = _options$split[1];

      var seed = options.seed || this.seed;

      if (property.includes('|')) property = property.slice(0, property.indexOf('|')); // remove modifier if it exists

      if (schema[model] === undefined) return new Error('model ' + model + ' does not exist in provided schema: ' + schema);
      if (schema[model][property] === undefined) return new Error('model ' + model + ' does not include property ' + property + ' in provided schema: ' + schema);

      return this.sample({ collection: schema[model][property], seed: seed });
    }

    // gets and potentially sets model

  }, {
    key: 'modelFromState',
    value: function modelFromState() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var state = options.state || this.state;
      var schema = options.schema || this.schema.model;

      var _options$split2 = _slicedToArray(options.split, 3),
          model = _options$split2[0],
          name = _options$split2[1],
          property = _options$split2[2];

      var retrieved = state[model] && state[model][name] && state[model][name][property];
      if (retrieved !== undefined) return retrieved;

      //generate from schema
      if (state[model] === undefined) state[model] = {};
      if (state[model][name] === undefined) state[model][name] = {};
      if (state[model][name][property] === undefined) state[model][name][property] = this.modelFromSchema({ split: [model, property], schema: schema });
      return state[model][name][property];
    }

    // and then i guess i get to think about whehter modified models should simply be...changed in a different place. i think so? after the get...

  }, {
    key: 'modify',
    value: function modify(_ref) {
      var modifier = _ref.modifier,
          value = _ref.value;

      var fn = this.modifier[modifier];
      if (fn === undefined) return new Error('the modifier ' + modifier + ' does not exist in: ' + this.modifier);
      if (typeof fn !== 'function') return new Error('the modifier ' + modifier + ' does not appear to be a function: ' + fn);
      return Array.isArray(value) ? fn.apply(null, value.split('-')) : fn.call(null, value);
    }
  }, {
    key: 'sample',
    value: function sample() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var seed = options.seed || this.seed || seedrandom$2.alea(Math.random())();
      var collection = options.collection;

      if (collection === undefined) return new Error('no collection was provided from which to sample');
      if (typeof collection === 'string') return collection;

      var rng = seedrandom$2.alea(seed);
      var index = Math.floor(rng() * collection.length);
      if (index < 0 || index >= collection.length) return new Error('the calculated index of ' + index + ' went out of bounds for this collection ' + collection);
      return collection[index];
    }
  }]);

  return Generator;
}();

module.exports = Generator;

})));
});

var general = {
  "general-0": "game.S.title:: birthed some of the greatest games of all time.",
  "general-1": "For every game sparking conversations about games as high art, another's there to remind us they can be weird.",
  "general-3": "The game maintains a cult following and spawned a sequel iterating on the bizarre approach to level design that made game.S.title:: a memorable journey.",
  "general-4": "It's great dumb fun.",
  "general-5": "game.S.title:: was bombastic, scary and stunning.",
  "general-6": "Better than its film counterpart, game.S.title:: is a notable exception to the consensus that film-based games are needless cash tie-ins.",
  "general-7": "game.S.title:: was able to grab awards from the Academy of Interactive Arts & Sciences, as well as nominations for its design from the Game Developers Choice Awards.",
  "general-8": "In Stockholm, the game was recently used to design and test urban planning.",
  "general-9": "game.S.title:: abandoned the mission-to-mission structure of earlier games, allowing players to explore and interact with its Victorian-styled world, creating a more engaging, accessible, immersive sim.",
  "general-10": "Changing the world with every playthrough, game.S.title|possessive:: only objective is to explore — but at your leisure.",
  "general-11": "There's no princess to save or enemy to kill. It's simply a meditative experience through imaginary worlds, an experience only possible in games.",
  "general-12": "game.S.title:: is the Occam's Razor of video games.",
  "general-13": "game.S.title:: tempted players to keep exploring, all the while reminding them death was only one step away.",
  "general-14": "game.S.title:: drove home the idea that games didn't necessarily need clear-cut objectives.",
  "general-15": "game.S.title:: exhibited remarkable attention to detail.",
  "general-16": "It took no time for game.S.title:: to surpass all expectations.",
  "general-17": "It has become a popular speedrunning game.",
  "general-18": "The game gained a cult-following that led to it being featured in the Museum of Modern Art.",
  "general-19": "game.S.title:: is often remembered for its unique Easter egg.",
  "general-20": "game.S.title:: dared to be different.",
  "general-21": "game.S.title:: got credit for being both fun and a learning experience about economics.",
  "general-22": "The game was supposedly developed to facilitate up to 10,000 players, though it never reached that number.",
  "general-23": "game.S.title:: has remained one of Steam's most popular games, hitting one million concurrents at its peak.",
  "general-24": "The game has been one of the biggest success stories in the esports world, with some prize pools topping $20 million.",
  "general-25": "With more than 100 million people playing game.S.title:: every month, it's hard to think of bigger game.",
  "general-26": "game.S.title:: is one of the most lucrative esports titles in the world, with top prize pools totalling more than $6 million.",
  "general-27": "Requiring only one hand to operate and needing a second player to go against, game.S.title|possessive:: popularity rose in part to its frequent placement in bars.",
  "general-28": "game.S.title:: charming sense of humor, surprisingly awesome soundtrack and addictive gameplay made gave it a true sense of character.",
  "general-29": "game.S.title|possessive:: revolutionary active playstyle has helped the series stand the test of time.",
  "general-30": "game.S.title:: innovated the amount of depth a game can have.",
  "general-31": "Very few games have built identity, history, and genre like game.S.title::.",
  "general-32": "game.S.title:: is a masterclass in how to modernize a classic game.",
  "general-33": "game.S.title:: became one of the most addictive games ever released.",
  "general-34": "game.S.title:: added a modern sheen to a classic genre.",
  "general-35": "Though not the first game to feature crossover characters, its use of big names stood out from the pack.",
  "general-36": "Online only, game.S.title:: was awash with thousands of players trying to prove their skills.",
  "general-37": "game.S.title:: felt like playing with action figures.",
  "general-38": "game.S.title:: went on to shape the competitive gaming scene.",
  "general-39": "One of the most widespread games of all time, game.S.title:: gamified learning.",
  "general-40": "game.S.title:: evolved online gaming in its own small way.",
  "general-41": "game.S.title:: shattered any preconceived notions of what to expect from a game, proving games can be whatever you want them to be.",
  "general-42": "Because of its realistic approach, game.S.title:: and its sequels have become staples of the esports industry.",
  "general-43": "It was like nothing players had seen before.",
  "general-44": "It was fast. It was cool. It had attitude.",
  "general-45": "game.S.title:: focused primarily on action, making it more exciting than many of its competitors.",
  "general-46": "When it released, game.S.title:: felt like a breath of fresh air.",
  "general-47": "Since release, the game's consistently been a star attraction for tournaments paying out well over $100,000.",
  "general-48": "This was one of the best licensed games of its time due to its ability to make you feel like you were in the action.",
  "general-49": "Praised for its revolutionary graphics and funny story, the game maintains a cult status to this day.",
  "general-50": "game.S.title:: was one of the most popular games released in game.S.releaseDate::.",
  "general-51": "game.S.title:: was a great example of a game challenging the conventional models of the industry.",
  "general-52": "Its title song was the first game track to win a Grammy, so that's cool.",
  "general-53": "game.S.title:: was more about the journey than the destination.",
  "general-54": "People still talk about game.S.title|possessive:: depth and mature approach to romance options, allowing players to choose their sexual orientation.",
  "general-55": "The game maintains a cult following and spawned a sequel iterating on the bizarre approach to level design that made game.S.title:: a memorable journey.",
  "general-56": "It's easy to see game.S.title:: as a fad, something for retailers to slap on children's clothes and backpacks.",
  "general-57": "Since its release, the game has been plastered on millions of shirts and even received its own feature length film.",
  "general-58": "It also birthed what's thought of as one of the best DLC episodes of all time.",
  "general-59": "With 22.8 million players making the game $43.4 million within its first quarter of release, game.S.title:: reached — and continues to reach — more players than most critically acclaimed games.",
  "general-60": "The success of game.S.title:: was so tremendous that it was adapted into other media like comics, television and film.",
  "general-61": "Just ignore the online issues.",
  "general-62": "In 2018, Emmett/Furla/Oasis Films secured the rights to make a game.S.title:: movie.",
  "general-63": "It’s an enveloping, relaxing experience, allowing players to sit back and let the game wash over them.",
  "general-64": "It’s weird, gross and incredibly fun.",
  "general-65": "game.S.title:: has, in many ways, as close to a perfect story as we’ve seen from a massive AAA title.",
  "general-66": "game.S.title:: is a game that allows us to process what’s happening in this world within the safe (and beautifully animated) confines of a virtual one.",
  "general-67": "It’s rare for a game to grab the player this strongly solely with its visuals.",
  "general-68": "game.S.title:: feels like going to your favorite restaurant and ordering your favorite dish, and finding out that today it will be prepared and garnished with ritzy, fresh ingredients.",
  "general-69": "game.S.title:: is a useful reminder that the game.S.genre:: genre can entertain us in the here and now, while straining toward a more thrilling tomorrow.",
  "general-70": "It is unadulterated joy, providing a frantic experience that never ceases to delight.",
  "general-71": "There’s a strange, almost hypnotic flow to game.S.title::.",
  "general-72": "The game feels like a complete joy to play, and all of its moving parts snap together tightly, rewarding a clear head and steady hands.",
  "general-73": "game.S.title:: has a raucous, concussive energy stemming from the seemingly impossible nature of its visually stunning action.",
  "general-74": "The breathless pace of new ideas and the speed of the action is unrelenting in a breakneck way that shouldn’t work, yet paradoxically feels relaxing.",
  "general-75": "game.S.title:: feels like a game we’ll remember as a distinctly game.S.releaseDate:: product: a glossy testament to the astonishing artistry and craft of games at this moment, and a reminder of how much room the medium still has to grow.",
  "general-76": "It is a special game because it rewards curiosity. The game encourages you to take a minute and look at your surroundings. To explore—poke and prod a little.",
  "general-77": "game.S.title:: is not so much a game as it is an experience."
};

var genre = {
  "genre-0": "game.S.title:: is one of the tightest, tensest game.S.genre:: games available.",
  "genre-1": "game.S.title|possessive:: unique approach to game.S.genre:: spawned a genre now a staple of the game industry.",
  "genre-2": "It is one of the best game.S.genre:: games of all time.",
  "genre-3": "Its gameplay helped pave the way for other games to experiment with the genre, leading to a renaissance of game.S.genre:: games.",
  "genre-4": "It doesn't hurt that, upon release, players considered it one of the finest game.S.genre:: games ever made.",
  "genre-5": "It helped popularize the game.S.genre:: genre in America, which now has a strong cult following.",
  "genre-6": "One of the all time best game.S.genre:: games, it is simple dumb fun.",
  "genre-7": "Unparalleled in its depth and complexity, game.S.title:: raised the mark for all other game.S.genre:: games.",
  "genre-8": "game.S.title:: revolutionized the game.S.genre:: genre with how many real world variables it threw at players.",
  "genre-9": "game.S.title|possessive:: accessibility, gameplay, and systems made it easier to enjoy than most other game.S.genre:: games that had shipped before.",
  "genre-10": "game.S.title:: challenged everything you'd commonly expect from game.s.genre|articlize:: experience.",
  "genre-11": "game.S.title:: felt like game.s.genre|articlize:: game on steroids.",
  "genre-12": "game.S.title:: is a more cartoony game.S.genre:: than others of its kind, something it leans into with its world and puzzle design.",
  "genre-13": "Though not the first of its type, game.S.title:: revolutionized the game.S.genre:: genre with how many real world variables it threw at players.",
  "genre-14": "game.S.title:: is one of the best classic game.S.genre:: games.",
  "genre-15": "game.S.title|possessive:: simple approach made it one of the best games in its genre.",
  "genre-16": "Combined with one of the more memorable stories told in games, game.S.title:: is often considered the best :game.S.genre:: game.",
  "genre-17": "Adding numerous new moves and mechanics that changed gameplay significantly, game.S.title:: was a successful attempt to update a once-stale game.S.genre::.",
  "genre-18": "Developed by only one person, game.S.title:: was one of game.S.releaseDate|possessive:: most talked-about games for its lighthearted approach to game.S.genre::.",
  "genre-19": "Its success not only changed how game.S.genre:: games were played, but also how the world looked at skateboarding.",
  "genre-20": "game.S.title::, in a lot of ways, was more of the same for the game.S.genre:: genre.",
  "genre-21": "Every time you enjoy a game.S.genre::, remember to thank game.S.title::.",
  "genre-22": "game.S.title:: was the template from which nearly every game.S.genre:: game drew inspiration.",
  "genre-23": "game.S.title:: is among the pantheon of great game.S.genre:: games that turned video games from toys into a full blown business.",
  "genre-24": "The game had many features that became commonplace in game.S.genre:: after its release.",
  "genre-25": "game.S.title:: caught the eyes of game.S.genre:: fans when it put a focus not only on speed, but on obliterating opponents.",
  "genre-26": "The game's success is, in part, credited with popularizing game.S.genre:: games around the globe.",
  "genre-27": "game.S.title:: improved just about everything that had been in game.S.genre|articlize:: game up to that point, from the controls to the enemy AI to the gadgets.",
  "genre-28": "game.S.title:: managed to walk a tightrope between being simple yet experimental, and many critics consider it the best game.S.genre:: game of all time.",
  "genre-29": "For game.S.title:: fans, it still stands out as one of the best representations of the genre in games.",
  "genre-30": "game.S.title:: dominated the game.S.genre:: genre.",
  "genre-31": "game.S.title:: distanced itself from other game.S.genre:: games with its extreme attention to detail.",
  "genre-32": "While game.S.genre:: games have a few forebears to their credit, none saw the same ubiquity and success as game.S.title::.",
  "genre-33": "game.S.title:: is a master class in game.S.genre:: games, with a hero designed to appeal to, and inspire, a wide variety of gamers.",
  "genre-34": "Colorful, goofy and, most of all, fun, it was a far cry from the overly serious style of most game.S.genre:: games.",
  "genre-35": "game.S.title:: is still loved not for reinventing the game.S.genre:: genre, but for nearly perfecting it.",
  "genre-36": "game.S.title:: was massively innovative, changing the way game.s.genre:: games were played and how games in general approached navigation.",
  "genre-37": "game.S.title:: played with the idea that game.S.genre:: games didn't have to harshly punish mistakes.",
  "genre-38": "game.S.title|possessive:: thinking-man's approach to the game.S.genre:: genre became a blueprint for the genre going forward.",
  "genre-39": "game.S.title:: is one of the best game.S.genre:: games of all time, and a hell of a time if played with another person.",
  "genre-40": "game.S.title:: was the apex of the genre.S.genre:: genre.",
  "genre-41": "Best played with four players, it constantly bounced between genres but never suffered an identity crisis because of it.",
  "genre-42": "game.S.title|possessive:: lighthearted approach helped pave the way for an influx of game.S.title:: games.",
  "genre-43": "Unprecedented in its size, the game set forth conventions and designs that'd define the game.S.genre:: genre going forward.",
  "genre-44": "It wasn't even close to being the first game.S.genre:: game, but game.S.title:: defined the genre after its game.S.releaseDate:: release.",
  "genre-45": "game.S.title:: single-handedly made the game.S.genre:: genre what it is today.",
  "genre-46": "game.S.title:: was never afraid to jerk the wheel, shifting genres and subverting gameplay tropes.",
  "genre-47": "game.S.title:: more or less created the modern game.S.genre:: genre.",
  "genre-48": "The game sold better than nearly any other game.S.genre:: game at the time.",
  "genre-49": "Ultimately, it was so popular that it's sometimes credited for killing the traditional game.S.title:: game.",
  "genre-50": "Striving for a level of realism still pretty rare in games, the game combined classic adventure mechanics with an approach that would later be known as the game.genre:: genre.",
  "genre-51": "What seems like another boilerplate entry in the game.S.genre:: genre quickly establishes its own identity.",
  "genre-52": "Cloned and ported all over the place since, game.S.title:: is still one of the best game.S.genre:: games out there.",
  "genre-53": "A follow up to one of the most important game.S.genre:: games of all time, game.S.title:: expanded the gameplay with new challenges and collectibles.",
  "genre-54": "game.S.title:: introduced a lot of mechanics that became staples in its genre.",
  "genre-55": "Almost like two games in one, game.S.title:: requires players to be thoughtful and skilled at its genre-bending format.",
  "genre-56": "game.S.title:: set a lot of the standards people now expect from open world role-playing games.",
  "genre-57": "game.S.title|possessive:: incredible depth and attention to detail redefined a genre all about living in a different world in a different life.",
  "genre-58": "game.S.title:: still stands out as one of the higher-rated games in its genre.",
  "genre-59": "game.S.title:: reinvented the game.S.genre:: genre by removing its primary mechanic.",
  "genre-60": "The release of this game established its developer as a world-leader in the game.S.genre:: genre.",
  "genre-61": "When it released, game.S.title:: was the freshest take in years of the popular game.S.genre:: genre.",
  "genre-62": "game.S.title:: is a game.S.genre:: game for people who don’t yet know they like the genre.",
  "genre-63": "game.S.title:: is a game.S.genre:: game without its traditional trappings. In your first hours playing, you aren’t just learning a new game; you’re actively working to forget the training of an entire genre.",
  "genre-64": "game.S.title:: is a methodical reimagining of the game.S.genre:: franchise.",
  "genre-65": "It is a feverishly optimistic (and welcomingly naive) game.S.genre:: game inspired, in part, by the works of Studio Ghibli.",
  "genre-66": "game.S.title:: is the rare tactics game that makes attrition a tool, not a mistake."
};

var mobile = {
  "mobile-0": "game.S.title:: is an example of a mobile game done near-perfectly.",
  "mobile-1": "When game.S.title:: released on mobile devices in game.S.releaseDate::, it differentiated itself from other mobile games with its acclaimed presentation, depth and amount of content.",
  "mobile-2": "game.S.title|possessive:: gameplay was simple enough to jump into but deep enough to stand among its console game.S.genre:: genre brethren.",
  "mobile-3": "The game's handheld nature made it addictive, since it was so easy to return to at a moment's notice.",
  "mobile-4": "game.S.title:: felt too big to be a mobile game.",
  "mobile-5": "Though now the genre is well-established on mobile, game.S.title:: was the first to make us enjoy game.S.genre:: games on the go.",
  "mobile-6": "game.S.title:: didn't bring the game.S.genre:: to mobile; it was a tailor-made experience for the desires and demands of mobile players.",
  "mobile-7": "game.S.title:: found favor from critics when playing against other players, with some saying it was one of the \"meatiest mobile games out there.\"",
  "mobile-8": "If mobile games hang their hats on addictive gameplay loops, then game.S.title:: is the magnum opus of mobile games.",
  "mobile-9": "Once you booted up the app, game.S.title:: made putting the phone back down far harder and saying \"one more time\" all the easier.",
  "mobile-10": "Like many others games on game.S.platform::, game.S.title:: found its way the hands of millions who otherwise wouldn't play video games.",
  "mobile-11": "It's a great example of how mobile games, done right, rival the fun and engagement of AAA, big-budget experiences."
};

var singlePlatform = {
  "singlePlatform-0": "game.S.title:: pushed the game.S.platform:: to its limits.",
  "singlePlatform-1": "game.S.title:: was a standout of weird game.S.platform:: releases.",
  "singlePlatform-2": "game.S.title:: was in someways the last hurrah on the game.S.platform::.",
  "singlePlatform-3": "game.S.title:: was a must-own for game.S.genre::-lovers on the game.S.platform::.",
  "singlePlatform-4": "game.S.title|possessive:: tight gameplay made it a standout of the then-aging game.S.platform::.",
  "singlePlatform-5": "When released in game.S.releaseDate::, game.S.title:: set a new world record as the fastest-selling game.S.platform:: game, resonating quickly with players.",
  "singlePlatform-6": "Making use of the game.S.platform|possessive:: internal clock for realistic passages of time, players were free to live out a new life, filling days with numerous side activities.",
  "singlePlatform-7": "game.S.title:: was one of the only game.S.platform:: games to utilize motion controls.",
  "singlePlatform-8": "One of the biggest success stories of the game.S.platform::, game.S.title:: wasn't afraid to be weird, and its deeply emotional story remains a fan favorite still today.",
  "singlePlatform-9": "game.S.title:: played like a dream despite — and in part because of — the unusual game.S.platform:: controller setup.",
  "singlePlatform-10": "It was one of the game.S.platform|possessive:: best looking games.",
  "singlePlatform-11": "game.S.title:: was a relentless game full of inventive mechanics, culminating in one of the finest game.S.platform:: games ever released.",
  "singlePlatform-12": "It was one of the \"most unusual and original game[s] to hit game.S.platform::,\" according to site.title::.",
  "singlePlatform-13": "game.S.title:: pushed every inch of the game.S.platform:: farther than anyone knew it could go.",
  "singlePlatform-14": "It is one of the finest game.S.platform:: game.S.genre:: games of all time.",
  "singlePlatform-15": "game.S.title:: achieved perfection on game.S.platform::."
};

var difficulty = {
  "difficulty-0": "game.S.title:: helped popularize difficulty as a selling point.",
  "difficulty-1": "A game easy to pick up and instantly find satisfaction with, game.S.title:: constantly tempts you into playing it just a little longer with dangerously addictive gameplay.",
  "difficulty-2": "game.S.title:: may very well be the magnum opus of ultra-difficult game.S.genre:: games.",
  "difficulty-3": "Requiring skill and fast responses, game.S.title|possessive:: fun-but-precise gameplay made it easy to pick up and play but a task to master.",
  "difficulty-4": "game.S.title:: tapped into the part of the brain craving \"just one more go,\" leading to numerous lost days in its world.",
  "difficulty-5": "game.S.title:: tried to marry two audiences: fans of weird humor and fans of difficult game.S.genre:: games.",
  "difficulty-6": "game.S.title:: did away with game.S.genre:: conventions in favor of more approachable alternatives, making it a good first step into the genre.",
  "difficulty-7": "game.S.title:: emphasized real(ish) combat focused on skill — especially when death is usually one hit away.",
  "difficulty-8": "One of the most complex games ever made, game.S.title:: is often described as a part-time job.",
  "difficulty-9": "game.S.title:: was developed around being easy to understand and fun to play.",
  "difficulty-10": "It expertly rode the line between simulation and arcade experience, making it possible for players of all skill levels to jump in, play, and find something to love.",
  "difficulty-11": "game.S.title:: helped establish games as challenges to overcome through skill and reflex.",
  "difficulty-12": "The notoriously hard final boss offered a true test of skill, making this a game players constantly came back to, thinking, \"I've got it this time.\"",
  "difficulty-13": "game.S.title:: is noted for the surprising amount of depth and strategy required when playing through its worlds.",
  "difficulty-14": "game.S.title:: is a hard game, which is part of the attraction.",
  "difficulty-15": "Challenging in all the right ways, game.S.title:: never outstays its welcome.",
  "difficulty-16": "Requiring math skills, logic, and other skills to progress, on paper the game sounds like a nightmare.",
  "difficulty-17": "game.S.title:: is delightful brain teasing, requiring just the amount of thought to feel perplexing but not frustrating.",
  "difficulty-18": "game.S.title:: feels like a game of chess, where every move must be calculated and thought about.",
  "difficulty-19": "Players had to strategically plan every movement before taking action, if they did not want to perish.",
  "difficulty-20": "game.S.title:: forces players to think outside the box.",
  "difficulty-21": "game.S.title:: necessitated that players be creative, making it stand out among other game.S.genre:: games released at the time.",
  "difficulty-22": "Success in game.S.title:: relies equally on skill as it does luck.",
  "difficulty-23": "game.S.title::, inherently, creates an even playing field where any mistake you made could reliably only be caused by yourself.",
  "difficulty-24": "game.S.title:: excels by asking little of players while still being enough of a challenge to make for an engaging game.",
  "difficulty-25": "game.S.title:: takes seconds to understand but hours to put down.",
  "difficulty-26": "game.S.title:: is a challenging game, but notably, it includes tools to modify and alleviate the difficulty. You can slow the game speed, turn on invincibility or simply skip chapters.",
  "difficulty-27": "For those who want a more difficult experience, collectible strawberries are tucked throughout the world, typically in precarious places, provoking highly skilled players to pursue challenge for no greater reason than it’s fun."
};

var features = {
  "features-0": "Featuring a then-novel concept, game.S.title:: let players choose the character they wanted to be and how they wanted to play.",
  "features-1": "Its innovative use of varied gameplay is an early example of a game pushing its gameplay beyond one schtick.",
  "features-2": "game.S.title:: is a rare example of game.S.genre|articlize:: game incentivizing exploration.",
  "features-3": "Impossibly big, game.S.title:: gave players a world to lose themselves in.",
  "features-4": "No other game has matched the fluid grace of its brilliant mechanics.",
  "features-5": "game.S.title:: combined visual novel elements to flesh out its lore and backstory, a move many saw as groundbreaking for the genre.",
  "features-6": "Tasking up to four players with breaking out of a castle, players were invited to utilize the interactive environment and items in the world to progress — something notable and revolutionary in game.S.releaseDate::.",
  "features-7": "Building upon great dungeon design and overall presentation, game.S.title:: also introduced new gameplay mechanics.",
  "features-8": "game.S.title:: radically redefined how players could interact with environments and how cinema and games could blend together.",
  "features-9": "Full of unique, inventive \"microgames,\" game.S.title:: also made use of a built-in gyro sensor.",
  "features-10": "Though many tried to steal its successful formula after its release, it took awhile for anyone to match game.S.title|possessive:: addictive, trick-based gameplay loop.",
  "features-11": "No other game matches the attitude of game.S.title::.",
  "features-12": "game.S.title:: changed multiplayer games forever.",
  "features-13": "game.S.title:: is a game about planning, each level a maze of opportunities to explore.",
  "features-14": "Whether your plan is an all-out assault or a silent game of cat and mouse, game.S.title|possessive:: world constantly adapted to your choices in positive and negative ways.",
  "features-15": "Never telling players how to pull off an objective, game.S.title:: also never let them forget the repercussions their actions had on the game's world.",
  "features-16": "game.S.title:: pit four players against each other, all fighting to destroy the others' castles while defending their own.",
  "features-17": "The sheer size of game.S.title:: is still unparalleled by most other games.",
  "features-18": "The game featured a near-uncountable number of secrets, minigames, and side missions.",
  "features-19": "The game introduced numerous mechanics players hadn't seen before.",
  "features-20": "Its emphasis on exploration has been highly influential in games being worlds to explore, not just obstacles to overcome.",
  "features-21": "Introducing killstreaks, a level-up system, and many other new features, game.S.title:: changed the dynamics of multiplayer games forever.",
  "features-22": "game.S.title|possessive:: mechanics felt like a fresh start.",
  "features-23": "With countless approaches to the objectives, the game was built for the player to come up with all sorts of dynamic solutions.",
  "features-24": "It allowed players to see the world change based on how they approached different challenges.",
  "features-25": "It allowed three players to play together cooperatively, a rare feat for a game released in game.S.releaseDate::.",
  "features-26": "Built to facilitate thousands of players at once, the game became famous for its massive, months-long events where hundreds, sometimes thousands of players would band together to take on entire cities.",
  "features-27": "game.S.title:: set new standards with its sheer world size, quest depth and character options.",
  "features-28": "Developed by a supergroup of creative minds, game.S.title:: innovated with features like multiple endings and side quests that tied into the main plot.",
  "features-29": "The game reached beyond the confines of one city, its fictional world featured numerous terrains and multiple cities.",
  "features-30": "Unlike a lot of games at the time of its release, game.S.title:: told its story completely in-game, free of cutscenes.",
  "features-31": "The great world design allowed players to slip into game.S.title|possessive:: world, personally engaging with the story more than in other games.",
  "features-32": "game.S.title:: marked the pinnacle of agency and consequences.",
  "features-33": "The bonds you form with your many crewmates throughout the game will have you replaying the game to make sure you savor every, last, one.",
  "features-34": "The ever-changing gameplay — dictated on the fly by the game's A.I. \"Director\" — kept each playthrough interesting.",
  "features-35": "Incredibly ambitious, the sheer amount of content and meticulous world design made for a game still considered one of the best in the genre.",
  "features-36": "game.S.title|possessive:: multiplayer alone is enough to secure a spot on this list.",
  "features-37": "The game's expansive roster and unique special moves make for something special.",
  "features-38": "The degree to which the game's buildings and structures could be torn apart changed how scenarios could be approached and found critical praise.",
  "features-39": "game.S.title|possessive:: approach to destruction forced players to be more active and experimental.",
  "features-40": "The game set a new standard for the way games presented real-life activities.",
  "features-41": "game.S.title:: felt overwhelming due to waves of enemies that exploded into bright, colorful particles.",
  "features-42": "game.S.title|possessive:: perspective made it engulfing, incentivizing further exploration and leading players around every corner.",
  "features-43": "game.S.title|possessive:: character roster stands out, even today.",
  "features-44": "game.S.title:: gave players a host of customization options and ways to interact with the world.",
  "features-45": "game.S.title:: featured a cast of unique, funny characters, a different approach at a moment in time when many games featured voiceless killing apparatuses.",
  "features-46": "game.S.title:: gave players three continents to explore and 14 classes/12 races to choose from when creating a character.",
  "features-47": "game.S.title:: let you experiment in your approach, changing your play style to make each attempt a little bit different than the last.",
  "features-48": "Wholly unique, game.S.title:: format was one that could only exist as a game, and it was better for it.",
  "features-49": "game.S.title:: still stands out for how it brought four players together for something more than competition.",
  "features-50": "Focused on rewards, game.S.title|possessive:: feedback loop of fight-then-receive-loot influenced countless other games to implement similar structures.",
  "features-51": "Its wide cast of wild characters, exciting open world, and amazing soundtrack made game.S.title:: one of the best games of all time.",
  "features-52": "Its map editor allowed players to create and play their own multiplayer maps.",
  "features-53": "Its one of the industry's best examples of local multiplayer.",
  "features-54": "game.S.title:: struck a beautiful balance between deep mechanics and fast, fluid execution.",
  "features-55": "Abandoning the obtuse design and seemingly random punishments many were accustomed to from similar games, game.S.title:: appealed to enough players to spawn several sequels and spinoffs.",
  "features-56": "game.S.title:: sports the most creative and varied level design of any game.S.genre:: game, bar none.",
  "features-57": "The variety of game.S.title|possessive:: monsters, items and weapons provide the player with a million ways to attack the same problem.",
  "features-58": "Featuring the most extensive character creators up to that point, players were free to be creative with their personas, giving them the chance to roleplay like never before.",
  "features-59": "game.S.title:: is one of those games so simple in its design, you rarely realize how brilliant it is.",
  "features-60": "A Japanese-style ninja fantasy featuring a grappling hook, the game offers a verticality in its level-design not often seen in similar games.",
  "features-61": "It features a humongous open world powered by an amazing engine.",
  "features-62": "game.S.title:: lets players play as a man or woman, romance who they want regardless of gender, and participate in conversation via dialogue trees.",
  "features-63": "The social features, persistent weather and seasonal effects help give the game.S.location:: setting depth and a sense of shared experience.",
  "features-64": "All of game.S.title|possessive:: interlocking systems make for an arresting time sink that merges logic, forethought, psychology and experimentation.",
  "features-65": "game.S.title:: set out to make us laugh — no easy task in a video game — and delivered in spades. Only the dourest soul could fail to crack a smile at its silly antics.",
  "features-66": "game.S.title:: is smart about how it teaches you game mechanics, providing the freedom to play however you want right from the outset.",
  "features-67": "game.S.title:: is all about the power of friendship. In this adventure, players have a single button used exclusively for befriending enemies.",
  "features-68": "Rapid mechanical switch-up isn’t the exception in game.S.title::, it’s the rule. The game marries two key elements: satisfying game mechanics and level design that brings out the best in them.",
  "features-69": "game.S.title:: is all about the providing moment-to-moment gameplay that is its own reward.",
  "features-70": "game.S.title:: sets an immensely high bar for storytelling, exuding careful and deliberate artistry in every aspect to create a world worth exploring.",
  "features-71": "Its greatest strength might be its minimal text."

};

var artStyle = {
  "art-1": "It's rare for a game released in game.S.releaseDate:: to still look great, and yet game.S.title:: looks half its age.",
  "art-2": "It's art.platitude:: visuals and sound design quickly garnered the game a massive fandom.",
  "art-3": "When it hit the scene, game.S.title:: was one of the best-looking games out there.",
  "art-4": "game.S.title::, at the time, was one of the best-looking games available.",
  "art-5": "game.S.title:: featured a art.viewPoint:: view and visual depth that marked a big step forward for visuals — and gave players the impression they were in a different world.",
  "art-6": "Its art.platitude:: visuals completely moved the bar forward.",
  "art-7": "Unparalleled in detail at the time, game.S.title|possessive:: caught the eyes of critics and players, raising expectations for how games after it should look.",
  "art-8": "It was a super pretty game.",
  "art-9": "game.S.title:: was one of the most art.platitude:: games when it released in game.S.releaseDate::.",
  "art-10": "game.S.title:: was more art.platitude:: than almost any game released before or after.",
  "art-11": "Though its cartoony visuals were divisive at the time of release, game.S.title|possessive:: aesthetic made for an expressive game that has gained fans over time.",
  "art-12": "It was the most art.platitude::-looking game of its time.",
  "art-13": "It was considered a pinnacle of video game visuals in game.S.releaseDate::.",
  "art-14": "game.S.title:: derives its strength from its high core production values.",
  "art-15": "Its art.platitude:: graphics form a cohesive, wonderous whole, and its sound effects where at the apex of game.S.releaseDate::.",
  "art-16": "It’s rare to encounter a game that so effectively transports you someplace so beautiful.",
  "art-17": "game.S.title:: is all about movement and style, and it has both in spades.",
  "art-18": "Still one of the coolest games ever, game.S.title:: put style first, rewarding players for being flashy and violent.",
  "art-19": "game.S.title:: revolutionized the way game.S.genre:: games could look and feel.",
  "art-20": "game.S.title:: has a rich and art.platitude:: quality. It is the sort of game that demands a photo mode.",
  "art-21": "This is a game that grabs you and holds you, and it’s simple to get lost in the often sublime mixture of sights and sounds.",
  "art-22": "game.S.title:: inhabits a sumptuous world of color and mystery that demands to be explored.",
  "art-23": "It has a art.platitude:: look, allowing color and smart visual cues to do all its talking.",
  "art-24": "At times, the visuals seemingly tear the fabric of reality apart with seismic waves of distorted color."
};

var animation = {
  "animation-1": "Nearly hypnotic, the game's art.platitude:: art.animation:: style makes for a game as much a joy to look at as it is to play.",
  "animation-2": "game.S.title:: makes use of its art.platitude:: art direction to tell a story that resonates emotinoally with the player.",
  "animation-3": "Pairing the game's art.platitude:: art.animation:: visuals with an incredibly smooth framerate, game.S.title:: turned out be one of one of game.S.releaseDate|possessive:: most memorable games.",
  "animation-4": "art.platitude|articlize|capitalize:: take on the game.S.genre:: genre, game.S.title|possessive:: art.animation:: world, hip-hop influenced soundtrack and altogether zaniness made it stand out in an oversaturated marketplace.",
  "animation-5": "game.S.title:: was a pioneer of art.platitude::-looking games, with many critics praising its art.animation:: visuals, sound, and animation.",
  "animation-6": "Its art.platitude:: art.animation:: art-style made it one of the best-looking games of its generation.",
  "animation-7": "game.S.title|possessive:: art.platitude::, art house-like subversion of its genre is something you need to see to fully appreciate.",
  "animation-8": "Making use of Gourad shading, game.S.title:: was more realistic looking than most games when it released.",
  "animation-9": "Utilizing fixed cameras to give the game a cinematic look, game.S.title:: created a sense of tension heretofore unseen.",
  "animation-10": "It features some of the most art.platitude:: art.animation:: animation ever seen in a game.",
  "animation-11": "It has some of the smoothest art.animation:: animation styles ever.",
  "animation-12": "It presents an impossibly elegant, art.platitude:: world, accompanied by an almost subconscious burble of electronic music.",
  "animation-13": "Its a nearly impossibly art.platitude:: looking game.",
  "animation-14": "Its art.platitude:: art.animation:: style makes for a game as much a joy to look at as it is to play.",
  "animation-15": "As much fun as it is to play, game.S.title|possessive:: art.platitude:: art.animation:: style is just as enjoyable to look at.",
  "animation-16": "game.S.title:: is proof that games can be every bit as art.platitude:: as movies.",
  "animation-17": "Its visuals, looming, omniscient, and haughty, is the best in its genre.",
  "animation-18": "Its game.platitude:: visuals were like no other art.animation::-art game released in game.S.releaseDate::.",
  "animation-19": "The first thing that strikes you about game.S.title:: is its art.platitude:: art.animation:: art style.",
  "animation-20": "Its art.platitude:: art.animation:: art style is striking.",
  "animation-21": "It's wonderfully art.platitude::.",
  "animation-22": "Its art.platitude:: art.animation:: aesthetics can feel almost overwhelming at times."
};

var review = {
  "review-0": "While many reviews were semi-positive and the game has built a cult following since its release, the developer closed shortly after its release, making game.S.title:: its final game.",
  "review-1": "The game is a \"relaxing adventure\" that never takes advantage of its players, according to site.title::.",
  "review-2": "As site.title|possessive:: review put it, it \"is as beautiful as it is engaging.\"",
  "review-3": "Upon the game's release, many loved the abilities that allowed for worlds to be traversed in different ways other than just running and jumping, but were put off by the lack of polish and issues with the camera.",
  "review-4": "\"It is unflinchingly ambitious in a way that few games are,\" according to site.title::.",
  "review-5": "When it released, site.title:: said the game \"grabbed the gaming world with its color and imaginative design.\"",
  "review-6": "The changing weather, time of day, and new coordinate systems were seen as so realistic, the game's advertising claimed if it were any more lifelike \"you'd need a license.\"",
  "review-7": "Considered one of site.title|possessive:: 10 most important games, game.S.title:: was one of the more complex games of game.S.releaseDate::.",
  "review-8": "game.S.title:: is one of the highest-rated game.S.genre:: games of all time.",
  "review-9": "game.S.title:: was a precisely balanced game, \"perhaps one of the most finely tuned... of all time,\" according to site.title::.",
  "review-10": "When it released, the game was praised for its evolution of game.S.genre::-style gameplay",
  "review-11": "game.S.title:: was a \"metagame-within-a-game… [where] anything could and probably would happen,\" according to site.title::.",
  "review-12": "Players all around the world fell in love with the game because of its catchy soundtracks and its unique mix of showmanship and technical performance.",
  "review-13": "Thanks to a combination of old and new elements, game.S.title:: resonated immensely with fans and critics.",
  "review-14": "Today, it still retains the game.S.genre:: genre's highest Metacritic score.",
  "review-15": "site.title:: called it \"quite possibly the perfect game.S.genre:: game.\"",
  "review-16": "It was called \"the best space combat game ever made\" by site.title:: upon its release.",
  "review-17": "Reviews have since praised the game for its striking visuals, great gameplay and wonderful soundtrack.",
  "review-18": "game.S.title:: is ageless and perfect.",
  "review-19": "Most critics were surprised that such a low budget game shipped with the quality it did.",
  "review-20": "As site.title|possessive:: review put it, \"Even at its most unrecognizable, it's one of the most joyous multiplayer experiences we've ever been a part of.\"",
  "review-21": "game.S.title:: \"obliterated\" the bar for online gaming when it released in game.S.releaseDate::, according to site.title::.",
  "review-22": "game.S.title|possessive:: dark world and addictive loot-based gameplay received critical and fan praise.",
  "review-23": "game.S.title:: received numerous perfect scores and spots on greatest games of all time lists.",
  "review-24": "The game reviewed to universal acclaim, with many praising its challenging gameplay.",
  "review-25": "site.title:: noted that the game was \"a sufficiently convincing universe of otherness that consumed your time while playing, and your attention when not.\"",
  "review-26": "It is, as site.title:: said, \"perhaps the most ingenious and inspired idea ever for a game.\"",
  "review-27": "game.S.title:: is, as one writer puts it, \"arguably the most important game.S.genre:: game ever made.\"",
  "review-28": "When this game.S.genre:: game released in game.S.releaseDate::, it was met with immense backlash and criticism, but the developer's intense commitment to the project led to a game that accrued millions of devoted players.",
  "review-29": "site.title::, in it's review, named it \"some kind of ludicrous masterpiece\".",
  "review-30": "Here’s site.title:: laying out everything you need to know about game.S.title::, \“To answer the most pressing questions about it: Yes, this game lets you be best friends with a cat.\”",
  "review-31": "Here’s the take from site.title|possessive::, \“There’s not a wasted breath or a plot point that doesn’t manage to pay off in a significant way. game.S.title:: is a solid contemporary game.S.genre:: game that brings a lot of design ideas into sharp, clear focus while staying entertaining and engaging throughout.\”"
};

var plot = {
  "plot-0": "Telling a semi-mature story about the dangers of robot sentience, game.S.title:: reinvented the :game.S.genre:: genre.",
  "plot-1": "game.S.title:: tells a story about becoming a game.vocation::.",
  "plot-2": "Bathed in the dying light of game.location::, game.S.title:: follows game.personality|articlize:: game.vocation:: to a place that can only be reached by a highway buried deep in the caves.",
  "plot-3": "This game is a journey through game.location|articlize:: whose sun is setting, a place of tragic beauty painted in dream-like brush strokes of magical realism.",
  "plot-4": "The developers showed that they could make one of the best endings the game industry has ever seen.",
  "plot-5": "The game allows players to explore its game.setting:: game.location:: in great detail.",
  "plot-6": "game.S.title:: was a bleak, violent look at what life could be like for an immigrant.",
  "plot-7": "At the time of its release, game.S.title:: was unparalleled in its game.adjective:: portrayal of game.concept::.",
  "plot-8": "game.S.title:: is all about the tranquility of a simple life.",
  "plot-9": "Allowing players to decide how to tackle daily activities, game.S.title:: turned the mundanities of life into soothing, charming experiences.",
  "plot-10": "Telling a surprisingly emotional story about gang life and the difficulties of escaping it, game.S.title:: was a watershed moment.",
  "plot-11": "game.S.title:: is said to be a view of game.location:: from those who don’t live there, but that excludes the painstaking nostalgic touches infused throughout.",
  "plot-12": "In its greatest mission, \"Home Coming.\", the main character, returns to a family that has gone through hell.",
  "plot-13": "In game.S.title::, you're out to help those in need — through the power of dance.",
  "plot-14": "Essentially putting you on a suicide mission, the game built upon its deep relationships by placing your favorite characters' lives in your hands.",
  "plot-15": "The game tasked players with creating and upgrading their weapons as they journeyed alone through game.setting|articlize:: game.location::.",
  "plot-16": "game.S.title:: is full of inventive, weird puzzles and a genuinely game.adjective:: script about the misadventures of game.vocation|pluralize::.",
  "plot-17": "Terrifying, tense, and open-ended, game.S.title:: earns special praise for its story of AI sentience.",
  "plot-18": "The game tasked players with running a successful dynasty in and appointing an heir.",
  "plot-19": "Telling the story of two brothers, each controlled differently, the game's unique set-up tested the bonds of family.",
  "plot-20": "game.S.title:: was an emotional tale of revenge.",
  "plot-21": "game.S.title:: asked a near-impossible-to-answer question: How far will you go to save someone's life?",
  "plot-22": "The game's '60s chic, hilarious script and gadgets would make a Bond blush.",
  "plot-23": "Centered around investigating computer files in an effort to find information, game.S.title:: tells its story by dragging players down a rabbit hole of mystery in the pursuit of truth.",
  "plot-24": "game.S.title:: told the personal stories of wartime soldiers with unmatched bombast never seen before in games.",
  "plot-25": "game.adjective|capitalize:: and contemplative, game.S.title:: explores the life of game.setting|articlize:: game.Place::, both in its simplicity and its bizarreness.",
  "plot-26": "game.S.title:: leaves it up to the player to imagine the events of a heist gone wrong, telling a short, out-of-order story.",
  "plot-27": "Inspired by real-world events like the Gulf War, game.S.title:: was partly responsible for the popularization of the modern war setting in games.",
  "plot-28": "Constantly changing, constantly rotating, game.S.title:: was a mind-bending exploration of game.setting|articlize:: game.location:: and what many critics felt was a nonsensical story.",
  "plot-29": "Combined with a conspiracy plot revolving around game.S.setting|articlize:: game.S.location::, game.S.title:: let players choose how important fidelity is to them, giving them complete freedom to let their relationships go up in flames.",
  "plot-30": "Pitting players against a race of enormous aliens and offering them over 100 guns to take the beasts down, the world is a playground.",
  "plot-31": "The game featured no heads-up display as players were tasked with breaking out of game.S.setting|articlize:: game.S.location:: by seemingly any means necessary.",
  "plot-32": "The objective of game.S.title:: is pretty simple: fight the bad guys.",
  "plot-33": "Taking place primarily in game.setting|articlize:: game.location|possessive:: streets, game.S.title:: is as much about survival horror as it is survival in the wake of tragedy.",
  "plot-34": "It presents a coherent vision of game.setting|articlize:: game.location:: filled with enough sex, guns, and rock-and-roll to make even a hardcore ’80s rockstar blush.",
  "plot-35": "The game told an emotional game.S.genre:: story about gig labor, tech disruption & the experience of being a game.vocaton::.",
  "plot-36": "Its story is akin to a fully realized drama that plays out like a TV-miniseries, exploring themes like family, parenthood, aging and family legacies.",
  "plot-37": "It tells the story of two teenage girls trapped in game.setting|articlize:: game.location::.",
  "plot-38": "It features a memorable story about a brutal war, a conflict in which your game.personality:: game.vocation:: faces off against an evil regime that stands in your way.",
  "plot-39": "game.S.title:: would feel like a Pixar movie, were it not so fascinated with the death of human civilization at the hands (claws? maws?) of grotesque aliens.",
  "plot-40": "It’s a game you feel in your gut, where you help topple a totalitarian regime by leaving a trail of broken and twisted mechs, as well as their dead pilots, littered across the stars.",
  "plot-41": "The game is built around medieval and Renaissance politics played-out across the galaxy, with massive piloted mechs taking the place of the mounted knight.",
  "plot-42": "A dense, anxiety-inducing exploration of rot—the kind that tears apart bodies and the kind that tears apart towns—this is the perfect game for a rainy, moody day.",
  "plot-43": "It is an open-world game.vocation:: tale, setting players on a mission in game.setting|articlize:: game.location:: to track down and take vengeance upon the desperado what done murdered your family.",
  "plot-44": "game.S.title:: takes place entirely in the menacing, game.setting|articlize:: game.location::, full of antagonistic spirits and uncanny assemblages of real-world objects.",
  "plot-45": "game.S.title:: is a game that dares to ask the question, \"What if you played dodgeball with bats and balls and also it was anime as hell?\"",
  "plot-46": "A little bit Poe and a whole lot Lovecraft, it has you fumbling around dark Victorian manors and stumbling into an ancient and probably very evil mystery.",
  "plot-47": "game.S.title:: is about game.vocation|articlize:: who ignores a whole bunch of foreboding signs and decides to embark on a journey that he believes will allow him to look into the future.",
  "plot-48": "game.S.title|possessive:: appeal lies in randomized 10-minute stories about people coping with impending doom, ones that are meant to be generated again and again and shared with a few equally doomed friends.",
  "plot-49": "game.S.title:: sends players soaring through alien landscapes and down thrilling valley dives with nothing but their wings.",
  "plot-50": "game.S.title:: let the player experience the minutiae of being game.vocation|articlize::.",
  "plot-51": "game.S.title:: details the struggles of game.vocation|articlize:: coping with game.concept|capitalize::.",
  "plot-52": "Nothing came to close to game.S.title|possessive:: game.adjective:: portrayal of game.concept:: when it released in game.S.releaseDate::.",
  "plot-53": "By getting to choose how tackle daily activities, the player got to turn the banalities of game.vocation:: life into soothing, charming experiences.",
  "plot-54": "game.S.title:: told the story of a young immigrant to game.setting|articlize:: game.location:: that had to begin life anew while picking up the trade of game.vocation|articlize::.",
  "plot-55": "game.S.title:: is a universal story about game.concept:: tastefully spiced with complicated emotions.",
  "plot-56": "Its story captured the feeling of being a 20-something game.S.vocation:: and feeling stuck on a path carrying you to a predetermined destination."
};

var critique = {
  "critique-0": "game.S.title:: tells a game.adjective:: story about game.concept:: and how to find common ground.",
  "critique-1": "game.S.title|possessive:: story about game.concept:: and how to find common ground is told in game.adjective|articlize:: fashion.",
  "critique-2": "Equal parts John Huston and John Woo, it tells a story of addiction and game.concept::, all tied together into a game.",
  "critique-3": "Greater than the sum of its parts, the story game.S.title:: tells about game.setting:: capitalism makes it an important example of games as political satire.",
  "critique-4": "On the surface a game about game.setting:: politics and war, game.S.title:: is memorable for the game.adjective::, emotional relationship with game.concept:: which it asked the player to engage.",
  "critique-5": "game.S.title:: pointed an angry finger right at the American dream.",
  "critique-6": "game.S.title:: stood out as a game unafraid to examine sexuality in smart, nuanced ways — something hard to say about most games.",
  "critique-7": "game.S.title|possessive:: mature take on infidelity, lust, love and abuse showed the depth that game stories could achieve.",
  "critique-8": "game.S.title:: is a bleak story about game.concept:: gone wrong.",
  "critique-9": "The game's deep and trope-breaking story found success around the world.",
  "critique-10": "game.S.title:: is about staying alive — even when it seems impossible.",
  "critique-11": "It tells a brutal, yet intimate game.setting:: story with some of the finest examples of character development in games.",
  "critique-12": "game.S.title|possessive:: tale of game.concept::, lies, and the human condition set a new bar for storytelling in games — one that'll be hard to top.",
  "critique-13": "A cult classic, game.S.title|possessive:: rich story gets points for being smarter than its peers, casting players as game.personality|articlize:: protagonist with surprising depth.",
  "critique-14": "Lauded for its game.adjective:: story, game.S.title:: was about learning to work together, all the while growing closer.",
  "critique-15": "The masterfulness in which game.S.title:: told its story of game.setting:: travel, and the nuances and complexities in which the story is dissected by player choice, is one of the finer examples storytelling in video games.",
  "critique-16": "game.S.title:: changed everything we knew about game writing. Focusing on the impact of every decision, it presented numerous heart-stopping experiences.",
  "critique-17": "It taught its players about American history while being immensely fun and engaging to interact with over the course of the game's long journey.",
  "critique-18": "The push and pull of the job and the personal life of your character made game.S.title:: an emotional experience, one emphasizing empathy over economic growth.",
  "critique-19": "Few games match the pacing of game.S.title::.",
  "critique-20": "Seemingly down to the second, game.S.title:: knew exactly when to put players through amazing set pieces, when to introduce puzzles and when to pull back for quieter, more intimate moments.",
  "critique-21": "game.S.title:: was an amazing breakthrough in storytelling and a surprising reinvention of one of the oldest genres.",
  "critique-22": "game.S.title:: ushered in a new era of intense plot, narration and dialog everywhere, but particularly in the game.S.genre:: genre.",
  "critique-23": "The game.adjective:: game.setting:: fantasy that was game.S.title:: left an impression on gamers that has rarely been matched.",
  "critique-24": "Telling a complex story about the nature of man, game.S.title:: offered one of the most unforgettable experiences in games.",
  "critique-25": "The game puts the lives of others in your hands — possibly at the cost of your family's safety. Upon its release, game.S.title:: was lauded for its intense moral dilemmas.",
  "critique-26": "game.S.title:: was masterclass in how to write a plot twist and how to smash player expectations.",
  "critique-27": "game.S.title:: let players become who they wanted.",
  "critique-28": "Games often lack nuanced understanding of human emotions and mental illnesses. game.S.title:: however, does not.",
  "critique-29": "Flawed. Full of heart. Unafraid. game.S.title:: took the ultra-gruff protagonist archetype and tore it to shreds.",
  "critique-30": "The story is like nothing else. Imagine your friend got really, really high while thinking about food and you transcribed their thoughts and handed them to a talented studio with the express orders of turning it all into a game with remarkably good production values.",
  "critique-31": "Make no mistake about it, game.S.title:: is a weird game. It’s wrapped around a concept featuring sentient hat and enemy possession, but actually playing the game feels very familiar.",
  "critique-32": "Its high design masks a surprisingly tense game.S.genre:: game that demands lateral thinking, bold reinvention, and ruthless economics.",
  "critique-33": "The game’s real innovation is its seances, frequently conducted by decoding patches of ominous white noise. Janky, gloomy, and suffused with a dark beauty, game.S.title:: is a true original.",
  "critique-34": "A thrilling ending that dares the player to put their money where their mouth is ensures game.S.title:: holds strong and stable even as it constantly darts forward to its next big thought.",
  "critique-35": "game.S.title|possessive:: story was a watershed moment in narrative design.",
  "critique-36": "The story game.S.title:: told was greater than the sum of its parts and managed to serve as a memorable elegy on the struggles with game.concept::.",
  "critique-37": "It was a game unafraid to examine game.concept:: in smart, nuanced ways.",
  "critique-38": "game.S.title:: served as a scathing critique of the American dream.",
  "critique-39": "game.S.title|possessive:: showed the depth that game narratives were capable of attaining.",
  "critique-40": "The game's game.adjective::, trope-breaking story found immediate and long-lasting acclaim."
};

var model = {
  game: {
    location: ['America', 'Tokyo', 'United States', 'Soviet Russia', 'Boston', 'Britain', 'Egypt', 'Athens', 'Moscow', 'Washington D.C.', 'Hell', 'World War II', 'Medieval Europe', 'rural America', 'City', "Shoshone National Forest", "Maximum Security Prison", "California"],
    setting: ['bizarre', 'post-apocalyptic', 'underwater', 'post-human', 'rundown', 'ruined', 'desolate', 'steampunk', 'silkpunk', 'fantastical', 'dilapidated', 'dystopic', 'intergalactic', 'eldritch', 'ancient', 'medieval', 'cyperpunk', 'fantasy', 'alternate history', 'gothic'],
    genre: ['superhero', 'horror', 'racing', 'puzzle', 'metroidvania', 'arcade', 'side scroller', 'action', 'strategy', 'RPG', 'JRPG', 'RPG-lite', 'sports RPG', 'first person shooter', 'third person shooter', 'visual novel', 'platformer', 'action platformer', 'split-screen co-op', 'simulation', 'action-role playing', 'city-sim', 'flight simulator', 'grand strategy', 'real-time strategy', 'farming', 'walking simulator', 'text adventure', 'adventure', 'action-adventure', 'action sports', 'twin-stick shooter', 'clicker', 'MMO', 'MOBA', 'fighting', 'hockey', 'football', 'MMA', 'character action', 'rhythm', 'open-world', 'point-and-click adventure', 'beat-\'em-up', 'horizontal shoot-\'em-up', 'vertical shooter', 'hero shooter', 'survival horror', 'tower defense', 'CCG', 'action horror', 'arcade racer', 'basketball', 'baseball', 'puzzle', 'puzzle platformer', 'MMORPG', 'survival sim', 'survival', 'roguelike', 'dungeon crawler', 'hack-and-slash'],
    adjective: ['wholesome', 'heartwarming', 'surreal', 'intense', 'spooky', 'grounded', 'deep', 'funny', 'emotional', 'macabre', 'elegant'],
    vocation: ['professional skater', 'plumber', 'astronaut', 'soldier', 'engineer', 'tycoon', 'superhero', 'martial artist', 'painter', 'witcher', 'magician', 'black mage', 'blacksmith', 'shopkeeper', 'gun-for-hire', 'cleric', 'red mage', 'rock star', 'pirate', 'rogue', 'tennis player', 'truck driver', 'driver-for-hire', 'cowboy'],
    concept: ['love', 'motherhood', 'fatherhood', 'war', 'hatred', 'revenge', 'anxiety', 'tragedy', 'death', 'despair', 'depression', 'relationships'],
    personality: ['aging', 'withered', 'young', 'brash', 'stoic', 'brazen', 'happy-go-lucky', 'mindless', 'wizened', 'foolish', 'selfish']
  }
};

var model$1 = {
  site: {
    title: ['Game Informer', 'Polygon', 'GameSpot', 'Waypoint', 'Giant Bomb', 'IGN', 'Electronic Gaming Monthly', 'The Guardian', 'Engadget', 'Time Magazine']
  }
};

var model$2 = {
  art: {
    animation: ['pixel', 'voxel', 'hand-drawn', 'rotosoped', 'cutout', 'procedurally-generated', 'cel-shaded', 'illustrative', 'retro', 'wireframe'],
    dimension: ['2D', '3D', '2.5D'],
    platitude: ['gorgeous', 'minimalist', 'groundbreaking', 'tranquil', 'stylized', 'cinematic', 'detailed', 'atmospheric', 'abstract', 'realistic', 'technically impressive', 'vibrant', 'violent'],
    viewPoint: ['first-person', 'third-person']
  }
};

var generator$1 = function generator(_ref) {
  var title = _ref.title,
      platform = _ref.platform,
      releaseDate = _ref.releaseDate,
      type = _ref.type,
      seed = _ref.seed;

  var model$$1 = Object.assign({}, model, model$1, model$2);
  model$$1.game.title = title;
  model$$1.game.platform = platform;
  model$$1.game.releaseDate = '' + releaseDate;

  var grammar = Object.assign({}, general);
  Object.assign(grammar, review);
  Object.assign(grammar, genre);
  Object.assign(grammar, mobile);
  Object.assign(grammar, singlePlatform);
  Object.assign(grammar, difficulty);
  Object.assign(grammar, plot);
  Object.assign(grammar, critique);
  Object.assign(grammar, features);
  Object.assign(grammar, artStyle);
  Object.assign(grammar, animation);

  var options = ['plot', 'genre', 'general', 'review', 'difficulty', 'features', 'art', 'animation', 'critique'];
  if (platform.length === 1) options.push('singlePlatform');
  if (type === 'mobile') options.push('mobile');

  var descriptors = fns.sample({ array: options, seed: seed, amount: 3 });

  var entry = descriptors.reduce(function (string, option, i) {
    var keyes = Object.keys(grammar);
    var matches = keyes.filter(function (key) {
      return key.match(option, 'g');
    });
    var sampled = fns.sample({ array: matches, seed: seed });
    return i === 0 ? '!' + sampled + '::' : string + ' !' + sampled + '::';
  }, '');

  var schema = { model: model$$1, grammar: grammar };
  var regex = /[^ ]*::/g;

  var generator = new deutung({ entry: entry, schema: schema, seed: seed, regex: regex });
  var result = generator.run();
  return result;
};

var parsedUrl = urlFns.parseUrl();
var isHomePage = parsedUrl.length === 0;

var container = document.querySelector('.container');

if (isHomePage) {
  paintHomePage(container);
} else {
  var _parsedUrl = slicedToArray(parsedUrl, 2),
      siteName = _parsedUrl[0],
      number = _parsedUrl[1];

  var Title = Markov();

  var list = [];
  for (var i = number; i > 0; i--) {
    var seed = siteName + '.' + i + '.' + i * 100 + '.' + i + '.' + siteName;
    var amount = fns.between({ array: [1, 3], seed: seed });
    var title = Title.create({ seed: seed, amount: amount });

    var _systemsGenerator = generator({ seed: seed, title: title }),
        systems$1 = _systemsGenerator.systems,
        releaseDate = _systemsGenerator.releaseDate,
        consoleType = _systemsGenerator.consoleType;

    var text = generator$1({ seed: seed, title: '<span class="emphasis">' + title + '</span>', releaseDate: releaseDate, platform: systems$1, type: consoleType });

    var item = {
      title: title,
      text: text,
      releases: systems$1.reduce(function (str, console, i) {
        return i === 0 ? '' + console : str + ', ' + console;
      }, ''),
      releaseDate: releaseDate,
      number: i
    };

    list.push(item);
  }
  paintListPage({ container: container, list: list, title: siteName, number: number });
  setTimeout(function () {
    document.querySelector("ul").scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

formEvent();
aboutEvent();

}());
