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
            .then((data: Array<OperationOptions>) => {
                data.forEach((operation) => handleOperation(operation));
            })
            .then(resolve)
    ));
}

function handleOperation({operation, options}: OperationOptions) {
    switch (operation) {
        case 'container':
            handleContainer(options);
            break;
        case 'changeurl':
            handleChangeUrl(options);
            break;
        case 'callback':
            handleCallback(options);
            break;
        default:
            throw "Operation " + operation + " is not supported";
    }
}
