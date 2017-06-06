/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
var hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

var addClass = function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

var removeClass = function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

var escapeHtml = function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var _show = function _show(elem) {
  elem.style.opacity = '';
  elem.style.display = 'block';
};

var show = function show(elems) {
  if (elems && !elems.length) {
    return _show(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _show(elems[i]);
  }
};

var _hide = function _hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var hide = function hide(elems) {
  if (elems && !elems.length) {
    return _hide(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _hide(elems[i]);
  }
};

var isDescendant = function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

var getTopMargin = function getTopMargin(elem) {
  elem.style.left = '-9999px';
  elem.style.display = 'block';

  var height = elem.clientHeight,
      padding;
  if (typeof getComputedStyle !== 'undefined') {
    // IE 8
    padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
  } else {
    padding = parseInt(elem.currentStyle.padding);
  }

  elem.style.left = '';
  elem.style.display = 'none';
  return '-' + parseInt((height + padding) / 2) + 'px';
};

var fadeIn = function fadeIn(elem, interval) {
  if (+elem.style.opacity < 1) {
    interval = interval || 16;
    elem.style.opacity = 0;
    elem.style.display = 'block';
    var last = +new Date();
    var tick = (function (_tick) {
      function tick() {
        return _tick.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick.toString();
      };

      return tick;
    })(function () {
      elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
      last = +new Date();

      if (+elem.style.opacity < 1) {
        setTimeout(tick, interval);
      }
    });
    tick();
  }
  elem.style.display = 'block'; //fallback IE8
};

var fadeOut = function fadeOut(elem, interval) {
  interval = interval || 16;
  elem.style.opacity = 1;
  var last = +new Date();
  var tick = (function (_tick2) {
    function tick() {
      return _tick2.apply(this, arguments);
    }

    tick.toString = function () {
      return _tick2.toString();
    };

    return tick;
  })(function () {
    elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
    last = +new Date();

    if (+elem.style.opacity > 0) {
      setTimeout(tick, interval);
    } else {
      elem.style.display = 'none';
    }
  });
  tick();
};

var fireClick = function fireClick(node) {
  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
  // Then fixed for today's Chrome browser.
  if (typeof MouseEvent === 'function') {
    // Up-to-date approach
    var mevt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });
    node.dispatchEvent(mevt);
  } else if (document.createEvent) {
    // Fallback
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick');
  } else if (typeof node.onclick === 'function') {
    node.onclick();
  }
};

var stopEventPropagation = function stopEventPropagation(e) {
  // In particular, make sure the space bar doesn't scroll the main window.
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
    e.preventDefault();
  } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
    window.event.cancelBubble = true;
  }
};

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.escapeHtml = escapeHtml;
exports._show = _show;
exports.show = show;
exports._hide = _hide;
exports.hide = hide;
exports.isDescendant = isDescendant;
exports.getTopMargin = getTopMargin;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.fireClick = fireClick;
exports.stopEventPropagation = stopEventPropagation;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _hexToRgb = __webpack_require__(2);

var _removeClass$getTopMargin$fadeIn$show$addClass = __webpack_require__(0);

var _defaultParams = __webpack_require__(5);

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

/*
 * Add modal + overlay to DOM
 */

var _injectedHTML = __webpack_require__(19);

var _injectedHTML2 = _interopRequireWildcard(_injectedHTML);

var modalClass = '.sweet-alert';
var overlayClass = '.sweet-overlay';

var sweetAlertInitialize = function sweetAlertInitialize() {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = _injectedHTML2['default'];

  // Append elements to body
  while (sweetWrap.firstChild) {
    document.body.appendChild(sweetWrap.firstChild);
  }
};

/*
 * Get DOM element of modal
 */
var getModal = (function (_getModal) {
  function getModal() {
    return _getModal.apply(this, arguments);
  }

  getModal.toString = function () {
    return _getModal.toString();
  };

  return getModal;
})(function () {
  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    sweetAlertInitialize();
    $modal = getModal();
  }

  return $modal;
});

/*
 * Get DOM element of input (in modal)
 */
var getInput = function getInput() {
  var $modal = getModal();
  if ($modal) {
    return $modal.querySelector('input');
  }
};

/*
 * Get DOM element of overlay
 */
var getOverlay = function getOverlay() {
  return document.querySelector(overlayClass);
};

/*
 * Add box-shadow style to button (depending on its chosen bg-color)
 */
var setFocusStyle = function setFocusStyle($button, bgColor) {
  var rgbColor = _hexToRgb.hexToRgb(bgColor);
  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
};

/*
 * Animation when opening modal
 */
var openModal = function openModal(callback) {
  var $modal = getModal();
  _removeClass$getTopMargin$fadeIn$show$addClass.fadeIn(getOverlay(), 10);
  _removeClass$getTopMargin$fadeIn$show$addClass.show($modal);
  _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'showSweetAlert');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'hideSweetAlert');

  window.previousActiveElement = document.activeElement;
  var $okButton = $modal.querySelector('button.confirm');
  $okButton.focus();

  setTimeout(function () {
    _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'visible');
  }, 500);

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    var timerCallback = callback;
    $modal.timeout = setTimeout(function () {
      var doneFunctionExists = (timerCallback || null) && $modal.getAttribute('data-has-done-function') === 'true';
      if (doneFunctionExists) {
        timerCallback(null);
      } else {
        sweetAlert.close();
      }
    }, timer);
  }
};

/*
 * Reset the styling of the input
 * (for example if errors have been shown)
 */
var resetInput = function resetInput() {
  var $modal = getModal();
  var $input = getInput();

  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'show-input');
  $input.value = _defaultParams2['default'].inputValue;
  $input.setAttribute('type', _defaultParams2['default'].inputType);
  $input.setAttribute('placeholder', _defaultParams2['default'].inputPlaceholder);

  resetInputError();
};

var resetInputError = function resetInputError(event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorContainer, 'show');
};

/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function fixVerticalPosition() {
  var $modal = getModal();
  $modal.style.marginTop = _removeClass$getTopMargin$fadeIn$show$addClass.getTopMargin(getModal());
};

exports.sweetAlertInitialize = sweetAlertInitialize;
exports.getModal = getModal;
exports.getOverlay = getOverlay;
exports.getInput = getInput;
exports.setFocusStyle = setFocusStyle;
exports.openModal = openModal;
exports.resetInput = resetInput;
exports.resetInputError = resetInputError;
exports.fixVerticalPosition = fixVerticalPosition;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * Allow user to pass their own params
 */
var extend = function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/*
 * Convert HEX codes to RGB values (#000000 -> rgb(0,0,0))
 */
var hexToRgb = function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
};

/*
 * Check if the user is using Internet Explorer 8 (for fallbacks)
 */
var isIE8 = function isIE8() {
  return window.attachEvent && !window.addEventListener;
};

/*
 * IE compatible logging for developers
 */
var logStr = function logStr(string) {
  if (window.console) {
    // IE...
    window.console.log('SweetAlert: ' + string);
  }
};

/*
 * Set hover, active and focus-states for buttons 
 * (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
 */
var colorLuminance = function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // Convert to decimal and change luminosity
  var rgb = '#';
  var c;
  var i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
};

exports.extend = extend;
exports.hexToRgb = hexToRgb;
exports.isIE8 = isIE8;
exports.logStr = logStr;
exports.colorLuminance = colorLuminance;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
var defaultParams = {
  title: '',
  text: '',
  type: null,
  allowOutsideClick: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnConfirm: true,
  closeOnCancel: true,
  confirmButtonText: 'OK',
  confirmButtonColor: '#8CD4F5',
  cancelButtonText: 'Cancel',
  imageUrl: null,
  imageSize: null,
  timer: null,
  customClass: '',
  html: false,
  animation: true,
  allowEscapeKey: true,
  inputType: 'text',
  inputPlaceholder: '',
  inputValue: '',
  showLoaderOnConfirm: false
};

exports['default'] = defaultParams;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__palavraPorCodigo__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__palavraPorCodigo__["a"]; });





