import {IAjaxOptions} from "../options/ajaxOptions";
import {IFetchOptions} from "../options/fetchOptions";
import {fetchOperations, handleOperations} from "./operations";

export async function request(options: Partial<IAjaxOptions & IFetchOptions>): Promise<void> {
    try {
        await options.beforeSend();
        const response = await fetchOperations(options);
        await options.success();
        await handleOperations(response);
        options.complete();
    } catch (e) {
        options.error(e);
    }
}
