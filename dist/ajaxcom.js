(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ajaxcom"] = factory();
	else
		root["ajaxcom"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var operations_1 = __webpack_require__(3);
function request(options) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, options.beforeSend()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, operations_1.fetchOperations(options)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, options.success()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, operations_1.handleOperations(response)];
                case 4:
                    _a.sent();
                    options.complete();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    options.error(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.request = request;


/***/ }),
/* 1 */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var click_1 = __webpack_require__(2);
var request_1 = __webpack_require__(0);
var submit_1 = __webpack_require__(8);
var defaultCallbacks = {
    beforeSend: function () { return Promise.resolve(); },
    complete: function () { return undefined; },
    error: onError,
    success: function () { return Promise.resolve(); },
};
function initialize(options) {
    var ajaxcomOptions = __assign({}, defaultCallbacks, { formsSelector: "form:not([data-ignore-ajaxcom])", linksSelector: "a:not([target=_blank]):not([data-ignore-ajaxcom])" }, options);
    document.addEventListener("click", click_1.toHandleClick(ajaxcomOptions));
    document.addEventListener("submit", submit_1.toHandleSubmit(ajaxcomOptions));
    window.onpopstate = function (event) {
        var link = (event.target || event.srcElement);
        if (link.location.hash && hasEmptyHash(link)) {
            return;
        }
        if (typeof event.state !== "object" || event.state === null) {
            window.location.reload();
        }
        window.location.href = event.state.url;
    };
    function hasEmptyHash(link) {
        return link.location.href.replace(link.location.hash, "") === location.href.replace(location.hash, "");
    }
}
exports.initialize = initialize;
function fetch(requestOptions, ajaxcomCallbacks) {
    return __awaiter(this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            options = __assign({ method: "GET" }, defaultCallbacks, ajaxcomCallbacks, requestOptions);
            request_1.request(options);
            return [2 /*return*/];
        });
    });
}
exports.fetch = fetch;
function onError() {
    alert("Server cannot handle your request. Please try it again or contact the administrator.");
}


/***/ }),
/* 2 */
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
var request_1 = __webpack_require__(0);
var scroll_1 = __webpack_require__(7);
function toHandleClick(options) {
    return function (event) {
        var link = getLink(event);
        if (link.matches("[href^='#']")) {
            event.preventDefault();
            // Unlike Chrome, in Firefox, window.location.hash = ''; would result in actual appending of '#' to
            // current URL, which will trigger window.popstate event. From inside our popstate handler we have no
            // way to detect this and differentiate empty location hash from navigating to current URL (without hash).
            if (link.hash) {
                window.location.hash = link.hash;
            }
            scroll_1.scrollToElement(link.hash);
            return;
        }
        if (!link.matches(options.linksSelector)) {
            return;
        }
        if (isNonAjaxcomCall(event)) {
            return;
        }
        if (isInvalid(link)) {
            return;
        }
        event.preventDefault();
        var fetchOptions = __assign({}, options, { method: "GET", url: link.href });
        request_1.request(fetchOptions);
    };
}
exports.toHandleClick = toHandleClick;
function isInvalid(link) {
    return [
        isNotAnchor,
        isExternalLink,
        isNotAnchorOnSamePage,
        isAnchorEmpty,
    ].some(function (f) { return f(link); });
}
function isNonAjaxcomCall(event) {
    return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}
