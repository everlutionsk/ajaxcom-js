import {ContainerOptions} from "./options/containerOptions";

export function handleContainer(options: ContainerOptions) {
    const elements = document.querySelectorAll(options.target);

    // if elements are not present in DOM just ignore the handler
    if (elements === null) return;

    function html() {
        forEach(elements, (index, element) => {
                element.innerHTML = options.value;
            }
        );
    }

    function remove() {
        forEach(elements, (index, element) => {
                element.remove();
            }
        );
    }

    function append() {
        forEach(elements, (index, element) => {
                element.appendChild(parseHTML(options.value));
            }
        );
    }

    function prepend() {
        forEach(elements, (index, element) => {
                element.insertBefore(parseHTML(options.value), element.firstChild);
            }
        );
    }

    function replace() {
        forEach(elements, (index, element) => {
                element.outerHTML = options.value;
            }
        );
    }

    function addClass() {
        forEach(elements, (index, element) => {
                element.classList.add(options.value);
            }
        );
    }

    function removeClass() {
        forEach(elements, (index, element) => {
                element.classList.remove(options.value);
            }
        );
    }

    function attr() {
        forEach(elements, (index, element) => {
                element.setAttribute(options.attr, options.value);
            }
        );
    }

    switch (options.method) {
        case 'html':
            html();
            break;
        case 'remove':
            remove();
            break;
        case 'append':
            append();
            break;
        case 'prepend':
            prepend();
            break;
        case 'replace':
            replace();
            break;
        case 'addClass':
            addClass();
            break;
        case 'removeClass':
            removeClass();
            break;
        case 'attr':
            attr();
            break;
        default:
            throw "Container method " + options.method + " is not supported";
    }
}

function parseHTML(html: string) {
    const parser = new DOMParser();

    return parser.parseFromString(html, "text/html");
}

function forEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback.call(this, i, array[i]);
    }
}
