import {AjaxOptions} from "../options/ajaxOptions";
import {FetchOptions} from "../options/fetchOptions";
import {request} from "./request";

export function toHandleSubmit(options: Partial<AjaxOptions>) {
    return (event: Event) => {
        const form = event.currentTarget as HTMLFormElement;

        if (form.tagName.toUpperCase() !== 'FORM') return;
        event.preventDefault();

        const formData: any = new FormData(form);
        let body = form.method.toUpperCase() === 'GET'
            ? [...formData.entries()].map(pair => `${encodeURIComponent(pair[0])}=${pair[1]}`).join('&')
            : formData;

        const fetchOptions = {
            ...options,
            url: form.action,
            method: form.method,
            body: body,
        } as Partial<AjaxOptions & FetchOptions>;

        request(fetchOptions);
    }
}