/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var palavrasReservadas = [];
palavrasReservadas[1] = 'write';
palavrasReservadas[2] = 'while';
palavrasReservadas[3] = 'var';
palavrasReservadas[4] = 'then';
palavrasReservadas[5] = 'string';
palavrasReservadas[6] = 'senao';
palavrasReservadas[7] = 'read';
palavrasReservadas[8] = 'procedure';
palavrasReservadas[9] = 'or';
palavrasReservadas[10] = 'of';
palavrasReservadas[11] = 'not';
palavrasReservadas[12] = 'ninteiro';
palavrasReservadas[13] = 'nfloat';
palavrasReservadas[14] = 'literal';
palavrasReservadas[15] = 'integer';
palavrasReservadas[16] = 'if';
palavrasReservadas[17] = 'ident';
palavrasReservadas[18] = 'î';
palavrasReservadas[19] = 'float';
palavrasReservadas[20] = 'fim';
palavrasReservadas[21] = 'end';
palavrasReservadas[22] = 'do';
palavrasReservadas[23] = 'case';
palavrasReservadas[24] = 'call';
palavrasReservadas[25] = 'begin';
palavrasReservadas[26] = 'and';
palavrasReservadas[27] = '>='
palavrasReservadas[28] = '>'
palavrasReservadas[29] = '=';
palavrasReservadas[30] = '<>';
palavrasReservadas[31] = '<=';
palavrasReservadas[32] = '<';
palavrasReservadas[33] = '+';
palavrasReservadas[34] = '}';
palavrasReservadas[35] = '{';
palavrasReservadas[36] = ';';
palavrasReservadas[37] = ':=';
palavrasReservadas[38] = ':';
palavrasReservadas[39] = '/';
palavrasReservadas[40] = ',';
palavrasReservadas[41] = '*';
palavrasReservadas[42] = ')';
palavrasReservadas[43] = '(';
palavrasReservadas[44] = '$';
palavrasReservadas[45] = '-';
/* harmony default export */ __webpack_exports__["a"] = (palavrasReservadas);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js!./sweetalert.css", function() {
			var newContent = require("!!../../css-loader/index.js!./sweetalert.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./table.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./table.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

/*
 * jQuery-like functions for manipulating the DOM
 */

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation = __webpack_require__(0);

/*
 * Handy utilities
 */

var _extend$hexToRgb$isIE8$logStr$colorLuminance = __webpack_require__(2);

/*
 *  Handle sweetAlert's DOM elements
 */

var _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition = __webpack_require__(1);

// Handle button events and keyboard events

var _handleButton$handleConfirm$handleCancel = __webpack_require__(17);

var _handleKeyDown = __webpack_require__(18);

var _handleKeyDown2 = _interopRequireWildcard(_handleKeyDown);

// Default values

var _defaultParams = __webpack_require__(5);

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

var _setParameters = __webpack_require__(20);

var _setParameters2 = _interopRequireWildcard(_setParameters);

/*
 * Remember state in cases where opening and handling a modal will fiddle with it.
 * (We also use window.previousActiveElement as a global variable)
 */
var previousWindowKeyDown;
var lastFocusedButton;

/*
 * Global sweetAlert function
 * (this is what the user calls)
 */
var sweetAlert, swal;

exports['default'] = sweetAlert = swal = function () {
  var customizations = arguments[0];

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(document.body, 'stop-scrolling');
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.resetInput();

  /*
   * Use argument if defined or default value from params object otherwise.
   * Supports the case where a default value is boolean true and should be
   * overridden by a corresponding explicit argument which is boolean false.
   */
  function argumentOrDefault(key) {
    var args = customizations;
    return args[key] === undefined ? _defaultParams2['default'][key] : args[key];
  }

  if (customizations === undefined) {
    _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert expects at least 1 attribute!');
    return false;
  }

  var params = _extend$hexToRgb$isIE8$logStr$colorLuminance.extend({}, _defaultParams2['default']);

  switch (typeof customizations) {

    // Ex: swal("Hello", "Just testing", "info");
    case 'string':
      params.title = customizations;
      params.text = arguments[1] || '';
      params.type = arguments[2] || '';
      break;

    // Ex: swal({ title:"Hello", text: "Just testing", type: "info" });
    case 'object':
      if (customizations.title === undefined) {
        _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Missing "title" argument!');
        return false;
      }

      params.title = customizations.title;

      for (var customName in _defaultParams2['default']) {
        params[customName] = argumentOrDefault(customName);
      }

      // Show "Confirm" instead of "OK" if cancel button is visible
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : _defaultParams2['default'].confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Callback function when clicking on "OK"/"Cancel"
      params.doneFunction = arguments[1] || null;

      break;

    default:
      _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations);
      return false;

  }

  _setParameters2['default'](params);
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.fixVerticalPosition();
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.openModal(arguments[1]);

  // Modal interactions
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  /*
   * Make sure all modal buttons respond to all events
   */
  var $buttons = modal.querySelectorAll('button');
  var buttonEvents = ['onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onfocus'];
  var onButtonEvent = function onButtonEvent(e) {
    return _handleButton$handleConfirm$handleCancel.handleButton(e, params, modal);
  };

  for (var btnIndex = 0; btnIndex < $buttons.length; btnIndex++) {
    for (var evtIndex = 0; evtIndex < buttonEvents.length; evtIndex++) {
      var btnEvt = buttonEvents[evtIndex];
      $buttons[btnIndex][btnEvt] = onButtonEvent;
    }
  }

  // Clicking outside the modal dismisses it (if allowed by user)
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay().onclick = onButtonEvent;

  previousWindowKeyDown = window.onkeydown;

  var onKeyEvent = function onKeyEvent(e) {
    return _handleKeyDown2['default'](e, params, modal);
  };
  window.onkeydown = onKeyEvent;

  window.onfocus = function () {
    // When the user has focused away and focused back from the whole window.
    setTimeout(function () {
      // Put in a timeout to jump out of the event sequence.
      // Calling focus() in the event sequence confuses things.
      if (lastFocusedButton !== undefined) {
        lastFocusedButton.focus();
        lastFocusedButton = undefined;
      }
    }, 0);
  };

  // Show alert with enabled buttons always
  swal.enableButtons();
};

/*
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = swal.setDefaults = function (userParams) {
  if (!userParams) {
    throw new Error('userParams is required');
  }
  if (typeof userParams !== 'object') {
    throw new Error('userParams has to be a object');
  }

  _extend$hexToRgb$isIE8$logStr$colorLuminance.extend(_defaultParams2['default'], userParams);
};

/*
 * Animation when closing modal
 */
sweetAlert.close = swal.close = function () {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(_sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay(), 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(modal, 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'showSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(modal, 'hideSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'visible');

  /*
   * Reset icon animations
   */
  var $successIcon = modal.querySelector('.sa-icon.sa-success');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon, 'animate');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'animateErrorIcon');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon, 'pulseWarning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

  // Reset custom class (delay so that UI changes aren't visible)
  setTimeout(function () {
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, customClass);
  }, 300);

  // Make page scrollable again
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(document.body, 'stop-scrolling');

  // Reset the page to its previous state
  window.onkeydown = previousWindowKeyDown;
  if (window.previousActiveElement) {
    window.previousActiveElement.focus();
  }
  lastFocusedButton = undefined;
  clearTimeout(modal.timeout);

  return true;
};

/*
 * Validation of the input field is done by user
 * If something is wrong => call showInputError with errorMessage
 */
sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorIcon, 'show');

  var $errorContainer = modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorContainer, 'show');

  $errorContainer.querySelector('p').innerHTML = errorMessage;

  setTimeout(function () {
    sweetAlert.enableButtons();
  }, 1);

  modal.querySelector('input').focus();
};

/*
 * Reset input error DOM elements
 */
sweetAlert.resetInputError = swal.resetInputError = function (event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorContainer, 'show');
};

/*
 * Disable confirm and cancel buttons
 */
sweetAlert.disableButtons = swal.disableButtons = function (event) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = true;
  $cancelButton.disabled = true;
};

/*
 * Enable confirm and cancel buttons
 */
sweetAlert.enableButtons = swal.enableButtons = function (event) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = false;
  $cancelButton.disabled = false;
};

