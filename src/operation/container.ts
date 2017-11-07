import {IContainerOptions} from "./options/containerOptions";

export function handleContainer(options: IContainerOptions) {
    const selection = document.querySelectorAll(options.target);

    // if elements are not present in DOM just ignore the handler
    if (selection === null) {
        return;
    }

    const elements = Array.from(selection) as Element[];

    function html() {
        elements.forEach((element) => {
            element.innerHTML = options.value;
        });
    }

    function remove() {
        elements.forEach((element) => {
            element.remove();
        });
    }

    function append() {
        const nodes = getNodes(options.value);
        elements.forEach((element) => {
            element.appendChild(nodes);
        });
    }

    function prepend() {
        const nodes = getNodes(options.value);
        elements.forEach((element) => {
            element.insertBefore(nodes, element.firstChild);
        });
    }

    function insertBefore() {
        const nodes = getNodes(options.value);
        elements.forEach((element) => {
            element.parentNode.insertBefore(nodes, element);
        });
    }

    function insertAfter() {
        const nodes = getNodes(options.value);
        elements.forEach((element) => {
            element.parentNode.insertBefore(nodes, element.nextSibling);
        });
    }

    function replace() {
        elements.forEach((element) => {
            element.outerHTML = options.value;
        });
    }

    function addClass() {
        elements.forEach((element) => {
            element.classList.add(options.value);
        });
    }

    function removeClass() {
        elements.forEach((element) => {
            element.classList.remove(options.value);
        });
    }

    function attr() {
        elements.forEach((element) => {
            element.setAttribute(options.attr, options.value);
        });
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
        case "insertBefore":
            insertBefore();
            break;
        case "insertAfter":
            insertAfter();
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

function getNodes(html: string) {
    return document.createRange().createContextualFragment(html);
}
