import {AjaxOptions} from "./options/ajaxOptions";
import {Options} from "./options/options";

let data: Partial<Options & AjaxOptions> = {};

export function getOptions(): Partial<Options & AjaxOptions> {
    return data;
}

export function setOptions(options: Partial<Options & AjaxOptions>): void {
    data = options;
}
