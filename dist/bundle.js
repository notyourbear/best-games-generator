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
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var title = obj.title || 'Not Polygon';
  var number = obj.number || 50;

  return ' <div class=\'form-container\'>\n      <div class="background-logo"></div>\n      <form class=\'form create-best-games\'>\n        <input id=\'title-input\' type=\'text\' name=\'title\' value=\'' + title + '\' autofocus>\n        <div>\n          <span> The </span>\n          <input id=\'amount-input\' type=\'number\' name=\'amount\' value=' + number + '>\n          <span> best games of all time</span>\n        </div>\n        <span> After weeks of voting and arguments, we\u2019re ready to present our choices </span>\n        <input id=\'submit-input\' type=\'submit\' name=\'submit\' value=\'View Now\'>\n     </form>\n     </div>';
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

var titles = ["Sea of Thieves", "R.B.I Baseball 18", "Attack on Titan 2", "Assault Gunners HD Edition", "Assassin's Creed Rogue: Remastered", "Kirby Star Allies", "Burnout Paradise Remastered", "Surviving Mars", "Gal Gunvolt Burst", "Q.U.B.E. 2", "Devil May Cry HD Collection", "Flinthook", "Warhammer: Vermintide 2", "Chuchel", "Damascus Gear: Operation Osaka", "Scribblenauts Showdown", "Frantics", "Final Fantasy XV", "Fear Effect Sedna", "DJMax Respect", "Bravo Team", "Pit People", "H1Z1", "Darkest Dungeon", "Payday 2", "Moss", "Heroine Anthem Zero", "Gravel", "Girls and Panzer: Dream Tank Match", "De Blob 2 Remastered", "Part Time UFO", "Yume Nikki: Dream Diary", "Sword Art Online: Fatal Bullet", "Past Cure", "Pac-Man Championship Edition 2 Plus", "Metal Gear Survive", "Armored Warfare", "Age of Empires: Definitive Edition", "Fe", "Bayonetta", "Bayonetta 2", "Secret of Mana", "A Certain Magical Virtual-On", "The Legend of Heroes: Trails of Cold Steel II", "The Legend of Heroes: Trails of Cold Steel", "The Longest 5 Minutes", "Radiant Historia: Perfect Chronology", "Owlboy", "Monster Energy Supercross: The Official", "Kingdom Come: Deliverance", "Dynasty Warriors 9", "Under Night In-Birth Exe: Late[st]", "The Seven Deadly Sins: Knights of Britannia", "Dragon Quest Builders", "Rust", "Octogeddon", "Civilization VI: Rise and Fall", "Shadow of the Colossus", "Marooners", "We Were Here Too", "Gundemoniums", "EA Sports UFC 3", "SteamWorld Dig", "Sky Force Reloaded", "Night in the Woods", "Dissidia Final Fantasy NT", "Monster Hunter: World", "Dragon Ball FighterZ", "Celeste", "The Inpatient", "Subnautica", "Lost Sphear", "Iconoclasts", "Kirby Battle Royale", "World to the West", "Gintama Rumble", "Darkest Dungeon", "Street Fighter V Arcade Edition", "Kerbal Space Program: Enhanced Edition", "InnerSpace", "The Escapists 2", "The Escapists", "Valkyria Chronicles 4", "A Way Out", "Detective Pikachu", "Atelier Lydie & Suelle: The Alchemists and the Mysterious Paintings", "Far Cry 5", "Far Cry 4", "Far Cry 3", "MLB The Show 18", "Long Gone Days", "Shining Resonance Refrain", "Shining Force", "Shining in the Dark", "Super Robot Wars X", "Dark Rose Valkyrie", "Extinction", "God of War", "Nintendo Labo Variety Kit", "Nintendo Labo Robot Kit", "Adventure Time: Pirates of the Enchiridion", "Frostpunk", "South Park: The Fractured but Whole", "BattleTech", "Donkey Kong Country: Tropical Freeze", "Pillars of Eternity II: Deadfire", "Conan Exiles", "Hyrule Warriors: Definitive Edition", "State of Decay 2", "Dark Souls Remastered", "Detroit: Become Human", "Vampyr", "Street Fighter 30th Anniversary Collection", "Full Metal Panic! Fight: Who Dares Wins", "Sushi Striker: The Way of Sushido", "Jurassic World Evolution", "Mario Tennis Aces", "The Crew 2", "Captain Toad: Treasure Tracker", "Octopath Traveler", "WarioWare Gold", "Shadow of the Tomb Raider", "Call of Duty: Black Ops 4", "Red Dead Redemption 2", "Red Dead Redemption", "Anno 1800", "Call of Cthulhu", "Catherine: Full Body", "Concrete Genie", "Pony Island", "Amplitude", "Hardware: Rivals", "Volume", "Punch Club", "Lovely Planet", "Assassin's Creed Chronicles: India", "Gemini: Heroes Reborn", "Gone Home: Console Edition", "The Banner Saga", "That Dragon, Cancer", "Dragon's Dogma: Dark Arisen", "A Boy and His Blob", "Darkest Dungeon", "Oddworld: New 'n' Tasty!", "Resident Evil Zero HD Remaster", "The Deadly Tower of Monsters", "World of Tanks", "Homeworld: Deserts of Kharak", "Minecraft: Story Mode: Episode 1 — The Order of the Stone", "The Westport Independent", "Mario & Luigi: Paper Jam", "Lego Marvel's Avengers", "The Witness", "Rise of the Tomb Raider", "Bombshell", "This War of Mine: The Little Ones", "American Truck Simulator", "Digimon Story: Cyber Sleuth", "Megadimension Neptunia VII", "Tales of Symphonia HD", "Agatha Christie: The ABC Murders", "Assassin's Creed Chronicles: Russia", "XCOM 2", "Final Fantasy IX", "Lovers in a Dangerous Spacetime", "Naruto Shippuden: Ultimate Ninja Storm 4", "Grand Theft Auto: Liberty City Stories Mobile", "Pillars of Eternity: The White March Part 2", "Project X Zone 2", "The Escapists: The Walking Dead", "Rocket League", "Danganronpa: Trigger Happy Havoc", "Far Cry Primal", "Plants vs. Zombies: Garden Warfare 2", "The Flame in the Flood", "Gears of War: Ultimate Edition", "The Witch and the Hundred Knight: Revival Edition", "Heavy Rain", "BlazBlue: Chrono Phantasma Extend", "Black Desert Online", "The Legend of Zelda: Twilight Princess HD", "Tom Clancy's The Division", "Shadow Complex Remastered", "XCOM: Enemy Unknown", "Adventure Time: Magic Man's Head Games", "Keep Talking and Nobody Explodes", "Minecraft: Story Mode Episode 5 — Order Up!", "Ashes of the Singularity", "Sleeping Dogs: Definitive Edition", "1979 Revolution: Black Friday", "Sorcery! Part 3: The Seven Serpents", "Skullgirls 2nd Encore", "Everybody's Gone to the Rapture", "Dark Souls III", "Loud on Planet X", "The Banner Saga 2", "The Banner Saga", "Hyperdevotion Noire: Goddess Black Heart", "Stranger of Sword City", "Offworld Trading Company", "Uncharted 4: A Thief's End", "Shadow of the Beast", "Total War: Warhammer", "Dead Island: Definitive Edition", "Hearts of Iron IV", "Guilty Gear Xrd -Revelator-", "Sherlock Holmes: The Devil's Daughter", "Deadlight: Director’s Cut", "Mario & Sonic at the Rio 2016 Olympic Games", "Lost Sea", "Crypt of the Necrodancer Pocket Edition", "Crypt of the Necrodancer", "Romance of the Three Kingdoms XIII", "Assault Suit Leynos", "Mobile Suit Gundam: Extreme VS Force", "Kerbal Space Program", "Batman: Arkham Underworld", "Earth Defense Force 4.1: The Shadow of New Despair", "Kentucky Route Zero Act 4", "Fairy Fencer F: Advent Dark Force", "Stardew Valley", "Xblaze: Lost Memories", "The Girl and the Robot", "Master of Orion: Conquer the Stars", "Star Trek Online", "Pro Evolution Soccer 2017", "The Witness", "NBA 2K17", "NBA 2K14", "NBA 2K12", "NBA 2K9", "NBA 2K10", "FIFA 17", "FIFA 2007", "FIFA 08", "FIFA 15", "FIFA 12", "FIFA 98", "NFL Blitz", "Call of Cthulhu: The Wasted Land", "Double Fine Happy Action Theater", "Kingdoms of Amalur: Reckoning", "Shank 2", "Shank", "Jagged Alliance: Back in Action", "Tales of the Abyss", "Grand Slam Tennis 2", "Crusader Kings II", "Dear Esther", "Little Deviants", "Metal Gear Solid: Snake Eater 3D", "Dynasty Warriors Next", "Hot Shots Golf: World International", "Lumines: Electronic Symphony", "Wipeout 2048", "Shin Megami Tensei: Devil Survivor 2", "Vessel", "MLB 12: The Show", "Street Fighter X Tekken", "Mario Party 9", "Dungeon Defenders", "Total War: Shogun 2 – Fall of the Samurai", "Rayman Origins", "BioShock 2", "BioShock", "BioShock Infinite", "The House of the Dead 4", "Insanely Twisted Shadow Planet", "The Witcher 2: Assassins of Kings Enhanced Edition", "Port Royale 3: Pirates & Merchants", "Diablo III", "Diablo 2", "Diablo", "Mario Tennis Open", "Resident Evil: Operation Raccoon City", "Metal Gear Solid HD Collection", "Pokémon Conquest", "Civilization V: Gods & Kings", "Tom Clancy's Ghost Recon: Future Soldier", "Final Fantasy III", "The Amazing Spider-Man", "Tony Hawk's Pro Skater HD", "Growlanser Wayfarer of Time", "Persona 4 Arena", "Persona 4", "The Last Story", "Madden NFL 13", "Rock Band Blitz", "Anomaly: Warzone Earth", "Tekken Tag Tournament 2", "Torchlight II", "Torchlight", "Tokyo Jungle", "Marvel vs. Capcom Origins", "Dishonored", "RollerCoaster Tycoon 3D", "Carmageddon", "The Witcher 2: Assassins of Kings", "Medal of Honor: Warfighter", "Assassin's Creed III", "Ragnarok Tactics", "Paper Mario: Sticker Star", "Thomas Was Alone", "Epic Mickey: Power of Illusion", "Virtua Fighter 2", "Legacy of Kain: Soul Reaver", "Grand Theft Auto: San Andreas", "Final Fantasy IV", "Oddworld: Munch's Oddysee", "Divinity II: Ego Draconis", "Bayonetta", "Vandal Hearts: Flames of Judgment", "Mass Effect 2", "No More Heroes 2: Desperate Struggle", "S.T.A.L.K.E.R.: Call of Pripyat", "Deadly Premonition", "Risen", "Napoleon: Total War", "MLB 2K10", "Final Fantasy XIII", "God of War III", "Dead or Alive Paradise", "Mega Man 10", "Flotilla", "Monster Hunter Tri", "Alan Wake", "UFC 2010", "River City Soccer Hooligans", "Prince of Persia: The Forgotten Sands", "Ninety-Nine Nights II", "Singularity", "StarCraft II: Wings of Liberty", "Madden NFL 11", "Victoria 2", "Victoria", "Mafia II", "Mafia 3", "Phantasy Star II", "Phantasy Star IV", "Spider-Man: Shattered Dimensions", "Lost Horizon", "Front Mission Evolved", "Final Fantasy XIV", "Quantum Theory", "Castlevania: Lords of Shadow", "NBA Jam", "Lost Planet 2", "Sonic the Hedgehog 4: Episode 1", "Naruto Shippuden: Ultimate Ninja Storm 2", "Fallout: New Vegas", "Vanquish", "Fable III", "FIFA Manager 11", "God of War: Ghost of Sparta", "The Penguins of Madagascar", "Football Manager 2011", "Assassin's Creed: Brotherhood", "Pac-Man Party", "Tom Clancy's Ghost Recon", "Need for Speed: Hot Pursuit", "Gran Turismo 5", "Golden Sun: Dark Dawn", "Super Meat Boy", "World of Warcraft: Cataclysm", "Secret of Mana", "Saints Row 2", "Street Fighter IV", "Star Ocean: The Last Hope", "Warhammer 40,000: Dawn of War II", "Empire: Total War", "The Maw", "Resident Evil 5", "Valkyrie Profile: Covenant of the Plume", "Suikoden Tierkreis", "The Last Remnant", "Ninja Blade", "Dynasty Warriors: Gundam 2", "inFamous", "Gunstar Heroes", "Anno 1404", "Overlord: Dark Legend", "Overlord II", "Call of Juarez: Bound in Blood", "BlazBlue: Calamity Trigger", "Tales of Monkey Island", "Resident Evil 4", "Rez", "Mobile Suit Gundam: Zeonic Front", "Medal of Honor: Allied Assault", "MotoGP 2", "PaRappa the Rapper 2", "Grandia II", "Sonic Advance", "Super Mario Advance 2: Super Mario World", "Star Wars: Racer Revenge", "Zone of the Enders: The Fist of Mars", "Tony Hawk's Pro Skater 3", "Dungeon Siege", "The Elder Scrolls III: Morrowind", "Tactics Ogre: The Knight of Lodis", "Dragon Ball Z: The Legacy of Goku", "Looney Tunes: Space Race", "The House of the Dead III", "Digimon World 3", "Neverwinter Nights", "Shantae", "Warcraft III: Reign of Chaos", "Duke Nukem Advance", "Medieval: Total War", "Armored Core 3", "Armored Core", "Battlefield 1942", "Mega Man Zero", "Kingdom Hearts", "Dynasty Tactics", "Divine Divinity", "Super Mario Advance 3: Yoshi's Island", "Spyro 2: Season of Flame", "Hitman 2: Silent Assassin", "Virtua Tennis", "Mario Party 4", "Suikoden III", "NHL 2K3", "MechAssault", "Tom Clancy's Splinter Cell", "Ninja Assault", "Star Wars Jedi Knight II: Jedi Outcast", "Steel Battalion", "Gauntlet: Dark Legacy", "Final Fantasy Tactics", "Xenogears", "Yoshi's Story", "SaGa Frontier", "Panzer Dragoon Saga", "Star Ocean: The Second Story", "Commandos: Behind Enemy Lines", "Heart of Darkness", "Parasite Eve", "Caesar III", "Pokémon Blue", "Pokémon Red", "Pokémon Yellow", "Half-Life", "The Legend of Zelda: Ocarina of Time", "Star Wars: Rogue Squadron", "Baldur's Gate", "Falcon 4.0", "Civilization II", "Super Mario 64", "Star Ocean", "Tekken 2", "Madden NFL 97", "Master of Orion II", "Command & Conquer: Red Alert", "Dead or Alive", "Dragon Force", "Bust-a-Move", "Battle Arena Toshinden", "Chrono Trigger", "Super Bomberman 3", "Bomberman", "Twisted Metal", "Warcraft II: Tides of Darkness", "Tales of Phantasia", "World of Warcraft: The Burning Crusade", "Europa Universalis III", "Sonic the Hedgehog", "Jade Empire", "Theme Park", "S.T.A.L.K.E.R.: Shadow of Chernobyl", "Medal of Honor: Vanguard", "Command & Conquer 3: Tiberium Wars", "Guitar Hero II", "Guitar Hero", "Pokémon Pearl", "Pokémon Diamond", "Odin Sphere", "Mario Party 8", "Overlord", "Pokémon Battle Revolution", "Super Stardust HD", "Dynasty Warriors DS: Fighter's Battle", "Shin Megami Tensei: Persona 3", "The Settlers II", "Medieval II: Total War: Kingdoms", "Warhawk", "Medal of Honor: Airborne", "Skate", "Neverwinter Nights 2: Mask of the Betrayer", "Project Gotham Racing 4", "The Legend of Spyro: The Eternal Night", "Syphon Filter: Logan's Shadow", "Final Fantasy Tactics: The War of the Lions", "FIFA Soccer 08", "Half-Life 2", "Team Fortress 2", "Team Fortress", "Age of Empires III: The Asian Dynasties", "The Eye of Judgment", "Hellgate: London", "The Witcher", "Viva Piñata: Party Animals", "Fire Emblem: Radiant Dawn", "Call of Duty 4: Modern Warfare", "Silent Hill: Origins", "Super Mario Galaxy", "Enchanted", "Medal of Honor: Heroes 2", "WWE SmackDown vs. Raw 2008", "Kane & Lynch: Dead Men", "Orcs & Elves", "SimCity Societies", "Assassin's Creed", "Unreal Tournament 3", "Mass Effect", "Psychonauts", "Nights: Journey of Dreams", "SimCity 4", "Devil May Cry 2", "Dead or Alive Xtreme Beach Volleyball", "Capcom vs. SNK EO", "Tom Clancy's Splinter Cell", "Dark Cloud 2", "Dark Cloud", "Freelancer", "Pokémon Ruby and Sapphire", "Amplitude", "Batman: Dark Tomorrow", "Dragon Ball Z: Ultimate Battle 22", "Midnight Club II", "Burnout 2: Point of Impact", "Golden Sun: The Lost Age", "Ikaruga", "Castlevania: Aria of Sorrow", "Rise of Nations", "Midnight Club II", "Wario World", "Arc the Lad: Twilight of the Spirits", "Warcraft III: The Frozen Throne", "WWE Wrestlemania XIX", "Anarchy Online: The Shadowlands", "Homeworld 2", "Homeworld", "Freedom Fighters", "Viewtiful Joe", "Time Crisis 3", "Tony Hawk's Underground", "Fire Emblem", "Onimusha Tactics", "Monster Rancher 4", "Monster Rancher 3", "Counter-Strike", "Prince of Persia: The Sands of Time", "Victoria: An Empire Under the Sun", "Beyond Good & Evil", "1080° Avalanche", "Silent Hill 3", "Saints Row 2", "Mirror's Edge", "Moon", "Skate 2", "Flower", "Halo Wars", "Killzone 2", "Killzone", "Tomb Raider: Underworld", "Let's Golf", "Resident Evil 5", "Mega Man 2", "Worms", "Sacred 2: Fallen Angel", "Punch-Out", "inFamous", "Red Faction: Guerrilla", "Anno 1404", "Blood Bowl", "NCAA Football 10", "Battlefield 1943", "Shatter", "Fat Princess", "Trials HD", "Madden NFL 10", "Metroid Prime", "Tomb Raider II", "Fate/unlimited codes", "IL-2 Sturmovik: Birds of Prey", "Mario & Luigi: Bowser's Inside Story", "Streets of Rage", "Scribblenauts", "Marvel: Ultimate Alliance", "Marvel: Ultimate Alliance 2", "Professor Layton and the Diabolical Box", "Kingdom Hearts 358/2 Days", "Canabalt", "Fieldrunners", "UmJammer Lammy", "Half-Minute Hero", "Brütal Legend", "Machinarium", "Tropico 3", "Trine", "Oddworld: Abe's Exoddus", "Borderlands", "Forza Motorsport 3", "Tekken 6", "Bayonetta", "Ninja Blade", "Dragon Age: Origins", "Jak and Daxter: The Lost Frontier", "Call of Duty: Modern Warfare", "Assassin's Creed: Bloodlines", "Angry Birds", "Uncharted 2: Among Thieves", "Minecraft", "Batman: Arkham Asylum", "Forza Motorsport 3", "Forza Motorsport 2", "Retro City Rampage", "The Cave", "Wrath of the White Witch", "Skulls of the Shogun", "Fire Emblem Awakening", "Sly Cooper: Thieves in Time", "Crysis 3", "Crysis 2", "Crysis", "Metal Gear Rising: Revengeance", "Super Hexagon", "SimCity", "Hotline Miami", "Terraria", "Canabalt HD", "Wizorb", "Ninja Gaiden 3: Razor's Edge", "Age of Empires II: HD Edition", "Motocross Madness", "Gemini Rue", "Surgeon Simulator 2013", "Dragon's Dogma: Dark Arisen", "Carmageddon", "Dragon's Lair", "Ratchet & Clank: Full Frontal Assault", "Limbo", "Neverwinter", "TowerFall", "Rogue Legacy", "Crazy Taxi", "Dynasty Warriors 8", "Dropchord", "Dragon's Crown", "Tales of Xillia", "Mario & Luigi: Dream Team", "Gone Home", "Plants vs. Zombies 2: It's About Time", "Final Fantasy XIV: A Realm Reborn", "Valhalla Knights 3", "Battlefield 4", "Crimson Dragon", "Dead Rising 3", "Madden NFL 25", "Peggle 2", "Peggle", "The Stanley Parable", "Dr. Luigi", "Dota 2", "Rayman Legends", "Army of Two: The 40th Day", "Chronos Twins DX", "Dark Void", "Silent Hill: Shattered Memories", "White Knight Chronicles", "Shiren the Wanderer", "Dynasty Warriors: Strikeforce", "Risen", "Rayman 2", "Lunar: Silver Star Harmony", "Infinite Space", "Dragon Age: Origins - Awakening", "Perfect Dark", "Cave Story", "Just Cause 2", "Flotilla", "Dark Void Zero", "Lost Planet 2", "Split Second: Velocity", "Blue Dragon: Awakened Shadow", "Phoenix Wright: Ace Attorney", "Super Mario Galaxy 2", "Blur", "Alpha Protocol", "Dune II", "Mega Man 4", "Ultima Underworld: The Stygian Abyss", "Kirby's Dream Land", "Super Mario Kart", "Virtua Racing", "Mortal Kombat", "Star Control II", "Star Control", "Sonic the Hedgehog 2", "Alone in the Dark", "The Legend of Zelda: A Link to the Past", "Metroid II: Return of Samus", "F-Zero", "Alien Breed", "Lemmings", "Another World", "Snake's Revenge", "Smash TV", "Ultima VI: The False Prophet", "Metal Gear 2: Solid Snake", "Dr. Mario", "Wing Commander", "Super Mario World", "Commander Keen", "Railroad Tycoon", "DuckTales", "Teenage Mutant Ninja Turtles", "Mother", "Castlevania III: Dracula's Curse", "Tetris", "Minesweeper", "Shadow of the Beast", "Altered Beast", "Ninja Gaiden", "Ghouls 'n Ghosts", "Double Dragon II: The Revenge", "Mario Kart 64", "Vandal Hearts", "The Last Express", "Harvest Moon", "Breath of Fire III", "Fallout", "Panzer General II", "Total Annihilation", "Crash Bandicoot 2: Cortex Strikes Back", "Diddy Kong Racing", "Bomberman 64", "Wing Commander: Prophecy", "Cyberpunk 2077", "Death Stranding", "Evil Genius 2", "Evil Genius", "Metroid Prime 4", "Ori and the Will of the Wisps", "Unreal Tournament", "The Talos Principle 2", "The Talos Principle", "System Shock 3", "Spelunky 2", "Spelunky", "Serious Sam 4", "Serious Sam 2", "Mount & Blade II: Bannerlord", "Mount & Blade", "Quake Champions", "Quake", "Total War: Arena", "The Sinking City", "Terraria: Otherworld", "Gintama Rumble", "SteamWorld Dig", "Rust", "Pac-Man Championship Edition 2 Plus", "Conan Exiles", "Donkey Kong Country: Tropical Freeze", "State of Decay 2", "State of Decay", "Call of Duty: Black Ops 4", "Concrete Genie", "Crackdown 3", "Crackdown 2", "Crackdown", "DayZ", "Fortnite", "Metro Exodus", "Ōkami HD", "Ōkami", "Shenmue III", "Shenmue II", "Shenmue", "Soulcalibur VI", "Soulcalibur", "Soulcalibur 4", "Sunless Skies", "Total War Saga: Thrones of Britannia", "We Happy Few", "Xenonauts 2", "World of Warcraft: Battle for Azeroth", "Wolfenstein II: The New Colossus", "Wolfenstein", "Wargroove", "Rampage", "Gravity Rush 2", "Dragon Quest VIII: Journey of the Cursed King", "Pokémon Duel", "Resident Evil 7: Biohazard", "Fire Emblem Heroes", "Poochy & Yoshi's Woolly World", "Husk", "Nioh", "WWE 2K17", "For Honor", "Sniper Elite 4", "Halo Wars 2", "Psychonauts in the Rhombus of Ruin", "Torment: Tides of Numenera", "Little Inferno", "Snipperclips", "The Binding of Isaac: Afterbirth+", "The Legend of Zelda: Breath of the Wild", "World of Goo", "Nier: Automata", "Tom Clancy's Ghost Recon Wildlands", "Ultimate Marvel vs. Capcom 3", "Mass Effect: Andromeda", "Rain World", "Thimbleweed Park", "Drawn to Death", "Persona 5", "Cosmic Star Heroine", "Full Throttle Remastered", "Full Throttle", "Cities: Skylines", "Syberia III", "What Remains of Edith Finch", "Expeditions: Vikings", "Mario Kart 8 Deluxe", "The Legend of Heroes: Trails in the Sky the 3rd", "To the Moon", "Injustice 2", "Phantom Dust Remaster", "Phantom Dust", "Thumper", "Chroma Squad", "Fire Emblem Echoes: Shadows of Valentia", "Shadow Warrior 2", "Vanquish", "Rime", "Guilty Gear Xrd Rev.2", "Star Trek: Bridge Crew", "Tokyo 42", "Dirt 4", "Dirt 3", "Farming Simulator 18", "Arms", "Valkyria Revolution", "Final Fantasy XII: The Zodiac Age", "Splatoon 2", "Splatoon", "Fable Fortune", "Pyre", "Tacoma", "Hellblade: Senua's Sacrifice", "LawBreakers", "Nidhogg 2", "Sonic Mania", "Undertale", "Uncharted: The Lost Legacy", "Absolver", "Ark: Survival Evolved", "ReCore Definitive Edition", "Windjammers", "Destiny 2", "Destiny", "Divinity: Original Sin II", "Divinity: Original Sin", "NHL 18", "NBA Live 18", "Dishonored: Death of the Outsider", "Dishonored", "NBA 2K18", "Guild Wars 2: Path of Fire", "Hob", "Total War: Warhammer II", "Cuphead", "Star Fox 2", "Star Fox", "Layton's Mystery Journey", "Oxenfree", "Megaton Rainfall", "The Mummy Demastered", "Assassin's Creed: Origins", "Super Mario Odyssey", "Hand of Fate 2", "Doom", "Batman: The Telltale Series", "L.A. Noire", "Rocket League", "Pokémon Ultra Sun and Ultra Moon", "Xenoblade Chronicles 2", "Xenoblade Chronicles", "Never Stop Sneakin'", "Romancing SaGa 2", "Oddworld: Soulstorm", "Way of the Passive Fist", "Punch Club 2: Fast Forward", "Death’s Gambit", "Warhammer Quest", "WWE Immortals", "Blackguards 2", "Ironclad Tactics", "Resident Evil HD Remaster", "Heroes of Might and Magic III: HD Edition", "Grow Home", "Evolve", "Monster Hunter 4 Ultimate", "Dead or Alive 5 Last Round", "The Sims 4", "The Book of Unwritten Tales 2", "The Book of Unwritten Tales", "The Order: 1886", "Homeworld Remastered Collection", "Homeworld", "DmC: Definitive Edition", "Ori and the Blind Forest", "Sid Meier's Starships", "Code Name: S.T.E.A.M.", "Jamestown+", "Mario Party 10", "Bloodborne", "Metal Slug 3", "Dark Souls II: Scholar of the First Sin", "Bastion", "Mortal Kombat X", "Titan Souls", "EA Sports UFC", "Monument Valley", "Invisible, Inc.", "Geometry Wars 3: Dimensions", "Heroes of the Storm", "Transistor", "Fallout Shelter", "PlanetSide 2", "Dragon Quest VI: Realms of Revelation", "Infinifactory", "Samurai Warriors Chronicles 3", "Skullgirls 2nd Encore", "The Fall", "Lost Dimension", "Brothers: A Tale of Two Sons", "Armello", "Year Walk", "80 Days", "Might & Magic Heroes VII", "Lost Horizon 2", "Rebel Galaxy", "Guitar Hero Live", "PixelJunk Shooter Ultimate", "Tales of Zestiria", "Galak-Z: The Dimensional", "Anno 2205", "Assassin's Creed Syndicate", "Helldivers", "SteamWorld Heist", "Metal Gear Solid V: The Phantom Pain", "The Witcher 3: Wild Hunt", "Journey", "Shovel Knight", "Fallout 4", "Star Wars Battlefront", "Ballblazer", "Arkanoid", "Advance Wars 2: Black Hole Rising", "Dragon Age: Inquisition", "Super Meat Boy", "F-Zero", "Wipeout", "Bully", "Alone in the Dark", "Spider-Man 2", "Space Channel 5", "Cave Story", "Ori and the Blind Forest", "Fable 2", "Star Fox 64", "Company of Heroes", "Batman: Arkham Asylum", "Marble Madness", "Nine Hours, Nine Persons, Nine Doors", "Gravity Rush", "Firewatch", "Aladdin", "Ninja Gaiden", "TimeSplitters 2", "GoldenEye 007", "Railroad Tycoon", "The Chronicles of Riddick: Escape From Butcher Bay", "Donkey Kong Jr.", "River City Ransom", "Picross 3D", "Electroplankton", "Plants vs. Zombies", "Boulder Dash", "The Witcher 2: Assassins of Kings", "Professor Layton and the Unwound Future", "Hitman Go", "Final Fantasy X", "Sonic Colors", "Wolfenstein: The New Order", "Psi-Ops: The Mindgate Conspiracy", "Jetpack Joyride", "Super Castlevania 4", "Need for Speed: Most Wanted", "WWF No Mercy", "Devil May Cry", "Indiana Jones And The Fate Of Atlantis", "Galaxian", "Space Invaders", "Bejeweled", "Snatcher", "Qix", "Power Stone 2", "Gran Turismo", "Missile Command", "Military Madness", "Metro 2033", "Fire Emblem Fates", "Sid Meier's Alpha Centauri", "Grim Fandango", "The Elder Scrolls IV: Oblivion", "Rhythm Heaven", "Drop7", "Kingdom Rush", "Power Stone", "Legacy of Kain: Soul Reaver", "Deus Ex Machina", "Thief: The Dark Project", "Star Wars Knights of the Old Republic 2: The Sith Lords", "Tiger Woods PGA Tour 12", "LittleBigPlanet", "Mirror's Edge", "Braid", "Frogger", "Wizardry: Proving Grounds of the Mad Overlord", "Silent Hill", "Jumpman Junior", "International Karate +", "Fire Emblem Awakening", "Devil's Crush", "Beatmania", "Ant Attack", "Lumines", "Metal Gear Solid 4: Guns of the Patriots", "Paper Mario: The Thousand Year Door", "Daytona USA", "FTL: Faster Than Light", "Star Wars: X-Wing", "Super Mario Land 2: Six Golden Coins", "Castle Crashers", "Joust", "Contra 3: The Alien Wars", "Fantastic Contraption", "Balance of Power", "Stunt Car Racer", "Return to Castle Wolfenstein", "Max Payne 2", "Dungeons and Dragons: Pool of Radiance", "Yakuza 0", "Threes", "Quadrilateral Cowboy", "Populous", "Hot Shots Golf", "Deus Ex", "The Legend of Zelda: Majora's Mask", "Samurai Shodown", "Marvel vs. Capcom: Clash of Super Heroes", "Lunar Lander", "Gunpoint", "Dungeon Keeper", "Descent", "Battlezone", "Ikaruga", "Breakout", "Super Smash Bros. Brawl", "Towerfall", "Chrono Cross", "Age of Empires", "Tempest", "Tempest 2000", "Day of the Tentacle", "The Legend of Zelda: A Link Between Worlds", "Thief: Deadly Shadows", "The World Ends With You", "Sonic CD", "Proteus", "God Hand", "Assassin's Creed 4: Black Flag", "Kirby's Dreamland", "Gauntlet", "Super Mario Sunshine", "Mario 64", "Max Payne", "Ico", "Wasteland", "Ultima 7: The Black Gate", "Tenchu: Stealth Assassins", "Shadow Hearts: Covenant", "Quake 3: Arena", "Phoenix Wright: Ace Attorney", "Marvel vs. Capcom 2: New Age of Heroes", "Heroes of Might and Magic 3", "Fatal Frame 2", "Sonic The Hedgehog 2", "Fez", "Demon's Souls", "Donkey Kong Country", "King's Quest", "Maniac Mansion", "Secret of Monkey Island", "Castlevania 3: Dracula's Curse", "The Jackbox Party Pack", "Castlevania", "X-COM: UFO Defense", "Monster Hunter Generations", "Flashback", "Soulcalibur", "Tomb Raider", "Jet Grind Radio", "Warcraft 2: Tides of Darkness", "Burnout Revenge", "Zero Escape: Virtue's Last Reward", "WarioWare: Twisted!", "Street Fighter Alpha 3", "Mini Metro", "Metal Gear Solid V: The Phantom Pain", "Mega Man X", "WarioWare, Inc.: Mega Microgames!", "Metal Gear Solid 3: Snake Eater", "Bushido Blade 2", "Animal Crossing", "30 Flights of Loving", "Overwatch", "Mario Kart 64", "Dragon's Dogma", "Myst", "P.T.", "City of Heroes", "StarCraft 2: Wings of Liberty", "Vagrant Story", "System Shock 2", "Superhot VR", "Streets of Rage 2", "Planescape Torment", "Monster Hunter Ultimate 4", "Giants: Citizen Kabuto", "Galaga", "Dragon Quest 8: Journey of the Cursed King", "Defender", "Castlevania: Aria of Sorrow", "Geometry Wars", "Wolfenstein 3D", "The Legend of Zelda: Link's Awakening", "No One Lives Forever", "Super Smash Bros.", "EverQuest", "The Oregon Trail", "Phantasy Star Online", "Kirby's Adventure", "Hearthstone", "Kirby: Canvas Curse", "Vampire the Masquerade - Redemption", "Rock Band", "Uncharted 2: Among Thieves", "Mike Tyson's Punch Out!!", "Diablo", "Device 6", "Hitman: Blood Money", "Super Mario Maker", "Papers, Please", "Burnout Paradise", "Elite", "Warlords", "The Sentinel", "Manic Miner", "Robotron: 2084", "Dragon Warrior", "Eve Online", "Metroid", "NetHack", "Doom 2", "Katamari Damacy", "Portal", "Portal 2", "Adventure", "Star Wars: Knights of the Old Republic", "Guild Wars 2", "Space Invaders", "Secret of Mana", "M.U.L.E.", "Habitat", "Ultima Online", "The Elder Scrolls 5: Skyrim", "Burnout 3: Takedown", "Harvest Moon", "League of Legends", "Splinter Cell: Chaos Theory", "Madden NFL 2005", "ESPN NFL 2K5", "Pong", "NHL '94", "Elite Beat Agents", "SimCity 2000", "Dance Dance Revolution", "Half-Life", "Football Manager", "Quest for Glory: So You Want to Be a Hero", "The Sims", "Halo: Combat Evolved", "Wii Sports", "The Legend of Zelda: Ocarina of Time", "Zork", "Gone Home", "Spelunky", "EarthBound", "NBA Jam", "Metal Gear Solid", "Dwarf Fortress", "Rogue", "FIFA 12", "Castlevania: Symphony of the Night", "SimCity", "StarCraft", "Final Fantasy 6", "Super Metroid", "Street Fighter 2", "Ms. Pac-Man", "Yakuza 6: The Song of Life", "Rogue Aces", "Time Carnage", "Bombslinger", "Masters of Anima", "The Bunker", "Empires Apart", "Minit", "Dead in Vineland", "Kirby Battle Royale", "Umiro", "Shadowgun Legends", "Death Coming", "The Bonfire: Forsaken Lands", "The Sims Mobile", "Read Only Memories: Type-M", "Alto's Odyssey", "Evoland 2", "The Room: Old Sins", "Hero Academy 2", "Slime Pizza", "World of Warships Blitz", "Thumper: Pocket Edition", "Dissembler", "Vandals", "Fat Dragons", "Machine Knight", "Impact Winter", "World of Tanks: War Stories", "Tempest 4000", "Revenant Kingdom", "Titan Quest", "The Council - Episode 1: The Mad Ones", "Way of the Passive Fist", "Life is Strange: Before the Storm - Farewell", "Pirates: All Aboard!", "Eternal Edge", "Shelter Generations", "Spartan", "Outlast 2", "Tesla vs Lovecraft", "Scribblenauts Showdown", "Subsurface Circular"];

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
}(commonjsGlobal, (function () { var compiler = function compiler(grammar, replacementsArray) {
  var regex = /::\.|[^ ]*::/;
  var string = grammar;

  return replacementsArray.reduce(function (result, replacement) {
    return result.replace(regex, replacement);
  }, string);
};

var commonjsGlobal$$1 = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

function commonjsRequire$$1 () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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
  var rng = seed ? seedrandom$2(seed) : seedrandom$2();
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

var fns = {
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

var sample$1 = fns.sample;

var Model = function Model(schema) {
  var fnHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var seed = arguments[2];

  var keys = Object.keys(schema);
  return keys.reduce(function (state, key) {
    if (schema[key][0] === '|') {
      var _schema$key$slice$spl = schema[key].slice(1).split(':'),
          _schema$key$slice$spl2 = _slicedToArray(_schema$key$slice$spl, 2),
          fn = _schema$key$slice$spl2[0],
          input = _schema$key$slice$spl2[1];

      state[key] = fnHash[fn] ? fnHash[fn](input, seed) : schema[key];
    } else {
      state[key] = sample$1(schema[key], seed);
    }

    return state;
  }, {});
};

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// --------------------------------------------------------------
var modeler = function modeler(toParseArray) {
  var modelerOptions = {
    modCha: ['model', 'character', 'property', 'modifier'],
    mod: ['model', 'property', 'modifier'],
    cha: ['model', 'character', 'property'],
    gen: ['model', 'property']
  };

  return toParseArray.map(function (model) {
    if (model.type === 'helper' || model.type === 'grammar') return model;

    var keys = void 0;
    if (model.type === 'modifiedModel') {
      keys = model.toParse.length === 4 ? modelerOptions.modCha : modelerOptions.mod;
    } else {
      keys = model.toParse.length === 3 ? modelerOptions.cha : modelerOptions.gen;
    }

    return keys.reduce(function (result, key, index) {
      result[key] = model.toParse[index];
      return Object.assign({}, result, { type: 'model' });
    }, {});
  });
};
// --------------------------------------------------------------
var regexer = function regexer(grammar) {
  var regex = /::\.|[^ ]*::/g;
  var result = grammar.match(regex);
  return result === null ? [] : result;
};
// --------------------------------------------------------------
var propType = function propType(props) {
  switch (true) {
    case props[0][0] === '|':
      return 'helper';
    case props[0][0] === '!':
      return 'grammar';
    case props[props.length - 1].includes('|'):
      return 'modifiedModel';
    default:
      return 'model';
  }
};
// --------------------------------------------------------------
var parser = function parser(regexArray) {
  var returnValue = function returnValue(type, toParse) {
    switch (type) {
      case 'helper':
        return { type: type, helper: toParse[0], input: toParse[1] };
      case 'grammar':
        return { type: type, grammar: toParse[0] };
      default:
        return { type: type, toParse: toParse };
    }
  };

  return regexArray.map(function (item) {
    var props = item.slice(2, -2).split('.');
    var type = propType(props);
    if (type === 'helper') return returnValue(type, props[0].slice(1).split(':'));
    if (type === 'grammar') {
      var option = [props[0].slice(1)].concat(_toConsumableArray(props.slice(1))).join('.');
      return returnValue(type, [option]);
    }

    var _props$pop$split = props.pop().split('|'),
        _props$pop$split2 = _toArray(_props$pop$split),
        property = _props$pop$split2[0],
        modifiers = _props$pop$split2.slice(1);

    if (type === 'modifiedModel') return returnValue(type, props.concat(property, [modifiers]));
    return returnValue(type, props.concat(property));
  });
};
// --------------------------------------------------------------
var grammarExpander = function grammarExpander(entry) {
  var grammars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var regex = /::\.|[^ ]*::/g;

  return entry.replace(regex, function (match) {
    if (match[2] !== '!') return match;

    var grammar = match.slice(3, -2).split('.');

    var result = grammar.reduce(function (result, pointer) {
      return result[pointer] ? result[pointer] : new Error('The grammar: ' + grammar + ' does not appear to exist');
    }, grammars);

    if (result instanceof Error) return result;
    return result.match(regex) === null ? result : grammarExpander(result, grammars);
  });
};

var fns$1 = {
  grammarExpander: grammarExpander,
  modeler: modeler,
  parser: parser,
  propType: propType,
  regexer: regexer
};

var grammarExpander$1 = fns$1.grammarExpander;
var regexer$1 = fns$1.regexer;
var parser$1 = fns$1.parser;
var modeler$1 = fns$1.modeler;


var Parser = function Parser(entry, grammars) {
  var expandedGrammar = grammarExpander$1(entry, grammars);
  var toModel = regexer$1(expandedGrammar);
  toModel = parser$1(toModel);
  toModel = modeler$1(toModel);

  return {
    toModel: toModel,
    expandedGrammar: expandedGrammar
  };
};

var global$1 = typeof commonjsGlobal !== "undefined" ? commonjsGlobal :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}
function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */


var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
var _kMaxLength = kMaxLength();
function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read$$1 (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read$$1(arr, i + j) !== read$$1(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write$$1 (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}


var bufferEs6 = Object.freeze({
	INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
	kMaxLength: _kMaxLength,
	Buffer: Buffer,
	SlowBuffer: SlowBuffer,
	isBuffer: isBuffer
});

var inherits;
if (typeof Object.create === 'function'){
  inherits = function inherits(ctor, superCtor) {
    // implementation from standard node.js 'util' module
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
var inherits$1 = inherits;

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var formatRegExp = /%[sdj%]/g;
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
}


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
function deprecate(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global$1.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}


var debugs = {};
var debugEnviron;
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
}


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    _extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray$1(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray$1(ar) {
  return Array.isArray(ar);
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isNull(arg) {
  return arg === null;
}

function isNullOrUndefined(arg) {
  return arg == null;
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

function isUndefined(arg) {
  return arg === void 0;
}

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isFunction(arg) {
  return typeof arg === 'function';
}

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}

function isBuffer$1(maybeBuf) {
  return isBuffer(maybeBuf);
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
function log() {
  console.log('%s - %s', timestamp(), format.apply(null, arguments));
}


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var util = {
  inherits: inherits$1,
  _extend: _extend,
  log: log,
  isBuffer: isBuffer$1,
  isPrimitive: isPrimitive,
  isFunction: isFunction,
  isError: isError,
  isDate: isDate,
  isObject: isObject,
  isRegExp: isRegExp,
  isUndefined: isUndefined,
  isSymbol: isSymbol,
  isString: isString,
  isNumber: isNumber,
  isNullOrUndefined: isNullOrUndefined,
  isNull: isNull,
  isBoolean: isBoolean,
  isArray: isArray$1,
  inspect: inspect,
  deprecate: deprecate,
  format: format,
  debuglog: debuglog
};


var util$1 = Object.freeze({
	format: format,
	deprecate: deprecate,
	debuglog: debuglog,
	inspect: inspect,
	isArray: isArray$1,
	isBoolean: isBoolean,
	isNull: isNull,
	isNullOrUndefined: isNullOrUndefined,
	isNumber: isNumber,
	isString: isString,
	isSymbol: isSymbol,
	isUndefined: isUndefined,
	isRegExp: isRegExp,
	isObject: isObject,
	isDate: isDate,
	isError: isError,
	isFunction: isFunction,
	isPrimitive: isPrimitive,
	isBuffer: isBuffer$1,
	log: log,
	inherits: inherits$1,
	_extend: _extend,
	default: util
});

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
function resolve() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : '/';

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
}

// path.normalize(path)
// posix version
function normalize(path) {
  var isPathAbsolute = isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isPathAbsolute).join('/');

  if (!path && !isPathAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isPathAbsolute ? '/' : '') + path;
}

// posix version
function isAbsolute(path) {
  return path.charAt(0) === '/';
}

// posix version
function join() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
}


// path.relative(from, to)
// posix version
function relative(from, to) {
  from = resolve(from).substr(1);
  to = resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
}

var sep = '/';
var delimiter = ':';

function dirname(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
}

function basename(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}


function extname(path) {
  return splitPath(path)[3];
}
var path = {
  extname: extname,
  basename: basename,
  dirname: dirname,
  sep: sep,
  delimiter: delimiter,
  relative: relative,
  join: join,
  isAbsolute: isAbsolute,
  normalize: normalize,
  resolve: resolve
};
function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ?
    function (str, start, len) { return str.substr(start, len) } :
    function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    };


var path$1 = Object.freeze({
	resolve: resolve,
	normalize: normalize,
	isAbsolute: isAbsolute,
	join: join,
	relative: relative,
	sep: sep,
	delimiter: delimiter,
	dirname: dirname,
	basename: basename,
	extname: extname,
	default: path
});

var empty$2 = {};


var empty$3 = Object.freeze({
	default: empty$2
});

var promisify = createCommonjsModule$$1(function (module) {
module.exports = (fn) => {
  return function () {
    const length = arguments.length;
    const args = new Array(length);

    for (let i = 0; i < length; i += 1) {
      args[i] = arguments[i];
    }

    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });

      fn.apply(null, args);
    });
  };
};
});

