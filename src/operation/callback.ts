import {ICallbackOptions} from "./options/callbackOptions";

export function handleCallback(options: ICallbackOptions) {
    const namespaces = options.callFunction.split(".");
    let context = window;

    namespaces.forEach((item) => {
        context = context[item];
    });

    if (typeof context === "function") {
        context(options.params);
    }
}
