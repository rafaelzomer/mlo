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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__analisadorLexico__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__analisadorLexico__["a"]; });



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "body{\r\n  font-family: 'Roboto', sans-serif;\r\n  line-height:1;\r\n  font-size: 1em;\r\n  color: #363636;\r\n  padding: 10px;\r\n  margin: 0;\r\n}\r\ntable{border-collapse:collapse;border-spacing:0}\r\nhr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}\r\n.botao {\r\n  background-color: #0366d6;\r\n  color: #fff;\r\n  cursor: pointer;\r\n  padding: .625em;\r\n  border: none;\r\n  border-radius: 3px; \r\n}\r\n.codigo {\r\n  width: 100%;\r\n  font-size: 14px;\r\n  border: 1px solid #ccc;\r\n  margin: 10px 0;\r\n}\r\n.titulo {\r\n  margin: 10px 0;\r\n}\r\n\r\n@media screen and (min-width: 600px) {\r\n  .tela {\r\n    width: 500px;\r\n    margin: auto;\r\n  }\r\n}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "table {\r\n  border: 1px solid #ccc;\r\n  border-collapse: collapse;\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  table-layout: fixed;\r\n}\r\ntable tr {\r\n  border: 1px solid #ccc;\r\n  padding: .35em;\r\n}\r\ntable th,\r\ntable td {\r\n  padding: .625em;\r\n  text-align: center;\r\n}\r\ntable th {\r\n  font-size: .85em;\r\n  letter-spacing: .1em;\r\n}\r\n@media screen and (max-width: 600px) {\r\n  table {\r\n    border: 0;\r\n  }\r\n  table thead {\r\n    border: none;\r\n    clip: rect(0 0 0 0);\r\n    height: 1px;\r\n    margin: -1px;\r\n    overflow: hidden;\r\n    padding: 0;\r\n    position: absolute;\r\n    width: 1px;\r\n  }\r\n  table tr {\r\n    border-bottom: 3px solid #ccc;\r\n    display: block;\r\n    margin-bottom: .625em;\r\n  }\r\n  table td {\r\n    border-bottom: 1px solid #ccc;\r\n    display: block;\r\n    font-size: .8em;\r\n    text-align: right;\r\n  }\r\n  table td:before {\r\n    /*\r\n    * aria-label has no advantage, it won't be read inside a table\r\n    content: attr(aria-label);\r\n    */\r\n    content: attr(data-label);\r\n    float: left;\r\n    font-weight: bold;\r\n  }\r\n  table td:last-child {\r\n    border-bottom: 0;\r\n  }\r\n}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__comparadores__ = __webpack_require__(19);


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
        adicionarErro('O tamanho do literal (' + tam + ') ultrapassa o tamanho máximo específicado: ' + SINTAXE_LITERAL_MAX);
      }
      break;
    case 'INTEIRO':
      codigo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["i" /* ehPalavraReservada */])('ninteiro');
      var i = parseInt(this.token);
      if (i < SINTAXE_INTEIRO_MIN) {
        adicionarErro('O tamanho do inteiro (' + i + ') ultrapassa o tamanho máximo negativo específicado: ' + SINTAXE_INTEIRO_MIN);
      }
      if (i > SINTAXE_INTEIRO_MAX) {
        adicionarErro('O tamanho do inteiro (' + i + ') ultrapassa o tamanho máximo positivo específicado: ' + SINTAXE_INTEIRO_MAX);
      }
      break;
    case 'FLOAT':
      codigo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__comparadores__["i" /* ehPalavraReservada */])('nfloat');
      var i = parseFloat(this.token);
      if (i < SINTAXE_FLOAT_MIN) {
        adicionarErro('O tamanho do float (' + i + ') ultrapassa o tamanho máximo negativo específicado: ' + SINTAXE_FLOAT_MIN);
      }
      if (i > SINTAXE_FLOAT_MAX) {
        adicionarErro('O tamanho do float (' + i + ') ultrapassa o tamanho máximo positivo específicado: ' + SINTAXE_FLOAT_MAX);
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
  this.tokens.push({
    linha: this.linha,
    codigo: codigo,
    token: this.token
  });
  console.warn('hee', this.tokens[this.tokens.length-1] );
  this.token = '';
}

let analisadorLexico = {
  linha: 1,
  tokens: [],
  erros: [],
  init,
  analisar,
  adicionarToken,
  adicionarErro,
}
/* harmony default export */ __webpack_exports__["a"] = (analisadorLexico);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehAspa(valor) {
  return valor === '"';
}
/* harmony default export */ __webpack_exports__["a"] = (ehAspa);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehComentario(valor) {
  return valor === '-' || valor === '*';
}
/* unused harmony default export */ var _unused_webpack_default_export = (ehComentario);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var compostos = ["<", ">", ":", "-"];
function ehComposto(valor) {
  for (var i = 0; i < compostos.length; i++) {
    if (valor == compostos[i])
      return true;
  }
  return false;
}
/* harmony default export */ __webpack_exports__["a"] = (ehComposto);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehEOF(valor) {
  return typeof valor === 'undefined';
}
/* harmony default export */ __webpack_exports__["a"] = (ehEOF);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehEspaco(valor) {
  return valor === ' ';
}
/* unused harmony default export */ var _unused_webpack_default_export = (ehEspaco);

/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__ = __webpack_require__(21);

function ehPalavraReservada(valor) {
  for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__["a" /* default */].length; i++) {
    if (valor.trim().toLowerCase() == __WEBPACK_IMPORTED_MODULE_0__palavrasReservadas__["a" /* default */][i])
      return i;
  }
  return 0;
}
/* harmony default export */ __webpack_exports__["a"] = (ehPalavraReservada);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehQuebraLinha(valor) {
  return valor === '\n';
}
/* harmony default export */ __webpack_exports__["a"] = (ehQuebraLinha);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function ehSeparadorDecimal(valor) {
  return valor === '.';
}

/* harmony default export */ __webpack_exports__["a"] = (ehSeparadorDecimal);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var sinais = [",", ";", ":", "(", ")", "{", "}", "[", "]", "+",
  "-", "*", "/", "=", "<", ">", "!", "&", "|"
];
function ehSinal(valor) {
  for (var i = 0; i < sinais.length; i++) {
    if (valor == sinais[i])
      return true;
  }
  return false;
}

/* harmony default export */ __webpack_exports__["a"] = (ehSinal);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ehAspa__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ehComentario__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ehComposto__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ehEOF__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ehEspaco__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ehLetra__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ehNumero__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ehPalavraReservada__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ehQuebraLinha__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ehSeparadorDecimal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ehSinal__ = __webpack_require__(18);
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_table_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_table_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_table_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analisadorLexico__ = __webpack_require__(4);




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
  __WEBPACK_IMPORTED_MODULE_2__analisadorLexico__["a" /* analisadorLexico */].analisar(false, fita, 0);
  var tokens = __WEBPACK_IMPORTED_MODULE_2__analisadorLexico__["a" /* analisadorLexico */].tokens;
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
/* 21 */
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

/***/ })
/******/ ]);