var fs = ( empty$3 && empty$2 ) || empty$3;

var fs_1 = createCommonjsModule$$1(function (module) {
// Adater module exposing all `fs` methods with promises instead of callbacks.

const isCallbackMethod = (key) => {
  return [
    typeof fs[key] === 'function',
    !key.match(/Sync$/),
    !key.match(/^[A-Z]/),
    !key.match(/^create/),
    !key.match(/^(un)?watch/),
  ].every(Boolean);
};

const adaptMethod = (name) => {
  const original = fs[name];
  return promisify(original);
};

const adaptAllMethods = () => {
  const adapted = {};

  Object.keys(fs).forEach((key) => {
    if (isCallbackMethod(key)) {
      if (key === 'exists') {
        // fs.exists() does not follow standard
        // Node callback conventions, and has
        // no error object in the callback
        adapted.exists = () => {
          throw new Error('fs.exists() is deprecated');
        };
      } else {
        adapted[key] = adaptMethod(key);
      }
    } else {
      adapted[key] = fs[key];
    }
  });

  return adapted;
};

module.exports = adaptAllMethods();
});

var validate = createCommonjsModule$$1(function (module) {
const prettyPrintTypes = (types) => {
  const addArticle = (str) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (vowels.indexOf(str[0]) !== -1) {
      return `an ${str}`;
    }
    return `a ${str}`;
  };

  return types.map(addArticle).join(' or ');
};

const isArrayOfNotation = (typeDefinition) => {
  return /array of /.test(typeDefinition);
};

const extractTypeFromArrayOfNotation = (typeDefinition) => {
  // The notation is e.g. 'array of string'
  return typeDefinition.split(' of ')[1];
};

const isValidTypeDefinition = (typeStr) => {
  if (isArrayOfNotation(typeStr)) {
    return isValidTypeDefinition(extractTypeFromArrayOfNotation(typeStr));
  }

  return [
    'string',
    'number',
    'boolean',
    'array',
    'object',
    'buffer',
    'null',
    'undefined',
    'function',
  ].some((validType) => {
    return validType === typeStr;
  });
};

const detectType = (value) => {
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    return 'array';
  }
  if (isBuffer(value)) {
    return 'buffer';
  }

  return typeof value;
};

