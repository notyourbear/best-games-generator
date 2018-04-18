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
!function(e,t){t();}(0,function(){var e="undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{};function t(e,t){return e(t={exports:{}},t.exports), t.exports}var n=t(function(e,t){var n;n=function(){var e=[],t=[],n={},r={},i={};function o(e){return"string"==typeof e?new RegExp("^"+e+"$","i"):e}function s(e,t){return e===t?t:e===e.toUpperCase()?t.toUpperCase():e[0]===e[0].toUpperCase()?t.charAt(0).toUpperCase()+t.substr(1).toLowerCase():t.toLowerCase()}function a(e,t){return e.replace(t[0],function(n,r){var i,o,a=(i=t[1], o=arguments, i.replace(/\$(\d{1,2})/g,function(e,t){return o[t]||""}));return s(""===n?e[r-1]:n,a)})}function u(e,t,r){if(!e.length||n.hasOwnProperty(e))return t;for(var i=r.length;i--;){var o=r[i];if(o[0].test(t))return a(t,o)}return t}function c(e,t,n){return function(r){var i=r.toLowerCase();return t.hasOwnProperty(i)?s(r,i):e.hasOwnProperty(i)?s(r,e[i]):u(i,r,n)}}function h(e,t,n,r){return function(r){var i=r.toLowerCase();return!!t.hasOwnProperty(i)||!e.hasOwnProperty(i)&&u(i,i,n)===i}}function f(e,t,n){return(n?t+" ":"")+(1===t?f.singular(e):f.plural(e))}return f.plural=c(i,r,e), f.isPlural=h(i,r,e), f.singular=c(r,i,t), f.isSingular=h(r,i,t), f.addPluralRule=function(t,n){e.push([o(t),n]);}, f.addSingularRule=function(e,n){t.push([o(e),n]);}, f.addUncountableRule=function(e){"string"!=typeof e?(f.addPluralRule(e,"$0"), f.addSingularRule(e,"$0")):n[e.toLowerCase()]=!0;}, f.addIrregularRule=function(e,t){t=t.toLowerCase(), e=e.toLowerCase(), i[e]=t, r[t]=e;}, [["I","we"],["me","us"],["he","they"],["she","they"],["them","them"],["myself","ourselves"],["yourself","yourselves"],["itself","themselves"],["herself","themselves"],["himself","themselves"],["themself","themselves"],["is","are"],["was","were"],["has","have"],["this","these"],["that","those"],["echo","echoes"],["dingo","dingoes"],["volcano","volcanoes"],["tornado","tornadoes"],["torpedo","torpedoes"],["genus","genera"],["viscus","viscera"],["stigma","stigmata"],["stoma","stomata"],["dogma","dogmata"],["lemma","lemmata"],["schema","schemata"],["anathema","anathemata"],["ox","oxen"],["axe","axes"],["die","dice"],["yes","yeses"],["foot","feet"],["eave","eaves"],["goose","geese"],["tooth","teeth"],["quiz","quizzes"],["human","humans"],["proof","proofs"],["carve","carves"],["valve","valves"],["looey","looies"],["thief","thieves"],["groove","grooves"],["pickaxe","pickaxes"],["whiskey","whiskies"]].forEach(function(e){return f.addIrregularRule(e[0],e[1])}), [[/s?$/i,"s"],[/[^\u0000-\u007F]$/i,"$0"],[/([^aeiou]ese)$/i,"$1"],[/(ax|test)is$/i,"$1es"],[/(alias|[^aou]us|tlas|gas|ris)$/i,"$1es"],[/(e[mn]u)s?$/i,"$1s"],[/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i,"$1"],[/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1i"],[/(alumn|alg|vertebr)(?:a|ae)$/i,"$1ae"],[/(seraph|cherub)(?:im)?$/i,"$1im"],[/(her|at|gr)o$/i,"$1oes"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,"$1a"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,"$1a"],[/sis$/i,"ses"],[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i,"$1$2ves"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/([^ch][ieo][ln])ey$/i,"$1ies"],[/(x|ch|ss|sh|zz)$/i,"$1es"],[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i,"$1ices"],[/(m|l)(?:ice|ouse)$/i,"$1ice"],[/(pe)(?:rson|ople)$/i,"$1ople"],[/(child)(?:ren)?$/i,"$1ren"],[/eaux$/i,"$0"],[/m[ae]n$/i,"men"],["thou","you"]].forEach(function(e){return f.addPluralRule(e[0],e[1])}), [[/s$/i,""],[/(ss)$/i,"$1"],[/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,"$1fe"],[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i,"$1f"],[/ies$/i,"y"],[/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,"$1ie"],[/\b(mon|smil)ies$/i,"$1ey"],[/(m|l)ice$/i,"$1ouse"],[/(seraph|cherub)im$/i,"$1"],[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i,"$1"],[/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i,"$1sis"],[/(movie|twelve|abuse|e[mn]u)s$/i,"$1"],[/(test)(?:is|es)$/i,"$1is"],[/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1us"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,"$1um"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,"$1on"],[/(alumn|alg|vertebr)ae$/i,"$1a"],[/(cod|mur|sil|vert|ind)ices$/i,"$1ex"],[/(matr|append)ices$/i,"$1ix"],[/(pe)(rson|ople)$/i,"$1rson"],[/(child)ren$/i,"$1"],[/(eau)x?$/i,"$1"],[/men$/i,"man"]].forEach(function(e){return f.addSingularRule(e[0],e[1])}), ["adulthood","advice","agenda","aid","alcohol","ammo","anime","athletics","audio","bison","blood","bream","buffalo","butter","carp","cash","chassis","chess","clothing","cod","commerce","cooperation","corps","debris","diabetes","digestion","elk","energy","equipment","excretion","expertise","flounder","fun","gallows","garbage","graffiti","headquarters","health","herpes","highjinks","homework","housework","information","jeans","justice","kudos","labour","literature","machinery","mackerel","mail","media","mews","moose","music","manga","news","pike","plankton","pliers","pollution","premises","rain","research","rice","salmon","scissors","series","sewage","shambles","shrimp","species","staff","swine","tennis","traffic","transporation","trout","tuna","wealth","welfare","whiting","wildebeest","wildlife","you",/[^aeiou]ese$/i,/deer$/i,/fish$/i,/measles$/i,/o[iu]s$/i,/pox$/i,/sheep$/i].forEach(f.addUncountableRule), f}, e.exports=n();}),r=t(function(e){!function(e,t,n){function r(e,t){return t.c=e.c, t.s0=e.s0, t.s1=e.s1, t.s2=e.s2, t}function i(e,t){var n=new function(e){var t,n=this,r=(t=4022871197, function(e){e=e.toString();for(var n=0;n<e.length;n++){var r=.02519603282416938*(t+=e.charCodeAt(n));r-=t=r>>>0, t=(r*=t)>>>0, t+=4294967296*(r-=t);}return 2.3283064365386963e-10*(t>>>0)});n.next=function(){var e=2091639*n.s0+2.3283064365386963e-10*n.c;return n.s0=n.s1, n.s1=n.s2, n.s2=e-(n.c=0|e)}, n.c=1, n.s0=r(" "), n.s1=r(" "), n.s2=r(" "), n.s0-=r(e), n.s0<0&&(n.s0+=1), n.s1-=r(e), n.s1<0&&(n.s1+=1), n.s2-=r(e), n.s2<0&&(n.s2+=1), r=null;}(e),i=t&&t.state,o=n.next;return o.int32=function(){return 4294967296*n.next()|0}, o.double=function(){return o()+1.1102230246251565e-16*(2097152*o()|0)}, o.quick=o, i&&("object"==typeof i&&r(i,n), o.state=function(){return r(n,{})}), o}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.alea=i;}(0,e,!1);}),i=t(function(e){!function(e,t,n){function r(e,t){return t.x=e.x, t.y=e.y, t.z=e.z, t.w=e.w, t}function i(e,t){var n=new function(e){var t=this,n="";t.x=0, t.y=0, t.z=0, t.w=0, t.next=function(){var e=t.x^t.x<<11;return t.x=t.y, t.y=t.z, t.z=t.w, t.w^=t.w>>>19^e^e>>>8}, e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r), t.next();}(e),i=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===e);return e}, o.int32=n.next, o.quick=o, i&&("object"==typeof i&&r(i,n), o.state=function(){return r(n,{})}), o}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.xor128=i;}(0,e,!1);}),o=t(function(e){!function(e,t,n){function r(e,t){return t.x=e.x, t.y=e.y, t.z=e.z, t.w=e.w, t.v=e.v, t.d=e.d, t}function i(e,t){var n=new function(e){var t=this,n="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y, t.y=t.z, t.z=t.w, t.w=t.v, (t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^e^e<<1)|0}, t.x=0, t.y=0, t.z=0, t.w=0, t.v=0, e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r), r==n.length&&(t.d=t.x<<10^t.x>>>4), t.next();}(e),i=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===e);return e}, o.int32=n.next, o.quick=o, i&&("object"==typeof i&&r(i,n), o.state=function(){return r(n,{})}), o}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.xorwow=i;}(0,e,!1);}),s=t(function(e){!function(e,t,n){function r(e,t){return t.x=e.x.slice(), t.i=e.i, t}function i(e,t){null==e&&(e=+new Date);var n=new function(e){var t=this;t.next=function(){var e,n,r=t.x,i=t.i;return e=r[i], n=(e^=e>>>7)^e<<24, n^=(e=r[i+1&7])^e>>>10, n^=(e=r[i+3&7])^e>>>3, n^=(e=r[i+4&7])^e<<7, e=r[i+7&7], n^=(e^=e<<13)^e<<9, r[i]=n, t.i=i+1&7, n}, function(e,t){var n,r=[];if(t===(0|t))r[0]=t;else for(t=""+t, n=0;n<t.length;++n)r[7&n]=r[7&n]<<15^t.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&0===r[n];++n);for(8==n?r[7]=-1:r[n], e.x=r, e.i=0, n=256;n>0;--n)e.next();}(t,e);}(e),i=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===e);return e}, o.int32=n.next, o.quick=o, i&&(i.x&&r(i,n), o.state=function(){return r(n,{})}), o}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.xorshift7=i;}(0,e,!1);}),a=t(function(e){!function(e,t,n){function r(e,t){return t.i=e.i, t.w=e.w, t.X=e.X.slice(), t}function i(e,t){null==e&&(e=+new Date);var n=new function(e){var t=this;t.next=function(){var e,n,r=t.w,i=t.X,o=t.i;return t.w=r=r+1640531527|0, n=i[o+34&127], e=i[o=o+1&127], n^=n<<13, e^=e<<17, n^=n>>>15, e^=e>>>12, n=i[o]=n^e, t.i=o, n+(r^r>>>16)|0}, function(e,t){var n,r,i,o,s,a=[],u=128;for(t===(0|t)?(r=t, t=null):(t+="\0", r=0, u=Math.max(u,t.length)), i=0, o=-32;o<u;++o)t&&(r^=t.charCodeAt((o+32)%t.length)), 0===o&&(s=r), r^=r<<10, r^=r>>>15, r^=r<<4, r^=r>>>13, o>=0&&(s=s+1640531527|0, i=0==(n=a[127&o]^=r+s)?i+1:0);for(i>=128&&(a[127&(t&&t.length||0)]=-1), i=127, o=512;o>0;--o)r=a[i+34&127], n=a[i=i+1&127], r^=r<<13, n^=n<<17, r^=r>>>15, n^=n>>>12, a[i]=r^n;e.w=s, e.X=a, e.i=i;}(t,e);}(e),i=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===e);return e}, o.int32=n.next, o.quick=o, i&&(i.X&&r(i,n), o.state=function(){return r(n,{})}), o}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.xor4096=i;}(0,e,!1);}),u=t(function(e){!function(e,t,n){function r(e,t){return t.a=e.a, t.b=e.b, t.c=e.c, t.d=e.d, t}function i(e,t){var n=new function(e){var t=this,n="";t.next=function(){var e=t.b,n=t.c,r=t.d,i=t.a;return e=e<<25^e>>>7^n, n=n-r|0, r=r<<24^r>>>8^i, i=i-e|0, t.b=e=e<<20^e>>>12^n, t.c=n=n-r|0, t.d=r<<16^n>>>16^i, t.a=i-e|0}, t.a=0, t.b=0, t.c=-1640531527, t.d=1367130551, e===Math.floor(e)?(t.a=e/4294967296|0, t.b=0|e):n+=e;for(var r=0;r<n.length+20;r++)t.b^=0|n.charCodeAt(r), t.next();}(e),i=t&&t.state,o=function(){return(n.next()>>>0)/4294967296};return o.double=function(){do{var e=((n.next()>>>11)+(n.next()>>>0)/4294967296)/(1<<21);}while(0===e);return e}, o.int32=n.next, o.quick=o, i&&("object"==typeof i&&r(i,n), o.state=function(){return r(n,{})}), o}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.tychei=i;}(0,e,!1);}),c={},h=Object.freeze({default:c}),f=h&&c||h,l=t(function(e){!function(t,n){var r,i=this,o=256,s=6,a="random",u=n.pow(o,s),c=n.pow(2,52),h=2*c,l=o-1;function d(e,f,d){var m=[],y=_(function e(t,n){var r,i=[],o=typeof t;if(n&&"object"==o)for(r in t)try{i.push(e(t[r],n-1));}catch(e){}return i.length?i:"string"==o?t:t+"\0"}((f=1==f?{entropy:!0}:f||{}).entropy?[e,g(t)]:null==e?function(){try{var e;return r&&(e=r.randomBytes)?e=e(o):(e=new Uint8Array(o), (i.crypto||i.msCrypto).getRandomValues(e)), g(e)}catch(e){var n=i.navigator,s=n&&n.plugins;return[+new Date,i,s,i.screen,g(t)]}}():e,3),m),v=new function(e){var t,n=e.length,r=this,i=0,s=r.i=r.j=0,a=r.S=[];n||(e=[n++]);for(;i<o;)a[i]=i++;for(i=0;i<o;i++)a[i]=a[s=l&s+e[i%n]+(t=a[i])], a[s]=t;(r.g=function(e){for(var t,n=0,i=r.i,s=r.j,a=r.S;e--;)t=a[i=l&i+1], n=n*o+a[l&(a[i]=a[s=l&s+t])+(a[s]=t)];return r.i=i, r.j=s, n})(o);}(m),w=function(){for(var e=v.g(s),t=u,n=0;e<c;)e=(e+n)*o, t*=o, n=v.g(1);for(;e>=h;)e/=2, t/=2, n>>>=1;return(e+n)/t};return w.int32=function(){return 0|v.g(4)}, w.quick=function(){return v.g(4)/4294967296}, w.double=w, _(g(v.S),t), (f.pass||d||function(e,t,r,i){return i&&(i.S&&p(i,v), e.state=function(){return p(v,{})}), r?(n[a]=e, t):e})(w,y,"global"in f?f.global:this==n,f.state)}function p(e,t){return t.i=e.i, t.j=e.j, t.S=e.S.slice(), t}function _(e,t){for(var n,r=e+"",i=0;i<r.length;)t[l&i]=l&(n^=19*t[l&i])+r.charCodeAt(i++);return g(t)}function g(e){return String.fromCharCode.apply(0,e)}if(n["seed"+a]=d, _(n.random(),t), e.exports){e.exports=d;try{r=f;}catch(e){}}else 0;}([],Math);});l.alea=r, l.xor128=i, l.xorwow=o, l.xorshift7=s, l.xor4096=a, l.tychei=u;var d=l,p=t(function(t){(function(){var e,n,r,i,o,s=[].slice;r={0:{8:{_:o="an"},9:{_:o},"-":{1:{1:{_:o}},4:{" ":{_:e="a"},_:o},6:{"-":{_:o}},8:{_:o}}},1:{1:{0:{_:e},1:{_:e},2:{_:e},3:{_:e},4:{_:e},5:{_:e},6:{_:e},7:{_:e},8:{_:e},9:{_:e},_:o,".":{4:{_:e}}},8:{0:{0:{_:o},1:{_:o},2:{_:o},3:{_:o},4:{_:o},5:{_:o},6:{_:o},7:{_:o},8:{_:o},9:{_:o},_:e},1:{"-":{_:e}," ":{_:e}},2:{"-":{_:e}," ":{_:e}},3:{"-":{_:e}," ":{_:e}},4:{"-":{_:e}," ":{_:e}},5:{"-":{_:e}," ":{_:e}},6:{"-":{_:e}," ":{_:e}},7:{"-":{_:e}," ":{_:e}},8:{"-":{_:e}," ":{_:e}},9:{"-":{_:e}," ":{_:e}},_:o}},8:{0:{0:{x:{_:e}}},9:{0:{_:e}},_:o,",":{1:{_:e}}},"`":{a:{_:o}},"£":{8:{_:o}},"∞":{_:o},a:{" ":{_:e},b:{o:{u:{t:{"-":{_:o}},_:e}}},g:{a:{i:{_:e}}},l:{"-":{I:{_:e}},g:{u:{_:e}},t:{h:{_:e}}},m:{o:{n:{_:e}}},n:{" ":{_:e},d:{a:{_:o},e:{_:o},r:{_:o},_:e},o:{t:{_:e}},y:{w:{_:e}}},p:{r:{e:{_:e}}},r:{e:{" ":{_:e},":":{_:e}},t:{"í":{_:e}}},_:o},A:{$:{_:e},A:{A:{_:e}},n:{d:{a:{l:{u:{c:{_:e}}}}}},r:{m:{a:{t:{_:e}}}},s:{t:{u:{r:{i:{a:{s:{_:e}}}}}}},t:{h:{l:{e:{t:{i:{_:o}}},o:{_:o},_:e}}},U:{$:{_:e},D:{_:e},S:{C:{_:e}}},_:o},"Á":{_:o},"á":{";":{_:o}},"à":{_:o},"Ä":{_:o},"ā":{_:o},"Å":{_:o},"æ":{_:o},"Æ":{n:{_:e},_:o},D:{"ú":{n:{_:e}}},e:{".":{g:{_:e}},a:{c:{h:{" ":{_:e}}}},i:{t:{h:{e:{r:{" ":{_:e},".":{_:e}}}}}},l:{"-":{_:e},l:{a:{_:e}}},m:{p:{e:{z:{_:e}}}},n:{o:{u:{g:{_:e}}}},u:{p:{" ":{_:o}},_:e},w:{_:e},x:{i:{s:{t:{s:{_:e}}}}},_:o},E:{m:{p:{e:{z:{_:e}}}},n:{a:{m:{_:e}}},s:{p:{a:{d:{_:o}},e:{_:o},o:{_:o},_:e}},u:{l:{_:o},_:e},U:{R:{_:e}},_:o},"é":{g:{_:e},t:{a:{_:o},u:{_:o},_:e},_:o},"É":{_:o},f:{"-":{_:o}," ":{_:o},"/":{_:o},M:{_:o},p:{_:o},t:{_:o}},F:{0:{_:o},1:{_:o},2:{_:o},3:{_:o},4:{_:o},5:{_:o},6:{_:o},9:{_:o},"'":{_:o},"-":{_:o}," ":{_:o},'"':{_:o},"#":{_:o},",":{_:o},".":{_:o},"/":{_:o},"”":{_:o},A:{C:{_:e},D:{_:e},I:{R:{_:e}},L:{_:e},M:{_:e},N:{_:e},P:{_:e},Q:{_:e},R:{_:e},S:{_:e},T:{_:e},_:o},B:{_:o},C:{_:o},c:{_:o},D:{_:o},E:{C:{_:o},I:{_:o}},F:{" ":{_:e},_:o},f:{_:o},h:{_:o},H:{_:o},I:{A:{T:{_:e},_:o},D:{" ":{_:o}},R:{" ":{_:o}},S:{" ":{_:o}}},K:{_:o},L:{C:{_:o},N:{_:o},P:{_:o}},M:{R:{_:e},_:o},O:{" ":{_:o},I:{" ":{_:o}}},P:{".":{_:e},"?":{_:e},C:{"?":{_:e}},_:o},R:{C:{_:o},S:{_:o}},S:{_:o},T:{S:{_:e},T:{_:e},_:o},U:{" ":{_:o},",":{_:o},".":{_:o}},V:{_:o},W:{D:{_:e},_:o},X:{_:o},Y:{_:o},"σ":{_:o}},G:{h:{a:{e:{_:o},i:{_:o}}}},h:{"'":{_:o},"-":{U:{_:e},_:o}," ":{_:o},'"':{_:o},",":{_:o},C:{_:o},e:{i:{r:{a:{_:e},_:o}}},i:{m:{s:{_:o}},s:{t:{o:{r:{i:{c:{_:e}}}}}}},o:{m:{a:{_:o},m:{_:o}},n:{e:{y:{_:e}},k:{_:e},v:{_:e},_:o},r:{s:{" ":{_:o}}},u:{r:{_:o}}},t:{t:{p:{" ":{_:o}},_:e},_:o}},H:{1:{_:o},2:{_:o},3:{_:o},4:{_:o},5:{_:o},"'":{_:o},"-":{_:o}," ":{_:o},'"':{_:o},"&":{_:o},",":{_:o},".":{A:{_:e},_:o},"+":{_:o},a:{b:{i:{l:{i:{t:{a:{t:{i:{o:{n:{s:{_:o}}}}}}}}}}}},B:{_:o},C:{_:o},D:{B:{_:e},_:o},e:{i:{r:{_:o}}},F:{_:o},G:{_:o},H:{_:o},I:{D:{_:e},G:{_:e},M:{_:e},P:{_:e},_:o},L:{A:{"-":{D:{_:e}}},_:o},M:{_:o},N:{_:o},o:{n:{d:{_:e},e:{s:{_:o},_:e},g:{_:e},k:{_:e},o:{l:{_:e}},_:o},u:{r:{_:o}}},O:{" ":{_:o},V:{_:o}},P:{_:o},Q:{_:o},R:{T:{_:e},_:o},S:{" ":{_:e},R:{_:e},T:{_:e},_:o},T:{P:{_:e},_:o},V:{_:o},W:{T:{_:o}}},i:{".":{e:{_:e}},b:{n:{_:e}},f:{" ":{_:e}},i:{_:e},n:{c:{l:{u:{d:{i:{_:e}}}}},d:{i:{c:{a:{t:{e:{s:{_:e}}}}}}},s:{t:{e:{a:{d:{"?":{_:o}},_:e}}}}},s:{" ":{_:e},".":{_:e}},t:{" ":{_:e}},u:{_:e},_:o},I:{"-":{A:{_:e},I:{_:e}},I:{I:{_:e}},l:{b:{_:e}},M:{H:{_:e}},m:{a:{m:{s:{_:e}}}},R:{"£":{_:e}},s:{l:{a:{m:{" ":{_:e},",":{_:e},".":{_:e}},n:{d:{s:{_:e}}}}}},_:o},"İ":{_:o},J:{i:{a:{n:{_:e},_:o}}},k:{u:{" ":{_:o}}},l:{" ":{_:o},'"':{_:o},p:{_:o}},L:{1:{_:o},2:{_:o},3:{_:o},5:{_:o},"'":{A:{_:e},_:o},"-":{a:{_:e},_:o}," ":{_:o},'"':{_:o},"&":{_:o},",":{_:o},".":{_:o},"/":{_:o},a:{e:{_:o},o:{i:{g:{_:o}}}},A:{" ":{_:o},L:{_:o},P:{_:o}},B:{_:o},C:{_:o},D:{_:o},E:{A:{_:e},E:{_:e},G:{_:e},O:{_:e},P:{_:e},T:{_:e},_:o},F:{_:o},G:{_:o},H:{_:o},I:{R:{_:o}},L:{_:o},M:{X:{_:e},_:o},N:{_:o},o:{c:{h:{a:{_:o}}}},O:{E:{_:o}},P:{_:o},R:{_:o},S:{_:o},T:{_:o},U:{" ":{_:o}},V:{_:o},X:{_:o},Z:{_:o}},m:{"-":{_:o}," ":{_:o},'"':{_:o},"&":{_:o},a:{k:{e:{s:{" ":{_:o}}}}},b:{_:o},e:{i:{n:{_:o}},n:{t:{i:{o:{n:{s:{_:o}}}}}}},f:{_:o},p:{_:o},R:{_:o},t:{_:o}},M:{1:{9:{0:{_:o},_:e},_:o},2:{_:o},3:{_:o},4:{_:o},5:{_:o},6:{_:o},7:{_:o},8:{_:o},9:{_:o},"'":{_:o},"-":{t:{_:e},_:o}," ":{_:o},'"':{_:o},"&":{_:o},",":{_:o},".":{A:{".":{S:{_:e}}},_:o},"/":{_:o},A:{C:{_:e},D:{_:e},F:{_:e},G:{_:e},J:{_:e},L:{_:e},M:{_:e},N:{_:e},P:{_:e},R:{_:e},S:{_:e},T:{_:e},X:{_:e},Y:{_:e},_:o},B:{_:o},C:{_:o},D:{_:o},e:{"-":{_:o}},E:{d:{_:o},n:{_:o},P:{_:o}},F:{_:o},f:{_:o},G:{_:o},H:{_:o},h:{_:o},i:{e:{_:o}},I:{5:{_:o},6:{_:o}," ":{_:o},A:{_:o},T:{_:o}},K:{_:o},L:{_:o},M:{T:{_:e},_:o},N:{_:o},o:{U:{_:o}},O:{" ":{_:o},T:{" ":{_:o}},U:{_:o}},P:{_:o},R:{_:o},S:{_:o},s:{c:{_:o}},T:{R:{_:e},_:o},U:{V:{_:o}},V:{_:o},X:{_:o}},N:{4:{_:o},6:{_:o},"'":{_:o},"-":{a:{_:e},S:{_:e},_:o}," ":{_:o},'"':{_:o},",":{_:o},".":{Y:{_:e},_:o},"=":{_:o},"²":{_:o},a:{o:{_:o}},A:{" ":{_:o},A:{F:{_:e},_:o},I:{_:o},S:{L:{_:o}}},B:{_:o},C:{_:o},D:{_:o},E:{A:{_:o},H:{_:o},S:{" ":{_:o}}},F:{_:o},G:{_:o},H:{_:o},I:{C:{_:e},L:{_:e},M:{H:{_:o},_:e},N:{_:e},S:{_:e},_:o},J:{C:{_:o}},K:{_:o},L:{S:{_:e},_:o},M:{_:o},N:{R:{_:o},T:{_:o}},P:{O:{V:{"-":{_:o}},_:e},_:o},R:{J:{_:e},T:{_:e},_:o},S:{W:{_:e},_:o},T:{$:{_:e},_:o},U:{S:{_:o}},V:{_:o},v:{_:o},W:{A:{_:o}},X:{_:o},Y:{P:{_:o},U:{_:o}}},n:{"-":{_:o},"−":{_:o}," ":{_:o},'"':{_:o},"&":{_:o},",":{_:o},"+":{_:o},"×":{_:o},d:{a:{_:o}},p:{a:{_:o}},t:{_:o},V:{_:o},W:{_:o}},o:{b:{r:{_:e}},c:{c:{u:{r:{s:{_:e}}}},h:{o:{_:e}}},f:{" ":{_:e}},n:{"-":{_:o},"/":{_:o},b:{_:o},c:{o:{_:o}},d:{_:o},e:{r:{_:o}},g:{_:o},i:{_:o},l:{_:o},m:{_:o},o:{_:o},r:{_:o},s:{_:o},t:{_:o},u:{_:o},w:{_:o},y:{_:o},_:e},r:{" ":{_:e},",":{_:e}},u:{i:{_:e}},_:o},O:{b:{e:{r:{s:{t:{" ":{_:o},l:{_:o}},_:e}}}},l:{v:{_:e}},n:{e:{i:{_:o},_:e}},N:{E:{_:e}},o:{p:{_:e}},u:{i:{_:e}},_:o},"Ó":{_:o},"Ö":{_:o},"ö":{_:o},"Ō":{_:o},"ō":{_:o},P:{h:{o:{b:{_:o},i:{_:o}}}},r:{"'":{_:o},"-":{_:o}," ":{_:o},'"':{_:o},"&":{_:o},".":{_:o},e:{f:{e:{r:{s:{_:o}}}}},f:{_:o},m:{_:o},s:{_:o}},R:{1:{0:{_:e},_:o},2:{_:o},3:{_:o},4:{_:o},5:{_:o},6:{_:o},"'":{_:o},"-":{_:o}," ":{_:o},'"':{_:o},"&":{_:o},",":{_:o},".":{C:{_:e},_:o},"/":{_:o},A:{" ":{_:o},F:{_:o}},B:{_:o},C:{_:o},D:{_:o},E:{" ":{_:o},R:{_:o}},F:{_:o},f:{_:o},G:{_:o},H:{S:{_:o}},I:{A:{_:o},C:{" ":{_:o}}},J:{_:o},K:{_:o},L:{" ":{_:e},_:o},M:{1:{_:e},_:o},N:{G:{_:e},_:o},O:{T:{_:o}},P:{_:o},Q:{_:o},R:{_:o},S:{" ":{_:e},")":{_:e},",":{_:e},".":{_:e},"?":{_:e},T:{_:e},_:o},T:{_:o},U:{_:o},V:{_:o},X:{_:o}},s:{"-":{_:o},'"':{_:o},")":{_:o},",":{_:o},".":{_:o},a:{y:{s:{_:o}}},i:{c:{h:{_:o}}},p:{3:{_:o},r:{o:{t:{_:o}}}},s:{h:{_:o}},t:{a:{t:{e:{s:{" ":{_:o},":":{_:o}}}}}},v:{a:{_:e},e:{_:e},_:o}},S:{1:{_:o},2:{_:o},3:{_:o},4:{_:o},5:{_:o},6:{_:o},"'":{_:o},"-":{_:o}," ":{_:o},'"':{_:o},"&":{W:{_:e},_:o},",":{_:o},".":{B:{_:o},M:{_:o},O:{_:o}},"”":{_:o},A:{"-":{1:{_:e},_:o}," ":{_:o},C:{D:{_:o}},E:{_:o},S:{E:{_:e},_:o},T:{" ":{_:o},B:{_:o}}},B:{_:o},C:{A:{" ":{_:o}},C:{_:o},M:{_:o},O:{" ":{_:o}},R:{A:{_:e},_:o},T:{_:o}},D:{_:o},E:{" ":{_:o},C:{O:{_:e},R:{_:e},_:o},I:{_:o},O:{_:o}},F:{_:o},G:{_:o},H:{2:{_:o},3:{_:o},"-":{_:o}},I:{" ":{_:o}},J:{_:o},K:{_:o},L:{A:{_:e},I:{_:e},O:{_:e},_:o},M:{A:{_:e},E:{" ":{_:o},_:e},I:{_:e},_:o},N:{A:{_:e},E:{_:e},O:{_:e},_:o},O:{"(":{_:o},A:{" ":{_:o},I:{_:o}},E:{_:o},I:{_:o},S:{_:o},V:{_:o}},P:{A:{C:{_:e},D:{_:e},M:{_:e},N:{_:e},R:{_:e}},E:{" ":{_:o},_:e},I:{C:{_:e}},O:{_:e},U:{_:e},_:o},R:{_:o},S:{_:o},T:{"-":{_:o},A:{" ":{_:o}},B:{_:o},C:{_:o},D:{_:o},F:{_:o},L:{_:o},M:{_:o},S:{_:o},V:{_:o}},u:{r:{a:{" ":{_:o}}}},U:{B:{_:e},L:{_:e},N:{_:e},P:{_:e},S:{_:e},_:o},V:{_:o},W:{F:{_:o},P:{_:o},R:{_:o}},X:{S:{_:e},_:o}},t:{"-":{S:{_:o}},S:{_:o}},T:{a:{v:{e:{s:{_:o}}}},"à":{_:o}},u:{"-":{_:e}," ":{_:e},'"':{_:e},".":{_:e},b:{e:{_:o},_:e},f:{_:e},k:{a:{_:o},_:e},l:{u:{_:e}},m:{" ":{_:e}},n:{" ":{_:e},a:{" ":{_:e},n:{a:{_:o},n:{_:o},s:{_:o},t:{_:o},_:e},r:{y:{_:e}}},e:{" ":{_:e}},i:{c:{o:{r:{p:{_:o}}}},d:{i:{_:e},_:o},m:{o:{_:e},_:o},n:{_:o},v:{o:{_:o}},_:e},l:{e:{s:{_:e}}}},p:{o:{_:e}},r:{a:{_:e},e:{_:e},i:{_:e},l:{_:e},o:{_:e}},s:{"-":{_:o}," ":{_:o},h:{_:o},_:e},t:{m:{_:o},t:{_:o},_:e},v:{_:e},w:{_:e},_:o},U:{1:{_:o},"-":{B:{o:{_:e},_:o}},a:{_:o},b:{i:{_:e},_:o},D:{P:{"-":{_:o}}},d:{_:o},g:{l:{_:o}},h:{_:o},i:{_:o},l:{i:{_:e},_:o},m:{_:o},M:{N:{_:o}},n:{"-":{_:o},a:{n:{_:e},_:o},b:{_:o},c:{_:o},d:{_:o},e:{s:{_:e},_:o},f:{_:o},g:{_:o},h:{_:o},i:{d:{_:o},n:{_:o}},k:{_:o},l:{_:o},m:{_:o},n:{_:o},o:{_:o},p:{_:o},r:{_:o},s:{_:o},t:{e:{r:{s:{_:e}}},_:o},u:{_:o},w:{_:o}},p:{_:o},r:{a:{_:e},i:{_:e},u:{g:{u:{a:{y:{a:{n:{"-":{_:o}}}}}}},k:{_:o},_:e},_:o},s:{h:{_:o},t:{_:o}},t:{n:{_:o},o:{"-":{_:o}},r:{_:o},t:{_:o}},x:{_:o},z:{_:o}},"ü":{_:o},"Ü":{_:o},V:{I:{I:{_:o}}},x:{a:{_:e},e:{_:e},i:{_:e},o:{_:e},x:{_:e},y:{_:e},_:o},X:{a:{_:e},A:{_:e},e:{_:e},h:{_:e},i:{_:e},I:{V:{_:e},X:{_:e}},o:{_:e},u:{_:e},U:{_:e},V:{_:e},X:{" ":{_:o},_:e},y:{_:e},_:o},Y:{p:{_:o}},"α":{_:o},"ε":{_:o},"ω":{_:o}}, i=function(e,t,n){var o;return null==t&&(t=r), null==n&&(n="a"), null==e?n:(t=t[o=e.slice(0,1)], null!=o&&null!=t?i(e.slice(1),t,t._||n):n)}, n=function(){var e,t,n;return t=1<=arguments.length?s.call(arguments,0):[], n=function(){var n,r,o;for(o=[], n=0, r=t.length;n<r;n++)null!=(e=t[n])&&o.push(i(e)+" "+e);return o}(), 1===t.length?n[0]:n}, t.exports={find:i,articlize:n};}).call(e);}),_=(p.find, p.articlize, function(e,t,n){var r=n?d(n):d();return Math.floor(r()*(t-e))+e}),g={articlize:function(e){return p.articlize(e)},between:function(e,t){var n=e.split("-").map(Number);return _(n[0],n[1],t)},capitalize:function(e){return e[0].toUpperCase()+e.slice(1)},checkIfAlreadyGenerated:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return Object.keys(e).reduce(function(n,r){return"type"===r?n:e[r]===t[r]?n+=1:n},0)>=n},modifier:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.split("|");return function(){return function e(n,r){var i=t[r[0]]?t[r[0]].call(null,n):n;return 1===r.length?i:e(i,r.slice(1))}(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n)}},pluralize:function(e){return n(e)},possessive:function(e){return e+"'s"},sample:function(e,t){return"string"==typeof e?e:e[_(0,e.length,t)]},uppercase:function(e){return e.toUpperCase()}},m=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(r=(s=a.next()).done)&&(n.push(s.value), !t||n.length!==t);r=!0);}catch(e){i=!0, o=e;}finally{try{!r&&a.return&&a.return();}finally{if(i)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),y=g.sample;var v=function(e){switch(!0){case"|"===e[0][0]:return"helper";case"!"===e[0][0]:return"grammar";case e[e.length-1].includes("|"):return"modifiedModel";default:return"model"}},w=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=/::\.|[^ ]*::/g;return t.replace(r,function(t){if("!"!==t[2])return t;var i=t.slice(3,-2).split("."),o=i.reduce(function(e,t){return e[t]?e[t]:new Error("The grammar: "+i+" does not appear to exist")},n);return o instanceof Error?o:null===o.match(r)?o:e(o,n)})},b=function(e){var t=e.match(/::\.|[^ ]*::/g);return null===t?[]:t},E=function(e){var t=function(e,t){switch(e){case"helper":return{type:e,helper:t[0],input:t[1]};case"grammar":return{type:e,grammar:t[0]};default:return{type:e,toParse:t}}};return e.map(function(e){var n=e.slice(2,-2).split("."),r=v(n);if("helper"===r)return t(r,n[0].slice(1).split(":"));if("grammar"===r){var i=[n[0].slice(1)].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(n.slice(1))).join(".");return t(r,[i])}var o,s=n.pop().split("|"),a=(o=s, Array.isArray(o)?o:Array.from(o)),u=a[0],c=a.slice(1);return t(r,"modifiedModel"===r?n.concat(u,[c]):n.concat(u))})},S=function(e){var t={modCha:["model","character","property","modifier"],mod:["model","property","modifier"],cha:["model","character","property"],gen:["model","property"]};return e.map(function(e){return"helper"===e.type||"grammar"===e.type?e:("modifiedModel"===e.type?4===e.toParse.length?t.modCha:t.mod:3===e.toParse.length?t.cha:t.gen).reduce(function(t,n,r){return t[n]=e.toParse[r], Object.assign({},t,{type:"model"})},{})})},x="undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};function A(){throw new Error("setTimeout has not been defined")}function k(){throw new Error("clearTimeout has not been defined")}var R=A,T=k;function O(e){if(R===setTimeout)return setTimeout(e,0);if((R===A||!R)&&setTimeout)return R=setTimeout, setTimeout(e,0);try{return R(e,0)}catch(t){try{return R.call(null,e,0)}catch(t){return R.call(this,e,0)}}}"function"==typeof x.setTimeout&&(R=setTimeout), "function"==typeof x.clearTimeout&&(T=clearTimeout);var P,$=[],j=!1,I=-1;function M(){j&&P&&(j=!1, P.length?$=P.concat($):I=-1, $.length&&L());}function L(){if(!j){var e=O(M);j=!0;for(var t=$.length;t;){for(P=$, $=[];++I<t;)P&&P[I].run();I=-1, t=$.length;}P=null, j=!1, function(e){if(T===clearTimeout)return clearTimeout(e);if((T===k||!T)&&clearTimeout)return T=clearTimeout, clearTimeout(e);try{T(e);}catch(t){try{return T.call(null,e)}catch(t){return T.call(this,e)}}}(e);}}function C(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];$.push(new N(e,t)), 1!==$.length||j||O(L);}function N(e,t){this.fun=e, this.array=t;}N.prototype.run=function(){this.fun.apply(null,this.array);};function D(){}var B=D,U=D,z=D,F=D,Y=D,q=D,W=D;var H=x.performance||{},X=H.now||H.mozNow||H.msNow||H.oNow||H.webkitNow||function(){return(new Date).getTime()};var V=new Date;var G={nextTick:C,title:"browser",browser:!0,env:{},argv:[],version:"",versions:{},on:B,addListener:U,once:z,off:F,removeListener:Y,removeAllListeners:q,emit:W,binding:function(e){throw new Error("process.binding is not supported")},cwd:function(){return"/"},chdir:function(e){throw new Error("process.chdir is not supported")},umask:function(){return 0},hrtime:function(e){var t=.001*X.call(H),n=Math.floor(t),r=Math.floor(t%1*1e9);return e&&(n-=e[0], (r-=e[1])<0&&(n--, r+=1e9)), [n,r]},platform:"browser",release:{},config:{},uptime:function(){return(new Date-V)/1e3}},J=[],Z=[],K="undefined"!=typeof Uint8Array?Uint8Array:Array,Q=!1;function ee(){Q=!0;for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=0,n=e.length;t<n;++t)J[t]=e[t], Z[e.charCodeAt(t)]=t;Z["-".charCodeAt(0)]=62, Z["_".charCodeAt(0)]=63;}function te(e,t,n){for(var r,i,o=[],s=t;s<n;s+=3)r=(e[s]<<16)+(e[s+1]<<8)+e[s+2], o.push(J[(i=r)>>18&63]+J[i>>12&63]+J[i>>6&63]+J[63&i]);return o.join("")}function ne(e){var t;Q||ee();for(var n=e.length,r=n%3,i="",o=[],s=0,a=n-r;s<a;s+=16383)o.push(te(e,s,s+16383>a?a:s+16383));return 1===r?(t=e[n-1], i+=J[t>>2], i+=J[t<<4&63], i+="=="):2===r&&(t=(e[n-2]<<8)+e[n-1], i+=J[t>>10], i+=J[t>>4&63], i+=J[t<<2&63], i+="="), o.push(i), o.join("")}function re(e,t,n,r,i){var o,s,a=8*i-r-1,u=(1<<a)-1,c=u>>1,h=-7,f=n?i-1:0,l=n?-1:1,d=e[t+f];for(f+=l, o=d&(1<<-h)-1, d>>=-h, h+=a;h>0;o=256*o+e[t+f], f+=l, h-=8);for(s=o&(1<<-h)-1, o>>=-h, h+=r;h>0;s=256*s+e[t+f], f+=l, h-=8);if(0===o)o=1-c;else{if(o===u)return s?NaN:1/0*(d?-1:1);s+=Math.pow(2,r), o-=c;}return(d?-1:1)*s*Math.pow(2,o-r)}function ie(e,t,n,r,i,o){var s,a,u,c=8*o-i-1,h=(1<<c)-1,f=h>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=r?0:o-1,p=r?1:-1,_=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t), isNaN(t)||t===1/0?(a=isNaN(t)?1:0, s=h):(s=Math.floor(Math.log(t)/Math.LN2), t*(u=Math.pow(2,-s))<1&&(s--, u*=2), (t+=s+f>=1?l/u:l*Math.pow(2,1-f))*u>=2&&(s++, u/=2), s+f>=h?(a=0, s=h):s+f>=1?(a=(t*u-1)*Math.pow(2,i), s+=f):(a=t*Math.pow(2,f-1)*Math.pow(2,i), s=0));i>=8;e[n+d]=255&a, d+=p, a/=256, i-=8);for(s=s<<i|a, c+=i;c>0;e[n+d]=255&s, d+=p, s/=256, c-=8);e[n+d-p]|=128*_;}var oe={}.toString,se=Array.isArray||function(e){return"[object Array]"==oe.call(e)};he.TYPED_ARRAY_SUPPORT=void 0===x.TYPED_ARRAY_SUPPORT||x.TYPED_ARRAY_SUPPORT;var ae=ue();function ue(){return he.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function ce(e,t){if(ue()<t)throw new RangeError("Invalid typed array length");return he.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=he.prototype:(null===e&&(e=new he(t)), e.length=t), e}function he(e,t,n){if(!(he.TYPED_ARRAY_SUPPORT||this instanceof he))return new he(e,t,n);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return de(this,e)}return fe(this,e,t,n)}function fe(e,t,n,r){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function(e,t,n,r){if(t.byteLength, n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");t=void 0===n&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,n):new Uint8Array(t,n,r);he.TYPED_ARRAY_SUPPORT?(e=t).__proto__=he.prototype:e=pe(e,t);return e}(e,t,n,r):"string"==typeof t?function(e,t,n){"string"==typeof n&&""!==n||(n="utf8");if(!he.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|me(t,n),i=(e=ce(e,r)).write(t,n);i!==r&&(e=e.slice(0,i));return e}(e,t,n):function(e,t){if(ge(t)){var n=0|_e(t.length);return 0===(e=ce(e,n)).length?e:(t.copy(e,0,0,n), e)}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||(r=t.length)!=r?ce(e,0):pe(e,t);if("Buffer"===t.type&&se(t.data))return pe(e,t.data)}var r;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function le(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function de(e,t){if(le(t), e=ce(e,t<0?0:0|_e(t)), !he.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function pe(e,t){var n=t.length<0?0:0|_e(t.length);e=ce(e,n);for(var r=0;r<n;r+=1)e[r]=255&t[r];return e}function _e(e){if(e>=ue())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+ue().toString(16)+" bytes");return 0|e}function ge(e){return!(null==e||!e._isBuffer)}function me(e,t){if(ge(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return Ye(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return qe(e).length;default:if(r)return Ye(e).length;t=(""+t).toLowerCase(), r=!0;}}function ye(e,t,n){var r=e[t];e[t]=e[n], e[n]=r;}function ve(e,t,n,r,i){if(0===e.length)return-1;if("string"==typeof n?(r=n, n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648), n=+n, isNaN(n)&&(n=i?0:e.length-1), n<0&&(n=e.length+n), n>=e.length){if(i)return-1;n=e.length-1;}else if(n<0){if(!i)return-1;n=0;}if("string"==typeof t&&(t=he.from(t,r)), ge(t))return 0===t.length?-1:we(e,t,n,r,i);if("number"==typeof t)return t&=255, he.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):we(e,[t],n,r,i);throw new TypeError("val must be string, number or Buffer")}function we(e,t,n,r,i){var o,s=1,a=e.length,u=t.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1;s=2, a/=2, u/=2, n/=2;}function c(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(i){var h=-1;for(o=n;o<a;o++)if(c(e,o)===c(t,-1===h?0:o-h)){if(-1===h&&(h=o), o-h+1===u)return h*s}else-1!==h&&(o-=o-h), h=-1;}else for(n+u>a&&(n=a-u), o=n;o>=0;o--){for(var f=!0,l=0;l<u;l++)if(c(e,o+l)!==c(t,l)){f=!1;break}if(f)return o}return-1}function be(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r))>i&&(r=i):r=i;var o=t.length;if(o%2!=0)throw new TypeError("Invalid hex string");r>o/2&&(r=o/2);for(var s=0;s<r;++s){var a=parseInt(t.substr(2*s,2),16);if(isNaN(a))return s;e[n+s]=a;}return s}function Ee(e,t,n,r){return We(Ye(t,e.length-n),e,n,r)}function Se(e,t,n,r){return We(function(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}(t),e,n,r)}function xe(e,t,n,r){return Se(e,t,n,r)}function Ae(e,t,n,r){return We(qe(t),e,n,r)}function ke(e,t,n,r){return We(function(e,t){for(var n,r,i,o=[],s=0;s<e.length&&!((t-=2)<0);++s)n=e.charCodeAt(s), r=n>>8, i=n%256, o.push(i), o.push(r);return o}(t,e.length-n),e,n,r)}function Re(e,t,n){return 0===t&&n===e.length?ne(e):ne(e.slice(t,n))}function Te(e,t,n){n=Math.min(e.length,n);for(var r=[],i=t;i<n;){var o,s,a,u,c=e[i],h=null,f=c>239?4:c>223?3:c>191?2:1;if(i+f<=n)switch(f){case 1:c<128&&(h=c);break;case 2:128==(192&(o=e[i+1]))&&(u=(31&c)<<6|63&o)>127&&(h=u);break;case 3:o=e[i+1], s=e[i+2], 128==(192&o)&&128==(192&s)&&(u=(15&c)<<12|(63&o)<<6|63&s)>2047&&(u<55296||u>57343)&&(h=u);break;case 4:o=e[i+1], s=e[i+2], a=e[i+3], 128==(192&o)&&128==(192&s)&&128==(192&a)&&(u=(15&c)<<18|(63&o)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(h=u);}null===h?(h=65533, f=1):h>65535&&(h-=65536, r.push(h>>>10&1023|55296), h=56320|1023&h), r.push(h), i+=f;}return function(e){var t=e.length;if(t<=Oe)return String.fromCharCode.apply(String,e);var n="",r=0;for(;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=Oe));return n}(r)}he.poolSize=8192, he._augment=function(e){return e.__proto__=he.prototype, e}, he.from=function(e,t,n){return fe(null,e,t,n)}, he.TYPED_ARRAY_SUPPORT&&(he.prototype.__proto__=Uint8Array.prototype, he.__proto__=Uint8Array), he.alloc=function(e,t,n){return function(e,t,n,r){return le(t), t<=0?ce(e,t):void 0!==n?"string"==typeof r?ce(e,t).fill(n,r):ce(e,t).fill(n):ce(e,t)}(null,e,t,n)}, he.allocUnsafe=function(e){return de(null,e)}, he.allocUnsafeSlow=function(e){return de(null,e)}, he.isBuffer=He, he.compare=function(e,t){if(!ge(e)||!ge(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,r=t.length,i=0,o=Math.min(n,r);i<o;++i)if(e[i]!==t[i]){n=e[i], r=t[i];break}return n<r?-1:r<n?1:0}, he.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}}, he.concat=function(e,t){if(!se(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return he.alloc(0);var n;if(void 0===t)for(t=0, n=0;n<e.length;++n)t+=e[n].length;var r=he.allocUnsafe(t),i=0;for(n=0;n<e.length;++n){var o=e[n];if(!ge(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(r,i), i+=o.length;}return r}, he.byteLength=me, he.prototype._isBuffer=!0, he.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)ye(this,t,t+1);return this}, he.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)ye(this,t,t+3), ye(this,t+1,t+2);return this}, he.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)ye(this,t,t+7), ye(this,t+1,t+6), ye(this,t+2,t+5), ye(this,t+3,t+4);return this}, he.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?Te(this,0,e):function(e,t,n){var r=!1;if((void 0===t||t<0)&&(t=0), t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length), n<=0)return"";if((n>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return je(this,t,n);case"utf8":case"utf-8":return Te(this,t,n);case"ascii":return Pe(this,t,n);case"latin1":case"binary":return $e(this,t,n);case"base64":return Re(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ie(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(), r=!0;}}.apply(this,arguments)}, he.prototype.equals=function(e){if(!ge(e))throw new TypeError("Argument must be a Buffer");return this===e||0===he.compare(this,e)}, he.prototype.inspect=function(){var e="";return this.length>0&&(e=this.toString("hex",0,50).match(/.{2}/g).join(" "), this.length>50&&(e+=" ... ")), "<Buffer "+e+">"}, he.prototype.compare=function(e,t,n,r,i){if(!ge(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0), void 0===n&&(n=e?e.length:0), void 0===r&&(r=0), void 0===i&&(i=this.length), t<0||n>e.length||r<0||i>this.length)throw new RangeError("out of range index");if(r>=i&&t>=n)return 0;if(r>=i)return-1;if(t>=n)return 1;if(this===e)return 0;for(var o=(i>>>=0)-(r>>>=0),s=(n>>>=0)-(t>>>=0),a=Math.min(o,s),u=this.slice(r,i),c=e.slice(t,n),h=0;h<a;++h)if(u[h]!==c[h]){o=u[h], s=c[h];break}return o<s?-1:s<o?1:0}, he.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)}, he.prototype.indexOf=function(e,t,n){return ve(this,e,t,n,!0)}, he.prototype.lastIndexOf=function(e,t,n){return ve(this,e,t,n,!1)}, he.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8", n=this.length, t=0;else if(void 0===n&&"string"==typeof t)r=t, n=this.length, t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0, isFinite(n)?(n|=0, void 0===r&&(r="utf8")):(r=n, n=void 0);}var i=this.length-t;if((void 0===n||n>i)&&(n=i), e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var o=!1;;)switch(r){case"hex":return be(this,e,t,n);case"utf8":case"utf-8":return Ee(this,e,t,n);case"ascii":return Se(this,e,t,n);case"latin1":case"binary":return xe(this,e,t,n);case"base64":return Ae(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ke(this,e,t,n);default:if(o)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(), o=!0;}}, he.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var Oe=4096;function Pe(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i)r+=String.fromCharCode(127&e[i]);return r}function $e(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i)r+=String.fromCharCode(e[i]);return r}function je(e,t,n){var r=e.length;(!t||t<0)&&(t=0), (!n||n<0||n>r)&&(n=r);for(var i="",o=t;o<n;++o)i+=Fe(e[o]);return i}function Ie(e,t,n){for(var r=e.slice(t,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1]);return i}function Me(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function Le(e,t,n,r,i,o){if(!ge(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<o)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}function Ce(e,t,n,r){t<0&&(t=65535+t+1);for(var i=0,o=Math.min(e.length-n,2);i<o;++i)e[n+i]=(t&255<<8*(r?i:1-i))>>>8*(r?i:1-i);}function Ne(e,t,n,r){t<0&&(t=4294967295+t+1);for(var i=0,o=Math.min(e.length-n,4);i<o;++i)e[n+i]=t>>>8*(r?i:3-i)&255;}function De(e,t,n,r,i,o){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function Be(e,t,n,r,i){return i||De(e,0,n,4), ie(e,t,n,r,23,4), n+4}function Ue(e,t,n,r,i){return i||De(e,0,n,8), ie(e,t,n,r,52,8), n+8}he.prototype.slice=function(e,t){var n,r=this.length;if((e=~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r), (t=void 0===t?r:~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r), t<e&&(t=e), he.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,t)).__proto__=he.prototype;else{var i=t-e;n=new he(i,void 0);for(var o=0;o<i;++o)n[o]=this[o+e];}return n}, he.prototype.readUIntLE=function(e,t,n){e|=0, t|=0, n||Me(e,t,this.length);for(var r=this[e],i=1,o=0;++o<t&&(i*=256);)r+=this[e+o]*i;return r}, he.prototype.readUIntBE=function(e,t,n){e|=0, t|=0, n||Me(e,t,this.length);for(var r=this[e+--t],i=1;t>0&&(i*=256);)r+=this[e+--t]*i;return r}, he.prototype.readUInt8=function(e,t){return t||Me(e,1,this.length), this[e]}, he.prototype.readUInt16LE=function(e,t){return t||Me(e,2,this.length), this[e]|this[e+1]<<8}, he.prototype.readUInt16BE=function(e,t){return t||Me(e,2,this.length), this[e]<<8|this[e+1]}, he.prototype.readUInt32LE=function(e,t){return t||Me(e,4,this.length), (this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]}, he.prototype.readUInt32BE=function(e,t){return t||Me(e,4,this.length), 16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])}, he.prototype.readIntLE=function(e,t,n){e|=0, t|=0, n||Me(e,t,this.length);for(var r=this[e],i=1,o=0;++o<t&&(i*=256);)r+=this[e+o]*i;return r>=(i*=128)&&(r-=Math.pow(2,8*t)), r}, he.prototype.readIntBE=function(e,t,n){e|=0, t|=0, n||Me(e,t,this.length);for(var r=t,i=1,o=this[e+--r];r>0&&(i*=256);)o+=this[e+--r]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*t)), o}, he.prototype.readInt8=function(e,t){return t||Me(e,1,this.length), 128&this[e]?-1*(255-this[e]+1):this[e]}, he.prototype.readInt16LE=function(e,t){t||Me(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n}, he.prototype.readInt16BE=function(e,t){t||Me(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n}, he.prototype.readInt32LE=function(e,t){return t||Me(e,4,this.length), this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24}, he.prototype.readInt32BE=function(e,t){return t||Me(e,4,this.length), this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]}, he.prototype.readFloatLE=function(e,t){return t||Me(e,4,this.length), re(this,e,!0,23,4)}, he.prototype.readFloatBE=function(e,t){return t||Me(e,4,this.length), re(this,e,!1,23,4)}, he.prototype.readDoubleLE=function(e,t){return t||Me(e,8,this.length), re(this,e,!0,52,8)}, he.prototype.readDoubleBE=function(e,t){return t||Me(e,8,this.length), re(this,e,!1,52,8)}, he.prototype.writeUIntLE=function(e,t,n,r){(e=+e, t|=0, n|=0, r)||Le(this,e,t,n,Math.pow(2,8*n)-1,0);var i=1,o=0;for(this[t]=255&e;++o<n&&(i*=256);)this[t+o]=e/i&255;return t+n}, he.prototype.writeUIntBE=function(e,t,n,r){(e=+e, t|=0, n|=0, r)||Le(this,e,t,n,Math.pow(2,8*n)-1,0);var i=n-1,o=1;for(this[t+i]=255&e;--i>=0&&(o*=256);)this[t+i]=e/o&255;return t+n}, he.prototype.writeUInt8=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,1,255,0), he.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)), this[t]=255&e, t+1}, he.prototype.writeUInt16LE=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,2,65535,0), he.TYPED_ARRAY_SUPPORT?(this[t]=255&e, this[t+1]=e>>>8):Ce(this,e,t,!0), t+2}, he.prototype.writeUInt16BE=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,2,65535,0), he.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8, this[t+1]=255&e):Ce(this,e,t,!1), t+2}, he.prototype.writeUInt32LE=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,4,4294967295,0), he.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24, this[t+2]=e>>>16, this[t+1]=e>>>8, this[t]=255&e):Ne(this,e,t,!0), t+4}, he.prototype.writeUInt32BE=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,4,4294967295,0), he.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24, this[t+1]=e>>>16, this[t+2]=e>>>8, this[t+3]=255&e):Ne(this,e,t,!1), t+4}, he.prototype.writeIntLE=function(e,t,n,r){if(e=+e, t|=0, !r){var i=Math.pow(2,8*n-1);Le(this,e,t,n,i-1,-i);}var o=0,s=1,a=0;for(this[t]=255&e;++o<n&&(s*=256);)e<0&&0===a&&0!==this[t+o-1]&&(a=1), this[t+o]=(e/s>>0)-a&255;return t+n}, he.prototype.writeIntBE=function(e,t,n,r){if(e=+e, t|=0, !r){var i=Math.pow(2,8*n-1);Le(this,e,t,n,i-1,-i);}var o=n-1,s=1,a=0;for(this[t+o]=255&e;--o>=0&&(s*=256);)e<0&&0===a&&0!==this[t+o+1]&&(a=1), this[t+o]=(e/s>>0)-a&255;return t+n}, he.prototype.writeInt8=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,1,127,-128), he.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)), e<0&&(e=255+e+1), this[t]=255&e, t+1}, he.prototype.writeInt16LE=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,2,32767,-32768), he.TYPED_ARRAY_SUPPORT?(this[t]=255&e, this[t+1]=e>>>8):Ce(this,e,t,!0), t+2}, he.prototype.writeInt16BE=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,2,32767,-32768), he.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8, this[t+1]=255&e):Ce(this,e,t,!1), t+2}, he.prototype.writeInt32LE=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,4,2147483647,-2147483648), he.TYPED_ARRAY_SUPPORT?(this[t]=255&e, this[t+1]=e>>>8, this[t+2]=e>>>16, this[t+3]=e>>>24):Ne(this,e,t,!0), t+4}, he.prototype.writeInt32BE=function(e,t,n){return e=+e, t|=0, n||Le(this,e,t,4,2147483647,-2147483648), e<0&&(e=4294967295+e+1), he.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24, this[t+1]=e>>>16, this[t+2]=e>>>8, this[t+3]=255&e):Ne(this,e,t,!1), t+4}, he.prototype.writeFloatLE=function(e,t,n){return Be(this,e,t,!0,n)}, he.prototype.writeFloatBE=function(e,t,n){return Be(this,e,t,!1,n)}, he.prototype.writeDoubleLE=function(e,t,n){return Ue(this,e,t,!0,n)}, he.prototype.writeDoubleBE=function(e,t,n){return Ue(this,e,t,!1,n)}, he.prototype.copy=function(e,t,n,r){if(n||(n=0), r||0===r||(r=this.length), t>=e.length&&(t=e.length), t||(t=0), r>0&&r<n&&(r=n), r===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length), e.length-t<r-n&&(r=e.length-t+n);var i,o=r-n;if(this===e&&n<t&&t<r)for(i=o-1;i>=0;--i)e[i+t]=this[i+n];else if(o<1e3||!he.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)e[i+t]=this[i+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+o),t);return o}, he.prototype.fill=function(e,t,n,r){if("string"==typeof e){if("string"==typeof t?(r=t, t=0, n=this.length):"string"==typeof n&&(r=n, n=this.length), 1===e.length){var i=e.charCodeAt(0);i<256&&(e=i);}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!he.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;var o;if(t>>>=0, n=void 0===n?this.length:n>>>0, e||(e=0), "number"==typeof e)for(o=t;o<n;++o)this[o]=e;else{var s=ge(e)?e:Ye(new he(e,r).toString()),a=s.length;for(o=0;o<n-t;++o)this[o+t]=s[o%a];}return this};var ze=/[^+\/0-9A-Za-z-_]/g;function Fe(e){return e<16?"0"+e.toString(16):e.toString(16)}function Ye(e,t){var n;t=t||1/0;for(var r=e.length,i=null,o=[],s=0;s<r;++s){if((n=e.charCodeAt(s))>55295&&n<57344){if(!i){if(n>56319){(t-=3)>-1&&o.push(239,191,189);continue}if(s+1===r){(t-=3)>-1&&o.push(239,191,189);continue}i=n;continue}if(n<56320){(t-=3)>-1&&o.push(239,191,189), i=n;continue}n=65536+(i-55296<<10|n-56320);}else i&&(t-=3)>-1&&o.push(239,191,189);if(i=null, n<128){if((t-=1)<0)break;o.push(n);}else if(n<2048){if((t-=2)<0)break;o.push(n>>6|192,63&n|128);}else if(n<65536){if((t-=3)<0)break;o.push(n>>12|224,n>>6&63|128,63&n|128);}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128);}}return o}function qe(e){return function(e){var t,n,r,i,o,s;Q||ee();var a=e.length;if(a%4>0)throw new Error("Invalid string. Length must be a multiple of 4");o="="===e[a-2]?2:"="===e[a-1]?1:0, s=new K(3*a/4-o), r=o>0?a-4:a;var u=0;for(t=0, n=0;t<r;t+=4, n+=3)i=Z[e.charCodeAt(t)]<<18|Z[e.charCodeAt(t+1)]<<12|Z[e.charCodeAt(t+2)]<<6|Z[e.charCodeAt(t+3)], s[u++]=i>>16&255, s[u++]=i>>8&255, s[u++]=255&i;return 2===o?(i=Z[e.charCodeAt(t)]<<2|Z[e.charCodeAt(t+1)]>>4, s[u++]=255&i):1===o&&(i=Z[e.charCodeAt(t)]<<10|Z[e.charCodeAt(t+1)]<<4|Z[e.charCodeAt(t+2)]>>2, s[u++]=i>>8&255, s[u++]=255&i), s}(function(e){if((e=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e).replace(ze,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function We(e,t,n,r){for(var i=0;i<r&&!(i+n>=t.length||i>=e.length);++i)t[i+n]=e[i];return i}function He(e){return null!=e&&(!!e._isBuffer||Xe(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&Xe(e.slice(0,0))}(e))}function Xe(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}var Ve=Object.freeze({INSPECT_MAX_BYTES:50,kMaxLength:ae,Buffer:he,SlowBuffer:function(e){return+e!=e&&(e=0), he.alloc(+e)},isBuffer:He}),Ge="function"==typeof Object.create?function(e,t){e.super_=t, e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}});}:function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype, e.prototype=new n, e.prototype.constructor=e;},Je=/%[sdj%]/g;function Ze(e){if(!dt(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(nt(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,i=r.length,o=String(e).replace(Je,function(e){if("%%"===e)return"%";if(n>=i)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(e){return"[Circular]"}default:return e}}),s=r[n];n<i;s=r[++n])ht(s)||!mt(s)?o+=" "+s:o+=" "+nt(s);return o}function Ke(e,t){if(_t(x.process))return function(){return Ke(e,t).apply(this,arguments)};if(!0===G.noDeprecation)return e;var n=!1;return function(){if(!n){if(G.throwDeprecation)throw new Error(t);G.traceDeprecation?console.trace(t):console.error(t), n=!0;}return e.apply(this,arguments)}}var Qe,et={};function tt(e){if(_t(Qe)&&(Qe=G.env.NODE_DEBUG||""), e=e.toUpperCase(), !et[e])if(new RegExp("\\b"+e+"\\b","i").test(Qe)){et[e]=function(){var t=Ze.apply(null,arguments);console.error("%s %d: %s",e,0,t);};}else et[e]=function(){};return et[e]}function nt(e,t){var n={seen:[],stylize:it};return arguments.length>=3&&(n.depth=arguments[2]), arguments.length>=4&&(n.colors=arguments[3]), ct(t)?n.showHidden=t:t&&Rt(n,t), _t(n.showHidden)&&(n.showHidden=!1), _t(n.depth)&&(n.depth=2), _t(n.colors)&&(n.colors=!1), _t(n.customInspect)&&(n.customInspect=!0), n.colors&&(n.stylize=rt), ot(n,e,n.depth)}function rt(e,t){var n=nt.styles[t];return n?"["+nt.colors[n][0]+"m"+e+"["+nt.colors[n][1]+"m":e}function it(e,t){return e}function ot(e,t,n){if(e.customInspect&&t&&wt(t.inspect)&&t.inspect!==nt&&(!t.constructor||t.constructor.prototype!==t)){var r=t.inspect(n,e);return dt(r)||(r=ot(e,r,n)), r}var i=function(e,t){if(_t(t))return e.stylize("undefined","undefined");if(dt(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(lt(t))return e.stylize(""+t,"number");if(ct(t))return e.stylize(""+t,"boolean");if(ht(t))return e.stylize("null","null")}(e,t);if(i)return i;var o=Object.keys(t),s=function(e){var t={};return e.forEach(function(e,n){t[e]=!0;}), t}(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(t)), vt(t)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return st(t);if(0===o.length){if(wt(t)){var a=t.name?": "+t.name:"";return e.stylize("[Function"+a+"]","special")}if(gt(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(yt(t))return e.stylize(Date.prototype.toString.call(t),"date");if(vt(t))return st(t)}var u,c="",h=!1,f=["{","}"];(ut(t)&&(h=!0, f=["[","]"]), wt(t))&&(c=" [Function"+(t.name?": "+t.name:"")+"]");return gt(t)&&(c=" "+RegExp.prototype.toString.call(t)), yt(t)&&(c=" "+Date.prototype.toUTCString.call(t)), vt(t)&&(c=" "+st(t)), 0!==o.length||h&&0!=t.length?n<0?gt(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special"):(e.seen.push(t), u=h?function(e,t,n,r,i){for(var o=[],s=0,a=t.length;s<a;++s)Tt(t,String(s))?o.push(at(e,t,n,r,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(at(e,t,n,r,i,!0));}), o}(e,t,n,s,o):o.map(function(r){return at(e,t,n,s,r,h)}), e.seen.pop(), function(e,t,n){if(e.reduce(function(e,t){return t.indexOf("\n")>=0&&0, e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(u,c,f)):f[0]+c+f[1]}function st(e){return"["+Error.prototype.toString.call(e)+"]"}function at(e,t,n,r,i,o){var s,a,u;if((u=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]}).get?a=u.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):u.set&&(a=e.stylize("[Setter]","special")), Tt(r,i)||(s="["+i+"]"), a||(e.seen.indexOf(u.value)<0?(a=ht(n)?ot(e,u.value,null):ot(e,u.value,n-1)).indexOf("\n")>-1&&(a=o?a.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+a.split("\n").map(function(e){return"   "+e}).join("\n")):a=e.stylize("[Circular]","special")), _t(s)){if(o&&i.match(/^\d+$/))return a;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2), s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"), s=e.stylize(s,"string"));}return s+": "+a}function ut(e){return Array.isArray(e)}function ct(e){return"boolean"==typeof e}function ht(e){return null===e}function ft(e){return null==e}function lt(e){return"number"==typeof e}function dt(e){return"string"==typeof e}function pt(e){return"symbol"==typeof e}function _t(e){return void 0===e}function gt(e){return mt(e)&&"[object RegExp]"===St(e)}function mt(e){return"object"==typeof e&&null!==e}function yt(e){return mt(e)&&"[object Date]"===St(e)}function vt(e){return mt(e)&&("[object Error]"===St(e)||e instanceof Error)}function wt(e){return"function"==typeof e}function bt(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e}function Et(e){return He(e)}function St(e){return Object.prototype.toString.call(e)}function xt(e){return e<10?"0"+e.toString(10):e.toString(10)}nt.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]}, nt.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"};var At=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function kt(){var e,t;console.log("%s - %s",(e=new Date, t=[xt(e.getHours()),xt(e.getMinutes()),xt(e.getSeconds())].join(":"), [e.getDate(),At[e.getMonth()],t].join(" ")),Ze.apply(null,arguments));}function Rt(e,t){if(!t||!mt(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}function Tt(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var Ot={inherits:Ge,_extend:Rt,log:kt,isBuffer:Et,isPrimitive:bt,isFunction:wt,isError:vt,isDate:yt,isObject:mt,isRegExp:gt,isUndefined:_t,isSymbol:pt,isString:dt,isNumber:lt,isNullOrUndefined:ft,isNull:ht,isBoolean:ct,isArray:ut,inspect:nt,deprecate:Ke,format:Ze,debuglog:tt},Pt=Object.freeze({format:Ze,deprecate:Ke,debuglog:tt,inspect:nt,isArray:ut,isBoolean:ct,isNull:ht,isNullOrUndefined:ft,isNumber:lt,isString:dt,isSymbol:pt,isUndefined:_t,isRegExp:gt,isObject:mt,isDate:yt,isError:vt,isFunction:wt,isPrimitive:bt,isBuffer:Et,log:kt,inherits:Ge,_extend:Rt,default:Ot});function $t(e,t){for(var n=0,r=e.length-1;r>=0;r--){var i=e[r];"."===i?e.splice(r,1):".."===i?(e.splice(r,1), n++):n&&(e.splice(r,1), n--);}if(t)for(;n--;n)e.unshift("..");return e}var jt=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,It=function(e){return jt.exec(e).slice(1)};function Mt(){for(var e="",t=!1,n=arguments.length-1;n>=-1&&!t;n--){var r=n>=0?arguments[n]:"/";if("string"!=typeof r)throw new TypeError("Arguments to path.resolve must be strings");r&&(e=r+"/"+e, t="/"===r.charAt(0));}return(t?"/":"")+(e=$t(Yt(e.split("/"),function(e){return!!e}),!t).join("/"))||"."}function Lt(e){var t=Ct(e),n="/"===qt(e,-1);return(e=$t(Yt(e.split("/"),function(e){return!!e}),!t).join("/"))||t||(e="."), e&&n&&(e+="/"), (t?"/":"")+e}function Ct(e){return"/"===e.charAt(0)}function Nt(){return Lt(Yt(Array.prototype.slice.call(arguments,0),function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))}function Dt(e,t){function n(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=Mt(e).substr(1), t=Mt(t).substr(1);for(var r=n(e.split("/")),i=n(t.split("/")),o=Math.min(r.length,i.length),s=o,a=0;a<o;a++)if(r[a]!==i[a]){s=a;break}var u=[];for(a=s;a<r.length;a++)u.push("..");return(u=u.concat(i.slice(s))).join("/")}function Bt(e){var t=It(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)), n+r):"."}function Ut(e,t){var n=It(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)), n}function zt(e){return It(e)[3]}var Ft={extname:zt,basename:Ut,dirname:Bt,sep:"/",delimiter:":",relative:Dt,join:Nt,isAbsolute:Ct,normalize:Lt,resolve:Mt};function Yt(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}var qt="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t), e.substr(t,n)},Wt=Object.freeze({resolve:Mt,normalize:Lt,isAbsolute:Ct,join:Nt,relative:Dt,sep:"/",delimiter:":",dirname:Bt,basename:Ut,extname:zt,default:Ft}),Ht={},Xt=Object.freeze({default:Ht}),Vt=t(function(e){e.exports=(e=>(function(){const t=arguments.length,n=new Array(t);for(let e=0;e<t;e+=1)n[e]=arguments[e];return new Promise((t,r)=>{n.push((e,n)=>{e?r(e):t(n);}), e.apply(null,n);})}));}),Gt=Xt&&Ht||Xt,Jt=t(function(e){e.exports=(()=>{const e={};return Object.keys(Gt).forEach(t=>{(e=>["function"==typeof Gt[e],!e.match(/Sync$/),!e.match(/^[A-Z]/),!e.match(/^create/),!e.match(/^(un)?watch/)].every(Boolean))(t)?"exists"===t?e.exists=(()=>{throw new Error("fs.exists() is deprecated")}):e[t]=(e=>{const t=Gt[e];return Vt(t)})(t):e[t]=Gt[t];}), e})();}),Zt=t(function(e){const t=e=>/array of /.test(e),n=e=>e.split(" of ")[1],r=e=>t(e)?r(n(e)):["string","number","boolean","array","object","buffer","null","undefined","function"].some(t=>t===e),i=e=>null===e?"null":Array.isArray(e)?"array":He(e)?"buffer":typeof e,o=(e,t,n)=>n.indexOf(e)===t,s=(e,s,a,u)=>{if(!u.some(e=>{if(!r(e))throw new Error(`Unknown type "${e}"`);return t(e)?((e,t)=>{const r=n(t);return"array"===i(e)&&e.every(e=>i(e)===r)})(a,e):e===i(a)}))throw new Error(`Argument "${s}" passed to ${e} must be ${(e=>{return e.map(e=>-1!==["a","e","i","o","u"].indexOf(e[0])?`an ${e}`:`a ${e}`).join(" or ")})(u)}. Received ${(e=>{let t,n=i(e);return"array"===n&&(n+=` of ${(t=e.map(e=>i(e)).filter(o)).join(", ")}`), n})(a)}`)};e.exports={argument:s,options:(e,t,n,r)=>{void 0!==n&&(s(e,t,n,["object"]), Object.keys(n).forEach(i=>{const o=`${t}.${i}`;if(void 0===r[i])throw new Error(`Unknown argument "${o}" passed to ${e}`);s(e,o,n[i],r[i]);}));}};}),Kt=(Zt.argument, Zt.options, t(function(e,t){t.normalizeFileMode=(e=>{let t;return(t="number"==typeof e?e.toString(8):e).substring(t.length-3)});})),Qt=(Kt.normalizeFileMode, t(function(e,t){t.validateInput=((e,t)=>{const n=`${e}(path)`;Zt.argument(n,"path",t,["string","undefined"]);}), t.sync=(e=>{try{return Jt.readdirSync(e)}catch(e){if("ENOENT"===e.code)return;throw e}}), t.async=(e=>new Promise((t,n)=>{Jt.readdir(e).then(e=>{t(e);}).catch(e=>{"ENOENT"===e.code?t(void 0):n(e);});}));})),en=(Qt.validateInput, Qt.sync, Qt.async, Wt&&Ft||Wt),tn=t(function(e,t){const n=e=>{try{Jt.unlinkSync(e);}catch(t){if("EPERM"===t.code||"EISDIR"===t.code||"ENOTEMPTY"===t.code)Qt.sync(e).forEach(t=>{n(en.join(e,t));}), Jt.rmdirSync(e);else if("ENOENT"!==t.code)throw t}},r=(e,t)=>new Promise((n,i)=>{const o=o=>{3===t?i(o):setTimeout(()=>{r(e,t+1).then(n,i);},100);};Jt.unlink(e).then(n).catch(t=>{"EBUSY"===t.code?o(t):"EPERM"===t.code||"EISDIR"===t.code||"ENOTEMPTY"===t.code?(()=>Qt.async(e).then(t=>{const n=t.map(t=>r(en.join(e,t),0));return Promise.all(n)}))().then(()=>Jt.rmdir(e)).then(n).catch(e=>{"EBUSY"===e.code||"EPERM"===e.code||"ENOTEMPTY"===e.code?o(e):i(e);}):"ENOENT"===t.code?n():i(t);});});t.validateInput=((e,t)=>{const n=`${e}([path])`;Zt.argument(n,"path",t,["string","undefined"]);}), t.sync=n, t.async=(e=>r(e,0));}),nn=(tn.validateInput, tn.sync, tn.async, t(function(e,t){const n=e=>{const t=e||{};return"boolean"!=typeof t.empty&&(t.empty=!1), void 0!==t.mode&&(t.mode=Kt.normalizeFileMode(t.mode)), t},r=e=>new Error(`Path ${e} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`),i=(e,t)=>{const n=t||{};try{Jt.mkdirSync(e,n.mode);}catch(t){if("ENOENT"===t.code)i(en.dirname(e),n), Jt.mkdirSync(e,n.mode);else if("EEXIST"!==t.code)throw t}},o=(e,t,n)=>new Promise((r,i)=>{(()=>{const r=Kt.normalizeFileMode(t.mode);return void 0!==n.mode&&n.mode!==r?Jt.chmod(e,n.mode):Promise.resolve()})().then(()=>n.empty?(e=>new Promise((t,n)=>{Jt.readdir(e).then(n=>{const r=i=>{if(i===n.length)t();else{const t=en.resolve(e,n[i]);tn.async(t).then(()=>{r(i+1);});}};r(0);}).catch(n);}))(e):Promise.resolve()).then(r,i);}),s=(e,t)=>{const n=t||{};return new Promise((t,r)=>{Jt.mkdir(e,n.mode).then(t).catch(i=>{"ENOENT"===i.code?s(en.dirname(e),n).then(()=>Jt.mkdir(e,n.mode)).then(t).catch(e=>{"EEXIST"===e.code?t():r(e);}):"EEXIST"===i.code?t():r(i);});})};t.validateInput=((e,t,n)=>{const r=`${e}(path, [criteria])`;Zt.argument(r,"path",t,["string"]), Zt.options(r,"criteria",n,{empty:["boolean"],mode:["string","number"]});}), t.sync=((e,t)=>{const o=n(t),s=(e=>{let t;try{t=Jt.statSync(e);}catch(e){if("ENOENT"!==e.code)throw e}if(t&&!t.isDirectory())throw r(e);return t})(e);s?((e,t,n)=>{(()=>{const r=Kt.normalizeFileMode(t.mode);void 0!==n.mode&&n.mode!==r&&Jt.chmodSync(e,n.mode);})(), n.empty&&Jt.readdirSync(e).forEach(t=>{tn.sync(en.resolve(e,t));});})(e,s,o):i(e,o);}), t.createSync=i, t.async=((e,t)=>new Promise((i,a)=>{const u=n(t);(e=>new Promise((t,n)=>{Jt.stat(e).then(i=>{i.isDirectory()?t(i):n(r(e));}).catch(e=>{"ENOENT"===e.code?t(void 0):n(e);});}))(e).then(t=>void 0!==t?o(e,t,u):s(e,u)).then(i,a);})), t.createAsync=s;})),rn=(nn.validateInput, nn.sync, nn.createSync, nn.async, nn.createAsync, t(function(e,t){const n=(e,t)=>{let n=t;return"number"!=typeof n&&(n=2), "object"!=typeof e||He(e)||null===e?e:JSON.stringify(e,null,n)},r=(e,t,n)=>{try{Jt.writeFileSync(e,t,n);}catch(r){if("ENOENT"!==r.code)throw r;nn.createSync(en.dirname(e)), Jt.writeFileSync(e,t,n);}},i=(e,t,n)=>{r(e+".__new__",t,n), Jt.renameSync(e+".__new__",e);},o=(e,t,n)=>new Promise((r,i)=>{Jt.writeFile(e,t,n).then(r).catch(o=>{"ENOENT"===o.code?nn.createAsync(en.dirname(e)).then(()=>Jt.writeFile(e,t,n)).then(r,i):i(o);});}),s=(e,t,n)=>new Promise((r,i)=>{o(e+".__new__",t,n).then(()=>Jt.rename(e+".__new__",e)).then(r,i);});t.validateInput=((e,t,n,r)=>{const i=`${e}(path, data, [options])`;Zt.argument(i,"path",t,["string"]), Zt.argument(i,"data",n,["string","buffer","object","array"]), Zt.options(i,"options",r,{atomic:["boolean"],jsonIndent:["number"]});}), t.sync=((e,t,o)=>{const s=o||{},a=n(t,s.jsonIndent);let u=r;s.atomic&&(u=i), u(e,a,{mode:s.mode});}), t.async=((e,t,r)=>{const i=r||{},a=n(t,i.jsonIndent);let u=o;return i.atomic&&(u=s), u(e,a,{mode:i.mode})});})),on=(rn.validateInput, rn.sync, rn.async, t(function(e,t){t.validateInput=((e,t,n,r)=>{const i=`${e}(path, data, [options])`;Zt.argument(i,"path",t,["string"]), Zt.argument(i,"data",n,["string","buffer"]), Zt.options(i,"options",r,{mode:["string","number"]});}), t.sync=((e,t,n)=>{try{Jt.appendFileSync(e,t,n);}catch(r){if("ENOENT"!==r.code)throw r;rn.sync(e,t,n);}}), t.async=((e,t,n)=>new Promise((r,i)=>{Jt.appendFile(e,t,n).then(r).catch(o=>{"ENOENT"===o.code?rn.async(e,t,n).then(r,i):i(o);});}));})),sn=(on.validateInput, on.sync, on.async, t(function(e,t){const n=e=>{const t=e||{};return void 0!==t.mode&&(t.mode=Kt.normalizeFileMode(t.mode)), t},r=e=>new Error(`Path ${e} exists but is not a file. Halting jetpack.file() call for safety reasons.`),i=(e,t,n)=>{const r=Kt.normalizeFileMode(t.mode);(()=>void 0!==n.content&&(rn.sync(e,n.content,{mode:r,jsonIndent:n.jsonIndent}), !0))()||void 0!==n.mode&&n.mode!==r&&Jt.chmodSync(e,n.mode);},o=(e,t,n)=>{const r=Kt.normalizeFileMode(t.mode);return(()=>new Promise((t,i)=>{void 0!==n.content?rn.async(e,n.content,{mode:r,jsonIndent:n.jsonIndent}).then(()=>{t(!0);}).catch(i):t(!1);}))().then(t=>{if(!t)return(()=>{if(void 0!==n.mode&&n.mode!==r)return Jt.chmod(e,n.mode)})()})};t.validateInput=((e,t,n)=>{const r=`${e}(path, [criteria])`;Zt.argument(r,"path",t,["string"]), Zt.options(r,"criteria",n,{content:["string","buffer","object","array"],jsonIndent:["number"],mode:["string","number"]});}), t.sync=((e,t)=>{const o=n(t),s=(e=>{let t;try{t=Jt.statSync(e);}catch(e){if("ENOENT"!==e.code)throw e}if(t&&!t.isFile())throw r(e);return t})(e);void 0!==s?i(e,s,o):((e,t)=>{let n="";void 0!==t.content&&(n=t.content), rn.sync(e,n,{mode:t.mode,jsonIndent:t.jsonIndent});})(e,o);}), t.async=((e,t)=>new Promise((i,s)=>{const a=n(t);(e=>new Promise((t,n)=>{Jt.stat(e).then(i=>{i.isFile()?t(i):n(r(e));}).catch(e=>{"ENOENT"===e.code?t(void 0):n(e);});}))(e).then(t=>void 0!==t?o(e,t,a):((e,t)=>{let n="";return void 0!==t.content&&(n=t.content), rn.async(e,n,{mode:t.mode,jsonIndent:t.jsonIndent})})(e,a)).then(i,s);}));}));sn.validateInput, sn.sync, sn.async;function an(){}function un(){un.init.call(this);}function cn(e){return void 0===e._maxListeners?un.defaultMaxListeners:e._maxListeners}function hn(e,t,n,r){var i,o,s,a;if("function"!=typeof n)throw new TypeError('"listener" argument must be a function');if((o=e._events)?(o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n), o=e._events), s=o[t]):(o=e._events=new an, e._eventsCount=0), s){if("function"==typeof s?s=o[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n), !s.warned&&(i=cn(e))&&i>0&&s.length>i){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+t+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning", u.emitter=e, u.type=t, u.count=s.length, a=u, "function"==typeof console.warn?console.warn(a):console.log(a);}}else s=o[t]=n, ++e._eventsCount;return e}function fn(e,t,n){var r=!1;function i(){e.removeListener(t,i), r||(r=!0, n.apply(e,arguments));}return i.listener=n, i}function ln(e){var t=this._events;if(t){var n=t[e];if("function"==typeof n)return 1;if(n)return n.length}return 0}function dn(e,t){for(var n=new Array(t);t--;)n[t]=e[t];return n}function pn(){this.head=null, this.tail=null, this.length=0;}an.prototype=Object.create(null), un.EventEmitter=un, un.usingDomains=!1, un.prototype.domain=void 0, un.prototype._events=void 0, un.prototype._maxListeners=void 0, un.defaultMaxListeners=10, un.init=function(){this.domain=null, un.usingDomains&&(!(void 0).active||this instanceof(void 0).Domain||(this.domain=(void 0).active)), this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=new an, this._eventsCount=0), this._maxListeners=this._maxListeners||void 0;}, un.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||isNaN(e))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=e, this}, un.prototype.getMaxListeners=function(){return cn(this)}, un.prototype.emit=function(e){var t,n,r,i,o,s,a,u="error"===e;if(s=this._events)u=u&&null==s.error;else if(!u)return!1;if(a=this.domain, u){if(t=arguments[1], !a){if(t instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t, c}return t||(t=new Error('Uncaught, unspecified "error" event')), t.domainEmitter=this, t.domain=a, t.domainThrown=!1, a.emit("error",t), !1}if(!(n=s[e]))return!1;var h="function"==typeof n;switch(r=arguments.length){case 1:!function(e,t,n){if(t)e.call(n);else for(var r=e.length,i=dn(e,r),o=0;o<r;++o)i[o].call(n);}(n,h,this);break;case 2:!function(e,t,n,r){if(t)e.call(n,r);else for(var i=e.length,o=dn(e,i),s=0;s<i;++s)o[s].call(n,r);}(n,h,this,arguments[1]);break;case 3:!function(e,t,n,r,i){if(t)e.call(n,r,i);else for(var o=e.length,s=dn(e,o),a=0;a<o;++a)s[a].call(n,r,i);}(n,h,this,arguments[1],arguments[2]);break;case 4:!function(e,t,n,r,i,o){if(t)e.call(n,r,i,o);else for(var s=e.length,a=dn(e,s),u=0;u<s;++u)a[u].call(n,r,i,o);}(n,h,this,arguments[1],arguments[2],arguments[3]);break;default:for(i=new Array(r-1), o=1;o<r;o++)i[o-1]=arguments[o];!function(e,t,n,r){if(t)e.apply(n,r);else for(var i=e.length,o=dn(e,i),s=0;s<i;++s)o[s].apply(n,r);}(n,h,this,i);}return!0}, un.prototype.addListener=function(e,t){return hn(this,e,t,!1)}, un.prototype.on=un.prototype.addListener, un.prototype.prependListener=function(e,t){return hn(this,e,t,!0)}, un.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.on(e,fn(this,e,t)), this}, un.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');return this.prependListener(e,fn(this,e,t)), this}, un.prototype.removeListener=function(e,t){var n,r,i,o,s;if("function"!=typeof t)throw new TypeError('"listener" argument must be a function');if(!(r=this._events))return this;if(!(n=r[e]))return this;if(n===t||n.listener&&n.listener===t)0==--this._eventsCount?this._events=new an:(delete r[e], r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1, o=n.length;o-- >0;)if(n[o]===t||n[o].listener&&n[o].listener===t){s=n[o].listener, i=o;break}if(i<0)return this;if(1===n.length){if(n[0]=void 0, 0==--this._eventsCount)return this._events=new an, this;delete r[e];}else!function(e,t){for(var n=t,r=n+1,i=e.length;r<i;n+=1, r+=1)e[n]=e[r];e.pop();}(n,i);r.removeListener&&this.emit("removeListener",e,s||t);}return this}, un.prototype.removeAllListeners=function(e){var t,n;if(!(n=this._events))return this;if(!n.removeListener)return 0===arguments.length?(this._events=new an, this._eventsCount=0):n[e]&&(0==--this._eventsCount?this._events=new an:delete n[e]), this;if(0===arguments.length){for(var r,i=Object.keys(n),o=0;o<i.length;++o)"removeListener"!==(r=i[o])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"), this._events=new an, this._eventsCount=0, this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(t)do{this.removeListener(e,t[t.length-1]);}while(t[0]);return this}, un.prototype.listeners=function(e){var t,n=this._events;return n&&(t=n[e])?"function"==typeof t?[t.listener||t]:function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(t):[]}, un.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):ln.call(e,t)}, un.prototype.listenerCount=ln, un.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]}, pn.prototype.push=function(e){var t={data:e,next:null};this.length>0?this.tail.next=t:this.head=t, this.tail=t, ++this.length;}, pn.prototype.unshift=function(e){var t={data:e,next:this.head};0===this.length&&(this.tail=t), this.head=t, ++this.length;}, pn.prototype.shift=function(){if(0!==this.length){var e=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next, --this.length, e}}, pn.prototype.clear=function(){this.head=this.tail=null, this.length=0;}, pn.prototype.join=function(e){if(0===this.length)return"";for(var t=this.head,n=""+t.data;t=t.next;)n+=e+t.data;return n}, pn.prototype.concat=function(e){if(0===this.length)return he.alloc(0);if(1===this.length)return this.head.data;for(var t=he.allocUnsafe(e>>>0),n=this.head,r=0;n;)n.data.copy(t,r), r+=n.data.length, n=n.next;return t};var _n=t(function(e,t){var n=Ve.Buffer,r=n.isEncoding||function(e){switch(e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};var i=t.StringDecoder=function(e){switch(this.encoding=(e||"utf8").toLowerCase().replace(/[-_]/,""), function(e){if(e&&!r(e))throw new Error("Unknown encoding: "+e)}(e), this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2, this.detectIncompleteChar=s;break;case"base64":this.surrogateSize=3, this.detectIncompleteChar=a;break;default:return void(this.write=o)}this.charBuffer=new n(6), this.charReceived=0, this.charLength=0;};function o(e){return e.toString(this.encoding)}function s(e){this.charReceived=e.length%2, this.charLength=this.charReceived?2:0;}function a(e){this.charReceived=e.length%3, this.charLength=this.charReceived?3:0;}i.prototype.write=function(e){for(var t="";this.charLength;){var n=e.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:e.length;if(e.copy(this.charBuffer,this.charReceived,0,n), this.charReceived+=n, this.charReceived<this.charLength)return"";if(e=e.slice(n,e.length), !((i=(t=this.charBuffer.slice(0,this.charLength).toString(this.encoding)).charCodeAt(t.length-1))>=55296&&i<=56319)){if(this.charReceived=this.charLength=0, 0===e.length)return t;break}this.charLength+=this.surrogateSize, t="";}this.detectIncompleteChar(e);var r=e.length;this.charLength&&(e.copy(this.charBuffer,0,e.length-this.charReceived,r), r-=this.charReceived);var i;r=(t+=e.toString(this.encoding,0,r)).length-1;if((i=t.charCodeAt(r))>=55296&&i<=56319){var o=this.surrogateSize;return this.charLength+=o, this.charReceived+=o, this.charBuffer.copy(this.charBuffer,o,0,o), e.copy(this.charBuffer,0,0,o), t.substring(0,r)}return t}, i.prototype.detectIncompleteChar=function(e){for(var t=e.length>=3?3:e.length;t>0;t--){var n=e[e.length-t];if(1==t&&n>>5==6){this.charLength=2;break}if(t<=2&&n>>4==14){this.charLength=3;break}if(t<=3&&n>>3==30){this.charLength=4;break}}this.charReceived=t;}, i.prototype.end=function(e){var t="";if(e&&e.length&&(t=this.write(e)), this.charReceived){var n=this.charReceived,r=this.charBuffer,i=this.encoding;t+=r.slice(0,n).toString(i);}return t};}).StringDecoder;yn.ReadableState=mn;var gn=tt("stream");function mn(e,t){e=e||{}, this.objectMode=!!e.objectMode, t instanceof Wn&&(this.objectMode=this.objectMode||!!e.readableObjectMode);var n=e.highWaterMark,r=this.objectMode?16:16384;this.highWaterMark=n||0===n?n:r, this.highWaterMark=~~this.highWaterMark, this.buffer=new pn, this.length=0, this.pipes=null, this.pipesCount=0, this.flowing=null, this.ended=!1, this.endEmitted=!1, this.reading=!1, this.sync=!0, this.needReadable=!1, this.emittedReadable=!1, this.readableListening=!1, this.resumeScheduled=!1, this.defaultEncoding=e.defaultEncoding||"utf8", this.ranOut=!1, this.awaitDrain=0, this.readingMore=!1, this.decoder=null, this.encoding=null, e.encoding&&(this.decoder=new _n(e.encoding), this.encoding=e.encoding);}function yn(e){if(!(this instanceof yn))return new yn(e);this._readableState=new mn(e,this), this.readable=!0, e&&"function"==typeof e.read&&(this._read=e.read), un.call(this);}function vn(e,t,n,r,i){var o=function(e,t){var n=null;He(t)||"string"==typeof t||null==t||e.objectMode||(n=new TypeError("Invalid non-string/buffer chunk"));return n}(t,n);if(o)e.emit("error",o);else if(null===n)t.reading=!1, function(e,t){if(t.ended)return;if(t.decoder){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n), t.length+=t.objectMode?1:n.length);}t.ended=!0, En(e);}(e,t);else if(t.objectMode||n&&n.length>0)if(t.ended&&!i){var s=new Error("stream.push() after EOF");e.emit("error",s);}else if(t.endEmitted&&i){var a=new Error("stream.unshift() after end event");e.emit("error",a);}else{var u;!t.decoder||i||r||(n=t.decoder.write(n), u=!t.objectMode&&0===n.length), i||(t.reading=!1), u||(t.flowing&&0===t.length&&!t.sync?(e.emit("data",n), e.read(0)):(t.length+=t.objectMode?1:n.length, i?t.buffer.unshift(n):t.buffer.push(n), t.needReadable&&En(e))), function(e,t){t.readingMore||(t.readingMore=!0, C(xn,e,t));}(e,t);}else i||(t.reading=!1);return function(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}(t)}Ge(yn,un), yn.prototype.push=function(e,t){var n=this._readableState;return n.objectMode||"string"!=typeof e||(t=t||n.defaultEncoding)!==n.encoding&&(e=he.from(e,t), t=""), vn(this,n,e,t,!1)}, yn.prototype.unshift=function(e){return vn(this,this._readableState,e,"",!0)}, yn.prototype.isPaused=function(){return!1===this._readableState.flowing}, yn.prototype.setEncoding=function(e){return this._readableState.decoder=new _n(e), this._readableState.encoding=e, this};var wn=8388608;function bn(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!=e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=function(e){return e>=wn?e=wn:(e--, e|=e>>>1, e|=e>>>2, e|=e>>>4, e|=e>>>8, e|=e>>>16, e++), e}(e)), e<=t.length?e:t.ended?t.length:(t.needReadable=!0, 0))}function En(e){var t=e._readableState;t.needReadable=!1, t.emittedReadable||(gn("emitReadable",t.flowing), t.emittedReadable=!0, t.sync?C(Sn,e):Sn(e));}function Sn(e){gn("emit readable"), e.emit("readable"), Rn(e);}function xn(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(gn("maybeReadMore read 0"), e.read(0), n!==t.length);)n=t.length;t.readingMore=!1;}function An(e){gn("readable nexttick read 0"), e.read(0);}function kn(e,t){t.reading||(gn("resume read 0"), e.read(0)), t.resumeScheduled=!1, t.awaitDrain=0, e.emit("resume"), Rn(e), t.flowing&&!t.reading&&e.read(0);}function Rn(e){var t=e._readableState;for(gn("flow",t.flowing);t.flowing&&null!==e.read(););}function Tn(e,t){return 0===t.length?null:(t.objectMode?n=t.buffer.shift():!e||e>=t.length?(n=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.head.data:t.buffer.concat(t.length), t.buffer.clear()):n=function(e,t,n){var r;e<t.head.data.length?(r=t.head.data.slice(0,e), t.head.data=t.head.data.slice(e)):r=e===t.head.data.length?t.shift():n?function(e,t){var n=t.head,r=1,i=n.data;e-=i.length;for(;n=n.next;){var o=n.data,s=e>o.length?o.length:e;if(s===o.length?i+=o:i+=o.slice(0,e), 0===(e-=s)){s===o.length?(++r, n.next?t.head=n.next:t.head=t.tail=null):(t.head=n, n.data=o.slice(s));break}++r;}return t.length-=r, i}(e,t):function(e,t){var n=he.allocUnsafe(e),r=t.head,i=1;r.data.copy(n), e-=r.data.length;for(;r=r.next;){var o=r.data,s=e>o.length?o.length:e;if(o.copy(n,n.length-e,0,s), 0===(e-=s)){s===o.length?(++i, r.next?t.head=r.next:t.head=t.tail=null):(t.head=r, r.data=o.slice(s));break}++i;}return t.length-=i, n}(e,t);return r}(e,t.buffer,t.decoder), n);var n;}function On(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');t.endEmitted||(t.ended=!0, C(Pn,t,e));}function Pn(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0, t.readable=!1, t.emit("end"));}function $n(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}function jn(){}function In(e,t){Object.defineProperty(this,"buffer",{get:Ke(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")}), e=e||{}, this.objectMode=!!e.objectMode, t instanceof Wn&&(this.objectMode=this.objectMode||!!e.writableObjectMode);var n=e.highWaterMark,r=this.objectMode?16:16384;this.highWaterMark=n||0===n?n:r, this.highWaterMark=~~this.highWaterMark, this.needDrain=!1, this.ending=!1, this.ended=!1, this.finished=!1;var i=!1===e.decodeStrings;this.decodeStrings=!i, this.defaultEncoding=e.defaultEncoding||"utf8", this.length=0, this.writing=!1, this.corked=0, this.sync=!0, this.bufferProcessing=!1, this.onwrite=function(e){!function(e,t){var n=e._writableState,r=n.sync,i=n.writecb;if(function(e){e.writing=!1, e.writecb=null, e.length-=e.writelen, e.writelen=0;}(n), t)!function(e,t,n,r,i){--t.pendingcb, n?C(i,r):i(r);e._writableState.errorEmitted=!0, e.emit("error",r);}(e,n,r,t,i);else{var o=Dn(n);o||n.corked||n.bufferProcessing||!n.bufferedRequest||Nn(e,n), r?C(Cn,e,n,o,i):Cn(e,n,o,i);}}(t,e);}, this.writecb=null, this.writelen=0, this.bufferedRequest=null, this.lastBufferedRequest=null, this.pendingcb=0, this.prefinished=!1, this.errorEmitted=!1, this.bufferedRequestCount=0, this.corkedRequestsFree=new zn(this);}function Mn(e){if(!(this instanceof Mn||this instanceof Wn))return new Mn(e);this._writableState=new In(e,this), this.writable=!0, e&&("function"==typeof e.write&&(this._write=e.write), "function"==typeof e.writev&&(this._writev=e.writev)), un.call(this);}function Ln(e,t,n,r,i,o,s){t.writelen=r, t.writecb=s, t.writing=!0, t.sync=!0, n?e._writev(i,t.onwrite):e._write(i,o,t.onwrite), t.sync=!1;}function Cn(e,t,n,r){n||function(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1, e.emit("drain"));}(e,t), t.pendingcb--, r(), Un(e,t);}function Nn(e,t){t.bufferProcessing=!0;var n=t.bufferedRequest;if(e._writev&&n&&n.next){var r=t.bufferedRequestCount,i=new Array(r),o=t.corkedRequestsFree;o.entry=n;for(var s=0;n;)i[s]=n, n=n.next, s+=1;Ln(e,t,!0,t.length,i,"",o.finish), t.pendingcb++, t.lastBufferedRequest=null, o.next?(t.corkedRequestsFree=o.next, o.next=null):t.corkedRequestsFree=new zn(t);}else{for(;n;){var a=n.chunk,u=n.encoding,c=n.callback;if(Ln(e,t,!1,t.objectMode?1:a.length,a,u,c), n=n.next, t.writing)break}null===n&&(t.lastBufferedRequest=null);}t.bufferedRequestCount=0, t.bufferedRequest=n, t.bufferProcessing=!1;}function Dn(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function Bn(e,t){t.prefinished||(t.prefinished=!0, e.emit("prefinish"));}function Un(e,t){var n=Dn(t);return n&&(0===t.pendingcb?(Bn(e,t), t.finished=!0, e.emit("finish")):Bn(e,t)), n}function zn(e){var t=this;this.next=null, this.entry=null, this.finish=function(n){var r=t.entry;for(t.entry=null;r;){var i=r.callback;e.pendingcb--, i(n), r=r.next;}e.corkedRequestsFree?e.corkedRequestsFree.next=t:e.corkedRequestsFree=t;};}yn.prototype.read=function(e){gn("read",e), e=parseInt(e,10);var t=this._readableState,n=e;if(0!==e&&(t.emittedReadable=!1), 0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return gn("read: emitReadable",t.length,t.ended), 0===t.length&&t.ended?On(this):En(this), null;if(0===(e=bn(e,t))&&t.ended)return 0===t.length&&On(this), null;var r,i=t.needReadable;return gn("need readable",i), (0===t.length||t.length-e<t.highWaterMark)&&gn("length less than watermark",i=!0), t.ended||t.reading?gn("reading or ended",i=!1):i&&(gn("do read"), t.reading=!0, t.sync=!0, 0===t.length&&(t.needReadable=!0), this._read(t.highWaterMark), t.sync=!1, t.reading||(e=bn(n,t))), null===(r=e>0?Tn(e,t):null)?(t.needReadable=!0, e=0):t.length-=e, 0===t.length&&(t.ended||(t.needReadable=!0), n!==e&&t.ended&&On(this)), null!==r&&this.emit("data",r), r}, yn.prototype._read=function(e){this.emit("error",new Error("not implemented"));}, yn.prototype.pipe=function(e,t){var n=this,r=this._readableState;switch(r.pipesCount){case 0:r.pipes=e;break;case 1:r.pipes=[r.pipes,e];break;default:r.pipes.push(e);}r.pipesCount+=1, gn("pipe count=%d opts=%j",r.pipesCount,t);var i=!t||!1!==t.end?s:c;function o(e){gn("onunpipe"), e===n&&c();}function s(){gn("onend"), e.end();}r.endEmitted?C(i):n.once("end",i), e.on("unpipe",o);var a=function(e){return function(){var t=e._readableState;gn("pipeOnDrain",t.awaitDrain), t.awaitDrain&&t.awaitDrain--, 0===t.awaitDrain&&e.listeners("data").length&&(t.flowing=!0, Rn(e));}}(n);e.on("drain",a);var u=!1;function c(){gn("cleanup"), e.removeListener("close",d), e.removeListener("finish",p), e.removeListener("drain",a), e.removeListener("error",l), e.removeListener("unpipe",o), n.removeListener("end",s), n.removeListener("end",c), n.removeListener("data",f), u=!0, !r.awaitDrain||e._writableState&&!e._writableState.needDrain||a();}var h=!1;function f(t){gn("ondata"), h=!1, !1!==e.write(t)||h||((1===r.pipesCount&&r.pipes===e||r.pipesCount>1&&-1!==$n(r.pipes,e))&&!u&&(gn("false write response, pause",n._readableState.awaitDrain), n._readableState.awaitDrain++, h=!0), n.pause());}function l(t){var n;gn("onerror",t), _(), e.removeListener("error",l), 0===(n="error", e.listeners(n).length)&&e.emit("error",t);}function d(){e.removeListener("finish",p), _();}function p(){gn("onfinish"), e.removeListener("close",d), _();}function _(){gn("unpipe"), n.unpipe(e);}return n.on("data",f), function(e,t,n){if("function"==typeof e.prependListener)return e.prependListener(t,n);e._events&&e._events[t]?Array.isArray(e._events[t])?e._events[t].unshift(n):e._events[t]=[n,e._events[t]]:e.on(t,n);}(e,"error",l), e.once("close",d), e.once("finish",p), e.emit("pipe",n), r.flowing||(gn("pipe resume"), n.resume()), e}, yn.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes), t.pipes=null, t.pipesCount=0, t.flowing=!1, e&&e.emit("unpipe",this), this);if(!e){var n=t.pipes,r=t.pipesCount;t.pipes=null, t.pipesCount=0, t.flowing=!1;for(var i=0;i<r;i++)n[i].emit("unpipe",this);return this}var o=$n(t.pipes,e);return-1===o?this:(t.pipes.splice(o,1), t.pipesCount-=1, 1===t.pipesCount&&(t.pipes=t.pipes[0]), e.emit("unpipe",this), this)}, yn.prototype.on=function(e,t){var n=un.prototype.on.call(this,e,t);if("data"===e)!1!==this._readableState.flowing&&this.resume();else if("readable"===e){var r=this._readableState;r.endEmitted||r.readableListening||(r.readableListening=r.needReadable=!0, r.emittedReadable=!1, r.reading?r.length&&En(this):C(An,this));}return n}, yn.prototype.addListener=yn.prototype.on, yn.prototype.resume=function(){var e=this._readableState;return e.flowing||(gn("resume"), e.flowing=!0, function(e,t){t.resumeScheduled||(t.resumeScheduled=!0, C(kn,e,t));}(this,e)), this}, yn.prototype.pause=function(){return gn("call pause flowing=%j",this._readableState.flowing), !1!==this._readableState.flowing&&(gn("pause"), this._readableState.flowing=!1, this.emit("pause")), this}, yn.prototype.wrap=function(e){var t=this._readableState,n=!1,r=this;for(var i in e.on("end",function(){if(gn("wrapped end"), t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&r.push(e);}r.push(null);}), e.on("data",function(i){(gn("wrapped data"), t.decoder&&(i=t.decoder.write(i)), t.objectMode&&null==i)||(t.objectMode||i&&i.length)&&(r.push(i)||(n=!0, e.pause()));}), e)void 0===this[i]&&"function"==typeof e[i]&&(this[i]=function(t){return function(){return e[t].apply(e,arguments)}}(i));return function(e,t){for(var n=0,r=e.length;n<r;n++)t(e[n],n);}(["error","close","destroy","pause","resume"],function(t){e.on(t,r.emit.bind(r,t));}), r._read=function(t){gn("wrapped _read",t), n&&(n=!1, e.resume());}, r}, yn._fromList=Tn, Mn.WritableState=In, Ge(Mn,un), In.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e), e=e.next;return t}, Mn.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"));}, Mn.prototype.write=function(e,t,n){var r=this._writableState,i=!1;return"function"==typeof t&&(n=t, t=null), he.isBuffer(e)?t="buffer":t||(t=r.defaultEncoding), "function"!=typeof n&&(n=jn), r.ended?function(e,t){var n=new Error("write after end");e.emit("error",n), C(t,n);}(this,n):function(e,t,n,r){var i=!0,o=!1;return null===n?o=new TypeError("May not write null values to stream"):he.isBuffer(n)||"string"==typeof n||void 0===n||t.objectMode||(o=new TypeError("Invalid non-string/buffer chunk")), o&&(e.emit("error",o), C(r,o), i=!1), i}(this,r,e,n)&&(r.pendingcb++, i=function(e,t,n,r,i){n=function(e,t,n){return e.objectMode||!1===e.decodeStrings||"string"!=typeof t||(t=he.from(t,n)), t}(t,n,r), he.isBuffer(n)&&(r="buffer");var o=t.objectMode?1:n.length;t.length+=o;var s=t.length<t.highWaterMark;s||(t.needDrain=!0);if(t.writing||t.corked){var a=t.lastBufferedRequest;t.lastBufferedRequest=new function(e,t,n){this.chunk=e, this.encoding=t, this.callback=n, this.next=null;}(n,r,i), a?a.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest, t.bufferedRequestCount+=1;}else Ln(e,t,!1,o,n,r,i);return s}(this,r,e,t,n)), i}, Mn.prototype.cork=function(){this._writableState.corked++;}, Mn.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--, e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||Nn(this,e));}, Mn.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()), !(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);return this._writableState.defaultEncoding=e, this}, Mn.prototype._write=function(e,t,n){n(new Error("not implemented"));}, Mn.prototype._writev=null, Mn.prototype.end=function(e,t,n){var r=this._writableState;"function"==typeof e?(n=e, e=null, t=null):"function"==typeof t&&(n=t, t=null), null!=e&&this.write(e,t), r.corked&&(r.corked=1, this.uncork()), r.ending||r.finished||function(e,t,n){t.ending=!0, Un(e,t), n&&(t.finished?C(n):e.once("finish",n));t.ended=!0, e.writable=!1;}(this,r,n);}, Ge(Wn,yn);for(var Fn=Object.keys(Mn.prototype),Yn=0;Yn<Fn.length;Yn++){var qn=Fn[Yn];Wn.prototype[qn]||(Wn.prototype[qn]=Mn.prototype[qn]);}function Wn(e){if(!(this instanceof Wn))return new Wn(e);yn.call(this,e), Mn.call(this,e), e&&!1===e.readable&&(this.readable=!1), e&&!1===e.writable&&(this.writable=!1), this.allowHalfOpen=!0, e&&!1===e.allowHalfOpen&&(this.allowHalfOpen=!1), this.once("end",Hn);}function Hn(){this.allowHalfOpen||this._writableState.ended||C(Xn,this);}function Xn(e){e.end();}function Vn(e){this.afterTransform=function(t,n){return function(e,t,n){var r=e._transformState;r.transforming=!1;var i=r.writecb;if(!i)return e.emit("error",new Error("no writecb in Transform class"));r.writechunk=null, r.writecb=null, null!=n&&e.push(n);i(t);var o=e._readableState;o.reading=!1, (o.needReadable||o.length<o.highWaterMark)&&e._read(o.highWaterMark);}(e,t,n)}, this.needTransform=!1, this.transforming=!1, this.writecb=null, this.writechunk=null, this.writeencoding=null;}function Gn(e){if(!(this instanceof Gn))return new Gn(e);Wn.call(this,e), this._transformState=new Vn(this);var t=this;this._readableState.needReadable=!0, this._readableState.sync=!1, e&&("function"==typeof e.transform&&(this._transform=e.transform), "function"==typeof e.flush&&(this._flush=e.flush)), this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(e){Jn(t,e);}):Jn(t);});}function Jn(e,t){if(t)return e.emit("error",t);var n=e._writableState,r=e._transformState;if(n.length)throw new Error("Calling transform done when ws.length != 0");if(r.transforming)throw new Error("Calling transform done when still transforming");return e.push(null)}function Zn(e){if(!(this instanceof Zn))return new Zn(e);Gn.call(this,e);}function Kn(){un.call(this);}Ge(Gn,Wn), Gn.prototype.push=function(e,t){return this._transformState.needTransform=!1, Wn.prototype.push.call(this,e,t)}, Gn.prototype._transform=function(e,t,n){throw new Error("Not implemented")}, Gn.prototype._write=function(e,t,n){var r=this._transformState;if(r.writecb=n, r.writechunk=e, r.writeencoding=t, !r.transforming){var i=this._readableState;(r.needTransform||i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark);}}, Gn.prototype._read=function(e){var t=this._transformState;null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0, this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0;}, Ge(Zn,Gn), Zn.prototype._transform=function(e,t,n){n(null,e);}, Ge(Kn,un), Kn.Readable=yn, Kn.Writable=Mn, Kn.Duplex=Wn, Kn.Transform=Gn, Kn.PassThrough=Zn, Kn.Stream=Kn, Kn.prototype.pipe=function(e,t){var n=this;function r(t){e.writable&&!1===e.write(t)&&n.pause&&n.pause();}function i(){n.readable&&n.resume&&n.resume();}n.on("data",r), e.on("drain",i), e._isStdio||t&&!1===t.end||(n.on("end",s), n.on("close",a));var o=!1;function s(){o||(o=!0, e.end());}function a(){o||(o=!0, "function"==typeof e.destroy&&e.destroy());}function u(e){if(c(), 0===un.listenerCount(this,"error"))throw e}function c(){n.removeListener("data",r), e.removeListener("drain",i), n.removeListener("end",s), n.removeListener("close",a), n.removeListener("error",u), e.removeListener("error",u), n.removeListener("end",c), n.removeListener("close",c), e.removeListener("close",c);}return n.on("error",u), e.on("error",u), n.on("end",c), n.on("close",c), e.on("close",c), e.emit("pipe",n), e};var Qn=Object.freeze({default:Kn,Readable:yn,Writable:Mn,Duplex:Wn,Transform:Gn,PassThrough:Zn,Stream:Kn}),er=t(function(e,t){const n=["md5","sha1","sha256","sha512"],r=["report","follow"],i=(e,t,n)=>{const r={};return r.name=en.basename(e), n.isFile()?(r.type="file", r.size=n.size):n.isDirectory()?r.type="dir":n.isSymbolicLink()?r.type="symlink":r.type="other", t.mode&&(r.mode=n.mode), t.times&&(r.accessTime=n.atime, r.modifyTime=n.mtime, r.changeTime=n.ctime), t.absolutePath&&(r.absolutePath=e), r},o=(e,t,n)=>{"file"===t.type&&n.checksum?t[n.checksum]=((e,t)=>{const n=Gt.createHash(t),r=Jt.readFileSync(e);return n.update(r), n.digest("hex")})(e,n.checksum):"symlink"===t.type&&(t.pointsAt=Jt.readlinkSync(e));},s=(e,t,n)=>"file"===t.type&&n.checksum?((e,t)=>new Promise((n,r)=>{const i=Gt.createHash(t),o=Jt.createReadStream(e);o.on("data",e=>{i.update(e);}), o.on("end",()=>{n(i.digest("hex"));}), o.on("error",r);}))(e,n.checksum).then(e=>(t[n.checksum]=e, t)):"symlink"===t.type?Jt.readlink(e).then(e=>(t.pointsAt=e, t)):Promise.resolve(t);t.supportedChecksumAlgorithms=n, t.symlinkOptions=r, t.validateInput=((e,t,i)=>{const o=`${e}(path, [options])`;if(Zt.argument(o,"path",t,["string"]), Zt.options(o,"options",i,{checksum:["string"],mode:["boolean"],times:["boolean"],absolutePath:["boolean"],symlinks:["string"]}), i&&void 0!==i.checksum&&-1===n.indexOf(i.checksum))throw new Error(`Argument "options.checksum" passed to ${o} must have one of values: ${n.join(", ")}`);if(i&&void 0!==i.symlinks&&-1===r.indexOf(i.symlinks))throw new Error(`Argument "options.symlinks" passed to ${o} must have one of values: ${r.join(", ")}`)}), t.sync=((e,t)=>{let n,r=Jt.lstatSync;const s=t||{};"follow"===s.symlinks&&(r=Jt.statSync);try{n=r(e);}catch(e){if("ENOENT"===e.code)return;throw e}const a=i(e,s,n);return o(e,a,s), a}), t.async=((e,t)=>new Promise((n,r)=>{let o=Jt.lstat;const a=t||{};"follow"===a.symlinks&&(o=Jt.stat), o(e).then(t=>{const o=i(e,a,t);s(e,o,a).then(n,r);}).catch(e=>{"ENOENT"===e.code?n(void 0):r(e);});}));}),tr=(er.supportedChecksumAlgorithms, er.symlinkOptions, er.validateInput, er.sync, er.async, Qn&&Kn||Qn),nr=t(function(e,t){const n=tr.Readable,r=(e,t,n,i)=>{const o=er.sync(e,t.inspectOptions);void 0===t.maxLevelsDeep&&(t.maxLevelsDeep=1/0), n(e,o), o&&"dir"===o.type&&i<t.maxLevelsDeep&&Qt.sync(e).forEach(o=>{r(e+en.sep+o,t,n,i+1);});};t.sync=((e,t,n)=>{r(e,t,n,0);}), t.stream=((e,t)=>{const r=new n({objectMode:!0});let i,o={path:e,parent:void 0,level:0},s=!1;const a=function(e){r.emit("error",e);},u=e=>e.nextSibling?e.nextSibling:e.parent?u(e.parent):void 0,c=e=>{const t=r.push(e);s=!1, o?t&&i():r.push(null);};return void 0===t.maxLevelsDeep&&(t.maxLevelsDeep=1/0), i=(()=>{const e=o;s=!0, er.async(e.path,t.inspectOptions).then(n=>{e.inspected=n, n&&"dir"===n.type&&e.level<t.maxLevelsDeep?Qt.async(e.path).then(t=>{const r=t.map(t=>({name:t,path:e.path+en.sep+t,parent:e,level:e.level+1}));r.forEach((e,t)=>{e.nextSibling=r[t+1];}), o=r[0]||u(e), c({path:e.path,item:n});}).catch(a):(o=u(e), c({path:e.path,item:n}));}).catch(a);}), r._read=function(){s||i();}, r});}),rr=(nr.sync, nr.stream, function(e,t){for(var n=[],r=0;r<e.length;r++){var i=t(e[r],r);ir(i)?n.push.apply(n,i):n.push(i);}return n}),ir=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},or=sr;function sr(e,t,n){e instanceof RegExp&&(e=ar(e,n)), t instanceof RegExp&&(t=ar(t,n));var r=ur(e,t,n);return r&&{start:r[0],end:r[1],pre:n.slice(0,r[0]),body:n.slice(r[0]+e.length,r[1]),post:n.slice(r[1]+t.length)}}function ar(e,t){var n=t.match(e);return n?n[0]:null}function ur(e,t,n){var r,i,o,s,a,u=n.indexOf(e),c=n.indexOf(t,u+1),h=u;if(u>=0&&c>0){for(r=[], o=n.length;h>=0&&!a;)h==u?(r.push(h), u=n.indexOf(e,h+1)):1==r.length?a=[r.pop(),c]:((i=r.pop())<o&&(o=i, s=c), c=n.indexOf(t,h+1)), h=u<c&&u>=0?u:c;r.length&&(a=[o,s]);}return a}sr.range=ur;var cr=function(e){if(!e)return[];"{}"===e.substr(0,2)&&(e="\\{\\}"+e.substr(2));return function e(t,n){var r=[];var i=or("{","}",t);if(!i||/\$$/.test(i.pre))return[t];var o=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body);var s=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body);var a=o||s;var u=i.body.indexOf(",")>=0;if(!a&&!u)return i.post.match(/,.*\}/)?(t=i.pre+"{"+i.body+lr+i.post, e(t)):[t];var c;if(a)c=i.body.split(/\.\./);else if(1===(c=function e(t){if(!t)return[""];var n=[];var r=or("{","}",t);if(!r)return t.split(",");var i=r.pre;var o=r.body;var s=r.post;var a=i.split(",");a[a.length-1]+="{"+o+"}";var u=e(s);s.length&&(a[a.length-1]+=u.shift(), a.push.apply(a,u));n.push.apply(n,a);return n}(i.body)).length&&1===(c=e(c[0],!1).map(mr)).length){var h=i.post.length?e(i.post,!1):[""];return h.map(function(e){return i.pre+c[0]+e})}var f=i.pre;var h=i.post.length?e(i.post,!1):[""];var l;if(a){var d=_r(c[0]),p=_r(c[1]),_=Math.max(c[0].length,c[1].length),g=3==c.length?Math.abs(_r(c[2])):1,m=vr,y=p<d;y&&(g*=-1, m=wr);var v=c.some(yr);l=[];for(var w=d;m(w,p);w+=g){var b;if(s)"\\"===(b=String.fromCharCode(w))&&(b="");else if(b=String(w), v){var E=_-b.length;if(E>0){var S=new Array(E+1).join("0");b=w<0?"-"+S+b.slice(1):S+b;}}l.push(b);}}else l=rr(c,function(t){return e(t,!1)});for(var x=0;x<l.length;x++)for(var A=0;A<h.length;A++){var k=f+l[x]+h[A];(!n||a||k)&&r.push(k);}return r}(function(e){return e.split("\\\\").join(hr).split("\\{").join(fr).split("\\}").join(lr).split("\\,").join(dr).split("\\.").join(pr)}(e),!0).map(gr)},hr="\0SLASH"+Math.random()+"\0",fr="\0OPEN"+Math.random()+"\0",lr="\0CLOSE"+Math.random()+"\0",dr="\0COMMA"+Math.random()+"\0",pr="\0PERIOD"+Math.random()+"\0";function _r(e){return parseInt(e,10)==e?parseInt(e,10):e.charCodeAt(0)}function gr(e){return e.split(hr).join("\\").split(fr).join("{").split(lr).join("}").split(dr).join(",").split(pr).join(".")}function mr(e){return"{"+e+"}"}function yr(e){return/^-?0\d/.test(e)}function vr(e,t){return e<=t}function wr(e,t){return e>=t}var br=jr;jr.Minimatch=Ir;var Er={sep:"/"};try{Er=en;}catch(e){}var Sr=jr.GLOBSTAR=Ir.GLOBSTAR={},xr={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},Ar="[^/]",kr=Ar+"*?",Rr="(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",Tr="(?:(?!(?:\\/|^)\\.).)*?",Or="().*{}+?[]^$\\!".split("").reduce(function(e,t){return e[t]=!0, e},{});var Pr=/\/+/;function $r(e,t){e=e||{}, t=t||{};var n={};return Object.keys(t).forEach(function(e){n[e]=t[e];}), Object.keys(e).forEach(function(t){n[t]=e[t];}), n}function jr(e,t,n){if("string"!=typeof t)throw new TypeError("glob pattern string required");return n||(n={}), !(!n.nocomment&&"#"===t.charAt(0))&&(""===t.trim()?""===e:new Ir(t,n).match(e))}function Ir(e,t){if(!(this instanceof Ir))return new Ir(e,t);if("string"!=typeof e)throw new TypeError("glob pattern string required");t||(t={}), e=e.trim(), "/"!==Er.sep&&(e=e.split(Er.sep).join("/")), this.options=t, this.set=[], this.pattern=e, this.regexp=null, this.negate=!1, this.comment=!1, this.empty=!1, this.make();}function Mr(e,t){if(t||(t=this instanceof Ir?this.options:{}), void 0===(e=void 0===e?this.pattern:e))throw new TypeError("undefined pattern");return t.nobrace||!e.match(/\{.*\}/)?[e]:cr(e)}jr.filter=function(e,t){return t=t||{}, function(n,r,i){return jr(n,e,t)}}, jr.defaults=function(e){if(!e||!Object.keys(e).length)return jr;var t=jr,n=function(n,r,i){return t.minimatch(n,r,$r(e,i))};return n.Minimatch=function(n,r){return new t.Minimatch(n,$r(e,r))}, n}, Ir.defaults=function(e){return e&&Object.keys(e).length?jr.defaults(e).Minimatch:Ir}, Ir.prototype.debug=function(){}, Ir.prototype.make=function(){if(this._made)return;var e=this.pattern,t=this.options;if(!t.nocomment&&"#"===e.charAt(0))return void(this.comment=!0);if(!e)return void(this.empty=!0);this.parseNegate();var n=this.globSet=this.braceExpand();t.debug&&(this.debug=console.error);this.debug(this.pattern,n), n=this.globParts=n.map(function(e){return e.split(Pr)}), this.debug(this.pattern,n), n=n.map(function(e,t,n){return e.map(this.parse,this)},this), this.debug(this.pattern,n), n=n.filter(function(e){return-1===e.indexOf(!1)}), this.debug(this.pattern,n), this.set=n;}, Ir.prototype.parseNegate=function(){var e=this.pattern,t=!1,n=this.options,r=0;if(n.nonegate)return;for(var i=0,o=e.length;i<o&&"!"===e.charAt(i);i++)t=!t, r++;r&&(this.pattern=e.substr(r));this.negate=t;}, jr.braceExpand=function(e,t){return Mr(e,t)}, Ir.prototype.braceExpand=Mr, Ir.prototype.parse=function(e,t){if(e.length>65536)throw new TypeError("pattern is too long");var n=this.options;if(!n.noglobstar&&"**"===e)return Sr;if(""===e)return"";var r,i="",o=!!n.nocase,s=!1,a=[],u=[],c=!1,h=-1,f=-1,l="."===e.charAt(0)?"":n.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)",d=this;function p(){if(r){switch(r){case"*":i+=kr, o=!0;break;case"?":i+=Ar, o=!0;break;default:i+="\\"+r;}d.debug("clearStateChar %j %j",r,i), r=!1;}}for(var _,g=0,m=e.length;g<m&&(_=e.charAt(g));g++)if(this.debug("%s\t%s %s %j",e,g,i,_), s&&Or[_])i+="\\"+_, s=!1;else switch(_){case"/":return!1;case"\\":p(), s=!0;continue;case"?":case"*":case"+":case"@":case"!":if(this.debug("%s\t%s %s %j <-- stateChar",e,g,i,_), c){this.debug("  in class"), "!"===_&&g===f+1&&(_="^"), i+=_;continue}d.debug("call clearStateChar %j",r), p(), r=_, n.noext&&p();continue;case"(":if(c){i+="(";continue}if(!r){i+="\\(";continue}a.push({type:r,start:g-1,reStart:i.length,open:xr[r].open,close:xr[r].close}), i+="!"===r?"(?:(?!(?:":"(?:", this.debug("plType %j %j",r,i), r=!1;continue;case")":if(c||!a.length){i+="\\)";continue}p(), o=!0;var y=a.pop();i+=y.close, "!"===y.type&&u.push(y), y.reEnd=i.length;continue;case"|":if(c||!a.length||s){i+="\\|", s=!1;continue}p(), i+="|";continue;case"[":if(p(), c){i+="\\"+_;continue}c=!0, f=g, h=i.length, i+=_;continue;case"]":if(g===f+1||!c){i+="\\"+_, s=!1;continue}if(c)var v,w=e.substring(f+1,g);o=!0, c=!1, i+=_;continue;default:p(), s?s=!1:!Or[_]||"^"===_&&c||(i+="\\"), i+=_;}c&&(w=e.substr(f+1), v=this.parse(w,Lr), i=i.substr(0,h)+"\\["+v[0], o=o||v[1]);for(y=a.pop();y;y=a.pop()){var b=i.slice(y.reStart+y.open.length);this.debug("setting tail",i,y), b=b.replace(/((?:\\{2}){0,64})(\\?)\|/g,function(e,t,n){return n||(n="\\"), t+t+n+"|"}), this.debug("tail=%j\n   %s",b,b,y,i);var E="*"===y.type?kr:"?"===y.type?Ar:"\\"+y.type;o=!0, i=i.slice(0,y.reStart)+E+"\\("+b;}p(), s&&(i+="\\\\");var S=!1;switch(i.charAt(0)){case".":case"[":case"(":S=!0;}for(var x=u.length-1;x>-1;x--){var A=u[x],k=i.slice(0,A.reStart),R=i.slice(A.reStart,A.reEnd-8),T=i.slice(A.reEnd-8,A.reEnd),O=i.slice(A.reEnd);T+=O;var P=k.split("(").length-1,$=O;for(g=0;g<P;g++)$=$.replace(/\)[+*?]?/,"");var j="";""===(O=$)&&t!==Lr&&(j="$");var I=k+R+O+j+T;i=I;}""!==i&&o&&(i="(?=.)"+i);S&&(i=l+i);if(t===Lr)return[i,o];if(!o)return e.replace(/\\(.)/g,"$1");var M=n.nocase?"i":"";try{var L=new RegExp("^"+i+"$",M);}catch(e){return new RegExp("$.")}return L._glob=e, L._src=i, L};var Lr={};jr.makeRe=function(e,t){return new Ir(e,t||{}).makeRe()}, Ir.prototype.makeRe=function(){if(this.regexp||!1===this.regexp)return this.regexp;var e=this.set;if(!e.length)return this.regexp=!1, this.regexp;var t=this.options,n=t.noglobstar?kr:t.dot?Rr:Tr,r=t.nocase?"i":"",i=e.map(function(e){return e.map(function(e){return e===Sr?n:"string"==typeof e?e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):e._src}).join("\\/")}).join("|");i="^(?:"+i+")$", this.negate&&(i="^(?!"+i+").*$");try{this.regexp=new RegExp(i,r);}catch(e){this.regexp=!1;}return this.regexp}, jr.match=function(e,t,n){var r=new Ir(t,n=n||{});return e=e.filter(function(e){return r.match(e)}), r.options.nonull&&!e.length&&e.push(t), e}, Ir.prototype.match=function(e,t){if(this.debug("match",e,this.pattern), this.comment)return!1;if(this.empty)return""===e;if("/"===e&&t)return!0;var n=this.options;"/"!==Er.sep&&(e=e.split(Er.sep).join("/"));e=e.split(Pr), this.debug(this.pattern,"split",e);var r,i,o=this.set;for(this.debug(this.pattern,"set",o), i=e.length-1;i>=0&&!(r=e[i]);i--);for(i=0;i<o.length;i++){var s=o[i],a=e;n.matchBase&&1===s.length&&(a=[r]);var u=this.matchOne(a,s,t);if(u)return!!n.flipNegate||!this.negate}return!n.flipNegate&&this.negate}, Ir.prototype.matchOne=function(e,t,n){var r=this.options;this.debug("matchOne",{this:this,file:e,pattern:t}), this.debug("matchOne",e.length,t.length);for(var i=0,o=0,s=e.length,a=t.length;i<s&&o<a;i++, o++){this.debug("matchOne loop");var u,c=t[o],h=e[i];if(this.debug(t,c,h), !1===c)return!1;if(c===Sr){this.debug("GLOBSTAR",[t,c,h]);var f=i,l=o+1;if(l===a){for(this.debug("** at the end");i<s;i++)if("."===e[i]||".."===e[i]||!r.dot&&"."===e[i].charAt(0))return!1;return!0}for(;f<s;){var d=e[f];if(this.debug("\nglobstar while",e,f,t,l,d), this.matchOne(e.slice(f),t.slice(l),n))return this.debug("globstar found match!",f,s,d), !0;if("."===d||".."===d||!r.dot&&"."===d.charAt(0)){this.debug("dot detected!",e,f,t,l);break}this.debug("globstar swallow a segment, and continue"), f++;}return!(!n||(this.debug("\n>>> no match, partial?",e,f,t,l), f!==s))}if("string"==typeof c?(u=r.nocase?h.toLowerCase()===c.toLowerCase():h===c, this.debug("string match",c,h,u)):(u=h.match(c), this.debug("pattern match",c,h,u)), !u)return!1}if(i===s&&o===a)return!0;if(i===s)return n;if(o===a)return i===s-1&&""===e[i];throw new Error("wtf?")};var Cr=t(function(e,t){const n=br.Minimatch;t.create=((e,t)=>{let r;const i=(r="string"==typeof t?[t]:t).map(t=>((e,t)=>{const n=-1!==t.indexOf("/"),r=/^!?\//.test(t),i=/^!/.test(t);let o;if(!r&&n){const n=t.replace(/^!/,"").replace(/^\.\//,"");return o=/\/$/.test(e)?"":"/", i?`!${e}${o}${n}`:`${e}${o}${n}`}return t})(e,t)).map(e=>new n(e,{matchBase:!0,nocomment:!0,dot:!0}));return e=>{let t,n,r="matching",o=!1;for(n=0;n<i.length;n+=1){if((t=i[n]).negate&&(r="negation", 0===n&&(o=!0)), "negation"===r&&o&&!t.match(e))return!1;"matching"!==r||o||(o=t.match(e));}return o}});}),Nr=(Cr.create, t(function(e,t){const n=e=>{const t=e||{};return void 0===t.files&&(t.files=!0), void 0===t.directories&&(t.directories=!1), void 0===t.recursive&&(t.recursive=!0), void 0===t.symlinks&&(t.symlinks=!1), t},r=(e,t)=>e.map(e=>en.relative(t,e.absolutePath)),i=e=>{const t=new Error(`Path you want to find stuff in doesn't exist ${e}`);return t.code="ENOENT", t},o=e=>{const t=new Error(`Path you want to find stuff in must be a directory ${e}`);return t.code="ENOTDIR", t};t.validateInput=((e,t,n)=>{const r=`${e}([path], options)`;Zt.argument(r,"path",t,["string"]), Zt.options(r,"options",n,{matching:["string","array of string"],files:["boolean"],directories:["boolean"],recursive:["boolean"],symlinks:["boolean"]});}), t.sync=((e,t)=>{const s=er.sync(e);if(void 0===s)throw i(e);if("dir"!==s.type)throw o(e);return((e,t)=>{const n=[],i=Cr.create(e,t.matching);let o=1/0;return!1===t.recursive&&(o=1), nr.sync(e,{maxLevelsDeep:o,inspectOptions:{absolutePath:!0}},(r,o)=>{r!==e&&i(r)&&("file"===o.type&&!0===t.files||"dir"===o.type&&!0===t.directories||"symlink"===o.type&&!0===t.symlinks)&&n.push(o);}), r(n,t.cwd)})(e,n(t))}), t.async=((e,t)=>er.async(e).then(s=>{if(void 0===s)throw i(e);if("dir"!==s.type)throw o(e);return((e,t)=>new Promise((n,i)=>{const o=[],s=Cr.create(e,t.matching);let a=1/0;!1===t.recursive&&(a=1);const u=nr.stream(e,{maxLevelsDeep:a,inspectOptions:{absolutePath:!0}}).on("readable",()=>{const n=u.read();if(n&&n.path!==e&&s(n.path)){const e=n.item;("file"===e.type&&!0===t.files||"dir"===e.type&&!0===t.directories||"symlink"===e.type&&!0===t.symlinks)&&o.push(e);}}).on("error",i).on("end",()=>{n(r(o,t.cwd));});}))(e,n(t))}));})),Dr=(Nr.validateInput, Nr.sync, Nr.async, t(function(e,t){const n=(e,t)=>e?`${e.relativePath}/${en.basename(t)}`:".",r=(e,t)=>{const n=Gt.createHash(t);return e.forEach(e=>{n.update(e.name+e[t]);}), n.digest("hex")},i=(e,t,o)=>{const s=er.sync(e,t);return s&&(t.relativePath&&(s.relativePath=n(o,e)), "dir"===s.type&&(s.size=0, s.children=Qt.sync(e).map(n=>{const r=en.join(e,n),o=i(r,t,s);return s.size+=o.size||0, o}), t.checksum&&(s[t.checksum]=r(s.children,t.checksum)))), s},o=(e,t,i)=>new Promise((s,a)=>{er.async(e,t).then(u=>{u?(t.relativePath&&(u.relativePath=n(i,e)), "dir"!==u.type?s(u):(n=>new Promise((i,s)=>{Qt.async(e).then(a=>{const u=c=>{if(c===a.length)t.checksum&&(n[t.checksum]=r(n.children,t.checksum)), i();else{const r=en.join(e,a[c]);o(r,t,n).then(e=>{a[c]=e, n.size+=e.size||0, u(c+1);}).catch(s);}};n.children=a, n.size=0, u(0);});}))(u).then(()=>{s(u);}).catch(a)):s(u);}).catch(a);});t.validateInput=((e,t,n)=>{const r=`${e}(path, [options])`;if(Zt.argument(r,"path",t,["string"]), Zt.options(r,"options",n,{checksum:["string"],relativePath:["boolean"],symlinks:["string"]}), n&&void 0!==n.checksum&&-1===er.supportedChecksumAlgorithms.indexOf(n.checksum))throw new Error(`Argument "options.checksum" passed to ${r} must have one of values: ${er.supportedChecksumAlgorithms.join(", ")}`);if(n&&void 0!==n.symlinks&&-1===er.symlinkOptions.indexOf(n.symlinks))throw new Error(`Argument "options.symlinks" passed to ${r} must have one of values: ${er.symlinkOptions.join(", ")}`)}), t.sync=((e,t)=>{return i(e,t||{},void 0)}), t.async=((e,t)=>{return o(e,t||{})});})),Br=(Dr.validateInput, Dr.sync, Dr.async, t(function(e,t){t.validateInput=((e,t)=>{const n=`${e}(path)`;Zt.argument(n,"path",t,["string"]);}), t.sync=(e=>{try{const t=Jt.statSync(e);return t.isDirectory()?"dir":t.isFile()?"file":"other"}catch(e){if("ENOENT"!==e.code)throw e}return!1}), t.async=(e=>new Promise((t,n)=>{Jt.stat(e,(e,r)=>{e?"ENOENT"===e.code?t(!1):n(e):r.isDirectory()?t("dir"):r.isFile()?t("file"):t("other");});}));})),Ur=(Br.validateInput, Br.sync, Br.async, t(function(e,t){const n=(e,t)=>{const n=e||{},r={};return r.overwrite=n.overwrite, n.matching?r.allowedToCopy=Cr.create(t,n.matching):r.allowedToCopy=(()=>!0), r},r=e=>{const t=new Error(`Path to copy doesn't exist ${e}`);return t.code="ENOENT", t},i=e=>{const t=new Error(`Destination path already exists ${e}`);return t.code="EEXIST", t},o={mode:!0,symlinks:"report",times:!0,absolutePath:!0},s=e=>"function"!=typeof e.opts.overwrite&&!0!==e.opts.overwrite,a=(e,t,n,r)=>{const a=Jt.readFileSync(e);try{Jt.writeFileSync(t,a,{mode:n,flag:"wx"});}catch(e){if("ENOENT"===e.code)rn.sync(t,a,{mode:n});else{if("EEXIST"!==e.code)throw e;if((e=>{if("function"==typeof e.opts.overwrite){const t=er.sync(e.destPath,o);return e.opts.overwrite(e.srcInspectData,t)}return!0===e.opts.overwrite})(r))Jt.writeFileSync(t,a,{mode:n});else if(s(r))throw i(r.destPath)}}},u=(e,t,n,r)=>{const i={srcPath:e,destPath:n,srcInspectData:t,opts:r},o=Kt.normalizeFileMode(t.mode);"dir"===t.type?nn.createSync(n,{mode:o}):"file"===t.type?a(e,n,o,i):"symlink"===t.type&&((e,t)=>{const n=Jt.readlinkSync(e);try{Jt.symlinkSync(n,t);}catch(e){if("EEXIST"!==e.code)throw e;Jt.unlinkSync(t), Jt.symlinkSync(n,t);}})(e,n);},c=(e,t,n,r,a)=>new Promise((u,h)=>{let f="wx";(a||{}).overwrite&&(f="w");const l=Jt.createReadStream(e),d=Jt.createWriteStream(t,{mode:n,flags:f});l.on("error",h), d.on("error",a=>{l.resume(), "ENOENT"===a.code?nn.createAsync(en.dirname(t)).then(()=>{c(e,t,n,r).then(u,h);}).catch(h):"EEXIST"===a.code?(e=>new Promise((t,n)=>{"function"==typeof e.opts.overwrite?er.async(e.destPath,o).then(n=>{t(e.opts.overwrite(e.srcInspectData,n));}).catch(n):t(!0===e.opts.overwrite);}))(r).then(o=>{o?c(e,t,n,r,{overwrite:!0}).then(u,h):s(r)?h(i(t)):u();}).catch(h):h(a);}), d.on("finish",u), l.pipe(d);}),h=(e,t,n,r)=>{const i={srcPath:e,destPath:n,srcInspectData:t,opts:r},o=Kt.normalizeFileMode(t.mode);return"dir"===t.type?nn.createAsync(n,{mode:o}):"file"===t.type?c(e,n,o,i):"symlink"===t.type?((e,t)=>Jt.readlink(e).then(e=>new Promise((n,r)=>{Jt.symlink(e,t).then(n).catch(i=>{"EEXIST"===i.code?Jt.unlink(t).then(()=>Jt.symlink(e,t)).then(n,r):r(i);});})))(e,n):Promise.resolve()};t.validateInput=((e,t,n,r)=>{const i=`${e}(from, to, [options])`;Zt.argument(i,"from",t,["string"]), Zt.argument(i,"to",n,["string"]), Zt.options(i,"options",r,{overwrite:["boolean","function"],matching:["string","array of string"]});}), t.sync=((e,t,s)=>{const a=n(s,e);((e,t,n)=>{if(!Br.sync(e))throw r(e);if(Br.sync(t)&&!n.overwrite)throw i(t)})(e,t,a), nr.sync(e,{inspectOptions:o},(n,r)=>{const i=en.relative(e,n),o=en.resolve(t,i);a.allowedToCopy(n,o,r)&&u(n,r,o,a);});}), t.async=((e,t,s)=>new Promise((a,u)=>{const c=n(s,e);((e,t,n)=>Br.async(e).then(n=>{if(n)return Br.async(t);throw r(e)}).then(e=>{if(e&&!n.overwrite)throw i(t)}))(e,t,c).then(()=>{let n=!1,r=0;const i=nr.stream(e,{inspectOptions:o}).on("readable",()=>{const o=i.read();if(o){const i=en.relative(e,o.path),s=en.resolve(t,i);c.allowedToCopy(o.path,o.item,s)&&(r+=1, h(o.path,o.item,s,c).then(()=>{r-=1, n&&0===r&&a();}).catch(u));}}).on("error",u).on("end",()=>{(n=!0)&&0===r&&a();});}).catch(u);}));})),zr=(Ur.validateInput, Ur.sync, Ur.async, t(function(e,t){const n=e=>{const t=new Error(`Path to move doesn't exist ${e}`);return t.code="ENOENT", t};t.validateInput=((e,t,n)=>{const r=`${e}(from, to)`;Zt.argument(r,"from",t,["string"]), Zt.argument(r,"to",n,["string"]);}), t.sync=((e,t)=>{try{Jt.renameSync(e,t);}catch(r){if("ENOENT"!==r.code)throw r;if(!Br.sync(e))throw n(e);Br.sync(t)||(nn.createSync(en.dirname(t)), Jt.renameSync(e,t));}}), t.async=((e,t)=>new Promise((r,i)=>{Jt.rename(e,t).then(r).catch(o=>{"ENOENT"!==o.code?i(o):Br.async(e).then(o=>{o?(e=>new Promise((t,n)=>{const r=en.dirname(e);Br.async(r).then(e=>{e?n():nn.createAsync(r).then(t,n);}).catch(n);}))(t).then(()=>Jt.rename(e,t)).then(r,i):i(n(e));}).catch(i);});}));})),Fr=(zr.validateInput, zr.sync, zr.async, t(function(e,t){const n=["utf8","buffer","json","jsonWithDates"],r=(e,t)=>{return"string"==typeof t&&/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(t)?new Date(t):t},i=(e,t)=>{const n=new Error(`JSON parsing failed while reading ${e} [${t}]`);return n.originalError=t, n};t.validateInput=((e,t,r)=>{const i=`${e}(path, returnAs)`;if(Zt.argument(i,"path",t,["string"]), Zt.argument(i,"returnAs",r,["string","undefined"]), r&&-1===n.indexOf(r))throw new Error(`Argument "returnAs" passed to ${i} must have one of values: ${n.join(", ")}`)}), t.sync=((e,t)=>{const n=t||"utf8";let o,s="utf8";"buffer"===n&&(s=null);try{o=Jt.readFileSync(e,{encoding:s});}catch(e){if("ENOENT"===e.code)return;throw e}try{"json"===n?o=JSON.parse(o):"jsonWithDates"===n&&(o=JSON.parse(o,r));}catch(t){throw i(e,t)}return o}), t.async=((e,t)=>new Promise((n,o)=>{const s=t||"utf8";let a="utf8";"buffer"===s&&(a=null), Jt.readFile(e,{encoding:a}).then(t=>{try{n("json"===s?JSON.parse(t):"jsonWithDates"===s?JSON.parse(t,r):t);}catch(t){o(i(e,t));}}).catch(e=>{"ENOENT"===e.code?n(void 0):o(e);});}));})),Yr=(Fr.validateInput, Fr.sync, Fr.async, t(function(e,t){t.validateInput=((e,t,n)=>{const r=`${e}(path, newName)`;Zt.argument(r,"path",t,["string"]), Zt.argument(r,"newName",n,["string"]);}), t.sync=((e,t)=>{const n=en.join(en.dirname(e),t);zr.sync(e,n);}), t.async=((e,t)=>{const n=en.join(en.dirname(e),t);return zr.async(e,n)});})),qr=(Yr.validateInput, Yr.sync, Yr.async, t(function(e,t){t.validateInput=((e,t,n)=>{const r=`${e}(symlinkValue, path)`;Zt.argument(r,"symlinkValue",t,["string"]), Zt.argument(r,"path",n,["string"]);}), t.sync=((e,t)=>{try{Jt.symlinkSync(e,t);}catch(n){if("ENOENT"!==n.code)throw n;nn.createSync(en.dirname(t)), Jt.symlinkSync(e,t);}}), t.async=((e,t)=>new Promise((n,r)=>{Jt.symlink(e,t).then(n).catch(i=>{"ENOENT"===i.code?nn.createAsync(en.dirname(t)).then(()=>Jt.symlink(e,t)).then(n,r):r(i);});}));})),Wr=(qr.validateInput, qr.sync, qr.async, {createWriteStream:Gt.createWriteStream,createReadStream:Gt.createReadStream}),Hr=Pt&&Ot||Pt,Xr=t(function(e){const t=e=>{const n=()=>e||G.cwd(),r=function(){if(0===arguments.length)return n();const e=Array.prototype.slice.call(arguments),r=[n()].concat(e);return t(en.resolve.apply(null,r))},i=e=>en.resolve(n(),e),o=e=>{const t=e||{};return t.cwd=n(), t},s={cwd:r,path:function(){return Array.prototype.unshift.call(arguments,n()), en.resolve.apply(null,arguments)},append:(e,t,n)=>{on.validateInput("append",e,t,n), on.sync(i(e),t,n);},appendAsync:(e,t,n)=>(on.validateInput("appendAsync",e,t,n), on.async(i(e),t,n)),copy:(e,t,n)=>{Ur.validateInput("copy",e,t,n), Ur.sync(i(e),i(t),n);},copyAsync:(e,t,n)=>(Ur.validateInput("copyAsync",e,t,n), Ur.async(i(e),i(t),n)),createWriteStream:(e,t)=>Wr.createWriteStream(i(e),t),createReadStream:(e,t)=>Wr.createReadStream(i(e),t),dir:(e,t)=>{nn.validateInput("dir",e,t);const n=i(e);return nn.sync(n,t), r(n)},dirAsync:(e,t)=>(nn.validateInput("dirAsync",e,t), new Promise((n,o)=>{const s=i(e);nn.async(s,t).then(()=>{n(r(s));},o);})),exists:e=>(Br.validateInput("exists",e), Br.sync(i(e))),existsAsync:e=>(Br.validateInput("existsAsync",e), Br.async(i(e))),file:(e,t)=>(sn.validateInput("file",e,t), sn.sync(i(e),t), s),fileAsync:(e,t)=>(sn.validateInput("fileAsync",e,t), new Promise((n,r)=>{sn.async(i(e),t).then(()=>{n(s);},r);})),find:(e,t)=>(void 0===t&&"object"==typeof e&&(t=e, e="."), Nr.validateInput("find",e,t), Nr.sync(i(e),o(t))),findAsync:(e,t)=>(void 0===t&&"object"==typeof e&&(t=e, e="."), Nr.validateInput("findAsync",e,t), Nr.async(i(e),o(t))),inspect:(e,t)=>(er.validateInput("inspect",e,t), er.sync(i(e),t)),inspectAsync:(e,t)=>(er.validateInput("inspectAsync",e,t), er.async(i(e),t)),inspectTree:(e,t)=>(Dr.validateInput("inspectTree",e,t), Dr.sync(i(e),t)),inspectTreeAsync:(e,t)=>(Dr.validateInput("inspectTreeAsync",e,t), Dr.async(i(e),t)),list:e=>(Qt.validateInput("list",e), Qt.sync(i(e||"."))),listAsync:e=>(Qt.validateInput("listAsync",e), Qt.async(i(e||"."))),move:(e,t)=>{zr.validateInput("move",e,t), zr.sync(i(e),i(t));},moveAsync:(e,t)=>(zr.validateInput("moveAsync",e,t), zr.async(i(e),i(t))),read:(e,t)=>(Fr.validateInput("read",e,t), Fr.sync(i(e),t)),readAsync:(e,t)=>(Fr.validateInput("readAsync",e,t), Fr.async(i(e),t)),remove:e=>{tn.validateInput("remove",e), tn.sync(i(e||"."));},removeAsync:e=>(tn.validateInput("removeAsync",e), tn.async(i(e||"."))),rename:(e,t)=>{Yr.validateInput("rename",e,t), Yr.sync(i(e),t);},renameAsync:(e,t)=>(Yr.validateInput("renameAsync",e,t), Yr.async(i(e),t)),symlink:(e,t)=>{qr.validateInput("symlink",e,t), qr.sync(e,i(t));},symlinkAsync:(e,t)=>(qr.validateInput("symlinkAsync",e,t), qr.async(e,i(t))),write:(e,t,n)=>{rn.validateInput("write",e,t,n), rn.sync(i(e),t,n);},writeAsync:(e,t,n)=>(rn.validateInput("writeAsync",e,t,n), rn.async(i(e),t,n))};return void 0!==Hr.inspect.custom&&(s[Hr.inspect.custom]=(()=>`[fs-jetpack CWD: ${n()}]`)), s};e.exports=t;})(),Vr=function(e){return Xr.find(Ft.resolve(""+e),{matching:"*.json"}).reduce(function(e,t){var n=Xr.read(t,"json");return["model","grammar"].forEach(function(t){n[t]&&Object.keys(n[t]).forEach(function(r){e[t][r]?e[t][r]=[].concat(e[t][r],n[t][r]):e[t][r]=n[t][r];});}), n.entry&&(e.entry=n.entry), Object.assign({},e)},{model:{},grammar:{},entry:null})};module.exports=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.seed,r=t.state?t.state:{},i=t.modifiers?t.modifiers:{},o="string"==typeof e?Vr(e):e;r="string"==typeof r?Vr(r):r, i=Object.assign({},g,i);var s,a,u=o.grammar,c=function(e,t){var n=w(e,t),r=b(n);return r=E(r), {toModel:r=S(r),expandedGrammar:n}}(o.entry,u),h=c.expandedGrammar,f=c.toModel.map(function(e){if("helper"===e.type)return i[e.helper](e.input);var t=r[e.character]||function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2];return Object.keys(e).reduce(function(r,i){if("|"===e[i][0]){var o=e[i].slice(1).split(":"),s=m(o,2),a=s[0],u=s[1];r[i]=t[a]?t[a](u,n):e[i];}else r[i]=y(e[i],n);return r},{})}(o.model[e.model],i,n);e.character&&(r[e.character]=t);var s=t[e.property];return e.modifier&&(s=e.modifier.reduce(function(e,t){return(0, i[t])(e,n)},s)), s});return{compiled:(s=/::\.|[^ ]*::/, a=h, f.reduce(function(e,t){return e.replace(s,t)},a)),state:r}};});
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
  "general-13": "::game.S.title:: tempted players to keep exploring, all the while reminding them death was only one step away."
};

var genre = {
  "genre-0": "::game.S.title:: is one of the tightest, tensest ::game.S.genre:: games available.",
  "genre-1": "::game.S.title|possessive:: unique approach to ::game.S.genre:: spawned a genre now a staple of the game industry.",
  "genre-2": "It is one of the best ::game.S.genre:: games of all time.",
  "genre-3": "Its gameplay helped pave the way for other games to experiment with the genre, leading to a renaissance of ::game.S.genre:: games.",
  "genre-4": "It doesn't hurt that, upon release, players considered it one of the finest ::game.S.genre:: games ever made.",
  "genre-5": "It helped popularize the ::game.S.genre:: genre in America, which now has a strong cult following.",
  "genre-6": "One of the all time best ::game.S.genre:: games, TimeSplitters is simple dumb fun.",
  "genre-7": "Unparalleled in its depth and complexity, ::game.S.title:: raised the mark for all other ::game.S.genre:: games.",
  "genre-8": "::game.S.title:: revolutionized the ::game.S.genre:: genre with how many real world variables it threw at players.",
  "genre-9": "::game.S.title|possessive:: accessibility, gameplay, and systems made it easier to enjoy than most other ::game.S.genre:: games that had shipped before.",
  "genre-10": "::game.S.title:: challanged everything you'd commonly expect from ::game.s.genre|articlize:: experience.",
  "genre-11": "::game.S.title:: felt like ::game.s.genre|articlize:: game on steroids.",
  "genre-12": "::game.S.title:: is a more cartoony ::game.S.genre:: than others of its kind, something it leans into with its world and puzzle design."
};

var mobile = {
  "mobile-0": "::game.S.title:: is another example of a mobile game done near-perfectly.",
  "mobile-1": "When :game.S.title:: released on mobile devices in ::game.S.releaseDate::, it differentiated itself from other mobile games with its acclaimed presentation, depth and amount of content."
};

var singlePlatform = {
  "singlePlatform-0": "::game.S.title:: pushed the ::game.S.platform:: to its limits.",
  "singlePlatform-1": "::game.S.title:: was a standout of weird ::game.S.platform:: releases.",
  "singlePlatform-2": "::game.S.title:: was in someways the last hurrah on the ::game.S.platform::",
  "singlePlatform-3": "::game.S.title:: was a must-own for ::game.S.genre::-lovers on the ::game.S.platform::.",
  "singlePlatform-4": "::game.S.title|possessive:: tight gameplay made it a standout of the then-aging ::game.S.platform::.",
  "singlePlatform-5": "When released in ::game.S.releaseDate::, ::game.S.title:: set a new world record as the fastest-selling ::game.S.platform:: game, resonating quickly with players."
};

var difficulty = {
  "difficulty-0": "::game.S.title:: helped popularize difficulty as a selling point.",
  "difficulty-1": "A game easy to pick up and instantly find satisfaction with, ::game.S.title:: constantly tempts you into playing it just a little longer with dangerously addictive gameplay.",
  "difficulty-2": "::game.S.title:: may very well be the magnum opus of ultra-difficult ::game.S.genre:: games.",
  "difficulty-3": "Requiring skill and fast responses, ::game.S.title|possessive:: fun-but-precise gameplay makes it easy to pick up and play but a task to master.",
  "difficulty-4": "::game.S.title:: taps into the part of the brain craving \"just one more go,\" leading to numerous lost days in its world.",
  "difficulty-5": "::game.S.title:: tries to marry two audiences: fans of weird humor and fans of difficult ::game.S.genre:: games.",
  "difficulty-6": "::game.S.title:: does away with ::game.S.genre:: conventions in favor of more approachable alternatives, making it a good first step into the genre."
};

var features = {
  "features-0": "Featuring a then-novel concept, ::game.S.title:: let players choose the character they wanted to be and how they wanted to play.",
  "features-1": "Its innovative use of varied gameplay is an early example of a game pushing its gameplay beyond one schtick.",
  "features-2": "::game.S.title:: is a rare example of ::game.S.genre|articlize:: game incentivizing exploration.",
  "features-3": "Impossibly big, ::game.S.title:: gave players a world to lose themselves in.",
  "features-4": "Pitting two players against each other with only a sword — success in ::game.S.title:: relies equally on skill and luck.",
  "features-5": "::game.S.title:: combined visual novel elements to flesh out its lore and backstory, a move many saw as groundbreaking for the genre.",
  "features-6": "Tasking up to four players with breaking out of a castle, players were invited to utilize the interactive environment and items in the world to progress — something notable and revolutionary in ::game.S.releaseDate::."
};

var artStyle = {
  "artStyle-0": "Nearly hypnotic, the game's gorgeous art-style make for a game as much a joy to look at as it is to play.",
  "artStyle-1": "It's rare for a game released in ::game.S.releaseDate:: to still look great, and yet ::game.S.title:: looks half its age.",
  "artStyle-2": "::game.S.title:: makes use of its minimalistic art direction to tell a story resonating with its players emotionally, making it one of the most renowned games of all time."
};

var review = {
  "review-0": "While many reviews were semi-positive and the game has built a cult following since its release, the developer closed shortly after its release, making ::game.S.title:: its final game.",
  "review-1": "The game is a \"relaxing adventure\" that never takes advantage of its players, according to ::site.title::.",
  "review-2": "As ::site.title|possessive:: review put it, it \"is as beautiful as it is engaging.\"",
  "review-3": "Upon the game's release, many loved the abilities that allowed for worlds to be traversed in different ways other than just running and jumping, but were put off by the lack of polish and issues with the camera.",
  "review-4": "\"::game.S.title:: is unflinchingly ambitious in a way that few games are,\" according to ::site.title::.",
  "review-5": "When it released, ::site.title:: said the game \"grabbed the gaming world with its color and imaginative design.\""
};

var plot = {
  "plot-0": "::game.S.title:: tells a wholesome story about friendship and how, even from different planets, we can find common ground.",
  "plot-1": "Equal parts John Huston and John Woo, it tells a story of love, addiction and tragedy, all tied together into a game."
};

var model = {
  game: {
    genre: ['superhero', 'horror', 'racing', 'puzzle', 'metroidvania', 'action', 'strategy', 'rpg', 'first person shooter', 'third person shooter', 'visual novel', 'platformer', 'action platformer', 'split-screen co-op', 'simulation', 'action-role playing', 'city-sim', 'flight simulator', 'grand strategy', 'real time strategy']
  }
};

var model$1 = {
  site: {
    title: ['Game Informer', 'Polygon', 'GameSpot', 'WayPoint', 'Giant Bomb', 'IGN', 'Electronic Gaming Monthly', 'The Guardian']
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

  var grammar = Object.assign({}, general, review, genre, mobile, singlePlatform, difficulty, plot, features, artStyle);

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

    var text = generator$1({ seed: seed, title: title, releaseDate: releaseDate, platform: systems$1, type: consoleType });

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
