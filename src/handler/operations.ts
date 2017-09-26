import {AjaxOptions} from "../options/ajaxOptions";
import {FetchOptions} from "../options/fetchOptions";
import {OperationOptions} from "../operation/options/operationOptions";
import {handleCallback} from "../operation/callback";
import {handleChangeUrl} from "../operation/changeUrl";
import {handleContainer} from "../operation/container";

export function fetchOperations(options: Partial<AjaxOptions & FetchOptions>): Promise<Response> {
    return fetch(options.url, {
        headers: new Headers({'X-AjaxCom': 'true', 'Accept': 'application/json'}),
        method: options.method,
        body: options.body,
    });
}

export function handleOperations(response: Response): Promise<any> {
    return new Promise((resolve) => (
        response
            .json()
            .then((data: Array<OperationOptions>) => (
                data.forEach((operation) => handleOperation(operation))
            ))
            .then(resolve)
    ));
}

function handleOperation(operation: OperationOptions) {
    switch (operation.operation) {
        case 'container':
            handleContainer(operation.options);
            break;
        case 'changeurl':
            handleChangeUrl(operation.options);
            break;
        case 'callback':
            handleCallback(operation.options);
            break;
        default:
            throw "Operation " + operation.operation + " is not supported";
    }
}
