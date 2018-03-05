webpackJsonp([2],{

/***/ "../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/styles.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--8-1!../node_modules/postcss-loader/index.js??postcss!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--8-1!../node_modules/postcss-loader/index.js??postcss!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/index.js?{\"ident\":\"postcss\"}!../../../../../src/styles.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700,900);", ""]);

// module
exports.push([module.i, "\r\n@font-face {\r\n  font-family: 'Material Icons';\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: url(https://example.com/MaterialIcons-Regular.eot); /* For IE6-8 */\r\n  src: local('Material Icons'),\r\n  local('MaterialIcons-Regular'),\r\n  url(https://example.com/MaterialIcons-Regular.woff2) format('woff2'),\r\n  url(https://example.com/MaterialIcons-Regular.woff) format('woff'),\r\n  url(https://example.com/MaterialIcons-Regular.ttf) format('truetype');\r\n}\r\n\r\n.material-icons {\r\n  font-family: 'Material Icons';\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-size: 24px; /* Preferred icon size */\r\n  display: inline-block;\r\n  line-height: 1;\r\n  text-transform: none;\r\n  letter-spacing: normal;\r\n  word-wrap: normal;\r\n  white-space: nowrap;\r\n  direction: ltr;\r\n\r\n  /* Support for all WebKit browsers. */\r\n  -webkit-font-smoothing: antialiased;\r\n  /* Support for Safari and Chrome. */\r\n  text-rendering: optimizeLegibility;\r\n\r\n  /* Support for Firefox. */\r\n  -moz-osx-font-smoothing: grayscale;\r\n\r\n  /* Support for IE. */\r\n  -webkit-font-feature-settings: 'liga';\r\n          font-feature-settings: 'liga';\r\n}\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody {\r\n  font-family: 'Roboto';\r\n}\r\n\r\na {\r\n  color: #f4f4f4;\r\n  text-decoration: none;\r\n}\r\n\r\n.textFields {\r\n  width: 100%;\r\n  position: absolute;\r\n  padding-top: 8px;\r\n  padding-bottom: 7px;\r\n  border: 0;\r\n  outline: none;\r\n  font-family: 'Roboto';\r\n  font-size: 16px;\r\n  /*color: rgba(0,0,0, 0.87);*/\r\n  color: #424242;\r\n  border-bottom: 1px solid rgba(0, 0, 0, .42);\r\n  background-color: transparent;\r\n  transition: all 280ms cubic-bezier(0.4, 0.0, 0.2, 1);\r\n  /*z-index: 2;*/\r\n}\r\n\r\n.invalido {\r\n  background-color: #F44336;\r\n  color: #F44336;\r\n}\r\n\r\n.textFields ~ .labelText {\r\n  color: rgba(0, 0, 0, .54);\r\n  font-size: 16px;\r\n  font-family: 'Roboto';\r\n  position: absolute;\r\n  top: 8px;\r\n  transition: all 280ms cubic-bezier(0.4, 0.0, 0.2, 1);\r\n  /*z-index: 1;*/\r\n}\r\n\r\n.helperText {\r\n  font-family: 'Roboto';\r\n  font-size: 12px;\r\n  color: rgba(0, 0, 0, .54);\r\n  padding-top: 8px;\r\n  position: absolute;\r\n  top: 30px;\r\n  transition: all 280ms cubic-bezier(0.4, 0.0, 0.2, 1);\r\n  /*color: #F44336;*/\r\n}\r\n\r\n.border {\r\n  position: absolute;\r\n  /*z-index: 2;*/\r\n  height: 2px;\r\n  width: 100%;\r\n  top: 33px;\r\n}\r\n\r\n.textFields:hover ~ .border {\r\n  background-color: rgba(0, 0, 0, .42);\r\n}\r\n\r\n.labelText {\r\n  cursor: text;\r\n}\r\n\r\n.textFields:focus ~ .border {\r\n  background-color: #546E7A;\r\n}\r\n\r\n.textFields:focus ~ .labelText {\r\n  font-size: 12px;\r\n  top: -8px;\r\n  color: #546E7A;\r\n}\r\n\r\n.textFieldsPreenchido ~ .labelText { /*color: #304ffe;*/\r\n  font-size: 12px;\r\n  top: -8px;\r\n}\r\n\r\n.defaultButton {\r\n  height: 36px;\r\n  padding-left: 16px;\r\n  padding-right: 16px;\r\n  border-radius: 2px;\r\n  font-family: 'Roboto';\r\n  font-size: 16px;\r\n  background-color: #2196F3;\r\n  border: 0;\r\n  color: #FFF;\r\n  cursor: pointer;\r\n  transition: all 375ms cubic-bezier(0.4, 0.0, 0.2, 1);\r\n}\r\n\r\n.defaultButton:hover {\r\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14),\r\n  0 3px 4px rgba(0, 0, 0, 0.12),\r\n  4px 4px 5px rgba(0, 0, 0, 0.20)\r\n}\r\n\r\n.denseButton {\r\n  height: 32px;\r\n  padding-left: 16px;\r\n  padding-right: 16px;\r\n  border-radius: 2px;\r\n  font-family: 'Roboto';\r\n  font-size: 13px;\r\n  background-color: #006064;\r\n  border: 0;\r\n  color: #FFF;\r\n  cursor: pointer;\r\n  transition: all 375ms cubic-bezier(0.4, 0.0, 0.2, 1);\r\n  outline: none;\r\n}\r\n\r\n.denseButton:hover {\r\n  background-color: #00838F;\r\n}\r\n\r\n.denseButton:active {\r\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.14),\r\n              0 3px 4px rgba(0, 0, 0, 0.12),\r\n              4px 4px 5px rgba(0, 0, 0, 0.20)\r\n}\r\n\r\n.buttonTransparent, .buttonTransparent:hover, .buttonTransparent:active {\r\n  background-color: transparent;\r\n  color: #006064;\r\n  font-weight: 500;\r\n}\r\n\r\n.disabledButton {\r\n  background-color: #E0E0E0;\r\n  color: rgba(0, 0, 0, .26);\r\n  outline: none;\r\n}\r\n\r\n.disabledButton:hover {\r\n  background-color: #E0E0E0;\r\n  color: rgba(0, 0, 0, .46)\r\n}\r\n\r\n.textFieldsMult {\r\n  width: 100%;\r\n  background-color: transparent;\r\n  outline: none;\r\n  position: absolute;\r\n  padding-top: 8px;\r\n  padding-bottom: 7px;\r\n  border-radius: 3px;\r\n  border: none;\r\n  border-bottom: 1px solid rgba(0, 0, 0, .42);\r\n  font-family: 'Roboto';\r\n  font-size: 16px;\r\n  box-sizing: border-box;\r\n  color: rgba(0, 0, 0, 0.87);\r\n  height: 36px;\r\n  max-height: 100px;\r\n  max-width: 100%;\r\n  min-width: 100%;\r\n  /*overflow-y: hidden;*/\r\n}\r\n\r\n.textFieldsMult ~ .labelTextMult {\r\n  color: rgba(0, 0, 0, .54);\r\n  font-size: 16px;\r\n  font-family: 'Roboto';\r\n  position: absolute;\r\n  top: 8px;\r\n  left: 8px;\r\n  transition: all 280ms cubic-bezier(0.4, 0.0, 0.2, 1);\r\n}\r\n\r\n.textFieldsMult:hover {\r\n  border-bottom: 2px solid rgba(0, 0, 0, .42);\r\n}\r\n\r\n.textFieldsMult:focus {\r\n  border-bottom: 2px solid #546E7A;\r\n\r\n}\r\n\r\n.textFieldsMult:focus ~ .labelTextMult {\r\n  font-size: 12px;\r\n  top: -16px;\r\n  left: 0;\r\n  color: #546E7A;\r\n  font-family: 'Roboto'\r\n}\r\n\r\n.textFieldsMultPreenchido ~ .labelTextMult {\r\n  font-size: 12px;\r\n  top: -16px;\r\n  left: 0;\r\n}\r\n\r\n.select {\r\n  border: none;\r\n  background-color: transparent;\r\n  outline: none;\r\n}\r\n\r\n.float-left {\r\n  float: left;\r\n}\r\n\r\n.float-right {\r\n  float: right;\r\n}\r\n\r\n.floatingButton {\r\n  width: 56px;\r\n  height: 56px;\r\n  border-radius: 50%;\r\n  background-color: #006064;\r\n  position: fixed;\r\n  bottom: 30px;\r\n  right: 30px;\r\n  z-index: 12;\r\n  outline: none;\r\n  border: none;\r\n  box-shadow: 0 9px 12px rgba(0, 0, 0, .14),\r\n  0 3px 5px rgba(0, 0, 0, .12),\r\n  0 5px 6px rgba(0, 0, 0, .20);\r\n  cursor: pointer;\r\n  display: -webkit-box;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  -ms-flex-wrap: wrap;\r\n      flex-wrap: wrap;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n}\r\n\r\n.floatingButton i {\r\n  color: #FAFAFA;\r\n}\r\n\r\n.overflowAuto {\r\n  overflow: auto;\r\n}\r\n\r\n.overflowHidden {\r\n  overflow: hidden;\r\n}\r\n\r\n.displayNone {\r\n  display: none;\r\n}\r\n\r\n.displayBlock {\r\n  display: block;\r\n}\r\n\r\n.relative {\r\n  position: relative;\r\n}\r\n\r\n.fullwidth {\r\n  width: 100%;\r\n}\r\n\r\n.pointer {\r\n  cursor: pointer;\r\n}\r\n\r\n.center {\r\n  text-align: center;\r\n}\r\n\r\n\r\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../../style-loader/addStyles.js":
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

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/styles.css");


/***/ })

},[3]);
//# sourceMappingURL=styles.bundle.js.map