import {Options} from "./options/options";
import {AjaxOptions} from "options/ajaxOptions";
import {toHandleClick} from "./handler/click";
import {toHandleSubmit} from "./handler/submit";

export function ajaxcom(options: Partial<Options & AjaxOptions>) {
    const ajaxcomOptions = {
        linksSelector: "a:not([target=_blank])",
        formsSelector: "form",
        beforeSend: () => Promise.resolve(),
        success: () => Promise.resolve(),
        complete: () => undefined,
        ...options
    };

    document.addEventListener('click', toHandleClick(ajaxcomOptions));
    document.addEventListener('submit', toHandleSubmit(ajaxcomOptions));

    window.onpopstate = function (event: PopStateEvent) {
        if (typeof event.state !== "object" || event.state === null) window.location.reload();
        window.location.href = event.state.url;
    };
}