function isNotAnchor(link) {
    return link.tagName.toUpperCase() !== "A";
}
function isExternalLink(link) {
    return link.hostname !== location.hostname || link.protocol !== location.protocol;
}
function isNotAnchorOnSamePage(link) {
    return link.hash && link.href.replace(link.hash, "") === location.href.replace(location.hash, "");
}
function isAnchorEmpty(link) {
    return link.href === location.href + "#";
}
function getLink(event) {
    var link = (event.target || event.srcElement);
    if (isNotAnchor(link)) {
        return link.parentElement;
    }
    return link;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var callback_1 = __webpack_require__(4);
var changeUrl_1 = __webpack_require__(5);
var container_1 = __webpack_require__(6);
function fetchOperations(options) {
    return fetch(options.url, {
        body: options.body,
        cache: "no-store",
        credentials: "include",
        headers: new Headers({ "X-AjaxCom": "true", "Accept": "application/json" }),
        method: options.method,
    });
}
exports.fetchOperations = fetchOperations;
function handleOperations(response) {
    return response
        .json()
        .then(function (data) {
        data.forEach(function (operation) { return handleOperation(operation); });
    });
}
exports.handleOperations = handleOperations;
function handleOperation(_a) {
    var operation = _a.operation, options = _a.options;
    switch (operation) {
        case "container":
            container_1.handleContainer(options);
            break;
        case "changeurl":
            changeUrl_1.handleChangeUrl(options);
            break;
        case "callback":
            callback_1.handleCallback(options);
            break;
        default:
            throw new Error("Operation " + operation + " is not supported");
    }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handleCallback(options) {
    var namespaces = options.callFunction.split(".");
    var context = window;
    namespaces.forEach(function (item) {
        if (context[item] === undefined) {
            throw new Error('Invalid callback "' + options.callFunction + '"');
        }
        context = context[item];
    });
    if (typeof context === "function") {
        context(options.params);
    }
}
exports.handleCallback = handleCallback;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handleChangeUrl(options) {
    var handler;
    switch (options.method) {
        case "push":
            handler = pushUrl(options);
            break;
        case "replace":
            handler = replaceUrl(options);
            break;
        case "redirect":
            handler = redirectToUrl(options);
            break;
        default:
            throw new Error("ChangeUrl method " + options.method + " is not supported");
    }
    setTimeout(handler, options.wait);
}
exports.handleChangeUrl = handleChangeUrl;
function pushUrl(options) {
    var currentUrlHref = window.location.href + window.location.search;
    var currentUrlPath = window.location.pathname + window.location.search;
    if (currentUrlHref === options.url || currentUrlPath === options.url) {
        return;
    }
    history.pushState(options, null, options.url);
}
function replaceUrl(options) {
    history.replaceState(options, null, options.url);
}
function redirectToUrl(options) {
    window.location.href = options.url;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function handleContainer(options) {
    var selection = document.querySelectorAll(options.target);
    // if elements are not present in DOM just ignore the handler
    if (selection === null) {
        return;
    }
    var elements = Array.from(selection);
    function html() {
        elements.forEach(function (element) {
            element.innerHTML = options.value;
        });
    }
    function remove() {
        elements.forEach(function (element) {
            element.remove();
        });
    }
    function append() {
        var nodes = getNodes(options.value);
        elements.forEach(function (element) {
            element.appendChild(nodes);
        });
    }
    function prepend() {
        var nodes = getNodes(options.value);
        elements.forEach(function (element) {
            element.insertBefore(nodes, element.firstChild);
        });
    }
    function insertBefore() {
        var nodes = getNodes(options.value);
        elements.forEach(function (element) {
            element.parentNode.insertBefore(nodes, element);
        });
    }
    function insertAfter() {
        var nodes = getNodes(options.value);
        elements.forEach(function (element) {
            element.parentNode.insertBefore(nodes, element.nextSibling);
        });
    }
    function replace() {
        elements.forEach(function (element) {
            element.outerHTML = options.value;
        });
    }
    function addClass() {
        elements.forEach(function (element) {
            element.classList.add(options.value);
        });
    }
    function removeClass() {
        elements.forEach(function (element) {
            element.classList.remove(options.value);
        });
    }
    function attr() {
        elements.forEach(function (element) {
            element.setAttribute(options.attr, options.value);
        });
    }
    switch (options.method) {
        case "html":
            html();
            break;
        case "remove":
            remove();
            break;
        case "append":
            append();
            break;
        case "prepend":
            prepend();
            break;
        case "insertBefore":
            insertBefore();
            break;
        case "insertAfter":
            insertAfter();
            break;
        case "replace":
            replace();
            break;
        case "addClass":
            addClass();
            break;
        case "removeClass":
            removeClass();
            break;
        case "attr":
            attr();
            break;
        default:
            throw new Error("Container method " + options.method + " is not supported");
    }
}
exports.handleContainer = handleContainer;
function getNodes(html) {
    return document.createRange().createContextualFragment(html);
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function scrollToElement(hash) {
    if (hash.length < 1) {
        return;
    }
    var element = document.querySelector(hash);
    if (null === element) {
        element = document.querySelector("[name=" + hash.substr(1) + "]");
    }
    if (null === element) {
        return;
    }
    element.scrollIntoView();
}
exports.scrollToElement = scrollToElement;


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
var request_1 = __webpack_require__(0);
function toHandleSubmit(options) {
    return function (event) {
        var form = event.target;
        if (false === form.matches(options.formsSelector)) {
            return;
        }
        if (form.tagName.toUpperCase() !== "FORM") {
            return;
        }
        event.preventDefault();
        var formData = new FormData(form);
        var fetchOptions = __assign({}, options, { method: form.method, url: form.action });
        request_1.request(form.method.toUpperCase() === "GET"
            ? fetchOptionsForGet(formData, fetchOptions)
            : fetchOptionsForPost(formData, fetchOptions));
    };
}
exports.toHandleSubmit = toHandleSubmit;
function fetchOptionsForPost(formData, fetchOptions) {
    return __assign({}, fetchOptions, { body: formData });
}
function fetchOptionsForGet(formData, fetchOptions) {
    var query = __spread(formData.entries()).map(function (pair) { return encodeURIComponent(pair[0]) + "=" + pair[1]; }).join("&");
    var glue = fetchOptions.url.indexOf("?") === -1 ? "?" : "&";
    return __assign({}, fetchOptions, { url: [fetchOptions.url, glue, query].join("") });
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=ajaxcom.js.map