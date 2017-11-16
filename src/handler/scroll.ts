export function scrollToElement(hash: string): void {
    if (hash.length < 1) { return; }

    let element = document.querySelector(hash);
    if (null === element) { element = document.querySelector(`[name=${hash.substr(1)}]`); }
    if (null === element) { return; }

    element.scrollIntoView();
}
