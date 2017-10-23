import {IContainerOptions} from "./options/containerOptions";

export function handleContainer(options: IContainerOptions) {
    const elements = document.querySelectorAll(options.target);

    // if elements are not present in DOM just ignore the handler
    if (elements === null) { return; }

    function html() {
        handleCallback(elements, (index, element) => {
                element.innerHTML = options.value;
            },
        );
    }

    function remove() {
        handleCallback(elements, (index, element) => {
                element.remove();
            },
        );
    }

    function append() {
        handleCallback(elements, (index, element) => {
                element.appendChild(parseHTML(options.value));
            },
        );
    }

    function prepend() {
        handleCallback(elements, (index, element) => {
                element.insertBefore(parseHTML(options.value), element.firstChild);
            },
        );
    }

    function replace() {
        handleCallback(elements, (index, element) => {
                element.outerHTML = options.value;
            },
        );
    }

    function addClass() {
        handleCallback(elements, (index, element) => {
                element.classList.add(options.value);
            },
        );
    }

    function removeClass() {
        handleCallback(elements, (index, element) => {
                element.classList.remove(options.value);
            },
        );
    }

    function attr() {
        handleCallback(elements, (index, element) => {
                element.setAttribute(options.attr, options.value);
            },
        );
    }

    switch (options.method) {
        case "html":
            html();
            break;
        case "remove":
            remove();
            break;
        case "append":
            append();
            break;
        case "prepend":
            prepend();
            break;
        case "replace":
            replace();
            break;
        case "addClass":
            addClass();
            break;
        case "removeClass":
            removeClass();
            break;
        case "attr":
            attr();
            break;
        default:
            throw new Error("Container method " + options.method + " is not supported");
    }
}

function parseHTML(html: string) {
    const parser = new DOMParser();

    return parser.parseFromString(html, "text/html");
}

function handleCallback(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback.call(this, i, array[i]);
    }
}