if (typeof window !== 'undefined') {
  // The 'handle-click' module requires
  // that 'sweetAlert' was set as global.
  window.sweetAlert = window.swal = sweetAlert;
} else {
  _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert is a frontend module!');
}
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__analisadorLexico__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__analisadorLexico__["a"]; });



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__analisadorSintatico__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__analisadorSintatico__["a"]; });



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "body.stop-scrolling {\n  height: 100%;\n  overflow: hidden; }\n\n.sweet-overlay {\n  background-color: black;\n  /* IE8 */\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=40)\";\n  /* IE8 */\n  background-color: rgba(0, 0, 0, 0.4);\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: none;\n  z-index: 10000; }\n\n.sweet-alert {\n  background-color: white;\n  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  width: 478px;\n  padding: 17px;\n  border-radius: 5px;\n  text-align: center;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -256px;\n  margin-top: -200px;\n  overflow: hidden;\n  display: none;\n  z-index: 99999; }\n  @media all and (max-width: 540px) {\n    .sweet-alert {\n      width: auto;\n      margin-left: 0;\n      margin-right: 0;\n      left: 15px;\n      right: 15px; } }\n  .sweet-alert h2 {\n    color: #575757;\n    font-size: 30px;\n    text-align: center;\n    font-weight: 600;\n    text-transform: none;\n    position: relative;\n    margin: 25px 0;\n    padding: 0;\n    line-height: 40px;\n    display: block; }\n  .sweet-alert p {\n    color: #797979;\n    font-size: 16px;\n    text-align: center;\n    font-weight: 300;\n    position: relative;\n    text-align: inherit;\n    float: none;\n    margin: 0;\n    padding: 0;\n    line-height: normal; }\n  .sweet-alert fieldset {\n    border: none;\n    position: relative; }\n  .sweet-alert .sa-error-container {\n    background-color: #f1f1f1;\n    margin-left: -17px;\n    margin-right: -17px;\n    overflow: hidden;\n    padding: 0 10px;\n    max-height: 0;\n    webkit-transition: padding 0.15s, max-height 0.15s;\n    transition: padding 0.15s, max-height 0.15s; }\n    .sweet-alert .sa-error-container.show {\n      padding: 10px 0;\n      max-height: 100px;\n      webkit-transition: padding 0.2s, max-height 0.2s;\n      transition: padding 0.25s, max-height 0.25s; }\n    .sweet-alert .sa-error-container .icon {\n      display: inline-block;\n      width: 24px;\n      height: 24px;\n      border-radius: 50%;\n      background-color: #ea7d7d;\n      color: white;\n      line-height: 24px;\n      text-align: center;\n      margin-right: 3px; }\n    .sweet-alert .sa-error-container p {\n      display: inline-block; }\n  .sweet-alert .sa-input-error {\n    position: absolute;\n    top: 29px;\n    right: 26px;\n    width: 20px;\n    height: 20px;\n    opacity: 0;\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5);\n    -webkit-transform-origin: 50% 50%;\n    transform-origin: 50% 50%;\n    -webkit-transition: all 0.1s;\n    transition: all 0.1s; }\n    .sweet-alert .sa-input-error::before, .sweet-alert .sa-input-error::after {\n      content: \"\";\n      width: 20px;\n      height: 6px;\n      background-color: #f06e57;\n      border-radius: 3px;\n      position: absolute;\n      top: 50%;\n      margin-top: -4px;\n      left: 50%;\n      margin-left: -9px; }\n    .sweet-alert .sa-input-error::before {\n      -webkit-transform: rotate(-45deg);\n      transform: rotate(-45deg); }\n    .sweet-alert .sa-input-error::after {\n      -webkit-transform: rotate(45deg);\n      transform: rotate(45deg); }\n    .sweet-alert .sa-input-error.show {\n      opacity: 1;\n      -webkit-transform: scale(1);\n      transform: scale(1); }\n  .sweet-alert input {\n    width: 100%;\n    box-sizing: border-box;\n    border-radius: 3px;\n    border: 1px solid #d7d7d7;\n    height: 43px;\n    margin-top: 10px;\n    margin-bottom: 17px;\n    font-size: 18px;\n    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.06);\n    padding: 0 12px;\n    display: none;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s; }\n    .sweet-alert input:focus {\n      outline: none;\n      box-shadow: 0px 0px 3px #c4e6f5;\n      border: 1px solid #b4dbed; }\n      .sweet-alert input:focus::-moz-placeholder {\n        transition: opacity 0.3s 0.03s ease;\n        opacity: 0.5; }\n      .sweet-alert input:focus:-ms-input-placeholder {\n        transition: opacity 0.3s 0.03s ease;\n        opacity: 0.5; }\n      .sweet-alert input:focus::-webkit-input-placeholder {\n        transition: opacity 0.3s 0.03s ease;\n        opacity: 0.5; }\n    .sweet-alert input::-moz-placeholder {\n      color: #bdbdbd; }\n    .sweet-alert input:-ms-input-placeholder {\n      color: #bdbdbd; }\n    .sweet-alert input::-webkit-input-placeholder {\n      color: #bdbdbd; }\n  .sweet-alert.show-input input {\n    display: block; }\n  .sweet-alert .sa-confirm-button-container {\n    display: inline-block;\n    position: relative; }\n  .sweet-alert .la-ball-fall {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    margin-left: -27px;\n    margin-top: 4px;\n    opacity: 0;\n    visibility: hidden; }\n  .sweet-alert button {\n    background-color: #8CD4F5;\n    color: white;\n    border: none;\n    box-shadow: none;\n    font-size: 17px;\n    font-weight: 500;\n    -webkit-border-radius: 4px;\n    border-radius: 5px;\n    padding: 10px 32px;\n    margin: 26px 5px 0 5px;\n    cursor: pointer; }\n    .sweet-alert button:focus {\n      outline: none;\n      box-shadow: 0 0 2px rgba(128, 179, 235, 0.5), inset 0 0 0 1px rgba(0, 0, 0, 0.05); }\n    .sweet-alert button:hover {\n      background-color: #7ecff4; }\n    .sweet-alert button:active {\n      background-color: #5dc2f1; }\n    .sweet-alert button.cancel {\n      background-color: #C1C1C1; }\n      .sweet-alert button.cancel:hover {\n        background-color: #b9b9b9; }\n      .sweet-alert button.cancel:active {\n        background-color: #a8a8a8; }\n      .sweet-alert button.cancel:focus {\n        box-shadow: rgba(197, 205, 211, 0.8) 0px 0px 2px, rgba(0, 0, 0, 0.0470588) 0px 0px 0px 1px inset !important; }\n    .sweet-alert button[disabled] {\n      opacity: .6;\n      cursor: default; }\n    .sweet-alert button.confirm[disabled] {\n      color: transparent; }\n      .sweet-alert button.confirm[disabled] ~ .la-ball-fall {\n        opacity: 1;\n        visibility: visible;\n        transition-delay: 0s; }\n    .sweet-alert button::-moz-focus-inner {\n      border: 0; }\n  .sweet-alert[data-has-cancel-button=false] button {\n    box-shadow: none !important; }\n  .sweet-alert[data-has-confirm-button=false][data-has-cancel-button=false] {\n    padding-bottom: 40px; }\n  .sweet-alert .sa-icon {\n    width: 80px;\n    height: 80px;\n    border: 4px solid gray;\n    -webkit-border-radius: 40px;\n    border-radius: 40px;\n    border-radius: 50%;\n    margin: 20px auto;\n    padding: 0;\n    position: relative;\n    box-sizing: content-box; }\n    .sweet-alert .sa-icon.sa-error {\n      border-color: #F27474; }\n      .sweet-alert .sa-icon.sa-error .sa-x-mark {\n        position: relative;\n        display: block; }\n      .sweet-alert .sa-icon.sa-error .sa-line {\n        position: absolute;\n        height: 5px;\n        width: 47px;\n        background-color: #F27474;\n        display: block;\n        top: 37px;\n        border-radius: 2px; }\n        .sweet-alert .sa-icon.sa-error .sa-line.sa-left {\n          -webkit-transform: rotate(45deg);\n          transform: rotate(45deg);\n          left: 17px; }\n        .sweet-alert .sa-icon.sa-error .sa-line.sa-right {\n          -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg);\n          right: 16px; }\n    .sweet-alert .sa-icon.sa-warning {\n      border-color: #F8BB86; }\n      .sweet-alert .sa-icon.sa-warning .sa-body {\n        position: absolute;\n        width: 5px;\n        height: 47px;\n        left: 50%;\n        top: 10px;\n        -webkit-border-radius: 2px;\n        border-radius: 2px;\n        margin-left: -2px;\n        background-color: #F8BB86; }\n      .sweet-alert .sa-icon.sa-warning .sa-dot {\n        position: absolute;\n        width: 7px;\n        height: 7px;\n        -webkit-border-radius: 50%;\n        border-radius: 50%;\n        margin-left: -3px;\n        left: 50%;\n        bottom: 10px;\n        background-color: #F8BB86; }\n    .sweet-alert .sa-icon.sa-info {\n      border-color: #C9DAE1; }\n      .sweet-alert .sa-icon.sa-info::before {\n        content: \"\";\n        position: absolute;\n        width: 5px;\n        height: 29px;\n        left: 50%;\n        bottom: 17px;\n        border-radius: 2px;\n        margin-left: -2px;\n        background-color: #C9DAE1; }\n      .sweet-alert .sa-icon.sa-info::after {\n        content: \"\";\n        position: absolute;\n        width: 7px;\n        height: 7px;\n        border-radius: 50%;\n        margin-left: -3px;\n        top: 19px;\n        background-color: #C9DAE1; }\n    .sweet-alert .sa-icon.sa-success {\n      border-color: #A5DC86; }\n      .sweet-alert .sa-icon.sa-success::before, .sweet-alert .sa-icon.sa-success::after {\n        content: '';\n        -webkit-border-radius: 40px;\n        border-radius: 40px;\n        border-radius: 50%;\n        position: absolute;\n        width: 60px;\n        height: 120px;\n        background: white;\n        -webkit-transform: rotate(45deg);\n        transform: rotate(45deg); }\n      .sweet-alert .sa-icon.sa-success::before {\n        -webkit-border-radius: 120px 0 0 120px;\n        border-radius: 120px 0 0 120px;\n        top: -7px;\n        left: -33px;\n        -webkit-transform: rotate(-45deg);\n        transform: rotate(-45deg);\n        -webkit-transform-origin: 60px 60px;\n        transform-origin: 60px 60px; }\n      .sweet-alert .sa-icon.sa-success::after {\n        -webkit-border-radius: 0 120px 120px 0;\n        border-radius: 0 120px 120px 0;\n        top: -11px;\n        left: 30px;\n        -webkit-transform: rotate(-45deg);\n        transform: rotate(-45deg);\n        -webkit-transform-origin: 0px 60px;\n        transform-origin: 0px 60px; }\n      .sweet-alert .sa-icon.sa-success .sa-placeholder {\n        width: 80px;\n        height: 80px;\n        border: 4px solid rgba(165, 220, 134, 0.2);\n        -webkit-border-radius: 40px;\n        border-radius: 40px;\n        border-radius: 50%;\n        box-sizing: content-box;\n        position: absolute;\n        left: -4px;\n        top: -4px;\n        z-index: 2; }\n      .sweet-alert .sa-icon.sa-success .sa-fix {\n        width: 5px;\n        height: 90px;\n        background-color: white;\n        position: absolute;\n        left: 28px;\n        top: 8px;\n        z-index: 1;\n        -webkit-transform: rotate(-45deg);\n        transform: rotate(-45deg); }\n      .sweet-alert .sa-icon.sa-success .sa-line {\n        height: 5px;\n        background-color: #A5DC86;\n        display: block;\n        border-radius: 2px;\n        position: absolute;\n        z-index: 2; }\n        .sweet-alert .sa-icon.sa-success .sa-line.sa-tip {\n          width: 25px;\n          left: 14px;\n          top: 46px;\n          -webkit-transform: rotate(45deg);\n          transform: rotate(45deg); }\n        .sweet-alert .sa-icon.sa-success .sa-line.sa-long {\n          width: 47px;\n          right: 8px;\n          top: 38px;\n          -webkit-transform: rotate(-45deg);\n          transform: rotate(-45deg); }\n    .sweet-alert .sa-icon.sa-custom {\n      background-size: contain;\n      border-radius: 0;\n      border: none;\n      background-position: center center;\n      background-repeat: no-repeat; }\n\n/*\n * Animations\n */\n@-webkit-keyframes showSweetAlert {\n  0% {\n    transform: scale(0.7);\n    -webkit-transform: scale(0.7); }\n  45% {\n    transform: scale(1.05);\n    -webkit-transform: scale(1.05); }\n  80% {\n    transform: scale(0.95);\n    -webkit-transform: scale(0.95); }\n  100% {\n    transform: scale(1);\n    -webkit-transform: scale(1); } }\n\n@keyframes showSweetAlert {\n  0% {\n    transform: scale(0.7);\n    -webkit-transform: scale(0.7); }\n  45% {\n    transform: scale(1.05);\n    -webkit-transform: scale(1.05); }\n  80% {\n    transform: scale(0.95);\n    -webkit-transform: scale(0.95); }\n  100% {\n    transform: scale(1);\n    -webkit-transform: scale(1); } }\n\n@-webkit-keyframes hideSweetAlert {\n  0% {\n    transform: scale(1);\n    -webkit-transform: scale(1); }\n  100% {\n    transform: scale(0.5);\n    -webkit-transform: scale(0.5); } }\n\n@keyframes hideSweetAlert {\n  0% {\n    transform: scale(1);\n    -webkit-transform: scale(1); }\n  100% {\n    transform: scale(0.5);\n    -webkit-transform: scale(0.5); } }\n\n@-webkit-keyframes slideFromTop {\n  0% {\n    top: 0%; }\n  100% {\n    top: 50%; } }\n\n@keyframes slideFromTop {\n  0% {\n    top: 0%; }\n  100% {\n    top: 50%; } }\n\n@-webkit-keyframes slideToTop {\n  0% {\n    top: 50%; }\n  100% {\n    top: 0%; } }\n\n@keyframes slideToTop {\n  0% {\n    top: 50%; }\n  100% {\n    top: 0%; } }\n\n@-webkit-keyframes slideFromBottom {\n  0% {\n    top: 70%; }\n  100% {\n    top: 50%; } }\n\n@keyframes slideFromBottom {\n  0% {\n    top: 70%; }\n  100% {\n    top: 50%; } }\n\n@-webkit-keyframes slideToBottom {\n  0% {\n    top: 50%; }\n  100% {\n    top: 70%; } }\n\n@keyframes slideToBottom {\n  0% {\n    top: 50%; }\n  100% {\n    top: 70%; } }\n\n.showSweetAlert[data-animation=pop] {\n  -webkit-animation: showSweetAlert 0.3s;\n  animation: showSweetAlert 0.3s; }\n\n.showSweetAlert[data-animation=none] {\n  -webkit-animation: none;\n  animation: none; }\n\n.showSweetAlert[data-animation=slide-from-top] {\n  -webkit-animation: slideFromTop 0.3s;\n  animation: slideFromTop 0.3s; }\n\n.showSweetAlert[data-animation=slide-from-bottom] {\n  -webkit-animation: slideFromBottom 0.3s;\n  animation: slideFromBottom 0.3s; }\n\n.hideSweetAlert[data-animation=pop] {\n  -webkit-animation: hideSweetAlert 0.2s;\n  animation: hideSweetAlert 0.2s; }\n\n.hideSweetAlert[data-animation=none] {\n  -webkit-animation: none;\n  animation: none; }\n\n.hideSweetAlert[data-animation=slide-from-top] {\n  -webkit-animation: slideToTop 0.4s;\n  animation: slideToTop 0.4s; }\n\n.hideSweetAlert[data-animation=slide-from-bottom] {\n  -webkit-animation: slideToBottom 0.3s;\n  animation: slideToBottom 0.3s; }\n\n@-webkit-keyframes animateSuccessTip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  54% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  70% {\n    width: 50px;\n    left: -8px;\n    top: 37px; }\n  84% {\n    width: 17px;\n    left: 21px;\n    top: 48px; }\n  100% {\n    width: 25px;\n    left: 14px;\n    top: 45px; } }\n\n@keyframes animateSuccessTip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  54% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  70% {\n    width: 50px;\n    left: -8px;\n    top: 37px; }\n  84% {\n    width: 17px;\n    left: 21px;\n    top: 48px; }\n  100% {\n    width: 25px;\n    left: 14px;\n    top: 45px; } }\n\n@-webkit-keyframes animateSuccessLong {\n  0% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  65% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  84% {\n    width: 55px;\n    right: 0px;\n    top: 35px; }\n  100% {\n    width: 47px;\n    right: 8px;\n    top: 38px; } }\n\n@keyframes animateSuccessLong {\n  0% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  65% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  84% {\n    width: 55px;\n    right: 0px;\n    top: 35px; }\n  100% {\n    width: 47px;\n    right: 8px;\n    top: 38px; } }\n\n@-webkit-keyframes rotatePlaceholder {\n  0% {\n    transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg); }\n  5% {\n    transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg); }\n  12% {\n    transform: rotate(-405deg);\n    -webkit-transform: rotate(-405deg); }\n  100% {\n    transform: rotate(-405deg);\n    -webkit-transform: rotate(-405deg); } }\n\n@keyframes rotatePlaceholder {\n  0% {\n    transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg); }\n  5% {\n    transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg); }\n  12% {\n    transform: rotate(-405deg);\n    -webkit-transform: rotate(-405deg); }\n  100% {\n    transform: rotate(-405deg);\n    -webkit-transform: rotate(-405deg); } }\n\n.animateSuccessTip {\n  -webkit-animation: animateSuccessTip 0.75s;\n  animation: animateSuccessTip 0.75s; }\n\n.animateSuccessLong {\n  -webkit-animation: animateSuccessLong 0.75s;\n  animation: animateSuccessLong 0.75s; }\n\n.sa-icon.sa-success.animate::after {\n  -webkit-animation: rotatePlaceholder 4.25s ease-in;\n  animation: rotatePlaceholder 4.25s ease-in; }\n\n@-webkit-keyframes animateErrorIcon {\n  0% {\n    transform: rotateX(100deg);\n    -webkit-transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    transform: rotateX(0deg);\n    -webkit-transform: rotateX(0deg);\n    opacity: 1; } }\n\n@keyframes animateErrorIcon {\n  0% {\n    transform: rotateX(100deg);\n    -webkit-transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    transform: rotateX(0deg);\n    -webkit-transform: rotateX(0deg);\n    opacity: 1; } }\n\n.animateErrorIcon {\n  -webkit-animation: animateErrorIcon 0.5s;\n  animation: animateErrorIcon 0.5s; }\n\n@-webkit-keyframes animateXMark {\n  0% {\n    transform: scale(0.4);\n    -webkit-transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  50% {\n    transform: scale(0.4);\n    -webkit-transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  80% {\n    transform: scale(1.15);\n    -webkit-transform: scale(1.15);\n    margin-top: -6px; }\n  100% {\n    transform: scale(1);\n    -webkit-transform: scale(1);\n    margin-top: 0;\n    opacity: 1; } }\n\n@keyframes animateXMark {\n  0% {\n    transform: scale(0.4);\n    -webkit-transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  50% {\n    transform: scale(0.4);\n    -webkit-transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  80% {\n    transform: scale(1.15);\n    -webkit-transform: scale(1.15);\n    margin-top: -6px; }\n  100% {\n    transform: scale(1);\n    -webkit-transform: scale(1);\n    margin-top: 0;\n    opacity: 1; } }\n\n.animateXMark {\n  -webkit-animation: animateXMark 0.5s;\n  animation: animateXMark 0.5s; }\n\n@-webkit-keyframes pulseWarning {\n  0% {\n    border-color: #F8D486; }\n  100% {\n    border-color: #F8BB86; } }\n\n@keyframes pulseWarning {\n  0% {\n    border-color: #F8D486; }\n  100% {\n    border-color: #F8BB86; } }\n\n.pulseWarning {\n  -webkit-animation: pulseWarning 0.75s infinite alternate;\n  animation: pulseWarning 0.75s infinite alternate; }\n\n@-webkit-keyframes pulseWarningIns {\n  0% {\n    background-color: #F8D486; }\n  100% {\n    background-color: #F8BB86; } }\n\n@keyframes pulseWarningIns {\n  0% {\n    background-color: #F8D486; }\n  100% {\n    background-color: #F8BB86; } }\n\n.pulseWarningIns {\n  -webkit-animation: pulseWarningIns 0.75s infinite alternate;\n  animation: pulseWarningIns 0.75s infinite alternate; }\n\n@-webkit-keyframes rotate-loading {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n@keyframes rotate-loading {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n/* Internet Explorer 9 has some special quirks that are fixed here */\n/* The icons are not animated. */\n/* This file is automatically merged into sweet-alert.min.js through Gulp */\n/* Error icon */\n.sweet-alert .sa-icon.sa-error .sa-line.sa-left {\n  -ms-transform: rotate(45deg) \\9; }\n\n.sweet-alert .sa-icon.sa-error .sa-line.sa-right {\n  -ms-transform: rotate(-45deg) \\9; }\n\n/* Success icon */\n.sweet-alert .sa-icon.sa-success {\n  border-color: transparent\\9; }\n\n.sweet-alert .sa-icon.sa-success .sa-line.sa-tip {\n  -ms-transform: rotate(45deg) \\9; }\n\n.sweet-alert .sa-icon.sa-success .sa-line.sa-long {\n  -ms-transform: rotate(-45deg) \\9; }\n\n/*!\n * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)\n * Copyright 2015 Daniel Cardoso <@DanielCardoso>\n * Licensed under MIT\n */\n.la-ball-fall,\n.la-ball-fall > div {\n  position: relative;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.la-ball-fall {\n  display: block;\n  font-size: 0;\n  color: #fff; }\n\n.la-ball-fall.la-dark {\n  color: #333; }\n\n.la-ball-fall > div {\n  display: inline-block;\n  float: none;\n  background-color: currentColor;\n  border: 0 solid currentColor; }\n\n.la-ball-fall {\n  width: 54px;\n  height: 18px; }\n\n.la-ball-fall > div {\n  width: 10px;\n  height: 10px;\n  margin: 4px;\n  border-radius: 100%;\n  opacity: 0;\n  -webkit-animation: ball-fall 1s ease-in-out infinite;\n  -moz-animation: ball-fall 1s ease-in-out infinite;\n  -o-animation: ball-fall 1s ease-in-out infinite;\n  animation: ball-fall 1s ease-in-out infinite; }\n\n.la-ball-fall > div:nth-child(1) {\n  -webkit-animation-delay: -200ms;\n  -moz-animation-delay: -200ms;\n  -o-animation-delay: -200ms;\n  animation-delay: -200ms; }\n\n.la-ball-fall > div:nth-child(2) {\n  -webkit-animation-delay: -100ms;\n  -moz-animation-delay: -100ms;\n  -o-animation-delay: -100ms;\n  animation-delay: -100ms; }\n\n.la-ball-fall > div:nth-child(3) {\n  -webkit-animation-delay: 0ms;\n  -moz-animation-delay: 0ms;\n  -o-animation-delay: 0ms;\n  animation-delay: 0ms; }\n\n.la-ball-fall.la-sm {\n  width: 26px;\n  height: 8px; }\n\n.la-ball-fall.la-sm > div {\n  width: 4px;\n  height: 4px;\n  margin: 2px; }\n\n.la-ball-fall.la-2x {\n  width: 108px;\n  height: 36px; }\n\n.la-ball-fall.la-2x > div {\n  width: 20px;\n  height: 20px;\n  margin: 8px; }\n\n.la-ball-fall.la-3x {\n  width: 162px;\n  height: 54px; }\n\n.la-ball-fall.la-3x > div {\n  width: 30px;\n  height: 30px;\n  margin: 12px; }\n\n/*\n * Animation\n */\n@-webkit-keyframes ball-fall {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-145%);\n    transform: translateY(-145%); }\n  10% {\n    opacity: .5; }\n  20% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  80% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  90% {\n    opacity: .5; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(145%);\n    transform: translateY(145%); } }\n\n@-moz-keyframes ball-fall {\n  0% {\n    opacity: 0;\n    -moz-transform: translateY(-145%);\n    transform: translateY(-145%); }\n  10% {\n    opacity: .5; }\n  20% {\n    opacity: 1;\n    -moz-transform: translateY(0);\n    transform: translateY(0); }\n  80% {\n    opacity: 1;\n    -moz-transform: translateY(0);\n    transform: translateY(0); }\n  90% {\n    opacity: .5; }\n  100% {\n    opacity: 0;\n    -moz-transform: translateY(145%);\n    transform: translateY(145%); } }\n\n@-o-keyframes ball-fall {\n  0% {\n    opacity: 0;\n    -o-transform: translateY(-145%);\n    transform: translateY(-145%); }\n  10% {\n    opacity: .5; }\n  20% {\n    opacity: 1;\n    -o-transform: translateY(0);\n    transform: translateY(0); }\n  80% {\n    opacity: 1;\n    -o-transform: translateY(0);\n    transform: translateY(0); }\n  90% {\n    opacity: .5; }\n  100% {\n    opacity: 0;\n    -o-transform: translateY(145%);\n    transform: translateY(145%); } }\n\n@keyframes ball-fall {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-145%);\n    -moz-transform: translateY(-145%);\n    -o-transform: translateY(-145%);\n    transform: translateY(-145%); }\n  10% {\n    opacity: .5; }\n  20% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0); }\n  80% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0); }\n  90% {\n    opacity: .5; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(145%);\n    -moz-transform: translateY(145%);\n    -o-transform: translateY(145%);\n    transform: translateY(145%); } }\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "body{\r\n  font-family: 'Roboto', sans-serif;\r\n  line-height:1;\r\n  font-size: 1em;\r\n  color: #363636;\r\n  padding: 10px;\r\n  margin: 0;\r\n}\r\ntable{border-collapse:collapse;border-spacing:0}\r\nhr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}\r\n.botao {\r\n  background-color: #0366d6;\r\n  color: #fff;\r\n  cursor: pointer;\r\n  padding: .625em;\r\n  border: none;\r\n  border-radius: 3px; \r\n}\r\n.codigo {\r\n  width: 100%;\r\n  font-size: 14px;\r\n  border: 1px solid #ccc;\r\n  margin: 10px 0;\r\n}\r\n.titulo {\r\n  margin: 10px 0;\r\n}\r\n\r\n@media screen and (min-width: 600px) {\r\n  .tela {\r\n    width: 500px;\r\n    margin: auto;\r\n  }\r\n}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, "table {\r\n  border: 1px solid #ccc;\r\n  border-collapse: collapse;\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  table-layout: fixed;\r\n}\r\ntable tr {\r\n  border: 1px solid #ccc;\r\n  padding: .35em;\r\n}\r\ntable th,\r\ntable td {\r\n  padding: .625em;\r\n  text-align: center;\r\n}\r\ntable th {\r\n  font-size: .85em;\r\n  letter-spacing: .1em;\r\n}\r\n@media screen and (max-width: 600px) {\r\n  table {\r\n    border: 0;\r\n  }\r\n  table thead {\r\n    border: none;\r\n    clip: rect(0 0 0 0);\r\n    height: 1px;\r\n    margin: -1px;\r\n    overflow: hidden;\r\n    padding: 0;\r\n    position: absolute;\r\n    width: 1px;\r\n  }\r\n  table tr {\r\n    border-bottom: 3px solid #ccc;\r\n    display: block;\r\n    margin-bottom: .625em;\r\n  }\r\n  table td {\r\n    border-bottom: 1px solid #ccc;\r\n    display: block;\r\n    font-size: .8em;\r\n    text-align: right;\r\n  }\r\n  table td:before {\r\n    /*\r\n    * aria-label has no advantage, it won't be read inside a table\r\n    content: attr(aria-label);\r\n    */\r\n    content: attr(data-label);\r\n    float: left;\r\n    font-weight: bold;\r\n  }\r\n  table td:last-child {\r\n    border-bottom: 0;\r\n  }\r\n}", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _colorLuminance = __webpack_require__(2);

var _getModal = __webpack_require__(1);

var _hasClass$isDescendant = __webpack_require__(0);

/*
 * User clicked on "Confirm"/"OK" or "Cancel"
 */
var handleButton = function handleButton(event, params, modal) {
  var e = event || window.event;
  var target = e.target || e.srcElement;

  var targetedConfirm = target.className.indexOf('confirm') !== -1;
  var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
  var modalIsVisible = _hasClass$isDescendant.hasClass(modal, 'visible');
  var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

  // Since the user can change the background-color of the confirm button programmatically,
  // we must calculate what the color should be on hover/active
  var normalColor, hoverColor, activeColor;
  if (targetedConfirm && params.confirmButtonColor) {
    normalColor = params.confirmButtonColor;
    hoverColor = _colorLuminance.colorLuminance(normalColor, -0.04);
    activeColor = _colorLuminance.colorLuminance(normalColor, -0.14);
  }

  function shouldSetConfirmButtonColor(color) {
    if (targetedConfirm && params.confirmButtonColor) {
      target.style.backgroundColor = color;
    }
  }

  switch (e.type) {
    case 'mouseover':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'mouseout':
      shouldSetConfirmButtonColor(normalColor);
      break;

    case 'mousedown':
      shouldSetConfirmButtonColor(activeColor);
      break;

    case 'mouseup':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'focus':
      var $confirmButton = modal.querySelector('button.confirm');
      var $cancelButton = modal.querySelector('button.cancel');

      if (targetedConfirm) {
        $cancelButton.style.boxShadow = 'none';
      } else {
        $confirmButton.style.boxShadow = 'none';
      }
      break;

    case 'click':
      var clickedOnModal = modal === target;
      var clickedOnModalChild = _hasClass$isDescendant.isDescendant(modal, target);

      // Ignore click outside if allowOutsideClick is false
      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
        break;
      }

      if (targetedConfirm && doneFunctionExists && modalIsVisible) {
        handleConfirm(modal, params);
      } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
        handleCancel(modal, params);
      } else if (_hasClass$isDescendant.isDescendant(modal, target) && target.tagName === 'BUTTON') {
        sweetAlert.close();
      }
      break;
  }
};

