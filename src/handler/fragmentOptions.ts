import {IAjaxcomCallbacks} from "../options/callbacks";
import {IFetchOptions} from "../options/fetchOptions";
import {scrollToElement} from "./scroll";

type FetchOptions = Partial<IAjaxcomCallbacks & IFetchOptions>;

export function addFragmentOptions(fetchOptions: FetchOptions, fragment?: string): FetchOptions {
    if (fragment.length === 0) { return fetchOptions; }

    fetchOptions.headers = {"X-AjaxComFragment": fragment.substring(1)};

    const completeFunction = fetchOptions.complete;
    fetchOptions.complete = () => {
        scrollToElement(fragment);
        completeFunction();
    };

    return fetchOptions;
}
