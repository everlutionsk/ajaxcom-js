import {AjaxOptions} from "../options/ajaxOptions";
import {FetchOptions} from "../options/fetchOptions";
import {request} from "./request";
import {Options} from "../options/options";

export function toHandleClick(options: Partial<Options &AjaxOptions>) {
    return (event: MouseEvent) => {
        if (!event.srcElement.matches(options.linksSelector)) return;
        if (isInvalid(event)) return;
        event.preventDefault();

        const link = event.srcElement as HTMLAnchorElement;
        const fetchOptions = {
            ...options,
            url: link.href,
            method: "GET",
        } as Partial<AjaxOptions & FetchOptions>;

        request(fetchOptions);
    }
}

function isInvalid(event: MouseEvent): boolean {
    return isNonAjaxcomCall(event) || [
        isNotAnchor,
        isExternalLink,
        isNotAnchorOnSamePage,
        isAnchorEmpty,
    ].some((f) => f(event.srcElement as Element));
}

function isNonAjaxcomCall(event: MouseEvent) {
    return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function isNotAnchor(link: Element) {
    return link.tagName.toUpperCase() !== 'A';
}

function isExternalLink(link: HTMLAnchorElement) {
    return link.hostname !== location.hostname || link.protocol !== location.protocol;
}

function isNotAnchorOnSamePage(link: HTMLAnchorElement) {
    return link.hash && link.href.replace(link.hash, '') === location.href.replace(location.hash, '');
}

function isAnchorEmpty(link: HTMLAnchorElement) {
    return link.href === location.href + '#';
}
