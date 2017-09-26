import {Options} from "./options/options";
import {AjaxOptions} from "options/ajaxOptions";
import {toHandleClick} from "./handler/click";
import {toHandleSubmit} from "./handler/submit";
import {popStateHandler, resetPopStateEvent} from "./handler/history";
import {setOptions} from "./options";

export function ajaxcom(options: Partial<Options & AjaxOptions>) {
    const linksSelector = typeof options.linksSelector === 'undefined' ? "a:not([target=_blank])" : options.linksSelector;
    const formsSelector = typeof options.formsSelector === 'undefined' ? "form" : options.formsSelector;

    const links = document.querySelector(linksSelector);
    const forms = document.querySelector(formsSelector);

    const ajaxcomOptions = {
        beforeSend: () => Promise.resolve(),
        success: () => Promise.resolve(),
        complete: () => undefined,
        ...options
    };

    if (links) links.addEventListener('click', toHandleClick(ajaxcomOptions));
    if (forms) forms.addEventListener('submit', toHandleSubmit(ajaxcomOptions));

    resetPopStateEvent();
    window.onpopstate = popStateHandler;

    setOptions(options);
}