/*
 *  User clicked on "Confirm"/"OK"
 */
var handleConfirm = function handleConfirm(modal, params) {
  var callbackValue = true;

  if (_hasClass$isDescendant.hasClass(modal, 'show-input')) {
    callbackValue = modal.querySelector('input').value;

    if (!callbackValue) {
      callbackValue = '';
    }
  }

  params.doneFunction(callbackValue);

  if (params.closeOnConfirm) {
    sweetAlert.close();
  }
  // Disable cancel and confirm button if the parameter is true
  if (params.showLoaderOnConfirm) {
    sweetAlert.disableButtons();
  }
};

/*
 *  User clicked on "Cancel"
 */
var handleCancel = function handleCancel(modal, params) {
  // Check if callback function expects a parameter (to track cancel actions)
  var functionAsStr = String(params.doneFunction).replace(/\s/g, '');
  var functionHandlesCancel = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

  if (functionHandlesCancel) {
    params.doneFunction(false);
  }

  if (params.closeOnCancel) {
    sweetAlert.close();
  }
};

exports['default'] = {
  handleButton: handleButton,
  handleConfirm: handleConfirm,
  handleCancel: handleCancel
};
module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _stopEventPropagation$fireClick = __webpack_require__(0);

var _setFocusStyle = __webpack_require__(1);

