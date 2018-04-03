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

var homePageTemplate = function homePageTemplate() {
  return " <div class='form-container'>\n      <div class=\"background-logo\"></div>\n      <form class='form'>\n        <input id='title-input' type='text' name='title' value='Not Polygon' autofocus>\n        <div>\n          <span> The </span>\n          <input id='amount-input' type='number' name='amount' value='50'>\n          <span> best games of all time</span>\n        </div>\n        <span> After weeks of voting and arguments, we\u2019re ready to present our choices </span>\n        <input id='submit-input' type='submit' name='submit' value='View Now'>\n     </form>\n     </div>";
};

var paintHomePage = function paintHomePage(container) {
  container.innerHTML = '';
  container.innerHTML = homePageTemplate();

  var form = container.querySelector('.create-best-games');

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

var parsedUrl = urlFns.parseUrl();
var isHomePage = parsedUrl.length === 0;
var container = document.querySelector('.container');

if (isHomePage) {
  paintHomePage(container);
}

}());
