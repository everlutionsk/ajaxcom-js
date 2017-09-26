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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_1 = __webpack_require__(5);
var changeUrl_1 = __webpack_require__(6);
var container_1 = __webpack_require__(7);
function fetchOperations(options) {
    return fetch(options.url, {
        headers: new Headers({ 'X-AjaxCom': 'true', 'Accept': 'application/json' }),
        method: options.method,
        body: options.body,
    });
}
exports.fetchOperations = fetchOperations;
function handleOperations(response) {
    response
        .json()
        .then(function (data) { return (data.forEach(function (operation) { return handleOperation(operation); })); });
}
exports.handleOperations = handleOperations;
function handleOperation(operation) {
    switch (operation.operation) {
        case 'container':
            container_1.handleContainer(operation.options);
            break;
        case 'changeurl':
            changeUrl_1.handleChangeUrl(operation.options);
            break;
        case 'callback':
            callback_1.handleCallback(operation.options);
            break;
        default:
            throw "Operation " + operation.operation + " is not supported";
    }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = __webpack_require__(2);
var pushHistory;
var lastId;
var popStateEvent = false;
function popStateHandler(event) {
    if (typeof event.state !== "object")
        return;
    if (shouldReload(event))
        return window.location.reload();
    setPopStateEvent();
}
exports.popStateHandler = popStateHandler;
function pushToHistory(options) {
    lastId = getId(options.url);
    pushHistory[lastId] = {
        options: options,
        scrollTo: document.body.scrollTop,
        ajaxcomOptions: options_1.getOptions()
    };
    history.pushState({ ajaxcomId: lastId }, null, options.url);
}
exports.pushToHistory = pushToHistory;
function setPopStateEvent() {
    popStateEvent = true;
}
exports.setPopStateEvent = setPopStateEvent;
function resetPopStateEvent() {
    popStateEvent = false;
}
exports.resetPopStateEvent = resetPopStateEvent;
function isPopStateEvent() {
    return popStateEvent;
}
exports.isPopStateEvent = isPopStateEvent;
function getId(url) {
    return new Date().getTime() + url;
}
function get(id) {
    return pushHistory[id];
}
function shouldReload(event) {
    return event.state.ajaxcomId === null || typeof get(event.state.ajaxcomId) === 'undefined';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var data = {};
function getOptions() {
    return data;
}
exports.getOptions = getOptions;
function setOptions(options) {
    data = options;
}
exports.setOptions = setOptions;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var click_1 = __webpack_require__(4);
var submit_1 = __webpack_require__(8);
var history_1 = __webpack_require__(1);
var options_1 = __webpack_require__(2);
function ajaxcom(options) {
    var links = document.querySelector(options.linksSelector || "a:not([target=_blank])");
    var forms = document.querySelector(options.formsSelector || "form");
    if (links)
        links.addEventListener('click', click_1.toHandleClick(options));
    if (forms)
        forms.addEventListener('submit', submit_1.toHandleSubmit(options));
    history_1.resetPopStateEvent();
    window.onpopstate = history_1.popStateHandler;
    options_1.setOptions(options);
}
exports.ajaxcom = ajaxcom;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var operations_1 = __webpack_require__(0);
function toHandleClick(options) {
    return function (event) {
        if (false === isValid(event))
            return;
        event.preventDefault();
        var link = event.currentTarget;
        var fetchOptions = __assign({}, options, { method: "GET", url: link.href });
        operations_1.fetchOperations(fetchOptions).then(operations_1.handleOperations);
    };
}
exports.toHandleClick = toHandleClick;
function isValid(event) {
    return isNonAjaxcomCall(event) || [
        isNotAnchor,
        isExternalLink,
        isNotAnchorOnSamePage,
        isAnchorEmpty,
    ].some(function (f) { return f(event.currentTarget); });
}
function isNonAjaxcomCall(event) {
    return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}
function isNotAnchor(link) {
    return link.tagName.toUpperCase() !== 'A';
}
function isExternalLink(link) {
    return link.hostname !== location.hostname;
}
function isNotAnchorOnSamePage(link) {
    return link.hash && link.href.replace(link.hash, '') === location.href.replace(location.hash, '');
}
function isAnchorEmpty(link) {
    return link.href === location.href + '#';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handleCallback(options) {
    var namespaces = options.callFunction.split('.');
    var context = window;
    namespaces.forEach(function (item) {
        context = context[item];
    });
    if (typeof context === 'function') {
        context(options.params);
    }
}
exports.handleCallback = handleCallback;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var history_1 = __webpack_require__(1);
function handleChangeUrl(options) {
    var handler;
    switch (options.method) {
        case 'push':
            handler = pushUrl(options);
            break;
        case 'replace':
            handler = replaceUrl(options);
            break;
        case 'redirect':
            handler = redirectToUrl(options);
            break;
        default:
            throw "ChangeUrl method " + options.method + " is not supported";
    }
    setTimeout(handler, typeof options.wait === 'undefined' ? 0 : options.wait);
}
exports.handleChangeUrl = handleChangeUrl;
function pushUrl(options) {
    if (history_1.isPopStateEvent())
        return;
    var currentUrlHref = window.location.href + window.location.search;
    var currentUrlPath = window.location.pathname + window.location.search;
    if (currentUrlHref === options.url || currentUrlPath === options.url)
        return;
    history_1.pushToHistory(options);
}
function replaceUrl(options) {
    history.replaceState({}, null, options.url);
}
function redirectToUrl(options) {
    window.location.href = options.url;
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handleContainer(options) {
}
exports.handleContainer = handleContainer;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var operations_1 = __webpack_require__(0);
function toHandleSubmit(options) {
    return function (event) {
        var form = event.currentTarget;
        if (form.tagName.toUpperCase() !== 'FORM')
            return;
        event.preventDefault();
        var formData = new FormData(form);
        var body = form.method.toUpperCase() === 'GET'
            ? __spread(formData.entries()).map(function (pair) { return encodeURIComponent(pair[0]) + "=" + pair[1]; }).join('&') //Array.from(formData.entries(), e => e.map(encodeURIComponent).join('=')).join('&')
            : formData;
        var fetchOptions = __assign({}, options, { method: form.method, url: form.action, body: body });
        operations_1.fetchOperations(fetchOptions).then(operations_1.handleOperations);
    };
}
exports.toHandleSubmit = toHandleSubmit;


/***/ })
/******/ ]);
//# sourceMappingURL=ajaxcom.js.map