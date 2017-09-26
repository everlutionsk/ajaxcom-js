import {isPopStateEvent, pushToHistory} from "../handler/history";
import {ChangeUrlOptions} from "./options/changeUrlOptions";

export function handleChangeUrl(options: ChangeUrlOptions) {
    let handler;

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

function pushUrl(options: ChangeUrlOptions) {
    if (isPopStateEvent()) return;

    const currentUrlHref = window.location.href + window.location.search;
    const currentUrlPath = window.location.pathname + window.location.search;

    if (currentUrlHref === options.url || currentUrlPath === options.url) return;

    pushToHistory(options);
}

function replaceUrl(options: ChangeUrlOptions) {
    history.replaceState({}, null, options.url);
}

function redirectToUrl(options: ChangeUrlOptions) {
    window.location.href = options.url;
}
