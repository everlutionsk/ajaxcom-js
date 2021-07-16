import {IChangeUrlOptions} from "./options/changeUrlOptions";

export function handleChangeUrl(options: IChangeUrlOptions) {
    let handler;

    switch (options.method) {
        case "push":
            handler = function() {pushUrl(options)};
            break;
        case "replace":
            handler = function() {replaceUrl(options)};
            break;
        case "redirect":
            handler = function() {redirectToUrl(options)};
            break;
        default:
            throw new Error("ChangeUrl method " + options.method + " is not supported");
    }

    setTimeout(handler, options.wait);
}

function pushUrl(options: IChangeUrlOptions) {
    const currentUrlHref = window.location.href + window.location.search;
    const currentUrlPath = window.location.pathname + window.location.search;

    if (currentUrlHref === options.url || currentUrlPath === options.url) { return; }

    history.pushState(options, null, options.url);
}

function replaceUrl(options: IChangeUrlOptions) {
    history.replaceState(options, null, options.url);
}

function redirectToUrl(options: IChangeUrlOptions) {
    window.location.href = options.url;
}