var handleKeyDown = function handleKeyDown(event, params, modal) {
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;

  var $okButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  var $modalButtons = modal.querySelectorAll('button[tabindex]');

  if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
    // Don't do work on keys we don't care about.
    return;
  }

  var $targetElement = e.target || e.srcElement;

  var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
  for (var i = 0; i < $modalButtons.length; i++) {
    if ($targetElement === $modalButtons[i]) {
      btnIndex = i;
      break;
    }
  }

  if (keyCode === 9) {
    // TAB
    if (btnIndex === -1) {
      // No button focused. Jump to the confirm button.
      $targetElement = $okButton;
    } else {
      // Cycle to the next button
      if (btnIndex === $modalButtons.length - 1) {
        $targetElement = $modalButtons[0];
      } else {
        $targetElement = $modalButtons[btnIndex + 1];
      }
    }

    _stopEventPropagation$fireClick.stopEventPropagation(e);
    $targetElement.focus();

    if (params.confirmButtonColor) {
      _setFocusStyle.setFocusStyle($targetElement, params.confirmButtonColor);
    }
  } else {
    if (keyCode === 13) {
      if ($targetElement.tagName === 'INPUT') {
        $targetElement = $okButton;
        $okButton.focus();
      }

      if (btnIndex === -1) {
        // ENTER/SPACE clicked outside of a button.
        $targetElement = $okButton;
      } else {
        // Do nothing - let the browser handle it.
        $targetElement = undefined;
      }
    } else if (keyCode === 27 && params.allowEscapeKey === true) {
      $targetElement = $cancelButton;
      _stopEventPropagation$fireClick.fireClick($targetElement, e);
    } else {
      // Fallback - let the browser handle it.
      $targetElement = undefined;
    }
  }
};

exports['default'] = handleKeyDown;
module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var injectedHTML =

// Dark overlay
"<div class=\"sweet-overlay\" tabIndex=\"-1\"></div>" +

// Modal
"<div class=\"sweet-alert\">" +

// Error icon
"<div class=\"sa-icon sa-error\">\n      <span class=\"sa-x-mark\">\n        <span class=\"sa-line sa-left\"></span>\n        <span class=\"sa-line sa-right\"></span>\n      </span>\n    </div>" +

// Warning icon
"<div class=\"sa-icon sa-warning\">\n      <span class=\"sa-body\"></span>\n      <span class=\"sa-dot\"></span>\n    </div>" +

// Info icon
"<div class=\"sa-icon sa-info\"></div>" +

// Success icon
"<div class=\"sa-icon sa-success\">\n      <span class=\"sa-line sa-tip\"></span>\n      <span class=\"sa-line sa-long\"></span>\n\n      <div class=\"sa-placeholder\"></div>\n      <div class=\"sa-fix\"></div>\n    </div>" + "<div class=\"sa-icon sa-custom\"></div>" +

// Title, text and input
"<h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type=\"text\" tabIndex=\"3\" />\n      <div class=\"sa-input-error\"></div>\n    </fieldset>" +

// Input errors
"<div class=\"sa-error-container\">\n      <div class=\"icon\">!</div>\n      <p>Not valid!</p>\n    </div>" +

// Cancel and confirm buttons
"<div class=\"sa-button-container\">\n      <button class=\"cancel\" tabIndex=\"2\">Cancel</button>\n      <div class=\"sa-confirm-button-container\">\n        <button class=\"confirm\" tabIndex=\"1\">OK</button>" +

// Loading animation
"<div class=\"la-ball-fall\">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div>" +

// End of modal
"</div>";

exports["default"] = injectedHTML;
module.exports = exports["default"];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

var _isIE8 = __webpack_require__(2);

var _getModal$getInput$setFocusStyle = __webpack_require__(1);

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide = __webpack_require__(0);

var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

/*
 * Set type, text and actions on modal
 */
