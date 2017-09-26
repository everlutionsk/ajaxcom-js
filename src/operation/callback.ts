import {CallbackOptions} from "./options/callbackOptions";

export function handleCallback(options: CallbackOptions) {
    const namespaces = options.callFunction.split('.');
    let context = window;

    namespaces.forEach(function (item) {
        context = context[item];
    });

    if (typeof context === 'function') {
        context(options.params);
    }
}
