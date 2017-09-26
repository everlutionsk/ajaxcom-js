import {ContainerOptions} from "./options/containerOptions";

export function handleContainer(options: ContainerOptions) {
    const elements = document.querySelectorAll(options.target);

    // if elements is not present in DOM just ignore the handler
    if (elements === null) return;

    function html() {
        elements.forEach((element: Element) => element.innerHTML = options.value);
    }

    function remove() {
        console.warn(elements);

        elements.forEach((element: Element) => element.remove());
    }

    function append() {
        elements.forEach((element: Element) => element.appendChild(parseHTML(options.value)));
    }

    function prepend() {
        elements.forEach((element: Element) => element.insertBefore(parseHTML(options.value), element.firstChild));
    }

    function replace() {
        elements.forEach((element: Element) => element.outerHTML = options.value);
    }

    function addClass() {
        elements.forEach((element: Element) => element.classList.add(options.value));
    }

    function removeClass() {
        elements.forEach((element: Element) => element.classList.remove(options.value));
    }

    function attr() {
        elements.forEach((element: Element) => element.setAttribute(options.attr, options.value));
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
    let parser = new DOMParser();

    return parser.parseFromString(html, "text/html");
}
