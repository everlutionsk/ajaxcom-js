import {Options} from "./options";
import {AjaxOptions} from "./ajaxOptions";
import {ChangeUrlOptions} from "../operation/options/changeUrlOptions";

export interface HistoryOptions {
    scrollTo: number;
    ajaxcomOptions: Partial<Options & AjaxOptions>;
    options: ChangeUrlOptions;
}
