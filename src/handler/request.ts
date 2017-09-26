import {AjaxOptions} from "../options/ajaxOptions";
import {FetchOptions} from "../options/fetchOptions";
import {fetchOperations, handleOperations} from "./operations";

export async function request(options: Partial<AjaxOptions & FetchOptions>): Promise<void> {
    await options.beforeSend();
    const response = await fetchOperations(options);
    await options.success();
    await handleOperations(response);
    options.complete();
}
