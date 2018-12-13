import {IAjaxcomCallbacks} from "../options/callbacks";
import {IFetchOptions} from "../options/fetchOptions";
import {fetchOperations, handleOperations} from "./operations";

export async function request(options: Partial<IAjaxcomCallbacks & IFetchOptions>): Promise<void> {
    try {
        await options.beforeSend();
        const response = await fetchOperations(options);

        if (!response.ok) {
            options.error(response);
            return;
        }

        await options.success();
        await handleOperations(response);
        options.complete();
    } catch (e) {
        options.error(e);
    }
}
