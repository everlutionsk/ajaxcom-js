import {ICallbackOptions} from "./options/callbackOptions";

export function handleCallback(options: ICallbackOptions) {
    const namespaces = options.callFunction.split(".");
    let context: any = window;

    namespaces.forEach((item) => {
        if (context[item] === undefined) {
            throw new Error('Invalid callback "' + options.callFunction + '"');
        }
        context = context[item];
    });

    if (typeof context === "function") {
        context(options.params);
    }
}
