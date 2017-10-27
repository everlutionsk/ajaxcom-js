import {IAjaxOptions} from "../options/ajaxOptions";
import {IFetchOptions} from "../options/fetchOptions";
import {IOptions} from "../options/options";
import {request} from "./request";

export function toHandleClick(options: Partial<IOptions &IAjaxOptions>) {
    return (event: MouseEvent) => {
        const link = (event.target || event.srcElement) as HTMLAnchorElement;

        if (!link.matches(options.linksSelector)) { return; }
        if (isInvalid(event)) { return; }

        event.preventDefault();
        const fetchOptions = {
            ...options,
            method: "GET",
            url: link.href,
        } as Partial<IAjaxOptions & IFetchOptions>;

        request(fetchOptions);
    };
}

function isInvalid(event: MouseEvent): boolean {
    return isNonAjaxcomCall(event) || [
        isNotAnchor,
        isExternalLink,
        isNotAnchorOnSamePage,
        isAnchorEmpty,
    ].some((f) => f((event.target || event.srcElement) as Element));
}

function isNonAjaxcomCall(event: MouseEvent) {
    return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function isNotAnchor(link: Element) {
    return link.tagName.toUpperCase() !== "A";
}

function isExternalLink(link: HTMLAnchorElement) {
    return link.hostname !== location.hostname || link.protocol !== location.protocol;
}

function isNotAnchorOnSamePage(link: HTMLAnchorElement) {
    return link.hash && link.href.replace(link.hash, "") === location.href.replace(location.hash, "");
}

function isAnchorEmpty(link: HTMLAnchorElement) {
    return link.href === location.href + "#";
}