var setParameters = function setParameters(params) {
  var modal = _getModal$getInput$setFocusStyle.getModal();

  var $title = modal.querySelector('h2');
  var $text = modal.querySelector('p');
  var $cancelBtn = modal.querySelector('button.cancel');
  var $confirmBtn = modal.querySelector('button.confirm');

  /*
   * Title
   */
  $title.innerHTML = params.html ? params.title : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.title).split('\n').join('<br>');

  /*
   * Text
   */
  $text.innerHTML = params.html ? params.text : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.text || '').split('\n').join('<br>');
  if (params.text) _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($text);

  /*
   * Custom class
   */
  if (params.customClass) {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  } else {
    // Find previously set classes and remove them
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.removeClass(modal, customClass);
    modal.setAttribute('data-custom-class', '');
  }

  /*
   * Icon
   */
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide(modal.querySelectorAll('.sa-icon'));

  if (params.type && !_isIE8.isIE8()) {
    var _ret = (function () {

      var validType = false;

      for (var i = 0; i < alertTypes.length; i++) {
        if (params.type === alertTypes[i]) {
          validType = true;
          break;
        }
      }

      if (!validType) {
        logStr('Unknown alert type: ' + params.type);
        return {
          v: false
        };
      }

      var typesWithIcons = ['success', 'error', 'warning', 'info'];
      var $icon = undefined;

      if (typesWithIcons.indexOf(params.type) !== -1) {
        $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($icon);
      }

      var $input = _getModal$getInput$setFocusStyle.getInput();

      // Animate icon
      switch (params.type) {

        case 'success':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animate');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-tip'), 'animateSuccessTip');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-long'), 'animateSuccessLong');
          break;

        case 'error':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animateErrorIcon');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-x-mark'), 'animateXMark');
          break;

        case 'warning':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'pulseWarning');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-body'), 'pulseWarningIns');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-dot'), 'pulseWarningIns');
          break;

        case 'input':
        case 'prompt':
          $input.setAttribute('type', params.inputType);
          $input.value = params.inputValue;
          $input.setAttribute('placeholder', params.inputPlaceholder);
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, 'show-input');
          setTimeout(function () {
            $input.focus();
            $input.addEventListener('keyup', swal.resetInputError);
          }, 400);
          break;
      }
    })();

    if (typeof _ret === 'object') {
      return _ret.v;
    }
  }

  /*
   * Custom image
   */
  if (params.imageUrl) {
    var $customIcon = modal.querySelector('.sa-icon.sa-custom');

    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($customIcon);

    var _imgWidth = 80;
    var _imgHeight = 80;

    if (params.imageSize) {
      var dimensions = params.imageSize.toString().split('x');
      var imgWidth = dimensions[0];
      var imgHeight = dimensions[1];

      if (!imgWidth || !imgHeight) {
        logStr('Parameter imageSize expects value with format WIDTHxHEIGHT, got ' + params.imageSize);
      } else {
        _imgWidth = imgWidth;
        _imgHeight = imgHeight;
      }
    }

    $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
  }

  /*
   * Show cancel button?
   */
  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
  if (params.showCancelButton) {
    $cancelBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($cancelBtn);
  }

  /*
   * Show confirm button?
   */
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($confirmBtn);
  }

  /*
   * Custom text on cancel/confirm buttons
   */
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.confirmButtonText);
  }

  /*
   * Custom color on confirm button
   */
  if (params.confirmButtonColor) {
    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Set the confirm button color to the loading ring
    $confirmBtn.style.borderLeftColor = params.confirmLoadingButtonColor;
    $confirmBtn.style.borderRightColor = params.confirmLoadingButtonColor;

    // Set box-shadow to default focused button
    _getModal$getInput$setFocusStyle.setFocusStyle($confirmBtn, params.confirmButtonColor);
  }

  /*
   * Allow outside click
   */
  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

  /*
   * Callback function
   */
  var hasDoneFunction = params.doneFunction ? true : false;
  modal.setAttribute('data-has-done-function', hasDoneFunction);

  /*
   * Animation
   */
  if (!params.animation) {
    modal.setAttribute('data-animation', 'none');
  } else if (typeof params.animation === 'string') {
    modal.setAttribute('data-animation', params.animation); // Custom animation
  } else {
    modal.setAttribute('data-animation', 'pop');
  }

  /*
   * Timer
   */
  modal.setAttribute('data-timer', params.timer);
};

exports['default'] = setParameters;
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comparadores__ = __webpack_require__(34);


const SINTAXE_LITERAL_MAX = 333;
const SINTAXE_INTEIRO_MIN = -100000000;
const SINTAXE_INTEIRO_MAX = 100000000;
const SINTAXE_FLOAT_MIN = -100000000;
const SINTAXE_FLOAT_MAX = 100000000;

function init() {
  this.token = '';
  this.tokens = [];
  this.erros = [];
  this.linha = 1;
}

function iniciar(fita) {
  this.analisar(false, fita, 0)
}

function analisar(anterior, fita, i) {
  var cabecoteAnterior = fita[i - 1];
  var cabecote = fita[i];
  var cabecoteProximo = fita[i + 1];

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["a" /* ehEOF */])(cabecote)) {
    this.token += cabecote;
  }

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["b" /* ehQuebraLinha */])(cabecote))
  {
    this.linha++;
  }
  if (anterior == 'COMENTARIO_LINHA' && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["b" /* ehQuebraLinha */])(cabecote) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["a" /* ehEOF */])(cabecote) ) {
    return this.analisar('COMENTARIO_LINHA', fita, ++i);
  }
  else if (anterior == 'COMENTARIO_BLOCO' && !(cabecoteAnterior == '*' && cabecote == '-')) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["a" /* ehEOF */])(cabecote))
    {
        this.adicionarErro('Comentário de bloco (-*) "'+this.token+'" não fechado (*-)');
        return;
    }
    return this.analisar('COMENTARIO_BLOCO', fita, ++i);
  }
  else if (anterior == 'LITERAL' && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["c" /* ehAspa */])(cabecote)) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["a" /* ehEOF */])(cabecote)) {
      this.adicionarErro('Aspas do literal "' + this.token + '" não foram fechadas');
      return;
    }
    return this.analisar('LITERAL', fita, ++i);
  }
  else if (anterior == 'LITERAL' && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["c" /* ehAspa */])(cabecote)) {
    this.adicionarToken('RESEVIDENT');
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["d" /* ehSinal */])(cabecote)) {
    if (cabecote == '-' && cabecoteProximo == '*') {
      return this.analisar('COMENTARIO_BLOCO', fita, ++i);
    } else if (cabecoteAnterior == '*' && cabecote == '-') {
      this.adicionarToken('COMENTARIO_BLOCO');
    } else if (cabecote == '-' && cabecoteProximo == '-') {
      return this.analisar('COMENTARIO_LINHA', fita, ++i);
    }
    else
    {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["e" /* ehComposto */])(cabecoteProximo))
      {
        return this.analisar('SINAL', fita, ++i);
      }
      else
      {
        this.adicionarToken('SINAL');
      }
    }
  } else if (anterior !== false && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["d" /* ehSinal */])(cabecoteProximo)) {
    if (anterior == 'RESEVIDENT' || anterior == 'FLOAT' || anterior == 'INTEIRO')
    {
      this.adicionarToken(anterior);
    }
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["f" /* ehLetra */])(cabecote)) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["d" /* ehSinal */])(cabecoteProximo))
    {
      this.adicionarToken('RESEVIDENT');
    }

    return this.analisar('RESEVIDENT', fita, ++i);
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["c" /* ehAspa */])(cabecote)) {
    if (anterior !== 'LITERAL') {
      return this.analisar('LITERAL', fita, ++i);
    } else {
      this.adicionarToken('LITERAL');
    }
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["g" /* ehNumero */])(cabecote)) {
    if (anterior == false || anterior == 'INTEIRO')
    {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["d" /* ehSinal */])(cabecoteProximo)) {
        this.adicionarToken('INTEIRO');
      }
      return this.analisar('INTEIRO', fita, ++i);
    }
    else if (anterior == 'FLOAT') {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["d" /* ehSinal */])(cabecoteProximo)) {
        this.adicionarToken('FLOAT');
      }
      return this.analisar('FLOAT', fita, ++i);
    }
    else if (anterior == 'RESEVIDENT')
    {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["d" /* ehSinal */])(cabecoteProximo)) {
        this.adicionarToken('RESEVIDENT');
      }
      return this.analisar('RESEVIDENT', fita, ++i);
    }
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["h" /* ehSeparadorDecimal */])(cabecote)) {
    if (anterior == 'INTEIRO')
    {
      return this.analisar('FLOAT', fita, ++i);
    }
  } else {
    this.adicionarToken(anterior);
  }
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["a" /* ehEOF */])(cabecote)) {
    this.adicionarToken('FIM');
    return;
  }
  return this.analisar(false, fita, ++i);
}


function adicionarErro(erro) {
  this.erros.push({
    erro: erro,
    linha: this.linha
  });
}

function adicionarToken(tipo) {
  if (tipo !== 'FIM')
  {
    if ((tipo == false && this.token == ' ') || this.token.trim() == '') {
      this.token = '';
      return;
    }
  }
  var codigo = 0;
  switch (tipo) {
    case 'LITERAL':
      codigo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["i" /* ehPalavraReservada */])('literal');
      var tam = this.token.length - 2;
      if (tam > SINTAXE_LITERAL_MAX) {
        this.adicionarErro('O tamanho do literal (' + tam + ') ultrapassa o tamanho máximo específicado: ' + SINTAXE_LITERAL_MAX);
      }
      break;
    case 'INTEIRO':
      codigo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["i" /* ehPalavraReservada */])('ninteiro');
      var i = parseInt(this.token);
      if (i < SINTAXE_INTEIRO_MIN) {
        this.adicionarErro('O tamanho do inteiro (' + i + ') ultrapassa o tamanho máximo negativo específicado: ' + SINTAXE_INTEIRO_MIN);
      }
      if (i > SINTAXE_INTEIRO_MAX) {
        this.adicionarErro('O tamanho do inteiro (' + i + ') ultrapassa o tamanho máximo positivo específicado: ' + SINTAXE_INTEIRO_MAX);
      }
      break;
    case 'FLOAT':
      codigo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["i" /* ehPalavraReservada */])('nfloat');
      var i = parseFloat(this.token);
      if (i < SINTAXE_FLOAT_MIN) {
        this.adicionarErro('O tamanho do float (' + i + ') ultrapassa o tamanho máximo negativo específicado: ' + SINTAXE_FLOAT_MIN);
      }
      if (i > SINTAXE_FLOAT_MAX) {
        this.adicionarErro('O tamanho do float (' + i + ') ultrapassa o tamanho máximo positivo específicado: ' + SINTAXE_FLOAT_MAX);
      }
      break;
    case 'COMENTARIO_LINHA':
      codigo = 'COMENTARIO_LINHA';
      break;
    case 'COMENTARIO_BLOCO':
      codigo = 'COMENTARIO_BLOCO';
      break;
    case 'FIM':
      codigo = 44;
      this.token = 'fim arquivo';
      break;
    case 'RESEVIDENT':
    default:
      codigo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["i" /* ehPalavraReservada */])(this.token);
      if (!codigo)
        codigo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["i" /* ehPalavraReservada */])('ident');
      break;
  }
  // não adiciona comentários a lista de tokens
  if (codigo !== 'COMENTARIO_BLOCO' && codigo !== 'COMENTARIO_LINHA')
  {
    let tk = this.token.replace(/(\r\n|\n|\r)/gm,"");
    this.tokens.push({
      linha: this.linha,
      codigo: codigo,
      token: tk
    });
  }
  this.token = '';
}

let analisadorLexico = {
  linha: 1,
  tokens: [],
  erros: [],
  init,
  iniciar,
  analisar,
  adicionarToken,
  adicionarErro,
}
/* harmony default export */ __webpack_exports__["a"] = (analisadorLexico);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabelaParsing__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__palavrasReservadas__ = __webpack_require__(6);


const FINAL = 44;
const VAZIO = 18;
const DIVISAO = 45;

function init({tokens, debug}) {
  this.tokens = tokens;
  this.debug = debug;
}

function iniciar() {
  this.posicao = 0;
  this.antigoTopo = -1;
  this.stack = 0;
  this.esperava = [];
  this.encontrou = false;
  this.pilha.push(44);
  this.pilha.push(46);
  this.analisar()
}

