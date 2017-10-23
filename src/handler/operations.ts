import {handleCallback} from "../operation/callback";
import {handleChangeUrl} from "../operation/changeUrl";
import {handleContainer} from "../operation/container";
import {IOperationOptions} from "../operation/options/operationOptions";
import {IAjaxOptions} from "../options/ajaxOptions";
import {IFetchOptions} from "../options/fetchOptions";

export function fetchOperations(options: Partial<IAjaxOptions & IFetchOptions>): Promise<Response> {
    return fetch(options.url, {
        body: options.body,
        cache: "no-store",
        credentials: "include",
        headers: new Headers({"X-AjaxCom": "true", "Accept": "application/json"}),
        method: options.method,
    });
}

export function handleOperations(response: Response): Promise<any> {
    return response
        .json()
        .then((data: IOperationOptions[]) => {
            data.forEach((operation) => handleOperation(operation));
        });
}

function handleOperation({operation, options}: IOperationOptions) {
    switch (operation) {
        case "container":
            handleContainer(options);
            break;
        case "changeurl":
            handleChangeUrl(options);
            break;
        case "callback":
            handleCallback(options);
            break;
        default:
            throw new Error("Operation " + operation + " is not supported");
    }
}
