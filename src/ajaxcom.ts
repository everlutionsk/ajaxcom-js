import {IAjaxOptions} from "options/ajaxOptions";
import {toHandleClick} from "./handler/click";
import {toHandleSubmit} from "./handler/submit";
import {IOptions} from "./options/options";

export function ajaxcom(options: Partial<IOptions & IAjaxOptions>) {
    const ajaxcomOptions = {
        beforeSend: () => Promise.resolve(),
        complete: () => undefined,
        error: onError,
        formsSelector: "form:not([data-ignore-ajaxcom])",
        linksSelector: "a:not([target=_blank]):not([data-ignore-ajaxcom])",
        success: () => Promise.resolve(),
        ...options,
    };

    document.addEventListener("click", toHandleClick(ajaxcomOptions));
    document.addEventListener("submit", toHandleSubmit(ajaxcomOptions));

    window.onpopstate = (event: PopStateEvent) => {

        const link = (event.target || event.srcElement) as Window;

        if (link.location.hash && link.location.href.replace(link.location.hash, "") === location.href.replace(location.hash, "")) {
            return;
        }

        if (typeof event.state !== "object" || event.state === null) { window.location.reload(); }
        window.location.href = event.state.url;
    };
}

function onError() {
    alert("Server cannot handle your request. Please try it again or contact the administrator.");
}