const onlyUniqueValuesInArrayFilter = (value, index, self) => {
  return self.indexOf(value) === index;
};

const detectTypeDeep = (value) => {
  let type = detectType(value);
  let typesInArray;

  if (type === 'array') {
    typesInArray = value
      .map((element) => {
        return detectType(element);
      })
      .filter(onlyUniqueValuesInArrayFilter);
    type += ` of ${typesInArray.join(', ')}`;
  }

  return type;
};

const validateArray = (argumentValue, typeToCheck) => {
  const allowedTypeInArray = extractTypeFromArrayOfNotation(typeToCheck);

  if (detectType(argumentValue) !== 'array') {
    return false;
  }

  return argumentValue.every((element) => {
    return detectType(element) === allowedTypeInArray;
  });
};

const validateArgument = (methodName, argumentName, argumentValue, argumentMustBe) => {
  const isOneOfAllowedTypes = argumentMustBe.some((type) => {
    if (!isValidTypeDefinition(type)) {
      throw new Error(`Unknown type "${type}"`);
    }

    if (isArrayOfNotation(type)) {
      return validateArray(argumentValue, type);
    }

    return type === detectType(argumentValue);
  });

  if (!isOneOfAllowedTypes) {
    throw new Error(`Argument "${argumentName}" passed to ${methodName} must be ${prettyPrintTypes(argumentMustBe)}. Received ${detectTypeDeep(argumentValue)}`);
  }
};

const validateOptions = (methodName, optionsObjName, obj, allowedOptions) => {
  if (obj !== undefined) {
    validateArgument(methodName, optionsObjName, obj, ['object']);
    Object.keys(obj).forEach((key) => {
      const argName = `${optionsObjName}.${key}`;
      if (allowedOptions[key] !== undefined) {
        validateArgument(methodName, argName, obj[key], allowedOptions[key]);
      } else {
        throw new Error(`Unknown argument "${argName}" passed to ${methodName}`);
      }
    });
  }
};

module.exports = {
  argument: validateArgument,
  options: validateOptions,
};
});

var validate_1 = validate.argument;
var validate_2 = validate.options;

var mode = createCommonjsModule$$1(function (module, exports) {
// Logic for unix file mode operations.

exports.normalizeFileMode = (mode) => {
  let modeAsString;
  if (typeof mode === 'number') {
    modeAsString = mode.toString(8);
  } else {
    modeAsString = mode;
  }
  return modeAsString.substring(modeAsString.length - 3);
};
});

var mode_1 = mode.normalizeFileMode;

