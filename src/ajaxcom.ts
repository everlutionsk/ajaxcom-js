import {IAjaxOptions} from "options/ajaxOptions";
import {toHandleClick} from "./handler/click";
import {toHandleSubmit} from "./handler/submit";
import {IOptions} from "./options/options";

export function ajaxcom(options: Partial<IOptions & IAjaxOptions>) {
    const ajaxcomOptions = {
        beforeSend: () => Promise.resolve(),
        complete: () => undefined,
        error: onError,
        formsSelector: "form",
        linksSelector: "a:not([target=_blank])",
        success: () => Promise.resolve(),
        ...options,
    };

    document.addEventListener("click", toHandleClick(ajaxcomOptions));
    document.addEventListener("submit", toHandleSubmit(ajaxcomOptions));

    window.onpopstate = (event: PopStateEvent) => {
        if (typeof event.state !== "object" || event.state === null) { window.location.reload(); }
        window.location.href = event.state.url;
    };
}

function onError() {
    alert("Server cannot handle your request. Please try it again or contact the administrator.");
}