function analisar() {
  if (this.stack > 3)
  {
    //Se o topo começar a se repetir muito, retorna um erro de estouro de pilha;
    throw 'Stack Overflow';
    return;
  }
  this.debug && console.log('[', this.stack ,']', '------------------------- analisar ------');
  this.esperava = [];
  var topo = this.pilha[this.pilha.length-1];
  if (topo == this.antigoTopo) {
    this.stack++;
  }
  this.antigoTopo = topo;
  this.debug && console.log('t1-Topo: ', topo);

  if (topo > DIVISAO)
  {
    this.debug && console.log('O que poderia ser: ')
    for (var i = 0; i < 100; i++) {
      var simbolo = __WEBPACK_IMPORTED_MODULE_0__tabelaParsing__["a" /* tabelaParsing */][topo][i];
      if (simbolo)
      {
        this.esperava.push({
          simbolo: simbolo,
          palavra: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__palavrasReservadas__["a" /* palavraPorCodigo */])(i)
        });
        this.debug && console.log(i, '/', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__palavrasReservadas__["a" /* palavraPorCodigo */])(i));
      }
    }
  }
  else
  {
    this.esperava.push({
      simbolo: topo,
      palavra: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__palavrasReservadas__["a" /* palavraPorCodigo */])(topo)
    });
    this.debug && console.log("poderia ser: ", topo, '-', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__palavrasReservadas__["a" /* palavraPorCodigo */])(topo));
  }

  if (topo == FINAL && this.pilha.length <= 1 ) {
    this.debug && console.log('SUCCESS');
    return true;
  }

  var token = this.tokens[this.posicao];
  this.debug && console.log('t1-Token: ', token);
  if (this.tokens[this.posicao-1] !== this.encontrou)
  {
    this.encontrou = token;
  }

  var valor = __WEBPACK_IMPORTED_MODULE_0__tabelaParsing__["a" /* tabelaParsing */][topo][token.codigo];
  this.debug && console.log('t1-Valor: ', valor);

  if (topo == VAZIO)
  {
    this.pilha.pop();
  }
  if (topo == token.codigo)
  {
    this.pilha.pop();
    this.debug && console.warn('t1-Pilha: ', this.pilha);
    this.posicao++;
    this.analisar();
    return;
  }

  // if (!valor)
  // {
  //   this.debug && console.warn('NA-Pilha: ', this.pilha);
  //   this.analisar();
  //   return;
  // }

  if (topo > DIVISAO) {
    this.debug && console.warn('t1', topo);
    var corresps = __WEBPACK_IMPORTED_MODULE_0__tabelaParsing__["b" /* tabelaCorrespondencia */][valor];
    if (corresps)
    {
      this.pilha.pop();
      for (var i = corresps.length - 1; i >= 0; i--) {
        this.debug && console.log('Adiciona na pilha: ', corresps[i], '-', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__palavrasReservadas__["a" /* palavraPorCodigo */])(corresps[i]));
        this.pilha.push(corresps[i]);
      }
    }
  }
  this.debug && console.warn('t2-Pilha: ', this.pilha);
  this.analisar();
}

let analisadorSintatico = {
  init,
  analisar,
  iniciar,
  pilha: []
}

/* harmony default export */ __webpack_exports__["a"] = (analisadorSintatico);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehAspa(valor) {
  return valor === '"';
}
/* harmony default export */ __webpack_exports__["a"] = (ehAspa);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehComentario(valor) {
  return valor === '-' || valor === '*';
}
/* unused harmony default export */ var _unused_webpack_default_export = (ehComentario);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var compostos = ["<", ">", ":", "-", "="];
function ehComposto(valor) {
  for (var i = 0; i < compostos.length; i++) {
    if (valor == compostos[i])
    {
      return true;
    }
  }
  return false;
}
/* harmony default export */ __webpack_exports__["a"] = (ehComposto);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehEOF(valor) {
  return typeof valor === 'undefined';
}
/* harmony default export */ __webpack_exports__["a"] = (ehEOF);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehEspaco(valor) {
  return valor === ' ';
}
/* unused harmony default export */ var _unused_webpack_default_export = (ehEspaco);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_"
];
function ehLetra(valor) {
  for (var i = 0; i < alfabeto.length; i++) {
    if (valor && valor.toLowerCase() == alfabeto[i])
      return true;
  }
  return false;
}
/* harmony default export */ __webpack_exports__["a"] = (ehLetra);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function ehNumero(valor) {
  for (var i = 0; i < numeros.length; i++) {
    if (valor == numeros[i])
      return true;
  }
  return false;
}
/* harmony default export */ __webpack_exports__["a"] = (ehNumero);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__ = __webpack_require__(6);

function ehPalavraReservada(valor) {
  for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__["b" /* palavrasReservadas */].length; i++) {
    if (valor.trim().toLowerCase() == __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__["b" /* palavrasReservadas */][i])
      return i;
  }
  return 0;
}
/* harmony default export */ __webpack_exports__["a"] = (ehPalavraReservada);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehQuebraLinha(valor) {
  return valor === '\n';
}
/* harmony default export */ __webpack_exports__["a"] = (ehQuebraLinha);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehSeparadorDecimal(valor) {
  return valor === '.';
}

/* harmony default export */ __webpack_exports__["a"] = (ehSeparadorDecimal);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var sinais = [",", ";", ":", "(", ")", "{", "}", "[", "]", "+",
  "-", "*", "/", "=", "<", ">", "!", "&", "|"];
function ehSinal(valor) {
  for (var i = 0; i < sinais.length; i++) {
    if (valor == sinais[i])
      return true;
  }
  return false;
}

/* harmony default export */ __webpack_exports__["a"] = (ehSinal);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ehAspa__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ehComentario__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ehComposto__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ehEOF__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ehEspaco__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ehLetra__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ehNumero__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ehPalavraReservada__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ehQuebraLinha__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ehSeparadorDecimal__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ehSinal__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__ehAspa__["a"]; });
/* unused harmony reexport ehComentario */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__ehComposto__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__ehEOF__["a"]; });
/* unused harmony reexport ehEspaco */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__ehLetra__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__ehNumero__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_7__ehPalavraReservada__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_8__ehQuebraLinha__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_9__ehSeparadorDecimal__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_10__ehSinal__["a"]; });














/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_table_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_table_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_table_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analisadorLexico__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__analisadorSintatico__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert_dist_sweetalert_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_sweetalert_dist_sweetalert_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_sweetalert_dist_sweetalert_css__);






// C:\projetos\mlo\node_modules\sweetalert\themes\google

var arquivo = document.getElementById('arquivo');
var codigoTextArea = document.getElementById('codigo');
var compilarButton = document.getElementById('compilar');
var resultadoTable = document.getElementById('resultado');
var errosTable = document.getElementById('erros');

arquivo.addEventListener('change', function(e) {
  var file = arquivo.files[0];
  var textType = /text.*/;

  if (file.type.match(textType)) {
    var reader = new FileReader();
    reader.onload = function(e) {
      codigoTextArea.innerText = reader.result;
    }
    reader.readAsText(file);
  } else {
    alert("Seu browser não suporta arquivos locais");
  }
});

compilarButton.addEventListener('click', function(e) {
  var fita = codigoTextArea.value.trim().split('');
  __WEBPACK_IMPORTED_MODULE_2__analisadorLexico__["a" /* analisadorLexico */].init();
  __WEBPACK_IMPORTED_MODULE_2__analisadorLexico__["a" /* analisadorLexico */].iniciar(fita);
  var tokens = __WEBPACK_IMPORTED_MODULE_2__analisadorLexico__["a" /* analisadorLexico */].tokens;
  __WEBPACK_IMPORTED_MODULE_3__analisadorSintatico__["a" /* analisadorSintatico */].init({tokens, debug: true});

  try
  {
    __WEBPACK_IMPORTED_MODULE_3__analisadorSintatico__["a" /* analisadorSintatico */].iniciar();
    console.warn('OKEEEEEEEEEEE', __WEBPACK_IMPORTED_MODULE_4_sweetalert___default.a);
    __WEBPACK_IMPORTED_MODULE_4_sweetalert___default()({
      title: "Sucesso",
      text: "Compilado com sucesso!",
      type: "success",
    });
  }
  catch(err) {
    console.error(err, 'esperava: ', __WEBPACK_IMPORTED_MODULE_3__analisadorSintatico__["a" /* analisadorSintatico */].esperava);
    let palavras = __WEBPACK_IMPORTED_MODULE_3__analisadorSintatico__["a" /* analisadorSintatico */].esperava.map(item => item.palavra);
    let e = __WEBPACK_IMPORTED_MODULE_3__analisadorSintatico__["a" /* analisadorSintatico */].encontrou;
    __WEBPACK_IMPORTED_MODULE_4_sweetalert___default()({
      title: "Erro!",
      text: '\nErro, token inválido: \n'+e.token
            +', linha: '+e.linha
            +'\n\nEsperava:\n'+ palavras.join('\n'),
      type: "error"
    });
  }
  resultadoTable.innerHTML = "";
  for (var i = 0; i < tokens.length; i++) {
    var tk = tokens[i];
    var row = resultadoTable.insertRow(i);

    var cell = row.insertCell(0);
    cell.innerHTML = tk.codigo;
    cell.setAttribute("data-label", "Código");

    cell = row.insertCell(1);
    cell.innerHTML = tk.token;
    cell.setAttribute("data-label", "Token");

    cell = row.insertCell(2);
    cell.innerHTML = tk.linha;
    cell.setAttribute("data-label", "Linha");

  }

  var erros = __WEBPACK_IMPORTED_MODULE_2__analisadorLexico__["a" /* analisadorLexico */].erros;
  errosTable.innerHTML = "";
  for (var i = 0; i < erros.length; i++) {
    var tk = erros[i];
    var row = errosTable.insertRow(i);

    var cell = row.insertCell(0);
    cell.innerHTML = tk.erro;
    cell.setAttribute("data-label", "erro");

    cell = row.insertCell(1);
    cell.innerHTML = tk.linha;
    cell.setAttribute("data-label", "Linha");
  }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__ = __webpack_require__(7);


function palavraPorCodigo(codigo) {
    return __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__["a" /* default */][codigo];
}
/* harmony default export */ __webpack_exports__["a"] = (palavraPorCodigo);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabelaParsing__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabelaCorrespondencia__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tabelaParsing__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__tabelaCorrespondencia__["a"]; });




/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const tabelaCorrespondencia = [];