var list = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path) => {
  const methodSignature = `${methodName}(path)`;
  validate.argument(methodSignature, 'path', path, ['string', 'undefined']);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const listSync = (path) => {
  try {
    return fs_1.readdirSync(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Doesn't exist. Return undefined instead of throwing.
      return undefined;
    }
    throw err;
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const listAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs_1.readdir(path)
    .then((list) => {
      resolve(list);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        // Doesn't exist. Return undefined instead of throwing.
        resolve(undefined);
      } else {
        reject(err);
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = listSync;
exports.async = listAsync;
});

var list_1 = list.validateInput;
var list_2 = list.sync;
var list_3 = list.async;

var pathUtil = ( path$1 && path ) || path$1;

var remove = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path) => {
  const methodSignature = `${methodName}([path])`;
  validate.argument(methodSignature, 'path', path, ['string', 'undefined']);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const removeSync = (path) => {
  try {
    // Assume the path is a file and just try to remove it.
    fs_1.unlinkSync(path);
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EISDIR' || err.code === 'ENOTEMPTY') {
      // Must delete everything inside the directory first.
      list.sync(path).forEach((filename) => {
        removeSync(pathUtil.join(path, filename));
      });
      // Everything inside directory has been removed,
      // it's safe now do go for the directory itself.
      fs_1.rmdirSync(path);
    } else if (err.code === 'ENOENT') {
      // File already doesn't exist. We're done.
    } else {
      // Something unexpected happened. Rethrow original error.
      throw err;
    }
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const removeAsyncInternal = (path, retryCount) => {
  return new Promise((resolve, reject) => {
    const retryInAWhileOrFail = (err) => {
      if (retryCount === 3) {
        // Too many retries already. Fail.
        reject(err);
      } else {
        // Try the same action after some pause.
        setTimeout(() => {
          removeAsyncInternal(path, retryCount + 1)
          .then(resolve, reject);
        }, 100);
      }
    };

    const removeEverythingInsideDirectory = () => {
      return list.async(path)
      .then((filenamesInsideDir) => {
        const promises = filenamesInsideDir.map((filename) => {
          return removeAsyncInternal(pathUtil.join(path, filename), 0);
        });
        return Promise.all(promises);
      });
    };

    // Assume the path is a file and just try to remove it.
    fs_1.unlink(path)
    .then(resolve)
    .catch((err) => {
      if (err.code === 'EBUSY') {
        retryInAWhileOrFail(err);
      } else if (err.code === 'EPERM' || err.code === 'EISDIR' || err.code === 'ENOTEMPTY') {
        // File deletion attempt failed. Probably it's not a file, it's a directory.
        // So try to proceed with that assumption.
        removeEverythingInsideDirectory()
        .then(() => {
          // Now go for the directory.
          return fs_1.rmdir(path);
        })
        .then(resolve)
        .catch((err2) => {
          if (err2.code === 'EBUSY' || err2.code === 'EPERM' || err2.code === 'ENOTEMPTY') {
            // Failed again. This might be due to other processes reading
            // something inside the directory. Let's take a nap and retry.
            retryInAWhileOrFail(err2);
          } else {
            reject(err2);
          }
        });
      } else if (err.code === 'ENOENT') {
        // File already doesn't exist. We're done.
        resolve();
      } else {
        // Something unexpected happened. Rethrow original error.
        reject(err);
      }
    });
  });
};

const removeAsync = (path) => {
  return removeAsyncInternal(path, 0);
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = removeSync;
exports.async = removeAsync;
});

var remove_1 = remove.validateInput;
var remove_2 = remove.sync;
var remove_3 = remove.async;

var dir = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path, criteria) => {
  const methodSignature = `${methodName}(path, [criteria])`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.options(methodSignature, 'criteria', criteria, {
    empty: ['boolean'],
    mode: ['string', 'number'],
  });
};

const getCriteriaDefaults = (passedCriteria) => {
  const criteria = passedCriteria || {};
  if (typeof criteria.empty !== 'boolean') {
    criteria.empty = false;
  }
  if (criteria.mode !== undefined) {
    criteria.mode = mode.normalizeFileMode(criteria.mode);
  }
  return criteria;
};

const generatePathOccupiedByNotDirectoryError = (path) => {
  return new Error(`Path ${path} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const checkWhatAlreadyOccupiesPathSync = (path) => {
  let stat;

  try {
    stat = fs_1.statSync(path);
  } catch (err) {
    // Detection if path already exists
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  if (stat && !stat.isDirectory()) {
    throw generatePathOccupiedByNotDirectoryError(path);
  }

  return stat;
};

const createBrandNewDirectorySync = (path, opts) => {
  const options = opts || {};

  try {
    fs_1.mkdirSync(path, options.mode);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Parent directory doesn't exist. Need to create it first.
      createBrandNewDirectorySync(pathUtil.dirname(path), options);
      // Now retry creating this directory.
      fs_1.mkdirSync(path, options.mode);
    } else if (err.code === 'EEXIST') {
      // The path already exists. We're fine.
    } else {
      throw err;
    }
  }
};

const checkExistingDirectoryFulfillsCriteriaSync = (path, stat, criteria) => {
  const checkMode = () => {
    const mode$$1 = mode.normalizeFileMode(stat.mode);
    if (criteria.mode !== undefined && criteria.mode !== mode$$1) {
      fs_1.chmodSync(path, criteria.mode);
    }
  };

  const checkEmptiness = () => {
    if (criteria.empty) {
      // Delete everything inside this directory
      const list = fs_1.readdirSync(path);
      list.forEach((filename) => {
        remove.sync(pathUtil.resolve(path, filename));
      });
    }
  };

  checkMode();
  checkEmptiness();
};

const dirSync = (path, passedCriteria) => {
  const criteria = getCriteriaDefaults(passedCriteria);
  const stat = checkWhatAlreadyOccupiesPathSync(path);
  if (stat) {
    checkExistingDirectoryFulfillsCriteriaSync(path, stat, criteria);
  } else {
    createBrandNewDirectorySync(path, criteria);
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const checkWhatAlreadyOccupiesPathAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs_1.stat(path)
    .then((stat) => {
      if (stat.isDirectory()) {
        resolve(stat);
      } else {
        reject(generatePathOccupiedByNotDirectoryError(path));
      }
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        // Path doesn't exist
        resolve(undefined);
      } else {
        // This is other error that nonexistent path, so end here.
        reject(err);
      }
    });
  });
};

// Delete all files and directores inside given directory
const emptyAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs_1.readdir(path)
    .then((list) => {
      const doOne = (index) => {
        if (index === list.length) {
          resolve();
        } else {
          const subPath = pathUtil.resolve(path, list[index]);
          remove.async(subPath).then(() => {
            doOne(index + 1);
          });
        }
      };

      doOne(0);
    })
    .catch(reject);
  });
};

const checkExistingDirectoryFulfillsCriteriaAsync = (path, stat, criteria) => {
  return new Promise((resolve, reject) => {
    const checkMode = () => {
      const mode$$1 = mode.normalizeFileMode(stat.mode);
      if (criteria.mode !== undefined && criteria.mode !== mode$$1) {
        return fs_1.chmod(path, criteria.mode);
      }
      return Promise.resolve();
    };

    const checkEmptiness = () => {
      if (criteria.empty) {
        return emptyAsync(path);
      }
      return Promise.resolve();
    };

    checkMode()
    .then(checkEmptiness)
    .then(resolve, reject);
  });
};

const createBrandNewDirectoryAsync = (path, opts) => {
  const options = opts || {};

  return new Promise((resolve, reject) => {
    fs_1.mkdir(path, options.mode)
    .then(resolve)
    .catch((err) => {
      if (err.code === 'ENOENT') {
        // Parent directory doesn't exist. Need to create it first.
        createBrandNewDirectoryAsync(pathUtil.dirname(path), options)
        .then(() => {
          // Now retry creating this directory.
          return fs_1.mkdir(path, options.mode);
        })
        .then(resolve)
        .catch((err2) => {
          if (err2.code === 'EEXIST') {
            // Hmm, something other have already created the directory?
            // No problem for us.
            resolve();
          } else {
            reject(err2);
          }
        });
      } else if (err.code === 'EEXIST') {
        // The path already exists. We're fine.
        resolve();
      } else {
        reject(err);
      }
    });
  });
};

const dirAsync = (path, passedCriteria) => {
  return new Promise((resolve, reject) => {
    const criteria = getCriteriaDefaults(passedCriteria);

    checkWhatAlreadyOccupiesPathAsync(path)
    .then((stat) => {
      if (stat !== undefined) {
        return checkExistingDirectoryFulfillsCriteriaAsync(path, stat, criteria);
      }
      return createBrandNewDirectoryAsync(path, criteria);
    })
    .then(resolve, reject);
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = dirSync;
exports.createSync = createBrandNewDirectorySync;
exports.async = dirAsync;
exports.createAsync = createBrandNewDirectoryAsync;
});

var dir_1 = dir.validateInput;
var dir_2 = dir.sync;
var dir_3 = dir.createSync;
var dir_4 = dir.async;
var dir_5 = dir.createAsync;

var write$1 = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path, data, options) => {
  const methodSignature = `${methodName}(path, data, [options])`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.argument(methodSignature, 'data', data, ['string', 'buffer', 'object', 'array']);
  validate.options(methodSignature, 'options', options, {
    atomic: ['boolean'],
    jsonIndent: ['number'],
  });
};

// Temporary file extensions used for atomic file overwriting.
const newExt = '.__new__';

const serializeToJsonMaybe = (data, jsonIndent) => {
  let indent = jsonIndent;
  if (typeof indent !== 'number') {
    indent = 2;
  }

  if (typeof data === 'object'
      && !isBuffer(data)
      && data !== null) {
    return JSON.stringify(data, null, indent);
  }

  return data;
};

// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const writeFileSync = (path, data, options) => {
  try {
    fs_1.writeFileSync(path, data, options);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Means parent directory doesn't exist, so create it and try again.
      dir.createSync(pathUtil.dirname(path));
      fs_1.writeFileSync(path, data, options);
    } else {
      throw err;
    }
  }
};

const writeAtomicSync = (path, data, options) => {
  // we are assuming there is file on given path, and we don't want
  // to touch it until we are sure our data has been saved correctly,
  // so write the data into temporary file...
  writeFileSync(path + newExt, data, options);
  // ...next rename temp file to replace real path.
  fs_1.renameSync(path + newExt, path);
};

const writeSync = (path, data, options) => {
  const opts = options || {};
  const processedData = serializeToJsonMaybe(data, opts.jsonIndent);

  let writeStrategy = writeFileSync;
  if (opts.atomic) {
    writeStrategy = writeAtomicSync;
  }
  writeStrategy(path, processedData, { mode: opts.mode });
};

// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------

const writeFileAsync = (path, data, options) => {
  return new Promise((resolve, reject) => {
    fs_1.writeFile(path, data, options)
    .then(resolve)
    .catch((err) => {
      // First attempt to write a file ended with error.
      // Check if this is not due to nonexistent parent directory.
      if (err.code === 'ENOENT') {
        // Parent directory doesn't exist, so create it and try again.
        dir.createAsync(pathUtil.dirname(path))
        .then(() => {
          return fs_1.writeFile(path, data, options);
        })
        .then(resolve, reject);
      } else {
        // Nope, some other error, throw it.
        reject(err);
      }
    });
  });
};

const writeAtomicAsync = (path, data, options) => {
  return new Promise((resolve, reject) => {
    // We are assuming there is file on given path, and we don't want
    // to touch it until we are sure our data has been saved correctly,
    // so write the data into temporary file...
    writeFileAsync(path + newExt, data, options)
    .then(() => {
      // ...next rename temp file to real path.
      return fs_1.rename(path + newExt, path);
    })
    .then(resolve, reject);
  });
};

const writeAsync = (path, data, options) => {
  const opts = options || {};
  const processedData = serializeToJsonMaybe(data, opts.jsonIndent);

  let writeStrategy = writeFileAsync;
  if (opts.atomic) {
    writeStrategy = writeAtomicAsync;
  }
  return writeStrategy(path, processedData, { mode: opts.mode });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = writeSync;
exports.async = writeAsync;
});

var write_1 = write$1.validateInput;
var write_2 = write$1.sync;
var write_3 = write$1.async;

var append = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path, data, options) => {
  const methodSignature = `${methodName}(path, data, [options])`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.argument(methodSignature, 'data', data, ['string', 'buffer']);
  validate.options(methodSignature, 'options', options, {
    mode: ['string', 'number'],
  });
};

// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const appendSync = (path, data, options) => {
  try {
    fs_1.appendFileSync(path, data, options);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Parent directory doesn't exist, so just pass the task to `write`,
      // which will create the folder and file.
      write$1.sync(path, data, options);
    } else {
      throw err;
    }
  }
};

// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------

const appendAsync = (path, data, options) => {
  return new Promise((resolve, reject) => {
    fs_1.appendFile(path, data, options)
    .then(resolve)
    .catch((err) => {
      if (err.code === 'ENOENT') {
        // Parent directory doesn't exist, so just pass the task to `write`,
        // which will create the folder and file.
        write$1.async(path, data, options).then(resolve, reject);
      } else {
        reject(err);
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = appendSync;
exports.async = appendAsync;
});

var append_1 = append.validateInput;
var append_2 = append.sync;
var append_3 = append.async;

var file = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path, criteria) => {
  const methodSignature = `${methodName}(path, [criteria])`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.options(methodSignature, 'criteria', criteria, {
    content: ['string', 'buffer', 'object', 'array'],
    jsonIndent: ['number'],
    mode: ['string', 'number'],
  });
};

const getCriteriaDefaults = (passedCriteria) => {
  const criteria = passedCriteria || {};
  if (criteria.mode !== undefined) {
    criteria.mode = mode.normalizeFileMode(criteria.mode);
  }
  return criteria;
};

const generatePathOccupiedByNotFileError = (path) => {
  return new Error(`Path ${path} exists but is not a file. Halting jetpack.file() call for safety reasons.`);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const checkWhatAlreadyOccupiesPathSync = (path) => {
  let stat;

  try {
    stat = fs_1.statSync(path);
  } catch (err) {
    // Detection if path exists
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  if (stat && !stat.isFile()) {
    throw generatePathOccupiedByNotFileError(path);
  }

  return stat;
};

const checkExistingFileFulfillsCriteriaSync = (path, stat, criteria) => {
  const mode$$1 = mode.normalizeFileMode(stat.mode);

  const checkContent = () => {
    if (criteria.content !== undefined) {
      write$1.sync(path, criteria.content, {
        mode: mode$$1,
        jsonIndent: criteria.jsonIndent,
      });
      return true;
    }
    return false;
  };

  const checkMode = () => {
    if (criteria.mode !== undefined && criteria.mode !== mode$$1) {
      fs_1.chmodSync(path, criteria.mode);
    }
  };

  const contentReplaced = checkContent();
  if (!contentReplaced) {
    checkMode();
  }
};

const createBrandNewFileSync = (path, criteria) => {
  let content = '';
  if (criteria.content !== undefined) {
    content = criteria.content;
  }
  write$1.sync(path, content, {
    mode: criteria.mode,
    jsonIndent: criteria.jsonIndent,
  });
};

const fileSync = (path, passedCriteria) => {
  const criteria = getCriteriaDefaults(passedCriteria);
  const stat = checkWhatAlreadyOccupiesPathSync(path);
  if (stat !== undefined) {
    checkExistingFileFulfillsCriteriaSync(path, stat, criteria);
  } else {
    createBrandNewFileSync(path, criteria);
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const checkWhatAlreadyOccupiesPathAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs_1.stat(path)
    .then((stat) => {
      if (stat.isFile()) {
        resolve(stat);
      } else {
        reject(generatePathOccupiedByNotFileError(path));
      }
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        // Path doesn't exist.
        resolve(undefined);
      } else {
        // This is other error. Must end here.
        reject(err);
      }
    });
  });
};

const checkExistingFileFulfillsCriteriaAsync = (path, stat, criteria) => {
  const mode$$1 = mode.normalizeFileMode(stat.mode);

  const checkContent = () => {
    return new Promise((resolve, reject) => {
      if (criteria.content !== undefined) {
        write$1.async(path, criteria.content, {
          mode: mode$$1,
          jsonIndent: criteria.jsonIndent,
        })
        .then(() => {
          resolve(true);
        })
        .catch(reject);
      } else {
        resolve(false);
      }
    });
  };

  const checkMode = () => {
    if (criteria.mode !== undefined && criteria.mode !== mode$$1) {
      return fs_1.chmod(path, criteria.mode);
    }
    return undefined;
  };

  return checkContent()
  .then((contentReplaced) => {
    if (!contentReplaced) {
      return checkMode();
    }
    return undefined;
  });
};

const createBrandNewFileAsync = (path, criteria) => {
  let content = '';
  if (criteria.content !== undefined) {
    content = criteria.content;
  }

  return write$1.async(path, content, {
    mode: criteria.mode,
    jsonIndent: criteria.jsonIndent,
  });
};

const fileAsync = (path, passedCriteria) => {
  return new Promise((resolve, reject) => {
    const criteria = getCriteriaDefaults(passedCriteria);

    checkWhatAlreadyOccupiesPathAsync(path)
    .then((stat) => {
      if (stat !== undefined) {
        return checkExistingFileFulfillsCriteriaAsync(path, stat, criteria);
      }
      return createBrandNewFileAsync(path, criteria);
    })
    .then(resolve, reject);
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = fileSync;
exports.async = fileAsync;
});

var file_1 = file.validateInput;
var file_2 = file.sync;
var file_3 = file.async;

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter() {
  EventEmitter.init.call(this);
}
// nodejs oddity
// require('events') === require('events').EventEmitter
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active && !(this instanceof domain.Domain)) {
      this.domain = domain.active;
    }
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var needDomainExit = false;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  if (needDomainExit)
    domain.exit();

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] :
                                          [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + type + ' listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (list.length === 1) {
          list[0] = undefined;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function BufferList$1() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList$1.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList$1.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList$1.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList$1.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList$1.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList$1.prototype.concat = function (n) {
  if (this.length === 0) return Buffer.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = Buffer.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

var string_decoder = createCommonjsModule$$1(function (module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = bufferEs6.Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     };


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}
});

var string_decoder_1 = string_decoder.StringDecoder;

Readable$1.ReadableState = ReadableState;
var debug = debuglog('stream');
inherits$1(Readable$1, EventEmitter);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
}
function listenerCount$1 (emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex$1) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList$1();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    this.decoder = new string_decoder_1(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable$1(options) {

  if (!(this instanceof Readable$1)) return new Readable$1(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  EventEmitter.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable$1.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = Buffer.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable$1.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable$1.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable$1.prototype.setEncoding = function (enc) {
  this._readableState.decoder = new string_decoder_1(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable$1.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable$1.prototype._read = function (n) {
  this.emit('error', new Error('not implemented'));
};

Readable$1.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false);

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && src.listeners('data').length) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable$1.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var _i = 0; _i < len; _i++) {
      dests[_i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1) return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable$1.prototype.on = function (ev, fn) {
  var res = EventEmitter.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable$1.prototype.addListener = Readable$1.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable$1.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable$1.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable$1.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable$1._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.


Writable$1.WritableState = WritableState;
inherits$1(Writable$1, EventEmitter);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Object.defineProperty(this, 'buffer', {
    get: deprecate(function () {
      return this.getBuffer();
    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
  });
  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex$1) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function writableStateGetBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

function Writable$1(options) {

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable$1) && !(this instanceof Duplex$1)) return new Writable$1(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  EventEmitter.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable$1.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  nextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable$1.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable$1.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable$1.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable$1.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) nextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
        nextTick(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable$1.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable$1.prototype._writev = null;

Writable$1.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}

inherits$1(Duplex$1, Readable$1);

var keys = Object.keys(Writable$1.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex$1.prototype[method]) Duplex$1.prototype[method] = Writable$1.prototype[method];
}
function Duplex$1(options) {
  if (!(this instanceof Duplex$1)) return new Duplex$1(options);

  Readable$1.call(this, options);
  Writable$1.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.


inherits$1(Transform$1, Duplex$1);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}
function Transform$1(options) {
  if (!(this instanceof Transform$1)) return new Transform$1(options);

  Duplex$1.call(this, options);

  this._transformState = new TransformState(this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er) {
      done(stream, er);
    });else done(stream);
  });
}

Transform$1.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex$1.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform$1.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('Not implemented');
};

Transform$1.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform$1.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er) {
  if (er) return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

inherits$1(PassThrough$1, Transform$1);
function PassThrough$1(options) {
  if (!(this instanceof PassThrough$1)) return new PassThrough$1(options);

  Transform$1.call(this, options);
}

PassThrough$1.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

inherits$1(Stream$1, EventEmitter);
Stream$1.Readable = Readable$1;
Stream$1.Writable = Writable$1;
Stream$1.Duplex = Duplex$1;
Stream$1.Transform = Transform$1;
Stream$1.PassThrough = PassThrough$1;

// Backwards-compat with node 0.4.x
Stream$1.Stream = Stream$1;

// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream$1() {
  EventEmitter.call(this);
}

Stream$1.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EventEmitter.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


var stream = Object.freeze({
	default: Stream$1,
	Readable: Readable$1,
	Writable: Writable$1,
	Duplex: Duplex$1,
	Transform: Transform$1,
	PassThrough: PassThrough$1,
	Stream: Stream$1
});

var inspect$1 = createCommonjsModule$$1(function (module, exports) {
const supportedChecksumAlgorithms = ['md5', 'sha1', 'sha256', 'sha512'];

const symlinkOptions = ['report', 'follow'];

const validateInput = (methodName, path, options) => {
  const methodSignature = `${methodName}(path, [options])`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.options(methodSignature, 'options', options, {
    checksum: ['string'],
    mode: ['boolean'],
    times: ['boolean'],
    absolutePath: ['boolean'],
    symlinks: ['string'],
  });

  if (options && options.checksum !== undefined
    && supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
    throw new Error(`Argument "options.checksum" passed to ${methodSignature} must have one of values: ${supportedChecksumAlgorithms.join(', ')}`);
  }

  if (options && options.symlinks !== undefined
    && symlinkOptions.indexOf(options.symlinks) === -1) {
    throw new Error(`Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${symlinkOptions.join(', ')}`);
  }
};

const createInspectObj = (path, options, stat) => {
  const obj = {};

  obj.name = pathUtil.basename(path);

  if (stat.isFile()) {
    obj.type = 'file';
    obj.size = stat.size;
  } else if (stat.isDirectory()) {
    obj.type = 'dir';
  } else if (stat.isSymbolicLink()) {
    obj.type = 'symlink';
  } else {
    obj.type = 'other';
  }

  if (options.mode) {
    obj.mode = stat.mode;
  }

  if (options.times) {
    obj.accessTime = stat.atime;
    obj.modifyTime = stat.mtime;
    obj.changeTime = stat.ctime;
  }

  if (options.absolutePath) {
    obj.absolutePath = path;
  }

  return obj;
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const fileChecksum = (path, algo) => {
  const hash = fs.createHash(algo);
  const data = fs_1.readFileSync(path);
  hash.update(data);
  return hash.digest('hex');
};

const addExtraFieldsSync = (path, inspectObj, options) => {
  if (inspectObj.type === 'file' && options.checksum) {
    inspectObj[options.checksum] = fileChecksum(path, options.checksum);
  } else if (inspectObj.type === 'symlink') {
    inspectObj.pointsAt = fs_1.readlinkSync(path);
  }
};

const inspectSync = (path, options) => {
  let statOperation = fs_1.lstatSync;
  let stat;
  const opts = options || {};

  if (opts.symlinks === 'follow') {
    statOperation = fs_1.statSync;
  }

  try {
    stat = statOperation(path);
  } catch (err) {
    // Detection if path exists
    if (err.code === 'ENOENT') {
      // Doesn't exist. Return undefined instead of throwing.
      return undefined;
    }
    throw err;
  }

  const inspectObj = createInspectObj(path, opts, stat);
  addExtraFieldsSync(path, inspectObj, opts);

  return inspectObj;
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const fileChecksumAsync = (path, algo) => {
  return new Promise((resolve, reject) => {
    const hash = fs.createHash(algo);
    const s = fs_1.createReadStream(path);
    s.on('data', (data) => {
      hash.update(data);
    });
    s.on('end', () => {
      resolve(hash.digest('hex'));
    });
    s.on('error', reject);
  });
};

const addExtraFieldsAsync = (path, inspectObj, options) => {
  if (inspectObj.type === 'file' && options.checksum) {
    return fileChecksumAsync(path, options.checksum)
    .then((checksum) => {
      inspectObj[options.checksum] = checksum;
      return inspectObj;
    });
  } else if (inspectObj.type === 'symlink') {
    return fs_1.readlink(path)
    .then((linkPath) => {
      inspectObj.pointsAt = linkPath;
      return inspectObj;
    });
  }
  return Promise.resolve(inspectObj);
};

const inspectAsync = (path, options) => {
  return new Promise((resolve, reject) => {
    let statOperation = fs_1.lstat;
    const opts = options || {};

    if (opts.symlinks === 'follow') {
      statOperation = fs_1.stat;
    }

    statOperation(path)
    .then((stat) => {
      const inspectObj = createInspectObj(path, opts, stat);
      addExtraFieldsAsync(path, inspectObj, opts)
      .then(resolve, reject);
    })
    .catch((err) => {
      // Detection if path exists
      if (err.code === 'ENOENT') {
        // Doesn't exist. Return undefined instead of throwing.
        resolve(undefined);
      } else {
        reject(err);
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.supportedChecksumAlgorithms = supportedChecksumAlgorithms;
exports.symlinkOptions = symlinkOptions;
exports.validateInput = validateInput;
exports.sync = inspectSync;
exports.async = inspectAsync;
});

var inspect_1 = inspect$1.supportedChecksumAlgorithms;
var inspect_2 = inspect$1.symlinkOptions;
var inspect_3 = inspect$1.validateInput;
var inspect_4 = inspect$1.sync;
var inspect_5 = inspect$1.async;

var require$$0$2 = ( stream && Stream$1 ) || stream;

var tree_walker = createCommonjsModule$$1(function (module, exports) {
/* eslint no-underscore-dangle:0 */

const Readable = require$$0$2.Readable;




// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const walkSync = (path, options, callback, currentLevel) => {
  const item = inspect$1.sync(path, options.inspectOptions);

  if (options.maxLevelsDeep === undefined) {
    options.maxLevelsDeep = Infinity;
  }

  callback(path, item);
  if (item && item.type === 'dir' && currentLevel < options.maxLevelsDeep) {
    list.sync(path).forEach((child) => {
      walkSync(path + pathUtil.sep + child, options, callback, currentLevel + 1);
    });
  }
};

const initialWalkSync = (path, options, callback) => {
  walkSync(path, options, callback, 0);
};

// ---------------------------------------------------------
// STREAM
// ---------------------------------------------------------

const walkStream = (path, options) => {
  const rs = new Readable({ objectMode: true });
  let nextTreeNode = {
    path,
    parent: undefined,
    level: 0,
  };
  let running = false;
  let readSome;

  const error = function (err) {
    rs.emit('error', err);
  };

  const findNextUnprocessedNode = (node) => {
    if (node.nextSibling) {
      return node.nextSibling;
    } else if (node.parent) {
      return findNextUnprocessedNode(node.parent);
    }
    return undefined;
  };

  const pushAndContinueMaybe = (data) => {
    const theyWantMore = rs.push(data);
    running = false;
    if (!nextTreeNode) {
      // Previous was the last node. The job is done.
      rs.push(null);
    } else if (theyWantMore) {
      readSome();
    }
  };

  if (options.maxLevelsDeep === undefined) {
    options.maxLevelsDeep = Infinity;
  }

  readSome = () => {
    const theNode = nextTreeNode;

    running = true;

    inspect$1.async(theNode.path, options.inspectOptions)
    .then((inspected) => {
      theNode.inspected = inspected;
      if (inspected && inspected.type === 'dir' && theNode.level < options.maxLevelsDeep) {
        list.async(theNode.path)
        .then((childrenNames) => {
          const children = childrenNames.map((name) => {
            return {
              name,
              path: theNode.path + pathUtil.sep + name,
              parent: theNode,
              level: theNode.level + 1,
            };
          });
          children.forEach((child, index) => {
            child.nextSibling = children[index + 1];
          });

          nextTreeNode = children[0] || findNextUnprocessedNode(theNode);
          pushAndContinueMaybe({ path: theNode.path, item: inspected });
        })
        .catch(error);
      } else {
        nextTreeNode = findNextUnprocessedNode(theNode);
        pushAndContinueMaybe({ path: theNode.path, item: inspected });
      }
    })
    .catch(error);
  };

  rs._read = function () {
    if (!running) {
      readSome();
    }
  };

  return rs;
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.sync = initialWalkSync;
exports.stream = walkStream;
});

var tree_walker_1 = tree_walker.sync;
var tree_walker_2 = tree_walker.stream;

var concatMap = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray$2(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray$2 = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

var balancedMatch = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}

var braceExpansion = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balancedMatch('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balancedMatch('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length);
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}

var minimatch_1 = minimatch;
minimatch.Minimatch = Minimatch;

var path$2 = { sep: '/' };
try {
  path$2 = pathUtil;
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};


var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
};

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]';

// * => any number of characters
var star = qmark + '*?';

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!');

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true;
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/;

minimatch.filter = filter$1;
function filter$1 (pattern, options) {
  options = options || {};
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {};
  b = b || {};
  var t = {};
  Object.keys(b).forEach(function (k) {
    t[k] = b[k];
  });
  Object.keys(a).forEach(function (k) {
    t[k] = a[k];
  });
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch;

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  };

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  };

  return m
};

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
};

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {};

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {};
  pattern = pattern.trim();

  // windows support: need to use /, not \
  if (path$2.sep !== '/') {
    pattern = pattern.split(path$2.sep).join('/');
  }

  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false;

  // make the set of regexps etc.
  this.make();
}

Minimatch.prototype.debug = function () {};

Minimatch.prototype.make = make;
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern;
  var options = this.options;

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true;
    return
  }
  if (!pattern) {
    this.empty = true;
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate();

  // step 2: expand braces
  var set = this.globSet = this.braceExpand();

  if (options.debug) this.debug = console.error;

  this.debug(this.pattern, set);

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  });

  this.debug(this.pattern, set);

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this);

  this.debug(this.pattern, set);

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  });

  this.debug(this.pattern, set);

  this.set = set;
}

Minimatch.prototype.parseNegate = parseNegate;
function parseNegate () {
  var pattern = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate;
    negateOffset++;
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset);
  this.negate = negate;
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
};

Minimatch.prototype.braceExpand = braceExpand;

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options;
    } else {
      options = {};
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern;

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return braceExpansion(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse;
var SUBPARSE = {};
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options;

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = '';
  var hasMagic = !!options.nocase;
  var escaping = false;
  // ? => one single character
  var patternListStack = [];
  var negativeLists = [];
  var stateChar;
  var inClass = false;
  var reClassStart = -1;
  var classStart = -1;
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)';
  var self = this;

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star;
          hasMagic = true;
        break
        case '?':
          re += qmark;
          hasMagic = true;
        break
        default:
          re += '\\' + stateChar;
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re);
      stateChar = false;
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c);

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c;
      escaping = false;
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar();
        escaping = true;
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class');
          if (c === '!' && i === classStart + 1) c = '^';
          re += c;
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar);
        clearStateChar();
        stateChar = c;
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar();
      continue

      case '(':
        if (inClass) {
          re += '(';
          continue
        }

        if (!stateChar) {
          re += '\\(';
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        });
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
        this.debug('plType %j %j', stateChar, re);
        stateChar = false;
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)';
          continue
        }

        clearStateChar();
        hasMagic = true;
        var pl = patternListStack.pop();
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close;
        if (pl.type === '!') {
          negativeLists.push(pl);
        }
        pl.reEnd = re.length;
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|';
          escaping = false;
          continue
        }

        clearStateChar();
        re += '|';
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar();

        if (inClass) {
          re += '\\' + c;
          continue
        }

        inClass = true;
        classStart = i;
        reClassStart = re.length;
        re += c;
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c;
          escaping = false;
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i);
          try {
            
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue
          }
        }

        // finish up the class.
        hasMagic = true;
        inClass = false;
        re += c;
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar();

        if (escaping) {
          // no need
          escaping = false;
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\';
        }

        re += c;

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1);
    sp = this.parse(cs, SUBPARSE);
    re = re.substr(0, reClassStart) + '\\[' + sp[0];
    hasMagic = hasMagic || sp[1];
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length);
    this.debug('setting tail', re, pl);
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\';
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    });

    this.debug('tail=%j\n   %s', tail, tail, pl, re);
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type;

    hasMagic = true;
    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
  }

  // handle trailing things that only matter at the very end.
  clearStateChar();
  if (escaping) {
    // trailing \\
    re += '\\\\';
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false;
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true;
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n];

    var nlBefore = re.slice(0, nl.reStart);
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
    var nlAfter = re.slice(nl.reEnd);

    nlLast += nlAfter;

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1;
    var cleanAfter = nlAfter;
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
    }
    nlAfter = cleanAfter;

    var dollar = '';
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$';
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    re = newRe;
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re;
  }

  if (addPatternStart) {
    re = patternStart + re;
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : '';
  try {
    var regExp = new RegExp('^' + re + '$', flags);
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern;
  regExp._src = re;

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
};

Minimatch.prototype.makeRe = makeRe;
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set;

  if (!set.length) {
    this.regexp = false;
    return this.regexp
  }
  var options = this.options;

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot;
  var flags = options.nocase ? 'i' : '';

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|');

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$';

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$';

  try {
    this.regexp = new RegExp(re, flags);
  } catch (ex) {
    this.regexp = false;
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {};
  var mm = new Minimatch(pattern, options);
  list = list.filter(function (f) {
    return mm.match(f)
  });
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list
};

Minimatch.prototype.match = match;
function match (f, partial) {
  this.debug('match', f, this.pattern);
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options;

  // windows: need to use /, not \
  if (path$2.sep !== '/') {
    f = f.split(path$2.sep).join('/');
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit);
  this.debug(this.pattern, 'split', f);

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set;
  this.debug(this.pattern, 'set', set);

  // Find the basename of the path by looking for the last non-empty segment
  var filename;
  var i;
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i];
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i];
    var file = f;
    if (options.matchBase && pattern.length === 1) {
      file = [filename];
    }
    var hit = this.matchOne(file, pattern, partial);
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options;

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern });

  this.debug('matchOne', file.length, pattern.length);

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop');
    var p = pattern[pi];
    var f = file[fi];

    this.debug(pattern, p, f);

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f]);

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi;
      var pr = pi + 1;
      if (pr === pl) {
        this.debug('** at the end');
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr];

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee);
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr);
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue');
          fr++;
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit;
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase();
      } else {
        hit = f === p;
      }
      this.debug('string match', p, f, hit);
    } else {
      hit = f.match(p);
      this.debug('pattern match', p, f, hit);
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '');
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
};

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

var matcher = createCommonjsModule$$1(function (module, exports) {
const Minimatch = minimatch_1.Minimatch;

const convertPatternToAbsolutePath = (basePath, pattern) => {
  // All patterns without slash are left as they are, if pattern contain
  // any slash we need to turn it into absolute path.
  const hasSlash = (pattern.indexOf('/') !== -1);
  const isAbsolute = /^!?\//.test(pattern);
  const isNegated = /^!/.test(pattern);
  let separator;

  if (!isAbsolute && hasSlash) {
    // Throw out meaningful characters from the beginning ("!", "./").
    const patternWithoutFirstCharacters = pattern.replace(/^!/, '').replace(/^\.\//, '');

    if (/\/$/.test(basePath)) {
      separator = '';
    } else {
      separator = '/';
    }

    if (isNegated) {
      return `!${basePath}${separator}${patternWithoutFirstCharacters}`;
    }
    return `${basePath}${separator}${patternWithoutFirstCharacters}`;
  }

  return pattern;
};

exports.create = (basePath, patterns) => {
  let normalizedPatterns;

  if (typeof patterns === 'string') {
    normalizedPatterns = [patterns];
  } else {
    normalizedPatterns = patterns;
  }

  const matchers = normalizedPatterns.map((pattern) => {
    return convertPatternToAbsolutePath(basePath, pattern);
  })
  .map((pattern) => {
    return new Minimatch(pattern, {
      matchBase: true,
      nocomment: true,
      dot: true,
    });
  });

  const performMatch = (absolutePath) => {
    let mode = 'matching';
    let weHaveMatch = false;
    let currentMatcher;
    let i;

    for (i = 0; i < matchers.length; i += 1) {
      currentMatcher = matchers[i];

      if (currentMatcher.negate) {
        mode = 'negation';
        if (i === 0) {
          // There are only negated patterns in the set,
          // so make everything matching by default and
          // start to reject stuff.
          weHaveMatch = true;
        }
      }

      if (mode === 'negation' && weHaveMatch && !currentMatcher.match(absolutePath)) {
        // One negation match is enought to know we can reject this one.
        return false;
      }

      if (mode === 'matching' && !weHaveMatch) {
        weHaveMatch = currentMatcher.match(absolutePath);
      }
    }

    return weHaveMatch;
  };

  return performMatch;
};
});

var matcher_1 = matcher.create;

var find = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path, options) => {
  const methodSignature = `${methodName}([path], options)`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.options(methodSignature, 'options', options, {
    matching: ['string', 'array of string'],
    files: ['boolean'],
    directories: ['boolean'],
    recursive: ['boolean'],
    symlinks: ['boolean'],
  });
};

const normalizeOptions = (options) => {
  const opts = options || {};
  // defaults:
  if (opts.files === undefined) {
    opts.files = true;
  }
  if (opts.directories === undefined) {
    opts.directories = false;
  }
  if (opts.recursive === undefined) {
    opts.recursive = true;
  }
  if (opts.symlinks === undefined) {
    opts.symlinks = false;
  }
  return opts;
};

const processFoundObjects = (foundObjects, cwd) => {
  return foundObjects.map((inspectObj) => {
    return pathUtil.relative(cwd, inspectObj.absolutePath);
  });
};

const generatePathDoesntExistError = (path) => {
  const err = new Error(`Path you want to find stuff in doesn't exist ${path}`);
  err.code = 'ENOENT';
  return err;
};

const generatePathNotDirectoryError = (path) => {
  const err = new Error(`Path you want to find stuff in must be a directory ${path}`);
  err.code = 'ENOTDIR';
  return err;
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const findSync = (path, options) => {
  const foundInspectObjects = [];
  const matchesAnyOfGlobs = matcher.create(path, options.matching);

  let maxLevelsDeep = Infinity;
  if (options.recursive === false) {
    maxLevelsDeep = 1;
  }

  tree_walker.sync(path, {
    maxLevelsDeep,
    inspectOptions: {
      absolutePath: true,
    },
  }, (itemPath, item) => {
    if (itemPath !== path && matchesAnyOfGlobs(itemPath)) {
      if ((item.type === 'file' && options.files === true)
        || (item.type === 'dir' && options.directories === true)
        || (item.type === 'symlink' && options.symlinks === true)) {
        foundInspectObjects.push(item);
      }
    }
  });

  return processFoundObjects(foundInspectObjects, options.cwd);
};

const findSyncInit = (path, options) => {
  const entryPointInspect = inspect$1.sync(path);
  if (entryPointInspect === undefined) {
    throw generatePathDoesntExistError(path);
  } else if (entryPointInspect.type !== 'dir') {
    throw generatePathNotDirectoryError(path);
  }

  return findSync(path, normalizeOptions(options));
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const findAsync = (path, options) => {
  return new Promise((resolve, reject) => {
    const foundInspectObjects = [];
    const matchesAnyOfGlobs = matcher.create(path, options.matching);

    let maxLevelsDeep = Infinity;
    if (options.recursive === false) {
      maxLevelsDeep = 1;
    }

    const walker = tree_walker.stream(path, {
      maxLevelsDeep,
      inspectOptions: {
        absolutePath: true,
      },
    })
    .on('readable', () => {
      const data = walker.read();
      if (data && data.path !== path && matchesAnyOfGlobs(data.path)) {
        const item = data.item;
        if ((item.type === 'file' && options.files === true)
          || (item.type === 'dir' && options.directories === true)
          || (item.type === 'symlink' && options.symlinks === true)) {
          foundInspectObjects.push(item);
        }
      }
    })
    .on('error', reject)
    .on('end', () => {
      resolve(processFoundObjects(foundInspectObjects, options.cwd));
    });
  });
};

const findAsyncInit = (path, options) => {
  return inspect$1.async(path)
  .then((entryPointInspect) => {
    if (entryPointInspect === undefined) {
      throw generatePathDoesntExistError(path);
    } else if (entryPointInspect.type !== 'dir') {
      throw generatePathNotDirectoryError(path);
    }
    return findAsync(path, normalizeOptions(options));
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = findSyncInit;
exports.async = findAsyncInit;
});

var find_1 = find.validateInput;
var find_2 = find.sync;
var find_3 = find.async;

var inspect_tree = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path, options) => {
  const methodSignature = `${methodName}(path, [options])`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.options(methodSignature, 'options', options, {
    checksum: ['string'],
    relativePath: ['boolean'],
    symlinks: ['string'],
  });

  if (options && options.checksum !== undefined
    && inspect$1.supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
    throw new Error(`Argument "options.checksum" passed to ${methodSignature} must have one of values: ${inspect$1.supportedChecksumAlgorithms.join(', ')}`);
  }

  if (options && options.symlinks !== undefined
    && inspect$1.symlinkOptions.indexOf(options.symlinks) === -1) {
    throw new Error(`Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${inspect$1.symlinkOptions.join(', ')}`);
  }
};

const generateTreeNodeRelativePath = (parent, path) => {
  if (!parent) {
    return '.';
  }
  return `${parent.relativePath}/${pathUtil.basename(path)}`;
};

// Creates checksum of a directory by using
// checksums and names of all its children inside.
const checksumOfDir = (inspectList, algo) => {
  const hash = fs.createHash(algo);
  inspectList.forEach((inspectObj) => {
    hash.update(inspectObj.name + inspectObj[algo]);
  });
  return hash.digest('hex');
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const inspectTreeNodeSync = (path, options, parent) => {
  const treeBranch = inspect$1.sync(path, options);

  if (treeBranch) {
    if (options.relativePath) {
      treeBranch.relativePath = generateTreeNodeRelativePath(parent, path);
    }

    if (treeBranch.type === 'dir') {
      treeBranch.size = 0;
      treeBranch.children = list.sync(path).map((filename) => {
        const subBranchPath = pathUtil.join(path, filename);
        const treeSubBranch = inspectTreeNodeSync(subBranchPath, options, treeBranch);
        // Add together all childrens' size to get directory combined size.
        treeBranch.size += treeSubBranch.size || 0;
        return treeSubBranch;
      });

      if (options.checksum) {
        treeBranch[options.checksum] = checksumOfDir(treeBranch.children, options.checksum);
      }
    }
  }

  return treeBranch;
};

const inspectTreeSync = (path, options) => {
  const opts = options || {};
  return inspectTreeNodeSync(path, opts, undefined);
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const inspectTreeNodeAsync = (path, options, parent) => {
  return new Promise((resolve, reject) => {
    const inspectAllChildren = (treeBranch) => {
      return new Promise((resolve2, reject2) => {
        list.async(path).then((children) => {
          const doNext = (index) => {
            if (index === children.length) {
              if (options.checksum) {
                // We are done, but still have to calculate checksum of whole directory.
                treeBranch[options.checksum] = checksumOfDir(treeBranch.children, options.checksum);
              }
              resolve2();
            } else {
              const subPath = pathUtil.join(path, children[index]);
              inspectTreeNodeAsync(subPath, options, treeBranch)
              .then((treeSubBranch) => {
                children[index] = treeSubBranch;
                treeBranch.size += treeSubBranch.size || 0;
                doNext(index + 1);
              })
              .catch(reject2);
            }
          };

          treeBranch.children = children;
          treeBranch.size = 0;

          doNext(0);
        });
      });
    };

    inspect$1.async(path, options)
    .then((treeBranch) => {
      if (!treeBranch) {
        // Given path doesn't exist. We are done.
        resolve(treeBranch);
      } else {
        if (options.relativePath) {
          treeBranch.relativePath = generateTreeNodeRelativePath(parent, path);
        }

        if (treeBranch.type !== 'dir') {
          resolve(treeBranch);
        } else {
          inspectAllChildren(treeBranch)
          .then(() => {
            resolve(treeBranch);
          })
          .catch(reject);
        }
      }
    })
    .catch(reject);
  });
};

const inspectTreeAsync = (path, options) => {
  const opts = options || {};
  return inspectTreeNodeAsync(path, opts);
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = inspectTreeSync;
exports.async = inspectTreeAsync;
});

var inspect_tree_1 = inspect_tree.validateInput;
var inspect_tree_2 = inspect_tree.sync;
var inspect_tree_3 = inspect_tree.async;

var exists = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path) => {
  const methodSignature = `${methodName}(path)`;
  validate.argument(methodSignature, 'path', path, ['string']);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const existsSync = (path) => {
  try {
    const stat = fs_1.statSync(path);
    if (stat.isDirectory()) {
      return 'dir';
    } else if (stat.isFile()) {
      return 'file';
    }
    return 'other';
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  return false;
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const existsAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs_1.stat(path, (err, stat) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      } else if (stat.isDirectory()) {
        resolve('dir');
      } else if (stat.isFile()) {
        resolve('file');
      } else {
        resolve('other');
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = existsSync;
exports.async = existsAsync;
});

var exists_1 = exists.validateInput;
var exists_2 = exists.sync;
var exists_3 = exists.async;

var copy = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, from, to, options) => {
  const methodSignature = `${methodName}(from, to, [options])`;
  validate.argument(methodSignature, 'from', from, ['string']);
  validate.argument(methodSignature, 'to', to, ['string']);
  validate.options(methodSignature, 'options', options, {
    overwrite: ['boolean', 'function'],
    matching: ['string', 'array of string'],
  });
};

const parseOptions = (options, from) => {
  const opts = options || {};
  const parsedOptions = {};

  parsedOptions.overwrite = opts.overwrite;

  if (opts.matching) {
    parsedOptions.allowedToCopy = matcher.create(from, opts.matching);
  } else {
    parsedOptions.allowedToCopy = () => {
      // Default behaviour - copy everything.
      return true;
    };
  }

  return parsedOptions;
};

const generateNoSourceError = (path) => {
  const err = new Error(`Path to copy doesn't exist ${path}`);
  err.code = 'ENOENT';
  return err;
};

const generateDestinationExistsError = (path) => {
  const err = new Error(`Destination path already exists ${path}`);
  err.code = 'EEXIST';
  return err;
};

const inspectOptions = {
  mode: true,
  symlinks: 'report',
  times: true,
  absolutePath: true,
};

const shouldThrowDestinationExistsError = (context) => {
  return typeof context.opts.overwrite !== 'function' && context.opts.overwrite !== true;
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const checksBeforeCopyingSync = (from, to, opts) => {
  if (!exists.sync(from)) {
    throw generateNoSourceError(from);
  }

  if (exists.sync(to) && !opts.overwrite) {
    throw generateDestinationExistsError(to);
  }
};

const canOverwriteItSync = (context) => {
  if (typeof context.opts.overwrite === 'function') {
    const destInspectData = inspect$1.sync(context.destPath, inspectOptions);
    return context.opts.overwrite(context.srcInspectData, destInspectData);
  }
  return context.opts.overwrite === true;
};

const copyFileSync = (srcPath, destPath, mode$$1, context) => {
  const data = fs_1.readFileSync(srcPath);
  try {
    fs_1.writeFileSync(destPath, data, { mode: mode$$1, flag: 'wx' });
  } catch (err) {
    if (err.code === 'ENOENT') {
      write$1.sync(destPath, data, { mode: mode$$1 });
    } else if (err.code === 'EEXIST') {
      if (canOverwriteItSync(context)) {
        fs_1.writeFileSync(destPath, data, { mode: mode$$1 });
      } else if (shouldThrowDestinationExistsError(context)) {
        throw generateDestinationExistsError(context.destPath);
      }
    } else {
      throw err;
    }
  }
};

const copySymlinkSync = (from, to) => {
  const symlinkPointsAt = fs_1.readlinkSync(from);
  try {
    fs_1.symlinkSync(symlinkPointsAt, to);
  } catch (err) {
    // There is already file/symlink with this name on destination location.
    // Must erase it manually, otherwise system won't allow us to place symlink there.
    if (err.code === 'EEXIST') {
      fs_1.unlinkSync(to);
      // Retry...
      fs_1.symlinkSync(symlinkPointsAt, to);
    } else {
      throw err;
    }
  }
};

const copyItemSync = (srcPath, srcInspectData, destPath, opts) => {
  const context = { srcPath, destPath, srcInspectData, opts };
  const mode$$1 = mode.normalizeFileMode(srcInspectData.mode);
  if (srcInspectData.type === 'dir') {
    dir.createSync(destPath, { mode: mode$$1 });
  } else if (srcInspectData.type === 'file') {
    copyFileSync(srcPath, destPath, mode$$1, context);
  } else if (srcInspectData.type === 'symlink') {
    copySymlinkSync(srcPath, destPath);
  }
};

const copySync = (from, to, options) => {
  const opts = parseOptions(options, from);

  checksBeforeCopyingSync(from, to, opts);

  tree_walker.sync(from, { inspectOptions }, (srcPath, srcInspectData) => {
    const rel = pathUtil.relative(from, srcPath);
    const destPath = pathUtil.resolve(to, rel);
    if (opts.allowedToCopy(srcPath, destPath, srcInspectData)) {
      copyItemSync(srcPath, srcInspectData, destPath, opts);
    }
  });
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const checksBeforeCopyingAsync = (from, to, opts) => {
  return exists.async(from)
  .then((srcPathExists) => {
    if (!srcPathExists) {
      throw generateNoSourceError(from);
    } else {
      return exists.async(to);
    }
  })
  .then((destPathExists) => {
    if (destPathExists && !opts.overwrite) {
      throw generateDestinationExistsError(to);
    }
  });
};

const canOverwriteItAsync = (context) => {
  return new Promise((resolve, reject) => {
    if (typeof context.opts.overwrite === 'function') {
      inspect$1.async(context.destPath, inspectOptions)
      .then((destInspectData) => {
        resolve(context.opts.overwrite(context.srcInspectData, destInspectData));
      })
      .catch(reject);
    } else {
      resolve(context.opts.overwrite === true);
    }
  });
};

const copyFileAsync = (srcPath, destPath, mode$$1, context, runOptions) => {
  return new Promise((resolve, reject) => {
    const runOpts = runOptions || {};

    let flags = 'wx';
    if (runOpts.overwrite) {
      flags = 'w';
    }

    const readStream = fs_1.createReadStream(srcPath);
    const writeStream = fs_1.createWriteStream(destPath, { mode: mode$$1, flags });

    readStream.on('error', reject);

    writeStream.on('error', (err) => {
      // Force read stream to close, since write stream errored
      // read stream serves us no purpose.
      readStream.resume();

      if (err.code === 'ENOENT') {
        // Some parent directory doesn't exits. Create it and retry.
        dir.createAsync(pathUtil.dirname(destPath))
        .then(() => {
          copyFileAsync(srcPath, destPath, mode$$1, context)
          .then(resolve, reject);
        })
        .catch(reject);
      } else if (err.code === 'EEXIST') {
        canOverwriteItAsync(context)
        .then((canOverwite) => {
          if (canOverwite) {
            copyFileAsync(srcPath, destPath, mode$$1, context, { overwrite: true })
            .then(resolve, reject);
          } else if (shouldThrowDestinationExistsError(context)) {
            reject(generateDestinationExistsError(destPath));
          } else {
            resolve();
          }
        })
        .catch(reject);
      } else {
        reject(err);
      }
    });

    writeStream.on('finish', resolve);

    readStream.pipe(writeStream);
  });
};

const copySymlinkAsync = (from, to) => {
  return fs_1.readlink(from)
  .then((symlinkPointsAt) => {
    return new Promise((resolve, reject) => {
      fs_1.symlink(symlinkPointsAt, to)
      .then(resolve)
      .catch((err) => {
        if (err.code === 'EEXIST') {
          // There is already file/symlink with this name on destination location.
          // Must erase it manually, otherwise system won't allow us to place symlink there.
          fs_1.unlink(to)
          .then(() => {
            // Retry...
            return fs_1.symlink(symlinkPointsAt, to);
          })
          .then(resolve, reject);
        } else {
          reject(err);
        }
      });
    });
  });
};

const copyItemAsync = (srcPath, srcInspectData, destPath, opts) => {
  const context = { srcPath, destPath, srcInspectData, opts };
  const mode$$1 = mode.normalizeFileMode(srcInspectData.mode);
  if (srcInspectData.type === 'dir') {
    return dir.createAsync(destPath, { mode: mode$$1 });
  } else if (srcInspectData.type === 'file') {
    return copyFileAsync(srcPath, destPath, mode$$1, context);
  } else if (srcInspectData.type === 'symlink') {
    return copySymlinkAsync(srcPath, destPath);
  }
  // Ha! This is none of supported file system entities. What now?
  // Just continuing without actually copying sounds sane.
  return Promise.resolve();
};

const copyAsync = (from, to, options) => {
  return new Promise((resolve, reject) => {
    const opts = parseOptions(options, from);

    checksBeforeCopyingAsync(from, to, opts)
    .then(() => {
      let allFilesDelivered = false;
      let filesInProgress = 0;

      const stream = tree_walker.stream(from, { inspectOptions })
      .on('readable', () => {
        const item = stream.read();
        if (item) {
          const rel = pathUtil.relative(from, item.path);
          const destPath = pathUtil.resolve(to, rel);
          if (opts.allowedToCopy(item.path, item.item, destPath)) {
            filesInProgress += 1;
            copyItemAsync(item.path, item.item, destPath, opts)
            .then(() => {
              filesInProgress -= 1;
              if (allFilesDelivered && filesInProgress === 0) {
                resolve();
              }
            })
            .catch(reject);
          }
        }
      })
      .on('error', reject)
      .on('end', () => {
        allFilesDelivered = true;
        if (allFilesDelivered && filesInProgress === 0) {
          resolve();
        }
      });
    })
    .catch(reject);
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = copySync;
exports.async = copyAsync;
});

var copy_1 = copy.validateInput;
var copy_2 = copy.sync;
var copy_3 = copy.async;

var move = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, from, to) => {
  const methodSignature = `${methodName}(from, to)`;
  validate.argument(methodSignature, 'from', from, ['string']);
  validate.argument(methodSignature, 'to', to, ['string']);
};

const generateSourceDoesntExistError = (path) => {
  const err = new Error(`Path to move doesn't exist ${path}`);
  err.code = 'ENOENT';
  return err;
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const moveSync = (from, to) => {
  try {
    fs_1.renameSync(from, to);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      // We can't make sense of this error. Rethrow it.
      throw err;
    } else {
      // Ok, source or destination path doesn't exist.
      // Must do more investigation.
      if (!exists.sync(from)) {
        throw generateSourceDoesntExistError(from);
      }
      if (!exists.sync(to)) {
        // Some parent directory doesn't exist. Create it.
        dir.createSync(pathUtil.dirname(to));
        // Retry the attempt
        fs_1.renameSync(from, to);
      }
    }
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const ensureDestinationPathExistsAsync = (to) => {
  return new Promise((resolve, reject) => {
    const destDir = pathUtil.dirname(to);
    exists.async(destDir)
    .then((dstExists) => {
      if (!dstExists) {
        dir.createAsync(destDir)
        .then(resolve, reject);
      } else {
        // Hah, no idea.
        reject();
      }
    })
    .catch(reject);
  });
};

const moveAsync = (from, to) => {
  return new Promise((resolve, reject) => {
    fs_1.rename(from, to)
    .then(resolve)
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        // Something unknown. Rethrow original error.
        reject(err);
      } else {
        // Ok, source or destination path doesn't exist.
        // Must do more investigation.
        exists.async(from)
        .then((srcExists) => {
          if (!srcExists) {
            reject(generateSourceDoesntExistError(from));
          } else {
            ensureDestinationPathExistsAsync(to)
            .then(() => {
              // Retry the attempt
              return fs_1.rename(from, to);
            })
            .then(resolve, reject);
          }
        })
        .catch(reject);
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = moveSync;
exports.async = moveAsync;
});

var move_1 = move.validateInput;
var move_2 = move.sync;
var move_3 = move.async;

var read$1 = createCommonjsModule$$1(function (module, exports) {
/* eslint no-console:1 */

const supportedReturnAs = ['utf8', 'buffer', 'json', 'jsonWithDates'];

const validateInput = (methodName, path, returnAs) => {
  const methodSignature = `${methodName}(path, returnAs)`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.argument(methodSignature, 'returnAs', returnAs, ['string', 'undefined']);

  if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) {
    throw new Error(`Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(', ')}`);
  }
};

// Matches strings generated by Date.toJSON()
// which is called to serialize date to JSON.
const jsonDateParser = (key, value) => {
  const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  if (typeof value === 'string') {
    if (reISO.exec(value)) {
      return new Date(value);
    }
  }
  return value;
};

const makeNicerJsonParsingError = (path, err) => {
  const nicerError = new Error(`JSON parsing failed while reading ${path} [${err}]`);
  nicerError.originalError = err;
  return nicerError;
};

// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const readSync = (path, returnAs) => {
  const retAs = returnAs || 'utf8';
  let data;

  let encoding = 'utf8';
  if (retAs === 'buffer') {
    encoding = null;
  }

  try {
    data = fs_1.readFileSync(path, { encoding });
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If file doesn't exist return undefined instead of throwing.
      return undefined;
    }
    // Otherwise rethrow the error
    throw err;
  }

  try {
    if (retAs === 'json') {
      data = JSON.parse(data);
    } else if (retAs === 'jsonWithDates') {
      data = JSON.parse(data, jsonDateParser);
    }
  } catch (err) {
    throw makeNicerJsonParsingError(path, err);
  }

  return data;
};

// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------

const readAsync = (path, returnAs) => {
  return new Promise((resolve, reject) => {
    const retAs = returnAs || 'utf8';
    let encoding = 'utf8';
    if (retAs === 'buffer') {
      encoding = null;
    }

    fs_1.readFile(path, { encoding })
    .then((data) => {
      // Make final parsing of the data before returning.
      try {
        if (retAs === 'json') {
          resolve(JSON.parse(data));
        } else if (retAs === 'jsonWithDates') {
          resolve(JSON.parse(data, jsonDateParser));
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(makeNicerJsonParsingError(path, err));
      }
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        // If file doesn't exist return undefined instead of throwing.
        resolve(undefined);
      } else {
        // Otherwise throw
        reject(err);
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = readSync;
exports.async = readAsync;
});

var read_1 = read$1.validateInput;
var read_2 = read$1.sync;
var read_3 = read$1.async;

var rename = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, path, newName) => {
  const methodSignature = `${methodName}(path, newName)`;
  validate.argument(methodSignature, 'path', path, ['string']);
  validate.argument(methodSignature, 'newName', newName, ['string']);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const renameSync = (path, newName) => {
  const newPath = pathUtil.join(pathUtil.dirname(path), newName);
  move.sync(path, newPath);
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const renameAsync = (path, newName) => {
  const newPath = pathUtil.join(pathUtil.dirname(path), newName);
  return move.async(path, newPath);
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = renameSync;
exports.async = renameAsync;
});

var rename_1 = rename.validateInput;
var rename_2 = rename.sync;
var rename_3 = rename.async;

var symlink = createCommonjsModule$$1(function (module, exports) {
const validateInput = (methodName, symlinkValue, path) => {
  const methodSignature = `${methodName}(symlinkValue, path)`;
  validate.argument(methodSignature, 'symlinkValue', symlinkValue, ['string']);
  validate.argument(methodSignature, 'path', path, ['string']);
};

// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------

const symlinkSync = (symlinkValue, path) => {
  try {
    fs_1.symlinkSync(symlinkValue, path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Parent directories don't exist. Just create them and rety.
      dir.createSync(pathUtil.dirname(path));
      fs_1.symlinkSync(symlinkValue, path);
    } else {
      throw err;
    }
  }
};

// ---------------------------------------------------------
// Async
// ---------------------------------------------------------

const symlinkAsync = (symlinkValue, path) => {
  return new Promise((resolve, reject) => {
    fs_1.symlink(symlinkValue, path)
    .then(resolve)
    .catch((err) => {
      if (err.code === 'ENOENT') {
        // Parent directories don't exist. Just create them and rety.
        dir.createAsync(pathUtil.dirname(path))
        .then(() => {
          return fs_1.symlink(symlinkValue, path);
        })
        .then(resolve, reject);
      } else {
        reject(err);
      }
    });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = symlinkSync;
exports.async = symlinkAsync;
});

var symlink_1 = symlink.validateInput;
var symlink_2 = symlink.sync;
var symlink_3 = symlink.async;

var createWriteStream = fs.createWriteStream;
var createReadStream = fs.createReadStream;

var streams = {
	createWriteStream: createWriteStream,
	createReadStream: createReadStream
};

var util$2 = ( util$1 && util ) || util$1;

var jetpack = createCommonjsModule$$1(function (module) {
/* eslint no-param-reassign:0 */

const jetpackContext = (cwdPath) => {
  const getCwdPath = () => {
    return cwdPath || process.cwd();
  };

  const cwd$$1 = function () {
    // return current CWD if no arguments specified...
    if (arguments.length === 0) {
      return getCwdPath();
    }

    // ...create new CWD context otherwise
    const args = Array.prototype.slice.call(arguments);
    const pathParts = [getCwdPath()].concat(args);
    return jetpackContext(pathUtil.resolve.apply(null, pathParts));
  };

  // resolves path to inner CWD path of this jetpack instance
  const resolvePath = (path) => {
    return pathUtil.resolve(getCwdPath(), path);
  };

  const getPath = function () {
    // add CWD base path as first element of arguments array
    Array.prototype.unshift.call(arguments, getCwdPath());
    return pathUtil.resolve.apply(null, arguments);
  };

  const normalizeOptions = (options) => {
    const opts = options || {};
    opts.cwd = getCwdPath();
    return opts;
  };

  // API

  const api = {
    cwd: cwd$$1,
    path: getPath,

    append: (path, data, options) => {
      append.validateInput('append', path, data, options);
      append.sync(resolvePath(path), data, options);
    },
    appendAsync: (path, data, options) => {
      append.validateInput('appendAsync', path, data, options);
      return append.async(resolvePath(path), data, options);
    },

    copy: (from, to, options) => {
      copy.validateInput('copy', from, to, options);
      copy.sync(resolvePath(from), resolvePath(to), options);
    },
    copyAsync: (from, to, options) => {
      copy.validateInput('copyAsync', from, to, options);
      return copy.async(resolvePath(from), resolvePath(to), options);
    },

    createWriteStream: (path, options) => {
      return streams.createWriteStream(resolvePath(path), options);
    },
    createReadStream: (path, options) => {
      return streams.createReadStream(resolvePath(path), options);
    },

    dir: (path, criteria) => {
      dir.validateInput('dir', path, criteria);
      const normalizedPath = resolvePath(path);
      dir.sync(normalizedPath, criteria);
      return cwd$$1(normalizedPath);
    },
    dirAsync: (path, criteria) => {
      dir.validateInput('dirAsync', path, criteria);
      return new Promise((resolve, reject) => {
        const normalizedPath = resolvePath(path);
        dir.async(normalizedPath, criteria)
        .then(() => {
          resolve(cwd$$1(normalizedPath));
        }, reject);
      });
    },

    exists: (path) => {
      exists.validateInput('exists', path);
      return exists.sync(resolvePath(path));
    },
    existsAsync: (path) => {
      exists.validateInput('existsAsync', path);
      return exists.async(resolvePath(path));
    },

    file: (path, criteria) => {
      file.validateInput('file', path, criteria);
      file.sync(resolvePath(path), criteria);
      return api;
    },
    fileAsync: (path, criteria) => {
      file.validateInput('fileAsync', path, criteria);
      return new Promise((resolve, reject) => {
        file.async(resolvePath(path), criteria)
        .then(() => {
          resolve(api);
        }, reject);
      });
    },

    find: (startPath, options) => {
      // startPath is optional parameter, if not specified move rest of params
      // to proper places and default startPath to CWD.
      if (typeof options === 'undefined' && typeof startPath === 'object') {
        options = startPath;
        startPath = '.';
      }
      find.validateInput('find', startPath, options);
      return find.sync(resolvePath(startPath), normalizeOptions(options));
    },
    findAsync: (startPath, options) => {
      // startPath is optional parameter, if not specified move rest of params
      // to proper places and default startPath to CWD.
      if (typeof options === 'undefined' && typeof startPath === 'object') {
        options = startPath;
        startPath = '.';
      }
      find.validateInput('findAsync', startPath, options);
      return find.async(resolvePath(startPath), normalizeOptions(options));
    },

    inspect: (path, fieldsToInclude) => {
      inspect$1.validateInput('inspect', path, fieldsToInclude);
      return inspect$1.sync(resolvePath(path), fieldsToInclude);
    },
    inspectAsync: (path, fieldsToInclude) => {
      inspect$1.validateInput('inspectAsync', path, fieldsToInclude);
      return inspect$1.async(resolvePath(path), fieldsToInclude);
    },

    inspectTree: (path, options) => {
      inspect_tree.validateInput('inspectTree', path, options);
      return inspect_tree.sync(resolvePath(path), options);
    },
    inspectTreeAsync: (path, options) => {
      inspect_tree.validateInput('inspectTreeAsync', path, options);
      return inspect_tree.async(resolvePath(path), options);
    },

    list: (path) => {
      list.validateInput('list', path);
      return list.sync(resolvePath(path || '.'));
    },
    listAsync: (path) => {
      list.validateInput('listAsync', path);
      return list.async(resolvePath(path || '.'));
    },

    move: (from, to) => {
      move.validateInput('move', from, to);
      move.sync(resolvePath(from), resolvePath(to));
    },
    moveAsync: (from, to) => {
      move.validateInput('moveAsync', from, to);
      return move.async(resolvePath(from), resolvePath(to));
    },

    read: (path, returnAs) => {
      read$1.validateInput('read', path, returnAs);
      return read$1.sync(resolvePath(path), returnAs);
    },
    readAsync: (path, returnAs) => {
      read$1.validateInput('readAsync', path, returnAs);
      return read$1.async(resolvePath(path), returnAs);
    },

    remove: (path) => {
      remove.validateInput('remove', path);
      // If path not specified defaults to CWD
      remove.sync(resolvePath(path || '.'));
    },
    removeAsync: (path) => {
      remove.validateInput('removeAsync', path);
      // If path not specified defaults to CWD
      return remove.async(resolvePath(path || '.'));
    },

    rename: (path, newName) => {
      rename.validateInput('rename', path, newName);
      rename.sync(resolvePath(path), newName);
    },
    renameAsync: (path, newName) => {
      rename.validateInput('renameAsync', path, newName);
      return rename.async(resolvePath(path), newName);
    },

    symlink: (symlinkValue, path) => {
      symlink.validateInput('symlink', symlinkValue, path);
      symlink.sync(symlinkValue, resolvePath(path));
    },
    symlinkAsync: (symlinkValue, path) => {
      symlink.validateInput('symlinkAsync', symlinkValue, path);
      return symlink.async(symlinkValue, resolvePath(path));
    },

    write: (path, data, options) => {
      write$1.validateInput('write', path, data, options);
      write$1.sync(resolvePath(path), data, options);
    },
    writeAsync: (path, data, options) => {
      write$1.validateInput('writeAsync', path, data, options);
      return write$1.async(resolvePath(path), data, options);
    },
  };

  if (util$2.inspect.custom !== undefined) {
    // Without this console.log(jetpack) throws obscure error. Details:
    // https://github.com/szwacz/fs-jetpack/issues/29
    // https://nodejs.org/api/util.html#util_custom_inspection_functions_on_objects
    api[util$2.inspect.custom] = () => {
      return `[fs-jetpack CWD: ${getCwdPath()}]`;
    };
  }

  return api;
};

module.exports = jetpackContext;
});

var main = jetpack();

var loader = function loader(location) {
  var snippetFiles = main.find(path.resolve('' + location), {
    matching: '*.json'
  });

  var specs = snippetFiles.reduce(function (sp, filename) {
    var snippet = main.read(filename, 'json');
    var cats = ['model', 'grammar'];

    cats.forEach(function (cat) {
      if (snippet[cat]) {
        Object.keys(snippet[cat]).forEach(function (key) {
          if (sp[cat][key]) {
            sp[cat][key] = [].concat(sp[cat][key], snippet[cat][key]);
          } else {
            sp[cat][key] = snippet[cat][key];
          }
        });
      }
    });
    if (snippet.entry) sp.entry = snippet.entry;

    return Object.assign({}, sp);
  }, {
    model: {},
    grammar: {},
    entry: null
  });

  return specs;
};

var Generator = function Generator(jsonSchemaLocation) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var seed = options.seed;
  var state = options.state ? options.state : {};
  var modifiers = options.modifiers ? options.modifiers : {};

  var schema = typeof jsonSchemaLocation === 'string' ? loader(jsonSchemaLocation) : jsonSchemaLocation;
  state = typeof state === 'string' ? loader(state) : state;

  modifiers = Object.assign({}, fns, modifiers);
  var grammars = schema.grammar;

  var _Parser = Parser(schema.entry, grammars),
      expandedGrammar = _Parser.expandedGrammar,
      toModel = _Parser.toModel;

  var models = toModel.map(function (model) {
    if (model.type === 'helper') {
      return modifiers[model.helper](model.input);
    }

    var character = state[model.character] || Model(schema.model[model.model], modifiers, seed);
    if (model.character) state[model.character] = character;

    var property = character[model.property];

    if (model.modifier) {
      property = model.modifier.reduce(function (result, modifier) {
        var modifierFn = modifiers[modifier];
        return modifierFn(result, seed);
      }, property);
    }

    return property;
  });

  var compiled = compiler(expandedGrammar, models);
  return { compiled: compiled, state: state };
};

module.exports = Generator;

})));
});

var general = {
  "general-0": "::game.S.title:: birthed some of the greatest games of all time.",
  "general-1": "For every game sparking conversations about games as high art, another's there to remind us they can be weird.",
  "general-3": "The game maintains a cult following and spawned a sequel iterating on the bizarre approach to level design that made ::game.S.title:: a memorable journey.",
  "general-4": "It's great dumb fun.",
  "general-5": "::game.S.title:: was bombastic, scary and stunning.",
  "general-6": "Better than its film counterpart, ::game.S.title:: is a notable exception to the consensus that film-based games are needless cash tie-ins.",
  "general-7": "::game.S.title:: was able to grab awards from the Academy of Interactive Arts & Sciences, as well as nominations for its design from the Game Developers Choice Awards.",
  "general-8": "In Stockholm, the game was recently used to design and test urban planning.",
  "general-9": "::game.S.title:: abandoned the mission-to-mission structure of earlier games, allowing players to explore and interact with its Victorian-styled world, creating a more engaging, accessible, immersive sim.",
  "general-10": "Changing the world with every playthrough, ::game.S.title|possessive:: only objective is to explore — but at your leisure.",
  "general-11": "There's no princess to save or enemy to kill. It's simply a meditative experience through imaginary worlds, an experience only possible in games.",
  "general-12": "::game.S.title:: is the Occam's Razor of video games.",
  "general-13": "::game.S.title:: tempted players to keep exploring, all the while reminding them death was only one step away.",
  "general-14": "::game.S.title:: drove home the idea that games didn't necessarily need clear-cut objectives.",
  "general-15": "::game.S.title:: exhibited remarkable attention to detail.",
  "general-16": "It took no time for ::game.S.title:: to surpass all expectations.",
  "general-17": "It has become a popular speedrunning game.",
  "general-18": "The game gained a cult-following that led to it being featured in the Museum of Modern Art.",
  "general-19": "::game.S.title:: is often remembered for its unique Easter egg.",
  "general-20": "::game.S.title:: dared to be different.",
  "general-21": "::game.S.title:: got credit for being both fun and a learning experience about economics.",
  "general-22": "The game was supposedly developed to facilitate up to 10,000 players, though it never reached that number.",
  "general-23": "::game.S.title:: has remained one of Steam's most popular games, hitting one million concurrents at its peak.",
  "general-24": "The game has also been one of the biggest success stories in the esports world, with some prize pools topping $20 million.",
  "general-25": "With more than 100 million people playing ::game.S.title:: every month, it's hard to think of bigger game.",
  "general-26": "::game.S.title:: is one of the most lucrative esports titles in the world, with top prize pools totalling more than $6 million.",
  "general-27": "Requiring only one hand to operate and needing a second player to go against, ::game.S.title|possessive:: popularity rose in part to its frequent placement in bars.",
  "general-28": "::game.S.title:: charming sense of humor, surprisingly awesome soundtrack and addictive gameplay made gave it a true sense of character.",
  "general-29": "::game.S.title|possessive:: revolutionary active playstyle has helped the series stand the test of time.",
  "general-30": "::game.S.title:: innovated the amount of depth a game can have.",
  "general-31": "Very few games have built identity, history, and genre like ::game.S.title::."
};

var genre = {
  "genre-0": "::game.S.title:: is one of the tightest, tensest ::game.S.genre:: games available.",
  "genre-1": "::game.S.title|possessive:: unique approach to ::game.S.genre:: spawned a genre now a staple of the game industry.",
  "genre-2": "It is one of the best ::game.S.genre:: games of all time.",
  "genre-3": "Its gameplay helped pave the way for other games to experiment with the genre, leading to a renaissance of ::game.S.genre:: games.",
  "genre-4": "It doesn't hurt that, upon release, players considered it one of the finest ::game.S.genre:: games ever made.",
  "genre-5": "It helped popularize the ::game.S.genre:: genre in America, which now has a strong cult following.",
  "genre-6": "One of the all time best ::game.S.genre:: games, it is simple dumb fun.",
  "genre-7": "Unparalleled in its depth and complexity, ::game.S.title:: raised the mark for all other ::game.S.genre:: games.",
  "genre-8": "::game.S.title:: revolutionized the ::game.S.genre:: genre with how many real world variables it threw at players.",
  "genre-9": "::game.S.title|possessive:: accessibility, gameplay, and systems made it easier to enjoy than most other ::game.S.genre:: games that had shipped before.",
  "genre-10": "::game.S.title:: challenged everything you'd commonly expect from ::game.s.genre|articlize:: experience.",
  "genre-11": "::game.S.title:: felt like ::game.s.genre|articlize:: game on steroids.",
  "genre-12": "::game.S.title:: is a more cartoony ::game.S.genre:: than others of its kind, something it leans into with its world and puzzle design.",
  "genre-13": "Though not the first of its type, ::game.S.title:: revolutionized the ::game.S.genre:: genre with how many real world variables it threw at players.",
  "genre-14": "::game.S.title:: is one of the best classic ::game.S.genre:: games.",
  "genre-15": "::game.S.title|possessive:: simple approach made it one of the best games in its genre.",
  "genre-16": "Combined with one of the more memorable stories told in games, ::game.S.title:: is often considered the best :game.S.genre:: game.",
  "genre-17": "Adding numerous new moves and mechanics that changed gameplay significantly, ::game.S.title:: was a successful attempt to update a once-stale ::game.S.genre::.",
  "genre-18": "Developed by only one person, ::game.S.title:: was one of ::game.S.releaseDate|possessive:: most talked-about games for its lighthearted approach to ::game.S.genre::.",
  "genre-19": "Its success not only changed how ::game.S.genre:: games were played, but also how the world looked at skateboarding.",
  "genre-20": "::game.S.title::, in a lot of ways, was more of the same for the ::game.S.genre:: genre.",
  "genre-21": "Every time you enjoy a ::game.S.genre::, remember to thank ::game.S.title::.",
  "genre-22": "::game.S.title:: was the template from which nearly every ::game.S.genre:: game drew inspiration.",
  "genre-23": "::game.S.title:: is among the pantheon of great ::game.S.genre:: games that turned video games from toys into a full blown business.",
  "genre-24": "The game had many features that became commonplace in ::game.S.genre:: after its release.",
  "genre-25": "::game.S.title:: caught the eyes of ::game.S.genre:: fans when it put a focus not only on speed, but on obliterating opponents.",
  "genre-26": "The game's success is, in part, credited with popularizing ::game.S.genre:: games around the globe.",
  "genre-27": "::game.S.title:: improved just about everything that had been in ::game.S.genre|articlize:: game up to that point, from the controls to the enemy AI to the gadgets.",
  "genre-28": "::game.S.title:: managed to walk a tightrope between being simple yet experimental, and many critics consider it the best ::game.S.genre:: game of all time.",
  "genre-29": "For ::game.S.title:: fans, it still stands out as one of the best representations of the genre in games.",
  "genre-30": "::game.S.title:: dominated the ::game.S.genre:: genre.",
  "genre-31": "::game.S.tilte:: distanced itself from other ::game.S.genre:: games with its extreme attention to detail.",
  "genre-32": "While ::game.S.genre:: games have a few forebears to their credit, none saw the same ubiquity and success as ::game.S.title::.",
  "genre-33": "::game.S.title:: is a master class in ::game.S.genre:: games, with a hero designed to appeal to, and inspire, a wide variety of gamers."
};

var mobile = {
  "mobile-0": "::game.S.title:: is another example of a mobile game done near-perfectly.",
  "mobile-1": "When ::game.S.title:: released on mobile devices in ::game.S.releaseDate::, it differentiated itself from other mobile games with its acclaimed presentation, depth and amount of content."
};

var singlePlatform = {
  "singlePlatform-0": "::game.S.title:: pushed the ::game.S.platform:: to its limits.",
  "singlePlatform-1": "::game.S.title:: was a standout of weird ::game.S.platform:: releases.",
  "singlePlatform-2": "::game.S.title:: was in someways the last hurrah on the ::game.S.platform::.",
  "singlePlatform-3": "::game.S.title:: was a must-own for ::game.S.genre::-lovers on the ::game.S.platform::.",
  "singlePlatform-4": "::game.S.title|possessive:: tight gameplay made it a standout of the then-aging ::game.S.platform::.",
  "singlePlatform-5": "When released in ::game.S.releaseDate::, ::game.S.title:: set a new world record as the fastest-selling ::game.S.platform:: game, resonating quickly with players.",
  "singlePlatform-6": "Making use of the ::game.S.platform|possessive:: internal clock for realistic passages of time, players were free to live out a new life, filling days with numerous side activities.",
  "singlePlatform-7": "::game.S.title:: was one of the only ::game.S.platform:: games to utilize motion controls.",
  "singlePlatform-8": "One of the biggest success stories of the ::game.S.platform::, ::game.S.title:: wasn't afraid to be weird, and its deeply emotional story remains a fan favorite still today.",
  "singlePlatform-9": "::game.S.title:: played like a dream despite — and in part because of — the unusual ::game.S.platform:: controller setup."
};

var difficulty = {
  "difficulty-0": "::game.S.title:: helped popularize difficulty as a selling point.",
  "difficulty-1": "A game easy to pick up and instantly find satisfaction with, ::game.S.title:: constantly tempts you into playing it just a little longer with dangerously addictive gameplay.",
  "difficulty-2": "::game.S.title:: may very well be the magnum opus of ultra-difficult ::game.S.genre:: games.",
  "difficulty-3": "Requiring skill and fast responses, ::game.S.title|possessive:: fun-but-precise gameplay made it easy to pick up and play but a task to master.",
  "difficulty-4": "::game.S.title:: tapped into the part of the brain craving \"just one more go,\" leading to numerous lost days in its world.",
  "difficulty-5": "::game.S.title:: tried to marry two audiences: fans of weird humor and fans of difficult ::game.S.genre:: games.",
  "difficulty-6": "::game.S.title:: did away with ::game.S.genre:: conventions in favor of more approachable alternatives, making it a good first step into the genre.",
  "difficulty-7": "::game.S.title:: emphasized real(ish) combat focused on skill — especially when death is usually one hit away.",
  "difficulty-8": "One of the most complex games ever made, ::game.S.title:: is often described as a part-time job.",
  "difficulty-9": "::game.S.title:: was developed around being easy to understand and fun to play.",
  "difficulty-10": "It expertly rode the line between simulation and arcade experience, making it possible for players of all skill levels to jump in, play, and find something to love."

};

var features = {
  "features-0": "Featuring a then-novel concept, ::game.S.title:: let players choose the character they wanted to be and how they wanted to play.",
  "features-1": "Its innovative use of varied gameplay is an early example of a game pushing its gameplay beyond one schtick.",
  "features-2": "::game.S.title:: is a rare example of ::game.S.genre|articlize:: game incentivizing exploration.",
  "features-3": "Impossibly big, ::game.S.title:: gave players a world to lose themselves in.",
  "features-4": "Pitting two players against each other with only a sword — success in ::game.S.title:: relies equally on skill and luck.",
  "features-5": "::game.S.title:: combined visual novel elements to flesh out its lore and backstory, a move many saw as groundbreaking for the genre.",
  "features-6": "Tasking up to four players with breaking out of a castle, players were invited to utilize the interactive environment and items in the world to progress — something notable and revolutionary in ::game.S.releaseDate::.",
  "features-7": "Building upon great dungeon design and overall presentation, ::game.S.title:: also introduced new gameplay mechanics.",
  "features-8": "::game.S.title:: radically redefined how players could interact with environments and how cinema and games could blend together.",
  "features-9": "Full of unique, inventive \"microgames,\" ::game.S.title:: also made use of a built-in gyro sensor.",
  "features-10": "Though many tried to steal its successful formula after its release, it took awhile for anyone to match ::game.S.title|possessive:: addictive, trick-based gameplay loop.",
  "features-11": "No other game matches the attitude of ::game.S.title::.",
  "features-12": "::game.S.title:: changed multiplayer games forever.",
  "features-13": "::game.S.title:: is a game about planning, each level a maze of opportunities to explore.",
  "features-14": "Whether your plan is an all-out assault or a silent game of cat and mouse, ::game.S.title|possessive:: world constantly adapted to your choices in positive and negative ways.",
  "features-15": "Never telling players how to pull off an objective, ::game.S.title:: also never let them forget the repercussions their actions had on the game's world.",
  "features-16": "::game.S.title:: pit four players against each other, all fighting to destroy the others' castles while defending their own.",
  "features-17": "The sheer size of ::game.S.title:: is still unparalleled by most other games.",
  "features-18": "The game featured a near-uncountable number of secrets, minigames, and side missions.",
  "features-19": "The game introduced numerous mechanics players hadn't seen before.",
  "features-20": "Its emphasis on exploration has been highly influential in games being worlds to explore, not just obstacles to overcome.",
  "features-21": "Introducing killstreaks, a level-up system, and many other new features, ::game.S.title:: changed the dynamics of multiplayer games forever.",
  "features-22": "::game.S.title|possessive:: mechanics felt like a fresh start.",
  "features-23": "With countless approaches to the objectives, the game was built for the player to come up with all sorts of dynamic solutions.",
  "features-24": "It allowed players to see the world change based on how they approached different challenges.",
  "features-25": "It allowed three players to play together cooperatively, a rare feat for a game released in ::game.S.releaseDate::.",
  "features-26": "Built to facilitate thousands of players at once, the game became famous for its massive, months-long events where hundreds, sometimes thousands of players would band together to take on entire cities.",
  "features-27": "::game.S.title:: set new standards with its sheer world size, quest depth and character options.",
  "features-28": "Developed by a supergroup of creative minds, ::game.S.title:: innovated with features like multiple endings and side quests that tied into the main plot.",
  "features-29": "The game reached beyond the confines of one city, its fictional world featured numerous terrains and multiple cities.",
  "features-30": "Unlike a lot of games at the time of its release, ::game.S.title:: told its story completely in-game, free of cutscenes.",
  "features-31": "The great world design allowed players to slip into ::game.S.title|possessive:: world, personally engaging with the story more than in other games.",
  "features-32": "::game.S.title:: marked the pinnacle of agency and consequences.",
  "features-33": "The bonds you form with your many crewmates throughout the game will have you replaying the game to make sure you savor every, last, one."
};

var artStyle = {
  "artStyle-0": "Nearly hypnotic, the game's gorgeous art-style make for a game as much a joy to look at as it is to play.",
  "artStyle-1": "It's rare for a game released in ::game.S.releaseDate:: to still look great, and yet ::game.S.title:: looks half its age.",
  "artStyle-2": "::game.S.title:: makes use of its minimalistic art direction to tell a story resonating with its players emotionally, making it one of the most renowned games of all time.",
  "artStyle-3": "Pairing the game's groundbreaking visuals with an incredibly smooth framerate, it turned out to be one of ::game.S.releaseDate|possessive:: most realistic games.",
  "artStyle-4": "Its tranquil visuals and sound design quickly garnered the game a massive fandom.",
  "artStyle-5": "When it hit the scene, ::game.S.title:: was one of the best-looking games out there.",
  "artStyle-6": "::game.S.title::, at the time, was one of the best looking games available.",
  "artStyle-7": "Its high frame rate, multiple camera angles and 3D NPCs made players feel closer to the action than ever before.",
  "artStyle-8": "A hyper-stylized take on the then-huge ::game.S.genre:: genre, ::game.S.title|possessive:: cel-shaded world, hip hop-influenced soundtrack and altogether zaniness made it stand out in a genre oversaturated with licensed tie-ins.",
  "artStyle-9": "::game.S.title:: used hand-drawn backgrounds and rotoscoped animations to make characters look lifelike.",
  "artStyle-10": "::game.S.title:: was a pioneer of cinematic games, with many critics praising its visuals, sound, and animation as innovative and top notch.",
  "artStyle-11": "::game.S.title:: featured a first-person view and visual depth that marked a big step forward for game visuals — and gave players the impression they were in a different world.",
  "artStyle-12": "Its visuals completely moved the bar forward.",
  "artStyle-13": "Unparalleled in detail at the time, ::game.S.title|possessive:: caught the eyes of critics and players, raising expectations for how games after it should look.",
  "artStyle-14": "Its beautiful, hand-drawn art style made it one of the best-looking games of its generation.",
  "artStyle-15": "It was a super pretty game."
};

var review = {
  "review-0": "While many reviews were semi-positive and the game has built a cult following since its release, the developer closed shortly after its release, making ::game.S.title:: its final game.",
  "review-1": "The game is a \"relaxing adventure\" that never takes advantage of its players, according to ::site.title::.",
  "review-2": "As ::site.title|possessive:: review put it, it \"is as beautiful as it is engaging.\"",
  "review-3": "Upon the game's release, many loved the abilities that allowed for worlds to be traversed in different ways other than just running and jumping, but were put off by the lack of polish and issues with the camera.",
  "review-4": "\"It is unflinchingly ambitious in a way that few games are,\" according to ::site.title::.",
  "review-5": "When it released, ::site.title:: said the game \"grabbed the gaming world with its color and imaginative design.\"",
  "review-6": "The changing weather, time of day, and new coordinate systems were seen as so realistic, the game's advertising claimed if it were any more lifelike \"you'd need a license.\"",
  "review-7": "Considered one of ::site.title|possessive:: 10 most important games, ::game.S.title:: was one of the more complex games of ::game.S.releaseDate::.",
  "review-8": "::game.S.title:: is one of the highest-rated ::game.S.genre:: games of all time.",
  "review-9": "::game.S.title:: was a precisely balanced game, \"perhaps one of the most finely tuned... of all time,\" according to ::site.title::.",
  "review-10": "When it released, the game was praised for its evolution of ::game.S.genre::-style gameplay",
  "review-11": "::game.S.title:: was a \"metagame-within-a-game… [where] anything could and probably would happen,\" according to ::site.title::.",
  "review-12": "Players all around the world fell in love with the game because of its catchy soundtracks and its unique mix of showmanship and technical performance."
};

var plot = {
  "plot-0": "::game.S.title:: told a wholesome story about friendship and how, even from different planets, we can find common ground.",
  "plot-1": "Equal parts John Huston and John Woo, it tells a story of love, addiction and tragedy, all tied together into a game.",
  "plot-2": "Greater than the sum of its parts, the story ::game.S.title:: tells about post-apocalyptic capitalism makes it an important example of games as political satire.",
  "plot-3": "Telling a semi-mature story about the dangers of robot sentience, ::game.S.title:: reinvented the :game.S.genre:: genre.",
  "plot-4": "::game.S.title:: told a story about becoming a professional skater.",
  "plot-5": "Bathed in the dying light of a crumbling rural town, ::game.S.title:: follows an aging truck driver as he delivers his final package to an address that can only be reached by a highway buried deep in the caves of Kentucky.",
  "plot-6": "This game is a journey through an America whose sun is setting, a place of tragic beauty where economic decline is painted in dream-like brush strokes of magical realism.",
  "plot-7": "The game allows players to explore its dystopian United States in great detail.",
  "plot-8": "The developers showed that they could make one of the best endings the game industry has ever seen.",
  "plot-9": "On the surface a game about space politics and intergalactic war, ::game.S.title:: is more memorable for the deep, emotional relationships with which the player could engage.",
  "plot-10": "::game.S.title:: pointed an angry finger right at the American dream.",
  "plot-11": "::game.S.title:: was a bleak, violent look at what life could be like for an immigrant.",
  "plot-12": "At the time of its release, ::game.S.title:: was unparalleled in its intense portrayal of war",
  "plot-13": "::game.S.title:: stood out as a game unafraid to examine sexuality in smart, nuanced ways — something hard to say about most games",
  "plot-14": "::game.S.title|possessive:: mature take on infidelity, lust, love and abuse showed the depth that game stories could achieve.",
  "plot-15": "::game.S.title:: is all about the tranquility of a simple life.",
  "plot-16": "Allowing players to decide how to tackle daily activities, ::game.S.title:: turned the mundanities of life into soothing, charming experiences.",
  "plot-17": "Telling a surprisingly emotional story about gang life and the difficulties of escaping it, ::game.S.title:: was a watershed moment.",
  "plot-18": "::game.S.title:: is said to be a view of America from those who don’t live there, but that excludes the painstaking nostalgic touches infused throughout.",
  "plot-19": "Its greatest mission is \"Home Coming.\" The main character, after having gone through hell — returns to a family that had seen better days as well.",
  "plot-20": "In ::game.S.title::, you're out to help those in need — through the power of dance.",
  "plot-21": "::game.S.title:: was a bleak story about science gone wrong.",
  "plot-22": "Essentially putting you on a suicide mission, the game built upon its deep relationships by placing your favorite characters' lives in your hands."
};

var model = {
  game: {
    genre: ['superhero', 'horror', 'racing', 'puzzle', 'metroidvania', 'arcade', 'action', 'strategy', 'RPG', 'first person shooter', 'third person shooter', 'visual novel', 'platformer', 'action platformer', 'split-screen co-op', 'simulation', 'action-role playing', 'city-sim', 'flight simulator', 'grand strategy', 'real-time strategy', 'farming', 'walking simulator', 'text adventure', 'adventure', 'action-adventure', 'action sports', 'twin-stick shooter', 'clicker', 'MMO', 'MOBA', 'fighting', 'hockey', 'football', 'MMA', 'character action', 'rhythm', 'open-world']
  }
};

var model$1 = {
  site: {
    title: ['Game Informer', 'Polygon', 'GameSpot', 'WayPoint', 'Giant Bomb', 'IGN', 'Electronic Gaming Monthly', 'The Guardian', 'Engadget', 'Time Magazine']
  }
};

var generator$1 = function generator(_ref) {
  var title = _ref.title,
      platform = _ref.platform,
      releaseDate = _ref.releaseDate,
      type = _ref.type,
      seed = _ref.seed;

  var model$$1 = Object.assign({}, model, model$1);
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
  Object.assign(grammar, features);
  Object.assign(grammar, artStyle);

  var options = ['plot', 'genre', 'general', 'review', 'difficulty', 'features', 'artStyle'];
  if (platform.length === 1) options.push('singlePlatform');
  if (type === 'mobile') options.push('mobile');

  var descriptors = fns.sample({ array: options, seed: seed, amount: 3 });

  var entry = descriptors.reduce(function (string, option, i) {
    var keyes = Object.keys(grammar);
    var matches = keyes.filter(function (key) {
      return key.match(option, 'g');
    });
    var sampled = fns.sample({ array: matches, seed: seed });
    return i === 0 ? '::!' + sampled + '::' : string + ' ::!' + sampled + '::';
  }, '');

  var schema = { model: model$$1, grammar: grammar, entry: entry };
  return deutung(schema, { seed: seed }).compiled;
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
    var seed = siteName + i;
    var amount = fns.between({ array: [1, 4], seed: seed });
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
  paintListPage({ container: container, list: list, title: siteName, amount: number });
  setTimeout(function () {
    document.querySelector("ul").scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

formEvent();

}());
