import {IChangeUrlOptions} from "../operation/options/changeUrlOptions";
import {IAjaxOptions} from "./ajaxOptions";
import {IOptions} from "./options";

export interface IHistoryOptions {
    scrollTo: number;
    ajaxcomOptions: Partial<IOptions & IAjaxOptions>;
    options: IChangeUrlOptions;
}