tabelaCorrespondencia[1] =[25,  43,  17,  42,  36,  47,  21]
tabelaCorrespondencia[2] = [48,  49,  50]
tabelaCorrespondencia[3] = [3,  51,  38,  52,  36,  53]
tabelaCorrespondencia[4] = [18]
tabelaCorrespondencia[5] = [17,  54]
tabelaCorrespondencia[6] = [40,  17,  54]
tabelaCorrespondencia[7] = [18]
tabelaCorrespondencia[8] =  [51,  38,  52,  36,  53 ]
tabelaCorrespondencia[9] = [18]
tabelaCorrespondencia[10] = [15]
tabelaCorrespondencia[11] = [5]
tabelaCorrespondencia[12] = [19]
tabelaCorrespondencia[13] = [8,  17,  55,  35,  47,  34,  49 ]
tabelaCorrespondencia[14] = [18]
tabelaCorrespondencia[15] = [43,  17,  38,  52,  56,  42 ]
tabelaCorrespondencia[16] = [18]
tabelaCorrespondencia[17] = [36,  17,  38,  52,  56]
tabelaCorrespondencia[18] = [18]
tabelaCorrespondencia[19] = [25,  57,  58,  20]
tabelaCorrespondencia[20] = [16,  59,  4,  50,  60 ]
tabelaCorrespondencia[21] = [2,  59,  22,  50 ]
tabelaCorrespondencia[22] = [22,  50,  2,  59 ]
tabelaCorrespondencia[23] = [7,  43,  17,  42 ]
tabelaCorrespondencia[24] = [24,  17,  61   ]
tabelaCorrespondencia[25] = [1,  43,  62,  63,  42 ]
tabelaCorrespondencia[26] = [23,  59,  10,  64,  20 ]
tabelaCorrespondencia[27] = [17,  37,  59,  36 ]
tabelaCorrespondencia[28] = [18]
tabelaCorrespondencia[29] = [36, 57, 58 ]
tabelaCorrespondencia[30] = [18]
tabelaCorrespondencia[31] = [43,59,65,42]
tabelaCorrespondencia[32] = [18]
tabelaCorrespondencia[33] = [40,  59,  65 ]
tabelaCorrespondencia[34] = [18]
tabelaCorrespondencia[35] = [6,  57]
tabelaCorrespondencia[36] = [18]
tabelaCorrespondencia[37] = [17]
tabelaCorrespondencia[38] = [40,  66,  67]
tabelaCorrespondencia[39] = [18]
tabelaCorrespondencia[40] = [14]
tabelaCorrespondencia[41] = [59]
tabelaCorrespondencia[42] = [40,  62,  63 ]
tabelaCorrespondencia[43] = [18]
tabelaCorrespondencia[44] = [68,  38,  50 , 69]
tabelaCorrespondencia[45] = [17]
tabelaCorrespondencia[46] = [12]
tabelaCorrespondencia[47] = [13]
tabelaCorrespondencia[48] = [36,  64]
tabelaCorrespondencia[49] = [18]
tabelaCorrespondencia[50] = [70,  71]
tabelaCorrespondencia[51] = [33,  72,  73]
tabelaCorrespondencia[52] = [45,  72,  73]
tabelaCorrespondencia[53] = [72,  73]
tabelaCorrespondencia[54] = [29,  70]
tabelaCorrespondencia[55] = [32,  70]
tabelaCorrespondencia[56] = [28,  70]
tabelaCorrespondencia[57] = [27,  70]
tabelaCorrespondencia[58] = [31,  70]
tabelaCorrespondencia[59] = [30,  70]
tabelaCorrespondencia[60] = [18]
tabelaCorrespondencia[61] = [74,  75]
tabelaCorrespondencia[62] = [33,  72,  73 ]
tabelaCorrespondencia[63] = [45,  72,  73 ]
tabelaCorrespondencia[64] = [9,  72,  73]
tabelaCorrespondencia[65] = [18]
tabelaCorrespondencia[66] = [41,  74,  75]
tabelaCorrespondencia[67] = [39,  74,  75]
tabelaCorrespondencia[68] = [26,  74,  75]
tabelaCorrespondencia[69] = [18]
tabelaCorrespondencia[70] = [12]
tabelaCorrespondencia[71] = [5]
tabelaCorrespondencia[72] = [13]
tabelaCorrespondencia[73] = [43,  59,  42 ]
tabelaCorrespondencia[74] = [11,  74 ]
tabelaCorrespondencia[75] = [66]

/* harmony default export */ __webpack_exports__["a"] = (tabelaCorrespondencia);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//Tabela de parsing
var tabParsing = [];

for(var x = 0; x < 100; x++){
  tabParsing[x] = [];
  for(var y = 0; y < 100; y++){
    tabParsing[x][y] = false;
  }
}

tabParsing[46][25] = 1;
tabParsing[47][3] = 2;
tabParsing[47][8] = 2;
tabParsing[47][25] = 2;
tabParsing[48][3] = 3;
tabParsing[48][8] = 4;
tabParsing[48][25] = 4;
tabParsing[49][8] = 13;
tabParsing[49][25] = 14;
tabParsing[50][25] = 19;
tabParsing[51][17] = 5;
tabParsing[52][5] = 11;
tabParsing[52][15] = 10;
tabParsing[52][19] = 12;
tabParsing[53][8] = 9;
tabParsing[53][17] = 8;
tabParsing[53][25] = 9;
tabParsing[53][34] = 9;
tabParsing[54][38] = 7;
tabParsing[54][40] = 6;
tabParsing[55][35] = 16;
tabParsing[55][43] = 15;
tabParsing[56][36] = 17;
tabParsing[56][42] = 18;
tabParsing[57][1] = 25;
tabParsing[57][2] = 21;
tabParsing[57][6] = 28;
tabParsing[57][7] = 23;
tabParsing[57][16] = 20;
tabParsing[57][17] = 27;
tabParsing[57][20] = 28;
tabParsing[57][21] = 28;
tabParsing[57][22] = 22;
tabParsing[57][23] = 26;
tabParsing[57][24] = 24;
tabParsing[57][34] = 28;
tabParsing[57][36] = 28;
tabParsing[58][20] = 30;
tabParsing[58][36] = 29;
tabParsing[59][5] = 50;
tabParsing[59][11] = 50;
tabParsing[59][12] = 50;
tabParsing[59][13] = 50;
tabParsing[59][17] = 50;
tabParsing[59][33] = 50;
tabParsing[59][43] = 50;
tabParsing[59][45] = 50;
tabParsing[60][2] = 36;
tabParsing[60][6] = 36;
tabParsing[60][20] = 36;
tabParsing[60][21] = 36;
tabParsing[60][34] = 36;
tabParsing[60][36] = 36;
tabParsing[61][2] = 32;
tabParsing[61][6] = 32;
tabParsing[61][20] = 32;
tabParsing[61][21] = 32;
tabParsing[61][34] = 32;
tabParsing[61][36] = 32;
tabParsing[61][43] = 31;
tabParsing[62][5] = 41;
tabParsing[62][11] = 41;
tabParsing[62][12] = 41;
tabParsing[62][13] = 41;
tabParsing[62][14] = 40;
tabParsing[62][17] = 41;
tabParsing[62][33] = 41;
tabParsing[62][43] = 41;
tabParsing[62][45] = 41;
tabParsing[63][40] = 42;
tabParsing[63][42] = 43;
tabParsing[64][12] = 44;
tabParsing[64][13] = 44;
tabParsing[64][17] = 44;
tabParsing[65][40] = 33;
tabParsing[65][42] = 34;
tabParsing[66][17] = 37;
tabParsing[67][40] = 38;
tabParsing[68][12] = 46;
tabParsing[68][13] = 47;
tabParsing[68][17] = 45;
tabParsing[69][20] = 49;
tabParsing[69][36] = 48;
tabParsing[70][5] = 53;
tabParsing[70][11] = 53;
tabParsing[70][12] = 53;
tabParsing[70][13] = 53;
tabParsing[70][17] = 53;
tabParsing[70][33] = 51;
tabParsing[70][43] = 53;
tabParsing[70][45] = 52;
tabParsing[71][2] = 60;
tabParsing[71][4] = 60;
tabParsing[71][6] = 60;
tabParsing[71][10] = 60;
tabParsing[71][20] = 60;
tabParsing[71][21] = 60;
tabParsing[71][22] = 60;
tabParsing[71][27] = 57;
tabParsing[71][28] = 56;
tabParsing[71][29] = 54;
tabParsing[71][30] = 59;
tabParsing[71][31] = 58;
tabParsing[71][32] = 55;
tabParsing[71][34] = 60;
tabParsing[71][36] = 60;
tabParsing[71][40] = 60;
tabParsing[71][42] = 60;
tabParsing[72][5] = 61;
tabParsing[72][11] = 61;
tabParsing[72][12] = 61;
tabParsing[72][13] = 61;
tabParsing[72][17] = 61;
tabParsing[72][43] = 61;
tabParsing[73][2] = 65;
tabParsing[73][4] = 65;
tabParsing[73][6] = 65;
tabParsing[73][9] = 64;
tabParsing[73][10] = 65;
tabParsing[73][20] = 65;
tabParsing[73][21] = 65;
tabParsing[73][22] = 65;
tabParsing[73][27] = 65;
tabParsing[73][28] = 65;
tabParsing[73][29] = 65;
tabParsing[73][30] = 65;
tabParsing[73][31] = 65;
tabParsing[73][32] = 65;
tabParsing[73][33] = 62;
tabParsing[73][34] = 65;
tabParsing[73][36] = 65;
tabParsing[73][40] = 65;
tabParsing[73][42] = 65;
tabParsing[73][45] = 63;
tabParsing[74][5] = 71;
tabParsing[74][11] = 74;
tabParsing[74][12] = 70;
tabParsing[74][13] = 72;
tabParsing[74][17] = 75;
tabParsing[74][43] = 73;
tabParsing[75][2] = 69;
tabParsing[75][4] = 69;
tabParsing[75][6] = 69;
tabParsing[75][9] = 69;
tabParsing[75][10] = 69;
tabParsing[75][20] = 69;
tabParsing[75][21] = 69;
tabParsing[75][22] = 69;
tabParsing[75][26] = 68;
tabParsing[75][27] = 69;
tabParsing[75][28] = 69;
tabParsing[75][29] = 69;
tabParsing[75][30] = 69;
tabParsing[75][31] = 69;
tabParsing[75][32] = 69;
tabParsing[75][33] = 69;
tabParsing[75][34] = 69;
tabParsing[75][36] = 69;
tabParsing[75][39] = 67;
tabParsing[75][40] = 69;
tabParsing[75][41] = 66;
tabParsing[75][42] = 69;
tabParsing[75][45] = 69;

/* harmony default export */ __webpack_exports__["a"] = (tabParsing);

/***/ })
/******/ ]);