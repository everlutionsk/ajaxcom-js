export function scrollToElement(hash: string): void {
  if (hash.length < 1) {
    return;
  }

  let element = document.querySelector(hash);
  if (element === null) {
    element = document.querySelector(`[name=${hash.substr(1)}]`);
  }
  if (element === null) {
    return;
  }

  element.scrollIntoView();
}
